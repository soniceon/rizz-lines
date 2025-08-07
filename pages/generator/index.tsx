import Link from 'next/link';
import React from 'react';
import Head from 'next/head';
import rizzData from '../../rizzlines.json';
import SiteHeader from '../../components/SiteHeader';
import SiteFooter from '../../components/SiteFooter';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { GetStaticProps } from 'next';

interface CategoryMap {
  [key: string]: string;
}

const CATEGORY_KEY_MAP: CategoryMap = {
  // Main categories
  'Best rizz lines': 'bestRizzLines',
  'Classic Rizz Lines': 'classicRizzLines',
  'Smooth rizz lines': 'smoothRizzLines',
  'Funny Rizz Lines': 'funnyRizzLines',
  'Bold rizz lines': 'boldRizzLines',
  'Modern rizz lines': 'modernRizzLines',
  'Cheesy Rizz Lines': 'cheesyRizzLines',
  'Rizz pick-up lines': 'rizzPickupLines',
  'Cute Rizz Lines': 'cuteRizzLines',
  'Flirty Rizz Lines': 'flirtyRizzLines',
  'Romantic Rizz Lines': 'romanticRizzLines',
  'Steamy Rizz Lines': 'steamyRizzLines',
  'Creative Rizz Lines': 'creativeRizzLines',
  'Poetic Rizz Lines': 'poeticRizzLines',
  'Clever Rizz Lines': 'cleverRizzLines',
  'Witty Rizz Lines To Say': 'wittyRizzLinesToSay',
  
  // Tinder categories
  'Funny Tinder pickup lines': 'funnyTinderPickupLines',
  'Cheesy Tinder pickup lines': 'cheesyTinderPickupLines',
  'Genuine Tinder pickup lines': 'genuineTinderPickupLines',
  'Tinder pickup lines for guys': 'tinderPickupLinesForGuys',
  'Tinder pickup lines for girls': 'tinderPickupLinesForGirls',
  
  // Rizz pick-up categories
  'Bold rizz pick-up lines': 'boldRizzPickUpLines',
  'Flirty rizz pick-up lines': 'flirtyRizzPickUpLines',
  'Corny rizz pick-up lines': 'cornyRizzPickUpLines',
  
  // Dirty pickup categories
  'Dirty Pickup Lines': 'dirtyPickupLines',
  'Dirty Pickup Lines for Him': 'dirtyPickupLinesForHim',
  'Dirty Pickup Lines for Her': 'dirtyPickupLinesForHer',
  'Dirty Pickup Lines To Use on Girl Over Text': 'dirtyPickupLinesToUseOnGirlOverText',
  'Dirty Pickup Lines To Make Her Laugh': 'dirtyPickupLinesToMakeHerLaugh',
  
  // Other pickup categories
  'Sexy Pick Up Lines': 'sexyPickUpLines',
  'Flirty Pick Up Lines': 'flirtyPickUpLines',
  'Corny Pick Up Lines': 'cornyPickUpLines',
  
  // Language-specific categories
  '中文搭讪话术': 'chinesePickUpLines',
  '日本語のナンパフレーズ': 'japanesePickUpLines',
  '한국어 대화 문구': 'koreanPickUpLines',
  "Phrases d'accroche en français": 'frenchPickUpLines',
  'Frases para ligar en español': 'spanishPickUpLines',
  'Deutsche Anmachsprüche': 'germanPickUpLines'
};

// 创建一个反向映射，用于从翻译键到类别名称
const REVERSE_CATEGORY_MAP = Object.entries(CATEGORY_KEY_MAP).reduce((acc, [key, value]) => {
  acc[value] = key;
  return acc;
}, {} as { [key: string]: string });

const categories = Object.keys(rizzData).map((name) => ({
  name,
  slug: name.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, ''),
  translationKey: CATEGORY_KEY_MAP[name] || name
}));

const MAIN_CATEGORIES = [
  { label: 'Smooth rizz lines', slug: 'smooth-rizz-lines', translationKey: 'smoothRizzLines' },
  { label: 'Funny rizz lines', slug: 'funny-rizz-lines', translationKey: 'funnyRizzLines' },
  { label: 'Modern rizz lines', slug: 'modern-rizz-lines', translationKey: 'modernRizzLines' },
  { label: 'Bold rizz lines', slug: 'bold-rizz-lines', translationKey: 'boldRizzLines' },
  { label: 'Classic rizz lines', slug: 'classic-rizz-lines', translationKey: 'classicRizzLines' },
  { label: 'Best rizz lines', slug: 'best-rizz-lines', translationKey: 'bestRizzLines' },
];

export default function GeneratorIndex() {
  const { t, i18n } = useTranslation('common');

  // 根据当前语言选择显示的类别名称
  const getDisplayName = (category: { name: string; translationKey: string }) => {
    const translatedName = t(category.translationKey);
    // 如果翻译键返回的是原始键（即没有翻译），则使用原始类别名称
    return translatedName === category.translationKey ? category.name : translatedName;
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Head>
        <title>Rizz Lines Generator - Pickup Lines Categories</title>
        <meta name="description" content="Browse all categories of rizz lines and pickup lines. Find the perfect category for your situation." />
        <link rel="canonical" href="https://rizzlines.org/generator" />
      </Head>
      <SiteHeader />
      <main className="container mx-auto px-4">
        <h1 className="text-3xl font-bold mb-6 text-center">{t('categoriesTitle')}</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {categories.map((cat) => (
            <Link key={cat.slug} href={`/generator/${cat.slug}`}
              className="block bg-white rounded-lg shadow hover:shadow-lg transition p-6 text-center border border-pink-100 hover:border-pink-400">
              <span className="text-xl font-semibold text-pink-600">{getDisplayName(cat)}</span>
            </Link>
          ))}
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}

export const getStaticProps: GetStaticProps = async ({ locale = 'en' }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale, ['common'])),
    },
  };
} 