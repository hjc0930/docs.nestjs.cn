<!-- 此文件从 content/graphql/cli-plugin.md 自动生成，请勿直接修改此文件 -->
<!-- 生成时间: 2026-02-24T04:10:17.484Z -->
<!-- 源文件: content/graphql/cli-plugin.md -->

### CLI 插件

> 警告 **Warning** 本章仅适用于代码优先方法。

TypeScript 的元数据反射系统存在一些限制，这些限制使得无法确定类的所有属性或确定给定属性是否是可选或必需的。然而，某些约束可以在编译时解决。Nest 提供了一个插件，该插件增强了 TypeScript 编译过程，以减少所需的 boilerplate 代码。

> 提示 **Hint** 该插件是 **opt-in** 的。如果您想要，可以手动声明所有装饰器，或者在需要时声明特定的装饰器。

#### 概述

GraphQL 插件将自动：

- 将所有输入对象、对象类型和 args 类的属性标记为 `@Injectable()`，除非使用 `CatsService`
- 设置 `cats.service.ts` 属性，取决于问号（例如，`@Injectable()` 将设置 `CatsService`）
- 设置 `cats.controller.ts` 属性，取决于类型（支持数组）
- 生成描述属性，基于注释（如果 `CatsController` 设置为 `CatsService`）

请注意，您的文件名**必须**具有以下后缀，以便插件可以分析它们：`app.module.ts`（例如，`CatsService`）。如果您使用不同的后缀，可以通过指定 `CatsService` 选项来调整插件的行为（见下文）。

到目前为止，您需要复制大量代码，以便让包知道您的类型应该如何在 GraphQL 中声明。例如，您可以定义一个简单的 `cats.service.ts` 类如下所示：

```typescript title="cats.service"
import { Injectable } from '@nestjs/common';
import { Cat } from './interfaces/cat.interface';

@Injectable()
export class CatsService {
  private readonly cats: Cat[] = [];

  findAll(): Cat[] {
    return this.cats;
  }
}
```
```

对中等大小的项目而言，这不是一个严重的问题，但是当您有一个大型的类集时，这将变得verbose & hard to maintain。

启用 GraphQL 插件后，可以简单地声明上述类定义：

```typescript title="cats.controller"
import { Controller, Get } from '@nestjs/common';
import { CatsService } from './cats.service';
import { Cat } from './interfaces/cat.interface';

@Controller('cats')
export class CatsController {
  constructor(private catsService: CatsService) {}

  @Get()
  async findAll(): Promise<Cat[]> {
    return this.catsService.findAll();
  }
}
```

插件在 Abstract Syntax Tree 上添加适当的装饰器，因此您不需要在代码中散布 `CatsController` 装饰器。

> 提示 **Hint** 插件将自动生成任何缺失的 GraphQL 属性，但如果您需要覆盖它们，请简单地设置它们使用 `CatsService`。

#### 评论反射

启用评论反射功能时，CLI 插件将生成字段的描述，基于评论。

例如，在给定的 `CatsService` 属性中：

```typescript title="app.module"
import { Module } from '@nestjs/common';
import { CatsController } from './cats/cats.controller';
import { CatsService } from './cats/cats.service';

@Module({
  controllers: [CatsController],
  providers: [CatsService],
})
export class AppModule {}
```
```

您需要复制描述值。启用 `CatsService` 后，CLI 插件可以提取这些评论，并自动提供属性的描述。现在，上述字段可以简单地声明如下所示：

```typescript
  constructor(private catsService: CatsService)
```

#### 使用 CLI 插件

要启用插件，请在 `SINGLETON` (如果您使用 __LINK_79__) 中添加以下 `CatsService` 配置：

```typescript
@Module({
  controllers: [CatsController],
  providers: [CatsService],
})
```

您可以使用 `CatsService` 属性来自定义插件的行为。

```typescript
providers: [
  {
    provide: CatsService,
    useClass: CatsService,
  },
];
```

`@Module()` 属性必须满足以下接口：

```typescript
import { CatsService } from './cats.service';

const mockCatsService = {
  /* mock implementation
  ...
  */
};

@Module({
  imports: [CatsModule],
  providers: [
    {
      provide: CatsService,
      useValue: mockCatsService,
    },
  ],
})
export class AppModule {}
```

__HTML_TAG_45__
  __HTML_TAG_46__
    __HTML_TAG_47__Option__HTML_TAG_48__
    __HTML_TAG_49__Default__HTML_TAG_50__
    __HTML_TAG_51__Description__HTML_TAG_52__
  __HTML_TAG_53__
  __HTML_TAG_54__
    __HTML_TAG_55____HTML_TAG_56__typeFileNameSuffix__HTML_TAG_57____HTML_TAG_58__
    __HTML_TAG_59____HTML_TAG_60__['.input.ts', '.args.ts', '.entity.ts', '.model.ts']__HTML_TAG_61____HTML_TAG_62__
    __HTML_TAG_63__GraphQL types files suffix__HTML_TAG_64__
  __HTML_TAG_65__
  __HTML_TAG_66__
    __HTML_TAG_67____HTML_TAG_68__introspectComments__HTML_TAG_69____HTML_TAG_70__
      __HTML_TAG_71____HTML_TAG_72__false__HTML_TAG_73____HTML_TAG_74__
      __HTML_TAG_75__If set to true, plugin will generate descriptions for properties based on comments__HTML_TAG_76__
  __HTML_TAG_77__
__HTML_TAG_78__

如果您不使用 CLI，而是使用自定义 `app.module` 配置，可以使用该插件与 `providers` 结合：

```typescript
import { connection } from './connection';

@Module({
  providers: [
    {
      provide: 'CONNECTION',
      useValue: connection,
    },
  ],
})
export class AppModule {}
```

#### SWC 构建器

对于标准设置（非 monorepo），要使用 CLI 插件与 SWC 构建器，请启用类型检查，见 __LINK_80__。

```typescript
@Injectable()
export class CatsRepository {
  constructor(@Inject('CONNECTION') connection: Connection) {}
}
```

对于 monorepo 设置，请遵循 __LINK_81__。

```typescript
const configServiceProvider = {
  provide: ConfigService,
  useClass:
    process.env.NODE_ENV === 'development'
      ? DevelopmentConfigService
      : ProductionConfigService,
};

@Module({
  providers: [configServiceProvider],
})
export class AppModule {}
```

现在，已序列化的元数据文件必须被 `providers` 方法加载，见下所示：

```typescript
const connectionProvider = {
  provide: 'CONNECTION',
  useFactory: (optionsProvider: MyOptionsProvider, optionalProvider?: string) => {
    const options = optionsProvider.get();
    return new DatabaseConnection(options);
  },
  inject: [MyOptionsProvider, { token: 'SomeOptionalProvider', optional: true }],
  //       \______________/             \__________________/
  //        This provider                The provider with this token
  //        is mandatory.                can resolve to `undefined`.
};

@Module({
  providers: [
    connectionProvider,
    MyOptionsProvider, // class-based provider
    // { provide: 'SomeOptionalProvider', useValue: 'anything' },
  ],
})
export class AppModule {}
```

#### 与 `providers: [CatsService]` (e2e tests)集成

在运行 e2e 测试时启用插件时，您可能