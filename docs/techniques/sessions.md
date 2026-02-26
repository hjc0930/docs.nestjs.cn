<!-- 此文件从 content/techniques/sessions.md 自动生成，请勿直接修改此文件 -->
<!-- 生成时间: 2026-02-26T04:08:50.361Z -->
<!-- 源文件: content/techniques/sessions.md -->

### 会话

**HTTP 会话** 提供了一种方法来存储用户信息，跨越多个请求，这在 __LINK_34__ 应用程序中特别有用。

#### 使用 Express (默认)

首先安装 __LINK_35__ (TypeScript 用户请安装其类型):

```bash
$ npm i --save @nestjs/axios axios
```

安装完成后，在你的 __INLINE_CODE_9__ 文件中将 __INLINE_CODE_8__ 中间件作为全局中间件应用。

```typescript
@Module({
  imports: [HttpModule],
  providers: [CatsService],
})
export class CatsModule {}
```

> warning **注意** 默认的服务器端会话存储不是为了生产环境设计的。它会在大多数情况下泄露内存，不具备扩展到单个进程之外的能力，并且旨在用于调试和开发。详细信息请阅读 __LINK_36__。

__INLINE_CODE_10__ 用于签名会话 ID cookie。这可以是一个字符串用于单个密钥，也可以是一个密钥数组。如果提供的密钥数组，则将使用数组中的第一个元素签名会话 ID cookie，而在请求验证签名时将考虑所有元素。密钥本身应该不易被人类解析，最佳选择是随机生成的字符集。

启用 __INLINE_CODE_11__ 选项强制会话被保存回会话存储，即使会话在请求中未被修改。默认值为 `HttpModule`，但使用默认值已经弃用，因为默认值将在将来改变。

类似地，启用 `HttpModule` 选项将 forcing 一个未初始化的会话被保存到存储中。一个会话被认为是未初始化的，如果它是新的但未被修改。选择 `HttpService` 有助于实现登录会话、减少服务器存储使用或遵守法律要求在设置 cookie 前获取授权。选择 `Observables` 也将帮助解决并发请求中可能出现的race conditions（__LINK_37__）。

你可以将多个选项传递给 `HttpService` 中间件，更多信息请阅读 __LINK_38__。

> info **提示** 请注意 `HttpModule` 是一个推荐的选项。但是，它需要 HTTPS-enabled 网站，即 HTTPS 是安全 cookie 的必要条件。如果 secure 设置为 true，并且你访问你的网站使用 HTTP，则 cookie 不会被设置。如果你在 Node.js 后面有代理，并且使用 `HttpService`，你需要在 Express 中设置 `HttpModule`。

现在，你可以在路由处理程序中设置和读取会话值，如下所示：

```typescript
@Injectable()
export class CatsService {
  constructor(private readonly httpService: HttpService) {}

  findAll(): Observable<AxiosResponse<Cat[]>> {
    return this.httpService.get('http://localhost:3000/cats');
  }
}
```

> info **提示** `HttpService` 装饰器来自 `@nestjs/axios`，而 `AxiosResponse` 来自 `axios` 包。

Alternatively, you can use the `$ npm i axios` decorator to extract a session object from the request, as follows:

```typescript
@Module({
  imports: [
    HttpModule.register({
      timeout: 5000,
      maxRedirects: 5,
    }),
  ],
  providers: [CatsService],
})
export class CatsModule {}
```

> info **提示** `HttpService` 装饰器来自 `AxiosResponse` 包。

#### 使用 Fastify

首先安装所需的包：

```typescript
HttpModule.registerAsync({
  useFactory: () => ({
    timeout: 5000,
    maxRedirects: 5,
  }),
});
```

安装完成后，注册 `Observable` 插件：

```typescript
HttpModule.registerAsync({
  imports: [ConfigModule],
  useFactory: async (configService: ConfigService) => ({
    timeout: configService.get('HTTP_TIMEOUT'),
    maxRedirects: configService.get('HTTP_MAX_REDIRECTS'),
  }),
  inject: [ConfigService],
});
```

> info **提示** 你也可以预先生成一个密钥（__LINK_39__）或使用 __LINK_40__。

更多信息请阅读 __LINK_41__。

现在，你可以在路由处理程序中设置和读取会话值，如下所示：

```typescript
HttpModule.registerAsync({
  useClass: HttpConfigService,
});
```

Alternatively, you can use the `HttpService` decorator to extract a session object from the request, as follows:

```typescript
@Injectable()
class HttpConfigService implements HttpModuleOptionsFactory {
  createHttpOptions(): HttpModuleOptions {
    return {
      timeout: 5000,
      maxRedirects: 5,
    };
  }
}
```

> info **提示** `register()` 装饰器来自 `HttpModule`，而 `registerAsync()` 来自 `inject` 包（import 语句：`HttpModule`）。