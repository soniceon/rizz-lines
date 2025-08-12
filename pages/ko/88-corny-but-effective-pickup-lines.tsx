import Head from 'next/head';
import SiteHeader from '../../components/SiteHeader';
import SiteFooter from '../../components/SiteFooter';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useEffect, useState } from 'react';

export default function Article88() {
  const { t, i18n } = useTranslation('common');
  const [lines, setLines] = useState<string[]>([]);

  useEffect(() => {
    if (process.env.NODE_ENV !== 'production') console.log('当前语言:', i18n.language);
    fetch(`/locales/${i18n.language}/pickup-lines.json`)
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data)) {
          setLines(data);
          if (process.env.NODE_ENV !== 'production') console.log('lines数据(Array):', data);
        } else if (typeof data === 'object') {
          const arr = Object.keys(data)
            .sort((a, b) => {
              const na = parseInt(a.replace(/\D/g, ''), 10);
              const nb = parseInt(b.replace(/\D/g, ''), 10);
              return na - nb;
            })
            .map((k) => data[k]);
          setLines(arr);
          if (process.env.NODE_ENV !== 'production') console.log('lines数据(Object):', arr);
        }
      });
  }, [i18n.language]);

  const groups = [
    { title: t('funnyRizzLines'), img: '/articles/1.jpg', alt: t('funnyRizzLinesAlt'), start: 0, end: 22 },
    { title: t('romanticRizzLines'), img: '/articles/2.jpg', alt: t('romanticRizzLinesAlt'), start: 22, end: 44 },
    { title: t('boldRizzLines'), img: '/articles/3.jpg', alt: t('boldRizzLinesAlt'), start: 44, end: 66 },
    { title: t('classicRizzLines'), img: '/articles/4.jpg', alt: t('classicRizzLinesAlt'), start: 66, end: 88 }
  ];

  if (process.env.NODE_ENV !== 'production') console.log('groups:', groups);
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Head>
        <title>{t('article88Title')}</title>
        <meta name="description" content={t('article88Desc')} />
        <meta property="og:title" content={t('article88Title')} />
        <meta property="og:description" content={t('article88Desc')} />
        <meta property="og:type" content="article" />
        <meta property="og:image" content="/articles/1.jpg" />
        <link rel="canonical" href="https://rizzlines.org/ko/articles/88-corny-but-effective-pickup-lines" />
      </Head>
      <SiteHeader />
      <main className="w-full max-w-2xl mx-auto flex-1 py-8 px-4">
        <h1 className="text-4xl md:text-5xl font-extrabold text-center mb-6 leading-tight">
          {t('article88MainTitle')}
        </h1>
        <p className="text-lg text-gray-700 text-center mb-8">
          {t('article88Subtitle')}
        </p>
        <nav className="mb-10 flex justify-center">
          <div className="bg-white/80 rounded-2xl shadow-md px-8 py-6 max-w-xl w-full">
            <h2 className="text-2xl font-semibold text-center mb-4">{t('contents')}</h2>
            <ul className="flex flex-wrap justify-center gap-x-8 gap-y-3 text-blue-700 text-lg font-medium">
              {groups.map((g, i) => (
                <li key={g.title}>
                  <a
                    href={`#group${i+1}`}
                    className="hover:text-blue-500 transition-colors duration-150"
                  >
                    {g.title}
                  </a>
                </li>
              ))}
              <li>
                <a
                  href="#how-to-use"
                  className="hover:text-blue-500 transition-colors duration-150"
                >
                  {t('howToUseRizzLinesEffectively')}
                </a>
              </li>
            </ul>
          </div>
        </nav>
        {groups.map((g, i) => (
          <section key={g.title} className="mb-14">
            <h3 id={`group${i+1}`} className="text-2xl md:text-3xl font-bold text-center mb-4 mt-8">{g.title}</h3>
            <img
              src={g.img}
              alt={g.alt}
              width="600"
              height="400"
              className="rounded-xl shadow-lg mx-auto mb-6"
              style={{ maxWidth: '100%', height: 'auto' }}
            />
            <ol start={g.start + 1} className="list-decimal list-inside space-y-2 text-lg text-gray-800 bg-white rounded-xl p-6 shadow">
              {lines.slice(g.start, g.end).map((line, idx) => (
                <li key={idx}>{line}</li>
              ))}
            </ol>
          </section>
        ))}
        <h2 id="how-to-use" className="text-2xl md:text-3xl font-bold text-center mb-4 mt-8">{t('howToUseRizzLinesEffectively')}</h2>
        <p className="text-gray-700 text-center mb-6">
          {t('howToUseRizzLinesEffectivelyDesc')}
        </p>
        <img src="/articles/4.jpg" alt={t('howToUseRizzLinesEffectivelyAlt')} width="600" height="400" className="rounded-xl shadow-lg mx-auto mb-8" />
        <p className="text-gray-700 text-center mt-8">
          {t('wantMoreInspiration')}
        </p>
      </main>
      <SiteFooter />
    </div>
  );
}

export async function getStaticProps({ locale }: { locale: string }) {
  try {
    return {
      props: {
        ...(await serverSideTranslations(locale, ['common'])),
      },
    };
  } catch (e) {
    console.error('getStaticProps error in 88-corny-but-effective-pickup-lines.tsx:', e);
    throw e;
  }
} 