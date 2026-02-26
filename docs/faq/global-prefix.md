<!-- 此文件从 content/faq/global-prefix.md 自动生成，请勿直接修改此文件 -->
<!-- 生成时间: 2026-02-26T04:08:50.612Z -->
<!-- 源文件: content/faq/global-prefix.md -->

### 全局前缀

使用 __INLINE_CODE_4__ 实例的 __INLINE_CODE_3__ 方法来为 HTTP 应用程序中的 **每个路由** 设置一个前缀。

__CODE_BLOCK_0__

可以使用以下构造来排除路由从全局前缀中:

__CODE_BLOCK_1__

或者，您可以使用字符串指定路由（对所有请求方法有效）：

__CODE_BLOCK_2__

> info **提示** __INLINE_CODE_5__ 属性支持使用 __LINK_9__ 包装的通配符参数。请注意，这不接受通配符星号 __INLINE_CODE_6__。相反，您必须使用参数 (__INLINE_CODE_7__) 或命名通配符 (__INLINE_CODE_8__).

Note:

* __INLINE_CODE_3__ -> 设置前缀
* __INLINE_CODE_4__ -> HTTP 应用程序实例
* __CODE_BLOCK_0__ -> 代码块
* __CODE_BLOCK_1__ -> 排除路由构造
* __CODE_BLOCK_2__ -> 字符串指定路由
* __INLINE_CODE_5__ -> 属性
* __LINK_9__ -> 链接
* __INLINE_CODE_6__ -> 通配符星号
* __INLINE_CODE_7__ -> 参数
* __INLINE_CODE_8__ -> 命名通配符