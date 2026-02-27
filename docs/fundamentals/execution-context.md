<!-- 此文件从 content/fundamentals/execution-context.md 自动生成，请勿直接修改此文件 -->
<!-- 生成时间: 2026-02-27T04:05:25.255Z -->
<!-- 源文件: content/fundamentals/execution-context.md -->

### 执行上下文

Nest 提供了多种实用类，可以帮助您编写多个应用程序上下文（例如，Nest HTTP 服务器、微服务和 WebSocket 应用程序上下文）中的应用程序。这些实用类提供了当前执行上下文的信息，可以用于构建泛型 [guards](/guards)、[filters](/exception-filters) 和 [interceptors](/interceptors)，这些组件可以在多个控制器、方法和执行上下文中工作。

我们在本章中涵盖了两个实用类：__INLINE_CODE_23