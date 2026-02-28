/**
 * 修复文档中的死链 (Dead Links)
 * 根据 RSPress 构建日志中的错误进行针对性全量修复
 */
const fs = require('fs');
const path = require('path');
const { glob } = require('glob');

const RULES = [
    // 1. 技术目录更名修复
    { from: /\/techniques\/database/g, to: '/techniques/sql' },
    { from: /\]\(\.\/techniques\/sql/g, to: '](/techniques/sql' }, // 修复错误的相对路径

    // 2. 基础目录更名/重组修复
    { from: /\/fundamentals\/injection-scopes/g, to: '/fundamentals/provider-scopes' },
    { from: /\/fundamentals\/custom-providers/g, to: '/fundamentals/dependency-injection' },
    { from: /\/fundamentals\/module-ref/g, to: '/fundamentals/module-reference' },

    // 3. 相对路径层级错误修复 (例如在 techniques 目录下写 ./techniques/...)
    { from: /\]\(\.\/techniques\//g, to: '](/techniques/' },
    { from: /\]\(\.\/fundamentals\//g, to: '](/fundamentals/' },
    { from: /\]\(\.\/graphql\//g, to: '](/graphql/' },
    { from: /\]\(\.\/openapi\//g, to: '](/openapi/' },
    { from: /\]\(\.\/microservices\//g, to: '](/microservices/' },
    { from: /\]\(\.\.\/\.\.\/docs\//g, to: '](/' }, // 彻底错误的路径

    // 4. 特定顽固死链修复
    { from: /\]\(todo\)/g, to: '](#)' },
    { from: /\]\(\.\/guards\)/g, to: '](/overview/guards)' }, // security 目录下的错误引用
    { from: /\]\(\.\/first-steps\)/g, to: '](/overview/first-steps)' },
    { from: /\]\(\.\/modules#动态模块\)/g, to: '](/overview/modules#动态模块)' },
    { from: /\]\(\.\/controllers\)/g, to: '](/overview/controllers)' }
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
            console.log(`Fixed links in: ${file}`);
            totalFixed++;
        }
    }

    console.log(`\n🎉 修复完成！共修改 ${totalFixed} 个文件。`);
}

run();
