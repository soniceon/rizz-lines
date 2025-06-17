const fs = require('fs');
const path = require('path');

// 4个分类
const categories = [
  'Best rizz lines',
  'Classic Rizz Lines',
  'Smooth rizz lines',
  'Funny Rizz Lines'
];

const languages = ['en', 'zh', 'fr', 'de', 'ja', 'ko', 'ru', 'es', 'pt'];

// 读取JSON文件
const data = JSON.parse(fs.readFileSync('rizzlines.json', 'utf8'));

categories.forEach(category => {
  const lines = data[category] || [];
  if (!lines.length) {
    console.warn(`分类 ${category} 没有数据`);
    return;
  }
  languages.forEach(lang => {
    // 创建文件夹
    const dir = path.join('public', 'translations', category, lang);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    // 提取该分类下该语言的所有内容
    const translations = lines.map(line => line[lang] || '');
    fs.writeFileSync(
      path.join(dir, 'translations.json'),
      JSON.stringify(translations, null, 2)
    );
    console.log(`${category} - ${lang} 已保存 ${translations.length} 条`);
  });
});

console.log('所有分类翻译已提取完毕！'); 