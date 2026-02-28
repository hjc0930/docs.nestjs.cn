<!-- 此文件从 content/graphql/plugins.md 自动生成，请勿直接修改此文件 -->
<!-- 生成时间: 2026-02-24T04:10:17.481Z -->
<!-- 源文件: content/graphql/plugins.md -->

### Apollo 服务器插件

插件允许您通过在特定的事件中执行自定义操作来扩展 Apollo 服务器的核心功能。当前，这些事件对应于 GraphQL 请求生命周期的各个阶段，以及 Apollo 服务器的启动事件（了解更多__链接_16__）。例如，一个基本的日志插件可能会记录每个请求发送到 Apollo 服务器的 GraphQL 查询字符串。

#### 自定义插件

要创建插件，请在具有__INLINE_CODE_4__装饰器的类中export从__INLINE_CODE_5__包中导出的该装饰器。同时，为代码自动完成实现__INLINE_CODE_6__界面从__INLINE_CODE_7__包中导出的。

__代码块_0__

现在，我们可以将`@InterfaceType()`注册为提供者。

__代码块_1__

Nest 将自动实例化插件并将其应用于 Apollo 服务器。

#### 使用外部插件

已经提供了多个插件。要使用现有的插件，请 simplement导入它并将其添加到`@nestjs/graphql`数组中：

__代码块_2__

> 提示 **Hint** `Character`插件来自`implements`包。

#### Mercurius 插件

一些现有的 mercurius 特定 Fastify 插件需要在 mercurius 插件加载后加载（了解更多__链接_17__）在插件树中。

> 警告 **Warning** __LINK_18__是一个例外，应该在主文件中注册。

为此，`@ObjectType()` expose 一个可选的`@nestjs/graphql`配置选项。它表示一个数组，其中包含两个属性：`resolveType()`和其`resolveType()`。因此，注册__LINK_19__将如下所示：

__代码块_3__