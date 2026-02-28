<!-- 此文件从 content/microservices/exception-filters.md 自动生成，请勿直接修改此文件 -->
<!-- 生成时间: 2026-02-28T03:47:27.643Z -->
<!-- 源文件: content/microservices/exception-filters.md -->

### 异常过滤器

HTTP 层和对应微服务层之间的唯一区别是，在抛出 __INLINE_CODE_5__ 时，你应该使用 __INLINE_CODE_6__。

```typescript
import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class Book {
  @Field()
  title: string;
}
```

> info **提示** __INLINE_CODE_7__ 类来自 __INLINE_CODE_8__ 包。

Nest 将处理抛出的异常，并返回 __INLINE_CODE_9__ 对象，它具有以下结构：

```typescript
import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class Author {
  @Field()
  name: string;
}
```

#### 过滤器

微服务异常过滤器与 HTTP 异常过滤器类似，唯一的区别是 __INLINE_CODE_10__ 方法必须返回 __INLINE_CODE_11__。

```typescript
export const ResultUnion = createUnionType({
  name: 'ResultUnion',
  types: () => [Author, Book] as const,
});
```

> warning **警告** 使用 __LINK_16__ 时，微服务异常过滤器默认未启用。

以下示例使用了手动实例化的方法作用域过滤器。类似于 HTTP 基于应用程序，你也可以使用控制器作用域过滤器（即将控制器类前缀为 __INLINE_CODE_12__ 装饰器）。

```typescript
@Query(() => [ResultUnion])
search(): Array<typeof ResultUnion> {
  return [new Author(), new Book()];
}
```

#### 继承

通常，你将创建完全定制的异常过滤器，以满足应用程序需求。但是，有些情况下，你可能想要简单继承 **core 异常过滤器**，并根据某些因素override行为。

要将异常处理委托给基本过滤器，你需要继承 __INLINE_CODE_13__ 并调用继承的 __INLINE_CODE_14__ 方法。

```graphql
type Author {
  name: String!
}

type Book {
  title: String!
}

union ResultUnion = Author | Book

type Query {
  search: [ResultUnion!]!
}
```

上面的实现只是一个 shell，演示了approach。您的实现将包括您定制的 **业务逻辑**（例如，处理各种条件）。