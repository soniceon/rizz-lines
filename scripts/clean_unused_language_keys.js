const fs = require('fs');
const path = require('path');
const config = require('../next-i18next.config.js');

const validLangs = config.i18n.locales;
const validLangKeys = validLangs.map(l => `language.${l}`);

const localesDir = path.join(__dirname, '../public/locales');
const allDirs = fs.readdirSync(localesDir).filter(f => fs.statSync(path.join(localesDir, f)).isDirectory());

allDirs.forEach(dir => {
  const commonPath = path.join(localesDir, dir, 'common.json');
  if (!fs.existsSync(commonPath)) return;
  const data = JSON.parse(fs.readFileSync(commonPath, 'utf8'));
  let changed = false;
  Object.keys(data).forEach(key => {
    if (key.startsWith('language.') && !validLangKeys.includes(key)) {
      delete data[key];
      changed = true;
    }
  });
  if (changed) {
    fs.writeFileSync(commonPath, JSON.stringify(data, null, 2), 'utf8');
    console.log(`已清理无用 language.xx key: ${dir}/common.json`);
  }
});
console.log('所有 common.json 语言 key 清理完成。');
