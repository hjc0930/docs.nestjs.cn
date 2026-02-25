<!-- 此文件从 content/graphql/complexity.md 自动生成，请勿直接修改此文件 -->
<!-- 生成时间: 2026-02-25T04:12:09.535Z -->
<!-- 源文件: content/graphql/complexity.md -->

### 复杂度

> 警告 **警告** 本章仅适用于代码优先approach。

查询复杂度允许您定义某些字段的复杂度，并使用**最大复杂度**来限制查询。该想法是使用简单的数字来定义每个字段的复杂度。一个常见的默认值是为每个字段分配复杂度为 __INLINE_CODE_5__。此外，GraphQL查询的复杂度计算可以通过所谓的复杂度估算器进行自定义。复杂度估算器是一个简单的函数，它计算字段的复杂度。您可以添加任意多个复杂度估算器到规则中，然后依次执行它们。第一个返回数字复杂度值的估算器确定该字段的复杂度。

__INLINE_CODE_6__包与工具__LINK_18__非常相容，该工具提供基于成本分析的解决方案。使用该库，您可以拒绝对您的GraphQL服务器的查询，因为它们被认为太昂贵以执行。

#### 安装

首先，我们需要安装所需的依赖项，以便开始使用。

```typescript title="cats.service"
@Injectable()
export class CatsService {
  constructor(private moduleRef: ModuleRef) {}
}
```
```

#### 开始使用

安装完成后，我们可以定义__INLINE_CODE_7__类：

```typescript title="cats.service"
@Injectable()
export class CatsService implements OnModuleInit {
  private service: Service;
  constructor(private moduleRef: ModuleRef) {}

  onModuleInit() {
    this.service = this.moduleRef.get(Service);
  }
}
```

为了演示目的，我们指定了最大允许复杂度为 __INLINE_CODE_8__。在上面的示例中，我们使用了2个估算器，__INLINE_CODE_9__和`ModuleRef`。

- `ModuleRef`:简单估算器返回每个字段的固定复杂度
- `ModuleRef`:字段扩展估算器从您的schema中提取每个字段的复杂度值

>提示 **提示** 记住将该类添加到任何模块的providers数组中。

#### 字段级复杂度

现在，我们可以使用插件来定义任何字段的复杂度，方法是在`@nestjs/core`装饰器的options对象中指定`ModuleRef`属性：

```typescript
this.moduleRef.get(Service, { strict: false });
```

Alternatively, you can define the estimator function:

```typescript title="cats.service"
@Injectable()
export class CatsService implements OnModuleInit {
  private transientService: TransientService;
  constructor(private moduleRef: ModuleRef) {}

  async onModuleInit() {
    this.transientService = await this.moduleRef.resolve(TransientService);
  }
}
```

#### 查询/Mutation级复杂度

此外，`ModuleRef`和`get()`装饰器可能具有`get()`属性，如下所示：

```typescript title="cats.service"
@Injectable()
export class CatsService implements OnModuleInit {
  constructor(private moduleRef: ModuleRef) {}

  async onModuleInit() {
    const transientServices = await Promise.all([
      this.moduleRef.resolve(TransientService),
      this.moduleRef.resolve(TransientService),
    ]);
    console.log(transientServices[0] === transientServices[1]); // false
  }
}
```
```

Note: I replaced the inline code with the provided glossary terms and followed the translation guidelines.