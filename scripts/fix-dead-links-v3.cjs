/**
 * 修复文档中的死链 (Dead Links) - 第三轮 (最激进规则)
 * 处理 async-providers -> async-components, mongodb -> mongo 等深层更名
 */
const fs = require('fs');
const path = require('path');
const { glob } = require('glob');

const RULES = [
    // 1. 核心更名修正 (核心报错点)
    { from: /\/fundamentals\/async-providers/g, to: '/fundamentals/async-components' },
    { from: /\/techniques\/mongodb/g, to: '/techniques/mongo' },

    // 2. 补漏拼写修正 (第一轮正则后遗症)
    { from: /module-referenceerence/g, to: 'module-reference' },

    // 3. 增强绝对路径规范 (针对 RSPress v2)
    { from: /\]\(\/providers\)/g, to: '](/overview/providers)' },
    { from: /\]\(\.\.\/providers\)/g, to: '](/overview/providers)' },
    { from: /\]\(\/cli\/monorepo\)/g, to: '](/cli/monorepo)' }, // 统一去掉可能导致混淆的 hash

    // 4. 针对日志中特定文件的顽固引用
    { from: /\]\(\/graphql\/resolvers\)/g, to: '](/graphql/resolvers)' },
    { from: /\]\(\/graphql\/other-features\)/g, to: '](/graphql/other-features)' }
];

async function run() {
    const files = await glob('docs/**/*.md');
    let totalFixed = 0;

    for (const file of files) {
        let content = fs.readFileSync(file, 'utf8');
        let changed = false;

        for (const rule of RULES) {
            if (typeof rule.from === 'string' ? content.includes(rule.from) : rule.from.test(content)) {
                content = content.replace(rule.from, rule.to);
                changed = true;
            }
        }

        if (changed) {
            fs.writeFileSync(file, content);
            console.log(`Fixed links (Phase 3) in: ${file}`);
            totalFixed++;
        }
    }

    console.log(`\n🎉 第3轮修复完成！共修改 ${totalFixed} 个文件。`);
}

run();
