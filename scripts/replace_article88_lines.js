const fs = require('fs');
const path = require('path');

// 读取所有英文内容，原样提取en字段
const rizzData = JSON.parse(fs.readFileSync('rizzlines.json', 'utf8'));
let allEn = [];
for (const cat of Object.keys(rizzData)) {
  const arr = rizzData[cat];
  if (Array.isArray(arr)) {
    arr.forEach(item => {
      let line = '';
      if (typeof item === 'string') {
        line = item;
      } else if (item && typeof item.en === 'string') {
        line = item.en;
      }
      if (line) allEn.push(line);
    });
  }
}
// 去重
allEn = Array.from(new Set(allEn.filter(Boolean)));

// 随机抽取88条
function getRandom(arr, n) {
  const result = [];
  const used = new Set();
  while (result.length < n && used.size < arr.length) {
    const idx = Math.floor(Math.random() * arr.length);
    if (!used.has(idx)) {
      result.push(arr[idx]);
      used.add(idx);
    }
  }
  return result;
}
const linesArr = getRandom(allEn, 88);

// 均分为4组
const groupSize = 22;
const groupTitles = [
  'Funny Rizz Lines',
  'Romantic Rizz Lines',
  'Bold Rizz Lines',
  'Classic Rizz Lines',
];
const groups = groupTitles.map((title, i) => ({
  title,
  img: `/articles/${i+1}.jpg`,
  alt: `${title} image`,
  start: i * groupSize,
  end: (i + 1) * groupSize
}));

// 读取tsx文件
const tsxPath = path.join('pages', 'articles', '88-corny-but-effective-pickup-lines.tsx');
let tsx = fs.readFileSync(tsxPath, 'utf8');

// 替换 lines 数组（原样输出）
const linesArrStr = linesArr.map(l => `  ${JSON.stringify(l)}`).join(',\n');
tsx = tsx.replace(/const lines = \[[\s\S]*?\];/, `const lines = [\n${linesArrStr}\n];`);

// 替换 groups 分组
const groupsStr = `const groups = [\n${groups.map(g => `  { title: t('${g.title}'), img: '${g.img}', alt: t('${g.alt}'), start: ${g.start}, end: ${g.end} }`).join(',\n')}\n];`;
tsx = tsx.replace(/const groups = \[[\s\S]*?\];/, groupsStr);

fs.writeFileSync(tsxPath, tsx, 'utf8');
console.log('已原样提取en字段内容并替换页面！'); 