<!-- 此文件从 content/security/encryption-hashing.md 自动生成，请勿直接修改此文件 -->
<!-- 生成时间: 2026-02-24T02:53:02.916Z -->
<!-- 源文件: content/security/encryption-hashing.md -->

### 加密和哈希

**加密** 是将信息编码的过程。这过程将原始信息的表示形式，即明文，转换为另一种形式，即密文。理想情况下，只有授权的 parties 可以将密文还原到明文并访问原始信息。加密本身不能防止干扰，但可以防止不当拦截加密的内容。加密是双向函数，即加密可以使用正确的密钥还原。

**哈希** 是将给定的密钥转换为另一个值。哈希函数根据数学算法生成新的值。哈希操作完成后，通常不可能从输出值恢复到输入值。

#### 加密

Node.js 提供了一个内置的 __LINK_12__ 模块，您可以使用它来加密和解密字符串、数字、缓冲区、流等。Nest 本身不提供额外的包来避免引入不必要的抽象。

例如，让我们使用 AES（Advanced Encryption System） __INLINE_CODE_6__ 算法 CTR 加密模式。

```bash
$ npm install @nestjs/common @nestjs/core reflect-metadata
```

现在解密 __INLINE_CODE_7__ 值：

```bash
$ npm install --save-dev @suites/unit @suites/di.nestjs @suites/doubles.jest
```

#### 哈希

对于哈希，我们建议使用 __LINK_13__ 或 __LINK_14__ 包。Nest 本身不提供额外的包装来避免引入不必要的抽象（保持学习曲线短）。

例如，让我们使用 __INLINE_CODE_8__ 对随机密码进行哈希。

首先安装必要的包：

```bash
$ npm install --save-dev ts-jest @types/jest jest typescript
```

安装完成后，您可以使用 __INLINE_CODE_9__ 函数，例如：

```bash
$ npm install --save-dev @suites/unit @suites/di.nestjs @suites/doubles.vitest
```

生成盐使用 __INLINE_CODE_10__ 函数：

```bash
$ npm install --save-dev @suites/unit @suites/di.nestjs @suites/doubles.sinon
```

比较/检查密码使用 __INLINE_CODE_11__ 函数：

```typescript
/// <reference types="@suites/doubles.jest/unit" />
/// <reference types="@suites/di.nestjs/types" />
```

您可以阅读更多关于可用函数的信息 __LINK_15__。

Note:

* `