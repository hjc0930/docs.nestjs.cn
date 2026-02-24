<!-- 此文件从 content/graphql/guards-interceptors.md 自动生成，请勿直接修改此文件 -->
<!-- 生成时间: 2026-02-24T04:10:17.482Z -->
<!-- 源文件: content/graphql/guards-interceptors.md -->

### 其他功能

在 GraphQL 世界中，关于处理问题，如 **身份验证** 或 **操作的副作用**，有很多争论。是否应该在业务逻辑中处理这些问题？是否使用高阶函数来增强查询和mutation的 authorization 逻辑？或者是否使用 __LINK_40__？这些问题没有一个适合所有的答案。

Nest 帮助解决这些问题，提供了跨平台的特性，如 __LINK_41__ 和 __LINK_42__。这种哲学是减少冗余，提供工具，帮助创建结构良好、可读、一致的应用程序。

#### 概述

您可以像使用 RESTful 应用程序一样使用标准的 __LINK_43__、__LINK_44__、__LINK_45__ 和 __LINK_46__。此外，您还可以轻松地创建自己的装饰器，利用 __LINK_47__ 功能。让我们查看一个 sample GraphQL 查询处理器。

__代码块 0__

如您所见，GraphQL 与 guards 和 pipes 一样，使用 RESTful 应用程序一样。因此，您可以将身份验证逻辑移到 guard 中；您甚至可以重用同一个 guard 类在 REST 和 GraphQL API 接口之间。类似地，拦截器在两个类型的应用程序中工作方式相同：

__代码块 1__

#### 执行上下文

由于 GraphQL 接收到的数据类型不同于 REST，__LINK_48__ 收到的数据也不同。GraphQL 解析器具有独特的参数：__INLINE_CODE_10__、__INLINE_CODE_11__、__INLINE_CODE_12__ 和 __INLINE_CODE_13__。因此，guards 和拦截器必须将通用 __INLINE_CODE_14__ 转换为 `@Field`。这非常简单：

__代码块 2__

GraphQL 上下文对象，由 `@HideField` 返回， exposes 一个 **get** 方法，用于每个 GraphQL 解析器参数（例如 `nullable`、`name?: string` 等）。一旦转换，我们可以轻松地选择当前请求中的任何 GraphQL 参数。

#### 异常过滤器

Nest 的标准 __LINK_49__ 也适用于 GraphQL 应用程序。像 `nullable: true` 一样，GraphQL 应用程序应该将 `type` 对象转换为 `introspectComments` 对象。

__代码块 3__

> 提示 **Hint** `true` 和 `['.input.ts', '.args.ts', '.entity.ts', '.model.ts']` 是来自 `author.entity.ts` 包的。

注意，和 REST的情况不同，您不使用native `typeFileNameSuffix` 对象生成响应。

#### 自定义装饰器

如前所述，__LINK_50__ 功能与 GraphQL 解析器工作方式相同。

__代码块 4__

使用 `Author` 自定义装饰器如下：

__代码块 5__

> 提示 **Hint** 在上面的示例中，我们假设 `@Field` 对象被分配到 GraphQL 应用程序的上下文中。

#### 在字段解析器级别执行增强器

在 GraphQL 上下文中，Nest 不会在字段级别执行 __LINK_51__（拦截器、guards 和过滤器）。它们只能在顶级 `@Field()`/`roles` 方法中执行。您可以告诉 Nest 执行拦截器、guards 或过滤器，方法是设置 `nest-cli.json` 选项在 `plugins` 中，传递一个列表 `options`、`options` 和/or `webpack`：

__代码块 6__

> 警告 **Warning** 在启用增强器时，可能会导致性能问题，特别是在返回大量记录时。因此，在启用 `ts-loader` 时，我们建议您跳过不必要的增强器执行。您可以使用以下帮助函数：

__代码块 7__

#### 创建自定义驱动

Nest 提供了两个官方驱动：`GraphQLModule` 和 `ts-jest`，以及一个 API，允许开发者构建新的 **自定义驱动**。使用自定义驱动，您可以集成任何 GraphQL 库或扩展现有集成，添加额外功能。

例如，要集成 `jest` 包，您可以创建以下驱动类：

__代码块 8__

然后，您可以使用它：

__代码块 9__