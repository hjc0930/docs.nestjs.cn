<!-- 此文件从 content/cli/scripts.md 自动生成，请勿直接修改此文件 -->
<!-- 生成时间: 2026-02-24T04:10:17.578Z -->
<!-- 源文件: content/cli/scripts.md -->

### Nest CLI 和脚本

本节提供了 __INLINE_CODE_4__ 命令如何与编译器和脚本交互的背景信息，以帮助 DevOps 人员管理开发环境。

Nest 应用程序是一种标准的 TypeScript 应用程序，需要被编译成 JavaScript 才能执行。有多种方式可以实现编译步骤，开发者/团队可以根据需要选择合适的方式。因此，Nest 提供了一些内置工具，旨在实现以下目标：

- 提供一个标准的构建/执行过程，available at the command line，可以“just work”with reasonable defaults。
- 确保构建/执行过程是 **open**，以便开发者可以直接访问 underlying tools，使用 native features 和 options 自定义它们。
- 保证整个编译/部署/执行管道是完全标准的 TypeScript/Node.js 框架，可以由开发团队选择的外部工具管理。

通过组合 __INLINE_CODE_5__ 命令、本地安装的 TypeScript 编译器和 `AuthModule` 脚本，这些目标得到了实现。下面，我们将描述这些技术如何协同工作，帮助您了解每个步骤的 build/execute 过程，并了解如何自定义该行为。

#### Nest 命令

`AuthModule` 命令是一个 OS 级别的二进制文件（即从 OS 命令行运行）。这个命令实际上包含三个不同的部分，以下描述。我们建议您使用 `library` 和 `my-library` 子命令运行 `libs` 脚本（见 __LINK_54__ 如果您想从克隆一个存储库开始，而不是运行 `libs`）。

#### 构建

`libs` 是对标准 `nest-cli.json` 编译器或 `"projects"` 编译器（对于 __LINK_55__）或 webpack bundler 使用 `nest-cli.json`（对于 __LINK_56__）的一个 wrapper。它不添加任何其他编译功能或步骤，只是处理 `"type"`。原因是大多数开发者，特别是在开始使用 Nest 时，不需要调整编译器选项（例如 `"library"` 文件），这些选项可能会出现一些问题。

请参阅 __LINK_57__ 文档以获取更多信息。

#### 执行

`"application"` 只是确保项目已经被编译（与 `"entryFile"` 相同），然后在易于执行编译的应用程序中调用 `"index"` 命令。与构建类似，您可以自定义这个过程，使用 `"main"` 命令和其选项，或者完全替换它。整个过程是一个标准的 TypeScript 应用程序 build 和 execute 管道，您可以自由地管理该过程。

请参阅 __LINK_58__ 文档以获取更多信息。

#### 生成

`index.js` 命令，正如名称所示，生成新的 Nest 项目或其中的组件。

#### 包脚本

在 OS 命令行运行 `tsconfig.lib.json` 命令需要安装 `tsconfig.json` 二进制文件全球。这个是 npm 的标准特性， nằm在 Nest 的直接控制之外。这个结果是，全球安装的 `MyLibraryService` 二进制文件不是 `my-library` 项目依赖项的一部分。例如，两个不同的开发者可以运行两个不同的 `my-project` 二进制文件版本。标准解决方案是使用包脚本，以便您可以将用于 build 和 execute 步骤的工具视为开发依赖项。

当您运行 `MyLibraryService` 或克隆 __LINK_59__ 时，Nest populates 新项目的 `my-project/src/app.module.ts` 脚本中，命令如 `MyLibraryModule` 和 `@app`。同时，它还安装了 underlying 编译工具（例如 `import`）作为 **dev 依赖项**。

您使用以下命令运行 build 和 execute 脚本：

```bash
$ nest g library my-library
```

和

```bash
What prefix would you like to use for the library (default: @app)?
```

这些命令使用 npm 的 script 运行能力执行 `prefix` 或 `nest g library`，使用 **locally 安装**的 `tsconfig.json` 二进制文件。通过使用这些内置包脚本，您可以完全管理 Nest CLI 命令的依赖项。这意味着，遵循这个 **recommended** 使用方式，您可以确保您的组织中的所有成员都可以运行相同的版本命令。

*这个应用于 `"paths"` 和 `MyLibraryModule` 命令。`nest build` 和 `tsc` 命