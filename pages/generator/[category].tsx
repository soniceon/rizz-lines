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
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

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

      <SiteHeader />

      <main className="container mx-auto px-4 py-12">
        <div className="text-center mb-10">
          <h1 className="text-4xl md:text-5xl font-extrabold mb-3">{category} Generator</h1>
          <p className="text-lg text-gray-600">Click the button to get 5 new random lines!</p>
        </div>
        
        <div className="max-w-4xl mx-auto">
          <div className="flex flex-col gap-6">
            {displayedLines.map((line, index) => (
              <Card
                key={index}
                className="bg-gradient-to-br from-purple-100 via-pink-100 to-indigo-100 shadow-xl rounded-2xl transition-transform hover:scale-105 border-0"
              >
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg font-bold text-purple-700">Rizz Line</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center gap-3">
                    <p className="text-gray-800 text-base italic mb-2 flex-1">"{line}"</p>
                    <Button
                      type="button"
                      size="sm"
                      variant="secondary"
                      className="shrink-0"
                      onClick={() => {
                        navigator.clipboard.writeText(line);
                        setCopiedIndex(index);
                        setTimeout(() => setCopiedIndex(null), 2000);
                      }}
                      title="Copy to clipboard"
                    >
                      {copiedIndex === index ? (
                        <Check className="w-4 h-4 mr-1 text-green-500" />
                      ) : (
                        <Copy className="w-4 h-4 mr-1" />
                      )}
                      {copiedIndex === index ? 'Copied' : 'Copy'}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="text-center mt-10">
            <button
              onClick={generateMore}
              className="bg-gradient-to-r from-purple-600 to-pink-600 text-white font-bold py-3 px-8 rounded-full hover:from-purple-700 hover:to-pink-700 transition-all duration-300 transform hover:scale-110 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-opacity-50 shadow-lg"
            >
              Generate More
            </button>
          </div>
        </div>
      </main>

      <SiteFooter />
    </>
  );
};

export const getStaticPaths: GetStaticPaths = async () => {
  const filePath = path.join(process.cwd(), 'rizzlines.json');
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
  const filePath = path.join(process.cwd(), 'rizzlines.json');
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