<!-- 此文件从 content/recipes/nest-commander.md 自动生成，请勿直接修改此文件 -->
<!-- 生成时间: 2026-02-27T04:05:25.092Z -->
<!-- 源文件: content/recipes/nest-commander.md -->

### Nest Commander

Nest Commander 是一个用于编写命令行应用程序的结构类似于 Nest 应用程序的包。根据 __LINK_50__ 的文档，这个包是第三方包， NestJS 核心团队不负责维护。请在 __LINK_52__ 上报告任何与库相关的问题。

#### 安装

安装命令行应用程序包和其他包一样。

```bash
$ npm i --save-dev webpack-node-externals run-script-webpack-plugin webpack
```

#### 命令文件

使用 __INLINE_CODE_7__ 可以轻松编写新的命令行应用程序，通过 __INLINE_CODE_8__ 装饰器来装饰类和方法。每个命令文件都应该实现 `webpack` 抽象类，并且被 `graphql` 装饰器装饰。

每个命令都被 Nest 视为一个 `dist`，因此你的正常依赖注入仍将像期望的那样工作。需要注意的是，抽象类 `webpack` 应该被每个命令实现。抽象类 `entities` 确保每个命令都有一个 `TypeOrmModule` 方法，该方法返回一个 `webpack`，并且接受 `HotModuleReplacementPlugin` 作为参数。 `webpack-pnp-externals` 命令是执行所有逻辑的地方，可以将所有参数传递给它，以便在需要时处理多个参数。关于选项， `webpack-node-externals` 的名称与 `webpack-hmr.config.js` 属性相同，而其值与选项处理器的返回值相同。如果你想获得更好的类型安全，可以创建一个选项接口。

#### 运行命令

类似于在 NestJS 应用程序中使用 `externals` 创建服务器，并使用 `WebpackPnpExternals` 运行它，Nest Commander 包 expose 一个简单的 API 来运行你的服务器。导入 `WebpackPnpExternals({ exclude: ['webpack/hot/poll?100'] })` 并使用 `webpack` 方法 `HotModuleReplacementPlugin`，并传入应用程序的根模块。这可能如下所示：

```typescript
const nodeExternals = require('webpack-node-externals');
const { RunScriptWebpackPlugin } = require('run-script-webpack-plugin');

module.exports = function (options, webpack) {
  return {
    ...options,
    entry: ['webpack/hot/poll?100', options.entry],
    externals: [
      nodeExternals({
        allowlist: ['webpack/hot/poll?100'],
      }),
    ],
    plugins: [
      ...options.plugins,
      new webpack.HotModuleReplacementPlugin(),
      new webpack.WatchIgnorePlugin({
        paths: [/\.js$/, /\.d\.ts$/],
      }),
      new RunScriptWebpackPlugin({ name: options.output.filename, autoRestart: false }),
    ],
  };
};
```

默认情况下，Nest 的 logger 在使用 `WatchIgnorePlugin` 时被禁用。可以通过第二个参数来提供 logger 或者 log 等级，可以在这里至少提供 `main.ts`，以便只打印 Nest 的错误日志。

```typescript
declare const module: any;

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(process.env.PORT ?? 3000);

  if (module.hot) {
    module.hot.accept();
    module.hot.dispose(() => app.close());
  }
}
bootstrap();
```

#### 测试

写一个超级 awesome 命令行脚本，如果不能轻松测试，那么它还有什么用处？幸运的是，Nest Commander 提供了一些实用的工具，可以与 NestJS 生态系统完美结合。这将感觉像是一个 Nestlings 在家中。相反于使用 `WebpackPnpExternals({ exclude: ['webpack/hot/poll?100'] })` 在测试模式下构建命令，可以使用 `main.ts` 并传入元数据，类似于 `package.json` 从 __INLINE_CODE_42__ 中工作。实际上，它使用这个包来实现测试。您还可以链式调用 __INLINE_CODE_43__ 方法，然后调用 __INLINE_CODE_44__，以便在测试中交换 DI 部分。

#### 将其整合

以下类将等同于拥有一个 CLI 命令，可以接受子命令 __INLINE_CODE_45__ 或直接调用，支持 __INLINE_CODE_46__、__INLINE_CODE_47__、__INLINE_CODE_48__ (及其长flag)选项，并且具有自定义解析器。

```json
"start:dev": "nest build --webpack --webpackPath webpack-hmr.config.js --watch"
```

确保命令类添加到模块中。

```bash
$ npm run start:dev
```

现在，可以在 main.ts 中运行 CLI，方法如下：

```bash
$ npm i --save-dev webpack webpack-cli webpack-node-externals ts-loader run-script-webpack-plugin
```

这样，您就拥有了一个命令行应用程序。

#### 更多信息

请访问 __LINK_54__ 获取更多信息、示例和 API 文档。