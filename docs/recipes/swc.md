<!-- 此文件从 content/recipes/swc.md 自动生成，请勿直接修改此文件 -->
<!-- 生成时间: 2026-02-26T04:08:50.464Z -->
<!-- 源文件: content/recipes/swc.md -->

### SWC

__LINK_81__ (Speedy Web Compiler) 是一个基于 Rust 的可扩展平台，可以用于编译和捆绑。使用 SWC 与 Nest CLI 是一个简单的方法，可以大大加速您的开发过程。

> info **Hint** SWC 的速度约为 default TypeScript 编译器的 **x20** 倍。

#### 安装

首先安装以下几个包：

```bash
$ npm install --save @sentry/nestjs @sentry/profiling-node
```

#### 获取开始

安装过程完成后，您可以使用 __INLINE_CODE_25__ 建立者与 Nest CLI，以下是使用的方法：

```typescript title="instrument"
const Sentry = require("@sentry/nestjs");
const { nodeProfilingIntegration } = require("@sentry/profiling-node");

// Ensure to call this before requiring any other modules!
Sentry.init({
  dsn: SENTRY_DSN,
  integrations: [
    // Add our Profiling integration
    nodeProfilingIntegration(),
  ],

  // Add Tracing by setting tracesSampleRate
  // We recommend adjusting this value in production
  tracesSampleRate: 1.0,

  // Set sampling rate for profiling
  // This is relative to tracesSampleRate
  profilesSampleRate: 1.0,
});
```

> info **Hint** 如果您的仓库是一个 monorepo，請查看 __LINK_82__。

您也可以通过将 __INLINE_CODE_27__ 属性设置为 __INLINE_CODE_28__ 在您的 __INLINE_CODE_29__ 文件中来实现这个功能：

```typescript title="main"
// Import this first!
import "./instrument";

// Now import other modules
import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(3000);
}

bootstrap();
```
```

#### 自定义

要自定义 builder 的行为，您可以传入一个包含两个属性 __INLINE_CODE_30__（__INLINE_CODE_31__）和 __INLINE_CODE_32__ 的对象：

```typescript title="app.module"
import { Module } from "@nestjs/common";
import { SentryModule } from "@sentry/nestjs/setup";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";

@Module({
  imports: [
    SentryModule.forRoot(),
    // ...other modules
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
```

例如，要使 swc 编译 __INLINE_CODE_33__ 和 __INLINE_CODE_34__ 文件，请执行以下命令：

```typescript
import { Catch, ExceptionFilter } from '@nestjs/common';
import { SentryExceptionCaptured } from '@sentry/nestjs';

@Catch()
export class YourCatchAllExceptionFilter implements ExceptionFilter {
  @SentryExceptionCaptured()
  catch(exception, host): void {
    // your implementation here
  }
}
```

#### 监听模式

要在监听模式下运行应用程序，请使用以下命令：

```typescript title="app.module"
import { Module } from "@nestjs/common";
import { APP_FILTER } from "@nestjs/core";
import { SentryGlobalFilter } from "@sentry/nestjs/setup";

@Module({
  providers: [
    {
      provide: APP_FILTER,
      useClass: SentryGlobalFilter,
    },
    // ..other providers
  ],
})
export class AppModule {}
```

#### 类型检查

SWC 不会本身执行类型检查（与 default TypeScript 编译器不同），因此要启用它，您需要使用 __INLINE_CODE_35__ 标志：

```bash
npx @sentry/wizard@latest -i sourcemaps
```

这将 instruct Nest CLI 在 __INLINE_CODE_37__ 模式下异步执行类型检查。您也可以使用 __INLINE_CODE_39__ 属性在您的 __INLINE_CODE_41__ 文件中设置 __INLINE_CODE_40__：

```typescript
@Get("debug-sentry")
getError() {
  throw new Error("My first Sentry error!");
}
```

#### CLI 插件（SWC）

__INLINE_CODE_42__ 标志将自动执行 **NestJS CLI 插件** 并生成一个序列化的元数据文件，然后可以在应用程序运行时被加载。

#### SWC 配置

SWC 建立者已经预先配置以匹配 NestJS 应用程序的要求。然而，您可以通过在根目录创建一个 __INLINE_CODE_43__ 文件并调整选项来自定义配置：

__CODE_BLOCK_8__

#### Monorepo

如果您的仓库是一个 monorepo，那么您需要使用 __INLINE_CODE_45__ 建立者而不是 __INLINE_CODE_44__ 建立者。

首先，安装必要的包：

__CODE_BLOCK_9__

安装完成后，创建一个 __INLINE_CODE_47__ 文件在应用程序的根目录中，以下是内容：

__CODE_BLOCK_10__

#### Monorepo 和 CLI 插件

现在，如果您使用 CLI 插件,__INLINE_CODE_48__ 将不会自动加载它们。相反，您需要创建一个单独的文件来手动加载它们。要做到，请在 __INLINE_CODE_50__ 文件附近创建一个 __INLINE_CODE_49__ 文件，以下是内容：

__CODE_BLOCK_11__

> info **Hint** 在这个示例中，我们使用了 __INLINE_CODE_51__ 插件，但是您可以使用任何插件。

###