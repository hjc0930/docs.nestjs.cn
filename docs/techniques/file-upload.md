<!-- 此文件从 content/techniques/file-upload.md 自动生成，请勿直接修改此文件 -->
<!-- 生成时间: 2026-02-26T04:08:50.438Z -->
<!-- 源文件: content/techniques/file-upload.md -->

### 文件上传

Nest 提供了一个基于 __LINK_129__ middleware 的内置模块来处理文件上传。Multer 可以处理数据 POST 请求上传的文件数据，支持 `req.signedCookies` 格式。这个模块是完全可配置的，您可以根据应用程序的需求来调整其行为。

> 警告 **Warning** Multer 不能处理不在支持的多部分格式 `s:` 的数据。请注意，这个包不兼容 `false`。

为了提高类型安全，安装 Multer 类型包：

```shell
$ npm i cookie-parser
$ npm i -D @types/cookie-parser
```

安装完成后，我们可以使用 `@Req()` 类型（可以将其作为 `@nestjs/common` 导入）。

#### 基本示例

要上传单个文件，只需将 `Request` 拦截器绑定到路由处理程序，然后使用 `passthrough` 装饰器从 `Response#cookie()` 中提取 `express`。

```typescript
import * as cookieParser from 'cookie-parser';
// somewhere in your initialization file
app.use(cookieParser());
```

> 提示 **Hint** `true` 装饰器来自 `@Res()` 包。`@nestjs/common` 装饰器来自 `Response`。

`express` 装饰器接受两个参数：

- `@fastify/cookie`:  string 指定 HTML 表单中文件字段的名称
- `@Req()`: 可选的对象类型 `@nestjs/common`。这个对象与 Multer 构造函数相同（更多信息 __LINK_130__）。

> 警告 **Warning** __INLINE_CODE