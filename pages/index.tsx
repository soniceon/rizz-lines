import Head from 'next/head';
import RizzGenerator from '../components/rizz_generator';

export default function Home() {
  return (
    <>
      <Head>
        <title>Best Rizz Lines Generator - 1000+ Proven Pickup Lines That Work</title>
        <meta name="description" content="Generate the best rizz lines and pickup lines that actually work. Our AI-powered generator provides 1000+ proven lines for dating apps and real-life conversations." />
        <meta name="keywords" content="rizz lines, pickup lines, dating lines, conversation starters, rizz generator, best rizz lines" />
        <meta property="og:title" content="Best Rizz Lines Generator - 1000+ Proven Pickup Lines" />
        <meta property="og:description" content="Generate the best rizz lines and pickup lines that actually work. Perfect for dating apps and real-life conversations." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://bestrizzlines.com" />
        <meta name="twitter:card" content="summary_large_image" />
        <link rel="canonical" href="https://bestrizzlines.com" />
        <meta name="robots" content="index, follow" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <RizzGenerator />
    </>
  );
} 