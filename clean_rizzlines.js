const fs = require('fs');
const path = require('path');

const langs = ['zh', 'en', 'fr', 'de', 'ja', 'ko', 'ru', 'es', 'pt'];
const localesDir = path.join(__dirname, 'public', 'locales');

function cleanText(str) {
  if (typeof str !== 'string') return str;
  return str
    // 替换全角引号为半角
    .replace(/[""«»「」『』]/g, '"')
    // 替换全角单引号为半角
    .replace(/['']/g, "'")
    // 替换常见乱码问号
    .replace(/[�]/g, '')
    // 移除所有不可见/不可识别字符（如方块、乱码）
    .replace(/[^\x20-\x7E\u0400-\u04FF\u3000-\u303F\u4E00-\u9FFF\u3040-\u30FF\uAC00-\uD7AF\uFF00-\uFFEF]/g, '')
    // 替换多余的转义
    .replace(/\\/g, '\\')
    .replace(/\"/g, '"')
    // 替换多余空格
    .replace(/\s+/g, ' ')
    .trim();
}

langs.forEach(lang => {
  const file = path.join(localesDir, lang, 'rizzlines.json');
  if (!fs.existsSync(file)) return;
  const data = JSON.parse(fs.readFileSync(file, 'utf8'));
  const cleaned = {};
  Object.entries(data).forEach(([k, v]) => {
    cleaned[k] = cleanText(v);
  });
  fs.writeFileSync(file, JSON.stringify(cleaned, null, 2), 'utf8');
  console.log(`已清洗: ${file}`);
}); 