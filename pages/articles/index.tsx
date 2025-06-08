import Link from 'next/link';
import React from 'react';
import rizzData from '../../rizzlines.json';
import SiteHeader from '../../components/SiteHeader';
import SiteFooter from '../../components/SiteFooter';

const MAIN_CATEGORIES = [
  'Smooth rizz lines',
  'Funny rizz lines',
  'Modern rizz lines',
  'Bold rizz lines',
  'Classic rizz lines',
  'Best rizz lines',
];
const allCategories = Object.keys(rizzData).map(name => ({
  label: name,
  slug: name.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '')
}));

const articles = [
  {
    title: "88 Corny But Effective Pickup Lines",
    slug: "88-corny-but-effective-pickup-lines",
    summary: "A collection of 88 cheesy but effective pickup lines to boost your rizz.",
  },
  // 可继续添加其它文章
];

export default function ArticlesIndex() {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      {/* 页面顶部插入<SiteHeader /> */}
      <SiteHeader />
      {/* 内容区 */}
      <main className="container mx-auto px-4 flex-1">
        <h1 className="text-3xl font-bold mb-6 text-center">Articles</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {articles.map((article) => (
            <Link key={article.slug} href={`/articles/${article.slug}`}
              className="block bg-white rounded-lg shadow hover:shadow-lg transition p-6 text-center border border-pink-100 hover:border-pink-400">
              <span className="text-xl font-semibold text-pink-600">{article.title}</span>
              <p className="text-gray-500 mt-2">{article.summary}</p>
            </Link>
          ))}
        </div>
      </main>
      {/* 页面底部插入<SiteFooter /> */}
      <SiteFooter />
    </div>
  );
} 