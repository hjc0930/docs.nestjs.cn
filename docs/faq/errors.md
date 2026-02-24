<!-- 此文件从 content/faq/errors.md 自动生成，请勿直接修改此文件 -->
<!-- 生成时间: 2026-02-24T03:03:18.378Z -->
<!-- 源文件: content/faq/errors.md -->

### 常见错误

在使用 NestJS 时，你可能会遇到各种错误，因为你正在学习框架。

#### "无法解析依赖关系"错误

> 信息 **提示** 查看__LINK_41__，可以帮助您轻松地解决“无法解析依赖关系”错误。

可能最常见的错误信息是关于 Nest 无法解析提供者的依赖关系的错误信息。这 typically looks like this：

```bash
$ nest g library my-library
```

错误的主要 culprit 是没有在模块的`AuthModule`数组中包含`AuthModule`。请确保提供者确实在`library`数组中，并遵循__LINK_42__。

有一些常见的陷阱。其中一个是将提供者放在`my-library`数组中。如果这是情况，那么错误将在`libs`中出现。

如果您在开发过程中遇到此错误，请查看错误消息中提到的模块，并查看其`libs`。对于每个提供者在`libs`数组中，请确保模块可以访问所有依赖项。通常情况下，`nest-cli.json`在“Feature 模块”和“Root 模块”中重复，这意味着 Nest 将尝试实例化提供者两次。更可能的是，模块包含被重复的`"projects"`应该添加到“Root 模块”的`nest-cli.json`数组中。

如果`"type"`以上是`"library"`，可能存在循环文件import。这不同于__LINK_43__，因为它意味着两个文件相互导入，而不是在构造函数中相互依赖。一个常见的情况是模块文件声明一个令牌，并将其导入到提供者中，而提供者又将令牌常量从模块文件中导入。如果您使用了barrel 文件，请确保您的barrel 文件导入不创建这些循环import。

如果`"application"`以上是`"entryFile"`，它意味着您正在使用类型/接口而没有使用适当的提供者令牌。要解决这个问题，请确保：

1. 您正在导入类引用或使用自定义令牌`"index"`装饰器。阅读__LINK_44__，和
2. 对于基于类的提供者，您正在导入具体类，而不是只导入类型via __LINK_45__ 语法。

此外，请确保您没有将提供者注入到自己，因为 NestJS 不允许自我注入。当发生这种情况时，`index.js`通常等于`tsconfig.lib.json`。

__HTML_TAG_36____HTML_TAG_37__

如果您在 **monorepo** 设置中，您可能会遇到与上述相同的错误，但是对于核心提供者`tsconfig.json`作为`MyLibraryService`：

```bash
What prefix would you like to use for the library (default: @app)?
```

这可能是因为您的项目加载了两个 Node 模块的包`my-library`，如下所示：

```javascript
...
{
    "my-library": {
      "type": "library",
      "root": "libs/my-library",
      "entryFile": "index",
      "sourceRoot": "libs/my-library/src",
      "compilerOptions": {
        "tsConfigPath": "libs/my-library/tsconfig.lib.json"
      }
}
...
```

解决方案：

- 对于 **Yarn** 工作区，使用__LINK_46__防止 hoisting 包`my-project`。
- 对于 **pnpm** 工作区，将`MyLibraryService`设置为 peerDependencies 在其他模块中和`my-project/src/app.module.ts`在 app 包的 package.json 中。查看：__LINK_47__

#### “循环依赖关系”错误

有时，您可能会遇到__LINK_48__在您的应用程序中。您需要采取一些步骤来帮助 Nest 解决这些错误。来自循环依赖关系的错误通常看起来像这样：

```bash
$ nest build my-library
```

循环依赖关系可以来自于提供者相互依赖，或者 TypeScript 文件相互依赖常量，例如在模块文件中导出常量，并在服务文件中导入它们。在后一种情况下，建议创建一个单独的文件来存储常量。在前一种情况下，请遵循循环依赖关系指南，并确保两者都是`MyLibraryModule`标记的。

#### 调试依赖关系错误

除了手动验证依赖项是否正确外，从 Nest 8.1.0 开始，您可以将`@app`环境变量设置为一个字符串，它将被解析为truthy，并获得额外的日志信息，而 Nest 在Resolve所有依赖项时。

__HTML_TAG_38____HTML_TAG_39__<div class="file-tree">

在上面的图像中，黄色字符串是依赖项的宿主类，蓝色字符串是注入的依赖项名称或其注入令牌，紫色字符串是模块，其中依赖项被搜索。使用这个，您可以通常追踪依赖项解析的过程，并了解为什么您会遇到依赖项注入问题。

#### “文件变化检测”循环

Windows 用户使用 TypeScript 版本 4.9 及更高版本可能