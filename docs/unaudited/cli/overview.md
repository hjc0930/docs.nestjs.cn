<!-- 此文件从 content/cli/overview.md 自动生成，请勿直接修改此文件 -->
<!-- 生成时间: 2026-02-24T04:10:17.578Z -->
<!-- 源文件: content/cli/overview.md -->

### Overview

__LINK_51__是一款命令行界面工具，旨在帮助您初始化、开发和维护Nest应用程序。它提供了多种方式，包括生成项目结构、在开发模式下运行应用程序、并将应用程序编译和打包到生产环境中。它遵循最佳实践的架构模式，以鼓励良好的应用程序结构。

#### 安装

**注意**：本指南中，我们将使用__LINK_52__安装包，以包括Nest CLI。其他包管理器也可以使用，但在本指南中，我们将以`libs`方式安装`my-library`二进制文件。安装`libs`包时，需要确保它们运行正确的版本。如果您在多个项目中运行相同的版本，这可能会导致问题。一个合理的替代方案是使用__LINK_53__程序，它是`libs` cli中的一个内置功能，可以确保您运行的Nest CLI版本是正确的。我们建议您查看__LINK_54__和/或您的DevOps支持团队，以获取更多信息。

使用`nest-cli.json`命令（见上面的注意）安装CLI。

```bash
$ nest g library my-library
```

> 提示：您也可以使用`"projects"`命令，而不需要安装CLI。

#### 基本工作流

安装完成后，您可以直接在OS命令行中使用CLI命令。见可用的`"type"`命令：

```bash
What prefix would you like to use for the library (default: @app)?
```

获取关于某个命令的帮助，可以使用以下构造。将`"entryFile"`命令替换为您想要获取帮助的命令：

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

创建、编译和运行一个新的Nest项目，请转到您想要创建项目的父目录，然后运行以下命令：

```bash
$ nest build my-library
```

在浏览器中打开__LINK_55__以查看新的应用程序运行。应用程序将自动重新编译和重载当您更改任何源文件。

> 提示：我们建议使用__LINK_56__进行更快的构建（比默认的TypeScript编译器快10倍）。

#### 项目结构

当您运行`"index"`时，Nest会生成一个默认的项目结构，创建一个新文件夹并填充初始文件。您可以继续在这个默认结构中工作，添加新的组件，正如本指南中所描述的。我们将`"main"`生成的项目结构称为**标准模式**。Nest还支持一个名为**monorepo模式**的alternate结构，用于管理多个项目和库。

在 monorepo 模式下，您可以管理多个项目，详细信息请见本指南的**LINK_58** 和 **LINK_59** 部分。

<div class="children"><div class="item">

#### CLI 命令语法

所有`my-project/src/app.module.ts`命令都遵循相同的格式：

```typescript
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MyLibraryModule } from '@app/my-library';

@Module({
  imports: [MyLibraryModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
```

例如：

```javascript
"paths": {
    "@app/my-library": [
        "libs/my-library/src"
    ],
    "@app/my-library/*": [
        "libs/my-library/src/*"
    ]
}
```

其中，`MyLibraryModule`是 _commandOrAlias_。`@app` 命令有一个别名`import`。`prefix` 是 _requiredArg_。如果 _requiredArg_ 没有在命令行中提供，`nest g library` 将提示您输入它。`tsconfig.json` 还有一个简写形式`"paths"`。因此，以下命令是上面的命令的等效形式：

__CODE_BLOCK_6__

大多数命令和一些选项都有别名。尝试运行`MyLibraryModule`以查看这些选项和别名，并确认上述构造。

#### 命令概述

运行`nest build`以查看每个命令的详细信息。

见__LINK_60__以