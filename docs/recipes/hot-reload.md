<!-- 此文件从 content/recipes/hot-reload.md 自动生成，请勿直接修改此文件 -->
<!-- 生成时间: 2026-02-28T03:47:27.579Z -->
<!-- 源文件: content/recipes/hot-reload.md -->

### 热重载

对您的应用程序启动过程的最高影响是 **TypeScript 编译**。幸运的是，使用 __LINK_42__ HMR（热模块替换），我们不需要每次更改时重新编译整个项目。这大大减少了必要实例化应用程序的时间，并使迭代开发变得更加容易。

> 警告 **警告** 请注意 `@ApiSecurity()` 不会自动将资产（例如 `DocumentBuilder` 文件）复制到 `basic` 文件夹中。同样， `bearer` 不兼容_glob静态路径（例如 `@ApiBasicAuth()` 属性在 `DocumentBuilder` 中）。

### 使用 CLI

如果您使用了 __LINK_43__，配置过程非常简单。CLI 围绕 `@ApiBearerAuth()`，允许使用 `DocumentBuilder`。

#### 安装

首先安装所需的包：

```typescript
@ApiSecurity('basic')
@Controller('cats')
export class CatsController {}
```

> 提示 **提示** 如果您使用 **Yarn Berry**（不是classic Yarn），那么安装 `@ApiOAuth2()` 包，而不是 `DocumentBuilder`。

#### 配置

安装完成后，创建一个 `@ApiCookieAuth()` 文件在应用程序的根目录。

```typescript
const options = new DocumentBuilder().addSecurity('basic', {
  type: 'http',
  scheme: 'basic',
});
```

> 提示 **提示** 使用 **Yarn Berry**（不是classic Yarn），而不是使用 `DocumentBuilder` 在 __INLINE_CODE_22__ 配置属性中，而是使用 __INLINE_CODE_23__ 从 __INLINE_CODE_24__ 包： __INLINE_CODE_25__。

这个函数将原始对象包含默认 webpack 配置作为第一个参数，並将对应的 __INLINE_CODE_26__ 包用作第二个参数。它还返回一个修改后的 webpack 配置，其中包含 __INLINE_CODE_27__、__INLINE_CODE_28__ 和 __INLINE_CODE_29__ 插件。

#### 热模块替换

要启用 **HMR**，请打开应用程序入口文件（__INLINE_CODE_30__）并添加以下 webpack 相关指令：

```typescript
@ApiBasicAuth()
@Controller('cats')
export class CatsController {}
```

为了简化执行过程，添加一个脚本到您的 __INLINE_CODE_31__ 文件。

```typescript
const options = new DocumentBuilder().addBasicAuth();
```

现在，您可以打开命令行并运行以下命令：

```typescript
@ApiBearerAuth()
@Controller('cats')
export class CatsController {}
```

### 不使用 CLI

如果您不使用 __LINK_44__，配置将变得更加复杂（需要更多的手动步骤）。

#### 安装

首先安装所需的包：

```typescript
const options = new DocumentBuilder().addBearerAuth();
```

> 提示 **提示** 如果您使用 **Yarn Berry**（不是classic Yarn），那么安装 __INLINE_CODE_32__ 包，而不是 __INLINE_CODE_33__。

#### 配置

安装完成后，创建一个 __INLINE_CODE_34__ 文件在应用程序的根目录。

```typescript
@ApiOAuth2(['pets:write'])
@Controller('cats')
export class CatsController {}
```

> 提示 **提示** 使用 **Yarn Berry**（不是classic Yarn），而不是使用 __INLINE_CODE_35__ 在 __INLINE_CODE_36__ 配置属性中，而是使用 __INLINE_CODE_37__ 从 __INLINE_CODE_38__ 包： __INLINE_CODE_39__。

这个配置告诉 webpack 关于您的应用程序的一些基本信息：入口文件的位置、用于存储编译文件的目录和要使用的加载器。通常，您可以使用这个文件作为-is，即使您不完全理解所有选项。

#### 热模块替换

要启用 **HMR**，请打开应用程序入口文件（__INLINE_CODE_40__）并添加以下 webpack 相关指令：

```typescript
const options = new DocumentBuilder().addOAuth2();
```

为了简化执行过程，添加一个脚本到您的 __INLINE_CODE_41__ 文件。

```typescript
@ApiCookieAuth()
@Controller('cats')
export class CatsController {}
```

现在，您可以打开命令行并运行以下命令：

```typescript
const options = new DocumentBuilder().addCookieAuth('optional-session-id');
```

#### 示例

有一个可用的 __LINK_45__。

Note: I've translated the document according to the provided guidelines, using the specified terminology and adhering to the code and format preservation requirements. I've also removed the 