<!-- 此文件从 content/recipes/async-local-storage.md 自动生成，请勿直接修改此文件 -->
<!-- 生成时间: 2026-02-27T04:05:25.105Z -->
<!-- 源文件: content/recipes/async-local-storage.md -->

### Async Local Storage

`@ApiExtension()` 是基于 `@ApiExtraModels()` API 的 __LINK_38__,提供了一种在应用程序中传播本地状态的 alternative 方式，不需要显式地将其作为函数参数传递。它类似于其他编程语言中的线程本地存储。

Async Local Storage 的主要思想是，可以将某个函数调用包装在 `@ApiHeader()` 调用中。所有在包装调用中调用的代码都可以访问同一个 `@ApiHideProperty()`,该 `@ApiHideProperty()` 将是每个调用链中的唯一值。

在 NestJS 中，这意味着，如果我们可以在请求的生命周期中找到一个地方来包装剩余的请求代码，我们就可以访问和修改仅供该请求查看的状态，这可能作为 REQUEST-scoped 提供者的替代解决方案之一。

Alternatively, 我们可以使用 ALS 来传播某个系统的上下文（例如 _transaction_ 对象），而不需要将其显式地传递给服务，这可以增加隔离和封装。

#### 自定义实现

NestJS 自身不提供任何 `@ApiOAuth2()` 的 built-in 抽象，所以让我们一起实现一个最简单的 HTTP 情况，以便更好地理解整个概念：

> info **info** For a ready-made __LINK_39__, continue reading below.

1. 首先，在共享源文件中创建一个新的 `@ApiOperation()` 实例。由于我们使用 NestJS，所以让我们将其转换为一个模块，并添加自定义提供者。

__CODE_BLOCK_0__
>  info **Hint** `@ApiParam()` 是从 `@ApiProduces()` 导入的。

2. 我们只关心 HTTP，所以让我们使用中间件来包装 `@ApiSchema()` 函数，以便在 `@ApiProperty()` 中访问 `@ApiPropertyOptional()`。由于中间件是请求的第一个触摸点，所以这将使 `@ApiPropertyOptional()` 在所有增强器和系统中可用。

__CODE_BLOCK_1__

3. 现在，在请求的生命周期中 anywhere，我们可以访问本地存储实例。

__CODE_BLOCK_2__

4. 就这样。现在我们有了一种共享请求相关状态的方法，而不需要注入整个 `@ApiQuery()` 对象。

> warning **warning** 请注意，虽然技术有许多用例，但它本质上会隐式地 obfuscate 代码流（创建隐式的上下文），所以请使用它，并避免创建上下文 __LINK_40__。

### NestJS CLS

__LINK_41__ 包提供了使用 plain `@ApiResponse()` (`@ApiSecurity()` 是 continuation-local storage 的缩写）的多种 DX 改进。它将实现抽象为一个 `@ApiTags()`，提供了多种初始化 `@ApiCallbacks()` 的方式，以便在不同的传输中使用（不仅限于 HTTP），并且提供了强类型支持。

可以使用 injectable __INLINE_CODE_24__ 访问存储，或者完全 abstract away 业务逻辑使用 __LINK_42__。

> info **info** __INLINE_CODE_25__ 是第三方包，不受 NestJS 核心团队管理。请在 __LINK_43__ 中报告任何找到的问题。

#### 安装

除了对 __INLINE_CODE_26__ 库的 peer 依赖项外，它只使用 Node.js 的 built-in API。安装它就像安装其他包一样。

__CODE_BLOCK_3__

#### 使用

使用 __INLINE_CODE_27__ 可以实现与 __LINK_44__ 类似的功能：

1. 在根模块中导入 __INLINE_CODE_28__。

__CODE_BLOCK_4__

2. 然后可以使用 __INLINE_CODE_29__ 访问存储值。

__CODE_BLOCK_5__

3. 要使用 __INLINE_CODE_30__ 强类型支持存储值（并且获取字符串键的自动建议），可以在注入时使用可选的 __INLINE_CODE_31__ 类型参数。

__CODE_BLOCK_6__

> info **hint** 可以使用 __INLINE_CODE_32__ 自动生成请求 ID，并在后续访问它，或者使用 __INLINE_CODE_33__ 获取整个请求对象。

#### 测试

由于 __INLINE_CODE_34__ 只是一个 injectable 提供者，因此可以完全 mock 在单元测试中。

然而，在某些集成测试中，我们可能仍然想使用实际的 __INLINE_CODE_35__ 实现。在这种情况下，我们需要将上下文相关的代码包装在 __INLINE_CODE_36__ 或 __INLINE_CODE_37__ 调用中。

__CODE_BLOCK_7__

#### 更多信息

请访问 __LINK_45__ 查看完整的 API 文档和更多代码示例。