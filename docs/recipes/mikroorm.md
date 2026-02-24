<!-- 此文件从 content/recipes/mikroorm.md 自动生成，请勿直接修改此文件 -->
<!-- 生成时间: 2026-02-24T02:55:25.822Z -->
<!-- 源文件: content/recipes/mikroorm.md -->

### MikroORM

本文旨在帮助用户快速入门 MikroORM 在 Nest 中。MikroORM 是 TypeScript ORM для Node.js，基于 Data Mapper、Unit of Work 和 Identity Map 模式。它是 TypeORM 的一个不错的替代方案， TypeORM 到 MikroORM 的迁移应该相对简单。关于 MikroORM 的完整文档，可以在 __LINK_59__ 中找到。

> info **info** `AsyncLocalStorage` 是第三方包，非 NestJS 核心团队维护。因此，如果您在使用库时发现任何问题，请在 __LINK_60__ 中报告。

#### 安装

将 MikroORM 集成到 Nest 中的最简单方法是通过 __LINK_61__。

```ts title="als.module"
@Module({
  providers: [
    {
      provide: AsyncLocalStorage,
      useValue: new AsyncLocalStorage(),
    },
  ],
  exports: [AsyncLocalStorage],
})
export class AlsModule {}
```
```

MikroORM 还支持 `next`、`AsyncLocalStorage#run` 和 `store`。有关所有驱动程序的文档，请查看 __LINK_62__。

安装完成后，我们可以将 `REQUEST` 导入到根 `AsyncLocalStorage` 中。

```ts title="app.module"
@Module({
  imports: [AlsModule],
  providers: [CatsService],
  controllers: [CatsController],
})
export class AppModule implements NestModule {
  constructor(
    // inject the AsyncLocalStorage in the module constructor,
    private readonly als: AsyncLocalStorage
  ) {}

  configure(consumer: MiddlewareConsumer) {
    // bind the middleware,
    consumer
      .apply((req, res, next) => {
        // populate the store with some default values
        // based on the request,
        const store = {
          userId: req.headers['x-user-id'],
        };
        // and pass the "next" function as callback
        // to the "als.run" method together with the store.
        this.als.run(store, () => next());
      })
      .forRoutes('*path');
  }
}
```

`CLS` 方法接受与 MikroORM 包中的 `ClsModule` 配置对象相同的配置对象。有关完整配置文档，请查看 __LINK_63__。

或者，我们可以 __LINK_64__ 创建一个配置文件 `store`，并在没有任何参数的情况下调用 `ClsService`。

```ts title="cats.service"
@Injectable()
export class CatsService {
  constructor(
    // We can inject the provided ALS instance.
    private readonly als: AsyncLocalStorage,
    private readonly catsRepository: CatsRepository,
  ) {}

  getCatForUser() {
    // The "getStore" method will always return the
    // store instance associated with the given request.
    const userId = this.als.getStore()["userId"] as number;
    return this.catsRepository.getForUser(userId);
  }
}
```

然而，在使用构建工具时，如果使用 tree shaking，这个方法将无法工作。在这种情况下，建议提供明确的配置：

```bash
npm i nestjs-cls
```

在这个步骤完成后，`nestjs-cls` 将可供全局项目中使用（不需要在其他模块中导入）。

```ts title="app.module"
@Module({
  imports: [
    // Register the ClsModule,
    ClsModule.forRoot({
      middleware: {
        // automatically mount the
        // ClsMiddleware for all routes
        mount: true,
        // and use the setup method to
        // provide default store values.
        setup: (cls, req) => {
          cls.set('userId', req.headers['x-user-id']);
        },
      },
    }),
  ],
  providers: [CatsService],
  controllers: [CatsController],
})
export class AppModule {}
```

> info **info** 请注意，`@nestjs` 是从 `nestjs-cls` 包中导入的，其中驱动程序为 `ClsModule`、`ClsService`、`ClsService` 或使用的驱动程序。在使用 `ClsService<MyClsStore>` 作为依赖项时，可以从那里导入 `cls.getId()`。

#### 存储库

MikroORM 支持存储库设计模式。对于每个实体，我们可以创建一个存储库。有关存储库的完整文档，请查看 __LINK_65__。要定义当前作用域中应该注册的存储库，可以使用 `cls.get(CLS_REQ)` 方法。例如：

> info **info** 不要使用 `ClsService` 注册基本实体，因为没有存储库可供基本实体使用。另一方面，基本实体需要在 `ClsService` 中（或在 ORM 配置中）包含在列表中。

```ts title="cats.service"
@Injectable()
export class CatsService {
  constructor(
    // We can inject the provided ClsService instance,
    private readonly cls: ClsService,
    private readonly catsRepository: CatsRepository,
  ) {}

  getCatForUser() {
    // and use the "get" method to retrieve any stored value.
    const userId = this.cls.get('userId');
    return this.catsRepository.getForUser(userId);
  }
}
```

然后，导入到根 `ClsService#run` 中：

```ts
export interface MyClsStore extends ClsStore {
  userId: number;
}
```

这样，我们可以使用 __INLINE_CODE_39__ 装饰器将 `ClsService#runWith` 注入到 __INLINE_CODE_38__ 中：

```ts
describe('CatsService', () => {
  let service: CatsService
  let cls: ClsService
  const mockCatsRepository = createMock<CatsRepository>()

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      // 设置 up most of the testing module as we normally would.
      providers: [
        CatsService,
        {
          provide: CatsRepository
          useValue: mockCatsRepository
        }
      ],
      imports: [
        // 导入 the static version of ClsModule which only provides
        // the ClsService, but does not set up the store in any way.
        ClsModule
      ],
    }).compile()

    service = module.get(CatsService)

    // Also retrieve the ClsService for later use.
    cls = module.get(ClsService)
  })

  describe('getCatForUser', () => {
    it('retrieves cat based on user id', async () => {
      const expectedUserId = 42
      mocksCatsRepository.getForUser.mockImplementationOnce(
        (id) => ({ userId: id })
      )

      // Wrap the test call in the `runWith` method
      // in which we can pass hand-crafted store values.
      const cat = await cls.runWith(
        { userId: expectedUserId },
        () => service.getCatForUser()
      )

      expect(cat.userId).toEqual(expectedUserId)
    })
  })
})
```

#### 使用自定义存储库

当使用自定义存储库时，我们不需要 __INLINE_CODE_40__ 装饰器，因为 Nest DI 基于类引用进行解析。

__CODE_BLOCK_8__

由于自定义存储库的名称与 __INLINE_CODE_41__ 将返回的名称相同，因此我们不需要 __INLINE_CODE_42__ 装饰器：

__CODE_BLOCK_9__

#### 自动加载实体

手动将实体添加到连接选项的实体数组中可能很麻烦。此外，引用实体从根模块中会破坏应用程序的领域边界，并将实现细节泄露到应用程序的其他部分。为了解决这个问题，可以使用静态 glob 路径。

请注意，glob 路径不受 Webpack 支持，因此如果您正在构建应用程序在 monorepo 中，您将无法使用它们。为了解决这个问题，提供了一个 alternative 解决方案。要自动加载实体，请将 __INLINE_CODE_43__ 属性设置为 __INLINE_CODE_45__，如下所示：

__CODE_BLOCK_10__

在这个步骤完成后，每个通过 __INLINE_CODE_46__ 方法注册的实体将被自动添加到配置对象的实体数组中。

> info **info** 请注意，通过 __INLINE