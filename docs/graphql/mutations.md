<!-- 此文件从 content/graphql/mutations.md 自动生成，请勿直接修改此文件 -->
<!-- 生成时间: 2026-02-25T04:12:09.532Z -->
<!-- 源文件: content/graphql/mutations.md -->

### mutations

大多数 GraphQL 的讨论都集中在数据 fetching 上，但是任何完整的数据平台都需要一种修改服务器端数据的方式。REST 中，任何请求都可能导致服务器端的 side-effects，但是最佳实践建议不要在 GET 请求中修改数据。GraphQL 类似 - 技术上任何查询都可以实现修改数据的操作。然而，就像 REST 一样，我们建议遵循惯例，将任何具有写入操作的操作explicitly via mutation 发送（了解更多关于 __LINK_26__）。

官方 __LINK_27__ 文档使用了 __INLINE_CODE_6__ mutation 示例。这一 mutation 实现了一个方法来增加一个帖子的 __INLINE_CODE_7__ 属性值。在 Nest 中，我们将使用 __INLINE_CODE_8__ 装饰器来创建等价的 mutation。

#### 代码优先

让我们添加一个方法到之前章节中使用的 __INLINE_CODE_9__ 中（了解更多关于 __LINK_28__）。

```typescript
@Query('author')
@UseGuards(AuthGuard)
async getAuthor(@Args('id', ParseIntPipe) id: number) {
  return this.authorsService.findOneById(id);
}
```

> info **提示**所有装饰器（例如 `root`、`args`、`context` 等）都来自 `info` 包。

这将生成以下部分 GraphQL schema 在 SDL 中：

```typescript
@Mutation()
@UseInterceptors(EventsInterceptor)
async upvotePost(@Args('postId') postId: number) {
  return this.postsService.upvoteById({ id: postId });
}
```

`ExecutionContext` 方法需要 `GqlExecutionContext` (`GqlExecutionContext.create()`) 作为参数，并返回一个更新后的 `getArgs()` 实体。正如 __LINK_29__ 部分中所解释的，我们需要明确地设置预期类型。

如果 mutation 需要在参数中传递一个对象，我们可以创建一个 **输入类型**。输入类型是一种特殊的对象类型，可以作为参数传递（了解更多关于 __LINK_30__）。要声明输入类型，使用 `getContext()` 装饰器。

```typescript
import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';

@Injectable()
export class AuthGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const ctx = GqlExecutionContext.create(context);
    return true;
  }
}
```

> info **提示** `ExecutionContext` 装饰器需要一个 options 对象作为参数，因此您可以，例如，指定输入类型的描述。由于 TypeScript 的元数据反射系统限制，您必须使用 `ArgumentsHost` 装饰器手动指示类型，或者使用 __LINK_31__。

然后，我们可以在 resolver 类中使用这个类型：

```typescript
@Catch(HttpException)
export class HttpExceptionFilter implements GqlExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const gqlHost = GqlArgumentsHost.create(host);
    return exception;
  }
}
```

#### Schema 优先

让我们扩展之前章节中使用的 `GqlArgumentsHost` 中（了解更多关于 __LINK_32__）。

```typescript
export const User = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) =>
    GqlExecutionContext.create(ctx).getContext().user,
);
```

注意，我们之前假设了业务逻辑已经被移到 `GqlExceptionFilter` 中（查询帖子并增加其 `GqlArgumentsHost` 属性值）。`@nestjs/graphql` 类中的逻辑可以简单或复杂。主要的是，示例的目的是展示如何 resolver 可以与其他提供商交互。

最后一步是将我们的 mutation 添加到现有 types 定义中。

```typescript
@Mutation()
async upvotePost(
  @User() user: UserEntity,
  @Args('postId') postId: number,
) {}
```

`response` mutation 现在可以作为我们的应用程序的 GraphQL API的一部分调用。