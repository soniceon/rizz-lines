const fs = require('fs');
const path = require('path');

const articlesDir = path.join(__dirname, '../pages/articles');
const enCommonPath = path.join(__dirname, '../public/locales/en/common.json');
const enCommon = fs.existsSync(enCommonPath) ? JSON.parse(fs.readFileSync(enCommonPath, 'utf8')) : {};

function extractText(content) {
  // 简单正则提取 "xxx"、'xxx'、`xxx` 里的中文（可根据实际情况优化）
  const matches = content.match(/["'`][^"'`\n\u0000-\u007F]{2,}["'`]/g);
  return matches ? matches.map(m => m.slice(1, -1)) : [];
}

function slugify(text) {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '_')
    .replace(/^_+|_+$/g, '');
}

fs.readdirSync(articlesDir).forEach(file => {
  if (!file.endsWith('.tsx') && !file.endsWith('.ts') && !file.endsWith('.js')) return;
  const content = fs.readFileSync(path.join(articlesDir, file), 'utf8');
  const texts = extractText(content);
  texts.forEach(text => {
    // 生成 key
    const key = 'article_' + slugify(text).slice(0, 40);
    if (!enCommon[key]) {
      enCommon[key] = text;
      console.log(`Add key: ${key} -> ${text}`);
    }
  });
});

fs.writeFileSync(enCommonPath, JSON.stringify(enCommon, null, 2), 'utf8');
console.log('英文 common.json 已更新。');
