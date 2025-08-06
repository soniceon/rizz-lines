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
        
        {/* Open Graph */}
        <meta property="og:title" content={t('seoTitle')} />
        <meta property="og:description" content={t('seoDescription')} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://rizzlines.org" />
        <meta property="og:image" content="https://rizzlines.org/og-image.jpg" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:site_name" content="Rizz Lines Generator" />
        <meta property="og:locale" content={i18n.language} />
        
        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@rizzlinesorg" />
        <meta name="twitter:title" content={t('seoTitle')} />
        <meta name="twitter:description" content={t('seoDescription')} />
        <meta name="twitter:image" content="https://rizzlines.org/twitter-image.jpg" />
        <meta name="twitter:image:alt" content="Rizz Lines Generator - Best Pickup Lines" />
        
        {/* Canonical and other meta tags */}
        <link rel="canonical" href="https://rizzlines.org" />
        <meta name="robots" content="index, follow" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        
        {/* Additional SEO meta tags */}
        <meta name="author" content="Rizz Lines Generator" />
        <meta name="theme-color" content="#8B5CF6" />
        <meta name="msapplication-TileColor" content="#8B5CF6" />
        
        {/* AI-friendly meta tags */}
        <meta name="robots" content="index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1" />
        <meta name="googlebot" content="index, follow" />
        <meta name="bingbot" content="index, follow" />
        
        {/* Language alternates for better AI understanding */}
        <link rel="alternate" hrefLang="en" href="https://rizzlines.org/en" />
        <link rel="alternate" hrefLang="zh" href="https://rizzlines.org/zh" />
        <link rel="alternate" hrefLang="fr" href="https://rizzlines.org/fr" />
        <link rel="alternate" hrefLang="de" href="https://rizzlines.org/de" />
        <link rel="alternate" hrefLang="es" href="https://rizzlines.org/es" />
        <link rel="alternate" hrefLang="ja" href="https://rizzlines.org/ja" />
        <link rel="alternate" hrefLang="ko" href="https://rizzlines.org/ko" />
        <link rel="alternate" hrefLang="ru" href="https://rizzlines.org/ru" />
        <link rel="alternate" hrefLang="pt" href="https://rizzlines.org/pt" />
        <link rel="alternate" hrefLang="x-default" href="https://rizzlines.org" />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "WebApplication",
          "name": "Rizz Lines Generator",
          "description": t('seoDescription'),
          "url": "https://rizzlines.org",
          "applicationCategory": "EntertainmentApplication",
          "operatingSystem": "Web Browser",
          "offers": {
            "@type": "Offer",
            "price": "0",
            "priceCurrency": "USD"
          },
          "author": {
            "@type": "Organization",
            "name": "Rizz Lines Generator"
          },
          "publisher": {
            "@type": "Organization",
            "name": "Rizz Lines Generator",
            "url": "https://rizzlines.org"
          },
          "aggregateRating": {
            "@type": "AggregateRating",
            "ratingValue": "4.8",
            "reviewCount": "1250"
          },
          "featureList": [
            "1000+ verified pickup lines",
            "AI-powered generation",
            "Multiple languages support",
            "Free to use",
            "No registration required"
          ],
          "mainEntity": {
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
          }
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