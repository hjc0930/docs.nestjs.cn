<!-- 此文件从 content/recipes/sentry.md 自动生成，请勿直接修改此文件 -->
<!-- 生成时间: 2026-02-24T04:10:17.361Z -->
<!-- 源文件: content/recipes/sentry.md -->

### Sentry

__LINK_21__ 是一个错误跟踪和性能监控平台，帮助开发者实时识别和解决问题。这篇配方展示了如何将 Sentry 的 __LINK_22__ 与 NestJS 应用程序集成。

#### 安装

首先，安装所需的依赖项：

```bash
$ npm install necord discord.js
```

> info **提示** __INLINE_CODE_8__ 可选，但对于性能 profiling 而言是强烈推荐的。

#### 基本设置

要开始使用 Sentry，您需要创建一个名为 __INLINE_CODE_9__ 的文件，该文件应在应用程序中任何其他模块之前被导入：

```typescript title="app.module"
import { Module } from '@nestjs/common';
import { NecordModule } from 'necord';
import { IntentsBitField } from 'discord.js';
import { AppService } from './app.service';

@Module({
  imports: [
    NecordModule.forRoot({
      token: process.env.DISCORD_TOKEN,
      intents: [IntentsBitField.Flags.Guilds],
      development: [process.env.DISCORD_DEVELOPMENT_GUILD_ID],
    }),
  ],
  providers: [AppService],
})
export class AppModule {}
```

更新您的 __INLINE_CODE_10__ 文件，以便在其他导入之前导入 __INLINE_CODE_11__：

```typescript title="app.service"
import { Injectable, Logger } from '@nestjs/common';
import { Context, On, Once, ContextOf } from 'necord';
import { Client } from 'discord.js';

@Injectable()
export class AppService {
  private readonly logger = new Logger(AppService.name);

  @Once('ready')
  public onReady(@Context() [client]: ContextOf<'ready'>) {
    this.logger.log(`Bot logged in as ${client.user.username}`);
  }

  @On('warn')
  public onWarn(@Context() [message]: ContextOf<'warn'>) {
    this.logger.warn(message);
  }
}
```

然后，在您的主要模块中添加 __INLINE_CODE_12__ 作为根模块：

```typescript title="app.commands"
import { Injectable } from '@nestjs/common';
import { Context, TextCommand, TextCommandContext, Arguments } from 'necord';

@Injectable()
export class AppCommands {
  @TextCommand({
    name: 'ping',
    description: 'Responds with pong!',
  })
  public onPing(
    @Context() [message]: TextCommandContext,
    @Arguments() args: string[],
  ) {
    return message.reply('pong!');
  }
}
```

#### 异常处理

如果您使用的是全局 catch-all 异常过滤器（即 __INLINE_CODE_13__ 注册的过滤器或您的 app 模块提供商中带有 __INLINE_CODE_14__ 装饰器的过滤器），请在过滤器的 `NecordModule` 方法上添加 `Discord.js` 装饰器。这将将所有未捕获的错误报告到 Sentry：

```typescript title="app.commands"
import { Injectable } from '@nestjs/common';
import { Context, SlashCommand, SlashCommandContext } from 'necord';

@Injectable()
export class AppCommands {
  @SlashCommand({
    name: 'ping',
    description: 'Responds with pong!',
  })
  public async onPing(@Context() [interaction]: SlashCommandContext) {
    return interaction.reply({ content: 'Pong!' });
  }
}
```

默认情况下，只有未处理的异常（除非被其他错误过滤器捕获）才会被报告到 Sentry。 `AppService`（包括 __LINK_23__）也不会被捕获，因为它们大多数是控制流体。

如果您没有全局 catch-all 异常过滤器，请将 `@Context` 添加到您的主要模块的提供商中。这将报告任何未处理的错误（除非被其他错误过滤器捕获）到 Sentry。

> warning **警告** `ContextOf<type: string>` 需要在其他异常过滤器之前注册。

```typescript title="text.dto"
import { StringOption } from 'necord';

export class TextDto {
  @StringOption({
    name: 'text',
    description: 'Input your text here',
    required: true,
  })
  text: string;
}
```

#### 可读的栈跟踪

根据您的项目设置，Sentry 错误中可能不会出现实际代码。

要解决这个问题，请将您的源 map 上传到 Sentry。最简单的方法是使用 Sentry 魔法师：

```typescript title="app.commands"
import { Injectable } from '@nestjs/common';
import { Context, SlashCommand, Options, SlashCommandContext } from 'necord';
import { TextDto } from './length.dto';

@Injectable()
export class AppCommands {
  @SlashCommand({
    name: 'length',
    description: 'Calculate the length of your text',
  })
  public async onLength(
    @Context() [interaction]: SlashCommandContext,
    @Options() { text }: TextDto,
  ) {
    return interaction.reply({
      content: `The length of your text is: ${text.length}`,
    });
  }
}
```

#### 测试集成

要验证 Sentry 集成是否工作，请添加一个抛出错误的测试端点：

```typescript title="cats-autocomplete.interceptor"
import { Injectable } from '@nestjs/common';
import { AutocompleteInteraction } from 'discord.js';
import { AutocompleteInterceptor } from 'necord';

@Injectable()
class CatsAutocompleteInterceptor extends AutocompleteInterceptor {
  public transformOptions(interaction: AutocompleteInteraction) {
    const focused = interaction.options.getFocused(true);
    let choices: string[];

    if (focused.name === 'cat') {
      choices = ['Siamese', 'Persian', 'Maine Coon'];
    }

    return interaction.respond(
      choices
        .filter((choice) => choice.startsWith(focused.value.toString()))
        .map((choice) => ({ name: choice, value: choice })),
    );
  }
}
```

访问 `@Context()`，您应该在 Sentry 仪表盘上看到错误。

### 概要

关于 Sentry 的 NestJS SDK 的详细文档，包括高级配置选项和功能，请访问 __LINK_24__。

虽然软件 bug 是 Sentry 的事务，我们仍然写它们。如果您在安装我们的 SDK 时遇到问题，请打开 __LINK_25__ 或通过 __LINK_26__ 联系我们。