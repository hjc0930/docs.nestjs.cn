<!-- 此文件从 content/openapi/operations.md 自动生成，请勿直接修改此文件 -->
<!-- 生成时间: 2026-02-28T03:47:27.585Z -->
<!-- 源文件: content/openapi/operations.md -->

### 操作

在 OpenAPI 中，路径是 API expose 的端点（资源），例如 __INLINE_CODE_21__ 或 __INLINE_CODE_22__，操作是用于操作这些路径的 HTTP 方法，例如 __INLINE_CODE_23__、__INLINE_CODE_24__ 或 __INLINE_CODE_25__。

#### 标签

要将控制器附加到特定的标签中，使用 __INLINE_CODE_26__ 装饰器。

```typescript
@UsePipes(new ValidationPipe({ exceptionFactory: (errors) => new RpcException(errors) }))
@MessagePattern({ cmd: 'sum' })
accumulate(data: number[]): number {
  return (data || []).reduce((a, b) => a + b);
}
```

#### 头

要定义自定义的请求头，使用 __INLINE_CODE_27__。

__CODE_BLOCK_1__

#### 响应

要定义自定义的 HTTP 响应，使用 __INLINE_CODE_28__ 装饰器。

__CODE_BLOCK_2__

Nest 提供了一组简洁的 **API 响应** 装饰器，继承自 __INLINE_CODE_29__ 装饰器：

- __INLINE_CODE_30__
- __INLINE_CODE_31__
- __INLINE_CODE_32__
- __INLINE_CODE_33__
- __INLINE_CODE_34__
- __INLINE_CODE_35__
- __INLINE_CODE_36__
- __INLINE_CODE_37__
- __INLINE_CODE_38__
- __INLINE_CODE_39__
- __INLINE_CODE_40__
- __INLINE_CODE_41__
- __INLINE_CODE_42__
- __INLINE_CODE_43__
- __INLINE_CODE_44__
- __INLINE_CODE_45__
- __INLINE_CODE_46__
- __INLINE_CODE_47__
- __INLINE_CODE_48__
- __INLINE_CODE_49__
- __INLINE_CODE_50__
- __INLINE_CODE_51__
- __INLINE_CODE_52__
- __INLINE_CODE_53__
- __INLINE_CODE_54__
- __INLINE_CODE_55__

__CODE_BLOCK_3__

要指定请求的返回模型，我们必须创建一个类，并将所有属性标注为 __INLINE_CODE_56__ 装饰器。

__CODE_BLOCK_4__

然后，可以使用 __INLINE_CODE_57__ 模型在与 __INLINE_CODE_58__ 属性的响应装饰器一起使用。

__CODE_BLOCK_5__

现在，让我们打开浏览器并验证生成的 __INLINE_CODE_59__ 模型：

__HTML_TAG_94____HTML_TAG_95____HTML_TAG_96__

而不是为每个端点或控制器定义响应，我们可以定义一个全局响应来应用于所有端点，使用 __INLINE_CODE_60__ 类。这 approach 是有用的，当你想要为应用程序中的所有端点定义一个全局响应（例如，错误响应，如 __INLINE_CODE_61__ 或 __INLINE_CODE_62__）。

__CODE_BLOCK_6__

#### 文件上传

可以使用 __INLINE_CODE_63__ 装饰器和 __INLINE_CODE_64__ 来启用文件上传。下面是一个使用 __LINK_97__ 技术的完整示例：

__CODE_BLOCK_7__

其中 __INLINE_CODE_65__ 定义如下：

__CODE_BLOCK_8__

要处理多个文件上传，可以将 __INLINE_CODE_66__ 定义如下：

__CODE_BLOCK_9__

#### 扩展

要添加一个扩展到请求中，使用 __INLINE_CODE_67__ 装饰器。扩展名必须以 __INLINE_CODE_68__ 开头。

__CODE_BLOCK_10__

#### 高级：通用 __INLINE_CODE_69__

通过提供 __LINK_98__，我们可以定义通用模式以供 Swagger UI 使用。假设我们有以下 DTO：

__CODE_BLOCK_11__

我们跳过装饰 __INLINE_CODE_70__，因为我们将在稍后提供一个原始定义。现在，让我们定义另一个 DTO，并将其命名为 __INLINE_CODE_71__，如下所示：

__CODE_BLOCK_12__

现在，我们可以定义一个 __INLINE_CODE_72__ 响应，如下所示：

__CODE_BLOCK_13__

在这个示例中，我们指定响应将具有所有Of __INLINE_CODE_73__，并且 __INLINE_CODE_74__ 属性将是类型 __INLINE_CODE_75__ 的。

- __INLINE_CODE_76__ 函数返回 OpenAPI Schema 路径，从 OpenAPI Spec 文件中获取给定的模型。
- __INLINE_CODE_77__ 是 OAS 3 提供的概念，以覆盖各种继承相关的用例。

最后，因为 __INLINE_CODE_78__ 不是由控制器直接引用，所以 __INLINE_CODE_79__ 将无法生成对应的模型定义。 在这种情况下，我们必须将其添加为 __LINK_99__。例如，我们可以使用 __INLINE_CODE_80__ 装饰器在控制器级别，如下所示：

__CODE_BLOCK_14__

如果你现在运行 Swagger，生成的 __INLINE_CODE_81__ 对于这个特定端点将具有以下响应定义：

__CODE_BLOCK_15__

为了使其可重用，我们可以创建一个自定义的 __INLINE_CODE_82__ 装饰器，如下所示：

__CODE_BLOCK_16__

>  info **Hint** __INLINE_CODE_83__ 接口和 __INLINE_CODE_84__ 函数来自 __INLINE_CODE_85__ 包。

为了确保 __INLINE_CODE_86__ 会生成定义，我们必须将