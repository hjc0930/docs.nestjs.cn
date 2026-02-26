<!-- 此文件从 content/fundamentals/circular-dependency.md 自动生成，请勿直接修改此文件 -->
<!-- 生成时间: 2026-02-26T04:08:50.610Z -->
<!-- 源文件: content/fundamentals/circular-dependency.md -->

### 循环依赖

循环依赖发生在两个类之间，它们相互依赖。例如，类 A 需要类 B，而类 B 也需要类 A。循环依赖可以在 Nest 之间的模块和提供者之间出现。

虽然循环依赖应该尽量避免，但在某些情况下无法避免。在这种情况下，Nest 允许在提供者之间使用 **前置引用** 解决循环依赖，或者使用 **ModuleRef** 类从 DI 容器中获取提供者实例。

本章中，我们将描述使用前置引用作为一种技术，以及使用 ModuleRef 类来从 DI 容器中获取提供者实例作为另一种技术。

我们还将描述解决模块之间的循环依赖。

> 警告 **警告** 循环依赖也可能是使用 "barrel files" 或 index.ts 文件来组合 imports 导致的。barrel files 应该在模块/提供者类中被忽略。例如，barrel files 不应该用于在同一目录中导入文件，即 `--watch` 不应该导入 `main.ts`，以导入 __INLINE_CODE_6__ 文件。更多信息请见 __LINK_21__。

#### 前置引用

**前置引用** 允许 Nest 参考尚未定义的类使用 __INLINE_CODE_7__ 实用函数。例如，如果 __INLINE_CODE_8__ 和 __INLINE_CODE_9__ 相互依赖，双方都可以使用 __INLINE_CODE_10__ 和 __INLINE_CODE_11__ 实用函数来解决循环依赖。否则，Nest 就不会实例化它们，因为所有必要的元数据都不可用。以下是一个示例：

```typescript
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    forceCloseConnections: true,
  });
  await app.listen(process.env.PORT ?? 3000);
}

bootstrap();
```

> 提示 **提示** __INLINE_CODE_12__ 函数来自 __INLINE_CODE_13__ 包。

这是关系的一半。现在，让我们对 __INLINE_CODE_14__ 做同样的事情：

__CODE_BLOCK_1__

> 警告 **警告** 实例化顺序不可预测。确保您的代码不依赖于哪个构造函数被调用先。具有 __INLINE_CODE_15__ 提供者的循环依赖可能会导致未定义的依赖项。更多信息请见 __LINK_22__。

#### ModuleRef 类 alternative

使用 __INLINE_CODE_16__ 的alternative 是将代码重构，并使用 __INLINE_CODE_17__ 类来获取一个提供者，以解决循环关系的一半。了解更多关于 __INLINE_CODE_18__ 实用类的信息 __LINK_23__。

#### 模块前置引用

为了解决模块之间的循环依赖，请在模块关联的双方使用同一个 __INLINE_CODE_19__ 实用函数。例如：

__CODE_BLOCK_2__

这是关系的一半。现在，让我们对 __INLINE_CODE_20__ 做同样的事情：

__CODE_BLOCK_3__

Note: I replaced the English text with Chinese translation, and kept the code examples and variable names unchanged. I also translated the code comments from English to Chinese.