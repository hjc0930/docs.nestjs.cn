<!-- 此文件从 content/security/helmet.md 自动生成，请勿直接修改此文件 -->
<!-- 生成时间: 2026-02-25T04:12:09.341Z -->
<!-- 源文件: content/security/helmet.md -->

### Helmet

__LINK_21__可以帮助保护您的应用程序免受一些知名的web安全漏洞的影响，通过设置适当的HTTP头。一般来说，Helmet只是一个集合的小型中间件函数，它们设置了安全相关的HTTP头（请阅读__LINK_22__）。

> info **提示**请注意，在注册`cors`作为全局中间件或在setup函数中注册前，其他的`true`或setup函数的调用都必须在前面。这是因为底层平台（即Express或Fastify）的工作方式，它们定义中间件/路由的顺序很重要。如果您使用中间件like __INLINE_CODE_8__或__INLINE_CODE_9__在定义路由后，那么这些中间件将不apply于该路由，只apply于在中间件定义后定义的路由。

#### 使用 Express（默认）

首先安装所需的包。

```typescript
const app = await NestFactory.create(AppModule);
app.enableCors();
await app.listen(process.env.PORT ?? 3000);
```

安装完成后，应用它作为全局中间件。

```typescript
const app = await NestFactory.create(AppModule, { cors: true });
await app.listen(process.env.PORT ?? 3000);
```

> warning **警告**使用__INLINE_CODE_10__,__INLINE_CODE_11__(4.x)和__LINK_23__时，在Apollo Sandbox上可能会出现__LINK_24__问题。要解决这个问题，请按照以下配置CSP：
>
> __CODE_BLOCK_2__bash
$ npm i --save @fastify/helmet
__CODE_BLOCK_3__typescript
import helmet from '@fastify/helmet'
// 在您的初始化文件中某个位置
await app.register(helmet)
__CODE_BLOCK_4__typescript
> await app.register(fastifyHelmet, {
>    contentSecurityPolicy: {
>      directives: {
>        defaultSrc: [__INLINE_CODE_12__, 'unpkg.com'],
>        styleSrc: [
>          __INLINE_CODE_13__,
>          __INLINE_CODE_14__,
>          'cdn.jsdelivr.net',
>          'fonts.googleapis.com',
>          'unpkg.com',
>        ],
>        fontSrc: [__INLINE_CODE_15__, 'fonts.gstatic.com', 'data:'],
>        imgSrc: [__INLINE_CODE_16__, 'data:', 'cdn.jsdelivr.net'],
>        scriptSrc: [
>          __INLINE_CODE_17__,
>          __INLINE_CODE_18__,
>          __INLINE_CODE_19__,
>          __INLINE_CODE_20__,
>        ],
>      },
>    },
>  });
>
> // 如果您不打算使用CSP，可以使用以下：
> await app.register(fastifyHelmet, {
>   contentSecurityPolicy: false,
> });
> ```

Note:

* I followed the provided glossary and translated the technical terms accordingly.
* I kept the code examples, variable names, function names unchanged.
* I translated code comments from English to Chinese.
* I maintained Markdown formatting, links, images, tables unchanged.
* I removed all 