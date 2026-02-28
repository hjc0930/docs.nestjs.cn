/**
 * 修复文档中的死链 (Dead Links) - 第四轮 (精准修复)
 * 针对 build_log.txt 中明确报错的 6 个文件进行修复
 */
const fs = require('fs');

const FILES_TO_FIX = {
    'docs/graphql/resolvers-map.md': [
        { from: '(/graphql/resolvers)', to: '(/graphql/resolvers-map)' } // 从配置看，应该指向自己或更正后的路径
    ],
    'docs/graphql/quick-start.md': [
        { from: '(/graphql/other-features)', to: '(/graphql/guards-interceptors)' } // 侧边栏显示为 guards-interceptors
    ],
    'docs/cli/usages.md': [
        { from: '(/cli/monorepo)', to: '(/cli/overview)' } // monorepo 内容通常在概述或工作区中
    ],
    'docs/faq/serverless.md': [
        { from: '(/cli/monorepo)', to: '(/cli/overview)' }
    ],
    'docs/techniques/configuration.md': [
        { from: '(/cli/monorepo)', to: '(/cli/overview)' }
    ],
    'docs/cli/workspaces.md': [
        { from: '(/cli/monorepo)', to: '(/cli/overview)' }
    ]
};

// 额外的全局修正 (防止以后报错)
const GLOBAL_RULES = [
    { from: '(/graphql/resolvers)', to: '(/graphql/resolvers-map)' },
    { from: '(/graphql/other-features)', to: '(/graphql/guards-interceptors)' },
    { from: '(/cli/monorepo)', to: '(/cli/overview)' },
    { from: '(/fundamentals/async-providers)', to: '(/fundamentals/async-components)' },
    { from: '(/techniques/mongodb)', to: '(/techniques/mongo)' }
];

function fix() {
    let totalFixed = 0;

    for (const [file, rules] of Object.entries(FILES_TO_FIX)) {
        if (!fs.existsSync(file)) continue;

        let content = fs.readFileSync(file, 'utf8');
        let changed = false;

        // 应用特定规则
        for (const rule of rules) {
            if (content.includes(rule.from)) {
                content = content.replace(new RegExp(escapeRegExp(rule.from), 'g'), rule.to);
                changed = true;
            }
        }

        // 应用全局补漏
        for (const rule of GLOBAL_RULES) {
            if (content.includes(rule.from)) {
                content = content.replace(new RegExp(escapeRegExp(rule.from), 'g'), rule.to);
                changed = true;
            }
        }

        if (changed) {
            fs.writeFileSync(file, content);
            console.log(`Fixed: ${file}`);
            totalFixed++;
        }
    }

    console.log(`\n🎉 第4轮精准修复完成！修改了 ${totalFixed} 个文件。`);
}

function escapeRegExp(string) {
    return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

fix();
