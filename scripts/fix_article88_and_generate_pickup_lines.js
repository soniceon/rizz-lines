const fs = require('fs');
const path = require('path');

const data = JSON.parse(fs.readFileSync('rizzlines.json', 'utf8'));
const languages = ['en', 'zh', 'fr', 'de', 'ja', 'ko', 'ru', 'es', 'pt'];

// 1. 提取所有纯英文内容及其多语言翻译
let allLines = [];
for (const cat of Object.keys(data)) {
  for (const item of data[cat]) {
    if (!item.en || /[\u4e00-\u9fa5]/.test(item.en)) continue;
    allLines.push(item);
  }
}

// 2. 取前88条英文内容
const selected = allLines.slice(0, 88);

// 3. 替换 tsx 文件 lines 数组
const tsxPath = path.join('pages', 'articles', '88-corny-but-effective-pickup-lines.tsx');
let tsx = fs.readFileSync(tsxPath, 'utf8');
const linesArrStr = selected.map(item => `  ${JSON.stringify(item.en)}`).join(',\n');
tsx = tsx.replace(/const lines = \[[\s\S]*?\];/, `const lines = [\n${linesArrStr}\n];`);
fs.writeFileSync(tsxPath, tsx, 'utf8');

// 4. 生成多语言pickup-lines.json
languages.forEach(lang => {
  const obj = {};
  selected.forEach((item, idx) => {
    obj[`line_${idx+1}`] = item[lang] || '';
  });
  const dir = path.join('public', 'locales', lang);
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
  fs.writeFileSync(
    path.join(dir, 'pickup-lines.json'),
    JSON.stringify(obj, null, 2),
    'utf8'
  );
});

console.log('已修复文章88条英文内容并保存多语言翻译到各自pickup-lines.json！'); 