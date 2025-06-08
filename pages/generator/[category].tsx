import { GetStaticPaths, GetStaticProps, NextPage } from 'next';
import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import path from 'path';
import fs from 'fs';

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

const RizzGeneratorPage: NextPage<PageProps> = ({ category, allLines, allCategories }) => {
  const router = useRouter();
  const [displayedLines, setDisplayedLines] = useState<string[]>([]);

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

  const pageTitle = `${category} | Rizz Line Generator`;
  const metaDescription = `Generate the best ${category.toLowerCase()} to impress. Get 5 new random lines each time.`;

  return (
    <>
      <Head>
        <title>{pageTitle}</title>
        <meta name="description" content={metaDescription} />
        <meta property="og:title" content={pageTitle} />
        <meta property="og:description" content={metaDescription} />
        <meta property="og:type" content="website" />
      </Head>

      {/* You can reuse your main layout/header component here */}
      <header className="bg-gray-800 text-white p-4">
        <nav className="container mx-auto flex justify-between">
            <Link href="/" className="font-bold text-xl">
                Rizz.app
            </Link>
            <div>
                <Link href="/articles" className="px-4">Articles</Link>
                {/* We will add a dropdown generator link later */}
            </div>
        </nav>
      </header>

      <main className="container mx-auto px-4 py-12">
        <div className="text-center mb-10">
          <h1 className="text-4xl md:text-5xl font-extrabold mb-3">{category} Generator</h1>
          <p className="text-lg text-gray-600">Click the button to get 5 new random lines!</p>
        </div>
        
        <div className="max-w-3xl mx-auto">
            <div className="space-y-4">
                {displayedLines.map((line, index) => (
                    <div key={index} className="bg-white p-6 rounded-xl shadow-md border border-gray-200 transition-transform transform hover:scale-105">
                        <p className="text-gray-800 text-lg">"{line}"</p>
                    </div>
                ))}
            </div>

            <div className="text-center mt-10">
                <button
                    onClick={generateMore}
                    className="bg-purple-600 text-white font-bold py-3 px-8 rounded-full hover:bg-purple-700 transition-all duration-300 transform hover:scale-110 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-opacity-50"
                >
                    Generate More
                </button>
            </div>
        </div>
      </main>
    </>
  );
};

export const getStaticPaths: GetStaticPaths = async () => {
  const filePath = path.join(process.cwd(), 'public', 'rizz-data.json');
  const jsonData = fs.readFileSync(filePath, 'utf-8');
  const data: RizzData = JSON.parse(jsonData);
  const categories = Object.keys(data);

  const paths = categories.map(category => ({
    params: { category: slugify(category) },
  }));

  return { paths, fallback: false };
};

export const getStaticProps: GetStaticProps = async (context) => {
  const categorySlug = context.params?.category as string;
  const filePath = path.join(process.cwd(), 'public', 'rizz-data.json');
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
    },
  };
};

export default RizzGeneratorPage; 