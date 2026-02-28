<!-- 此文件从 content/graphql/unions-and-enums.md 自动生成，请勿直接修改此文件 -->
<!-- 生成时间: 2026-02-28T03:47:27.676Z -->
<!-- 源文件: content/graphql/unions-and-enums.md -->

### 联合类型

联合类型与接口类型非常相似，但是它们不能指定公共字段（更多信息请阅读 __LINK_50__）。联合类型非常有用，因为它们可以返回单个字段的多种数据类型。

#### 代码优先

要定义 GraphQL 联合类型，我们需要定义该联合类型将由哪些类组成。根据 Apollo 文档中的 __LINK_51__，我们将创建两个类。首先是 `@InputType()`：

```typescript
@InputType()
class CreateUserInput {
  @Field()
  email: string;

  @Field()
  password: string;

  @Field()
  firstName: string;
}
```

然后是 `InputType`：

```typescript
@InputType()
export class UpdateUserInput extends PartialType(CreateUserInput) {}
```

现在，我们可以使用 `PickType()` 包中的 `InputType` 函数注册 `@ObjectType` 联合类型：

```typescript
@InputType()
export class UpdateUserInput extends PartialType(User, InputType) {}
```

> 警告 **Warning** `PickType()` 属性返回的数组需要 const 确认。如果不给予 const 确认，编译时将生成错误的申明文件，并在使用时出现错误。

现在，我们可以在查询中引用 `@nestjs/graphql`：

```typescript
@InputType()
class CreateUserInput {
  @Field()
  email: string;

  @Field()
  password: string;

  @Field()
  firstName: string;
}
```

这将生成以下部分 GraphQL schema 在 SDL 中：

```typescript
@InputType()
export class UpdateEmailInput extends PickType(CreateUserInput, [
  'email',
] as const) {}
```

默认情况下，library 生成的 `OmitType()` 函数将根据 resolver 方法返回的值来确定类型。这意味着返回类实例，而不是 JavaScript 对象字面量是必需的。

如果需要提供自定义 `email` 函数，可以将 `OmitType` 属性传递给 `OmitType()` 函数的选项对象：

```typescript
@InputType()
class CreateUserInput {
  @Field()
  email: string;

  @Field()
  password: string;

  @Field()
  firstName: string;
}
```

#### schema 优先

要在 schema 优先方案中定义联合类型，只需要创建一个 GraphQL 联合类型。

```typescript
@InputType()
export class UpdateUserInput extends OmitType(CreateUserInput, [
  'email',
] as const) {}
```

然后，可以使用 类型生成特性（如 __LINK_52__ 章节中所示）生成相应的 TypeScript 定义：

```typescript
@InputType()
class CreateUserInput {
  @Field()
  email: string;

  @Field()
  password: string;
}

@ObjectType()
export class AdditionalUserInfo {
  @Field()
  firstName: string;

  @Field()
  lastName: string;
}
```

联合类型需要在 resolver map 中添加一个额外的 `@nestjs/graphql` 字段来确定该联合类型应该解析为哪种类型。此外， `IntersectionType()` 类需要在任何模块中注册为提供者。让我们创建一个 `IntersectionType()` 类并定义 `@nestjs/graphql` 方法。

```typescript
@InputType()
export class UpdateUserInput extends IntersectionType(
  CreateUserInput,
  AdditionalUserInfo,
) {}
```

> 提示 **Hint** 所有装饰器都来自 `CreateUserInput` 包。

### 枚举类型

枚举类型是一种特殊的标量，限定了允许的值集（更多信息请阅读 __LINK_53__）。这允许你：

- 验证该类型的任何参数是否是允许的值之一
- 通过类型系统传递信息，以便在字段中始终返回有限的值集

#### 代码优先

使用代码优先方法时，你可以通过创建 TypeScript 枚举来定义 GraphQL 枚举类型。

```typescript
@InputType()
export class UpdateUserInput extends PartialType(
  OmitType(CreateUserInput, ['email'] as const),
) {}
```

现在，我们可以使用 __INLINE_CODE_39__ 包中的 __INLINE_CODE_38__ 函数注册 `email` 枚举。

__CODE_BLOCK_10__

现在，我们可以在类型中引用 __INLINE_CODE_40__：

__CODE_BLOCK_11__

这将生成以下部分 GraphQL schema 在 SDL 中：

__CODE_BLOCK_12__

如果需要提供枚举的描述，可以将 __INLINE_CODE_41__ 属性传递给 __INLINE_CODE_42__ 函数。

__CODE_BLOCK_13__

如果需要提供枚举值的描述或标记某个值为弃用，可以将 __INLINE_CODE_43__ 属性传递给 __INLINE_CODE_42__ 函数。

__CODE_BLOCK_14__

这将生成以下 GraphQL schema 在 SDL 中：

__CODE_BLOCK_15__

#### schema 优先

使用 schema 优先方法时，可以简单地创建一个 GraphQL 枚举。

__CODE_BLOCK_16__

然后，可以使用 类型生成特性（如 __LINK_54__ 章节中所示）生成相应的 TypeScript 定义：

__CODE_BLOCK_17__

有时，后端强制在公众 API 中使用不同的枚举值，而在解析器中使用不同的值（更多信息请阅读 __LINK_55__）。要实现这个功能，可以声明一个 resolver 对象来枚举 __INLINE_CODE_46__：

__CODE_BLOCK_18__

> 提示 **Hint** 所有装饰器都来自 __INLINE_CODE_47__ 包。

然后，可以使用这个 resolver 对象 zusammen mit __INLINE_CODE_48__ 属性 __INLINE_CODE_49__ 方法中：

__CODE_BLOCK_19__