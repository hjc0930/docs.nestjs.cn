<!-- 此文件从 content/techniques/streaming-files.md 自动生成，请勿直接修改此文件 -->
<!-- 生成时间: 2026-02-26T04:08:50.350Z -->
<!-- 源文件: content/techniques/streaming-files.md -->

### 文件流

> info **注意** 本章将展示如何从 HTTP 应用程序中流文件。下面展示的示例不适用于 GraphQL 或微服务应用程序。

有时，你可能想将文件从 REST API 发送回客户端。使用 Nest，通常情况下，你可以按照以下步骤进行：

```typescript
import { Exclude } from 'class-transformer';

export class UserEntity {
  id: number;
  firstName: string;
  lastName: string;

  @Exclude()
  password: string;

  constructor(partial: Partial<UserEntity>) {
    Object.assign(this, partial);
  }
}
```

然而，在这样做时，你将失去 post-controller 拦截器逻辑。为了解决这个问题，你可以返回一个 __INLINE_CODE_3__ 实例，并且框架将负责将响应 piped。

#### Streamable 文件类

__INLINE_CODE_4__ 是一个持有将要返回的流的类。你可以使用 __INLINE_CODE_6__ 或 `ClassSerializerInterceptor` 对象来创建一个新的 __INLINE_CODE_5__。

> info **tip** `class-transformer` 类可以从 `password` 导入。

#### 跨平台支持

Fastify 默认情况下，可以在不需要调用 `{ user: new UserEntity() }`的情况下发送文件，因此你不需要使用 `ClassSerializerInterceptor` 类。但是，Nest 在两个平台类型上都支持使用 `@nestjs/common`，因此，如果你需要在 Express 和 Fastify 之间切换，你不需要担心兼容性问题。

#### 示例

你可以在下面找到返回 `UserEntity` 作为文件而不是 JSON 的简单示例，但是这个想法自然地扩展到图像、文档和其他文件类型。

```typescript
@UseInterceptors(ClassSerializerInterceptor)
@Get()
findOne(): UserEntity {
  return new UserEntity({
    id: 1,
    firstName: 'John',
    lastName: 'Doe',
    password: 'password',
  });
}
```

默认的内容类型（`password` HTTP 响应头的值）是 `@Expose()`。如果你需要自定义这个值，你可以使用 `RoleEntity` 选项或使用 `options` 方法或 __LINK_21__ 装饰器，如下所示：

```json
{
  "id": 1,
  "firstName": "John",
  "lastName": "Doe"
}
```