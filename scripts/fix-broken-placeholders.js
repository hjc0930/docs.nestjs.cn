#!/usr/bin/env node

/**
 * 修复脚本：扫描 docs/ 目录并尝试修复损坏的占位符。
 * 如果文件中残留有 __INLINE_CODE_、__CODE_BLOCK_ 等标记，
 * 说明之前的翻译/还原流程出错了。
 * 本脚本将尝试重新触发这些文件的翻译。
 */

const fs = require('fs');
const path = require('path');
const { glob } = require('glob');

const docsDir = path.resolve(__dirname, '../docs');
const contentDir = path.resolve(__dirname, '../content');

async function run() {
    console.log('🔍 正在扫描 docs 目录中的损坏占位符...');

    const pattern = path.join(docsDir, '**/*.md').replace(/\\/g, '/');
    const files = await glob(pattern);

    const brokenFiles = [];
    const placeholderRegex = /__(INLINE_CODE|CODE_BLOCK|LINK|HTML_TAG)_\d+__/;

    for (const file of files) {
        const content = fs.readFileSync(file, 'utf8');
        if (placeholderRegex.test(content)) {
            if (!file.includes('unaudited/')) {
                brokenFiles.push(file);
            }
        }
    }

    console.log(`📊 发现 ${brokenFiles.length} 个非 unaudited 损坏的文件。`);

    if (brokenFiles.length === 0) {
        console.log('✅ 未发现损坏的占位符。');
        return;
    }

    console.log('\n正在尝试通过「触碰」源文件来触发 translate-docs.js 的增量更新...');

    for (const file of brokenFiles) {
        const fileName = path.basename(file);
        const sourcePattern = path.join(contentDir, '**', fileName).replace(/\\/g, '/');
        const sources = await glob.sync(sourcePattern);

        if (sources.length > 0) {
            const sourceFile = sources[0];
            console.log(`  触碰源文件: ${path.relative(contentDir, sourceFile)}`);
            const now = new Date();
            fs.utimesSync(sourceFile, now, now);
        } else {
            console.warn(`  🔴 未找到源文件: ${fileName}`);
        }
    }

    console.log('\n✅ 触碰完成。这些文件现在看起来将由于修改时间更新而被重新翻译。');
    console.log('请随后运行 `node scripts/translate-docs.js --verbose` 即可应用最新逻辑。');
}

run().catch(console.error);
