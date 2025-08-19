import { NextPage } from 'next';
import Head from 'next/head';
import Link from 'next/link';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useTranslation } from 'next-i18next';
import SiteHeader from '../../components/SiteHeader';
import SiteFooter from '../../components/SiteFooter';
import { Card, CardHeader, CardTitle, CardContent } from "../../@/components/ui/card";

const JaHomePage: NextPage = () => {
  const { t } = useTranslation();

  const categories = [
    { name: '最高のナンパライン', slug: 'best-rizz-lines', description: '最も人気のあるナンパライン集' },
    { name: 'クラシックナンパライン', slug: 'classic-rizz-lines', description: '時代を超えて愛される名作' },
    { name: 'スムーズナンパライン', slug: 'smooth-rizz-lines', description: '自然で流れるようなアプローチ' },
    { name: '面白いナンパライン', slug: 'funny-rizz-lines', description: '笑顔を誘うユーモアライン' },
    { name: '大胆なナンパライン', slug: 'bold-rizz-lines', description: '勇気ある直接的な表現' },
    { name: 'モダンナンパライン', slug: 'modern-rizz-lines', description: '現代的なトレンドに合ったライン' },
    { name: '可愛いナンパライン', slug: 'cute-rizz-lines', description: '心温まる甘いアプローチ' },
  ];

  return (
    <>
      <Head>
        <title>Rizz Lines - 最高のナンパラインジェネレーター | 日本語版</title>
        <meta name="description" content="最高のナンパラインを発見し、あなたの社交スキルを向上させましょう。日本語、英語、韓国語、中国語など複数の言語をサポートしています。" />
        <meta name="keywords" content="ナンパライン,ナンパテクニック,社交スキル,日本語ナンパ,ナンパジェネレーター" />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href="https://rizzlines.org/ja" />
        <meta property="og:title" content="Rizz Lines - 最高のナンパラインジェネレーター | 日本語版" />
        <meta property="og:description" content="最高のナンパラインを発見し、あなたの社交スキルを向上させましょう。" />
        <meta property="og:url" content="https://rizzlines.org/ja" />
        <meta property="og:type" content="website" />
        <meta property="og:locale" content="ja_JP" />
        <meta property="og:site_name" content="Rizz Lines" />
      </Head>

      <SiteHeader />

      <main className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50">
        <div className="container mx-auto px-4 py-16">
          <div className="text-center mb-16">
            <h1 className="text-5xl font-bold text-gray-900 mb-6">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-600">Rizz Lines</span> へようこそ
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
              最高のナンパラインを発見し、あなたの社交スキルを向上させましょう。私たちのプラットフォームは
              複数言語のナンパラインを提供し、自信を持って会話を始めるお手伝いをします。
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link href="/ja/generator/best-rizz-lines">
                <button className="bg-gradient-to-r from-purple-600 to-pink-600 text-white font-bold py-3 px-8 rounded-full hover:from-purple-700 hover:to-pink-700 transition-all duration-300 transform hover:scale-110">
                  生成を開始
                </button>
              </Link>
              <Link href="/generator">
                <button className="bg-white text-purple-600 font-bold py-3 px-8 rounded-full border-2 border-purple-600 hover:bg-purple-50 transition-all duration-300">
                  英語版
                </button>
              </Link>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
            {categories.map((category) => (
              <Link key={category.slug} href={`/ja/generator/${category.slug}`}>
                <Card className="hover:shadow-lg transition-all duration-300 cursor-pointer border-0 bg-white/80 backdrop-blur-sm">
                  <CardHeader>
                    <CardTitle className="text-lg text-gray-800">{category.name}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600">{category.description}</p>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>

          <div className="text-center">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">なぜ私たちを選ぶのか？</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-white text-2xl">🌍</span>
                </div>
                <h3 className="text-xl font-semibold text-gray-800 mb-2">多言語サポート</h3>
                <p className="text-gray-600">日本語、英語、韓国語、中国語など複数の言語をサポート</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-white text-2xl">✨</span>
                </div>
                <h3 className="text-xl font-semibold text-gray-800 mb-2">高品質コンテンツ</h3>
                <p className="text-gray-600">効果と品質を保証する厳選されたナンパライン</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-white text-2xl">🚀</span>
                </div>
                <h3 className="text-xl font-semibold text-gray-800 mb-2">即座生成</h3>
                <p className="text-gray-600">パーソナライズされたナンパラインを素早く生成</p>
              </div>
            </div>
          </div>
        </div>
      </main>

      <SiteFooter />
    </>
  );
};

export async function getStaticProps() {
  return {
    props: {
      ...(await serverSideTranslations('ja', ['common']))
    },
    revalidate: 3600
  };
}

export default JaHomePage; 