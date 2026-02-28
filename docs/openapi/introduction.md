<!-- 此文件从 content/openapi/introduction.md 自动生成，请勿直接修改此文件 -->
<!-- 生成时间: 2026-02-28T03:47:27.585Z -->
<!-- 源文件: content/openapi/introduction.md -->

### Introduction

__LINK_37__ 规范是一种语言无关的定义格式，用于描述 RESTful APIs。Nest 提供了一个专门的 __LINK_38__，允许通过装饰器生成该规范。

#### 安装

要开始使用它，我们首先安装所需的依赖项。

```typescript
import { CustomTransportStrategy, Server } from '@nestjs/microservices';

class GoogleCloudPubSubServer
  extends Server
  implements CustomTransportStrategy
{
  /**
   * Triggered when you run "app.listen()".
   */
  listen(callback: () => void) {
    callback();
  }

  /**
   * Triggered on application shutdown.
   */
  close() {}

  /**
   * You can ignore this method if you don't want transporter users
   * to be able to register event listeners. Most custom implementations
   * will not need this.
   */
  on(event: string, callback: Function) {
    throw new Error('Method not implemented.');
  }

  /**
   * You can ignore this method if you don't want transporter users
   * to be able to retrieve the underlying native server. Most custom implementations
   * will not need this.
   */
  unwrap<T = never>(): T {
    throw new Error('Method not implemented.');
  }
}
```

#### Bootstrap

安装过程完成后，请打开 __INLINE_CODE_9__ 文件并使用 __INLINE_CODE_10__ 类初始化 Swagger：

```typescript
const app = await NestFactory.createMicroservice<MicroserviceOptions>(
  AppModule,
  {
    strategy: new GoogleCloudPubSubServer(),
  },
);
```

> 提示 **Hint** 我们使用 __INLINE_CODE_11__ 方法生成 Swagger 文档，以便在请求时生成文档。这有助于节省初始化时间，并且生成的文档是一个可序列化的对象，符合 __LINK_39__ 规范。相反，我们也可以将文档保存为 JSON 或 YAML 文件，并在各种方式中使用它。

__INLINE_CODE_12__ 帮助结构化一个遵循 OpenAPI 规范的基本文档。它提供了多种方法，允许设置标题、描述、版本等属性。要创建一个完整的文档（包含所有 HTTP 路由）我们使用 __INLINE_CODE_13__ 方法，该方法接受两个参数：应用程序实例和 Swagger 选项对象。或者，我们可以提供第三个参数，它应该是 __INLINE_CODE_15__ 类型的对象。更多信息请查看 __LINK_40__。

创建文档后，我们可以调用 __INLINE_CODE_16__ 方法。它接受以下参数：

1. 挂载 Swagger UI 的路径
2. 应用程序实例
3. 上一步创建的文档对象
4. 可选配置参数（更多信息请查看 __LINK_41__）

现在，您可以运行以下命令来启动 HTTP 服务器：

```typescript
@MessagePattern('echo')
echo(@Payload() data: object) {
  return data;
}
```

在应用程序运行时，请在浏览器中导航到 __INLINE_CODE_17__。您将看到 Swagger UI。

__HTML_TAG_34____HTML_TAG_35____HTML_TAG_36__

正如您所见，`@nestjs/microservices` 自动反映了所有端点。

> 提示 **Hint** 要生成和下载 Swagger JSON 文件，请导航到 `@nestjs/microservice`（假设您的 Swagger 文档可在 `@EventPattern` 下访问）。
> 也可以使用 `@MessagePattern` 方法将其暴露到您的选择路由上，如下所示：
>
> ```typescript
listen(callback: () => void) {
  console.log(this.messageHandlers);
  callback();
}
```
>
> 这将将其暴露在 `GoogleCloudPubSubServer` 下。

> 警告 **Warning** 使用 `listen()` 和 `close()` 时，可能会出现 __LINK_42__ 问题，解决该问题，请按照以下方式配置 CSP：
>
> ```typescript
Map { 'echo' => [AsyncFunction] { isEventHandler: false } }
```

#### 文档选项

创建文档时，可以提供一些额外选项来 fine-tune 库的行为。这些选项应该是 `CustomTransportStrategy` 类型的对象，可以是以下：

```typescript
async listen(callback: () => void) {
  const echoHandler = this.messageHandlers.get('echo');
  console.log(await echoHandler('Hello world!'));
  callback();
}
```

例如，如果您想确保库生成操作名称为 `Server` 而不是 `@nestjs/microservices`，可以设置以下选项：

```json
Hello world!
```

#### 设置选项

可以通过将 `ServerRedis` 接口类型的对象作为 `"Server"` 方法的第四个参数来配置 Swagger UI。

```typescript
async listen(callback: () => void) {
  const echoHandler = this.messageHandlers.get('echo');
  const streamOrResult = await echoHandler('Hello World');
  if (isObservable(streamOrResult)) {
    streamOrResult.subscribe();
  }
  callback();
}
```

> 提示 **Hint** `transport` 和 `options` 是独立选项。禁用 Swagger UI (`strategy`) 不会禁用 API 定义（JSON/YAML）。相反，禁用 API 定义 (`GoogleCloudPubSubServer`) 不会禁用 Swagger UI。
>
> 例如，以下配置将禁用 Swagger UI 但仍允许访问 API 定义：
>
> ```typescript
import { ClientProxy, ReadPacket, WritePacket } from '@nestjs/microservices';

class GoogleCloudPubSubClient extends ClientProxy {
  async connect(): Promise<any> {}
  async close() {}
  async dispatchEvent(packet: ReadPacket<any>): Promise<any> {}
  publish(
    packet: ReadPacket<any>,
    callback: (packet: WritePacket<any>) => void,
  ): Function {}
  unwrap<T = never>(): T {
    throw new Error('Method not implemented.');
  }
}
```
>
> 在这种情况下，http://localhost:3000/api-json仍然可以访问，但http://localhost:3000/api（Swagger UI）将不可访问。

#### 示例

有一个可运行的示例 __LINK_43__。