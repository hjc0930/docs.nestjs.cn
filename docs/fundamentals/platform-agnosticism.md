<!-- 此文件从 content/fundamentals/platform-agnosticism.md 自动生成，请勿直接修改此文件 -->
<!-- 生成时间: 2026-02-25T04:12:09.583Z -->
<!-- 源文件: content/fundamentals/platform-agnosticism.md -->

### 平台无关性

Nest 是一个平台无关的框架。这意味着您可以开发可在不同类型的应用程序中重用的逻辑部分。例如，大多数组件可以在不需要更改的情况下在不同底层 HTTP 服务器框架（例如 Express 和 Fastify）之间重用，并且可以在不同类型的应用程序之间重用（例如 HTTP 服务器框架、微服务应用程序具有不同的传输层和 WebSocket）。

#### 一次构建，随处使用

本文档的**概述**部分主要展示使用 HTTP 服务器框架（例如提供 REST API 或提供服务器端渲染的 MVC-style 应用程序）的编码技术。然而，这些构建块可以在不同传输层（__LINK_0__ 或 __LINK_1__）之上使用。

此外，Nest 还提供了一个专门的 __LINK_2__ 模块。您可以使用 GraphQL 作为 API 层，或者提供 REST API。

此外， __LINK_3__ 功能可以帮助您创建任何类型的 Node.js 应用程序 - 包括 CRON 作业和 CLI 应用程序 - 在 Nest 之上。

Nest 目标是成为 Node.js 应用程序的完整平台，为您的应用程序带来更高层次的模块性和可重用性。一次构建，随处使用！