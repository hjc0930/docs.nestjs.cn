<!-- 此文件从 content/microservices\interceptors.md 自动生成，请勿直接修改此文件 -->
<!-- 生成时间: 2026-02-28T06:24:18.139Z -->
<!-- 源文件: content/microservices\interceptors.md -->

### Interceptors

There is no difference between [regular interceptors](/interceptors) and microservices interceptors. The following example uses a manually instantiated method-scoped interceptor. Just as with HTTP based applications, you can also use controller-scoped interceptors (i.e., prefix the controller class with a `@UseInterceptors()` decorator).

```typescript
@@filename()
@UseInterceptors(new TransformInterceptor())
@MessagePattern({ cmd: 'sum' })
accumulate(data: number[]): number {
  return (data || []).reduce((a, b) => a + b);
}
```
