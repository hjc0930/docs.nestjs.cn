/**
 * 修复文档中的死链 (Dead Links) - 第二轮
 * 针对 RSPress v2 的相对路径解析特性及第一轮遗留拼写错误进行修复
 */
const fs = require('fs');
const path = require('path');
const { glob } = require('glob');

const RULES = [
    // 1. 修复第一轮正则替换产生的拼写错误 (module-reference -> module-referenceerence)
    { from: /module-referenceerence/g, to: 'module-reference' },

    // 2. 修复 RSPress v2 报错的 [..] 格式链接 (通常是因为不规范的相对路径)
    // 日志显示: [..](/providers) -> /providers.html (应该指向 /overview/providers)
    { from: /\]\(\.\.\/providers\)/g, to: '](/overview/providers)' },
    { from: /\]\(\/providers\)/g, to: '](/overview/providers)' },
    { from: /\]\(\.\.\/fundamentals\/async-providers\)/g, to: '](/fundamentals/async-providers)' },
    { from: /\]\(\/fundamentals\/async-providers\)/g, to: '](/fundamentals/async-providers)' },
    { from: /\]\(\.\.\/techniques\/mongodb\)/g, to: '](/techniques/mongo)' },

    // 3. 修复 CLI 相关的坏链
    { from: /\]\(\/cli\/monorepo#monorepo-模式\)/g, to: '](/cli/monorepo)' },
    { from: /\]\(\/cli\/monorepo#cli-properties\)/g, to: '](/cli/monorepo)' },
    { from: /\]\(cli\/monorepo#资源\)/g, to: '](/cli/monorepo)' },
    { from: /\]\(\/cli\/monorepo#资源\)/g, to: '](/cli/monorepo)' },

    // 4. 修复 GraphQL 相关的坏链
    { from: /\]\(\/graphql\/resolvers#模块\)/g, to: '](/graphql/resolvers)' },
    { from: /\]\(\/graphql\/other-features#creating-a-custom-driver\)/g, to: '](/graphql/other-features)' },

    // 5. 修复 Middleware 顽固坏链
    { from: /\]\(middleware#函数式中间件\)/g, to: '](/overview/middlewares#函数式中间件)' },

    // 6. 修复 Microservices 坏链
    { from: /\]\(microservices\/grpc#主题策略\)/g, to: '](/microservices/grpc)' },
    { from: /\]\(microservices\/grpc#调用流处理程序\)/g, to: '](/microservices/grpc)' },

    // 7. 兜底修复：将所有渲染为 /filename.html 但实际在子目录下的根路径引用修正
    // RSPress v2 建议使用绝对路径 /overview/... 或带 ./ 的相对路径
    { from: /\]\(\.\/modules#全局模块\)/g, to: '](/overview/modules#全局模块)' }
];

async function run() {
    const files = await glob('docs/**/*.md');
    let totalFixed = 0;

    for (const file of files) {
        let content = fs.readFileSync(file, 'utf8');
        let changed = false;

        for (const rule of RULES) {
            if (rule.from.test(content)) {
                content = content.replace(rule.from, rule.to);
                changed = true;
            }
        }

        if (changed) {
            fs.writeFileSync(file, content);
            console.log(`Fixed links (Phase 2) in: ${file}`);
            totalFixed++;
        }
    }

    console.log(`\n🎉 第2轮修复完成！共修改 ${totalFixed} 个文件。`);
}

run();
