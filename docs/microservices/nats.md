<!-- 此文件从 content/microservices/nats.md 自动生成，请勿直接修改此文件 -->
<!-- 生成时间: 2026-02-24T02:57:57.101Z -->
<!-- 源文件: content/microservices/nats.md -->

Here is the translation of the provided English technical documentation to Chinese:

### NATS

__LINK_95__是云原生应用程序、IoT 消息和微服务架构中的一种简单、安全和高性能的开源消息系统。NATS 服务器是使用 Go 语言编写的，但是可以使用 dozens of 主要编程语言的客户端库与服务器交互。NATS 支持 both At Most Once 和 At Least Once 发送。它可以在大型服务器、云实例、边缘网关和 Internet of Things 设备上运行。

#### 安装

要开始构建基于 NATS 的微服务，首先安装所需的包：

```typescript
resolve: { // see: https://webpack.js.org/configuration/resolve/
  alias: {
      "@nestjs/graphql": path.resolve(__dirname, "../node_modules/@nestjs/graphql/dist/extra/graphql-model-shim")
  }
}
```

#### 概述

要使用 NATS 运输器，传递以下选项对象到 __INLINE_CODE_15__ 方法：

__CODE_BLOCK_1__

>提示 ** Hint** __INLINE_CODE_16__ 枚举来自 __INLINE_CODE_17__ 包。

#### 选项

__INLINE_CODE_18__ 对象特定于选择的运输器。__HTML_TAG_55__NATS__HTML_TAG_56__ 运输器 exposing the properties described __LINK_96__ as well as the following properties：

__HTML_TAG_57__
  __HTML_TAG_58__
    __HTML_TAG_59____HTML_TAG_60__queue__HTML_TAG_61____HTML_TAG_62__
    __HTML_TAG_63__ Queue that your server should subscribe to (leave __HTML_TAG_64__undefined__HTML_TAG_65__ to ignore this setting). Read more about NATS queue groups __HTML_TAG_66__below__HTML_TAG_67__.
    __HTML_TAG_68__ 
  __HTML_TAG_69__
  __HTML_TAG_70__
    __HTML_TAG_71____HTML_TAG_72__gracefulShutdown__HTML_TAG_73____HTML_TAG_74__
    __HTML_TAG_75__ Enables graceful shutdown. When enabled, the server first unsubscribes from all channels before closing the connection. Default is __HTML_TAG_76__false__HTML_TAG_77__.
  __HTML_TAG_78__
  __HTML_TAG_79__
    __HTML_TAG_80____HTML_TAG_81__gracePeriod__HTML_TAG_82____HTML_TAG_83__
    __HTML_TAG_84__ Time in milliseconds to wait for the server after unsubscribing from all channels. Default is __HTML_TAG_85__10000__HTML_TAG_86__ ms.
  __HTML_TAG_87__
__HTML_TAG_88__

#### 客户端

像其他微服务运输器一样，您有 __HTML_TAG_89__ several options __HTML_TAG_90__ for creating a NATS __INLINE_CODE_19__ instance.

One method for creating an instance is to use the __INLINE_CODE_20__. To create a client instance with the __INLINE_CODE_21__, import it and use the __INLINE_CODE_22__ method to pass an options object with the same properties shown above in the __INLINE_CODE_23__ method, as well as a __INLINE_CODE_24__ property to be used as the injection token. Read more about __INLINE_CODE_25__ __HTML_TAG_91__here__HTML_TAG_92__.

__CODE_BLOCK_2__

Other options to create a client (either __INLINE_CODE_26__ or __INLINE_CODE_27__) can be used as well. You can read about them __HTML_TAG_93__here__HTML_TAG_94__.

#### 请求-响应

对于 __LINK_97__ 请求-响应 消息样式，NATS 运输器不使用 NATS 内置 __LINK_98__ 机制。 Instead, a "