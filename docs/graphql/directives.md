<!-- 此文件从 content/graphql/directives.md 自动生成，请勿直接修改此文件 -->
<!-- 生成时间: 2026-02-28T03:47:27.685Z -->
<!-- 源文件: content/graphql/directives.md -->

### 指令

可以将指令附加到字段或片段包含中，并影响查询执行的任何方式（详见 __LINK_23__）。GraphQL 规范提供了几个默认指令：

- __INLINE_CODE_6__ - 只有当参数为 true 时才包括该字段在结果中
- __INLINE_CODE_7__ - 如果参数为 true 则跳过该字段
- __INLINE_CODE_8__ - 将字段标记为弃用，并带有消息

指令是一个由 __INLINE_CODE_9__ 字符开头的标识符， optionally 后跟着一个名为的参数列表，可以出现在 GraphQL 查询和 schema 语言中的 almost任何元素中。

#### 自定义指令

要 instruct Apollo/Mercurius 何时遇到您的指令，需要创建一个转换函数。该函数使用 __INLINE_CODE_10__ 函数遍历您的 schema 中的位置（字段定义、类型定义等）并执行相应的转换。

__CODE_BLOCK_0__

现在，在 __INLINE_CODE_12__ 方法中应用 __INLINE_CODE_11__ 转换函数使用 __INLINE_CODE_13__ 函数：

__CODE_BLOCK_1__

一旦注册，__INLINE_CODE_14__ 指令可以在我们的 schema 中使用。然而，应用指令的方式取决于您的approach（代码优先或schema 优先）。

#### 代码优先

在代码优先approach中，使用 __INLINE_CODE_15__ 装饰器来应用指令。

__CODE_BLOCK_2__

> info **提示** __INLINE_CODE_16__ 装饰器来自 __INLINE_CODE_17__ 包。

指令可以应用于字段、字段解析器、输入和对象类型、查询、mutation 和订阅中。以下是指令应用于查询处理器级别的示例：

__CODE_BLOCK_3__

> warn **警告** 通过 __INLINE_CODE_18__ 装饰器应用的指令不会反映在生成的 schema 定义文件中。

最后，确保在 __INLINE_CODE_19__ 中声明指令，如下所示：

__CODE_BLOCK_4__

> info **提示** both __INLINE_CODE_20__ 和 __INLINE_CODE_21__ 都来自 __INLINE_CODE_22__ 包。

#### schema 优先

在 schema 优先approach中，直接在 SDL 中应用指令。

__CODE_BLOCK_5__