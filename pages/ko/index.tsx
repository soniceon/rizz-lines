import { NextPage } from 'next';
import Head from 'next/head';
import Link from 'next/link';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useTranslation } from 'next-i18next';
import SiteHeader from '../../components/SiteHeader';
import SiteFooter from '../../components/SiteFooter';
import { Card, CardHeader, CardTitle, CardContent } from "../../@/components/ui/card";

const KoHomePage: NextPage = () => {
  const { t } = useTranslation();

  const categories = [
    { name: '최고의 넉살 대사', slug: 'best-rizz-lines', description: '가장 인기 있는 넉살 대사 모음' },
    { name: '클래식 넉살 대사', slug: 'classic-rizz-lines', description: '시대를 초월해 사랑받는 명작' },
    { name: '부드러운 넉살 대사', slug: 'smooth-rizz-lines', description: '자연스럽고 흘러가는 접근법' },
    { name: '재미있는 넉살 대사', slug: 'funny-rizz-lines', description: '웃음을 자아내는 유머 대사' },
    { name: '대담한 넉살 대사', slug: 'bold-rizz-lines', description: '용감한 직접적인 표현' },
    { name: '모던 넉살 대사', slug: 'modern-rizz-lines', description: '현대적 트렌드에 맞는 대사' },
    { name: '귀여운 넉살 대사', slug: 'cute-rizz-lines', description: '마음을 따뜻하게 하는 달콤한 접근' },
  ];

  return (
    <>
      <Head>
        <title>Rizz Lines - 최고의 넉살 대사 생성기 | 한국어 버전</title>
        <meta name="description" content="최고의 넉살 대사를 발견하고 당신의 소셜 스킬을 향상시키세요. 한국어, 영어, 일본어, 중국어 등 다양한 언어를 지원합니다." />
        <meta name="keywords" content="넉살 대사,넉살 테크닉,소셜 스킬,한국어 넉살,넉살 생성기" />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href="https://rizzlines.org/ko" />
        <meta property="og:title" content="Rizz Lines - 최고의 넉살 대사 생성기 | 한국어 버전" />
        <meta property="og:description" content="최고의 넉살 대사를 발견하고 당신의 소셜 스킬을 향상시키세요." />
        <meta property="og:url" content="https://rizzlines.org/ko" />
        <meta property="og:type" content="website" />
        <meta property="og:locale" content="ko_KR" />
        <meta property="og:site_name" content="Rizz Lines" />
      </Head>

      <SiteHeader />

      <main className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50">
        <div className="container mx-auto px-4 py-16">
          <div className="text-center mb-16">
            <h1 className="text-5xl font-bold text-gray-900 mb-6">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-600">Rizz Lines</span>에 오신 것을 환영합니다
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
              최고의 넉살 대사를 발견하고 당신의 소셜 스킬을 향상시키세요. 우리 플랫폼은
              다양한 언어의 넉살 대사를 제공하여 자신 있게 대화를 시작할 수 있도록 도와줍니다.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link href="/ko/generator/best-rizz-lines">
                <button className="bg-gradient-to-r from-purple-600 to-pink-600 text-white font-bold py-3 px-8 rounded-full hover:from-purple-700 hover:to-pink-700 transition-all duration-300 transform hover:scale-110">
                  생성 시작
                </button>
              </Link>
              <Link href="/generator">
                <button className="bg-white text-purple-600 font-bold py-3 px-8 rounded-full border-2 border-purple-600 hover:bg-purple-50 transition-all duration-300">
                  영어 버전
                </button>
              </Link>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
            {categories.map((category) => (
              <Link key={category.slug} href={`/ko/generator/${category.slug}`}>
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
            <h2 className="text-3xl font-bold text-gray-900 mb-6">왜 우리를 선택해야 할까요?</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-white text-2xl">🌍</span>
                </div>
                <h3 className="text-xl font-semibold text-gray-800 mb-2">다국어 지원</h3>
                <p className="text-gray-600">한국어, 영어, 일본어, 중국어 등 다양한 언어 지원</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-white text-2xl">✨</span>
                </div>
                <h3 className="text-xl font-semibold text-gray-800 mb-2">고품질 콘텐츠</h3>
                <p className="text-gray-600">효과와 품질을 보장하는 엄선된 넉살 대사</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-white text-2xl">🚀</span>
                </div>
                <h3 className="text-xl font-semibold text-gray-800 mb-2">즉시 생성</h3>
                <p className="text-gray-600">개인화된 넉살 대사를 빠르게 생성</p>
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
      ...(await serverSideTranslations('ko', ['common']))
    },
    revalidate: 3600
  };
}

export default KoHomePage; 