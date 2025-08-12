import { NextPage } from 'next';
import Head from 'next/head';
import Link from 'next/link';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useTranslation } from 'next-i18next';
import SiteHeader from '../components/SiteHeader';
import SiteFooter from '../components/SiteFooter';
import { Button } from "../@/components/ui/button";
import { Home, RefreshCw } from "lucide-react";

const Custom500: NextPage = () => {
  const { t } = useTranslation();

  const refreshPage = () => {
    window.location.reload();
  };

  return (
    <>
      <Head>
        <title>500 - Server Error | Rizz Lines Generator</title>
        <meta name="description" content="Server error occurred. Please try again or return to our rizz lines generator." />
        <meta name="robots" content="noindex, nofollow" />
      </Head>

      <SiteHeader />

      <main className="min-h-screen bg-gradient-to-br from-red-50 via-orange-50 to-yellow-50 flex items-center justify-center px-4">
        <div className="text-center max-w-2xl mx-auto">
          <div className="mb-8">
            <h1 className="text-9xl font-bold text-red-600 mb-4">500</h1>
            <h2 className="text-3xl font-semibold text-gray-800 mb-4">
              Server Error
            </h2>
            <p className="text-lg text-gray-600 mb-8">
              Oops! Something went wrong on our end. Don't worry, our team has been notified and is working to fix it.
            </p>
          </div>

          <div className="space-y-4 mb-8">
            <Button
              onClick={refreshPage}
              variant="outline"
              size="lg"
              className="mr-4"
            >
              <RefreshCw className="w-4 h-4 mr-2" />
              Try Again
            </Button>

            <Link href="/">
              <Button size="lg" className="bg-gradient-to-r from-red-600 to-orange-600 hover:from-red-700 hover:to-orange-700">
                <Home className="w-4 h-4 mr-2" />
                Go Home
              </Button>
            </Link>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-lg">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">
              What you can do:
            </h3>
            <ul className="text-left space-y-2 text-gray-600">
              <li className="flex items-start">
                <span className="text-red-500 mr-2">•</span>
                Refresh the page and try again
              </li>
              <li className="flex items-start">
                <span className="text-red-500 mr-2">•</span>
                Clear your browser cache and cookies
              </li>
              <li className="flex items-start">
                <span className="text-red-500 mr-2">•</span>
                Try accessing the page from a different device
              </li>
              <li className="flex items-start">
                <span className="text-red-500 mr-2">•</span>
                Wait a few minutes and try again
              </li>
            </ul>
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

export default Custom500; 