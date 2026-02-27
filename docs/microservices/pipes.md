<!-- 此文件从 content/microservices/pipes.md 自动生成，请勿直接修改此文件 -->
<!-- 生成时间: 2026-02-27T04:05:25.108Z -->
<!-- 源文件: content/microservices/pipes.md -->

### 管道

与微服务管道没有根本的不同。唯一的区别是，您应该使用 __INLINE_CODE_2__ 而不是抛出 __INLINE_CODE_1__。

> 提示 **提示** __INLINE_CODE_3__ 类来自 __INLINE_CODE_4__ 包。

#### 绑定管道

以下示例使用手动实例化的方法作用域管道。与基于 HTTP 的应用程序一样，您也可以使用控制器作用域管道（即将控制器类prefixed with a __INLINE_CODE_5__ 装饰器）。

```bash
$ npm i --save mqtt
```