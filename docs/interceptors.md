<!-- 此文件从 content/interceptors.md 自动生成，请勿直接修改此文件 -->
<!-- 生成时间: 2026-02-24T02:34:12.885Z -->
<!-- 源文件: content/interceptors.md -->

### 拦截器

拦截器是一种类，使用`装饰器`注解并实现`接口`。

__HTML_TAG_86____HTML_TAG_87____HTML_TAG_88__

拦截器拥有许多有用的功能，这些功能受到__LINK_91__ (AOP)技术的启发。它们使您可以：

* 在方法执行前/后绑定额外的逻辑
* 将函数返回的结果转换
* 将函数抛出的异常转换
* 扩展基本函数行为
* 完全override函数，根据特定条件（例如，用于缓存目的）

#### 基本概念

每个拦截器都实现了`next()`方法，该方法接受两个参数。第一个参数是`ExecutionContext`实例（与__LINK_92__相同），而`AuthGuard`继承自`validateRequest()`。我们在异常过滤器章节中已经见过`canActivate()`。它是一个对arguments的