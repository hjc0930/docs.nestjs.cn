<!-- 此文件从 content/microservices/guards.md 自动生成，请勿直接修改此文件 -->
<!-- 生成时间: 2026-02-28T03:47:27.629Z -->
<!-- 源文件: content/microservices/guards.md -->

### 守卫

微服务守卫与__LINK_6__之间没有本质的差别。唯一的区别是，相反，你应该使用__INLINE_CODE_2__，而不是抛出__INLINE_CODE_1__。

> 信息 **提示** __INLINE_CODE_3__ 类是来自 __INLINE_CODE_4__ 包的。

#### 绑定守卫

以下示例使用了方法作用域的守卫。与基于 HTTP 的应用程序一样，你也可以使用控制器作用域的守卫（即将控制器类prefixed with a `HttpException` 装饰器）。

```typescript
throw new RpcException('Invalid credentials.');
```

Translation Notes:

* __INLINE_CODE_1__ -> 异常
* __INLINE_CODE_2__ -> 使用
* __INLINE_CODE_3__ -> 类
* __INLINE_CODE_4__ -> 包
* `HttpException` -> 守卫
* __LINK_6__ -> [未知链接]

Note: The __LINK_6__ link is not provided, please fill in the correct link.