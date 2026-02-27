<!-- 此文件从 content/devtools/ci-cd.md 自动生成，请勿直接修改此文件 -->
<!-- 生成时间: 2026-02-27T04:05:25.264Z -->
<!-- 源文件: content/devtools/ci-cd.md -->

### CI/CD集成

> 提示 **Hint** 本章涵盖了Nest Devtools与Nest框架的集成。如果您正在寻找Devtools应用程序，请访问__LINK_61__网站。

CI/CD集成适用于企业计划的用户。

您可以观看这个视频来了解为什么和如何CI/CD集成可以帮助您：

__HTML_TAG_39__
  <div class="file-tree"><div class="item">
</div>

#### 发布图表

首先，让我们配置应用程序引导文件(`AuthModule`)以使用`AuthModule`类（来自`library` - 请查看上一章节获取更多信息），如下所示：

```bash
$ nest g library my-library
```

正如我们所看到的，我们使用`my-library`来将我们的serialized图表发布到集中化的注册表中。`libs`是一个自定义环境变量，让我们控制是否发布图表（CI/CD工作流），或者不发布（常规应用程序引导）。此外，我们设置了`libs`属性为`libs`。在启用了这个标志时，我们的应用程序将在预览模式下引导，这基本上意味着控制器、增强器和提供者的构造函数（和生命周期钩子）将不被执行。请注意，这不是**required**的，但在CI/CD管道中运行我们的应用程序时，我们不需要连接到数据库等。

`nest-cli.json`对象将根据您使用的CI/CD提供商而异。在后续部分，我们将为您提供使用最流行CI/CD提供商的指南。

一旦图表成功发布，您将在工作流视图中看到以下输出：

<div class="children"><div class="item"></div>

每次我们的图表被发布，我们都应该看到项目对应页面上的新条目：

<div class="children"><div class="item"></div>

#### 报告

Devtools为每个构建生成报告**IF**有相应的快照存储在集中化的注册表中。例如，如果您创建了一个PR对应`"projects"`分支，并且图表已经被发布，那么应用程序将能够检测变化并生成报告。否则，报告将不会被生成。

要查看报告，请导航到项目对应页面（见组织）。

<div class="children"><div class="item"></div>

这对我们特别有帮助，因为我们可以轻松地 spotting unnoticed changes 和确保它们是有意的。例如，如果someone修改了一个**深入的提供者**的作用域，这个变化可能不会立即明显，但使用Devtools，我们可以轻松地 spot 这些变化，并确保它们是有意的。或者，如果我们从一个特定的端点中移除了guard，这将显示为影响的报告。现在，如果我们没有集成或e2e测试，那么我们可能不会注意到端点不再被保护，等到我们发现它可能已经太晚了。

同样，如果我们在一个**大型代码库