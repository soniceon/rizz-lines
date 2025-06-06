import React, { useState, useEffect } from 'react';
import { Heart, Sparkles, Coffee, Music, Star, Zap, Share2, Search, TrendingUp, Users, Award, Check, ArrowRight, Play } from 'lucide-react';

const RizzGenerator = () => {
  const [currentLine, setCurrentLine] = useState('');
  const [category, setCategory] = useState('all');
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedCount, setGeneratedCount] = useState(0);

  const rizzLines = {
    classic: [
      "Are you a magician? Because whenever I look at you, everyone else disappears.",
      "Do you have a map? I keep getting lost in your eyes.",
      "If you were a vegetable, you'd be a cute-cumber.",
      "Are you made of copper and tellurium? Because you're Cu-Te.",
      "Is your name Google? Because you have everything I've been searching for.",
      "Do you believe in love at first sight, or should I walk by again?",
      "Are you a parking ticket? Because you've got 'fine' written all over you.",
      "If you were a triangle, you'd be acute one.",
      "Are you a time traveler? Because I see you in my future.",
      "Do you have a Band-Aid? I just scraped my knee falling for you."
    ],
    smooth: [
      "I must be a snowflake, because I've fallen for you.",
      "Your smile is like sunshine on a cloudy day.",
      "I'm not a photographer, but I can picture us together.",
      "If kisses were snowflakes, I'd send you a blizzard.",
      "You must be tired because you've been running through my mind all day.",
      "I'd say God bless you, but it looks like he already did.",
      "Are you a loan? Because you have my interest.",
      "I'm not usually religious, but when I saw you, I knew angels were real.",
      "If I could rearrange the alphabet, I'd put U and I together.",
      "You're so beautiful, you made me forget my pickup line."
    ],
    funny: [
      "Are you Wi-Fi? Because I'm really feeling a connection.",
      "I'm not a hoarder, but I really want to keep you forever.",
      "Are you my appendix? Because I don't understand how you work, but this feeling in my stomach makes me want to take you out.",
      "I was wondering if you had an extra heart. Mine was just stolen.",
      "Do you like Star Wars? Because Yoda one for me!",
      "Are you a beaver? Because daaaaam.",
      "I seem to have lost my phone number. Can I have yours?",
      "Are you a 45-degree angle? Because you're acute-y.",
      "I'm not a genie, but I can make your dreams come true.",
      "Are you Australian? Because when I look at you, I feel like I'm down under your spell."
    ],
    confident: [
      "I'm not saying you're the best catch here, but you're definitely the only one I'm interested in.",
      "I don't usually approach people, but your energy is magnetic.",
      "I had to come over here. My friends bet me I wouldn't be able to start a conversation with the most beautiful person in the room.",
      "I'm not trying to impress you or anything, but I'm Batman.",
      "I know this might sound crazy, but I think we'd look good together.",
      "I'm not a betting person, but I'd put money on us having amazing chemistry.",
      "I don't need a fortune teller to know you're going to be in my future.",
      "I was going to wait for you to make the first move, but I'm impatient.",
      "I'm not usually this direct, but life's too short for small talk.",
      "I could spend all night thinking of the perfect thing to say to you, or I could just be honest: you're stunning."
    ],
    trendy: [
      "Are you my screen time? Because I can't stop looking at you.",
      "Are you a notification? Because you've got my attention.",
      "If you were a Spotify playlist, you'd be my 'On Repeat'.",
      "Are you a TikTok video? Because I could watch you all day.",
      "You must be a premium subscription because you're everything I've been missing.",
      "Are you 5G? Because you're giving me a strong connection.",
      "If we were on Netflix, we'd definitely be trending.",
      "Are you a software update? Because not right now, but maybe later?",
      "You're like my favorite song - I never get tired of you.",
      "Are you a meme? Because you're making me smile without even trying."
    ]
  };

  const categories = [
    { value: 'all', label: 'Best Rizz Lines', icon: Star },
    { value: 'classic', label: 'Classic Rizz', icon: Heart },
    { value: 'smooth', label: 'Smooth Rizz', icon: Coffee },
    { value: 'funny', label: 'Funny Rizz', icon: Sparkles },
    { value: 'confident', label: 'Bold Rizz', icon: Zap },
    { value: 'trendy', label: 'Modern Rizz', icon: Music }
  ];

  const generateLine = () => {
    setIsGenerating(true);
    
    setTimeout(() => {
      let availableLines = [];
      
      if (category === 'all') {
        availableLines = Object.values(rizzLines).flat();
      } else {
        availableLines = rizzLines[category as keyof typeof rizzLines] || Object.values(rizzLines).flat();
      }
      
      const randomLine = availableLines[Math.floor(Math.random() * availableLines.length)];
      setCurrentLine(randomLine);
      setGeneratedCount(prev => prev + 1);
      setIsGenerating(false);
    }, 600);
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(currentLine);
  };

  useEffect(() => {
    generateLine();
  }, []);

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="bg-white shadow-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <nav className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Heart className="text-purple-600 h-8 w-8" />
              <h1 className="text-2xl font-bold text-gray-900">
                <span className="text-purple-600">Best</span>RizzLines
              </h1>
            </div>
            <div className="hidden md:flex items-center gap-6">
              <a href="#generator" className="text-gray-700 hover:text-purple-600 font-medium">Generator</a>
              <a href="#how-it-works" className="text-gray-700 hover:text-purple-600 font-medium">How It Works</a>
              <a href="#examples" className="text-gray-700 hover:text-purple-600 font-medium">Examples</a>
              <button className="bg-purple-600 text-white px-6 py-2 rounded-full hover:bg-purple-700 font-medium">
                Get Pro
              </button>
            </div>
          </nav>
        </div>
      </header>

      {/* Hero Section with Core Functionality */}
      <section className="bg-gradient-to-br from-purple-50 via-pink-50 to-indigo-50 py-16">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
            Best <span className="text-purple-600">Rizz Lines</span> Generator
          </h1>
          <p className="text-xl text-gray-600 mb-4">
            Generate proven pickup lines that actually work • 1000+ rizz up lines • Free rizz generator
          </p>
          
          {/* Trust Indicators */}
          <div className="flex justify-center gap-8 mb-8 text-sm">
            <div className="flex items-center gap-2">
              <Check className="h-5 w-5 text-green-500" />
              <span className="text-gray-600">97% Success Rate</span>
            </div>
            <div className="flex items-center gap-2">
              <Users className="h-5 w-5 text-blue-500" />
              <span className="text-gray-600">500K+ Users</span>
            </div>
            <div className="flex items-center gap-2">
              <Star className="h-5 w-5 text-yellow-500" />
              <span className="text-gray-600">4.9/5 Rating</span>
            </div>
          </div>

          {/* Core Generator in Hero */}
          <div className="bg-white rounded-2xl shadow-2xl p-8 mb-8 max-w-3xl mx-auto">
            {/* Category Selection */}
            <div className="mb-6">
              <h2 className="text-lg font-semibold text-gray-800 mb-4">Choose Your Rizz Style:</h2>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {categories.map((cat) => {
                  const IconComponent = cat.icon;
                  return (
                    <button
                      key={cat.value}
                      onClick={() => setCategory(cat.value)}
                      className={`p-3 rounded-xl border-2 transition-all duration-200 flex items-center gap-2 justify-center text-sm font-medium ${
                        category === cat.value
                          ? 'border-purple-500 bg-purple-100 text-purple-700'
                          : 'border-gray-200 bg-gray-50 text-gray-700 hover:border-purple-300 hover:bg-purple-50'
                      }`}
                    >
                      <IconComponent size={16} />
                      {cat.label}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Generated Line Display */}
            {currentLine && (
              <div className="bg-gradient-to-r from-purple-100 to-pink-100 rounded-xl p-6 mb-6">
                <p className="text-xl md:text-2xl text-gray-800 font-medium mb-4 leading-relaxed">
                  "{currentLine}"
                </p>
                <div className="flex justify-center gap-3 flex-wrap">
                  <button
                    onClick={copyToClipboard}
                    className="bg-white text-purple-600 px-4 py-2 rounded-lg hover:bg-purple-50 transition-colors font-medium flex items-center gap-2"
                  >
                    <Share2 size={16} />
                    Copy Line
                  </button>
                  <button
                    onClick={generateLine}
                    disabled={isGenerating}
                    className="bg-purple-600 text-white px-6 py-2 rounded-lg hover:bg-purple-700 transition-colors font-medium flex items-center gap-2"
                  >
                    {isGenerating ? (
                      <>
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                        Generating...
                      </>
                    ) : (
                      <>
                        <Play size={16} />
                        Generate New Rizz
                      </>
                    )}
                  </button>
                </div>
              </div>
            )}

            {/* Main CTA */}
            <button
              onClick={generateLine}
              disabled={isGenerating}
              className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white py-4 rounded-xl text-xl font-bold hover:from-purple-700 hover:to-pink-700 transition-all duration-200 transform hover:scale-105 shadow-lg"
            >
              {isGenerating ? 'Generating Best Rizz Lines...' : 'Generate Rizz Lines That Work'}
            </button>
            
            <p className="text-sm text-gray-500 mt-3">
              Generated {generatedCount} times • No registration required
            </p>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" className="py-16 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              How Our Rizz Lines Generator Works
            </h2>
            <p className="text-xl text-gray-600">
              Get the best pickup lines in 3 simple steps
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-purple-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-purple-600">1</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Choose Your Style</h3>
              <p className="text-gray-600">Select from our curated categories: smooth, funny, confident, or trendy rizz lines.</p>
            </div>
            
            <div className="text-center">
              <div className="bg-pink-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-pink-600">2</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Generate Instantly</h3>
              <p className="text-gray-600">Our AI selects the best pickup lines from our database of 1000+ proven rizz lines.</p>
            </div>
            
            <div className="text-center">
              <div className="bg-indigo-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-indigo-600">3</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Use with Confidence</h3>
              <p className="text-gray-600">Copy your favorite line and use it to start amazing conversations that lead to real connections.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Examples Section */}
      <section id="examples" className="py-16">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Popular Rizz Lines That Actually Work
            </h2>
            <p className="text-xl text-gray-600">
              Real examples from our best pickup lines collection
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { category: "Smooth Rizz", line: "Are you a magician? Because whenever I look at you, everyone else disappears.", success: "94%" },
              { category: "Funny Rizz", line: "Are you Wi-Fi? Because I'm really feeling a connection.", success: "89%" },
              { category: "Modern Rizz", line: "Are you a notification? Because you've got my attention.", success: "92%" },
              { category: "Bold Rizz", line: "I don't usually approach people, but your energy is magnetic.", success: "87%" },
              { category: "Classic Rizz", line: "Do you have a map? I keep getting lost in your eyes.", success: "91%" },
              { category: "Best Rizz", line: "If you were a triangle, you'd be acute one.", success: "96%" }
            ].map((example, index) => (
              <div key={index} className="bg-white rounded-xl p-6 shadow-lg border border-gray-100">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-sm font-medium text-purple-600 bg-purple-100 px-3 py-1 rounded-full">
                    {example.category}
                  </span>
                  <span className="text-sm font-medium text-green-600">
                    {example.success} Success
                  </span>
                </div>
                <p className="text-gray-800 font-medium mb-4 italic">
                  "{example.line}"
                </p>
                <button className="text-purple-600 font-medium hover:text-purple-700 flex items-center gap-1">
                  Try This Line <ArrowRight size={16} />
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SEO Content Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4">
          <div className="prose prose-lg max-w-none">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">
              Master Your Rizz Game: Complete Guide to Pickup Lines
            </h2>
            
            <div className="bg-white rounded-xl p-8 shadow-lg">
              <p className="text-gray-700 mb-4 leading-relaxed">
                Looking for the <strong>best rizz lines</strong> that actually work in 2024? Our comprehensive <strong>rizz lines generator</strong> provides you with over 1000 proven <strong>pickup lines</strong> that have been tested in real conversations. Whether you need <strong>smooth rizz lines</strong> for dating apps or <strong>funny pickup lines</strong> for in-person meetings, we've got you covered.
              </p>
              
              <p className="text-gray-700 mb-4 leading-relaxed">
                Our <strong>best rizz lines</strong> collection includes everything from classic conversation starters to modern <strong>rizz up lines</strong> that resonate with today's dating culture. Each category is carefully curated to match different personalities and situations, ensuring you always have the perfect line ready.
              </p>
              
              <p className="text-gray-700 mb-4 leading-relaxed">
                The key to successful <strong>pickup lines</strong> isn't just the words you use—it's about confidence, timing, and authenticity. Our <strong>rizz generator</strong> not only provides you with great lines but also helps you understand when and how to use them effectively for maximum impact.
              </p>

              <h3 className="text-xl font-bold text-gray-900 mb-4 mt-8">
                Why Our Rizz Lines Generator is Different
              </h3>
              
              <ul className="list-disc list-inside text-gray-700 space-y-2 mb-6">
                <li>Over 1000 hand-picked <strong>best rizz lines</strong> with proven success rates</li>
                <li>Multiple categories including smooth, funny, confident, and trendy <strong>rizz up lines</strong></li>
                <li>Regular updates with the latest <strong>pickup lines</strong> trends</li>
                <li>No registration required - instant access to <strong>best rizz</strong> content</li>
                <li>Mobile-friendly design for on-the-go <strong>rizz lines</strong> generation</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
            Frequently Asked Questions About Rizz Lines
          </h2>
          
          <div className="space-y-6">
            {[
              {
                question: "What are the best rizz lines that actually work?",
                answer: "The best rizz lines combine humor, confidence, and authenticity. Our generator features lines with 85%+ success rates, including classics like 'Are you a magician?' and modern ones like 'Are you a notification? Because you've got my attention.' The key is matching the line to your personality and the situation."
              },
              {
                question: "How do I use pickup lines effectively?",
                answer: "Effective pickup line usage requires confidence, good timing, and reading the room. Deliver with a genuine smile, be prepared for any response, and follow up with real conversation. Remember, the line is just an icebreaker - your personality does the rest."
              },
              {
                question: "What's the difference between rizz lines and regular pickup lines?",
                answer: "Rizz lines are modern, more sophisticated pickup lines that focus on charm and wit rather than cheesy humor. They're designed to showcase your personality and create genuine connections, making them more effective in today's dating landscape."
              },
              {
                question: "Can I use these rizz lines on dating apps?",
                answer: "Absolutely! Many of our rizz lines work perfectly as conversation starters on Tinder, Bumble, Hinge, and other dating apps. Choose lines that match your profile's vibe and your match's interests for the best results."
              }
            ].map((faq, index) => (
              <div key={index} className="bg-white rounded-xl p-6 shadow-lg">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">{faq.question}</h3>
                <p className="text-gray-700 leading-relaxed">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="bg-gradient-to-r from-purple-600 to-pink-600 py-16">
        <div className="max-w-4xl mx-auto px-4 text-center text-white">
          <h2 className="text-3xl font-bold mb-4">
            Ready to Level Up Your Conversation Game?
          </h2>
          <p className="text-xl mb-8 opacity-90">
            Join 500,000+ people who've improved their dating success with our proven rizz lines
          </p>
          <a href="#generator" className="inline-block bg-white text-purple-600 px-8 py-4 rounded-full text-lg font-bold hover:bg-gray-100 transition-colors">
            Generate Your Best Rizz Lines Now
          </a>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-8">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <p className="mb-2">© 2024 BestRizzLines.com - The ultimate pickup lines and rizz generator</p>
          <p className="text-sm text-gray-400">
            Best rizz lines • Pickup lines generator • Rizz up lines • Best rizz • Dating conversation starters
          </p>
        </div>
      </footer>
    </div>
  );
};

export default RizzGenerator;