import Head from 'next/head';
import SiteHeader from '../../components/SiteHeader';
import SiteFooter from '../../components/SiteFooter';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

export default function Article88() {
  const { t } = useTranslation('common');
  const lines = [
    'line_areYouAMagician',
    'line_doYouHaveAMap',
    'line_ifYouWereAVegetable',
    'line_areYouMadeOfCopper',
    'line_isYourNameGoogle',
    'line_doYouBelieveInLoveAtFirstSight',
    'line_areYouAParkingTicket',
    'line_ifYouWereATriangle',
    'line_areYouATimeTraveler',
    'line_doYouHaveABandAid',
    'line_areYouWiFi',
    'line_imNotAHoarder',
    'line_areYouMyAppendix',
    'line_iWasWonderingIfYouHadAnExtraHeart',
    'line_doYouLikeStarWars',
    'line_areYouABeaver',
    'line_iSeemToHaveLostMyPhoneNumber',
    'line_areYouA45DegreeAngle',
    'line_imNotAGenie',
    'line_areYouFromTennessee',
    'line_areYouAHotSauce',
    'line_areYouACampfire',
    'line_areYouABandit',
    'line_areYouAKeyboard',
    'line_areYouALightSwitch',
    'line_areYouALuckyCharm',
    'line_areYouADisneyPrincess',
    'line_areYouALego',
    'line_areYouASystemCrash',
    'line_areYouASummerBreak',
    'line_areYouAPassword',
    'line_areYouABanana',
    'line_areYouAName',
    'line_areYouAMirror',
    'line_areYouAWeapon',
    'line_areYouAMapAgain',
    'line_areYouAType',
    'line_areYouAFineTicket',
    'line_areYouAWorld',
    'line_areYouACombination',
    'line_areYouAHeartBurn',
    'line_areYouAWait',
    'line_areYouAHotSauceAgain',
    'line_areYouAStar',
    'line_areYouAKey',
    'line_areYouANameAgain',
    'line_areYouANameThird',
    'line_areYouANameFourth',
    'line_areYouANameFifth',
    'line_areYouANameSixth',
    'line_areYouANameSeventh',
    'line_areYouANameEighth',
    'line_areYouANameNinth',
    'line_areYouANameTenth',
    'line_areYouANameEleventh',
    'line_areYouANameTwelfth',
    'line_areYouANameThirteenth',
    'line_areYouANameFourteenth',
    'line_areYouANameFifteenth',
    'line_areYouANameSixteenth',
    'line_areYouANameSeventeenth',
    'line_areYouANameEighteenth',
    'line_areYouANameNineteenth',
    'line_areYouANameTwentieth',
    'line_areYouANameTwentyFirst',
    'line_areYouANameTwentySecond',
    'line_areYouANameTwentyThird',
    'line_areYouANameTwentyFourth',
    'line_areYouANameTwentyFifth',
    'line_areYouANameTwentySixth',
    'line_areYouANameTwentySeventh',
    'line_areYouANameTwentyEighth',
    'line_areYouANameTwentyNinth',
    'line_areYouANameThirtieth',
    'line_areYouANameThirtyFirst',
    'line_areYouANameThirtySecond',
    'line_areYouANameThirtyThird',
    'line_areYouANameThirtyFourth',
    'line_areYouANameThirtyFifth',
    'line_areYouANameThirtySixth',
    'line_areYouANameThirtySeventh',
    'line_areYouANameThirtyEighth',
    'line_areYouANameThirtyNinth',
    'line_areYouANameFortieth',
    'line_areYouANameFortyFirst',
    'line_areYouANameFortySecond',
    'line_areYouANameFortyThird',
    'line_areYouANameFortyFourth',
    'line_areYouANameFortyFifth',
    'line_areYouANameFortySixth',
    'line_areYouANameFortySeventh',
    'line_areYouANameFortyEighth',
    'line_areYouANameFortyNinth',
    'line_areYouANameFiftieth',
    'line_areYouANameFiftyFirst',
    'line_areYouANameFiftySecond',
    'line_areYouANameFiftyThird',
    'line_areYouANameFiftyFourth',
    'line_areYouANameFiftyFifth',
    'line_areYouANameFiftySixth',
    'line_areYouANameFiftySeventh',
    'line_areYouANameFiftyEighth',
    'line_areYouANameFiftyNinth',
    'line_areYouANameSixtieth',
    'line_areYouANameSixtyFirst',
    'line_areYouANameSixtySecond',
    'line_areYouANameSixtyThird',
    'line_areYouANameSixtyFourth',
    'line_areYouANameSixtyFifth',
    'line_areYouANameSixtySixth',
    'line_areYouANameSixtySeventh',
    'line_areYouANameSixtyEighth',
    'line_areYouANameSixtyNinth',
    'line_areYouANameSeventieth',
    'line_areYouANameSeventyFirst',
    'line_areYouANameSeventySecond',
    'line_areYouANameSeventyThird',
    'line_areYouANameSeventyFourth',
    'line_areYouANameSeventyFifth',
    'line_areYouANameSeventySixth',
    'line_areYouANameSeventySeventh',
    'line_areYouANameSeventyEighth',
    'line_areYouANameSeventyNinth',
    'line_areYouANameEightieth',
    'line_areYouANameEightyFirst',
    'line_areYouANameEightySecond',
    'line_areYouANameEightyThird',
    'line_areYouANameEightyFourth',
    'line_areYouANameEightyFifth',
    'line_areYouANameEightySixth',
    'line_areYouANameEightySeventh',
    'line_areYouANameEightyEighth',
  ];
  const groups = [
    { title: t('funnyRizzLines'), img: '/articles/1.jpg', alt: t('funnyRizzLinesAlt'), start: 0, end: 22 },
    { title: t('romanticRizzLines'), img: '/articles/2.jpg', alt: t('romanticRizzLinesAlt'), start: 22, end: 44 },
    { title: t('boldRizzLines'), img: '/articles/3.jpg', alt: t('boldRizzLinesAlt'), start: 44, end: 66 },
    { title: t('classicRizzLines'), img: '/articles/4.jpg', alt: t('classicRizzLinesAlt'), start: 66, end: 88 },
  ];
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Head>
        <title>{t('article88Title')}</title>
        <meta name="description" content={t('article88Desc')} />
        <meta property="og:title" content={t('article88Title')} />
        <meta property="og:description" content={t('article88Desc')} />
        <meta property="og:type" content="article" />
        <meta property="og:image" content="/articles/1.jpg" />
        <link rel="canonical" href="https://www.yoursite.com/articles/88-corny-but-effective-pickup-lines" />
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
                <li key={idx}>{t(line)}</li>
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
  return {
    props: {
      ...(await serverSideTranslations(locale, ['common'])),
    },
  };
} 