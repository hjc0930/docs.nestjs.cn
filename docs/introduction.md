<!-- 此文件从 content/introduction.md 自动生成，请勿直接修改此文件 -->
<!-- 生成时间: 2026-02-27T04:05:24.371Z -->
<!-- 源文件: content/introduction.md -->

### Introduction

Nest (NestJS) 是一个用于构建高效、可扩展的服务端应用程序的框架。它使用渐进式 JavaScript，基于 TypeScript 构建，并且完全支持 TypeScript（同时也允许开发者使用纯 JavaScript），并结合 OOP、FP 和 FRP 的元素。

在底层，Nest 使用强大的 HTTP 服务器框架，如 __LINK_12__（默认）和可选地可以配置使用 __LINK_13__。

Nest 提供了一个高于常见 Node.js 框架（Express/Fastify）的抽象层，同时也 expose 了它们的 API 给开发者。这给开发者提供了使用第三方模块的自由，包括 Node.js 平台上的多种第三方模块。

#### Philosophy

近年来， thanks to Node.js，JavaScript 已经成为 web 的“语言 franca”，用于前端和后端应用程序。这使得项目如 __LINK_14__、__LINK_15__ 和 __LINK_16__ 等能够提高开发者生产力，并使得创建快速、可测试、可扩展的前端应用程序变得可能。然而，在解决架构问题方面，none of them effectively solve the main problem of **architecture**。

Nest 提供了一个可以创建高度可测试、可扩展、松耦合和易于维护的应用程序架构。架构受到 Angular 的 heavy inspiration。

#### Installation

要开始使用，可以使用 __LINK_17__ 或 __LINK_18__（两个命令将产生相同的结果）。

使用 Nest CLI 创建项目，可以运行以下命令。这将创建一个新的项目目录，并将初始核心 Nest 文件和支持模块填充到目录中，创建一个传统的项目结构。使用 **Nest CLI** 创建新项目是推荐的首选项。我们将在 __LINK_19__ 继续使用这个方法。

```shell
$ npm i express-session
$ npm i -D @types/express-session
```

> info **提示** 将 __INLINE_CODE_2__ 标记传递给 __INLINE_CODE_3__ 命令以创建一个新的 TypeScript 项目，具有更严格的功能集。

#### Alternatives

或者，您可以使用 Git 安装 TypeScript starter 项目：

```typescript
import * as session from 'express-session';
// somewhere in your initialization file
app.use(
  session({
    secret: 'my-secret',
    resave: false,
    saveUninitialized: false,
  }),
);
```

> info **提示** 如果您想克隆存储库而不包括 Git 历史记录，可以使用 __LINK_20__。

打开浏览器，并导航到 __LINK_21__。

要安装 JavaScript 版本的 starter 项目，可以在命令序列中使用 __INLINE_CODE_5__。

您还可以从头开始创建一个新项目，安装核心和支持包。请注意，您需要自己设置项目 boilerplate 文件。在最少情况下，您需要这些依赖项：__INLINE_CODE_6__、__INLINE_CODE_7__、`express-session` 和 `main.ts`。查看这篇短文，以了解如何创建完整的项目：__LINK_22__。