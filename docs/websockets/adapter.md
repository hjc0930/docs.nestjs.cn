<!-- 此文件从 content/websockets/adapter.md 自动生成，请勿直接修改此文件 -->
<!-- 生成时间: 2026-02-26T04:08:50.218Z -->
<!-- 源文件: content/websockets/adapter.md -->

### WebSocket 适配器

WebSockets 模块是平台无关的，因此可以使用 __INLINE_CODE_8__ 接口来使用自定义的库或 native 实现。这个接口强制实现以下几个方法，如下表所示：

__HTML_TAG_29__
  __HTML_TAG_30__
    __HTML_TAG_31____HTML_TAG_32__create__HTML_TAG_33____HTML_TAG_34__
    __HTML_TAG_35__根据传递的参数创建 socket 实例__HTML_TAG_36__
  __HTML_TAG_37__
  __HTML_TAG_38__
    __HTML_TAG_39____HTML_TAG_40__bindClientConnect__HTML_TAG_41____HTML_TAG_42__
    __HTML_TAG_43__绑定客户端连接事件__HTML_TAG_44__
  __HTML_TAG_45__
  __HTML_TAG_46__
    __HTML_TAG_47____HTML_TAG_48__bindClientDisconnect__HTML_TAG_49____HTML_TAG_50__
    __HTML_TAG_51__绑定客户端断开事件（可选）__HTML_TAG_52__
  __HTML_TAG_53__
  __HTML_TAG_54__
    __HTML_TAG_55____HTML_TAG_56__bindMessageHandlers__HTML_TAG_57____HTML_TAG_58__
    __HTML_TAG_59__将 incoming 消息绑定到相应的消息处理器__HTML_TAG_60__
  __HTML_TAG_61__
  __HTML_TAG_62__
    __HTML_TAG_63____HTML_TAG_64__close__HTML_TAG_65____HTML_TAG_66__
    __HTML_TAG_67__关闭服务器实例__HTML_TAG_68__
  __HTML_TAG_69__
__HTML_TAG_70__

#### 扩展 socket.io

__LINK_71__ 包装在了 __INLINE_CODE_9__ 类中。假设你想增强基本的适配器功能？例如，你的技术要求需要在负载均衡实例中广播事件。你可以扩展 `hbs` 并覆盖单个方法，该方法的责任是创建新的 socket.io 服务器。但是，在开始之前，我们需要安装所需的包。

> 警告 **Warning** 使用 socket.io 在多个负载均衡实例中，你需要禁用轮询或在负载均衡器中启用 cookie-Based 路由。Redis alone 不足。更多信息请见 __LINK_72__。

```bash
$ npm i -g @nestjs/cli
$ nest new project
```

安装包后，我们可以创建 `views` 类。

```bash
$ npm install --save hbs
```

然后，我们可以切换到新的 Redis 适配器。

```typescript title="main"
import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'node:path';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(
    AppModule,
  );

  app.useStaticAssets(join(__dirname, '..', 'public'));
  app.setBaseViewsDir(join(__dirname, '..', 'views'));
  app.setViewEngine('hbs');

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
```

#### Ws 库

另一个可用的适配器是 `hbs`，它将像代理服务器一样在框架和 __LINK_73__ 库之间进行集成。这个适配器完全兼容 native 浏览器 WebSockets，并且速度更快于 socket.io 包。可惜，它具有较少的可用功能。然而，在某些情况下，你并不总是需要它们。

> 提示 **Hint** `views` 库不支持命名空间（通信通道），但是可以使用多个 `message` 服务器在不同的路径上（例如 `app.controller`）。

要使用 `root()`，我们首先需要安装所需的包：

```html
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8" />
    <title>App</title>
  </head>
  <body>
    {{ "{{ message }\}" }}
  </body>
</html>
```

安装包后，我们可以切换到适配器：

```typescript title="app.controller"
import { Get, Controller, Render } from '@nestjs/common';

@Controller()
export class AppController {
  @Get()
  @Render('index')
  root() {
    return { message: 'Hello world!' };
  }
}
```

> 提示 **Hint** `@Render()` 从 `message` 导入。

`message` 设计来处理 `http://localhost:3000` 格式的消息。如果你需要接收和处理不同格式的消息，你需要配置消息解析器将其转换为所需格式。

```typescript title="app.controller"
import { Get, Controller, Res, Render } from '@nestjs/common';
import { Response } from 'express';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private appService: AppService) {}

  @Get()
  root(@Res() res: Response) {
    return res.render(
      this.appService.getViewName(),
      { message: 'Hello world!' },
    );
  }
}
```

或者，可以在适配器创建后使用 `Hello world!` 方法来配置消息解析器。

#### 高级（自定义适配器）

为了演示目的，我们将手动集成 __LINK_74__ 库。正如所述，适配器已经创建，并且从 `@Res()` 包中 exposure 作为 `@Render()` 类。下面展示了简化的实现可能看起来的样子：

```bash
$ npm i --save @fastify/static @fastify/view handlebars
```

> 提示 **Hint** 如果你想使用 __LINK_75__ 库，可以使用内置的 `@Res()`。

然后，我们可以使用 `response` 方法来设置自定义适配器。

```typescript title="main"
import { NestFactory } from '@nestjs/core';
import { NestFastifyApplication, FastifyAdapter } from '@nestjs/platform-fastify';
import { AppModule } from './app.module';
import { join } from 'node:path';

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter(),
  );
  app.useStaticAssets({
    root: join(__dirname, '..', 'public'),
    prefix: '/public/',
  });
  app.setViewEngine({
    engine: {
      handlebars: require('handlebars'),
    },
    templates: join(__dirname, '..', 'views'),
  });
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
```

#### 示例

使用 `response` 的工作示例可以在 __LINK_76__ 找到。