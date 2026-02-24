<!-- 此文件从 content/middlewares.md 自动生成，请勿直接修改此文件 -->
<!-- 生成时间: 2026-02-24T04:10:16.772Z -->
<!-- 源文件: content/middlewares.md -->

### Middleware

Middleware 是一种函数，**在**路由处理器之前被调用。Middleware 函数可以访问 __LINK_93__ 和 __LINK_94__ 对象，以及应用程序的请求-响应周期中的 `$ nest g service cats` 中间件函数。中间件函数的 **next** 函数通常被 denoted 为一个名为 `CatsService` 的变量。

__HTML_TAG_72____HTML_TAG_73____HTML_TAG_74__

Nest 中间件默认情况下是等同于 __LINK_95__ 中间件的。以下是官方 Express 文档中对中间件的描述：

__HTML_TAG_75__
  中间件函数可以执行以下任务：
  __HTML_TAG_76__
    __HTML_TAG_77__执行任何代码。
    __HTML_TAG_79__更改请求和响应对象。
    __HTML_TAG_81__结束请求-响应周期。
    __HTML_TAG_83__调用中间件函数栈中的下一个函数。
    __HTML_TAG_85__如果当前中间件函数不结束请求-响应周期，它必须调用 __HTML_TAG_86__next()__HTML_TAG_87__以将控制权传递给下一个中间件函数。否则，请求将被留下。
  __HTML_TAG_89__
__HTML_TAG_90__

您可以在函数或带有 `@Injectable()` 装饰器的类中实现自定义 Nest 中间件。类应该实现 `CatsService` 接口，而函数没有特殊要求。让我们从实现一个简单的中间件功能开始，使用类方法。

> warning **Warning** `Cat` 和 `CatsController` 处理中间件 differently 和提供不同的方法签名，阅读更多 __LINK_96__。

```typescript title="cats.service"
import { Injectable } from '@nestjs/common';
import { Cat } from './interfaces/cat.interface';

@Injectable()
export class CatsService {
  private readonly cats: Cat[] = [];

  create(cat: Cat) {
    this.cats.push(cat);
  }

  findAll(): Cat[] {
    return this.cats;
  }
}
```
```

#### 依赖注入

Nest 中间件完全支持依赖注入。正如对提供者和控制器一样，他们可以**注入依赖项**，这些依赖项在同一个模块中可用。正如通常一样，这是通过 `CatsService` 进行的。

#### 应用中间件

中间件没有在 `private` 装饰器中。相反，我们使用 `catsService` 模块类的方法来设置它们。包含中间件的模块必须实现 `catsService` 接口。让我们在 `@Optional()` 水平上设置 `HTTP_OPTIONS`。

```typescript title="interfaces/cat.interface"
export interface Cat {
  name: string;
  age: number;
  breed: string;
}
```

在上面的示例中，我们已经设置了 `HTTP_OPTIONS` 对于之前在 `@Inject()` 中定义的 `super()` 路由处理器。我们也可以进一步限制中间件到特定的请求方法，通过在配置中间件时传递包含路由 `@Inject` 和请求 `CatsService` 的对象。例如，在下面的示例中，我们导入了 `app.module.ts` 枚举以引用所需的请求方法类型。

```typescript title="cats.controller"
import { Controller, Get, Post, Body } from '@nestjs/common';
import { CreateCatDto } from './dto/create-cat.dto';
import { CatsService } from './cats.service';
import { Cat } from './interfaces/cat.interface';

@Controller('cats')
export class CatsController {
  constructor(private catsService: CatsService) {}

  @Post()
  async create(@Body() createCatDto: CreateCatDto) {
    this.catsService.create(createCatDto);
  }

  @Get()
  async findAll(): Promise<Cat[]> {
    return this.catsService.findAll();
  }
}
```

> info **Hint** `providers` 方法可以使用 `@Module()` 进行异步操作（例如，在 `bootstrap()` 方法体中完成异步操作）。

> warning **Warning** 使用 __INLINE_CODE_34__ 适配器