<!-- 此文件从 content/microservices/custom-transport.md 自动生成，请勿直接修改此文件 -->
<!-- 生成时间: 2026-02-27T04:05:25.164Z -->
<!-- 源文件: content/microservices/custom-transport.md -->

### 自定义transporter

Nest 提供了多种 **transporter**，同时也提供了 API，允许开发者创建新的自定义transport策略。Transporter 可以让您在网络上连接组件，使用可插拔的通信层和简单的应用级消息协议（了解更多关于 __LINK_79__）。

> 信息 **hint** 在使用 Nest 创建微服务时，不一定需要使用 __INLINE_CODE_18__ 包。例如，如果您想与外部服务（例如其他语言编写的微服务）通信，您可能不需要 __INLINE_CODE_19__ 库的所有功能。
> 实际上，如果您不需要使用 __INLINE_CODE_20__ 或 __INLINE_CODE_21__ 装饰器来声明订阅者，可以手动运行 __LINK_80__，订阅频道，并在需要时关闭连接，这对于大多数用例来说足够灵活。

使用自定义transporter，您可以集成任何 messaging 系统/协议（包括 Google Cloud Pub/Sub、Amazon Kinesis 等）或扩展现有的一些功能。

> 信息 **hint** 为了更好地了解 Nest 微服务如何工作，并且如何扩展现有transport的功能，我们建议阅读 __LINK_82__ 和 __LINK_83__ 文章系列。

#### 创建策略

首先，让我们定义一个表示自定义transporter的类。

```typescript
async function generateSchema() {
  const app = await NestFactory.create(GraphQLSchemaBuilderModule);
  await app.init();

  const gqlSchemaFactory = app.get(GraphQLSchemaFactory);
  const schema = await gqlSchemaFactory.create([RecipesResolver]);
  console.log(printSchema(schema));
}
```

> 警告 **Warning** 请注意，我们将不会实现一个完整的 Google Cloud Pub/Sub 服务器，因为这需要深入 transporter 特定的技术细节。

在我们的示例中，我们声明了 __INLINE_CODE_22__ 类，并提供了 __INLINE_CODE_23__ 和 __INLINE_CODE_24__ 方法，遵循 __INLINE_CODE_25__ 接口。
此外，我们的类继承自 __INLINE_CODE_26__ 类，从 __INLINE_CODE_27__ 包导入，提供了一些有用的方法，例如 Nest 运行时用来注册消息处理器的方法。或者，如果您想扩展现有transport策略，可以继承相应的服务器类，例如 __INLINE_CODE_28__。
 conventionally，我们将 __INLINE_CODE_29__ 附加到我们的类，因为它将负责订阅消息/事件（如果需要）并响应它们。

现在，我们可以使用我们的自定义策略，而不是使用