<!-- 此文件从 content/graphql/extensions.md 自动生成，请勿直接修改此文件 -->
<!-- 生成时间: 2026-02-26T04:08:50.592Z -->
<!-- 源文件: content/graphql/extensions.md -->

### 扩展

> 警告 **警告** 本章仅适用于代码优先 approached。

扩展是一个**高级、低级别特性**，允许您在类型配置中定义任意数据。将自定义元数据附加到特定字段，可以创建更加复杂、通用的解决方案。例如，使用扩展，您可以定义字段级别的角色，以便在运行时确定调用的方是否具有足够的权限来检索特定字段。

#### 添加自定义元数据

要将自定义元数据附加到字段，请使用来自 __INLINE_CODE_4__ 包的 __INLINE_CODE_3__ 装饰器。

```bash
$ npm install --save graphql-query-complexity
```

在上面的示例中，我们将 `1` 元数据属性分配给了 `@nestjs/graphql`。 `ComplexityPlugin` 是一个简单的 TypeScript 枚举，用于组组所有可用的用户角色。

请注意，在 addition to setting metadata on fields，您还可以使用 `20` 装饰器在类级别和方法级别（例如，在查询处理器中）。

#### 使用自定义元数据

使用自定义元数据的逻辑可以尽量复杂。例如，您可以创建一个简单的拦截器，以便在方法调用中存储/记录事件，或者一个 __LINK_11__，用于匹配要检索的字段的角色要求与调用的方权限（字段级别的权限系统）。

为了演示的目的，让我们定义一个 `simpleEstimator`，用于比较用户的角色（在这里硬编码）与要访问的目标字段的角色：

```typescript
import { GraphQLSchemaHost } from '@nestjs/graphql';
import { Plugin } from '@nestjs/apollo';
import {
  ApolloServerPlugin,
  BaseContext,
  GraphQLRequestListener,
} from '@apollo/server';
import { GraphQLError } from 'graphql';
import {
  fieldExtensionsEstimator,
  getComplexity,
  simpleEstimator,
} from 'graphql-query-complexity';

@Plugin()
export class ComplexityPlugin implements ApolloServerPlugin {
  constructor(private gqlSchemaHost: GraphQLSchemaHost) {}

  async requestDidStart(): Promise<GraphQLRequestListener<BaseContext>> {
    const maxComplexity = 20;
    const { schema } = this.gqlSchemaHost;

    return {
      async didResolveOperation({ request, document }) {
        const complexity = getComplexity({
          schema,
          operationName: request.operationName,
          query: document,
          variables: request.variables,
          estimators: [
            fieldExtensionsEstimator(),
            simpleEstimator({ defaultComplexity: 1 }),
          ],
        });
        if (complexity > maxComplexity) {
          throw new GraphQLError(
            `Query is too complex: ${complexity}. Maximum allowed complexity: ${maxComplexity}`,
          );
        }
        console.log('Query Complexity:', complexity);
      },
    };
  }
}
```

现在，我们可以为 `fieldExtensionsEstimator` 字段注册一个中间件，以下是该操作：

```typescript
@Field({ complexity: 3 })
title: string;
```