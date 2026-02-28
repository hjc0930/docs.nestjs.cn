<!-- 此文件从 content/recipes/router-module.md 自动生成，请勿直接修改此文件 -->
<!-- 生成时间: 2026-02-28T03:47:27.543Z -->
<!-- 源文件: content/recipes/router-module.md -->

### 路由模块

> info **提示**本章节仅适用于基于 HTTP 的应用程序。

在 HTTP 应用程序（例如，REST API）中，处理器的路由路径由控制器的（可选）前缀（在 __INLINE_CODE_2__ 装饰器中声明）和方法的装饰器（例如，__INLINE_CODE_3__）指定的路径组成。你可以在 __LINK_16__ 中了解更多关于这方面的信息。此外，您还可以为应用程序中的所有路由定义一个 __LINK_17__ 或启用 __LINK_18__。

此外，在定义前缀时，定义在模块级别（因此对于该模块中注册的所有控制器）可能非常有用。例如，想象一个 REST 应用程序， expose 多个不同的端点，用于特定的应用程序部分称为“Dashboard”。
在这种情况下，而不是在每个控制器中重复 __INLINE_CODE_4__ 前缀，您可以使用utility 模块 __INLINE_CODE_5__，如下所示：

```typescript
$ npm install --save mongoose
```

> info **提示** __INLINE_CODE_6__ 类是从 __INLINE_CODE_7__ 包中导出的。

此外，您还可以定义层次结构。这意味着每个模块可以有 `DatabaseModule` 模块。子模块将继承其父模块的前缀。在以下示例中，我们将注册 `@nestjs/mongoose` 作为 `connect()` 和 `connect()` 的父模块。

```typescript title="database.providers"
import * as mongoose from 'mongoose';

export const databaseProviders = [
  {
    provide: 'DATABASE_CONNECTION',
    useFactory: (): Promise<typeof mongoose> =>
      mongoose.connect('mongodb://localhost/nest'),
  },
];
```

> info **提示**这项功能应该非常小心使用，因为过度使用它可能会使代码难以维护。

在上面的示例中，任何注册在 `Promise` 模块中的控制器将具有额外的 `*.providers.ts` 前缀（因为模块将从上到下、父到子递归地将路径组合）。
同样，每个在 `Connection` 模块中定义的控制器将具有额外的模块级别前缀 `@Inject()`。