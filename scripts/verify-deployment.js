#!/usr/bin/env node

/**
 * 部署验证脚本
 * 验证所有SEO修复是否正确生效
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

// 检查文件内容
function checkFileContent(filePath, expectedContent) {
  try {
    const content = fs.readFileSync(filePath, 'utf8');
    return content.includes(expectedContent);
  } catch (error) {
    return false;
  }
}

// 验证项目结构
function validateProjectStructure() {
  console.log('🔍 验证项目结构...');
  
  const requiredFiles = [
    'pages/api/sitemap.xml.ts',
    'pages/api/generator/sitemap.xml.ts',
    'public/robots.txt',
    'public/sitemap.xml',
    'components/SEOHead.tsx',
    'next.config.js',
    'pages/404.tsx',
    'pages/500.tsx',
    'pages/zh/index.tsx',
    'pages/ja/index.tsx',
    'pages/ko/index.tsx',
    'pages/generator/[category].tsx'
  ];
  
  const missingFiles = [];
  const existingFiles = [];
  
  requiredFiles.forEach(file => {
    if (checkFileExists(file)) {
      existingFiles.push(file);
      console.log(`  ✅ ${file}`);
    } else {
      missingFiles.push(file);
      console.log(`  ❌ ${file}`);
    }
  });
  
  console.log(`\n📊 文件检查结果: ${existingFiles.length}/${requiredFiles.length} 文件存在`);
  
  if (missingFiles.length > 0) {
    console.log('\n🚨 缺失文件:');
    missingFiles.forEach(file => console.log(`  - ${file}`));
  }
  
  return { existingFiles, missingFiles };
}

// 验证配置文件
function validateConfigFiles() {
  console.log('\n🔍 验证配置文件...');
  
  const configChecks = [
    {
      file: 'next.config.js',
      checks: [
        { name: 'ISR支持', content: 'experimental' },
        { name: '重定向规则', content: 'redirects' },
        { name: '安全头', content: 'headers' }
      ]
    },
    {
      file: 'public/robots.txt',
      checks: [
        { name: '站点地图引用', content: 'Sitemap:' },
        { name: '爬虫规则', content: 'User-agent:' }
      ]
    }
  ];
  
  const results = [];
  
  configChecks.forEach(config => {
    console.log(`\n检查 ${config.file}:`);
    config.checks.forEach(check => {
      const isValid = checkFileContent(config.file, check.content);
      const status = isValid ? '✅' : '❌';
      console.log(`  ${status} ${check.name}`);
      results.push({ file: config.file, check: check.name, valid: isValid });
    });
  });
  
  return results;
}

// 验证API端点
function validateAPIEndpoints() {
  console.log('\n🔍 验证API端点...');
  
  const endpoints = [
    '/api/sitemap.xml',
    '/api/generator/sitemap.xml'
  ];
  
  const results = [];
  
  endpoints.forEach(endpoint => {
    // 这里只是检查文件是否存在，实际部署后需要检查HTTP响应
    const filePath = `pages${endpoint}.ts`;
    const exists = checkFileExists(filePath);
    const status = exists ? '✅' : '❌';
    console.log(`  ${status} ${endpoint} (${filePath})`);
    results.push({ endpoint, filePath, exists });
  });
  
  return results;
}

// 验证SEO组件
function validateSEOComponents() {
  console.log('\n🔍 验证SEO组件...');
  
  const seoChecks = [
    {
      file: 'components/SEOHead.tsx',
      checks: [
        { name: '基础SEO', content: 'meta name="description"' },
        { name: 'Open Graph', content: 'og:title' },
        { name: 'Twitter Card', content: 'twitter:card' },
        { name: '结构化数据', content: 'application/ld+json' }
      ]
    }
  ];
  
  const results = [];
  
  seoChecks.forEach(component => {
    console.log(`\n检查 ${component.file}:`);
    component.checks.forEach(check => {
      const isValid = checkFileContent(component.file, check.content);
      const status = isValid ? '✅' : '❌';
      console.log(`  ${status} ${check.name}`);
      results.push({ file: component.file, check: check.name, valid: isValid });
    });
  });
  
  return results;
}

// 生成验证报告
function generateReport(structureResult, configResult, apiResult, seoResult) {
  const report = {
    timestamp: new Date().toISOString(),
    summary: {
      totalFiles: structureResult.existingFiles.length + structureResult.missingFiles.length,
      existingFiles: structureResult.existingFiles.length,
      missingFiles: structureResult.missingFiles.length,
      configValid: configResult.filter(r => r.valid).length,
      configTotal: configResult.length,
      apiValid: apiResult.filter(r => r.exists).length,
      apiTotal: apiResult.length,
      seoValid: seoResult.filter(r => r.valid).length,
      seoTotal: seoResult.length
    },
    details: {
      structure: structureResult,
      config: configResult,
      api: apiResult,
      seo: seoResult
    },
    recommendations: []
  };
  
  // 生成建议
  if (structureResult.missingFiles.length > 0) {
    report.recommendations.push('创建缺失的文件');
  }
  
  if (configResult.filter(r => !r.valid).length > 0) {
    report.recommendations.push('修复配置文件问题');
  }
  
  if (apiResult.filter(r => !r.exists).length > 0) {
    report.recommendations.push('创建缺失的API端点');
  }
  
  if (seoResult.filter(r => !r.valid).length > 0) {
    report.recommendations.push('完善SEO组件');
  }
  
  return report;
}

// 主函数
function main() {
  console.log('🚀 开始部署验证...\n');
  
  const structureResult = validateProjectStructure();
  const configResult = validateConfigFiles();
  const apiResult = validateAPIEndpoints();
  const seoResult = validateSEOComponents();
  
  // 生成报告
  const report = generateReport(structureResult, configResult, apiResult, seoResult);
  
  // 显示总结
  console.log('\n📊 验证总结:');
  console.log(`  项目结构: ${report.summary.existingFiles}/${report.summary.totalFiles}`);
  console.log(`  配置文件: ${report.summary.configValid}/${report.summary.configTotal}`);
  console.log(`  API端点: ${report.summary.apiValid}/${report.summary.apiTotal}`);
  console.log(`  SEO组件: ${report.summary.seoValid}/${report.summary.seoTotal}`);
  
  // 显示建议
  if (report.recommendations.length > 0) {
    console.log('\n💡 建议:');
    report.recommendations.forEach(rec => console.log(`  - ${rec}`));
  } else {
    console.log('\n🎉 所有检查都通过了！项目已准备就绪！');
  }
  
  // 保存报告
  fs.writeFileSync('deployment-verification-report.json', JSON.stringify(report, null, 2));
  console.log('\n📄 详细报告已保存到 deployment-verification-report.json');
  
  return report;
}

// 运行脚本
if (require.main === module) {
  main();
}

module.exports = {
  validateProjectStructure,
  validateConfigFiles,
  validateAPIEndpoints,
  validateSEOComponents,
  generateReport
}; 