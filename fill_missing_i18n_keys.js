// 用于自动找出所有i18n缺失key并生成英文json
const fs = require('fs');
const path = require('path');

// 递归查找所有文件
function getAllFiles(dir, exts, fileList = []) {
  const files = fs.readdirSync(dir);
  files.forEach(file => {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);
    if (stat.isDirectory()) {
      getAllFiles(filePath, exts, fileList);
    } else if (exts.includes(path.extname(file))) {
      fileList.push(filePath);
    }
  });
  return fileList;
}

// 提取所有t('xxx')的key
function extractKeysFromFile(filePath) {
  const content = fs.readFileSync(filePath, 'utf8');
  const regex = /t\(['"]([a-zA-Z0-9_.-]+)['"]/g;
  const keys = [];
  let match;
  while ((match = regex.exec(content)) !== null) {
    keys.push(match[1]);
  }
  return keys;
}

// 主流程
const exts = ['.tsx', '.ts', '.js', '.jsx'];
const srcDirs = ['pages', 'components', 'src'];
let allKeys = new Set();
for (const dir of srcDirs) {
  if (fs.existsSync(dir)) {
    const files = getAllFiles(dir, exts);
    for (const file of files) {
      extractKeysFromFile(file).forEach(k => allKeys.add(k));
    }
  }
}

// 读取en/common.json
const enCommon = JSON.parse(fs.readFileSync('public/locales/en/common.json', 'utf8'));
const missing = {};
for (const key of allKeys) {
  if (!(key in enCommon)) {
    // 缺失key，value用key本身
    missing[key] = key;
  }
}

// 输出到missing_keys_en.json
fs.writeFileSync('missing_keys_en.json', JSON.stringify(missing, null, 2), 'utf8');
console.log('Missing keys written to missing_keys_en.json'); 