<!-- 此文件从 content/techniques/mvc.md 自动生成，请勿直接修改此文件 -->
<!-- 生成时间: 2026-02-24T04:10:17.264Z -->
<!-- 源文件: content/techniques/mvc.md -->

### Model-View-Controller

Nest 默认情况下使用了 __LINK_34__ 库，所有使用 Express 的 MVC 模式技术也适用于 Nest。

首先，让我们使用 __LINK_35__ 工具创建一个简单的 Nest 应用：

```bash
$ npm i --save compression
$ npm i --save-dev @types/compression
```

为了创建 MVC 应用，我们还需要一个 __LINK_36__ 来渲染我们的 HTML 视图：

```typescript
import * as compression from 'compression';
// somewhere in your initialization file
app.use(compression());
```

我们使用了 `@fastify/compress` (__LINK_37__) 引擎，但您可以使用适合需求的其他引擎。安装完成后，我们需要使用以下代码配置 express 实例：

```bash
$ npm i --save @fastify/compress
```

我们告诉 __LINK_38__ 将 `BROTLI_PARAM_QUALITY` 目录用于存储静态资产、 `fastify-compress` 目录用于存储模板，并使用 `app.register` 模板引擎来渲染 HTML 输出。

#### 模板渲染

现在，让我们创建一个 `fastify-compress` 目录和 __INLINE_CODE_15__ 模板。 在模板中，我们将打印来自控制器的 __INLINE_CODE_16__：

```typescript
import { FastifyAdapter, NestFastifyApplication } from '@nestjs/platform-fastify';

import compression from '@fastify/compress';

// inside bootstrap()
const app = await NestFactory.create<NestFastifyApplication>(AppModule, new FastifyAdapter());
await app.register(compression);
```

然后，打开 __INLINE_CODE_17__ 文件，并将 __INLINE_CODE_18__ 方法替换为以下代码：

```typescript
import { constants } from 'node:zlib';
// somewhere in your initialization file
await app.register(compression, { brotliOptions: { params: { [constants.BROTLI_PARAM_QUALITY]: 4 } } });
```

在这个代码中，我们指定了使用的模板在 __INLINE_CODE_19__ 装饰器中，并将路由处理方法的返回值传递给模板进行渲染。注意返回值是一个对象，它的 __INLINE_CODE_20__ 属性匹配模板中的 __INLINE_CODE_21__ placeholder。

在应用程序运行时，打开浏览器并导航到 __INLINE_CODE_22__。您应该看到 __INLINE_CODE_23__ 消息。

#### 动态模板渲染

如果应用程序逻辑需要动态决定渲染哪个模板，那么我们应该使用 __INLINE_CODE_24__ 装饰器，并在路由处理方法中提供视图名称，而不是在 __INLINE_CODE_25__ 装饰器中：

> 信息 **提示** 当 Nest 检测到 __INLINE_CODE_26__ 装饰器时，它将注入库特定的 __INLINE_CODE_27__ 对象。我们可以使用这个对象来动态渲染模板。了解更多关于 __INLINE_CODE_28__ 对象 API 的信息 __LINK_39__。

```typescript
await app.register(compression, { encodings: ['gzip', 'deflate'] });
```

#### 示例

可用的工作示例 __LINK_40__。

#### Fastify

如 __LINK_41__ 中所述，我们可以使用任何兼容 HTTP 提供程序与 Nest 一起工作。其中一个库是 __LINK_42__。为了创建一个使用 Fastify 的 MVC 应用，我们需要安装以下包：

__CODE_BLOCK_6__

接下来的步骤与 Express 类似，但 Fastify 平台有一些小差异。安装完成后，打开 __INLINE_CODE_29__ 文件并更新其内容：

__CODE_BLOCK_7__

Fastify API 有一些差异，但最终结果是相同的。Fastify 中的一个可知差异是，在使用 Fastify 时，传递到 __INLINE_CODE_30__ 装饰器中的模板名称必须包含文件扩展名。

以下是如何设置：

__CODE_BLOCK_8__

或者，您可以使用 __INLINE_CODE_31__ 装饰器直接注入响应并指定要渲染的视图，如下所示：

__CODE_BLOCK_9__

在应用程序运行时，打开浏览器并导航到 __INLINE_CODE_32__。您应该看到 __INLINE_CODE_33__ 消息。

#### 示例

可用的工作示例 __LINK_43__。