import Head from 'next/head';
import SiteHeader from '../components/SiteHeader';
import SiteFooter from '../components/SiteFooter';
import RizzGenerator from '../components/rizz_generator';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useTranslation } from 'next-i18next';
import { useEffect, useState } from 'react';

export default function Home() {
  const { t, i18n } = useTranslation('common');
  const [rizzData, setRizzData] = useState<any>(null);
  useEffect(() => {
    const lang = i18n.language || 'en';
    fetch(`/locales/${lang}/rizzlines.json`)
      .then(res => res.json())
      .then(data => setRizzData(data));
  }, [i18n.language]);
  const mainCategories = [
    "Rizz pick-up lines",
    "Best rizz lines",
    "Smooth rizz lines",
    "Funny Rizz Lines",
    "Cheesy Rizz Lines",
    "Classic Rizz Lines"
  ];
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Head>
        <title>{t('seoTitle')}</title>
        <meta name="description" content={t('seoDescription')} />
        <meta name="keywords" content={t('seoKeywords')} />
        <meta property="og:title" content={t('seoTitle')} />
        <meta property="og:description" content={t('seoDescription')} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://www.rizzlines.org" />
        <meta name="twitter:card" content="summary_large_image" />
        <link rel="canonical" href="https://www.rizzlines.org" />
        <meta name="robots" content="index, follow" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "FAQPage",
          "mainEntity": [
            {
              "@type": "Question",
              "name": t('faq1Q'),
              "acceptedAnswer": { "@type": "Answer", "text": t('faq1A') }
            },
            {
              "@type": "Question",
              "name": t('faq2Q'),
              "acceptedAnswer": { "@type": "Answer", "text": t('faq2A') }
            }
          ]
        }) }} />
      </Head>
      <SiteHeader />
      <main className="flex-1">
        <RizzGenerator rizzData={rizzData} />
      </main>
      <SiteFooter />
    </div>
  );
}

export async function getStaticProps({ locale = 'en' }: { locale?: string }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ['common'])),
    },
  };
} 