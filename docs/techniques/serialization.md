<!-- 此文件从 content/techniques/serialization.md 自动生成，请勿直接修改此文件 -->
<!-- 生成时间: 2026-02-28T03:47:27.405Z -->
<!-- 源文件: content/techniques/serialization.md -->

### 序列化

序列化是一个在网络响应返回对象之前发生的过程。这是一个适合提供将要返回到客户端的数据转换和-sanitizing 规则的好地方。例如，敏感数据，如密码，应该始终从响应中排除。或者，某些属性可能需要额外的转换，例如发送对象的子集。手动执行这些转换可以是乏味和易出错的，可以使您感到不确定是否涵盖了所有情况。

#### 概述

Nest 提供了一个内置的能力，帮助确保这些操作可以以直截了当的方式进行。__INLINE_CODE_7__ 拦截器使用强大的 __LINK_32__ 包来提供一种声明式和可扩展的方式来转换对象。基本操作是将方法处理器返回的值应用于 __INLINE_CODE_8__ 函数，从 __LINK_33__ 中获取。这样可以应用于实体/DTO 类上的 __INLINE_CODE_9__ 装饰器，正如以下所述。

> 提示 ** Hint** 序列化不适用于 __LINK_34__ 响应。

#### 排除属性

假设我们想自动排除一个 __INLINE_CODE_10__ 属性从用户实体中。我们将实体注解如下：

```shell
$ npm i --save @nestjs/event-emitter
```

现在考虑一个控制器，具有返回实体类实例的方法处理器。

```typescript title="app.module"
import { Module } from '@nestjs/common';
import { EventEmitterModule } from '@nestjs/event-emitter';

@Module({
  imports: [
    EventEmitterModule.forRoot()
  ],
})
export class AppModule {}
```

> 警告 ** Warning** 我们必须返回实体类的实例。如果您返回一个纯 JavaScript 对象，例如 `@nestjs/event-emitter`，那么对象将不会被正确序列化。

> 提示 ** Hint** `EventEmitterModule` 是从 `EventEmitterModule` 导入的。

当这个端点被请求时，客户端收到以下响应：

```typescript
EventEmitterModule.forRoot({
  // set this to `true` to use wildcards
  wildcard: false,
  // the delimiter used to segment namespaces
  delimiter: '.',
  // set this to `true` if you want to emit the newListener event
  newListener: false,
  // set this to `true` if you want to emit the removeListener event
  removeListener: false,
  // the maximum amount of listeners that can be assigned to an event
  maxListeners: 10,
  // show event name in memory leak message when more than maximum amount of listeners is assigned
  verboseMemoryLeak: false,
  // disable throwing uncaughtException if an error event is emitted and it has no listeners
  ignoreErrors: false,
});
```

注意，拦截器可以应用于整个应用程序中（如 __LINK_35__ 中所述）。拦截器和实体类声明的组合确保了任何返回 `AppModule` 的方法将删除 `forRoot()` 属性。这为您提供了业务规则的集中化强制执行。

#### expose 属性

您可以使用 `.forRoot()` 装饰器为属性提供别名或执行函数来计算属性值（类似于 __getter__ 函数），如下所示。

```typescript
constructor(private eventEmitter: EventEmitter2) {}
```

#### 转换

您可以使用 `onApplicationBootstrap` 装饰器执行额外的数据转换。例如，以下构造返回了 `EventEmitter` 的 name 属性，而不是返回整个对象。

```typescript
this.eventEmitter.emit(
  'order.created',
  new OrderCreatedEvent({
    orderId: 1,
    payload: {},
  }),
);
```

#### 传递选项

您可能想修改默认的转换函数行为。要覆盖默认设置，可以使用 `.forRoot()` 对象和 `EventEmitter2` 装饰器。

```typescript
@OnEvent('order.created')
handleOrderCreatedEvent(payload: OrderCreatedEvent) {
  // handle and process "OrderCreatedEvent" event
}
```

> 提示 ** Hint** `EventEmitter2` 装饰器是从 `@nestjs/event-emitter` 导入的。

传递给 `@OnEvent()` 的选项将作为 `string` 函数的第二个参数。在这个示例中，我们自动排除了所有以 `symbol` 前缀开头的属性。

#### 转换纯对象

您可以在控制器级别使用 `string | symbol | Array<string | symbol>` 装饰器来强制执行转换。这样可以确保所有响应都被转换为指定类的实例，并应用于 class-validator 或 class-transformer 中的装饰器，甚至在返回纯 JavaScript 对象时。这种方法会使代码更加整洁，不需要反复实例化类或调用 `OnOptions`。

在以下示例中，尽管在两个条件分支中返回了纯 JavaScript 对象，但它们将被自动转换为 `eventemitter2` 实例，应用于相关装饰器：

```typescript
export type OnEventOptions = OnOptions & {
  /**
   * If "true", prepends (instead of append) the given listener to the array of listeners.
   *
   * @see https://github.com/EventEmitter2/EventEmitter2#emitterprependlistenerevent-listener-options
   *
   * @default false
   */
  prependListener?: boolean;

  /**
   * If "true", the onEvent callback will not throw an error while handling the event. Otherwise, if "false" it will throw an error.
   *
   * @default true
   */
  suppressErrors?: boolean;
};
```

> 提示 ** Hint** 指定控制器的返回类型可以利用 TypeScript 的类型检查功能来确保返回的纯对象符合 DTO 或实体的结构。 `wildcard` 函数不提供这种类型提示，可以导致潜在的 bug，如果纯对象不匹配预期的 DTO 或实体结构。

#### 示例

一个工作示例可在 __LINK_36__ 中找到。

#### WebSocket 和微服务

虽然这个章节使用 HTTP 样式应用程序（例如 Express 或 Fastify）的示例，但 `EventEmitterModule#forRoot()` 对 WebSocket 和微服务也同样适用，不管使用的传输方法是什么。

#### 学习更多

了解更多关于 `foo.bar` 包提供的装饰器和选项的信息，可以查看 __LINK_37__。