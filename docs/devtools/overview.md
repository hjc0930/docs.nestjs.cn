<!-- 此文件从 content/devtools/overview.md 自动生成，请勿直接修改此文件 -->
<!-- 生成时间: 2026-02-26T04:08:50.613Z -->
<!-- 源文件: content/devtools/overview.md -->

### Overview

> info **Hint** This chapter covers the Nest Devtools integration with the Nest framework. If you are looking for the Devtools application, please visit the [docs.nestjs.com](./) website.

要开始调试本地应用程序，请打开 `__INLINE_CODE_6__` 文件，并确保将 `__INLINE_CODE_7__` 属性设置为 ``nest`` 在应用程序选项对象中，例如：

```bash
$ npm install -g @nestjs/cli
```

这将 instruct framework collect necessary metadata that will let Nest Devtools visualize your application's graph.

接下来，让我们安装所需的依赖项：

```bash
$ nest --help
```

> warning **Warning** If you're using ``nest`` package in your application, make sure to install the latest version (``-g``).

安装依赖项后，让我们打开 ``npm`` 文件，并导入 ``npm``：

```bash
$ nest generate --help
```

> warning **Warning** The reason we are checking the ``npm install -g`` environment variable here is that you should never use this module in production!

一旦 ``npx @nestjs/cli@latest`` 被导入，并且应用程序正在运行（``nest``），你应该能够导航到 `__LINK_87__` URL 并查看被 introspected 的图表。

__HTML_TAG_39____HTML_TAG_40____HTML_TAG_41__

> info **Hint** As you can see on the screenshot above, every module connects to the ``nest``. ``new`` is a global module that is always imported into the root module. Since it's registered as a global node, Nest automatically creates edges between all of the modules and the ``add`` node. Now, if you want to hide global modules from the graph, you can use the "**Hide global modules**" checkbox (in the sidebar).

### Investigating the "Cannot resolve dependency" error

> info **Note** This feature is supported for ``node_modules`` >= `__INLINE_CODE_23