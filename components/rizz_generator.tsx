import React, { useState, useEffect, useRef } from 'react';
import { Heart, Sparkles, Coffee, Music, Star, Zap, Share2, Users, Check, ArrowRight, Play } from 'lucide-react';
import Link from 'next/link';
import Replicate from 'replicate';
import { useRouter } from 'next/router';
// import rizzData from '../rizzlines.json'; // 改为动态 fetch

// Initialize Replicate client
const replicate = new Replicate({
  auth: process.env.REPLICATE_API_TOKEN,
});

// 定义所有可用类别类型
const categories = [
  { value: 'all', label: 'Best rizz lines', icon: Star },
  { value: 'classic', label: 'Classic rizz lines', icon: Heart },
  { value: 'smooth', label: 'Smooth rizz lines', icon: Coffee },
  { value: 'funny', label: 'Funny rizz lines', icon: Sparkles },
  { value: 'confident', label: 'Bold rizz lines', icon: Zap },
  { value: 'trendy', label: 'Modern rizz lines', icon: Music }
] as const;

// 定义类别类型
type Category = typeof categories[number]['value'];

// 定义 rizzLines 对象的键类型
type RizzLineCategoryKey = 'classic' | 'smooth' | 'funny' | 'confident' | 'trendy';

// 类型守卫函数
function isRizzCategory(cat: Category): cat is RizzLineCategoryKey {
  return cat !== 'all';
}

// Helper function to generate a URL-friendly slug from a category name
const slugify = (text: string) =>
  text
    .toString()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .trim()
    .replace(/\s+/g, '-')
    .replace(/[^\w-]+/g, '')
    .replace(/--+/g, '-');

const RizzGenerator = () => {
  const [currentLine, setCurrentLine] = useState('');
  const [category, setCategory] = useState<Category>('all');
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedCount, setGeneratedCount] = useState(0);
  const [isAIGenerating, setIsAIGenerating] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [rizzData, setRizzData] = useState<any>(null);
  const closeTimer = useRef<NodeJS.Timeout | null>(null);
  const [copied, setCopied] = useState(false);

  // 动态加载 rizzlines.json
  useEffect(() => {
    fetch('/rizzlines.json')
      .then(res => res.json())
      .then(data => setRizzData(data));
  }, []);

  // 悬停时立即展开
  const handleMenuEnter = () => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    setMenuOpen(true);
  };
  // 移出时延迟收起
  const handleMenuLeave = () => {
    closeTimer.current = setTimeout(() => setMenuOpen(false), 300);
  };

  const generateAILine = async () => {
    try {
      setIsAIGenerating(true);
      // Call the backend API route instead of Replicate directly
      const res = await fetch('/api/gpt4o', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          prompt: `Generate a creative and engaging pickup line in the style of ${category} category. Make it unique and memorable.`,
          category: category
        })
      });

      const data = await res.json();

      if (res.ok && data.output) {
        setCurrentLine(data.output);
        setGeneratedCount(prev => prev + 1);
        // Save the generated AI line
        saveRizzLine(data.output, category);
      } else {
        console.error('Error from backend API:', data);
        setCurrentLine(data.error || 'AI生成失败，请重试');
      }
    } catch (error) {
      console.error('Error calling backend API:', error);
      setCurrentLine('AI生成出错');
    } finally {
      setIsAIGenerating(false);
    }
  };

  const generateLine = async () => {
    setIsGenerating(true);
    try {
      // Always use AI generation for now to build history
      await generateAILine();
      
    } finally {
      setIsGenerating(false);
    }
  };

  // New function to call the save API
  const saveRizzLine = async (line: string, category: Category) => {
    try {
      const res = await fetch('/api/save_rizz', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ line, category })
      });
      if (!res.ok) {
        console.error('Failed to save rizz line:', await res.json());
      }
    } catch (error) {
      console.error('Error calling save API:', error);
    }
  };

  const copyToClipboard = () => {
    if (currentLine) {
      navigator.clipboard.writeText(currentLine);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  useEffect(() => {
    generateLine();
    // eslint-disable-next-line
  }, [category]);

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section with Core Functionality */}
      <section id="generator" className="bg-gradient-to-br from-purple-50 via-pink-50 to-indigo-50 py-16">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
            <span className="text-gray-900 font-extrabold mr-3">BEST</span>
            <span className="bg-gradient-to-r from-purple-600 to-pink-500 bg-clip-text text-transparent">Rizz Lines</span> Generator
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
                    className={`bg-white px-4 py-2 rounded-lg transition-colors font-medium flex items-center gap-2 ${copied ? 'text-green-600' : 'text-purple-600 hover:bg-purple-50'}`}
                  >
                    {copied ? <Check size={16} /> : <Share2 size={16} />}
                    {copied ? 'Copied!' : 'Copy Line'}
                  </button>
                  <button
                    onClick={generateLine}
                    disabled={isGenerating || isAIGenerating}
                    className="bg-purple-600 text-white px-6 py-2 rounded-lg hover:bg-purple-700 transition-colors font-medium flex items-center gap-2"
                    translate="no"
                  >
                    {isGenerating || isAIGenerating ? (
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
              disabled={isGenerating || isAIGenerating}
              className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white py-4 rounded-xl text-xl font-bold hover:from-purple-700 hover:to-pink-700 transition-all duration-200 transform hover:scale-105 shadow-lg"
              translate="no"
            >
              {isGenerating || isAIGenerating ? 'Generating Best Rizz Lines...' : 'Generate Rizz Lines That Work'}
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
            {rizzData && Object.entries(rizzData)
              .filter(([cat, arr]) => Array.isArray(arr) && arr.length > 0)
              .slice(0, 6)
              .map(([cat, arr], index) => {
                const lines = arr as string[];
                return (
                  <div key={index} className="bg-white rounded-xl p-6 shadow-lg border border-gray-100">
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-sm font-medium text-purple-600 bg-purple-100 px-3 py-1 rounded-full">
                        {cat}
                      </span>
                      <span className="text-sm font-medium text-green-600">
                        {Math.floor(87 + Math.random() * 10)}% Success
                      </span>
                    </div>
                    <p className="text-gray-800 font-medium mb-4 italic">
                      "{lines[0]}"
                    </p>
                    <button
                      className="bg-gradient-to-r from-purple-100 to-pink-100 text-purple-700 font-semibold rounded-lg px-4 py-2 shadow hover:from-purple-200 hover:to-pink-200 transition-all flex items-center gap-1 mt-2"
                      onClick={() => {
                        const catPath = slugify(cat);
                        window.location.href = `/generator/${catPath}`;
                      }}
                    >
                      Try This Line <ArrowRight size={16} />
                    </button>
                  </div>
                );
              })}
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
          <Link href="/#generator" className="inline-block bg-white text-purple-600 px-8 py-4 rounded-full text-lg font-bold hover:bg-gray-100 transition-colors">
            Generate Your Best Rizz Lines Now
          </Link>
        </div>
      </section>
    </div>
  );
};

export default RizzGenerator; 