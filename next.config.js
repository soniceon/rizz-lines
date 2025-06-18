if (process.env.NODE_ENV === 'production') {
  const origLog = console.log;
  console.log = function (...args) {
    for (const arg of args) {
      // 如果是对象且有 groups 字段
      if (arg && typeof arg === 'object' && arg.groups) {
        console.trace('groups log stack (object with groups field)');
      }
      // 如果是字符串且包含 groups: [
      if (typeof arg === 'string' && arg.includes('groups: [')) {
        console.trace('groups log stack (string includes groups: [)');
      }
    }
    origLog.apply(console, args);
  };
}

const { i18n } = require('./next-i18next.config');
module.exports = {
  i18n,
};

console.log('Next.js 构建环境变量:', process.env);
console.log('Next.js i18n 配置:', module.exports?.i18n);
console.log('Next.js 页面路径:', module.exports?.pageExtensions);
