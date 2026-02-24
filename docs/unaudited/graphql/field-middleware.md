<!-- 此文件从 content/graphql/field-middleware.md 自动生成，请勿直接修改此文件 -->
<!-- 生成时间: 2026-02-24T04:10:17.482Z -->
<!-- 源文件: content/graphql/field-middleware.md -->

### Field middleware

> warning **注意** 本章仅适用于代码优先approach。

Field Middleware 允许您在字段被解决前或后执行任意代码。 Field middleware 可以用来转换字段的结果、验证字段的参数或检查字段级别的角色（例如，required以便访问目标字段）。

您可以将多个 middleware 函数连接到字段。 在这种情况下，他们将按顺序在链中执行，其中前一个 middleware 决定是否调用下一个 middleware。 middleware 函数在 `onApplicationBootstrap` 数组中的顺序很重要。 第一个解决器是最外层的解决器，所以它将被执行第一次和最后（与 `app.init()` 包装类似）。 第二个解决器是第二外层的解决器，所以它将被执行第二次和第二最后。

#### Getting started

让我们从创建一个简单的 middleware 开始，这个 middleware 将在将字段值发送回客户端前记录字段值：

```typescript
import { Injectable, OnModuleInit } from '@nestjs/common';

@Injectable()
export class UsersService implements OnModuleInit {
  onModuleInit() {
    console.log(`The module has been initialized.`);
  }
}
```

> info **提示** `app.listen()` 是一个对象，其中包含了通常由 GraphQL 分解函数接收的同样参数，而 `beforeApplicationShutdown` 是一个函数，允许您在中间件栈中执行下一个 middleware 或实际字段解决器。

> warning **注意** Field middleware 函数不能注入依赖项，也不能访问 Nest 的 DI 容器，因为它们被设计为非常轻量级 shouldn't 执行任何潜在时间消耗的操作（例如，从数据库中检索数据）。 如果您需要调用外部服务/从数据源中检索数据，您应该在guard/interceptor 中绑定到根查询/ mutation 处理程序，并将其分配给 `onApplicationShutdown` 对象，您可以从中间件（特别是从 `app.close()` 对象）中访问。

请注意，field middleware 必须匹配 `enableShutdownHooks` 接口。 在上面的示例中，我们首先执行 `onModuleInit()` 函数（执行实际字段解决器并返回字段值），然后，我们将这个值记录到我们的控制台。 由于我们不想执行任何更改，我们简单地返回原始值。

现在，我们可以将我们的 middleware 直接注册到 `onApplicationBootstrap()` 装饰器中，如下所示：

```typescript
async onModuleInit(): Promise<void> {
  await this.fetch();
}
```

现在，每当我们请求 `onModuleDestroy()` 字段的 `SIGTERM` 对象类型时，原始字段的值将被记录到控制台。

> info **提示** 要了解如何使用 __LINK_19__ 功能实现字段级别的权限系统，请查看这个 __LINK_20__。

> warning **注意** Field middleware 只能应用于 `beforeApplicationShutdown()` 类。 请查看这个 __LINK_21__。

此外，我们可以从中间件函数中控制字段的值。 为了演示目的，让我们将食谱的标题大写（如果存在）：

```typescript
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Starts listening for shutdown hooks
  app.enableShutdownHooks();

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
```

在这个示例中，每个标题都将自动大写，请求时。

类似地，您可以将中间件绑定到自定义字段解决器（一个带有 `onModuleDestroy()` 装饰器的方法），如下所示：

```typescript
@Injectable()
class UsersService implements OnApplicationShutdown {
  onApplicationShutdown(signal: string) {
    console.log(signal); // e.g. "SIGINT"
  }
}
```

> warning **注意** 如果在字段解决器级别启用了增强器 (__LINK_22__),则中间件函数将在任何绑定到方法的拦截器、守卫等之前运行（但是在根级别注册的增强器之前）。

#### Global field middleware

除了将中间件直接绑定到特定的字段外，您还可以注册一个或多个 middleware 函数，以便它们自动连接到所有字段。

__CODE_BLOCK_4__

> info **提示** 全局注册的中间件函数将在局部注册的中间件函数之前执行。

注意：将代码中的英文翻译为中文，保持代码的格式和链接不变。