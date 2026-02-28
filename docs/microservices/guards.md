<!-- 此文件从 content/microservices\guards.md 自动生成，请勿直接修改此文件 -->
<!-- 生成时间: 2026-02-28T06:24:18.141Z -->
<!-- 源文件: content/microservices\guards.md -->

### Guards

There is no fundamental difference between microservices guards and [regular HTTP application guards](/guards).
The only difference is that instead of throwing `HttpException`, you should use `RpcException`.

> info **Hint** The `RpcException` class is exposed from `@nestjs/microservices` package.

#### Binding guards

The following example uses a method-scoped guard. Just as with HTTP based applications, you can also use controller-scoped guards (i.e., prefix the controller class with a `@UseGuards()` decorator).

```typescript
@@filename()
@UseGuards(AuthGuard)
@MessagePattern({ cmd: 'sum' })
accumulate(data: number[]): number {
  return (data || []).reduce((a, b) => a + b);
}
```
