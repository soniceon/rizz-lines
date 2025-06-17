const fs = require('fs');
const path = require('path');

// 1. 读取 next-i18next.config.js 里的语言配置
const config = require('../next-i18next.config.js');
const validLocales = config.i18n.locales;

const localesDir = path.join(__dirname, '../public/locales');
const allDirs = fs.readdirSync(localesDir).filter(f => fs.statSync(path.join(localesDir, f)).isDirectory());

const unused = allDirs.filter(dir => !validLocales.includes(dir));

if (unused.length === 0) {
  console.log('没有多余的语言目录。');
} else {
  unused.forEach(dir => {
    const full = path.join(localesDir, dir);
    fs.rmSync(full, { recursive: true, force: true });
    console.log(`已删除多余语言目录: ${dir}`);
  });
}
