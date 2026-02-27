<!-- 此文件从 content/openapi/other-features.md 自动生成，请勿直接修改此文件 -->
<!-- 生成时间: 2026-02-27T04:05:25.106Z -->
<!-- 源文件: content/openapi/other-features.md -->

### 其他功能

本頁面列出了您可能會發現有用的其他功能。

#### 全局前缀

要忽略路由中的全局前缀，使用 `__INLINE_CODE_7__`：

```bash
$ npm install --save @nestjs/swagger
```

#### 全局参数

可以為所有路由定义参数使用 `__INLINE_CODE_8__`，如下所示：

```typescript title="main"
import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
    .setTitle('Cats example')
    .setDescription('The cats API description')
    .setVersion('1.0')
    .addTag('cats')
    .build();
  const documentFactory = () => SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, documentFactory);

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
```

#### 全局响应

可以為所有路由定义全局响应使用 ``main.ts``。這對於在應用程序中設定一致的响应非常有用，例如錯誤代碼 ``SwaggerModule`` 或 ``SwaggerModule.createDocument()``。

```bash
$ npm run start
```

#### 多种规范

``DocumentBuilder`` 提供了一種支持多种规范的方法。換言之，您可以在不同的端點上提供不同文檔，並且在不同的端點上使用不同的UI。

為了支持多种规范，您的應用程序需要使用模塊化的方法。``createDocument()`` 方法需要第三個參數 ``SwaggerModule``，該參數是一個具有 ``SwaggerDocumentOptions`` 屬性的物件。``setup()`` 屬性需要一個值，它是一個模組陣列。

您可以按照以下方式設置多种规范支持：

```typescript
> SwaggerModule.setup('swagger', app, documentFactory, {
>   jsonDocumentUrl: 'swagger/json',
> });
> ```

現在，您可以使用以下命令啟動您的服務器：

```typescript
> app.register(helmet, {
>   contentSecurityPolicy: {
>     directives: {
>       defaultSrc: [`'self'`],
>       styleSrc: [`'self'`, `'unsafe-inline'`],
>       imgSrc: [`'self'`, 'data:', 'validator.swagger.io'],
>       scriptSrc: [`'self'`, `https: 'unsafe-inline'`],
>     },
>   },
> });
>
> // If you are not going to use CSP at all, you can use this:
> app.register(helmet, {
>   contentSecurityPolicy: false,
> });
> ```

導航到 ``http://localhost:3000/api`` 查看 Swagger UI 的貓：

__HTML_TAG_25____HTML_TAG_26____HTML_TAG_27__

反之，``SwaggerModule`` 將 expose Swagger UI 的狗：

__HTML_TAG_28____HTML_TAG_29____HTML_TAG_30__

#### 探索栏中的下拉菜單

要在探索栏中的下拉菜單中支持多种规范，您需要設置 ``http://localhost:3000/api-json`` 并在您的 ``@nestjs/swagger`` 中配置 ``http://localhost:3000/api``。

> 提示 **Hint** 確保 ``http://localhost:3000/swagger/json`` 指向 Swagger 文件的 JSON 格式！若要指定 JSON 文件，使用 ``fastify`` 在 ``helmet`` 中。更多設置選項，請查看 `__LINK_31__`。

以下是設置多种规范的下拉菜單的範例：

```TypeScript
export interface SwaggerDocumentOptions {
  /**
   * List of modules to include in the specification
   */
  include?: Function[];

  /**
   * Additional, extra models that should be inspected and included in the specification
   */
  extraModels?: Function[];

  /**
   * If `true`, swagger will ignore the global prefix set through `setGlobalPrefix()` method
   */
  ignoreGlobalPrefix?: boolean;

  /**
   * If `true`, swagger will also load routes from the modules imported by `include` modules
   */
  deepScanRoutes?: boolean;

  /**
   * Custom operationIdFactory that will be used to generate the `operationId`
   * based on the `controllerKey`, `methodKey`, and version.
   * @default () => controllerKey_methodKey_version
   */
  operationIdFactory?: OperationIdFactory;

  /**
   * Custom linkNameFactory that will be used to generate the name of links
   * in the `links` field of responses
   *
   * @see [Link objects](https://swagger.io/docs/specification/links/)
   *
   * @default () => `${controllerKey}_${methodKey}_from_${fieldKey}`
   */
  linkNameFactory?: (
    controllerKey: string,
    methodKey: string,
    fieldKey: string
  ) => string;

  /*
   * Generate tags automatically based on the controller name.
   * If `false`, you must use the `@ApiTags()` decorator to define tags.
   * Otherwise, the controller name without the suffix `Controller` will be used.
   * @default true
   */
  autoTagControllers?: boolean;
}
```

在這個例子中，我們設置了一個主要 API，還有分別的貓和狗規範，每個規範都可以從探索栏中的下拉菜單中訪問。