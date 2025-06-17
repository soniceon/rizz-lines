import Head from 'next/head';
import SiteHeader from '../../components/SiteHeader';
import SiteFooter from '../../components/SiteFooter';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

export default function Article88() {
  const { t } = useTranslation('common');
  const lines = [
  "If I could rearrange the alphabet, I'd put \"U\" and \"I\" together.",
  "You must be Wi-Fi, because I'm totally feeling a connection right now.",
  "Does anyone need a light? Because we're the perfect match.",
  "Even if there wasn't gravity, I'd still fall for you.",
  "You and I are like the Billboard 100 — we're the hottest singles in the country.",
  "Is it hot in here, or is it just you?",
  "I'm not a photographer. But I totally picture us together.",
  "You must be late returning your library books because you have \"fine\" written all over you.",
  "Should I call you Darwin? Because you're totally my natural selection.",
  "Excuse me, are you lost? The World's Sexist Man/Woman contest is next door.",
  "You must be tired, because you've been running through my mind all day.",
  "Can I just call you Google? Because you've got everything I'm looking for.",
  "There must be something wrong with my eyes, because I can't seem to take them off you.",
  "Do you have a map? I just got lost looking in your eyes.",
  "Have we met? I think I saw you in my dreams.",
  "Do you believe in love at first sight or should I walk by again?",
  "I can predict the future. And you're in it.",
  "Are you an artist? Because you're definitely drawing my attention.",
  "You must be a legend, because I've heard so many great things about you.",
  "I always thought happiness started with an \"h.\" But I just realized it begins with \"u.\"",
  "I just finished a book I think you'd like. Why don't you stop by and pick it up?",
  "I'm researching important dates in history and wondered if you'd like to be one of them.",
  "Can I call you Waldo? Someone like you is impossible to find.",
  "Can I borrow a kiss? I promise to give it back.",
  "You know what I'd really love to see you in? My arms.",
  "Are you a time traveler? Because I can see my future with you.",
  "You must be a parking ticket because you've got fine written all over you.",
  "If you were a keyboard, you'd be exactly my type.",
  "Are you an investment? Because I'm putting all my time into you.",
  "If life had a center, you'd be the sun I revolve around.",
  "Are you a GPS? Because you always know how to lead me right to you.",
  "Are you a magnet? Because I'm totally attracted to you.",
  "Are you an Oreo? Because I'm dunking on this opportunity.",
  "Are you a pencil? Because you're drawing me in.",
  "There's no way your spirit animal isn't a phoenix; you've reignited my heart like magic.",
  "Are you a breeze? Because you've swept me off my feet without a sound.",
  "Sweet, irresistible, and impossible to get enough of- are you secretly a chocolate chip cookie?",
  "Are you a bank loan? Because you've got my interest.",
  "Are you a refrigerator? Because you're way too cool to ignore.",
  "Are you a parking space? Because I've been searching for someone like you forever.",
  "Who needs a library card when you've got \"check me out\" written all over you.",
  "Are you a phone charger? Because I feel dead without you.",
  "Are you a 5G network? Because you've got me connected instantly.",
  "Do you know how to hack? Because you've stolen my heart completely.",
  "My name is _______________, but feel free to call me Tonight or Tomorrow.",
  "Is your fan club accepting new members? Because I'm about to sign up.",
  "Are we in the self-service line? Because I'm totally checking you out.",
  "If you were an ad, you'd be the fine print.",
  "Are you a car loan? Because you've definitely got my interest.",
  "I'd buy you a glass of wine, but then I'd be jealous of the glass.",
  "My major is anatomy. Wanna help me study?",
  "Do you have a name or can I call you mine?",
  "Do you have a bandage? I just scraped my knee falling for you.",
  "Can you guess what my shirt is made of? Girl/boyfriend material.",
  "Can I walk you home? I've always believed in following my dreams.",
  "I'm writing a book about numbers. I just realized I don't have yours.",
  "Are you a camera? Because every time I look at you, I smile.",
  "Do you like Legos? Because I think we could build a relationship together.",
  "Did it hurt when you fell from heaven?",
  "You must be a magnet. Because I feel the attraction.",
  "Did someone break your heart? Because you can have mine.",
  "I'd love to take you to a movie, but I don't want get in trouble for bringing my own snack.",
  "Are you a broom? Because you just swept me off my feet.",
  "You hand looks heavy. Can I hold it for you?",
  "Have we met? Because you look a lot like my next girl/boyfriend.",
  "I didn't believe in love at first sight. Until I saw you.",
  "You're so spicy, you're giving me a bad case of heartburn.",
  "If your dad a boxer? Because you're a real knockout.",
  "Do you have the time? I lost track of it after I met you.",
  "Can I be your snowflake? I promise to never melt away from your heart.",
  "Are you French? Because Eiffel for you.",
  "Are you a Wi-Fi signal? Because I'm feeling a strong connection.",
  "No pen, no paper...but, you still draw my attention.",
  "Are you a heart? Because I'd never stop beating for you.",
  "I believe in following my dreams, so you lead the way.",
  "If being beautiful was a crime, you'd be on the most wanted list.",
  "Kissing is a love language. Want to start a conversation with me?",
  "Are you iron? Because I don't get enough of you.",
  "Should we get coffee? Cause I like you a latte.",
  "You should be Jasmine without the \"Jas.",
  "Are you a Disney ride? Because I'd wait forever for you.",
  "Are you water? Because I'd die without you.",
  "I see you like tequila. Does that mean you'll give me a shot?",
  "Hey, I'm sorry to bother you, but my phone must be broken because it doesn't seem to have your number in it.",
  "Are you a boxer? Because you're a total knockout.",
  "Are you public speaking? Because you make me really nervous.",
  "Are you good at math? Me neither; the only number I care about is yours.",
  "I'm not religious, but you're the answer to all of my prayers."
];
  const groups = [
  { title: t('Funny Rizz Lines'), img: '/articles/1.jpg', alt: t('Funny Rizz Lines image'), start: 0, end: 22 },
  { title: t('Romantic Rizz Lines'), img: '/articles/2.jpg', alt: t('Romantic Rizz Lines image'), start: 22, end: 44 },
  { title: t('Bold Rizz Lines'), img: '/articles/3.jpg', alt: t('Bold Rizz Lines image'), start: 44, end: 66 },
  { title: t('Classic Rizz Lines'), img: '/articles/4.jpg', alt: t('Classic Rizz Lines image'), start: 66, end: 88 }
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