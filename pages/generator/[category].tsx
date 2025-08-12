import { GetStaticPaths, GetStaticProps, NextPage } from 'next';
import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import path from 'path';
import fs from 'fs';
// @ts-ignore
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import SiteHeader from '../../components/SiteHeader';
import SiteFooter from '../../components/SiteFooter';
import { Button } from "../../@/components/ui/button";
import { Copy, Check } from "lucide-react";
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useTranslation } from 'next-i18next';
import rizzData from '../../rizzlines.json';

interface RizzLine {
  en: string;
  zh: string;
  fr: string;
  de: string;
  ja: string;
  ko: string;
  ru: string;
  es: string;
  pt: string;
}

interface RizzCategory {
  [key: string]: RizzLine[];
}

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
    .replace(/^-+|-+$/g, ''); // Remove leading/trailing hyphens

// Helper function to de-slugify a URL component back to a title
const unslugify = (slug: string) => {
  const words = slug.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1));
  return words.join(' ');
};

interface PageProps {
  category: string;
  allLines: RizzLine[];
  allCategories: { name: string; slug: string; }[];
}

// Function to get a random subset of an array
const getRandomSubset = <T,>(array: T[], size: number): T[] => {
  const shuffled = [...array].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, size);
};

const CATEGORY_KEY_MAP: { [key: string]: string } = {
  'best rizz lines': 'bestRizzLines',
  'classic rizz lines': 'classicRizzLines',
  'smooth rizz lines': 'smoothRizzLines',
  'funny rizz lines': 'funnyRizzLines',
  'bold rizz lines': 'boldRizzLines',
  'modern rizz lines': 'modernRizzLines',
  'cheesy rizz lines': 'cheesyRizzLines',
  'rizz pick-up lines': 'rizzPickupLines',
  'cute rizz lines': 'cuteRizzLines',
  'dirty pickup lines to use on girl over text': 'dirtyPickupLinesToUseOnGirlOverText',
  'dirty pickup lines to make her laugh': 'dirtyPickupLinesToMakeHerLaugh',
  'deutsche anmachsprche': 'germanPickUpLines', // Handle URL encoding issue
  'frases para ligar en espaol': 'spanishPickUpLines', // Handle URL encoding issue
  'phrases daccroche en franais': 'frenchPickUpLines', // Handle URL encoding issue
};

const RizzGeneratorPage: NextPage<PageProps> = ({ category, allLines, allCategories }) => {
  const router = useRouter();
  const [displayedLines, setDisplayedLines] = useState<RizzLine[]>([]);
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);
  const { t } = useTranslation();

  if (process.env.NODE_ENV !== 'production') {
    console.log('category:', category);
    console.log('allLines length:', allLines?.length);
    console.log('allCategories length:', allCategories?.length);
  }

  useEffect(() => {
    if (allLines) {
      setDisplayedLines(getRandomSubset(allLines, 5));
    }
  }, [allLines]);

  const generateMore = () => {
    setDisplayedLines(getRandomSubset(allLines, 5));
  };

  if (router.isFallback) {
    return <div>Loading...</div>;
  }

  const categoryKey = CATEGORY_KEY_MAP[category.toLowerCase()] || category;
  const translatedCategory = t(categoryKey);
  const pageTitle = `${translatedCategory} | ${t('rizzLineGenerator')}`;
  const metaDescription = t('metaDescription', { category: translatedCategory });

  return (
    <>
      <Head>
        <title>{t('categoryGeneratorTitle', { category })} | Rizz Lines Generator</title>
        <meta name="description" content={t('categoryGeneratorDesc')} />
        <meta property="og:title" content={pageTitle} />
        <meta property="og:description" content={metaDescription} />
        <meta property="og:type" content="website" />
        <link rel="canonical" href={`https://rizzlines.org/generator/${category}`} />
        {/* hreflang for locales */}
        {['en','zh','ja','ko','fr','de','es','pt','ru'].map(loc => (
          <link key={loc} rel="alternate" hrefLang={loc} href={`https://rizzlines.org/${loc}/generator/${slugify(category)}`} />
        ))}
        <link rel="alternate" hrefLang="x-default" href={`https://rizzlines.org/generator/${slugify(category)}`} />
      </Head>

      <SiteHeader />

      <main className="container mx-auto px-4 py-12">
        <div className="text-center mb-10">
          <h1 className="text-4xl md:text-5xl font-extrabold mb-3">{translatedCategory} {t('generator')}</h1>
          <p className="text-lg text-gray-600">{t('clickToGetRandomLines')}</p>
        </div>
        
        <div className="max-w-4xl mx-auto">
          <div className="flex flex-col gap-6">
            {displayedLines.map((line, index) => {
              const { locale } = router;
              const text = line[locale as keyof RizzLine] || line.en;
              return (
                <Card
                  key={index}
                  className="bg-gradient-to-br from-purple-100 via-pink-100 to-indigo-100 shadow-xl rounded-2xl transition-transform hover:scale-105 border-0"
                >
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg font-bold text-purple-700">{t('rizzLine')}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center gap-3">
                      <p className="text-gray-800 text-base italic mb-2 flex-1">"{text}"</p>
                      <Button
                        type="button"
                        size="sm"
                        variant="secondary"
                        className="shrink-0"
                        onClick={() => {
                          navigator.clipboard.writeText(text);
                          setCopiedIndex(index);
                          setTimeout(() => setCopiedIndex(null), 2000);
                        }}
                        title={t('copyToClipboard')}
                      >
                        {copiedIndex === index ? (
                          <Check className="w-4 h-4 mr-1 text-green-500" />
                        ) : (
                          <Copy className="w-4 h-4 mr-1" />
                        )}
                        {copiedIndex === index ? t('copied') : t('copy')}
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>

          <div className="text-center mt-10">
            <button
              onClick={generateMore}
              className="bg-gradient-to-r from-purple-600 to-pink-600 text-white font-bold py-3 px-8 rounded-full hover:from-purple-700 hover:to-pink-700 transition-all duration-300 transform hover:scale-110 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-opacity-50 shadow-lg"
            >
              {t('generateMore')}
            </button>
          </div>
        </div>
      </main>

      <SiteFooter />
    </>
  );
};

export const getStaticPaths: GetStaticPaths = async () => {
  const categories = Object.keys(rizzData as RizzCategory).map(cat => ({
    name: cat,
    slug: slugify(cat)
  }));
  const validCategories = categories.filter(cat => 
    cat.slug && 
    cat.slug !== '' && 
    cat.slug !== '-'
  );
  
  // 确保所有语言版本都有对应的路径
  const locales = ['en', 'zh', 'ja', 'ko', 'fr', 'de', 'ru', 'es', 'pt'];
  const paths = locales.flatMap(locale => 
    validCategories.map(cat => ({
      params: { category: cat.slug },
      locale
    }))
  );
  
  // 添加默认语言路径（不带locale前缀）
  const defaultPaths = validCategories.map(cat => ({
    params: { category: cat.slug },
    locale: undefined
  }));
  
  const allPaths = [...paths, ...defaultPaths];
  
  console.log('Generated paths:', allPaths.length);
  
  return {
    paths: allPaths,
    fallback: 'blocking' // 改为blocking以支持动态生成
  };
};

export const getStaticProps: GetStaticProps = async ({ params, locale = 'en' }) => {
  try {
    const category = Object.keys(rizzData as RizzCategory).find(cat => slugify(cat) === params?.category);
    
    if (!category) {
      console.error('Category not found for params:', params);
      return {
        notFound: true
      };
    }
    
    const allLines = (rizzData as RizzCategory)[category];
    if (!allLines || allLines.length === 0) {
      console.error('allLines is empty for category:', category);
      return {
        notFound: true
      };
    }
    
    const allCategories = Object.keys(rizzData as RizzCategory).map(cat => ({
      name: cat,
      slug: slugify(cat)
    }));
    
    return {
      props: {
        category,
        allLines,
        allCategories,
        ...(await serverSideTranslations(locale, ['common']))
      },
      revalidate: 3600 // 1小时重新验证
    };
  } catch (error) {
    console.error('Error in getStaticProps:', error);
    return {
      notFound: true
    };
  }
};

export default RizzGeneratorPage; 