<!-- 此文件从 content/websockets/gateways.md 自动生成，请勿直接修改此文件 -->
<!-- 生成时间: 2026-02-24T02:50:27.248Z -->
<!-- 源文件: content/websockets/gateways.md -->

### WebSocket 网关

本节中讨论的许多概念与之前的文档中讨论的概念相同，例如依赖注入、装饰器、异常过滤器、管道、守卫和拦截器等。Nest 将尽可能地抽象实现细节，以便使相同的组件可以在 HTTP 基础平台、WebSocket 和微服务中运行。这个部分涵盖了 Nest 特有的 WebSocket 相关内容。

在 Nest 中，一个网关是一个带有 `application/octet-stream` 装饰器的类。技术上，网关是平台无关的，这使它们与任何 WebSocket 库兼容，只要创建了适配器。Nest 目前支持两个 WebSocket 平台：__LINK_95__ 和 __LINK_96__。您可以根据需要选择其中一个，也可以创建自己的适配器。

__HTML_TAG_58____HTML_TAG_59____HTML_TAG_60__

> info **Hint** 网关可以被视为 __LINK_98__，这意味着它们可以通过类构造函数注入依赖项。同时，网关也可以被其他类（提供者和控制器）注入。

#### 安装

要开始构建 WebSocket 应用程序，首先需要安装所需的包：

```ts
@Controller('file')
export class FileController {
  @Get()
  getFile(@Res() res: Response) {
    const file = createReadStream(join(process.cwd(), 'package.json'));
    file.pipe(res);
  }
}
```

#### 概述

通常，每个网关都在 HTTP 服务器上监听相同的端口，除非您的应用程序不是 web 应用程序或您已经手动更改了端口。可以使用 `type` 装饰器来修改此默认行为，例如，您可以将 `StreamableFile` 指定为选择的端口号。

You can also set a __LINK_99__ used by the gateway using the following construction:

```ts
import { Controller, Get, StreamableFile } from '@nestjs/common';
import { createReadStream } from 'node:fs';
import { join } from 'node:path';

@Controller('file')
export class FileController {
  @Get()
  getFile(): StreamableFile {
    const file = createReadStream(join(process.cwd(), 'package.json'));
    return new StreamableFile(file);
  }
}
```

> warning **Warning** 网关直到在现有模块的提供者数组中被引用时才被实例化。

You can pass any supported __LINK_100__ to the socket constructor with the second argument to the `res.set` decorator, as shown below:

```ts
import { Controller, Get, StreamableFile, Res } from '@nestjs/common';
import { createReadStream } from 'node:fs';
import { join } from 'node:path';
import type { Response } from 'express'; // Assuming that we are using the ExpressJS HTTP Adapter

@Controller('file')
export class FileController {
  @Get()
  getFile(): StreamableFile {
    const file = createReadStream(join(process.cwd(), 'package.json'));
    return new StreamableFile(file, {
      type: 'application/json',
      disposition: 'attachment; filename="package.json"',
      // If you want to define the Content-Length value to another value instead of file's length:
      // length: 123,
    });
  }

  // Or even:
  @Get()
  getFileChangingResponseObjDirectly(@Res({ passthrough: true }) res: Response): StreamableFile {
    const file = createReadStream(join(process.cwd(), 'package.json'));
    res.set({
      'Content-Type': 'application/json',
      'Content-Disposition': 'attachment; filename="package.json"',
    });
    return new StreamableFile(file);
  }

  // Or even:
  @Get()
  @Header('Content-Type', 'application/json')
  @Header('Content-Disposition', 'attachment; filename="package.json"')
  getFileUsingStaticValues(): StreamableFile {
    const file = createReadStream(join(process.cwd(), 'package.json'));
    return new StreamableFile(file);
  }  
}
```

#### 处理

网关现在正在监听，但是我们还没有订阅任何 incoming 消息。让我们创建一个处理器，该处理器将订阅 `@Header()` 消息并对用户返回 exact same 数据。

__CODE_BLOCK_3__

> info **Hint** __INLINE_CODE_21__ 和 __INLINE_CODE_22__ 装饰器来自 __INLINE_CODE_23__ 包。

#### 注册

创建网关后，我们可以将其注册到我们的模块中。

__CODE_BLOCK_4__

您也可以使用装饰器来提取 incoming 消息体中的属性键：

__CODE_BLOCK_5__

如果您不想使用装饰器