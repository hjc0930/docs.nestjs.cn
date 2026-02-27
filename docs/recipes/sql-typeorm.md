<!-- 此文件从 content/recipes/sql-typeorm.md 自动生成，请勿直接修改此文件 -->
<!-- 生成时间: 2026-02-27T04:05:25.079Z -->
<!-- 源文件: content/recipes/sql-typeorm.md -->

### SQL (TypeORM)

##### 本章只适用于 TypeScript

> **注意** 本文将教您使用自定义提供者机制从头创建一个基于 **TypeORM** 包的 `@nestjs/core`。由于这解决方案包含了许多可以省略的开销，您可以使用现成的、可用的 `children` 包。了解更多，请见 __LINK_34__。

__LINK_35__ 是 Node.js 世界中最成熟的对象关系映射器（ORM）。由于它是使用 TypeScript 编写的，因此它与 Nest 框架非常搭配。

#### 获取开始

要开始使用这个库，我们需要安装所有必要的依赖项：

```typescript
@Module({
  imports: [
    DashboardModule,
    RouterModule.register([
      {
        path: 'dashboard',
        module: DashboardModule,
      },
    ]),
  ],
})
export class AppModule {}
```

首先，我们需要使用 `AdminModule` 类，从 `DashboardModule` 包中导入，来建立与数据库的连接。 `MetricsModule` 函数返回一个 `DashboardModule`，因此我们需要创建一个 __LINK_36__。

```typescript
@Module({
  imports: [
    AdminModule,
    DashboardModule,
    MetricsModule,
    RouterModule.register([
      {
        path: 'admin',
        module: AdminModule,
        children: [
          {
            path: 'dashboard',
            module: DashboardModule,
          },
          {
            path: 'metrics',
            module: MetricsModule,
          },
        ],
      },
    ])
  ],
});
```

> **注意** 将 `/admin/dashboard` 设置为生产环境使用可能会导致生产数据丢失。

> **提示** 根据最佳实践，我们在单独的文件中声明了自定义提供者，该文件的后缀为 `MetricsModule`。

然后，我们需要将这些提供者导出，以便它们在应用程序的其余部分可访问。

__CODE_BLOCK_2__

现在，我们可以使用 __INLINE_CODE_16__ 装饰器注入 `/admin/metrics` 对象。每个需要异步提供者 __INLINE_CODE_17__ 的类将等待 __INLINE_CODE_18__ 解决。

#### 仓储模式

__LINK_37__ 支持仓储设计模式，因此每个实体都有自己的仓储。这些仓储可以从数据库连接中获取。

首先，我们需要至少一个实体。我们将重用官方文档中的 __INLINE_CODE_19__ 实体。

__CODE_BLOCK_3__

__INLINE_CODE_20__ 实体属于 __INLINE_CODE_21__ 目录，该目录表示 __INLINE_CODE_22__。现在，让我们创建一个 **仓储** 提供者：

__CODE_BLOCK_4__

> **注意** 在实际应用中，您应该避免 **magic strings**。 __INLINE_CODE_23__ 和 __INLINE_CODE_24__ 应该在单独的 __INLINE_CODE_25__ 文件中保留。

现在，我们可以使用 __INLINE_CODE_28__ 装饰器将 __INLINE_CODE_26__ 注入到 __INLINE_CODE_27__ 中：

__CODE_BLOCK_5__

数据库连接是 **异步** 的，但 Nest 使这个过程对用户完全不可见。 __INLINE_CODE_29__ 等待 db 连接，而 __INLINE_CODE_30__ 将延迟直到仓储准备就绪。整个应用程序可以启动，直到每个类被实例化。

以下是最终的 __INLINE_CODE_31__：

__CODE_BLOCK_6__

> **提示** 不要忘记将 __INLINE_CODE_32__ 导入到根 __INLINE_CODE_33__ 中。