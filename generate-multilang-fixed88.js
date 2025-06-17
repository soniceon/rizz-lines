const fs = require('fs');
const path = require('path');

// 读取中文 fixed88
const zhFixed88 = JSON.parse(fs.readFileSync('./public/locales/zh/fixed88.json', 'utf8')).fixed88;

// 读取英文 rizzlines 作为 key 映射源
const enRizzlines = JSON.parse(fs.readFileSync('./public/locales/en/rizzlines.json', 'utf8'));

// 生成 key 映射
const keyMapping = {};
zhFixed88.forEach((zhLine, index) => {
  // 查找对应的英文 key
  const matchingKey = Object.entries(enRizzlines).find(([key, value]) => {
    if (typeof value !== 'string') return false;
    return value.toLowerCase() === zhLine.toLowerCase();
  })?.[0];

  if (matchingKey) {
    keyMapping[zhLine] = matchingKey;
  } else {
    // 如果找不到匹配的 key，生成一个新的
    const newKey = `line_fixed88_${index + 1}`;
    keyMapping[zhLine] = newKey;
  }
});

// 生成新的 fixed88.json（只包含 key）
const newFixed88 = {
  fixed88: zhFixed88.map(line => keyMapping[line])
};

// 写入新的 fixed88.json
fs.writeFileSync(
  './public/locales/fixed88.json',
  JSON.stringify(newFixed88, null, 2),
  'utf8'
);

// 为每种语言生成 rizzlines.json
const languages = ['zh', 'en', 'fr', 'de', 'ja', 'ko', 'ru', 'es', 'pt'];

languages.forEach(lang => {
  try {
    // 读取该语言的 rizzlines
    const langRizzlines = JSON.parse(fs.readFileSync(`./public/locales/${lang}/rizzlines.json`, 'utf8'));
    
    // 创建新的 rizzlines 对象
    const newRizzlines = {};
    
    // 添加 fixed88 的映射
    zhFixed88.forEach(line => {
      const key = keyMapping[line];
      newRizzlines[key] = langRizzlines[key] || line; // 如果找不到翻译，使用中文
    });
    
    // 写入新的 rizzlines.json
    fs.writeFileSync(
      `./public/locales/${lang}/rizzlines.json`,
      JSON.stringify(newRizzlines, null, 2),
      'utf8'
    );
    
    console.log(`Generated: ./public/locales/${lang}/rizzlines.json`);
  } catch (error) {
    console.error(`Error processing ${lang}:`, error.message);
  }
});

console.log('Successfully generated key-based fixed88 files for all languages!');
