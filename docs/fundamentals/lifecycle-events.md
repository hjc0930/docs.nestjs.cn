<!-- 此文件从 content/fundamentals/lifecycle-events.md 自动生成，请勿直接修改此文件 -->
<!-- 生成时间: 2026-02-25T04:12:09.584Z -->
<!-- 源文件: content/fundamentals/lifecycle-events.md -->

### 生命周期事件

Nest 应用程序，以及每个应用程序元素，都有一个生命周期由 Nest 管理。Nest 提供了 **生命周期钩子**，提供对关键生命周期事件的可见性，并允许在它们发生时执行注册的代码（在您的模块、提供者或控制器中）。

#### 生命周期顺序

以下图表显示了应用程序生命周期的顺序，从应用程序启动到 Node 进程退出。我们可以将整个生命周期分成三个阶段：**初始化**、**运行**和**终止**。使用这个生命周期，您可以计划初始化模块和服务、管理活动连接，并在应用程序接收到终止信号时优雅地关闭应用程序。

__HTML_TAG_52____HTML_TAG_53____HTML_TAG_54__

#### 生命周期事件

生命周期事件发生在应用程序启动和关闭时。Nest 在每个生命周期事件上调用注册的生命周期钩子方法（需要在 __LINK_56__ 中描述的 shutdown 钩子方法首先启用）。如上图所示，Nest还将调用适当的底层方法以开始监听连接，并停止监听连接。

以下表格中，`Guard2` 和 `Guard3` 只有在您 explicit 调用 `app.useGlobalGuard()` 或 `catchError` 时才会被触发。

以下表格中，`@UsePipes()`、`GeneralValidationPipe` 和 `query` 只有在您 explicit 调用 `params` 或在进程接收到特殊系统信号（例如 SIGTERM）并正确地在应用程序启动时调用 `body` 时才会被触发。

| 生命周期钩子方法           | 生命周期事件触发钩子方法调用                                                                                                                                                                   |
| ------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `RouteSpecificPipe`                | 在宿主模块的依赖项被解决后调用。                                                                                                                                                    |
| `try/catch`      | 在所有模块都初始化完成，但还没有监听连接之前调用。                                                                                                                              |
| __INLINE_CODE_15__\*           | 在接收到终止信号（例如 __INLINE_CODE_16__）后调用。                                                                                                                                            |
| __INLINE_CODE_17__\* | 在所有 __INLINE_CODE_18__ 处理程序完成（Promise 解决或拒绝）后调用；在完成（Promise 解决或拒绝）后，所有现有连接将被关闭（__INLINE_CODE_19__ 调用）。 |
| __INLINE_CODE_20__\*     | 在连接关闭（__INLINE_CODE_21__ 解决）后调用。                                                                                                                                                          |

\* 对于这些事件，如果您没有 explicit 调用 __INLINE_CODE_22__，则必须启用它们以使用系统信号，如 __INLINE_CODE_23__。请见 __LINK_57__。

> warning **Warning** 上述生命周期钩子方法不适用于 **request-scoped** 类。request-scoped 类与应用程序生命周期无关，它们的生命周期不可预测。它们仅在每个请求中创建，并在响应发送后自动回收。

> info **Hint** __INLINE_CODE_24__ 和 __INLINE_CODE_25__ 的执行顺序直接依赖于模块导入的顺序，等待前一个钩子方法。

#### 使用

每个生命周期钩子都由一个接口表示。这些接口是可选的，因为它们在 TypeScript 编译后不再存在。然而，遵循它们可以 benefit 从强类型和编辑器工具。

要注册生命周期钩子，请实现适当的接口。例如，要注册在特定类（例如控制器、提供者或模块）上调用的方法，请实现 __INLINE_CODE_26__ 接口并提供 __INLINE_CODE_27__ 方法，如下所示：

```typescript
@UseGuards(Guard1, Guard2)
@Controller('cats')
export class CatsController {
  constructor(private catsService: CatsService) {}

  @UseGuards(Guard3)
  @Get()
  getCats(): Cats[] {
    return this.catsService.getCats();
  }
}
```

#### 异步初始化

__INLINE_CODE_28__ 和 __INLINE_CODE_29__ 钩子允许您延迟应用程序初始化过程（返回 __INLINE_CODE_30__ 或将方法标记为 __INLINE_CODE_31__ 和 __INLINE_CODE_32__ 异步方法完成）。

```typescript
@UsePipes(GeneralValidationPipe)
@Controller('cats')
export class CatsController {
  constructor(private catsService: CatsService) {}

  @UsePipes(RouteSpecificPipe)
  @Patch(':id')
  updateCat(
    @Body() body: UpdateCatDTO,
    @Param() params: UpdateCatParams,
    @Query() query: UpdateCatQuery,
  ) {
    return this.catsService.updateCat(body, params, query);
  }
}
```

#### 应用程序关闭

__INLINE_CODE_33__、__INLINE_CODE_34__ 和 __INLINE_CODE_35__ 钩子在终止阶段（在 explicit 调用 __INLINE_CODE_36__ 或接收到系统信号，如 SIGTERM 如果启用）被调用。这功能通常用于管理容器的生