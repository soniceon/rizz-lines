import { NextPage } from 'next';
import Head from 'next/head';
import Link from 'next/link';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useTranslation } from 'next-i18next';
import SiteHeader from '../../components/SiteHeader';
import SiteFooter from '../../components/SiteFooter';
import { Card, CardHeader, CardTitle, CardContent } from "../../@/components/ui/card";

const ZhHomePage: NextPage = () => {
  const { t } = useTranslation();

  const categories = [
    { name: '最佳搭讪台词', slug: 'best-rizz-lines', description: '最受欢迎的搭讪台词集合' },
    { name: '经典搭讪台词', slug: 'classic-rizz-lines', description: '经久不衰的经典台词' },
    { name: '流畅搭讪台词', slug: 'smooth-rizz-lines', description: '自然流畅的搭讪方式' },
    { name: '幽默搭讪台词', slug: 'funny-rizz-lines', description: '让人会心一笑的台词' },
    { name: '大胆搭讪台词', slug: 'bold-rizz-lines', description: '勇敢直接的表达方式' },
    { name: '现代搭讪台词', slug: 'modern-rizz-lines', description: '符合现代潮流的台词' },
    { name: '可爱搭讪台词', slug: 'cute-rizz-lines', description: '温馨可爱的搭讪方式' },
  ];

  return (
    <>
      <Head>
        <title>Rizz Lines - 最佳搭讪台词生成器 | 中文版</title>
        <meta name="description" content="发现最佳的搭讪台词，提升你的社交技能。支持多种语言，包括中文、英文、日文、韩文等。" />
        <meta name="keywords" content="搭讪台词,搭讪技巧,社交技能,中文搭讪,搭讪生成器" />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href="https://rizzlines.org/zh" />
        <meta property="og:title" content="Rizz Lines - 最佳搭讪台词生成器 | 中文版" />
        <meta property="og:description" content="发现最佳的搭讪台词，提升你的社交技能。" />
        <meta property="og:url" content="https://rizzlines.org/zh" />
        <meta property="og:type" content="website" />
        <meta property="og:locale" content="zh_CN" />
        <meta property="og:site_name" content="Rizz Lines" />
      </Head>

      <SiteHeader />

      <main className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50">
        <div className="container mx-auto px-4 py-16">
          <div className="text-center mb-16">
            <h1 className="text-5xl font-bold text-gray-900 mb-6">
              欢迎来到 <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-600">Rizz Lines</span>
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
              发现最佳的搭讪台词，提升你的社交技能。我们的平台提供多种语言的搭讪台词，
              帮助你自信地开始对话。
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link href="/zh/generator/best-rizz-lines">
                <button className="bg-gradient-to-r from-purple-600 to-pink-600 text-white font-bold py-3 px-8 rounded-full hover:from-purple-700 hover:to-pink-700 transition-all duration-300 transform hover:scale-110">
                  开始生成
                </button>
              </Link>
              <Link href="/generator">
                <button className="bg-white text-purple-600 font-bold py-3 px-8 rounded-full border-2 border-purple-600 hover:bg-purple-50 transition-all duration-300">
                  英文版本
                </button>
              </Link>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
            {categories.map((category) => (
              <Link key={category.slug} href={`/zh/generator/${category.slug}`}>
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
            <h2 className="text-3xl font-bold text-gray-900 mb-6">为什么选择我们？</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-white text-2xl">🌍</span>
                </div>
                <h3 className="text-xl font-semibold text-gray-800 mb-2">多语言支持</h3>
                <p className="text-gray-600">支持中文、英文、日文、韩文等多种语言</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-white text-2xl">✨</span>
                </div>
                <h3 className="text-xl font-semibold text-gray-800 mb-2">高质量内容</h3>
                <p className="text-gray-600">精心挑选的搭讪台词，确保效果和质量</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-white text-2xl">🚀</span>
                </div>
                <h3 className="text-xl font-semibold text-gray-800 mb-2">即时生成</h3>
                <p className="text-gray-600">快速生成个性化的搭讪台词</p>
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
      ...(await serverSideTranslations('zh', ['common']))
    },
    revalidate: 3600
  };
}

export default ZhHomePage; 