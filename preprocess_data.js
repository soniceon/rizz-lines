const fs = require('fs');
const path = require('path');

const inputPath = path.join(__dirname, 'rizzlines.txt');
const outputPath = path.join(__dirname, 'rizzlines.json');

const content = fs.readFileSync(inputPath, 'utf-8');
const lines = content.split('\n');

const categories = {};
let currentCategory = null;

for (let line of lines) {
  line = line.trim();
  // 匹配以冒号结尾的分类标题
  if (line && line.endsWith(':')) {
    currentCategory = line.replace(':', '').trim();
    categories[currentCategory] = [];
  } else if (line && currentCategory) {
    categories[currentCategory].push(line.replace(/^\"|\"$/g, '').replace(/^"|"$/g, ''));
  }
}

fs.writeFileSync(outputPath, JSON.stringify(categories, null, 2), 'utf-8');
console.log('rizzlines.json generated!');
