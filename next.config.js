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
  // 启用ISR支持
  experimental: {
    isrMemoryCacheSize: 0,
  },
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
          {
            key: 'X-Robots-Tag',
            value: 'index, follow',
          },
        ],
      },
      {
        source: '/api/sitemap.xml',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=3600, s-maxage=3600',
          },
        ],
      },
      {
        source: '/api/generator/sitemap.xml',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=3600, s-maxage=3600',
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
      // 语言路径重定向，避免404
      {
        source: '/zh/generator',
        destination: '/zh/generator/best-rizz-lines',
        permanent: true,
      },
      {
        source: '/ja/generator',
        destination: '/ja/generator/best-rizz-lines',
        permanent: true,
      },
      {
        source: '/ko/generator',
        destination: '/ko/generator/best-rizz-lines',
        permanent: true,
      },
      // 旧URL重定向到新URL
      {
        source: '/generator/best-rizz-lines',
        destination: '/generator/best-rizz-lines',
        permanent: false,
      },
      // 避免404的重定向
      {
        source: '/zh/88-corny-but-effective-pickup-lines',
        destination: '/ko/88-corny-but-effective-pickup-lines',
        permanent: false,
      },
      // 站点地图重定向
      {
        source: '/sitemap.xml',
        destination: '/api/sitemap.xml',
        permanent: false,
      },
      {
        source: '/generator/sitemap.xml',
        destination: '/api/generator/sitemap.xml',
        permanent: false,
      },
    ];
  },
};

console.log('Next.js i18n 配置:', module.exports?.i18n);
