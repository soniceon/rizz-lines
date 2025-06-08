import Head from 'next/head';
import RizzGenerator from '../components/rizz_generator';
import Link from 'next/link';

export default function Home() {
  return (
    <>
      <Head>
        <title>Rizz Lines - Best Rizz Lines Generator & Pickup Lines 2024</title>
        <meta name="description" content="Discover and generate the best rizz lines for any situation. Our rizz lines generator provides 1000+ proven rizz lines and pickup lines for dating, apps, and real-life conversations." />
        <meta name="keywords" content="rizz lines, best rizz lines, rizz lines generator, pickup lines, smooth rizz lines, funny rizz lines, modern rizz lines" />
        <meta property="og:title" content="Rizz Lines - Best Rizz Lines Generator & Pickup Lines 2024" />
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
      <main>
        <h1>Best Rizz Lines Generator</h1>
        <p>
          Welcome to the ultimate rizz lines generator! Here you can discover, generate, and use the best <strong>rizz lines</strong> for any occasion. Whether you need smooth, funny, or modern rizz lines, our collection of rizz lines will help you start great conversations and make real connections.
        </p>

        <h2>What are Rizz Lines?</h2>
        <p>
          Rizz lines are modern, witty pickup lines designed to break the ice and spark genuine conversations. Our rizz lines generator helps you find the perfect line for dating apps, social media, or real-life encounters.
        </p>

        <h2>Popular Rizz Lines Examples</h2>
        <ul>
          <li>Are you a magician? Because whenever I look at you, everyone else disappears.</li>
          <li>Are you Wi-Fi? Because I'm really feeling a connection.</li>
          <li>Do you have a map? I keep getting lost in your eyes.</li>
        </ul>

        <h2>Why Use Our Rizz Lines Generator?</h2>
        <ul>
          <li>1000+ proven rizz lines</li>
          <li>Categories for every style: smooth, funny, bold, and more</li>
          <li>Mobile-friendly and free to use</li>
        </ul>

        <h2>Frequently Asked Questions about Rizz Lines</h2>
        <h3>How do I use rizz lines effectively?</h3>
        <p>Deliver with confidence and a smile. The right rizz line can start a great conversation!</p>
        <h3>Can I use rizz lines on dating apps?</h3>
        <p>Absolutely! Our rizz lines are perfect for Tinder, Bumble, Hinge, and more.</p>

        <img src="/images/rizz-lines-example.jpg" alt="rizz lines generator" />

        <p>
          <Link href="/generator">Explore all rizz lines categories</Link>
          <br />
          <Link href="/articles">Read our rizz lines articles</Link>
        </p>

        <RizzGenerator />
      </main>
    </>
  );
} 