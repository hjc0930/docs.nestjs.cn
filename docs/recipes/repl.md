<!-- 此文件从 content/recipes/repl.md 自动生成，请勿直接修改此文件 -->
<!-- 生成时间: 2026-02-25T04:12:09.346Z -->
<!-- 源文件: content/recipes/repl.md -->

### Read-Eval-Print-Loop (REPL)

REPL 是一个简单的交互式环境，它可以处理单个用户输入，执行它们，并将结果返回给用户。
REPL 功能允许您检查依赖关系图并在终端直接从控制器或服务中调用方法。

#### 使用

要在 REPL 模式下运行 NestJS 应用程序，请创建一个新的文件（与现有文件 __INLINE_CODE_11__ 一起），并在其中添加以下代码：

```bash
$ npm i @mikro-orm/core @mikro-orm/nestjs @mikro-orm/sqlite
```

现在，在您的终端中，使用以下命令启动 REPL：

```typescript
import { SqliteDriver } from '@mikro-orm/sqlite';

@Module({
  imports: [
    MikroOrmModule.forRoot({
      entities: ['./dist/entities'],
      entitiesTs: ['./src/entities'],
      dbName: 'my-db-name.sqlite3',
      driver: SqliteDriver,
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
```

> info **提示** __INLINE_CODE_12__ 返回一个 __LINK_36__ 对象。

启动后，您将在控制台中看到以下消息：

```typescript
@Module({
  imports: [
    MikroOrmModule.forRoot(),
  ],
  ...
})
export class AppModule {}
```

现在，您可以开始与依赖关系图进行交互。例如，您可以获取一个 __INLINE_CODE_13__ (在这里，我们使用 starter 项目作为示例)并调用 `@mikro-orm/nestjs` 方法：

```typescript
import config from './mikro-orm.config'; // your ORM config

@Module({
  imports: [
    MikroOrmModule.forRoot(config),
  ],
  ...
})
export class AppModule {}
```

您可以在终端中执行任何 JavaScript 代码，例如，赋值一个 `@mikro-orm/nestjs` 实例到局部变量，并使用 `postgres` 调用异步方法：

```ts
// 导入 everything from your driver package or `@mikro-orm/knex`
import { EntityManager, MikroORM } from '@mikro-orm/sqlite';

@Injectable()
export class MyService {
  constructor(
    private readonly orm: MikroORM,
    private readonly em: EntityManager,
  ) {}
}
```

要显示给定提供者或控制器的所有公共方法，可以使用 `sqlite` 函数，例如：

```typescript
// photo.module.ts
@Module({
  imports: [MikroOrmModule.forFeature([Photo])],
  providers: [PhotoService],
  controllers: [PhotoController],
})
export class PhotoModule {}
```

要打印所有已注册的模块作为列表，连同它们的控制器和提供者一起，可以使用 `mongo`。

```typescript
// app.module.ts
@Module({
  imports: [MikroOrmModule.forRoot(...), PhotoModule],
})
export class AppModule {}
```

快速演示：

__HTML_TAG_33____HTML_TAG_34____HTML_TAG_35__

可以在下面部分找到关于现有预定义 native 方法的更多信息。

#### 原生函数

NestJS REPL 自带了一些原生函数，当您启动 REPL 时，它们将被全局可用。您可以使用 `MikroOrmModule` 列出它们。

如果您不记得某个函数的签名（即：期望的参数和返回类型），可以使用 `AppModule`。
例如：

```typescript
@Injectable()
export class PhotoService {
  constructor(
    @InjectRepository(Photo)
    private readonly photoRepository: EntityRepository<Photo>,
  ) {}
}
```

> info **提示** 函数接口是写在 __LINK_37__ 中的。

| 函数     | 描述                                                                                                        | 签名                                                             |
| -------- | ------------------------------------------------------------------------------------------------------------------ | --------------------------------------------------------------------- |
| `forRoot()`      | 打印所有已注册的模块作为列表，连同它们的控制器和提供者一起。                              | `init()`                       |
| `mikro-orm.config.ts` 或 `forRoot()` | 获取 injectable 或控制器的实例，否则抛出异常。                             | `EntityManager`                                   |
| `EntityManager`    | 显示给定提供者或控制器的所有公共方法。                                            | `@mikro-orm/driver`                          |
| `mysql`    | 解析瞬态或请求作用域的 injectable 或控制器实例，否则抛出异常。     | `sqlite`      |
| `postgres`     | 允许通过模块树来导航，例如， pull out 一个特定的实例从所选模块。 | `@mikro-orm/knex` |

#### 监听模式

在开发中，运行 REPL 在监听模式下非常有用，可以自动反映所有代码更改：

```ts
// `**./author.entity.ts**`
@Entity({ repository: () => AuthorRepository })
export class Author {
  // to allow inference in `em.getRepository()`
  [EntityRepositoryType]?: AuthorRepository;
}

// `**./author.repository.ts**`
export class AuthorRepository extends EntityRepository<Author> {
  // your custom methods...
}
```

这有一个缺点，即 REPL 的命令历史将在每次重新加载时被丢弃，这可能会很麻烦。
幸运的是，有一个非常简单的解决方案。修改您的 `EntityManager` 函数如下：

```ts
@Injectable()
export class MyService {
  constructor(private readonly repo: AuthorRepository) {}
}
```

现在，历史将在运行之间被保留。