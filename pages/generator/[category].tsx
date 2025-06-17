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
    .replace(/--+/g, '-');

// Helper function to de-slugify a URL component back to a title
const unslugify = (slug: string) => {
    const words = slug.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1));
    return words.join(' ');
}


interface RizzData {
  [key: string]: string[];
}

interface PageProps {
  category: string;
  allLines: string[];
  allCategories: string[];
}

// Function to get a random subset of an array
const getRandomSubset = (array: string[], size: number) => {
  const shuffled = [...array].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, size);
};

const CATEGORY_KEY_MAP: { [key: string]: string } = {
  'Best rizz lines': 'bestRizzLines',
  'Classic rizz lines': 'classicRizzLines',
  'Smooth rizz lines': 'smoothRizzLines',
  'Funny rizz lines': 'funnyRizzLines',
  'Bold rizz lines': 'boldRizzLines',
  'Modern rizz lines': 'modernRizzLines',
  'Cheesy Rizz Lines': 'cheesyRizzLines',
  'Rizz pick-up lines': 'rizzPickupLines',
  'Cute Rizz Lines': 'cuteRizzLines',
  'Dirty Pickup Lines to Use on Girl Over Text': 'dirtyPickupLinesToUseOnGirlOverText',
  'Dirty Pickup Lines to Make Her Laugh': 'dirtyPickupLinesToMakeHerLaugh',
};

const RizzGeneratorPage: NextPage<PageProps> = ({ category, allLines, allCategories }) => {
  const router = useRouter();
  const [displayedLines, setDisplayedLines] = useState<string[]>([]);
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);
  const { t } = useTranslation();

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

  const pageTitle = `${t(CATEGORY_KEY_MAP[category] || category)} | ${t('rizzLineGenerator')}`;
  const metaDescription = t('metaDescription', { category: t(CATEGORY_KEY_MAP[category] || category) });

  return (
    <>
      <Head>
        <title>{pageTitle}</title>
        <meta name="description" content={metaDescription} />
        <meta property="og:title" content={pageTitle} />
        <meta property="og:description" content={metaDescription} />
        <meta property="og:type" content="website" />
      </Head>

      <SiteHeader />

      <main className="container mx-auto px-4 py-12">
        <div className="text-center mb-10">
          <h1 className="text-4xl md:text-5xl font-extrabold mb-3">{t(CATEGORY_KEY_MAP[category] || category)} {t('generator')}</h1>
          <p className="text-lg text-gray-600">{t('clickToGetRandomLines')}</p>
        </div>
        
        <div className="max-w-4xl mx-auto">
          <div className="flex flex-col gap-6">
            {displayedLines.map((line, index) => {
              let text = '';
              const { locale } = router;
              if (typeof line === 'string') {
                text = line;
              } else if (typeof line === 'object' && line !== null) {
                text = line[locale as string] || line['en'] || '';
              }
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

export const getStaticPaths: GetStaticPaths = async (context) => {
  const { locales } = context;
  const filePath = path.join(process.cwd(), 'rizzlines.json');
  const jsonData = fs.readFileSync(filePath, 'utf-8');
  const data: RizzData = JSON.parse(jsonData);
  const categories = Object.keys(data);

  // 为每个语言都生成路径
  const paths = locales!.flatMap((locale) =>
    categories.map(category => ({
    params: { category: slugify(category) },
      locale,
    }))
  );

  return { paths, fallback: false };
};

export const getStaticProps: GetStaticProps = async ({ params, locale }) => {
  const categorySlug = params?.category as string;
  // 读取当前语言的 rizzlines.json
  const filePath = path.join(process.cwd(), 'public', 'locales', locale as string, 'rizzlines.json');
  const jsonData = fs.readFileSync(filePath, 'utf-8');
  const data: RizzData = JSON.parse(jsonData);

  const originalCategoryName = Object.keys(data).find(k => slugify(k) === categorySlug) || "Unknown";
  const allLines = data[originalCategoryName] || [];
  const allCategories = Object.keys(data);

  return {
    props: {
      category: unslugify(categorySlug),
      allLines,
      allCategories,
      ...(await serverSideTranslations(locale as string, ['common'])),
    },
  };
};

export default RizzGeneratorPage; 