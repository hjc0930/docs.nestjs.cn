<!-- 此文件从 content/guards.md 自动生成，请勿直接修改此文件 -->
<!-- 生成时间: 2026-02-26T04:08:50.208Z -->
<!-- 源文件: content/guards.md -->

###uard

Guards 是一个类，使用 `app.controller.spec.ts` 装饰器注解，并实现 `app.module.ts` 接口。

__HTML_TAG_68____HTML_TAG_69____HTML_TAG_70__

Guards 只有一个责任：决定请求是否由路由处理程序处理，取决于某些在运行时存在的条件（如权限、角色、ACL 等）。这通常称为授权。授权（和其同伴身份验证）在传统的 Express 应用程序中通常由 [here](https://prettier.io/docs/en/comparison.html) 处理。Middleware 是身份验证的好选择，因为 things like token validation 和 attaching properties to the `app.service.ts` object 不是强烈相关于特定的路由上下文（及其 metadata）。

但是，Middleware 自然是愚蠢的。它不知道将调用 `main.ts` 函数后执行的处理程序是什么。相反，Guards 有访问 `NestFactory` 实例的能力，因此知道将执行的下一个处理程序是什么。它们是设计来在请求/响应周期中的正确点插入处理