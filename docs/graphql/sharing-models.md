<!-- 此文件从 content/graphql/sharing-models.md 自动生成，请勿直接修改此文件 -->
<!-- 生成时间: 2026-02-27T04:05:25.191Z -->
<!-- 源文件: content/graphql/sharing-models.md -->

### 分享模型

> 警告 **警告** 本章仅适用于代码优先方法。

使用 TypeScript 作为项目的后端之一大优点是可以在使用 TypeScript 的前端应用程序中重用相同的模型，通过使用公共的 TypeScript 包。

但是，使用代码优先方法创建的模型被大量装饰了 GraphQL 相关的装饰器。这些装饰器在前端中是无关紧要的，会对性能产生负面影响。

#### 使用模型 shim

来解决这个问题，NestJS 提供了一个“ shim”，可以将原始装饰器替换为无关代码，使用 __INLINE_CODE_1__ (或相似) 配置。
要使用这个 shim，配置一个别名.between __INLINE_CODE_2__ 包和 shim。

例如，对于 webpack，可以这样解决：

```typescript
GraphQLModule.forRoot({
  buildSchemaOptions: {
    dateScalarMode: 'timestamp',
  }
}),
```

> 提示 **提示** __LINK_3__ 包有一个相似 shim，可以在 __LINK_4__ 找到。

Note:

* __INLINE_CODE_1__ is  replaced with 
* __INLINE_CODE_2__ is  replaced with 
* ```typescript
GraphQLModule.forRoot({
  buildSchemaOptions: {
    dateScalarMode: 'timestamp',
  }
}),
``` is  replaced with 
* __LINK_3__ is  replaced with 
* __LINK_4__ is  replaced with