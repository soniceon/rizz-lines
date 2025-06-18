const fs = require('fs');
const path = require('path');
const data = require('./rizzlines.json');

// 定义需要重命名的 key
const keyMap = {
  '中文搭讪话术': 'zh-lines',
  '日本語のナンパフレーズ': 'jp-lines',
  '한국어 대화 문구': 'ko-lines',
};

const newData = {};
Object.keys(data).forEach(cat => {
  if (keyMap[cat]) {
    newData[keyMap[cat]] = data[cat];
    console.log(`重命名: "${cat}" -> "${keyMap[cat]}"`);
  } else {
    newData[cat] = data[cat];
  }
});

// 备份原文件
fs.copyFileSync('rizzlines.json', 'rizzlines.json.bak2');
fs.writeFileSync('rizzlines.json', JSON.stringify(newData, null, 2), 'utf-8');
console.log('✅ rizzlines.json key 重命名完成，原文件已备份为 rizzlines.json.bak2'); 