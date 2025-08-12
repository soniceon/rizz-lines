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

  // 图片优化
  images: {
    domains: ['rizzlines.org'],
    formats: ['image/webp', 'image/avif'],
  },
  // 压缩配置
  compress: true,
  // 生产环境优化
  swcMinify: true,
  // 添加安全头
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'Referrer-Policy',
            value: 'strict-origin-when-cross-origin',
          },
        ],
      },
    ];
  },
  // 重定向配置
  async redirects() {
    return [
      {
        source: '/generator',
        destination: '/generator/best-rizz-lines',
        permanent: true,
      },
    ];
  },
};

console.log('Next.js i18n 配置:', module.exports?.i18n);
