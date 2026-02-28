#!/usr/bin/env node
/**
 * 仅修复 docs/ 目录下文件的格式问题（@@filename / @@switch），保留现有翻译内容不变
 */
const fs = require('fs');
const path = require('path');
const { glob } = require('glob');

async function fixFormat() {
    const pattern = 'docs/**/*.md';
    const files = await glob(pattern);
    let fixed = 0;

    for (const file of files) {
        let content = fs.readFileSync(file, 'utf8');
        const original = content;

        // 1. 移除 @@switch 分支（从 @@switch 行到下一个 ``` 或双换行前）
        content = content.replace(/@@switch[\s\S]*?(?=```|\n\n|$)/g, '');

        // 2. 删除所有 @@filename 行（无论在代码块内外）
        content = content.replace(/^@@filename\s*\([^)]*\)\s*\r?\n/gm, '');

        // 3. 清理因删除产生的多余空行
        content = content.replace(/\n{3,}/g, '\n\n');

        if (content !== original) {
            fs.writeFileSync(file, content, 'utf8');
            console.log(`✅ Fixed: ${file}`);
            fixed++;
        }
    }

    console.log(`\n✅ Done: ${fixed} files fixed out of ${files.length} total`);
}

fixFormat().catch(console.error);
