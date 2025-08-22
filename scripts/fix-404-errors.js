#!/usr/bin/env node

/**
 * 404错误检测和修复脚本
 * 用于检测网站中可能存在的404错误链接
 */

const fs = require('fs');
const path = require('path');

// 检查文件是否存在
function checkFileExists(filePath) {
  try {
    return fs.existsSync(filePath);
  } catch (error) {
    return false;
  }
}

// 检查URL是否有效
async function checkUrl(url) {
  try {
    const response = await fetch(url);
    return response.status === 200;
  } catch (error) {
    return false;
  }
}

// 生成所有可能的URL
function generateAllUrls() {
  const baseUrl = 'https://rizzlines.org';
  const locales = ['en', 'zh', 'ja', 'ko', 'fr', 'de', 'ru', 'es', 'pt'];
  
  // 基础页面
  const basePages = [
    '/',
    '/generator',
    '/articles',
    '/404',
    '/500'
  ];
  
  // 语言页面
  const languagePages = locales.map(locale => `/${locale}`);
  
  // 类别页面（从rizzlines.json获取）
  let categoryPages = [];
  try {
    const rizzData = JSON.parse(fs.readFileSync('public/rizzlines.json', 'utf8'));
    const categories = Object.keys(rizzData);
    
    categoryPages = categories.flatMap(category => {
      const slug = category
        .toLowerCase()
        .replace(/\s+/g, '-')
        .replace(/[^\w-]/g, '');
      
      return [
        `/generator/${slug}`,
        ...locales.map(locale => `/${locale}/generator/${slug}`)
      ];
    });
  } catch (error) {
    console.error('Error reading rizzlines.json:', error);
  }
  
  // 特殊页面
  const specialPages = [
    '/zh/88-corny-but-effective-pickup-lines',
    '/ko/88-corny-but-effective-pickup-lines'
  ];
  
  return [
    ...basePages,
    ...languagePages,
    ...categoryPages,
    ...specialPages
  ].map(page => `${baseUrl}${page}`);
}

// 主函数
async function main() {
  console.log('🔍 开始检测404错误...');
  
  const urls = generateAllUrls();
  console.log(`📊 总共需要检查 ${urls.length} 个URL`);
  
  const results = [];
  const batchSize = 10; // 批量检查，避免过多并发请求
  
  for (let i = 0; i < urls.length; i += batchSize) {
    const batch = urls.slice(i, i + batchSize);
    const batchPromises = batch.map(async (url) => {
      const isValid = await checkUrl(url);
      return { url, isValid, status: isValid ? '✅' : '❌' };
    });
    
    const batchResults = await Promise.all(batchPromises);
    results.push(...batchResults);
    
    // 显示进度
    console.log(`进度: ${Math.min(i + batchSize, urls.length)}/${urls.length}`);
    
    // 避免请求过于频繁
    await new Promise(resolve => setTimeout(resolve, 1000));
  }
  
  // 分析结果
  const validUrls = results.filter(r => r.isValid);
  const invalidUrls = results.filter(r => !r.isValid);
  
  console.log('\n📈 检查结果:');
  console.log(`✅ 有效URL: ${validUrls.length}`);
  console.log(`❌ 无效URL: ${invalidUrls.length}`);
  
  if (invalidUrls.length > 0) {
    console.log('\n🚨 发现以下无效URL:');
    invalidUrls.forEach(({ url }) => {
      console.log(`  ${url}`);
    });
    
    // 生成修复建议
    console.log('\n💡 修复建议:');
    console.log('1. 检查Next.js路由配置');
    console.log('2. 确保所有动态页面都有正确的getStaticPaths');
    console.log('3. 检查重定向规则');
    console.log('4. 验证语言配置');
    
    // 保存结果到文件
    const report = {
      timestamp: new Date().toISOString(),
      totalUrls: urls.length,
      validUrls: validUrls.length,
      invalidUrls: invalidUrls.length,
      invalidUrlList: invalidUrls.map(r => r.url),
      suggestions: [
        '检查Next.js路由配置',
        '确保所有动态页面都有正确的getStaticPaths',
        '检查重定向规则',
        '验证语言配置'
      ]
    };
    
    fs.writeFileSync('404-check-report.json', JSON.stringify(report, null, 2));
    console.log('\n📄 详细报告已保存到 404-check-report.json');
  } else {
    console.log('\n🎉 恭喜！没有发现404错误！');
  }
}

// 运行脚本
if (require.main === module) {
  main().catch(console.error);
}

module.exports = { checkUrl, generateAllUrls }; 