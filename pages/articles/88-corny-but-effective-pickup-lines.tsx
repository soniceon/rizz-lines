import Head from 'next/head';
import SiteHeader from '../../components/SiteHeader';
import SiteFooter from '../../components/SiteFooter';

const lines = [
  "Are you a magician? Because whenever I look at you, everyone else disappears.",
  "Do you have a map? I keep getting lost in your eyes.",
  "If you were a vegetable, you'd be a cute-cumber.",
  "Are you made of copper and tellurium? Because you're Cu-Te.",
  "Is your name Google? Because you have everything I've been searching for.",
  "Do you believe in love at first sight, or should I walk by again?",
  "Are you a parking ticket? Because you've got 'fine' written all over you.",
  "If you were a triangle, you'd be acute one.",
  "Are you a time traveler? Because I see you in my future.",
  "Do you have a Band-Aid? I just scraped my knee falling for you.",
  "Are you Wi-Fi? Because I'm really feeling a connection.",
  "I'm not a hoarder, but I really want to keep you forever.",
  "Are you my appendix? Because I don't understand how you work, but this feeling in my stomach makes me want to take you out.",
  "I was wondering if you had an extra heart. Mine was just stolen.",
  "Do you like Star Wars? Because Yoda one for me!",
  "Are you a beaver? Because daaaaam.",
  "I seem to have lost my phone number. Can I have yours?",
  "Are you a 45-degree angle? Because you're acute-y.",
  "I'm not a genie, but I can make your dreams come true.",
  "Are you Australian? Because when I look at you, I feel like I'm down under your spell.",
  "I'm not saying you're the best catch here, but you're definitely the only one I'm interested in.",
  "I don't usually approach people, but your energy is magnetic.",
  "I had to come over here. My friends bet me I wouldn't be able to start a conversation with the most beautiful person in the room.",
  "I'm not trying to impress you or anything, but I'm Batman.",
  "I know this might sound crazy, but I think we'd look good together.",
  "I'm not a betting person, but I'd put money on us having amazing chemistry.",
  "I don't need a fortune teller to know you're going to be in my future.",
  "I was going to wait for you to make the first move, but I'm impatient.",
  "I'm not usually this direct, but life's too short for small talk.",
  "I could spend all night thinking of the perfect thing to say to you, or I could just be honest: you're stunning.",
  "Are you my screen time? Because I can't stop looking at you.",
  "Are you a notification? Because you've got my attention.",
  "If you were a Spotify playlist, you'd be my 'On Repeat'.",
  "Are you a TikTok video? Because I could watch you all day.",
  "You must be a premium subscription because you're everything I've been missing.",
  "Are you 5G? Because you're giving me a strong connection.",
  "If we were on Netflix, we'd definitely be trending.",
  "Are you a software update? Because not right now, but maybe later?",
  "You're like my favorite song - I never get tired of you.",
  "Are you a meme? Because you're making me smile without even trying.",
  "If being hot were a crime, you'd be serving a life sentence.",
  "Do you have a sunburn or are you always this hot?",
  "Were we in a class together? I could have sworn we had chemistry.",
  "Are you a guitar? Because you've struck a chord in me.",
  "Are you a carbon sample? Because I want to date you.",
  "Do you have defibrillator? My heart's been racing since we met.",
  "Can I take your picture? My friends don't believe angels exist.",
  "Are you a keyboard? Because you're just my type.",
  "If you and I were socks, we'd make a great pair.",
  "Are you Starbucks? Because I like you a latte.",
  "There's only one thing I'd change about you — your last name.",
  "You must be Harry Potter. Because every time I look at you, everything else disappears.",
  "Do you play baseball? Because I think you're in my league.",
  "Is there an airport nearby? Or is that just my heart taking flight?",
  "If you were a fruit, you'd be a fine-apple.",
  "Here I am. What are your other two wishes?",
  "Other than taking my breath away, what do you do for a living?",
  "You're pretty and I'm cute. Together we'd be pretty cute.",
  "Your lips seem lonely. Would they like to meet mine?",
  "I must be a snowflake. Because I've fallen for you.",
  "I'm new in town. Can I get directions to your place?",
  "Are you a campfire? Because you're hot and I want s'more.",
  "My friend wants to know if you think I'm cute.",
  "Are you OK? It looks like you've got a Vitamin-Me deficiency.",
  "Is your dad Picasso? Because you're a real masterpiece.",
  "I must've gone fishing... because you're the perfect catch.",
  "I lost my phone number, can I borrow yours?",
  "I'd love to take you out to the movies, but they don't allow snacks.",
  "No pen, no paper...but still, you draw my attention.",
  "My parents told me to chase my dreams—I guess that means you better start running.",
  "No, I'm not 14, but I'm the 1 4 you.",
  "Don't mind me! I'm just following my dreams.",
  "Math is so confusing. It's always talking about X and Y, never about U and I.",
  "Are you from Tennessee? Because you're the only ten I see.",
  "Are you Christmas morning? Because I've been waiting all year for you to arrive.",
  "Are you Nemo? Because I've been trying to find you.",
  "Are you a bank loan? Because you have my interest.",
  "I hope you know CPR because you just took my breath away.",
  "Are you the Sun? Because I could stare at you all day, and it'd be worth the risk.",
  "Are you a beaver? Because DAM!",
  "Are you a keyboard? Because you're just my type.",
  "My mom said sharing is caring but, no...you're all mine!",
  "Are you John Cena? Because I've never Cena girl like you before.",
  "It's time to pay up. It's the first of the month, and you've been living in my mind rent-free.",
  "Are you a light? Because you always make me feel bright.",
  "Just so you know, I'm a felon...because I felon love with you.",
  "Do you like Star Wars? Cause Yoda only one for me.",
  "Are you chicken fingers and fries? Because I don't care how many options I have, will always choose you.",
  "It's a good thing I have a library card because I've been checking you out.",
  "Do you have a bandaid? My knees hurt from falling for you.",
  "We may not be pants, but we'd make a great pair."
];

const groups = [
  { title: 'Funny Rizz Lines', img: '/articles/1.jpg', alt: 'Smiling woman reading rizz lines on her phone', start: 0, end: 22 },
  { title: 'Romantic Rizz Lines', img: '/articles/2.jpg', alt: 'Young man laughing after using a rizz line', start: 22, end: 44 },
  { title: 'Bold Rizz Lines', img: '/articles/3.jpg', alt: 'Couple smiling and flirting with rizz lines', start: 44, end: 66 },
  { title: 'Classic Rizz Lines', img: '/articles/4.jpg', alt: 'Guy and girl laughing together in a cafe after using rizz lines', start: 66, end: 88 },
];

export default function Article88() {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Head>
        <title>88 Corny But Effective Rizz Lines That Actually Work</title>
        <meta name="description" content="Discover 88 of the best rizz lines to boost your flirting game. These corny but effective rizz lines are perfect for dating apps and real-life conversations." />
        <meta property="og:title" content="88 Corny But Effective Rizz Lines That Actually Work" />
        <meta property="og:description" content="Discover 88 of the best rizz lines to boost your flirting game. These corny but effective rizz lines are perfect for dating apps and real-life conversations." />
        <meta property="og:type" content="article" />
        <meta property="og:image" content="/articles/1.jpg" />
        <link rel="canonical" href="https://www.yoursite.com/articles/88-corny-but-effective-pickup-lines" />
      </Head>
      <SiteHeader />
      <main className="w-full max-w-2xl mx-auto flex-1 py-8 px-4">
        <h1 className="text-4xl md:text-5xl font-extrabold text-center mb-6 leading-tight">
          88 Rizz Lines That Make Flirting Seem Effortless
        </h1>
        <p className="text-lg text-gray-700 text-center mb-8">
          Use these creative and confident lines to charm your romantic interest.
        </p>
        <nav className="mb-10 flex justify-center">
          <div className="bg-white/80 rounded-2xl shadow-md px-8 py-6 max-w-xl w-full">
            <h2 className="text-2xl font-semibold text-center mb-4">Contents</h2>
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
                  How to Use Rizz Lines Effectively
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
        <h2 id="how-to-use" className="text-2xl md:text-3xl font-bold text-center mb-4 mt-8">How to Use Rizz Lines Effectively</h2>
        <p className="text-gray-700 text-center mb-6">
          The key to using <strong>rizz lines</strong> is confidence and timing. Choose a line that fits the situation and your personality. Remember, the best rizz lines are delivered with a smile! Try them in person or on dating apps for the best results.
        </p>
        <img src="/articles/4.jpg" alt="Guy and girl laughing together in a cafe after using rizz lines" width="600" height="400" className="rounded-xl shadow-lg mx-auto mb-8" />
        <p className="text-gray-700 text-center mt-8">
          Want more inspiration? <a href="/generator" className="text-blue-600 underline">Try our Rizz Line Generator</a> for even more <strong>rizz lines</strong> and pickup line ideas!
        </p>
      </main>
      <SiteFooter />
    </div>
  );
} 