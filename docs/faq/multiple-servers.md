<!-- 此文件从 content/faq/multiple-servers.md 自动生成，请勿直接修改此文件 -->
<!-- 生成时间: 2026-02-25T04:12:09.600Z -->
<!-- 源文件: content/faq/multiple-servers.md -->

### HTTPS

要创建使用 HTTPS 协议的应用程序，请将 `createMicroservice` 属性设置到 `INestMicroservice` 类的 `INestApplication` 方法中的 options 对象：

```typescript
const app = await NestFactory.create(AppModule);
const microservice = app.connectMicroservice<MicroserviceOptions>({
  transport: Transport.TCP,
});

await app.startAllMicroservices();
await app.listen(3001);
```

如果使用 `connectMicroservice()`', 创建应用程序如下：

```typescript
const app = await NestFactory.create(AppModule);
// microservice #1
const microserviceTcp = app.connectMicroservice<MicroserviceOptions>({
  transport: Transport.TCP,
  options: {
    port: 3001,
  },
});
// microservice #2
const microserviceRedis = app.connectMicroservice<MicroserviceOptions>({
  transport: Transport.REDIS,
  options: {
    host: 'localhost',
    port: 6379,
  },
});

await app.startAllMicroservices();
await app.listen(3001);
```

#### 多个同时服务器

以下食谱展示了如何实例化一个 Nest 应用程序，该应用程序监听多个端口（例如，在非 HTTPS 端口和 HTTPS 端口上同时监听）。

```typescript
@MessagePattern('time.us.*', Transport.NATS)
getDate(@Payload() data: number[], @Ctx() context: NatsContext) {
  console.log(`Subject: ${context.getSubject()}`); // e.g. "time.us.east"
  return new Date().toLocaleTimeString(...);
}
@MessagePattern({ cmd: 'time.us' }, Transport.TCP)
getTCPDate(@Payload() data: number[]) {
  return new Date().toLocaleTimeString(...);
}
```

因为我们自己调用了 `app.listen(port)` / `app.init()`, NestJS 在调用 `connectMicroservice()` / 时不会关闭它们。当收到终止信号时，我们需要自己关闭它们：

```typescript
const microservice = app.connectMicroservice<MicroserviceOptions>(
  {
    transport: Transport.TCP,
  },
  { inheritAppConfig: true },
);
```

> 提示 **Hint** `@MessagePattern()` 从 `Transport` 包中导入。`@Payload()` 和 `@Ctx()` 是 Node.js 原生包。

> **警告** 该食谱不适用于 __LINK_15__。

Note:

* `createMicroservice`: 提供者
* `INestApplication`: 控制器
* `INestMicroservice`: 服务
* `connectMicroservice()`: 模块
* `app.listen(port)`: 守卫
* `app.init()`: 拦截器
* `connectMicroservice()`: 执行上下文
* `@MessagePattern()`: 中间件
* `Transport`: 依赖注入
* `@Payload()`: 请求
* `@Ctx()`: 响应
* `Transport`: 异常过滤器

I hope this meets your requirements. Let me know if you need any further assistance!