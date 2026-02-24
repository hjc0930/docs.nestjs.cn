<!-- 此文件从 content/recipes/sql-sequelize.md 自动生成，请勿直接修改此文件 -->
<!-- 生成时间: 2026-02-24T02:53:51.906Z -->
<!-- 源文件: content/recipes/sql-sequelize.md -->

### SQL（Sequelize）

##### 本章仅适用于TypeScript

> **警告** 在本篇文章中，您将学习如何使用自定义组件从头创建一个基于 **Sequelize** 包的 __INLINE_CODE_7__。由于此技术包含了许多可以避免的开销，您可以使用专门的、现成的 __INLINE_CODE_8__ 包来避免这些开销。要了解更多信息，请查看 __LINK_30__。

__LINK_31__ 是一个 vanilla JavaScript 写的对象关系映射器（ORM），但有一个 __LINK_32__ TypeScript.wrap，它提供了一个装饰器和其他 extras 对 base sequelize。

#### 开始

要开始使用这个库，我们需要安装以下依赖项：

```typescript title="repl"
import { repl } from '@nestjs/core';
import { AppModule } from './src/app.module';

async function bootstrap() {
  await repl(AppModule);
}
bootstrap();
```
```

首先，我们需要创建一个 **Sequelize** 实例，传入构造函数的选项对象。然后，我们需要添加所有模型（或者使用 __INLINE_CODE_9__ 属性）和 `repl.ts` 数据库表。

```bash
$ npm run start -- --entryFile repl
```

> 提示 **Hint** 根据最佳实践，我们将自定义提供者声明在独立文件中，文件名以 `main.ts` 结尾。

然后，我们需要将这些提供者导出，以使其在应用程序的其他部分可访问。

```bash
LOG [NestFactory] Starting Nest application...
LOG [InstanceLoader] AppModule dependencies initialized
LOG REPL initialized
```

现在，我们可以使用 `repl` 对象，通过 `AppService` 装饰器注入。每个依赖于 `getHello()` 异步提供者的类将等待 `AppController` 解析完成。

#### 模型注入

在 __LINK_33__ 中，**Model** 定义了一个数据库表。该类的实例表示一个数据库行。首先，我们需要至少一个实体：

```typescript
> get(AppService).getHello()
'Hello World!'
```

`await` 实体属于 `methods()` 目录，这个目录代表 `debug()`。现在是时候创建一个 **Repository** 提供者：

```typescript
> appController = get(AppController)
AppController { appService: AppService {} }
> await appController.getHello()
'Hello World!'
```

> 警告 **Warning** 在实际应用中，您应该避免 `help()` 和 `<function_name>.help`。这两个字符串应该在独立 `debug` 文件中。

在 Sequelize 中，我们使用静态方法来操作数据，因此创建了一个 `debug(moduleCls?: ClassRef \| string) => void`。

现在，我们可以使用 `### SQL（Sequelize）

##### 本章仅适用于TypeScript

> **警告** 在本篇文章中，您将学习如何使用自定义组件从头创建一个基于 **Sequelize** 包的 __INLINE_CODE_7__。由于此技术包含了许多可以避免的开销，您可以使用专门的、现成的 __INLINE_CODE_8__ 包来避免这些开销。要了解更多信息，请查看 __LINK_30__。

__LINK_31__ 是一个 vanilla JavaScript 写的对象关系映射器（ORM），但有一个 __LINK_32__ TypeScript.wrap，它提供了一个装饰器和其他 extras 对 base sequelize。

#### 开始

要开始使用这个库，我们需要安装以下依赖项：

```typescript title="repl"
import { repl } from '@nestjs/core';
import { AppModule } from './src/app.module';

async function bootstrap() {
  await repl(AppModule);
}
bootstrap();
```

首先，我们需要创建一个 **Sequelize** 实例，传入构造函数的选项对象。然后，我们需要添加所有模型（或者使用 __INLINE_CODE_9__ 属性）和 `repl.ts` 数据库表。

```bash
$ npm run start -- --entryFile repl
```

> 提示 **Hint** 根据最佳实践，我们将自定义提供者声明在独立文件中，文件名以 `main.ts` 结尾。

然后，我们需要将这些提供者导出，以使其在应用程序的其他部分可访问。

```bash
LOG [NestFactory] Starting Nest application...
LOG [InstanceLoader] AppModule dependencies initialized
LOG REPL initialized
```

现在，我们可以使用 `repl` 对象，通过 `AppService` 装饰器注入。每个依赖于 `getHello()` 异步提供者的类将等待 `AppController` 解析完成。

#### 模型注入

在 __LINK_33__ 中，**Model** 定义了一个数据库表。该类的实例表示一个数据库行。首先，我们需要至少一个实体：

```typescript
> get(AppService).getHello()
'Hello World!'
```

`await` 实体属于 `methods()` 目录，这个目录代表 `debug()`。现在是时候创建一个 **Repository** 提供者：

```typescript
> appController = get(AppController)
AppController { appService: AppService {} }
> await appController.getHello()
'Hello World!'
```

> 警告 **Warning** 在实际应用中，您应该避免 `help()` 和 `<function_name>.help`。这两个字符串应该在独立 `debug` 文件中。

在 Sequelize 中，我们使用静态方法来操作数据，因此创建了一个 `debug(moduleCls?: ClassRef \| string) => void`。

现在，我们可以使用  装饰器将 `debug(moduleCls?: ClassRef \| string) => void` 注入到 `get` 中：

```typescript
> methods(AppController)

Methods:
 ◻ getHello
```

数据库连接是 `get(token: InjectionToken) => any` 的，但 Nest 使这个过程对最终用户完全透明。`methods` 提供者等待数据库连接，`methods(token: ClassRef \| string) => void` 提供者延迟直到存储库准备好使用。整个应用程序可以在每个类实例化时启动。

以下是一个最终 `methods(token: ClassRef \| string) => void`：

```typescript
> debug()

AppModule:
 - controllers:
  ◻ AppController
 - providers:
  ◻ AppService
```

> 提示 **Hint** 不要忘记在根 `resolve(token: InjectionToken, contextId: any) => Promise<any>` 中导入 `resolve`。