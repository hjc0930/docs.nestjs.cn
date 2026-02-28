<!-- 此文件从 content/graphql/scalars.md 自动生成，请勿直接修改此文件 -->
<!-- 生成时间: 2026-02-28T03:47:27.678Z -->
<!-- 源文件: content/graphql/scalars.md -->

### Scalars

GraphQL 对象类型具有名称和字段，但是有一些时候，这些字段需要将其解析为某些具体数据。这就是 where the scalar types come in：它们代表查询的叶子节点（了解更多关于 __LINK_80__）。 GraphQL 包括以下默认类型： `GraphQLDirective`、 `DirectiveLocation`、 `graphql`、 __INLINE_CODE_23__ 和 __INLINE_CODE_24__。此外，您可能需要支持自定义原子数据类型（例如 __INLINE_CODE_25__）。

#### Code first

代码优先方法提供了五个 scalar，其中三个是对现有 GraphQL 类型的简单别名。

- __INLINE_CODE_26__（别名为 __INLINE_CODE_27__）- 表示唯一标识符，通常用于重新获取对象或作为缓存的关键
- __INLINE_CODE_28__（别名为 __INLINE_CODE_29__）- 签名 32 位整数
- __INLINE_CODE_30__（别名为 __INLINE_CODE_31__）- 签名双精度浮点值
- __INLINE_CODE_32__ - UTC 日期时间字符串（用于默认表示 __INLINE_CODE_33__ 类型）
- __INLINE_CODE_34__ - 签名整数，表示 UNIX_epoch 起始的毫秒数

__INLINE_CODE_35__（例如 __INLINE_CODE_36__）默认用于表示 __INLINE_CODE_37__ 类型。要使用 __INLINE_CODE_38__ 而不是 __INLINE_CODE_35__，请将 __INLINE_CODE_39__ 设置为 __INLINE_CODE_40__ 对象的 __INLINE_CODE_41__，如下所示：

```typescript
import { getDirective, MapperKind, mapSchema } from '@graphql-tools/utils';
import { defaultFieldResolver, GraphQLSchema } from 'graphql';

export function upperDirectiveTransformer(
  schema: GraphQLSchema,
  directiveName: string,
) {
  return mapSchema(schema, {
    [MapperKind.OBJECT_FIELD]: (fieldConfig) => {
      const upperDirective = getDirective(
        schema,
        fieldConfig,
        directiveName,
      )?.[0];

      if (upperDirective) {
        const { resolve = defaultFieldResolver } = fieldConfig;

        // Replace the original resolver with a function that *first* calls
        // the original resolver, then converts its result to upper case
        fieldConfig.resolve = async function (source, args, context, info) {
          const result = await resolve(source, args, context, info);
          if (typeof result === 'string') {
            return result.toUpperCase();
          }
          return result;
        };
        return fieldConfig;
      }
    },
  });
}
```

类似地，__INLINE_CODE_42__ 默认用于表示 __INLINE_CODE_43__ 类型。要使用 __INLINE_CODE_44__ 而不是 __INLINE_CODE_42__，请将 __INLINE_CODE_45__ 设置为 __INLINE_CODE_46__ 对象的 __INLINE_CODE_47__，如下所示：

```typescript
GraphQLModule.forRoot({
  // ...
  transformSchema: (schema) => upperDirectiveTransformer(schema, 'upper'),
});
```

此外，您可以创建自定义 scalar。

#### Override a default scalar

要创建自定义实现的 __INLINE_CODE_48__ scalar，简单地创建一个新的类。

```typescript
@Directive('@upper')
@Field()
title: string;
```

现在可以将 __INLINE_CODE_49__ 注册为提供者。

```typescript
@Directive('@deprecated(reason: "This query will be removed in the next version")')
@Query(() => Author, { name: 'author' })
async getAuthor(@Args({ name: 'id', type: () => Int }) id: number) {
  return this.authorsService.findOneById(id);
}
```

现在，我们可以在类中使用 __INLINE_CODE_50__ 类型。

```typescript
GraphQLModule.forRoot({
  // ...,
  transformSchema: schema => upperDirectiveTransformer(schema, 'upper'),
  buildSchemaOptions: {
    directives: [
      new GraphQLDirective({
        name: 'upper',
        locations: [DirectiveLocation.FIELD_DEFINITION],
      }),
    ],
  },
}),
```

#### Import a custom scalar

要使用自定义 scalar，import 并将其注册为解析器。我们将使用 __INLINE_CODE_51__ 包以示例目的。这个 npm 包定义了 __INLINE_CODE_52__ GraphQL scalar 类型。

首先，安装包：

```graphql
directive @upper on FIELD_DEFINITION

type Post {
  id: Int!
  title: String! @upper
  votes: Int
}
```

安装包后，我们将自定义解析器传递给 __INLINE_CODE_53__ 方法：

__CODE_BLOCK_6__

现在，我们可以在类中使用 __INLINE_CODE_54__ 类型。

__CODE_BLOCK_7__

对于有用的 scalar，查看 __LINK_81__ 包。

#### Create a custom scalar

要定义自定义 scalar，创建一个新的 __INLINE_CODE_55__ 实例。我们将创建一个自定义 __INLINE_CODE_56__ scalar。

__CODE_BLOCK_8__

现在，可以将自定义解析器传递给 __INLINE_CODE_57__ 方法：

__CODE_BLOCK_9__

现在，我们可以在类中使用 __INLINE_CODE_58__ 类型。

__CODE_BLOCK_10__

#### Schema first

要定义自定义 scalar（了解更多关于 scalars __LINK_82__），创建一个类型定义和专门的解析器。在这里（正如官方文档），我们将使用 __INLINE_CODE_59__ 包以示例目的。这 npm 包定义了 __INLINE_CODE_60__ GraphQL scalar 类型。

首先，安装包：

__CODE_BLOCK_11__

安装包后，我们将自定义解析器传递给 __INLINE_CODE_61__ 方法：

__CODE_BLOCK_12__

现在，我们可以在类型定义中使用 __INLINE_CODE_62__ scalar。

__CODE_BLOCK_13__

另一种定义 scalar 类型的方法是创建一个简单的类。假设我们想要增强我们的 schema với __INLINE_CODE_63__ 类型。

__CODE_BLOCK_14__

现在，可以将 __INLINE_CODE_64__ 注册为提供者。

__CODE_BLOCK_15__

现在，我们可以在类型定义中使用 __INLINE_CODE_65__ scalar。

__CODE_BLOCK_16__

默认情况下，Nest 生成的 TypeScript 定义对于所有 scalar 都是 __INLINE_CODE_66__，这不是非常类型安全。
但是，您可以配置 Nest 如何生成 typings 对于自定义 scalar：

__CODE_BLOCK_17__

> info **Hint** 或者，您可以使用 type reference alternatively，例如：__INLINE_CODE_67__。在这种情况下，__INLINE_CODE_68__ 将从指定的类型 (__INLINE_CODE_69__) 中提取名称属性以生成 TS 定义。注意：添加非内置类型的 import 语句是必需的。

现在，给定以下 GraphQL 自定义 scalar 类型