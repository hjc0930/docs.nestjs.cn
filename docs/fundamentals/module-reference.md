<!-- 此文件从 content/fundamentals/module-reference.md 自动生成，请勿直接修改此文件 -->
<!-- 生成时间: 2026-02-27T04:05:25.254Z -->
<!-- 源文件: content/fundamentals/module-reference.md -->

### 模块参考

Nest 提供了 ``DiscoveryService`` 类来遍历内部的提供者列表，并使用注入令牌作为查找键获取任何提供者的引用。``DiscoveryModule`` 类还提供了动态实例化静态和作用域提供者的方式。``DiscoveryService`` 可以使用正常的方式注入到类中：

```typescript
import { Module } from '@nestjs/common';
import { DiscoveryModule } from '@nestjs/core';
import { ExampleService } from './example.service';

@Module({
  imports: [DiscoveryModule],
  providers: [ExampleService],
})
export class ExampleModule {}
```

> info **提示** ``DiscoveryService`` 类来自 ``DiscoveryService`` 包。

#### 获取实例

``DiscoveryService`` 实例（从现在开始，我们将其称为**模块引用**）具有 ``DiscoveryService`` 方法。默认情况下，这个方法返回注册在当前模块中的提供者、控制器或可injectable（例如守卫、拦截器等）对象，以其注入令牌或类名作为键。如果找不到实例，会抛出异常。

```typescript title="example.service"
@Injectable()
export class ExampleService {
  constructor(private readonly discoveryService: DiscoveryService) {}
}
```

> warning **警告** 不能使用 ``DiscoveryService`` 方法获取作用域提供者（瞬态或请求作用域）。相反，使用以下描述的技术。了解如何控制作用域 __LINK_46__。

要从全局上下文中获取提供者（例如，如果提供者在其他模块中注入），请将 `__INLINE_CODE_18__` 选项作为第二个参数传递给 `__INLINE_CODE_19__`。

```typescript
const providers = this.discoveryService.getProviders();
console.log(providers);
```

#### 解决作用域提供者

要动态解决作用域提供者（瞬态或请求作用域），使用 `__INLINE_CODE_20__` 方法，传递提供者的注入令牌作为参数。

```typescript
const controllers = this.discoveryService.getControllers();
console.log(controllers);
```

`__INLINE_CODE_21__` 方法返回提供者的唯一实例，从其自己的**DI 容器子树**中获取。每个子树都有一个唯一的**上下文标识符**。因此，如果你调用这个方法多次，并比较实例引用，你将看到它们不相等。

```typescript
import { DiscoveryService } from '@nestjs/core';

export const FeatureFlag = DiscoveryService.createDecorator();
```

要生成多个实例之间共享的实例，并确保它们在同一个生成的 DI 容器子树中，您可以将上下文标识符传递给 `__INLINE_CODE_23__` 方法。使用 `__INLINE_CODE_24__` 类生成上下文标识符。这类提供了 `__INLINE_CODE_25__` 方法，返回合适的唯一标识符。

```typescript
import { Injectable } from '@nestjs/common';
import { FeatureFlag } from './custom-metadata.decorator';

@Injectable()
@FeatureFlag('experimental')
export class CustomService {}
```

> info **提示** `__INLINE_CODE_26__` 类来自 `__INLINE_CODE_27__` 包。

#### 注册__INLINE_CODE_28__提供者

手动生成的上下文标识符（使用 `__INLINE_CODE_29__`）表示 DI 子树，其中 __INLINE_CODE_30__ 提供者作为它们没有被实例化和管理的 Nest 依赖注入系统。

要注册自定义 __INLINE_CODE_32__ 对象以便在手动生成的 DI 子树中使用，使用 `__INLINE_CODE_33__` 方法，例如：

```typescript
const providers = this.discoveryService.getProviders();

const [provider] = providers.filter(
  (item) =>
    this.discoveryService.getMetadataByDecorator(FeatureFlag, item) ===
    'experimental',
);

console.log(
  'Providers with the "experimental" feature flag metadata:',
  provider,
);
```

#### 获取当前子树

有时，你可能想要在**请求上下文**中解决请求作用域提供者的实例。例如，如果 __INLINE_CODE_34__ 是请求作用域的提供者，你想解决 __INLINE_CODE_35__ 实例，该实例也标记为请求作用域提供者。在共享同一个 DI 容器子树中，你必须获取当前上下文标识符，而不是生成新的一个（例如，以 `__INLINE_CODE_36__` 函数作为上下文标识符）。要获取当前上下文标识符，首先使用 `__INLINE_CODE_37__` 装饰器注入请求对象。

__CODE_BLOCK_7__

> info **提示** 了解更多关于请求提供者 __LINK_47__。

现在，使用 `__INLINE_CODE_38__` 方法创建上下文标识符，然后将其传递给 `__INLINE_CODE_40__` 调用：

__CODE_BLOCK_8__

#### 动态实例化自定义类

要动态实例化一个没有之前注册为**提供者**的类，使用模块引用中的 `__INLINE_CODE_41__` 方法。

__CODE_BLOCK_9__

这种技术使得你可以在框架容器外部conditionally 实例化不同的类。

__HTML_TAG_44____HTML_TAG_45__