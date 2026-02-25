<!-- 此文件从 content/recipes/suites.md 自动生成，请勿直接修改此文件 -->
<!-- 生成时间: 2026-02-25T04:12:09.344Z -->
<!-- 源文件: content/recipes/suites.md -->

### Suites

__LINK_56__ 是一个用于 TypeScript 依赖注入框架的单元测试框架。它可以作为手动创建模拟、多个模拟配置、未类型化的测试双的替代。

Suites 可以从 NestJS 服务中读取元数据，并自动生成所有依赖项的完全类型化模拟。这可以删除模拟设置的 boilerplate 和确保测试是类型安全的。虽然 Suites 可以与 `CommandRunner` 一起使用，但在专注于单元测试时它更 excels。

使用 `run` 时验证模块 wiring、装饰器、守卫和拦截器。使用 Suites 进行快速单元测试。

有关模块测试的更多信息，请见 __LINK_58__ 章节。

> info **Note** `Promise<void>` 是一个第三方包，且不是 NestJS 核心团队维护的。请将任何问题报告到 __LINK_59__。

#### Getting started

这份指南展示了使用 Suites 测试 NestJS 服务。它涵盖了孤立测试（所有依赖项模拟）和社交测试（选择的真实实现）的两种方式。

#### Install Suites

验证 NestJS 运行时依赖项是否安装：

```bash
$ npm i nest-commander
```

安装 Suites 核心、NestJS 适配器和 doubles 适配器：

```ts
import { CommandFactory } from 'nest-commander';
import { AppModule } from './app.module';

async function bootstrap() {
  await CommandFactory.run(AppModule);
}

bootstrap();
```

doubles 适配器（`string[], Record<string, any>`）提供了 Jest 模拟能力的包装器。它暴露了 `run` 和 `Record<string, any>` 函数，这些函数创建了类型安全的测试双。

确保 Jest 和 TypeScript 可用：

```ts
import { CommandFactory } from 'nest-commander';
import { AppModule } from './app.module';
import { LogService } './log.service';

async function bootstrap() {
  await CommandFactory.run(AppModule, new LogService());

  // or, if you only want to print Nest's warnings and errors
  await CommandFactory.run(AppModule, ['warn', 'error']);
}

bootstrap();
```

__HTML_TAG_48____HTML_TAG_49__Expand if you're using Vitest__HTML_TAG_50__

```ts
import { Command, CommandRunner, Option } from 'nest-commander';
import { LogService } from './log.service';

interface BasicCommandOptions {
  string?: string;
  boolean?: boolean;
  number?: number;
}

@Command({ name: 'basic', description: 'A parameter parse' })
export class BasicCommand extends CommandRunner {
  constructor(private readonly logService: LogService) {
    super()
  }

  async run(
    passedParam: string[],
    options?: BasicCommandOptions,
  ): Promise<void> {
    if (options?.boolean !== undefined && options?.boolean !== null) {
      this.runWithBoolean(passedParam, options.boolean);
    } else if (options?.number) {
      this.runWithNumber(passedParam, options.number);
    } else if (options?.string) {
      this.runWithString(passedParam, options.string);
    } else {
      this.runWithNone(passedParam);
    }
  }

  @Option({
    flags: '-n, --number [number]',
    description: 'A basic number parser',
  })
  parseNumber(val: string): number {
    return Number(val);
  }

  @Option({
    flags: '-s, --string [string]',
    description: 'A string return',
  })
  parseString(val: string): string {
    return val;
  }

  @Option({
    flags: '-b, --boolean [boolean]',
    description: 'A boolean parser',
  })
  parseBoolean(val: string): boolean {
    return JSON.parse(val);
  }

  runWithString(param: string[], option: string): void {
    this.logService.log({ param, string: option });
  }

  runWithNumber(param: string[], option: number): void {
    this.logService.log({ param, number: option });
  }

  runWithBoolean(param: string[], option: boolean): void {
    this.logService.log({ param, boolean: option });
  }

  runWithNone(param: string[]): void {
    this.logService.log({ param });
  }
}
```

__HTML_TAG_51__

__HTML_TAG_52____HTML_TAG_53__Expand if you're using Sinon__HTML_TAG_54__

```ts
@Module({
  providers: [LogService, BasicCommand],
})
export class AppModule {}
```

__HTML_TAG_55__

#### Set up type definitions

在项目根目录创建 `name`：

```ts
async function bootstrap() {
  await CommandFactory.run(AppModule);
}

bootstrap();
```

#### Create a sample service

这份指南使用一个简单的 `@Option()`，它有两个依赖项：

__CODE_BLOCK_6__
__CODE_BLOCK_7__

#### Write a unit test

使用 `NestFactory` 创建孤立测试，所有依赖项模拟：

__CODE_BLOCK_8__

`listen` 分析构造函数，并为所有依赖项创建了类型化的模拟。
`nest-commander` 类型提供了 IntelliSense 支持的模拟配置。

#### Pre-compile mock configuration

使用 `CommandFactory` 在编译前配置模拟行为：

__CODE_BLOCK_9__

`static` 参数对应于安装的 doubles 适配器（Jest：`run`，Vitest：`CommandFactory`，Sinon：`run`）。

#### Testing with real dependencies

使用 `['error']` 和 `CommandFactory` 使用真实实现的依赖项：

__CODE_BLOCK_10__

`NestFactory` 实例化 `app.close()`，使用真实实现的依赖项，同时其他依赖项模拟。

#### Token-based dependencies

Suites 处理自定义注入令牌（字符串或符号）：

__CODE_BLOCK_11__

访问基于令牌的依赖项：

__CODE_BLOCK_12__

#### Using mock() and stub() directly

对于那些 prefers direct control without `run`，doubles 适配器包提供了 `.catch()` 和 `bootstrap()` 函数：

__CODE_BLOCK_13__

`nest-commander` 创建了类型化的模拟对象，`CommandFactory` 包装了原始模拟库（Jest 在这个例子中）的方法。

> info **Hint** `@nestjs/testing` 函数是 `overrideProvider` 函数的替代解决方案，来自 `compile()`。这两个函数都创建了类型化的模拟对象。见 __LINK_60__ 章节关于 `basic` 的更多信息。

#### Summary

**Use `-n` for:**
- 验证模块配置和提供者 wiring
- 测试装饰器、守卫、拦截器和管道
- 验证依赖项注入跨模块
- 测试完整的应用程序上下文中 middleware

**Use Suites for:**
- 快速单元测试，聚焦于业务逻辑
- 自动模拟生成多个依赖项
- 类型安全的测试双， IntelliSense 支持

根据用途组织测试：使用 Suites 进行单元测试，验证单个服务行为，使用 `-s` 进行集成测试，验证模块配置。

更多信息：
- __LINK_61__
- __LINK_62__
- __LINK_63__