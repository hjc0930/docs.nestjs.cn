<!-- 此文件从 content/microservices/mqtt.md 自动生成，请勿直接修改此文件 -->
<!-- 生成时间: 2026-02-27T04:05:25.109Z -->
<!-- 源文件: content/microservices/mqtt.md -->

### MQTT

__LINK_79__ (Message Queuing Telemetry Transport) 是一个开源、轻量级的消息协议，旨在实现低延迟。该协议提供了一个可扩展、低成本的方式来连接设备使用发布/订阅模型。一个基于 MQTT 的通信系统由发布服务器、Broker 和一个或多个客户端组成。它是为受限设备和低带宽、高延迟或不稳定的网络设计的。

#### 安装

要开始构建 MQTT 基于的微服务，首先安装所需的包：

```typescript
import { ApolloServerPlugin, GraphQLRequestListener } from '@apollo/server';
import { Plugin } from '@nestjs/apollo';

@Plugin()
export class LoggingPlugin implements ApolloServerPlugin {
  async requestDidStart(): Promise<GraphQLRequestListener<any>> {
    console.log('Request started');
    return {
      async willSendResponse() {
        console.log('Will send response');
      },
    };
  }
}
```

#### 概述

要使用 MQTT 传输器，传递以下选项对象到 __INLINE_CODE_17__ 方法：

```typescript
@Module({
  providers: [LoggingPlugin],
})
export class CommonModule {}
```

> info **提示** __INLINE_CODE_18__ 枚举来自 __INLINE_CODE_19__ 包。

#### 选项

__INLINE_CODE_20__ 对象特定于选择的传输器。__HTML_TAG_71__MQTT__HTML_TAG_72__ 传输器暴露了描述在 __LINK_80__ 中的属性。

#### 客户端

像其他微服务传输器一样，您有 __HTML_TAG_73__several options__HTML_TAG_74__ 创建一个 MQTT __INLINE_CODE_21__ 实例。

创建实例的方法之一是使用 __INLINE_CODE_22__。要创建一个客户端实例，并使用 __INLINE_CODE_23__ 方法传递一个选项对象，具有与 __INLINE_CODE_25__ 方法相同的属性，以及一个 __INLINE_CODE_26__ 属性用于作为注入令牌。了解更多关于 __INLINE_CODE_27__ __HTML_TAG_75__这里__HTML_TAG_76__。

```typescript
GraphQLModule.forRoot({
  // ...
  plugins: [ApolloServerOperationRegistry({ /* options */})]
}),
```

其他创建客户端的选项（包括 __INLINE_CODE_28__ 或 __INLINE_CODE_29__）也可以使用。您可以在 __HTML_TAG_77__这里__HTML_TAG_78__ 了解它们。

#### 上下文

在更复杂的场景中，您可能需要访问 incoming 请求的额外信息。当使用 MQTT 传输器时，您可以访问 __INLINE_CODE_30__ 对象。

```typescript
GraphQLModule.forRoot({
  driver: MercuriusDriver,
  // ...
  plugins: [
    {
      plugin: cache,
      options: {
        ttl: 10,
        policy: {
          Query: {
            add: true
          }
        }
      },
    }
  ]
}),
```

> info **提示** __INLINE_CODE_31__, __INLINE_CODE_32__ 和 __INLINE_CODE_33__ 来自 __INLINE_CODE_34__ 包。

要访问原始 mqtt __LINK_81__，使用 __INLINE_CODE_35__ 方法，例如：

__CODE_BLOCK_4__

#### wildcard

订阅可能是对一个明确的主题或包括通配符的。有两个通配符可用：__INLINE_CODE_37__ 和 __INLINE_CODE_38__。__INLINE_CODE_39__ 是一个单级通配符，而 __INLINE_CODE_40__ 是一个多级通配符，涵盖了许多主题级别。

__CODE_BLOCK_5__

#### 服务质量 (QoS)

使用 __INLINE_CODE_41__ 或 __INLINE_CODE_42__ 装饰器创建的任何订阅将使用 QoS 0。如果需要更高的 QoS，可以在建立连接时使用 __INLINE_CODE_43__ 块设置，例如：

__CODE_BLOCK_6__

#### per-pattern QoS

您可以在模式装饰器的 __INLINE_CODE_45__ 字段中override MQTT 订阅 QoS。如未指定，使用全局 __INLINE_CODE_46__ 值。

__CODE_BLOCK_7__

> info **提示** per-pattern QoS 配置不影响现有行为。如 __INLINE_CODE_47__ 未指定，订阅将使用全局 __INLINE_CODE_48__ 值。

#### 记录生成器

要配置消息选项（调整 QoS 等级、设置 Retain 或 DUP 标志或添加 payload 到 payload），您可以使用 __INLINE_CODE_49__ 类。例如，设置 __INLINE_CODE_50__ 到 __INLINE_CODE_51__ 使用 __INLINE_CODE_52__ 方法，例如：

__CODE_BLOCK_8__

> info **提示** __INLINE_CODE_53__ 类来自 __INLINE_CODE_54__ 包。

您可以在服务器端读取这些选项，通过访问 __INLINE_CODE_55__。

__CODE_BLOCK_9__

在某些情况下，您可能想要配置用户属性来多个请求，您可以将这些选项传递到 __INLINE_CODE_56__。

__CODE_BLOCK_10__

#### 实例状态更新

要获取实时更新连接和底层驱动程序实例的状态，您可以订阅 __INLINE_CODE_57__ 流。这个流提供了特定于选择驱动程序的状态更新。对于 MQTT 驱动程序，__INLINE_CODE_58__ 流发射 __INLINE_CODE_59__, __INLINE_CODE_60__, __INLINE_CODE_61__, 和 __INLINE_CODE_62__ 事件