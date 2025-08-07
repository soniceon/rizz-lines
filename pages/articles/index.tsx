import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import Head from 'next/head';
import SiteHeader from '../../components/SiteHeader';
import SiteFooter from '../../components/SiteFooter';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

export default function ArticlesIndex() {
  const { t, i18n } = useTranslation('common');
  const [rizzData, setRizzData] = useState<any>(null);
  useEffect(() => {
    fetch(`/locales/${i18n.language}/rizzlines.json`)
      .then(res => res.json())
      .then(data => setRizzData(data));
  }, [i18n.language]);

  const allCategories = rizzData ? Object.keys(rizzData).map(name => ({
    label: name,
    slug: name.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '')
  })) : [];

  const MAIN_CATEGORIES = [
    t('smoothRizzLines'),
    t('funnyRizzLines'),
    t('modernRizzLines'),
    t('boldRizzLines'),
    t('classicRizzLines'),
    t('bestRizzLines'),
  ];
  const articles = [
    {
      title: t('article88Title'),
      slug: '88-corny-but-effective-pickup-lines',
      summary: t('article88Desc'),
    },
  ];
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Head>
        <title>Rizz Lines Articles - Pickup Lines Guides</title>
        <meta name="description" content="Read our comprehensive guides on rizz lines and pickup lines. Learn how to use them effectively." />
        <link rel="canonical" href="https://rizzlines.org/articles" />
      </Head>
      {/* 页面顶部插入<SiteHeader /> */}
      <SiteHeader />
      {/* 内容区 */}
      <main className="container mx-auto px-4 flex-1">
        <h1 className="text-3xl font-bold mb-6 text-center">{t('articles')}</h1>
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

export async function getStaticProps({ locale }: { locale: string }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ['common'])),
    },
  };
} 