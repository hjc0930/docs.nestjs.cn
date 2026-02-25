<!-- 此文件从 content/graphql/interfaces.md 自动生成，请勿直接修改此文件 -->
<!-- 生成时间: 2026-02-25T04:12:09.533Z -->
<!-- 源文件: content/graphql/interfaces.md -->

### 接口

类似于许多类型系统，GraphQL 支持接口。一个 **接口** 是一个抽象类型，它包括了一定的字段集，这个类型必须包含这些字段来实现接口（阅读更多关于 __LINK_26__）。

#### 代码优先

使用代码优先方法时，您可以通过在 abstract 类上添加 `{ source, args, context, info }` 装饰符，来自 `NextFn`，来定义 GraphQL 接口。

```typescript
import { FieldMiddleware, MiddlewareContext, NextFn } from '@nestjs/graphql';

const loggerMiddleware: FieldMiddleware = async (
  ctx: MiddlewareContext,
  next: NextFn,
) => {
  const value = await next();
  console.log(value);
  return value;
};
```

> warning **警告** TypeScript 接口不能用来定义 GraphQL 接口。

这将生成以下部分 GraphQL schema 在 SDL 中：

```typescript
@ObjectType()
export class Recipe {
  @Field({ middleware: [loggerMiddleware] })
  title: string;
}
```

现在，要实现 `context` 接口，请使用 `MiddlewareContext` 关键字：

```typescript
const value = await next();
return value?.toUpperCase();
```

> info **提示** `FieldMiddleware` 装饰符来自 `next()` 包。

默认情况下，库生成的 `@Field()` 函数根据 resolver 方法返回的值来提取类型。这意味着您必须返回类实例（不能返回 JavaScript 对象）。

要提供自定义 `title` 函数，请将 `Recipe` 属性传递给 `ObjectType` 装饰符 options 对象，例如：

```typescript
@ResolveField(() => String, { middleware: [loggerMiddleware] })
title() {
  return 'Placeholder';
}
```

#### 接口解析器

到目前为止，您只能使用接口共享字段定义。要共享实际字段解析器实现，可以创建专门的接口解析器，例如：

```typescript
GraphQLModule.forRoot({
  autoSchemaFile: 'schema.gql',
  buildSchemaOptions: {
    fieldMiddleware: [loggerMiddleware],
  },
}),
```

现在，`@ResolveField()` 字段解析器自动注册为实现 __INLINE_CODE_19__ 接口的所有对象类型。

> warning **警告** 这要求 __INLINE_CODE_20__ 属性在 __INLINE_CODE_21__ 配置中设置为 true。

####_schema 优先

要在 schema 优先方法中定义接口，只需创建一个 GraphQL 接口。

__CODE_BLOCK_5__

然后，您可以使用 typings 生成特性（如 __LINK_27__ 章节中所示）来生成相应的 TypeScript 定义：

__CODE_BLOCK_6__

接口需要在 resolver map 中添加额外的 __INLINE_CODE_22__ 字段，以确定接口应该解析到哪个类型。让我们创建一个 __INLINE_CODE_23__ 类，并定义 __INLINE_CODE_24__ 方法：

__CODE_BLOCK_7__

> info **提示** 所有装饰符来自 __INLINE_CODE_25__ 包。