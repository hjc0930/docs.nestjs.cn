<!-- 此文件从 content/recipes/necord.md 自动生成，请勿直接修改此文件 -->
<!-- 生成时间: 2026-02-25T04:12:09.376Z -->
<!-- 源文件: content/recipes/necord.md -->

### Necord

Necord 是一个强大的模块，可以简化创建 __LINK_30__ 机器人，实现与 NestJS 应用程序的无缝集成。

> 重要提示 **Note** Necord 是第三方包，不是 NestJS 核心团队官方维护。如果您遇到任何问题，请在 __LINK_31__ 报告。

#### 安装

要开始使用 Necord，请安装 Necord 和其依赖项 __LINK_32__。

```typescript
@Post()
async create(@Body() createCatDto: CreateCatDto) {
  this.catsService.create(createCatDto);
}
```

#### 使用

要在项目中使用 Necord，导入 __INLINE_CODE_16__ 并配置必要的选项。

```typescript
import { ApiProperty } from '@nestjs/swagger';

export class CreateCatDto {
  @ApiProperty()
  name: string;

  @ApiProperty()
  age: number;

  @ApiProperty()
  breed: string;
}
```

> 提示 **Hint** 您可以在 __LINK_33__ 中找到可用的意图列表。

使用该设置，您可以将 __INLINE_CODE_17__ 注入到您的提供程序中，以便轻松注册命令、事件等。

```typescript
@ApiProperty({
  description: 'The age of a cat',
  minimum: 1,
  default: 1,
})
age: number;
```

##### 理解上下文

您可能已经注意到了 __INLINE_CODE_18__ 装饰器在上面的示例中。这装饰器将事件上下文注入到您的方法中，让您访问各种事件相关数据。由于有多种事件类型，上下文类型将使用 __INLINE_CODE_19__ 类型来推断。您可以使用 __INLINE_CODE_20__ 装饰器轻松访问上下文变量，该装饰器将变量填充为与事件相关的参数数组。

#### 文本命令

> 警告 **Caution** 文本命令依赖于消息内容，该内容将在验证机器人和拥有超过 100 服务器的应用程序中弃用。这意味着，如果您的机器人无法访问消息内容，文本命令将无法工作。了解更多关于这项变化 __LINK_34__。

以下是使用 __INLINE_CODE_21__ 装饰器创建简单命令处理程序的示例：

```typescript
@ApiProperty({
  type: Number,
})
age: number;
```

#### 应用程序命令

应用程序命令提供了一个本地方式，让用户在 Discord 客户端中与您的应用程序交互。有三种类型的应用程序命令可以通过不同的界面访问：聊天输入、消息上下文菜单（右键单击消息）和用户上下文菜单（右键单击用户）。

__HTML_TAG_27____HTML_TAG_28____HTML_TAG_29__

#### 刹车命令

刹车命令是engage 与用户的结构化方式。它们允许您创建带有精确参数和选项的命令，提高用户体验。

使用 Necord 定义刹车命令，您可以使用 __INLINE_CODE_22__ 装饰器。

```typescript
@ApiProperty({ type: [String] })
names: string[];
```

> 提示 **Hint** 当您的机器人客户端登录时，它将自动注册所有定义的命令。注意，全球命令将在一个小时内缓存。为了避免全球缓存问题，使用 Necord 模块的 __INLINE_CODE_23__ 参数，限制命令可见性到单个服务器。

##### 选项

您可以使用选项装饰器来定义刹车命令的参数。让我们创建一个 __INLINE_CODE_24__ 类以此目的：

```typescript
@ApiProperty({ type: () => Node })
node: Node;
```

然后，您可以使用该 DTO 在 __INLINE_CODE_25__ 类中：

```typescript
createBulk(@Body() usersDto: CreateUserDto[])
```

了解更多关于内置选项装饰器的信息，请访问 __LINK_35__。

##### 自动完成

要实现自动完成功能，您需要创建一个拦截器。这拦截器将处理用户在自动完成字段中输入的请求。

```typescript
@ApiBody({ type: [CreateUserDto] })
createBulk(@Body() usersDto: CreateUserDto[])
```

您还需要将选项类标记为 __INLINE_CODE_26__：

```typescript
@ApiProperty({ enum: ['Admin', 'Moderator', 'User']})
role: UserRole;
```

最后，将拦截器应用于刹车命令：

```typescript
export enum UserRole {
  Admin = 'Admin',
  Moderator = 'Moderator',
  User = 'User',
}
```

#### 用户上下文菜单

用户命令出现在右键单击用户时的上下文菜单中，这些命令提供了快速操作，以便直接目标用户。

```typescript
@ApiQuery({ name: 'role', enum: UserRole })
async filterByRole(@Query('role') role: UserRole = UserRole.User) {}
```

#### 消息上下文菜单

消息命令出现在右键单击消息时的上下文菜单中，这些命令提供了快速操作，以便与消息相关。

```yaml
- breed:
    type: 'string'
    enum:
      - Persian
      - Tabby
      - Siamese
```

#### 按钮

__LINK_36__ 是交互元素，可以包含在消息中。当单击时，它将发送 __LINK_37__ 到应用程序。

```typescript
// generated client-side code
export class CatDetail {
  breed: CatDetailEnum;
}

export class CatInformation {
  breed: CatInformationEnum;
}

export enum CatDetailEnum {
  Persian = 'Persian',
  Tabby = 'Tabby',
  Siamese = 'Siamese',
}

export enum CatInformationEnum {
  Persian = 'Persian',
  Tabby = 'Tabby',
  Siamese = 'Siamese',
}
```

#### 选择菜单

__LINK_38__ 是另一种交互组件，出现在消息中。它们提供了下拉式 UI，让用户选择选项。

```typescript
export class CatDetail {
  @ApiProperty({ enum: CatBreed, enumName: 'CatBreed' })
  breed: CatBreed;
}
```

了解更多关于内置选择菜单组件的信息，请访问 __LINK_39__。

#### 模态

模态是弹出窗口，可以让用户提交格式化输入。以下是使用 Necord 创建和处理模态的示例：

```yaml
CatDetail:
  type: 'object'
  properties:
    ...
    - breed:
        schema:
          $ref: '#/components/schemas/CatBreed'
CatBreed:
  type: string
  enum:
    - Persian
    - Tabby
    - Siamese
```

#### 更多信息

访问 __LINK_40__ 网站以获取更多信息。