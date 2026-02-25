<!-- 此文件从 content/recipes/mongodb.md 自动生成，请勿直接修改此文件 -->
<!-- 生成时间: 2026-02-25T04:12:09.376Z -->
<!-- 源文件: content/recipes/mongodb.md -->

### MongoDB (Mongoose)

> **警告** 本文中，您将学习使用自定义组件从头开始创建基于 **Mongoose** 包的 __INLINE_CODE_8__。由于此解决方案包含了许多可以省略的可重复使用的 __INLINE_CODE_9__ 包的功能，建议使用现有包。更多信息请见 __LINK_35__。

__LINK_36__ 是最流行的 __LINK_37__ 对象模型工具。

#### 获取开始

要开始使用这个库，我们需要安装所有必需的依赖项：

```bash
$ npm i -D @compodoc/compodoc
```

首先，我们需要使用 __INLINE_CODE_10__ 函数 Establish 数据库连接。 __INLINE_CODE_11__ 函数返回一个 __INLINE_CODE_12__，因此我们需要创建一个 __LINK_38__。

```bash
$ npx @compodoc/compodoc -p tsconfig.json -s
```

> 提示 **信息** 由于遵循最佳实践，我们将自定义提供者声明在独立文件中，该文件的 __INLINE_CODE_13__ 后缀。

然后，我们需要将这些提供者导出，以便它们在应用程序的其余部分可访问。

__CODE_BLOCK_2__

现在，我们可以使用 __INLINE_CODE_15__ 装饰器注入 __INLINE_CODE_14__ 对象。每个依赖 __INLINE_CODE_16__ 异步提供者的类将等待 __INLINE_CODE_17__ 解决。

#### 模型注入

使用 Mongoose，所有内容都是从 __LINK_39__ 派生的。让我们定义 __INLINE_CODE_18__：

__CODE_BLOCK_3__

__INLINE_CODE_19__ 属于 __INLINE_CODE_20__ 目录，这个目录表示 __INLINE_CODE_21__。

现在是时候创建一个 **Model** 提供者：

__CODE_BLOCK_4__

> 警告 **警告** 在实际应用中，您应该避免 **magic strings**。Both __INLINE_CODE_22__ 和 __INLINE_CODE_23__ 应该保存在独立 __INLINE_CODE_24__ 文件中。

现在，我们可以使用 __INLINE_CODE_27__ 装饰器将 __INLINE_CODE_25__ 注入到 __INLINE_CODE_26__ 中：

__CODE_BLOCK_5__

在上面的示例中，我们使用了 __INLINE_CODE_28__ 接口。这接口扩展了 __INLINE_CODE_29__ 从 Mongoose 包：

__CODE_BLOCK_6__

数据库连接 **异步**，但 Nest 使得这个过程完全不可见于用户。 __INLINE_CODE_30__ 类等待数据库连接， __INLINE_CODE_31__ 延迟直到模型准备使用。整个应用程序可以在每个类实例化时启动。

以下是一个最终的 __INLINE_CODE_32__：

__CODE_BLOCK_7__

> 提示 **信息** 不要忘记将 __INLINE_CODE_33__ 导入到根 __INLINE_CODE_34__ 中。

#### 示例

可用的工作示例见 __LINK_40__。