<!-- 此文件从 content/microservices/redis.md 自动生成，请勿直接修改此文件 -->
<!-- 生成时间: 2026-02-25T04:12:09.421Z -->
<!-- 源文件: content/microservices/redis.md -->

### Redis

__LINK_113__transporter 实现了 publish/subscribe 消息传输模型，并利用了 Redis 的 __LINK_114__ 功能。发布的消息将被分配到不同的频道中，不知道哪些订阅者最终将收到消息。每个微服务都可以订阅任意数量的频道。同时，也可以同时订阅多个频道。通过频道传输的消息是**fire-and-forget**，即如果发布的消息没有订阅者interested in it，消息将被删除并且不能恢复。因此，你不能确保消息或事件将被至少一个服务处理。单个消息可以被多个订阅者订阅并接收。

__HTML_TAG_50____HTML_TAG_51____HTML_TAG_52__

#### 安装

要开始构建基于 Redis 的微服务，首先安装所需的包：

```typescript
@UseGuards(AuthGuard)
@MessagePattern({ cmd: 'sum' })
accumulate(data: number[]): number {
  return (data || []).reduce((a, b) => a + b);
}
```

#### 概述

要使用 Redis transporter，请将以下选项对象传递给 __INLINE_CODE_12__ 方法：

__CODE_BLOCK_1__

> 信息**提示** __INLINE_CODE_13__ 枚举来自 __INLINE_CODE_14__ 包。

#### 选项

__INLINE_CODE_15__ 属性特定于选择的 transporter。__HTML_TAG_53__Redis__HTML_TAG_54__ transporter exposing the properties described below。

__HTML_TAG_55__
  __HTML_TAG_56__
    __HTML_TAG_57____HTML_TAG_58__host__HTML_TAG_59____HTML_TAG_60__
    __HTML_TAG_61__Connection url__HTML_TAG_62__
  __HTML_TAG_63__
  __HTML_TAG_64__
    __HTML_TAG_65____HTML_TAG_66__port__HTML_TAG_67____HTML_TAG_68__
    __HTML_TAG_69__Connection port__HTML_TAG_70__
  __HTML_TAG_71__
  __HTML_TAG_72__
    __HTML_TAG_73____HTML_TAG_74__retryAttempts__HTML_TAG_75____HTML_TAG_76__
    __HTML_TAG_77__Number of times to retry message (default: __HTML_TAG_78__0__HTML_TAG_79__)__HTML_TAG_80__
  __HTML_TAG_81__
  __HTML_TAG_82__
    __HTML_TAG_83____HTML_TAG_84__retryDelay__HTML_TAG_85____HTML_TAG_86__
    __HTML_TAG_87__Delay between message retry attempts (ms) (default: __HTML_TAG_88__0__HTML_TAG_89__)__HTML_TAG_90__
  __HTML_TAG_91__
   __HTML_TAG_92__
    __HTML_TAG_93____HTML_TAG_94__wildcards__HTML_TAG_95____HTML_TAG_96__
    __HTML_TAG_97__Enables Redis wildcard subscriptions, instructing transporter to use __HTML_TAG_98__psubscribe__HTML_TAG_99__/__HTML_TAG_100__pmessage__HTML_TAG_101__ under the hood. (default: __HTML_TAG_102__false__HTML_TAG_103__)__HTML_TAG_104__
  __HTML_TAG_105__
__HTML_TAG_106__

所有由官方 __LINK_115__ 客户端支持的属性也被支持。

#### 客户

像其他微服务 transporter 一样，你有 __HTML_TAG_107__several options__HTML_TAG_108__ 创建 Redis __INLINE_CODE_16__ 实例。

一种创建实例的方法是使用 __INLINE_CODE_17__. 创建一个客户端实例，使用 __INLINE_CODE_18__ 方法将选项对象传递给 __INLINE_CODE_12__ 方法，同时使用 __INLINE_CODE_21__ 属性作为注入令牌。更多关于 __INLINE_CODE_22__ __HTML_TAG_109__ 的信息可以在这里找到。

__CODE_BLOCK_2__

其他创建客户端实例的方法（__INLINE_CODE_23__ 或 __INLINE_CODE_24__）也可以使用。更多信息可以在这里找到。

#### 上下文

