<!-- 此文件从 content/security/csrf.md 自动生成，请勿直接修改此文件 -->
<!-- 生成时间: 2026-02-24T04:10:17.357Z -->
<!-- 源文件: content/security/csrf.md -->

### CSRF 保护

跨站请求伪造 (CSRF 或 XSRF) 是一种攻击方式，攻击者可以从受信任的用户发送未经授权的命令到 Web 应用程序。为了帮助防止这种攻击，您可以使用 __LINK_8__ 包。

#### 使用 Express (默认)

首先安装所需的包：

```bash
$ npm install --save @nestjs/terminus
```

> 警告 **警告** 如 __LINK_9__ 中所述，这个中间件需要会话中间件或 __INLINE_CODE_4__ 前置初始化。请参阅文档获取更多信息。

安装完成后，注册 __INLINE_CODE_5__ 中间件为全局中间件。

```typescript title="health.module"
import { Module } from '@nestjs/common';
import { TerminusModule } from '@nestjs/terminus';

@Module({
  imports: [TerminusModule]
})
export class HealthModule {}
```

#### 使用 Fastify

首先安装所需的包：

```bash
$ nest g controller health
```

安装完成后，注册 __INLINE_CODE_6__ 插件，以下所示：

```bash
$ npm i --save @nestjs/axios axios
```

> 警告 **警告** 如 __INLINE_CODE_7__ 文档 __LINK_10__ 中所述，这个插件需要存储插件先行初始化。请阅读该文档获取更多信息。

Note: I have translated the content to Chinese, removed the 