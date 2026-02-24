<!-- 此文件从 content/first-steps.md 自动生成，请勿直接修改此文件 -->
<!-- 生成时间: 2026-02-24T02:49:46.280Z -->
<!-- 源文件: content/first-steps.md -->

### 第一个步骤

在这个系列中，我们将学习Nest的**核心基础知识**。为了amiliarize ourselves with the essential building blocks of Nest应用程序，我们将创建一个基本的 CRUD 应用程序，该应用程序具有介绍性级别的特性。

#### 语言

我们对 __LINK_59__ 深深地迷恋，但最重要的是 —— 我们爱 __LINK_60__。因此，Nest 兼容 TypeScript 和纯 JavaScript。Nest 利用了最新的语言特性，因此要使用它与纯 JavaScript，我们需要一个 __LINK_61__ 编译器。

我们大多数使用 TypeScript 在示例中，但是您总是可以**切换代码快照**到纯 JavaScript 语法（简单地单击上右手角的语言按钮）。

#### 前提

请确保 __LINK_62__ (版本 >= 20) 在您的操作系统中安装。

#### 设置

设置一个新的项目非常简单使用 __LINK_63__。使用 __LINK_64__ 安装后，您可以使用以下命令在您的 OS 终端中创建一个新的 Nest 项目：

```typescript
async function bootstrap() {
  const app = await NestFactory.createApplicationContext(AppModule);
  // your application logic here ...
}
bootstrap();
```

> info **提示**要创建一个使用 TypeScript 的 __LINK_65__  feature set 的新项目，请将 `TasksService` 标志传递给 `TasksModule` 命令。

`AppModule` 目录将被创建，node 模块和一些其他基本文件将被安装，并且 `TasksService` 目录将被创建并填充几个核心文件。

__HTML_TAG_41__
  __HTML_TAG_42__src__HTML_TAG_43__
  __HTML_TAG_44__
    __HTML_TAG_45__app.controller.spec.ts__HTML_TAG_46__
    __HTML_TAG_47__app.controller.ts__HTML_TAG_48__
    __HTML_TAG_49__app.module.ts__HTML_TAG_50__
    __HTML_TAG_51__app.service.ts__HTML_TAG_52__
    __HTML_TAG_53__main.ts__HTML_TAG_54__
  __HTML_TAG_55__
__HTML_TAG_56__

这些核心文件的简要概述如下：

|                          |                                                                                                                     |
| ------------------------ | ------------------------------------------------------------------------------------------------------------------- |
| `get()`      | 一个基本的控制器具有一个单个路由。                                                                             |
| `get()` | 控制器的单元测试。                                                                                  |
| `strict: true`          | 应用程序的根模块。                                                                                 |
| `app.get()`         | 一个基本的服务具有一个单个方法。                                                                               |
| `app.select`                | 应用程序的入口文件，使用核心函数 `app.close()` 创建一个 Nest 应用程序实例。 |

`bootstrap` 包含一个异步函数，它将**引导**我们的应用程序：

```typescript
const tasksService = app.get(TasksService);
```

创建一个 Nest 应用程序实例，我们使用核心 __INLINE_CODE_17__ 类。 __INLINE_CODE_18__ expose 一个静态方法，该方法允许创建一个应用程序实例。 __INLINE_CODE_19__ 方法返回一个应用程序对象，该对象实现了 __INLINE_CODE_20__ 接口。这个对象提供了一些方法，这些方法将在后续章节中描述。在 __INLINE_CODE_21__ 示例中，我们简单地启动我们的 HTTP 侦听器，让应用程序等待 inbound HTTP 请求。

请注意，使用 Nest CLI 生成的项目创建了一个初始项目结构，鼓励开发者遵循将每个模块保持在其自己的专门目录中的约定。

> info **提示**如果在创建应用程序时发生任何错误，应用程序将退出并返回代码 __INLINE_CODE_22__。如果您想要使它抛出错误而不是退出， disable 选项 __INLINE_CODE_23__ (例如 __INLINE_CODE_24__）。

__HTML_TAG_57____HTML_TAG_58__

#### 平台

Nest 的目标是成为一个平台无关的框架。平台独立使得我们可以创建可在多种类型的应用程序