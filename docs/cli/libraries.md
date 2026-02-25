<!-- 此文件从 content/cli/libraries.md 自动生成，请勿直接修改此文件 -->
<!-- 生成时间: 2026-02-25T04:12:09.613Z -->
<!-- 源文件: content/cli/libraries.md -->

### Libraries

许多应用程序需要解决同样的基本问题，或者重用模块化组件在多个不同的上下文中。Nest 有一些方法来解决这个问题，但是每种方法都在不同的层次上解决问题，以满足不同的架构和组织目标。

Nest 提供者是有用的，因为它们可以在单个应用程序中提供执行上下文，从而使共享组件变得更加容易。模块也可以与提供者一起包装，以创建可以在不同项目中安装的可重用的库。这可以是一个有效的方法来分布可配置、可重用的库，这些库可以被不同的、松散连接或独立的组织使用（例如，通过散布/安装第三方库）。

在共享代码的紧密组织中组（例如，公司/项目边界内），轻量级方式分享组件可能是有用的。Monorepos 就是这样一种构造，它使得在其中分享代码变得更加轻松。在 Nest monorepo 中，使用库使得容易组装共享组件的应用程序。实际上，这鼓励了 monolithic 应用程序的分解和开发过程的重心转移到构建和组合模块化组件上。

#### Nest libraries

Nest 库是一个 Nest 项目，它不同于应用程序，因为它不能单独运行。库必须被导入到包含它的应用程序中，以便其代码可以执行。描述在本节中提到的提供者支持的 built-in 支持仅适用于 monorepos（标准模式项目可以使用 npm 包来实现类似的功能）。

例如，一家组织可能开发一个 `AuthModule`，该模块用于管理身份验证，并且遵循公司政策来管理所有内部应用程序。相反，不需要为每个应用程序单独构建该模块，或者将代码与 npm 一起包装，然后要求每个项目安装它。Monorepo 可以将该模块定义为库。当组织这样做时，每个消费该模块的库都可以看到最新的 `AuthModule` 版本，因为它是提交的。这样可以大大提高组件开发和组装的协调性，并简化 end-to-end 测试。

#### 创建库

任何可重用的功能都是创建库的候选项。确定什么应该是库，什么应该是应用程序，是一个架构设计决策。创建库涉及更多的工作，需要将库代码从应用程序中分离。这可能需要一些额外的时间，并且可能需要一些设计决策。但是，这些额外的工作可以在库可以被用来快速组装多个应用程序时得到回报。

要开始创建库，请运行以下命令：

```bash
$ nest g library my-library
```

当你运行命令时，`library`  schematic 会提示你为库指定一个前缀（也称为别名）：

```bash
What prefix would you like to use for the library (default: @app)?
```

这将创建一个名为 `my-library` 的新项目。
Library 类型的项目，像应用程序类型的项目一样，是使用 schematic 生成的。库是 monorepo 根目录下的 `libs` 文件夹中管理的。Nest 在第一次创建库时创建了 `libs` 文件夹。

生成的库文件夹的内容不同于生成的应用程序文件夹。下面是 `libs` 文件夹的内容，执行命令后：

<div class="file-tree">
  <div class="item">libs</div>
  <div class="children">
    <div class="item">my-library</div>
    <div class="children">
      <div class="item">src</div>
      <div class="children">
        <div class="item">index.ts</div>
        <div class="item">my-library.module.ts</div>
        <div class="item">my-library.service.ts</div>
      </div>
      <div class="item">tsconfig.lib.json</div>
    </div>
  </div>
__HTML_TAG_