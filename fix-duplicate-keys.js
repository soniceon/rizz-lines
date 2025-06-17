const fs = require('fs');
const path = require('path');

// 递归查找所有 JSON 文件
function findJsonFiles(dir) {
  let results = [];
  fs.readdirSync(dir).forEach(file => {
    const p = path.join(dir, file);
    if (fs.statSync(p).isDirectory()) {
      results = results.concat(findJsonFiles(p));
    } else if (file.endsWith('.json')) {
      results.push(p);
    }
  });
  return results;
}

// 检查并修复单个 JSON 文件
function fixDuplicateKeys(file) {
  const content = fs.readFileSync(file, 'utf-8');
  // 用正则分割每一对 key-value
  const keyValueRegex = /"([^"]+)":/g;
  let match, keys = [];
  while ((match = keyValueRegex.exec(content)) !== null) {
    keys.push(match[1]);
  }
  const duplicateKeys = keys.filter((k, i, arr) => arr.indexOf(k) !== i);
  if (duplicateKeys.length === 0) {
    console.log('✔️ 无重复key:', file);
    return;
  }
  // 用 JSON.parse 只会保留最后一个，直接写回即可
  let fixed;
  try {
    fixed = JSON.stringify(JSON.parse(content), null, 2);
    fs.writeFileSync(file + '.fixed', fixed, 'utf-8');
    console.log('❗已修复重复key，输出到:', file + '.fixed');
  } catch (e) {
    console.error('❌ 解析失败:', file, e.message);
  }
}

// 主流程
const targetDir = './public/locales';
const files = findJsonFiles(targetDir);
files.forEach(fixDuplicateKeys);
