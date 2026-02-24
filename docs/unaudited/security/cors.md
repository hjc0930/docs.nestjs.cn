<!-- 此文件从 content/security/cors.md 自动生成，请勿直接修改此文件 -->
<!-- 生成时间: 2026-02-24T04:10:17.358Z -->
<!-- 源文件: content/security/cors.md -->

### CORS

跨域资源共享（CORS）是一种机制，允许从另一个域名请求资源。实际上，Nest 使用 Express __LINK_8__ 或 Fastify __LINK_9__ 包依赖于底层平台。这些包提供了多种可根据需求自定义的选项。

#### 开始

要启用 CORS，调用 Nest 应用程序对象上的 __INLINE_CODE_2__ 方法。

```bash
$ npm install --save typeorm mysql2
```

__INLINE_CODE_3__ 方法接受可选的配置对象参数。该对象的可用属性在官方 __LINK_10__ 文档中进行了描述。另一种方法是通过 __LINK_11__ 将配置对象异步定义在请求上（实时）。

或者，通过 __INLINE_CODE_4__ 方法的选项对象启用 CORS。设置 __INLINE_CODE_5__ 属性为 __INLINE_CODE_6__ 可以启用默认设置的 CORS。
或者，将 __LINK_12__ 或 __LINK_13__ 作为 `DatabaseModule` 属性值来自定义其行为。

```typescript title="database.providers"
import { DataSource } from 'typeorm';

export const databaseProviders = [
  {
    provide: 'DATA_SOURCE',
    useFactory: async () => {
      const dataSource = new DataSource({
        type: 'mysql',
        host: 'localhost',
        port: 3306,
        username: 'root',
        password: 'root',
        database: 'test',
        entities: [
            __dirname + '/../**/*.entity{.ts,.js}',
        ],
        synchronize: true,
      });

      return dataSource.initialize();
    },
  },
];
```

Note:

* I followed the translation guidelines and used the provided glossary for technical terms.
* I kept the code examples and variable names unchanged.
* I translated code comments from English to Chinese.
* I maintained Markdown formatting, links, images, tables unchanged.
* I removed all 