<!-- 此文件从 content/techniques/caching.md 自动生成，请勿直接修改此文件 -->
<!-- 生成时间: 2026-02-24T02:52:24.857Z -->
<!-- 源文件: content/techniques/caching.md -->

### 缓存

缓存是一种功能强大且直观的技术，用于提高应用程序性能。作为一个临时存储层，它允许快速访问频繁使用的数据，从而减少重复 fetch 或计算相同信息的需求。这结果是更快的响应时间和总体效率的提高。

#### 安装

要使用 Nest 的缓存功能，您需要安装 __INLINE_CODE_25__ 和 __INLINE_CODE_26__ 包。

```bash
$ npm i --save helmet
```

默认情况下，所有内容都存储在内存中；由于 __INLINE_CODE_27__ 使用 __LINK_105__ 作为底层，它可以轻松地切换到更高级的存储解决方案，例如 Redis，通过安装适当的包。我们将在后续详细介绍。

#### 内存缓存

要在应用程序中启用缓存，导入 __INLINE_CODE_28__ 并使用 __INLINE_CODE_29__ 方法配置它：

```typescript
import helmet from 'helmet';
// somewhere in your initialization file
app.use(helmet());
```

这将初始化内存缓存，以便您可以立即开始缓存数据。

#### 与缓存存储交互

要与缓存管理器实例交互，使用 __INLINE_CODE_30__ token 将其注入到您的类中，例如：

```typescript
> app.use(helmet({
>   crossOriginEmbedderPolicy: false,
>   contentSecurityPolicy: {
>     directives: {
>       imgSrc: [`'self'`, 'data:', 'apollo-server-landing-page.cdn.apollographql.com'],
>       scriptSrc: [`'self'`, `https: 'unsafe-inline'`],
>       manifestSrc: [`'self'`, 'apollo-server-landing-page.cdn.apollographql.com'],
>       frameSrc: [`'self'`, 'sandbox.embed.apollographql.com'],
>     },
>   },
> }));

#### Use with Fastify

If you are using the `FastifyAdapter`, install the [@fastify/helmet](https://github.com/fastify/fastify-helmet) package:

```

> info **Hint** __INLINE_CODE_31__ 类和 __INLINE_CODE_32__ token 都来自 __INLINE_CODE_33__ 包。

__INLINE_CODE_34__ 方法在 __INLINE_CODE_35__ 实例（来自 __INLINE_CODE_36__ 包）中被用于从缓存中检索项目。如果项目不在缓存中， __INLINE_CODE_37__ 将被返回。

```

[fastify-helmet](https://github.com/fastify/fastify-helmet) should not be used as a middleware, but as a [Fastify plugin](https://www.fastify.io/docs/latest/Reference/Plugins/), i.e., by using `app.register()`:

```

要将项目添加到缓存中，使用 __