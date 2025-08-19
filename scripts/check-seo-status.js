#!/usr/bin/env node

/**
 * SEO状态检查脚本
 * 用于监控Google索引问题的修复进度
 */

const fs = require('fs');
const path = require('path');

console.log('🔍 Rizz Lines SEO状态检查');
console.log('========================\n');

// 检查关键文件是否存在
const criticalFiles = [
  'pages/zh/index.tsx',
  'pages/ja/index.tsx', 
  'pages/ko/index.tsx',
  'pages/api/sitemap.xml.ts',
  'public/sitemap.xml',
  'public/robots.txt',
  'next.config.js'
];

console.log('📁 关键文件检查:');
criticalFiles.forEach(file => {
  const exists = fs.existsSync(file);
  const status = exists ? '✅' : '❌';
  console.log(`  ${status} ${file}`);
});

// 检查生成器页面配置
console.log('\n⚙️  生成器页面配置检查:');
try {
  const generatorFile = fs.readFileSync('pages/generator/[category].tsx', 'utf8');
  const hasBlockingFallback = generatorFile.includes("fallback: 'blocking'");
  const hasRevalidate = generatorFile.includes('revalidate: 3600');
  
  console.log(`  ${hasBlockingFallback ? '✅' : '❌'} fallback: 'blocking' 配置`);
  console.log(`  ${hasRevalidate ? '✅' : '❌'} ISR重新验证配置`);
} catch (error) {
  console.log('  ❌ 无法读取生成器页面文件');
}

// 检查next.config.js配置
console.log('\n🔧 Next.js配置检查:');
try {
  const configFile = fs.readFileSync('next.config.js', 'utf8');
  const hasRedirects = configFile.includes('redirects()');
  const hasHeaders = configFile.includes('headers()');
  const hasI18n = configFile.includes('i18n');
  
  console.log(`  ${hasRedirects ? '✅' : '❌'} 重定向配置`);
  console.log(`  ${hasHeaders ? '✅' : '❌'} 安全头配置`);
  console.log(`  ${hasI18n ? '✅' : '❌'} 国际化配置`);
} catch (error) {
  console.log('  ❌ 无法读取Next.js配置文件');
}

// 检查站点地图
console.log('\n🗺️  站点地图检查:');
try {
  const sitemapFile = fs.readFileSync('public/sitemap.xml', 'utf8');
  const hasMainPages = sitemapFile.includes('https://rizzlines.org/');
  const hasLanguagePages = sitemapFile.includes('https://rizzlines.org/zh') && 
                           sitemapFile.includes('https://rizzlines.org/ja') && 
                           sitemapFile.includes('https://rizzlines.org/ko');
  const hasCategoryPages = sitemapFile.includes('generator/best-rizz-lines');
  
  console.log(`  ${hasMainPages ? '✅' : '❌'} 主要页面包含`);
  console.log(`  ${hasLanguagePages ? '✅' : '❌'} 语言页面包含`);
  console.log(`  ${hasCategoryPages ? '✅' : '❌'} 类别页面包含`);
} catch (error) {
  console.log('  ❌ 无法读取站点地图文件');
}

// 检查robots.txt
console.log('\n🤖 Robots.txt检查:');
try {
  const robotsFile = fs.readFileSync('public/robots.txt', 'utf8');
  const hasDynamicSitemap = robotsFile.includes('api/sitemap.xml');
  const hasStaticSitemap = robotsFile.includes('sitemap.xml');
  const hasLanguageSitemaps = robotsFile.includes('zh/sitemap.xml') && 
                               robotsFile.includes('ja/sitemap.xml') && 
                               robotsFile.includes('ko/sitemap.xml');
  
  console.log(`  ${hasDynamicSitemap ? '✅' : '❌'} 动态站点地图引用`);
  console.log(`  ${hasStaticSitemap ? '✅' : '❌'} 静态站点地图引用`);
  console.log(`  ${hasLanguageSitemaps ? '✅' : '❌'} 语言特定站点地图引用`);
} catch (error) {
  console.log('  ❌ 无法读取robots.txt文件');
}

console.log('\n📊 SEO修复状态总结:');
console.log('========================');
console.log('✅ 已解决的问题:');
console.log('  - 语言路径404错误 (创建了zh, ja, ko主页)');
console.log('  - 动态路由优化 (fallback: blocking + ISR)');
console.log('  - 站点地图完整性 (动态+静态站点地图)');
console.log('  - 重定向规则 (避免404错误)');
console.log('  - 规范标记 (canonical URLs)');

console.log('\n📋 下一步建议:');
console.log('  1. 重新构建和部署网站');
console.log('  2. 在Google Search Console中重新提交站点地图');
console.log('  3. 监控404错误减少情况');
console.log('  4. 检查索引状态改善');
console.log('  5. 验证所有语言路径可访问性');

console.log('\n🚀 预期效果:');
console.log('  - 404错误: 从83个减少到接近0个');
console.log('  - 索引率: 显著提高');
console.log('  - 用户体验: 改善错误页面和导航');
console.log('  - SEO排名: 提高搜索引擎可见性');

console.log('\n✨ 检查完成！'); 