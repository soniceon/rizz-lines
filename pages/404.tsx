import { NextPage } from 'next';
import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useTranslation } from 'next-i18next';
import SiteHeader from '../components/SiteHeader';
import SiteFooter from '../components/SiteFooter';
import { Button } from "../@/components/ui/button";
import { Home, Search, ArrowLeft } from "lucide-react";

const Custom404: NextPage = () => {
  const router = useRouter();
  const { t } = useTranslation();

  const goBack = () => {
    if (window.history.length > 1) {
      router.back();
    } else {
      router.push('/');
    }
  };

  return (
    <>
      <Head>
        <title>404 - {t('notFound')} | Rizz Lines Generator</title>
        <meta name="description" content="Page not found. Return to our rizz lines generator to create amazing pickup lines." />
        <meta name="robots" content="noindex, nofollow" />
        <link rel="canonical" href="https://rizzlines.org/404" />
      </Head>

      <SiteHeader />

      <main className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-indigo-50 flex items-center justify-center px-4">
        <div className="text-center max-w-2xl mx-auto">
          <div className="mb-8">
            <h1 className="text-9xl font-bold text-purple-600 mb-4">404</h1>
            <h2 className="text-3xl font-semibold text-gray-800 mb-4">
              {t('notFound')}
            </h2>
            <p className="text-lg text-gray-600 mb-8">
              Oops! The page you're looking for doesn't exist. But don't worry, we've got plenty of amazing rizz lines waiting for you!
            </p>
          </div>

          <div className="space-y-4 mb-8">
            <Button
              onClick={goBack}
              variant="outline"
              size="lg"
              className="mr-4"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Go Back
            </Button>

            <Link href="/">
              <Button size="lg" className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700">
                <Home className="w-4 h-4 mr-2" />
                Go Home
              </Button>
            </Link>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-lg">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">
              Popular Rizz Lines Categories
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Link href="/generator/best-rizz-lines">
                <div className="p-4 border border-purple-200 rounded-lg hover:bg-purple-50 transition-colors cursor-pointer">
                  <h4 className="font-medium text-purple-700">Best Rizz Lines</h4>
                  <p className="text-sm text-gray-600">Proven pickup lines that work</p>
                </div>
              </Link>
              <Link href="/generator/smooth-rizz-lines">
                <div className="p-4 border border-pink-200 rounded-lg hover:bg-pink-50 transition-colors cursor-pointer">
                  <h4 className="font-medium text-pink-700">Smooth Rizz Lines</h4>
                  <p className="text-sm text-gray-600">Charming and confident</p>
                </div>
              </Link>
              <Link href="/generator/funny-rizz-lines">
                <div className="p-4 border border-indigo-200 rounded-lg hover:bg-indigo-50 transition-colors cursor-pointer">
                  <h4 className="font-medium text-indigo-700">Funny Rizz Lines</h4>
                  <p className="text-sm text-gray-600">Humor that breaks the ice</p>
                </div>
              </Link>
              <Link href="/generator/classic-rizz-lines">
                <div className="p-4 border border-green-200 rounded-lg hover:bg-green-50 transition-colors cursor-pointer">
                  <h4 className="font-medium text-green-700">Classic Rizz Lines</h4>
                  <p className="text-sm text-gray-600">Timeless and effective</p>
                </div>
              </Link>
            </div>
          </div>
        </div>
      </main>

      <SiteFooter />
    </>
  );
};

export async function getStaticProps({ locale = 'en' }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ['common']))
    }
  };
}

export default Custom404; 