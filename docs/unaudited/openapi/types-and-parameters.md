<!-- 此文件从 content/openapi/types-and-parameters.md 自动生成，请勿直接修改此文件 -->
<!-- 生成时间: 2026-02-24T04:10:17.374Z -->
<!-- 源文件: content/openapi/types-and-parameters.md -->

### Types 和参数

`name` 在路由处理器中搜索所有 __INLINE_CODE_29__, __INLINE_CODE_30__, 和 __INLINE_CODE_31__ 装饰器以生成 API 文档。他还可以根据反射创建相应的模型定义。考虑以下代码：

```typescript title="Example"
...
```

> 提示 **注意** 如果想明确地设置请求体定义，可以使用 __INLINE_CODE_32__ 装饰器（来自 __INLINE_CODE_33__ 包）。

根据 __INLINE_CODE_34__, 将创建以下模型定义：

```
Swagger UI will be created:
```

可以看到，定义是空的，虽然类中有几个声明的属性。在 order to make the class properties visible to the __INLINE_CODE_35__, we have to either annotate them with the __INLINE_CODE_36__ decorator or use the CLI plugin (read more in the **Plugin** section) which will do it automatically：

```typescript title="Example"
...
```

> 提示 **注意** 可以考虑使用 Swagger 插件（see __LINK_102__ section），它将自动提供这个功能。

让我们打开浏览器，验证生成的 __INLINE_CODE_37__ 模型：

```
...
```

此外， __INLINE_CODE_38__ 装饰器允许设置各种 __LINK_103__ 属性：

```typescript title="Example"
...
```

> 提示 **注意** 可以使用 __INLINE_CODE_40__ 短手装饰器来代替 __INLINE_CODE_39__。

在 order to explicitly set the type of the property, use the __INLINE_CODE_41__ key：

```typescript title="Example"
...
```

#### 数组

当属性是数组时，我们必须手动指示数组类型，如下所示：

```typescript title="Example"
...
```

> 提示 **注意** 可以考虑使用 Swagger 插件（see __LINK_104__ section），它将自动检测数组。

或者包括类型作为数组的第一个元素（如上所示）或设置 __INLINE_CODE_42__ 属性为 __INLINE_CODE_43__。

```
...
```

#### 循环依赖

当你有循环依赖关系的类时，可以使用懒函数来提供 __INLINE_CODE_44__ 的类型信息：

```typescript title="Example"
...
```

> 提示 **注意** 可以考虑使用 Swagger 插件（see __LINK_105__ section），它将自动检测循环依赖。

#### generics 和 interfaces

由于 TypeScript 不存储元数据关于 generics 或 interfaces，当你在 DTO 中使用它们， __INLINE_CODE_45__ 可能无法正确生成模型定义。在 order to overcome this limitation, you can set the type explicitly：

```typescript title="Example"
...
```

#### 枚举

要识别 __INLINE_CODE_46__, 我们必须手动设置 __INLINE_CODE_47__ 属性在 __INLINE_CODE_48__ 中，并将其设置为一个值的数组：

```typescript title="Example"
...
```

或者 define an actual TypeScript enum as follows：

```typescript title="Example"
...
```

可以然后使用枚举直接与 __INLINE_CODE_49__ 参数装饰器在 combination with __INLINE_CODE_50__ 装饰器：

```typescript title="Example"
...
```

__HTML_TAG_96____HTML_TAG_97____HTML_TAG_98__

With __INLINE_CODE_51__ set to **true**, the __INLINE_CODE_52__ can be selected as a **multi-select**：

__HTML_TAG_