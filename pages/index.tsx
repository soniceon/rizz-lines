import Head from 'next/head';
import SiteHeader from '../components/SiteHeader';
import SiteFooter from '../components/SiteFooter';
import RizzGenerator from '../components/rizz_generator';

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Head>
        <title>Rizz Lines Generator - Best Rizz Lines & Pickup Lines 2024</title>
        <meta name="description" content="Generate the best rizz lines for any situation. Our rizz lines generator provides 1000+ proven rizz lines and pickup lines for dating, apps, and real-life conversations." />
        <meta name="keywords" content="rizz lines, best rizz lines, rizz lines generator, pickup lines, smooth rizz lines, funny rizz lines, modern rizz lines" />
        <meta property="og:title" content="Rizz Lines Generator - Best Rizz Lines & Pickup Lines 2024" />
        <meta property="og:description" content="Generate the best rizz lines and pickup lines that actually work. Try our rizz lines generator for free and find your perfect rizz line!" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://www.rizzlines.org" />
        <meta name="twitter:card" content="summary_large_image" />
        <link rel="canonical" href="https://www.rizzlines.org" />
        <meta name="robots" content="index, follow" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
        <script type="application/ld+json">
          {`
          {
            "@context": "https://schema.org",
            "@type": "FAQPage",
            "mainEntity": [
              {
                "@type": "Question",
                "name": "How do I use rizz lines effectively?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Deliver with confidence and a smile. The right rizz line can start a great conversation!"
                }
              },
              {
                "@type": "Question",
                "name": "Can I use rizz lines on dating apps?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Absolutely! Our rizz lines are perfect for Tinder, Bumble, Hinge, and more."
                }
              }
            ]
          }
          `}
        </script>
      </Head>
      <SiteHeader />
      <main className="flex-1">
        <RizzGenerator />
      </main>
      <SiteFooter />
    </div>
  );
} 