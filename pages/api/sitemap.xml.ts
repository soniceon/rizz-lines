import { NextApiRequest, NextApiResponse } from 'next';
import rizzData from '../../public/rizzlines.json';

// 根据实际数据结构定义类型
type RizzData = {
  [key: string]: string[];
};

// Helper function to generate a URL-friendly slug from a category name
const slugify = (text: string) =>
  text
    .toString()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .trim()
    .replace(/\s+/g, '-')
    .replace(/[^\w-]+/g, '')
    .replace(/--+/g, '-')
    .replace(/^-+|-+$/g, '');

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') {
    res.status(405).json({ message: 'Method not allowed' });
    return;
  }

  try {
    const baseUrl = 'https://rizzlines.org';
    const currentDate = new Date().toISOString().split('T')[0];
    
    // 基础页面
    const basePages = [
      { url: '/', priority: '1.0', changefreq: 'daily' },
      { url: '/generator', priority: '0.9', changefreq: 'weekly' },
      { url: '/articles', priority: '0.8', changefreq: 'weekly' },
    ];

    // 语言页面
    const locales = ['en', 'zh', 'ja', 'ko', 'fr', 'de', 'ru', 'es', 'pt'];
    const languagePages = locales.map(locale => ({
      url: `/${locale}`,
      priority: '0.9',
      changefreq: 'daily'
    }));

    // 类别页面
    const categories = Object.keys(rizzData as RizzData);
    const categoryPages = categories.flatMap(category => {
      const slug = slugify(category);
      if (!slug) return [];
      
      return locales.map(locale => ({
        url: `/${locale}/generator/${slug}`,
        priority: '0.8',
        changefreq: 'weekly'
      }));
    });

    // 生成XML
    const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${basePages.map(page => `
  <url>
    <loc>${baseUrl}${page.url}</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>${page.changefreq}</changefreq>
    <priority>${page.priority}</priority>
  </url>`).join('')}
${languagePages.map(page => `
  <url>
    <loc>${baseUrl}${page.url}</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>${page.changefreq}</changefreq>
    <priority>${page.priority}</priority>
  </url>`).join('')}
${categoryPages.map(page => `
  <url>
    <loc>${baseUrl}${page.url}</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>${page.changefreq}</changefreq>
    <priority>${page.priority}</priority>
  </url>`).join('')}
</urlset>`;

    res.setHeader('Content-Type', 'application/xml');
    res.setHeader('Cache-Control', 'public, max-age=3600, s-maxage=3600');
    res.status(200).send(xml);
  } catch (error) {
    console.error('Error generating sitemap:', error);
    res.status(500).json({ message: 'Error generating sitemap' });
  }
} 