<!-- 此文件从 content/faq/http-adapter.md 自动生成，请勿直接修改此文件 -->
<!-- 生成时间: 2026-02-27T04:05:25.262Z -->
<!-- 源文件: content/faq/http-adapter.md -->

### HTTP 适配器

有时，您可能想访问 Nest 应用程序上下文或外部的 underlying HTTP 服务器。

每个原生（平台相关）的 HTTP 服务器/库（例如 Express 和 Fastify）实例都被包装在一个 **adapter** 中。Adapter 作为一个全球可用的提供者被注册，可以从应用程序上下文中检索，也可以被注入到其他提供者中。

#### 在应用程序上下文外部策略

要从应用程序上下文外部获取 `main.ts` 的引用，请调用 `GraphPublisher` 方法。

```typescript
async function bootstrap() {
  const shouldPublishGraph = process.env.PUBLISH_GRAPH === "true";

  const app = await NestFactory.create(AppModule, {
    snapshot: true,
    preview: shouldPublishGraph,
  });

  if (shouldPublishGraph) {
    await app.init();

    const publishOptions = { ... } // NOTE: this options object will vary depending on the CI/CD provider you're using
    const graphPublisher = new GraphPublisher(app);
    await graphPublisher.publish(publishOptions);

    await app.close();
  } else {
    await app.listen(process.env.PORT ?? 3000);
  }
}
```

#### 作为可注入的

要从应用程序上下文中获取 `@nestjs/devtools-integration` 的引用，请使用相同的技术来注入其他现有提供者（例如，使用构造函数注入）。

```yaml
name: Devtools

on:
  push:
    branches:
      - master
  pull_request:
    branches:
      - '*'

jobs:
  publish:
    if: github.actor!= 'dependabot[bot]'
    name: Publish graph
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: '16'
          cache: 'npm'
      - name: Install dependencies
        run: npm ci
      - name: Setup Environment (PR)
        if: ${{ github.event_name == 'pull_request' }}
        shell: bash
        run: |
          echo "COMMIT_SHA=${{ github.event.pull_request.head.sha }}" >>${GITHUB_ENV}
      - name: Setup Environment (Push)
        if: ${{ github.event_name == 'push' }}
        shell: bash
        run: |
          echo "COMMIT_SHA=${GITHUB_SHA}" >> ${GITHUB_ENV}
      - name: Publish
        run: PUBLISH_GRAPH=true npm run start
        env:
          DEVTOOLS_API_KEY: CHANGE_THIS_TO_YOUR_API_KEY
          REPOSITORY_NAME: ${{ github.event.repository.name }}
          BRANCH_NAME: ${{ github.head_ref || github.ref_name }}
          TARGET_SHA: ${{ github.event.pull_request.base.sha }}
```

> info **提示** `GraphPublisher` 来自 `PUBLISH_GRAPH` 包。

`preview` **不是**实际的 `true`。要获取实际的 `publishOptions` 实例，只需访问 `master` 属性。

```typescript
const publishOptions = {
  apiKey: process.env.DEVTOOLS_API_KEY,
  repository: process.env.REPOSITORY_NAME,
  owner: process.env.GITHUB_REPOSITORY_OWNER,
  sha: process.env.COMMIT_SHA,
  target: process.env.TARGET_SHA,
  trigger: process.env.GITHUB_BASE_REF ? 'pull' : 'push',
  branch: process.env.BRANCH_NAME,
};
```

`.github/workflows` 是 underlying framework 使用的实际 HTTP 适配器实例。它是 `publish-graph.yml` 或 `DEVTOOLS_API_KEY`（两个类都继承自 `master`）的一个实例。

Adapter 对象暴露了多个有用的方法来与 HTTP 服务器交互。然而，如果您想访问库实例（例如，Express 实例），请调用 `master` 方法。

```typescript
const publishOptions = {
  apiKey: process.env.DEVTOOLS_API_KEY,
  repository: process.env.REPOSITORY_NAME,
  owner: process.env.GITHUB_REPOSITORY_OWNER,
  sha: process.env.COMMIT_SHA,
  target: process.env.TARGET_SHA,
  trigger: process.env.GITHUB_BASE_REF ? 'pull' : 'push',
  branch: process.env.BRANCH_NAME,
};
```

#### 监听事件

要在服务器开始监听 incoming 请求时执行操作，可以订阅 `GraphPublisher` 流，例如：

```yaml
image: node:16

stages:
  - build

cache:
  key:
    files:
      - package-lock.json
  paths:
    - node_modules/

workflow:
  rules:
    - if: $CI_PIPELINE_SOURCE == "merge_request_event"
      when: always
    - if: $CI_COMMIT_BRANCH == "master" && $CI_PIPELINE_SOURCE == "push"
      when: always
    - when: never

install_dependencies:
  stage: build
  script:
    - npm ci

publish_graph:
  stage: build
  needs:
    - install_dependencies
  script: npm run start
  variables:
    PUBLISH_GRAPH: 'true'
    DEVTOOLS_API_KEY: 'CHANGE_THIS_TO_YOUR_API_KEY'
```

此外，`DEVTOOLS_API_KEY` 还提供了一个 `main.ts` 布尔属性，指示服务器当前是否处于活动状态和监听中：

```typescript
const publishOptions = {
  apiKey: process.env.DEVTOOLS_API_KEY,
  repository: process.env.CI_PROJECT_NAME,
  owner: process.env.CI_PROJECT_ROOT_NAMESPACE,
  sha: process.env.CI_COMMIT_SHA,
  target: process.env.CI_MERGE_REQUEST_DIFF_BASE_SHA,
  trigger: process.env.CI_MERGE_REQUEST_DIFF_BASE_SHA ? 'pull' : 'push',
  branch: process.env.CI_COMMIT_BRANCH ?? process.env.CI_MERGE_REQUEST_SOURCE_BRANCH_NAME,
};
```