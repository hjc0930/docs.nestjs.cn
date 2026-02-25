<!-- 此文件从 content/techniques/versioning.md 自动生成，请勿直接修改此文件 -->
<!-- 生成时间: 2026-02-25T04:12:08.953Z -->
<!-- 源文件: content/techniques/versioning.md -->

### 版本控制

> info **提示** 这个章节仅适用于基于 HTTP 的应用程序。

版本控制允许您在同一个应用程序中拥有多个版本的控制器或单个路由。应用程序变化非常频繁，而需要支持之前版本的应用程序时，版本控制变得非常必要。

有 4 种版本控制类型：

__HTML_TAG_60__
  __HTML_TAG_61__
    __HTML_TAG_62____HTML_TAG_63____HTML_TAG_64__URI 版本控制__HTML_TAG_65____HTML_TAG_66____HTML_TAG_67__
    __HTML_TAG_68__在请求的 URI 中将版本作为参数传递（默认）__HTML_TAG_69__
  __HTML_TAG_70__
  __HTML_TAG_71__
    __HTML_TAG_72____HTML_TAG_73____HTML_TAG_74__头版本控制__HTML_TAG_75____HTML_TAG_76____HTML_TAG_77__
    __HTML_TAG_78__自定义请求头将指定版本__HTML_TAG_79__
  __HTML_TAG_80__
  __HTML_TAG_81__
    __HTML_TAG_82____HTML_TAG_83____HTML_TAG_84__媒体类型版本控制__HTML_TAG_85____HTML_TAG_86____HTML_TAG_87__
    __HTML_TAG_88__请求的 __HTML_TAG_89__Accept__HTML_TAG_90__ 头将指定版本__HTML_TAG_91__
  __HTML_TAG_92__
  __HTML_TAG_93__
    __HTML_TAG_94____HTML_TAG_95____HTML_TAG_96__自定义版本控制__HTML_TAG_97____HTML_TAG_98____HTML_TAG_99__
    __HTML_TAG_100__任何请求的一部分可以用来指定版本(s)。一个自定义函数用于提取这些版本(s)__HTML_TAG_101__
  __HTML_TAG_102__
__HTML_TAG_103__

#### URI 版本控制类型

URI 版本控制使用请求的 URI 中传递的版本，例如 `rxjs` 和 `Observable`。

> warning **注意** 使用 URI 版本控制时，版本将自动添加