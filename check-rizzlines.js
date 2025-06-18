const fs = require('fs');
const path = require('path');

// 读取 rizzlines.json
const filePath = path.join(__dirname, 'rizzlines.json');
let data;
try {
  const raw = fs.readFileSync(filePath, 'utf-8');
  data = JSON.parse(raw);
} catch (e) {
  console.error('❌ JSON 格式错误:', e.message);
  process.exit(1);
}

const slugify = (text) =>
  text
    .toString()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .trim()
    .replace(/\s+/g, '-')
    .replace(/[^\w-]+/g, '')
    .replace(/--+/g, '-');

const slugs = new Set();
let hasError = false;

for (const category of Object.keys(data)) {
  const slug = slugify(category);
  if (!slug || slug === '-') {
    console.error(`❌ 分类 "${category}" 的 slug 为空或非法: "${slug}"`);
    hasError = true;
  }
  if (slugs.has(slug)) {
    console.error(`❌ slug 重复: "${slug}" (category: "${category}")`);
    hasError = true;
  }
  slugs.add(slug);

  // 检查每条内容的字段
  for (const [i, item] of (data[category] || []).entries()) {
    const langs = ['en','zh','fr','de','ja','ko','ru','es','pt'];
    for (const lang of langs) {
      if (!item[lang]) {
        console.warn(`⚠️  ${category} 第${i+1}条缺少 ${lang} 字段`);
      }
    }
  }
}

if (!hasError) {
  console.log('✅ rizzlines.json 检查通过，没有发现 slug 问题。');
} else {
  console.log('❌ 存在 slug 问题，请修正后重试。');
}
