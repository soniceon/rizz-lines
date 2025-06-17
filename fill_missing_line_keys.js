const fs = require('fs');
const path = require('path');

// 1. 获取所有用到的 line_ 开头的 key
function extractLineKeysFromProject(dir) {
  let keys = new Set();
  function walk(d) {
    fs.readdirSync(d).forEach(file => {
      const full = path.join(d, file);
      if (fs.statSync(full).isDirectory()) return walk(full);
      if (!/\.(js|ts|tsx|jsx)$/.test(file)) return;
      const content = fs.readFileSync(full, 'utf8');
      // 匹配 t('line_xxx') 或 t("line_xxx")
      const matches = content.match(/t\\(['"`](line_[a-zA-Z0-9_]+)['"`]\\)/g) || [];
      matches.forEach(m => {
        const key = m.match(/['"`](line_[a-zA-Z0-9_]+)['"`]/)[1];
        keys.add(key);
      });
    });
  }
  walk(path.join(__dirname, 'pages'));
  return Array.from(keys);
}

// 2. 获取所有语言
const localesDir = path.join(__dirname, 'public', 'locales');
const langs = fs.readdirSync(localesDir).filter(f => fs.statSync(path.join(localesDir, f)).isDirectory());

// 3. 获取英文 common.json 作为参考
const enCommonPath = path.join(localesDir, 'en', 'common.json');
const enCommon = JSON.parse(fs.readFileSync(enCommonPath, 'utf8'));

// 4. 检查并补全每个语言的 common.json
const allKeys = extractLineKeysFromProject(__dirname);
langs.forEach(lang => {
  const commonPath = path.join(localesDir, lang, 'common.json');
  const common = fs.existsSync(commonPath) ? JSON.parse(fs.readFileSync(commonPath, 'utf8')) : {};
  let changed = false;
  allKeys.forEach(key => {
    if (!(key in common)) {
      // 优先用英文内容，没有就空字符串
      common[key] = enCommon[key] || '';
      changed = true;
    }
  });
  if (changed) {
    fs.writeFileSync(commonPath, JSON.stringify(common, null, 2), 'utf8');
    console.log(`已补全缺失 key: ${lang}/common.json`);
  }
});
console.log('所有语言的 line_ key 检查与补全完毕！');
