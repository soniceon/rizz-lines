const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

console.log('🚀 开始构建和测试 Rizz Lines Generator...\n');

try {
  // 1. 清理之前的构建
  console.log('📁 清理之前的构建...');
  if (fs.existsSync('.next')) {
    execSync('rm -rf .next', { stdio: 'inherit' });
  }
  if (fs.existsSync('out')) {
    execSync('rm -rf out', { stdio: 'inherit' });
  }

  // 2. 安装依赖
  console.log('📦 安装依赖...');
  execSync('npm install', { stdio: 'inherit' });

  // 3. 检查代码质量
  console.log('🔍 检查代码质量...');
  try {
    execSync('npm run check:slugs', { stdio: 'inherit' });
  } catch (error) {
    console.log('⚠️  代码质量检查发现问题，但继续构建...');
  }

  // 4. 构建项目
  console.log('🏗️  构建项目...');
  execSync('npm run build', { stdio: 'inherit' });

  // 5. 验证构建输出
  console.log('✅ 验证构建输出...');
  const buildDir = '.next';
  if (!fs.existsSync(buildDir)) {
    throw new Error('构建目录不存在');
  }

  // 6. 检查静态页面生成
  console.log('📄 检查静态页面生成...');
  const staticDir = path.join(buildDir, 'static');
  if (fs.existsSync(staticDir)) {
    const staticFiles = fs.readdirSync(staticDir);
    console.log(`📊 生成了 ${staticFiles.length} 个静态文件`);
  }

  // 7. 检查API路由
  console.log('🔌 检查API路由...');
  const apiDir = path.join(buildDir, 'server', 'pages', 'api');
  if (fs.existsSync(apiDir)) {
    const apiFiles = fs.readdirSync(apiDir);
    console.log(`🔌 生成了 ${apiFiles.length} 个API路由`);
  }

  // 8. 启动测试服务器
  console.log('🌐 启动测试服务器...');
  console.log('📝 测试完成后按 Ctrl+C 停止服务器');
  
  execSync('npm start', { stdio: 'inherit' });

} catch (error) {
  console.error('❌ 构建或测试过程中出现错误:', error.message);
  process.exit(1);
}

console.log('\n🎉 构建和测试完成！');
console.log('💡 提示: 检查以下项目以验证修复:');
console.log('   - 404错误页面是否正常显示');
console.log('   - 动态站点地图是否可访问 (/api/sitemap.xml)');
console.log('   - 语言特定页面是否正常加载');
console.log('   - 类别页面是否正常生成'); 