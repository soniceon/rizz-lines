const { i18n } = require('./next-i18next.config');
module.exports = {
  i18n,
};

console.log('Next.js 构建环境变量:', process.env);
console.log('Next.js i18n 配置:', module.exports?.i18n);
console.log('Next.js 页面路径:', module.exports?.pageExtensions);
