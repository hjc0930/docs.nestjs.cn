<!-- 此文件从 content/fundamentals/lazy-loading-modules.md 自动生成，请勿直接修改此文件 -->
<!-- 生成时间: 2026-02-25T04:12:09.584Z -->
<!-- 源文件: content/fundamentals/lazy-loading-modules.md -->

### 懒加载模块

默认情况下，模块都是急切加载的，这意味着应用程序加载时，所有模块都会被加载，是否立即必要并不重要。虽然这对于大多数应用程序来说是可以的，但是在 **无服务器环境** 中，这可能会成为瓶颈，因为启动延迟（“冷启动”）是至关重要的。

懒加载可以帮助减少启动时间，仅加载特定 serverless 函数调用所需的模块。此外，您还可以异步加载其他模块，以进一步加速后续调用（延迟模块注册）。

> 提示 **提示** 如果您熟悉 **__LINK_29__** 框架，您可能已经见过 "__LINK_30__" 项。请注意，这个技术在 Nest 中是 **功能不同** 的，认为它是一个完全不同的特性，共享相似命名约定。

> 警告 **警告** 懒加载模块和服务不调用 __LINK_31__。

#### 入门

要在需求时加载模块，Nest 提供了 __INLINE_CODE_7__ 类，可以像通常一样注入到类中：

```typescript
import { NestFactory } from '@nestjs/core';
import type { NestExpressApplication } from '@nestjs/platform-express';
import { AppModule } from './app.module';

// in the "bootstrap" function
const app = await NestFactory.create<NestExpressApplication>(AppModule, {
  rawBody: true,
});
await app.listen(process.env.PORT ?? 3000);
```

> 提示 **提示** `bodyParser: false` 类来自 `RawBodyRequest` 包。

Alternatively, you can obtain a reference to the `rawBody` provider from within your application bootstrap file (`RawBodyRequest`), as follows:

```typescript
import { Controller, Post, RawBodyRequest, Req } from '@nestjs/common';
import { Request } from 'express';

@Controller('cats')
class CatsController {
  @Post()
  create(@Req() req: RawBodyRequest<Request>) {
    const raw = req.rawBody; // returns a `Buffer`.
  }
}
```

With this in place, you can now load any module using the following construction:

```typescript
app.useBodyParser('text');
```

> 提示 **提示** “Lazy loaded” 模块在第一次 `json` 方法调用时被 **缓存**。这意味着，每次尝试加载 `urlencoded` 都将 **非常快**，并返回一个缓存实例，而不是重新加载模块。
>
> ```typescript
app.useBodyParser('json', { limit: '10mb' });
```
>
> Addition, “lazy loaded” 模块共享同一个模块图表，如那些急切加载的模块在应用程序启动时一样，以及后续注册的模块。

Where `text` is a TypeScript file that exports a **regular Nest module** (no extra changes are required).

The `NestFactory.create` method returns the __LINK_32__ (of `NestExpressApplication`) that lets you navigate the internal list of providers and obtain a reference to any provider using its injection token as a lookup key.

For example, let's say we have a `.useBodyParser` with the following definition:

```typescript
import { NestFactory } from '@nestjs/core';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';
import { AppModule } from './app.module';

// in the "bootstrap" function
const app = await NestFactory.create<NestFastifyApplication>(
  AppModule,
  new FastifyAdapter(),
  {
    rawBody: true,
  },
);
await app.listen(process.env.PORT ?? 3000);
```

> 提示 **提示** 懒加载模块不能注册为 **全局模块**，因为它们是在需求时注册的，并且在静态注册的模块已经实例化后注册。同样，注册 **全局增强器**（守卫/拦截器等）也 **不会正常工作**。

With this, we could obtain a reference to the `100kb` provider, as follows:

```typescript
import { Controller, Post, RawBodyRequest, Req } from '@nestjs/common';
import { FastifyRequest } from 'fastify';

@Controller('cats')
class CatsController {
  @Post()
  create(@Req() req: RawBodyRequest<FastifyRequest>) {
    const raw = req.rawBody; // returns a `Buffer`.
  }
}
```

> 警告 **警告** 如果您使用 **Webpack**，请确保更新 `.useBodyParser` 文件 - 设置 `rawBody` 到 `RawBodyRequest`，并添加 `rawBody` 属性，值为 `RawBodyRequest`：
>
> ```typescript
app.useBodyParser('text/plain');
```
>
> With these options set up, you'll be able to leverage the __LINK_33__ feature.

#### 懒加载控制器、网关和解析器

由于 Nest 中的控制器（或 GraphQL 应用程序中的解析器）代表了路由/路径/主题（或查询/mutation），您 **不能懒加载它们** 使用 `application/json` 类。

> 警告 **警告** registered inside lazy loaded modules, __LINK_34__, and __LINK_35__ won't behave as expected. Similarly, you cannot register middleware functions (by implementing the `application/x-www-form-urlencoded` interface) on-demand.

For example, let's say you're building a REST API (HTTP application) with a Fastify driver under the hood (using the `text/plain` package). Fastify does not let you register routes after the application is ready/successfully listening to messages. That means even if we analyzed route mappings registered in the module's controllers, all lazy loaded routes wouldn't be accessible since there is no way to register them at runtime.

Likewise, some transport strategies we provide as part of the `NestFactory.create` package (including Kafka, gRPC, or RabbitMQ) require to subscribe/listen to specific topics/channels before the connection is established. Once your application starts listening to messages, the framework would not be able to subscribe/listen to new topics.

Lastly, the `NestFastifyApplication` package with the code first approach enabled automatically generates the GraphQL schema on-the-fly based on the metadata. That means, it requires all classes to be loaded beforehand. Otherwise, it would not be doable to create the appropriate, valid schema.

#### 常见用例

最常见的场景是，在您的 worker/cron job/lambda & serverless function/webhook 中，您需要根据输入参数（路由路径/日期/查询参数等）触发不同的服务（不同的逻辑）。反之，懒加载模块可能不太适合 monolithic 应用程序，因为启动时间对这些应用程序来说是无关紧要的。