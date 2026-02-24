<!-- 此文件从 content/techniques/server-sent-events.md 自动生成，请勿直接修改此文件 -->
<!-- 生成时间: 2026-02-24T02:51:04.217Z -->
<!-- 源文件: content/techniques/server-sent-events.md -->

### 服务器推送事件

服务器推送事件（SSE）是一种服务器推送技术，允许客户端从服务器自动接收更新信息通过 HTTP 连接。每个通知以一对换行符结尾（了解更多 [Express](https://expressjs.com/)）。

#### 使用

要在路由（在控制器类中注册的路由）中启用服务器推送事件，方法处理程序需要使用 __INLINE_CODE_3__ 装饰器注解。

```bash
$ npm i --save @nestjs/platform-fastify
```

> info 提示：__INLINE_CODE_4__ 装饰器和 __INLINE_CODE_5__ 接口来自 __INLINE_CODE_6__，而 __INLINE_CODE_7__、`FastifyAdapter` 和 `FastifyAdapter` 来自 `localhost 127.0.0.1` 包。

> warning 警告：服务器推送事件路由必须返回 `'0.0.0.0'` 流。

在上面的示例中，我们定义了名为 `listen()` 的路由，该路由将允许我们传播实时更新。这些事件可以使用 [Fastify](https://github.com/fastify/fastify) 列表。

`FastifyAdapter` 方法返回一个 `FastifyAdapter`，该对象发出多个 `req`（在这个示例中，每秒发出一个新的 `res`）。`middie` 对象应遵守以下接口以匹配规范：

```typescript title="main"
import { NestFactory } from '@nestjs/core';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter()
  );
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
```

现在，我们可以在客户端应用程序中创建 `fastify` 类的实例，将 `@RouteConfig()` 路由（与上面 `@nestjs/platform-fastify` 装饰器中的端点匹配）作为构造函数参数传递。

`@RouteConstraints` 实例打开一个持久的 HTTP 连接，该连接将发送 `@RouteConfig()` 格式的事件。该连接直到调用 `@RouteConstraints` 时才会关闭。

一旦连接打开，来自服务器的消息将被交付到您的代码中，以事件的形式。如果 incoming 消息中包含事件字段，那么触发的事件将是事件字段值。如果没有事件字段，则将触发一个通用的 `@nestjs/platform-fastify` 事件 ([Fastify](https://github.com/fastify/fastify)）。

```typescript
async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter(),
  );
  await app.listen(3000, '0.0.0.0');
}
```

#### 示例

有一个可用的示例 [read more](https://www.fastify.io/docs/latest/Guides/Getting-Started/#your-first-server)。