const fs = require('fs');
const path = require('path');

function scanAndClean(dir) {
  fs.readdirSync(dir).forEach(file => {
    const fullPath = path.join(dir, file);
    if (fs.statSync(fullPath).isDirectory()) {
      scanAndClean(fullPath);
    } else if (/\.(js|ts|tsx|json|md)$/.test(file)) {
      let content = fs.readFileSync(fullPath, 'utf8');
      // 直接清理所有  片段
      const cleaned = content.replace(/groups: \[[\s\S]*?\][,}]?/g, '');
      if (cleaned !== content) {
        fs.writeFileSync(fullPath, cleaned, 'utf8');
        console.log('已清理:', fullPath);
      }
    }
  });
}

scanAndClean(process.cwd());
console.log('全项目  片段清理完成!');
