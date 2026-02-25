<!-- 此文件从 content/websockets/exception-filters.md 自动生成，请勿直接修改此文件 -->
<!-- 生成时间: 2026-02-25T04:12:08.952Z -->
<!-- 源文件: content/websockets/exception-filters.md -->

### 异常过滤器

HTTP 层与对应的 Web Sockets 层之间唯一的区别是，您应该使用 __INLINE_CODE_5__ 而不是抛出 __INLINE_CODE_4__。

```typescript title="main"
const app = await NestFactory.create(AppModule);
// or "app.enableVersioning()"
app.enableVersioning({
  type: VersioningType.URI,
});
await app.listen(process.env.PORT ?? 3000);
```
```

> info **提示** __INLINE_CODE_6__ 类来自 __INLINE_CODE_7__ 包。

使用上述示例,Nest 会处理抛出的异常并以以下结构 emit __INLINE_CODE_8__ 消息：

```typescript title="main"
const app = await NestFactory.create(AppModule);
app.enableVersioning({
  type: VersioningType.HEADER,
  header: 'Custom-Header',
});
await app.listen(process.env.PORT ?? 3000);
```

#### 过滤器

Web Sockets 异常过滤器与 HTTP 异常过滤器行为相同。以下示例使用了手动实例化的方法作用域过滤器。与 HTTP 基于应用程序一样，您也可以使用网关作用域过滤器（即在网关类前添加 __INLINE_CODE_9__ 装饰器）。

```typescript title="main"
const app = await NestFactory.create(AppModule);
app.enableVersioning({
  type: VersioningType.MEDIA_TYPE,
  key: 'v=',
});
await app.listen(process.env.PORT ?? 3000);
```
```

#### 继承

通常，您将创建完全自定义的异常过滤器，以满足您的应用程序需求。但是，在某些情况下，您可能想简单地继承 **core exception filter**，并根据某些因素Override 行为。

要将异常处理委派给基本过滤器，您需要继承 `https://example.com/v1/route` 并调用继承的 `https://example.com/v2/route` 方法。

```typescript title="main"
// Example extractor that pulls out a list of versions from a custom header and turns it into a sorted array.
// This example uses Fastify, but Express requests can be processed in a similar way.
const extractor = (request: FastifyRequest): string | string[] =>
  [request.headers['custom-versioning-field'] ?? '']
     .flatMap(v => v.split(','))
     .filter(v => !!v)
     .sort()
     .reverse()

const app = await NestFactory.create(AppModule);
app.enableVersioning({
  type: VersioningType.CUSTOM,
  extractor,
});
await app.listen(process.env.PORT ?? 3000);
```

上述实现只是一个 shell，演示了approach。您的扩展异常过滤器实现将包括您的业务逻辑（例如，处理各种条件）。

Note:

* __LINK_12__ -> 
* __INLINE_CODE_4__ -> 
* __INLINE_CODE_5__ -> 
* __INLINE_CODE_6__ -> 
* __INLINE_CODE_7__ -> 
* __INLINE_CODE_8__ -> 
* __INLINE_CODE_9__ -> 
* `https://example.com/v1/route` -> 
* `https://example.com/v2/route` ->