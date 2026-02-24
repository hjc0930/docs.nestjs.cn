<!-- 此文件从 content/components.md 自动生成，请勿直接修改此文件 -->
<!-- 生成时间: 2026-02-24T04:10:16.781Z -->
<!-- 源文件: content/components.md -->

### 提供者

提供者是 Nest 的核心概念。许多基本的 Nest 类，例如服务、存储库、工厂和帮助类，可以被视为提供者。提供者的关键思想是，它可以作为依赖项被注入，允许对象之间形成各种关系。 Nest 运行时系统主要负责“连接”这些对象。

</table>__HTML_TAG_35____HTML_TAG_36__

在前一章中，我们创建了一个简单的 `TasksModule`. 控制器应该处理 HTTP 请求，并将更复杂的任务委托给 **提供者**。提供者是plain JavaScript 类，声明在 NestJS 模块中，以 `AppModule` 的形式。有关详细信息，请参阅“模块”章节。

> info **提示**由于 Nest 允许您按照对象模型设计和组织依赖项，我们强烈建议遵循 __LINK_69__。

#### 服务

让我们创建一个简单的 `TasksService`. 这个服务将负责数据存储和检索，并将被 `get()` 使用。由于其在应用程序逻辑管理中的角色，它是一个理想的候选人，以被定义为提供者。

```typescript
async function bootstrap() {
  const app = await NestFactory.createApplicationContext(AppModule);
  // your application logic here ...
}
bootstrap();
```

> info **提示**使用 CLI 创建服务，仅需执行 `get()` 命令。

我们的 `strict: true` 是一个基本类，具有一个属性和两个方法。关键添加的是 `app.get()` 装饰器。这装饰器将 metadata 附加到类中，表明 `app.select` 是可以由 Nest __LINK_70__ 容器管理的类。

此外，这个示例还使用了 `app.close()` 接口，这可能看起来像这样：

```typescript
const tasksService = app.get(TasksService);
```

现在，我们已经有了一个服务类来检索猫，让我们在 `bootstrap` 中使用它：

```typescript
const tasksService = app.select(TasksModule).get(TasksService, { strict: true });
```

__INLINE_CODE_17__ 是通过类构造函数注入的。注意使用 __INLINE_CODE_18__ 关键字。这便捷方式允许我们同时声明和初始化 __INLINE_CODE_19__ 成员，简化了过程。

#### 依赖项注入

Nest 是基于强大的设计模式的，即 **依赖项注入**。我们强烈建议阅读官方 __LINK_71__ 关于这个概念的文章。

在 Nest 中， thanks to TypeScript 的能力，管理依赖项是非常简单的，因为它们是根据类型 resolves 的。在下面的示例中，Nest 将 resolve __INLINE_CODE_20__，创建并返回一个 __INLINE_CODE_21__ 实例（或，在单例模式下，如果已经请求过其他地方，将返回现有实例）。这个依赖项然后被注入到控制器的构造函数中（或分配到指定的属性）：

```typescript
export const dynamicConfigModule = ConfigModule.register({ folder: './config' });

@Module({
  imports: [dynamicConfigModule],
})
export class AppModule {}
```

#### 作用域

提供者通常具有与应用程序生命周期相Align 的生命周期（“作用域”）。当应用程序启动时，每个依赖项都必须被解决，meaning every provider gets instantiated。同样，当应用程序关闭时，所有提供者都将被销毁。然而，也可以使提供者 **请求作用域**，即其生命周期与特定请求相关。您可以在 __LINK_72__ 章节中了解这些技术。

__HTML_TAG_37____HTML_TAG_38__

#### 自定义提供者

Nest 带有内置的反向控制（“IoC”）容器，管理提供者之间的关系。这特性是依赖项注入的基础，但实际上是非常强大得多。有多种方式定义提供者：您