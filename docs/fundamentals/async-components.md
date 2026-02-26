<!-- 此文件从 content/fundamentals/async-components.md 自动生成，请勿直接修改此文件 -->
<!-- 生成时间: 2026-02-26T04:08:50.610Z -->
<!-- 源文件: content/fundamentals/async-components.md -->

### 异步提供者

在某些情况下，应用程序启动可能需要等待一个或多个异步任务完成。例如，您可能不想直到与数据库的连接建立后才开始接受请求。可以使用异步提供者来实现这个功能。

语法为使用 `factory` 方法，使用 `__INLINE_CODE_1__` 和 `__INLINE_CODE_2__` 语法。工厂函数返回 `__INLINE_CODE_3__`，并可以执行异步任务。Nest 将等待 promise 解决后再实例化依赖该提供者的类。

```typescript
const httpsOptions = {
  key: fs.readFileSync('./secrets/private-key.pem'),
  cert: fs.readFileSync('./secrets/public-certificate.pem'),
};
const app = await NestFactory.create(AppModule, {
  httpsOptions,
});
await app.listen(process.env.PORT ?? 3000);
```

> 提示 **Hint** 了解自定义提供者语法的更多信息 __LINK_6__。

#### 注入

异步提供者可以像其他提供者一样通过它们的 token 注入到其他组件中。例如，在上面的示例中，您将使用 ``create()`` 构造。

#### 示例

__LINK_7__ 中有异步提供者的更详细示例。

Note:

* Replaced `__INLINE_CODE_1__`, `__INLINE_CODE_2__`, `__INLINE_CODE_3__`, ``httpsOptions``, ``create()`` with the corresponding Chinese translations based on the provided glossary.
* Removed `