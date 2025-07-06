import React, { useState, useEffect, useRef } from 'react';
import { Heart, Sparkles, Coffee, Music, Star, Zap, Share2, Users, Check, ArrowRight, Play, MessageCircle, Smile, Code, Crown } from 'lucide-react';
import Link from 'next/link';
import Replicate from 'replicate';
import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';

interface RizzGeneratorProps {
  rizzData?: any;
}

// Initialize Replicate client
const replicate = new Replicate({
  auth: process.env.REPLICATE_API_TOKEN,
});

// 分类英文名到i18n key的映射（补全所有主流cat.name）
const CATEGORY_KEY_MAP: { [key: string]: string } = {
  'Best rizz lines': 'bestRizzLines',
  'Classic Rizz Lines': 'classicRizzLines',
  'Smooth rizz lines': 'smoothRizzLines',
  'Funny Rizz Lines': 'funnyRizzLines',
  'Bold rizz lines': 'boldRizzLines',
  'Modern rizz lines': 'modernRizzLines',
  'Cheesy Rizz Lines': 'cheesyRizzLines',
  'Rizz pick-up lines': 'rizzPickupLines',
  'Cute Rizz Lines': 'cuteRizzLines',
  'Dirty Pickup Lines to Use on Girl Over Text': 'dirtyPickupLinesToUseOnGirlOverText',
  'Dirty Pickup Lines to Make Her Laugh': 'dirtyPickupLinesToMakeHerLaugh',
  // 其它可能的主流key
  'Flirty Rizz Lines': 'flirtyRizzLines',
  'Romantic Rizz Lines': 'romanticRizzLines',
  'Steamy Rizz Lines': 'steamyRizzLines',
  'Creative Rizz Lines': 'creativeRizzLines',
  'Clever Rizz Lines': 'cleverRizzLines',
  'Witty Rizz Lines To Say': 'wittyRizzLinesToSay',
  'Funny Tinder pickup lines': 'funnyTinderPickupLines',
  'Cheesy Tinder pickup lines': 'cheesyTinderPickupLines',
  'Genuine Tinder pickup lines': 'genuineTinderPickupLines',
  'Tinder pickup lines for guys': 'tinderPickupLinesForGuys',
  'Tinder pickup lines for girls': 'tinderPickupLinesForGirls',
  'Bold rizz pick-up lines': 'boldRizzPickUpLines',
  'Flirty rizz pick-up lines': 'flirtyRizzPickUpLines',
  'Corny rizz pick-up lines': 'cornyRizzPickUpLines',
  'Dirty Pickup Lines': 'dirtyPickupLines',
  'Dirty Pickup Lines for Him': 'dirtyPickupLinesForHim',
  'Dirty Pickup Lines for Her': 'dirtyPickupLinesForHer',
  'Dirty Pickup Lines To Make Her Laugh': 'dirtyPickupLinesToMakeHerLaugh',
  'Sexy Pick Up Lines': 'sexyPickUpLines',
  'Flirty Pick Up Lines': 'flirtyPickUpLines',
  'Corny Pick Up Lines': 'cornyPickUpLines',
  '中文搭讪话术': 'chinesePickUpLines',
  '日本語のナンパフレーズ': 'japanesePickUpLines',
  '한국어 대화 문구': 'koreanPickUpLines',
  'Phrases d\'accroche en français': 'frenchPickUpLines',
  'Frases para ligar en español': 'spanishPickUpLines',
  'Deutsche Anmachsprüche': 'germanPickUpLines',
  'best': 'bestRizzLines',
};

type Category = 
  | 'best'
  | 'classic'
  | 'smooth'
  | 'funny'
  | 'bold'
  | 'modern';

const CATEGORY_VALUE_TO_JSON_KEY = {
  'best': 'Best rizz lines',
  'classic': 'Classic Rizz Lines',
  'smooth': 'Smooth rizz lines',
  'funny': 'Funny Rizz Lines',
  'bold': 'Bold rizz lines',
  'modern': 'Modern rizz lines'
} as const;

const MAIN_CATEGORY_KEYS = [
  "Rizz pick-up lines",
  "Best rizz lines",
  "Smooth rizz lines",
  "Funny Rizz Lines",
  "Cheesy Rizz Lines",
  "Flirty Rizz Lines",
  "Classic Rizz Lines",
  "Cute Rizz Lines",
];

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

const RIZZ_DAILY_LIMIT = 5;

const getToday = () => new Date().toISOString().slice(0, 10);

function getLocalCount() {
  const key = 'rizz_gen_count';
  const today = getToday();
  const data = JSON.parse(localStorage.getItem(key) || '{}');
  if (data.date !== today) {
    localStorage.setItem(key, JSON.stringify({ date: today, count: 0 }));
    return 0;
  }
  return data.count || 0;
}
function incLocalCount() {
  const key = 'rizz_gen_count';
  const today = getToday();
  const data = JSON.parse(localStorage.getItem(key) || '{}');
  if (data.date !== today) {
    localStorage.setItem(key, JSON.stringify({ date: today, count: 1 }));
  } else {
    localStorage.setItem(key, JSON.stringify({ date: today, count: (data.count || 0) + 1 }));
  }
}

const RizzGenerator: React.FC<RizzGeneratorProps> = ({ rizzData: propRizzData }) => {
  const [currentLine, setCurrentLine] = useState('');
  const [category, setCategory] = useState<Category>('best');
  const [isGenerating, setIsGenerating] = useState(false);
  const [isFirstLoad, setIsFirstLoad] = useState(true);
  const [generatedCount, setGeneratedCount] = useState(0);
  const [isAIGenerating, setIsAIGenerating] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [rizzData, setRizzData] = useState<any>(propRizzData || null);
  const closeTimer = useRef<NodeJS.Timeout | null>(null);
  const [copied, setCopied] = useState(false);
  const { t, i18n } = useTranslation('common');
  const lang = i18n.language || 'en';
  const [usedCount, setUsedCount] = useState(0);

  useEffect(() => {
    setUsedCount(getLocalCount());
  }, []);

  useEffect(() => {
    if (!propRizzData) {
      fetch(`/locales/${lang}/rizzlines.json`)
        .then(res => res.json())
        .then(data => setRizzData(data));
    }
  }, [lang, propRizzData]);

  // 只保留6个风格类型
  const categories = [
    { value: 'best', label: t('bestRizzLines'), icon: '☆' },
    { value: 'classic', label: t('classicRizzLines'), icon: '♡' },
    { value: 'smooth', label: t('smoothRizzLines'), icon: '☕' },
    { value: 'funny', label: t('funnyRizzLines'), icon: '✨' },
    { value: 'bold', label: t('boldRizzLines'), icon: '⚡' },
    { value: 'modern', label: t('modernRizzLines'), icon: '🎵' }
  ] as const;

  // 本地数据获取
  const getRandomLine = async () => {
    try {
      const res = await fetch(`/api/rizzlines?category=${category}&language=${i18n.language}`);
      const data = await res.json();
      if (data && data.length > 0) {
        setCurrentLine(data[0]);
      }
    } catch (error) {
      console.error('Error fetching random line:', error);
    }
  };

  // 切换风格时自动展示本地数据
  const handleCategoryChange = async (cat: Category) => {
    setCategory(cat);
    await getRandomLine();
  };

  // 只有AI生成才计数
  const generateLineAI = async () => {
    if (usedCount >= RIZZ_DAILY_LIMIT) {
      alert('今日免费额度已用完，请明天再来！');
      return;
    }
    setIsGenerating(true);
    try {
      const res = await fetch('/api/gpt4o', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          prompt: `Generate a creative and engaging pickup line in the style of ${category} category. Make it unique and memorable.`,
          category,
          language: i18n.language
        })
      });
      if (res.status === 429) {
        alert('今日免费额度已用完，请明天再来！');
        setUsedCount(RIZZ_DAILY_LIMIT);
        setIsGenerating(false);
        return;
      }
      const data = await res.json();
      if (data.output) {
        setCurrentLine(data.output);
        incLocalCount();
        setUsedCount(getLocalCount());
      }
    } catch (error) {
      console.error('Error generating line:', error);
      setCurrentLine(
        i18n.language === 'zh' ? '生成失败，请重试' :
        i18n.language === 'ja' ? '生成に失敗しました' :
        i18n.language === 'ko' ? '생성 실패' :
        'Generation failed'
      );
    } finally {
      setIsGenerating(false);
    }
  };

  // 复制到剪贴板
  const copyToClipboard = () => {
    navigator.clipboard.writeText(currentLine);
  };

  // 首次加载和切换风格时展示本地数据
  useEffect(() => {
    getRandomLine();
  }, [category, i18n.language]);

  // 动态获取内容最多的6个分类
  const topCategories = rizzData
    ? MAIN_CATEGORY_KEYS
        .map(key => ({
          name: key,
          arr: (rizzData[key] || []).filter((line: string) => line && line.trim() !== ''),
          count: ((rizzData[key] || []).filter((line: string) => line && line.trim() !== '')).length
        }))
        .filter(cat => cat.count > 0)
        .sort((a, b) => b.count - a.count)
        .slice(0, 6)
    : [];

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section with Core Functionality */}
      <section id="generator" className="bg-gradient-to-br from-purple-50 via-pink-50 to-indigo-50 py-16">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
            <span className="text-gray-900 font-extrabold mr-3">{t('mainTitle')}</span>
            <span className="bg-gradient-to-r from-purple-600 to-pink-500 bg-clip-text text-transparent">{t('siteName')}</span> {t('generator')}
          </h1>
          <p className="text-xl text-gray-600 mb-4">
            {t('mainSubtitle')}
          </p>
          {/* Trust Indicators */}
          <div className="flex justify-center gap-8 mb-8 text-sm">
            <div className="flex items-center gap-2">
              <Check className="h-5 w-5 text-green-500" />
              <span className="text-gray-600">{t('successRate')}</span>
            </div>
            <div className="flex items-center gap-2">
              <Users className="h-5 w-5 text-blue-500" />
              <span className="text-gray-600">{t('users')}</span>
            </div>
            <div className="flex items-center gap-2">
              <Star className="h-5 w-5 text-yellow-500" />
              <span className="text-gray-600">{t('rating')}</span>
            </div>
          </div>
          {/* Core Generator in Hero */}
          <div className="bg-white rounded-2xl shadow-2xl p-8 mb-8 max-w-3xl mx-auto">
            {/* Category Selection */}
            <div className="mb-6">
              <h2 className="text-lg font-semibold text-gray-800 mb-4">{t('chooseRizzStyle')}:</h2>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {categories.map((cat) => (
                  <button
                    key={cat.value}
                    onClick={() => handleCategoryChange(cat.value)}
                    className={`p-3 rounded-xl border-2 transition-all duration-200 flex items-center gap-2 justify-center text-sm font-medium ${
                      category === cat.value
                        ? 'border-purple-500 bg-purple-100 text-purple-700'
                        : 'border-gray-200 bg-gray-50 text-gray-700 hover:border-purple-300 hover:bg-purple-50'
                    }`}
                  >
                    <span>{cat.icon}</span>
                    {cat.label}
                  </button>
                ))}
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
                    {copied ? t('copied') : t('copy')}
                  </button>
                  <button
                    onClick={getRandomLine}
                    disabled={isGenerating || isAIGenerating}
                    className="bg-gray-200 text-gray-700 px-6 py-2 rounded-lg hover:bg-gray-300 transition-colors font-medium flex items-center gap-2"
                  >
                    <Smile size={16} />
                    {t('generateLocal')}
                  </button>
                  <button
                    onClick={generateLineAI}
                    disabled={isGenerating || isAIGenerating}
                    className="bg-purple-600 text-white px-6 py-2 rounded-lg hover:bg-purple-700 transition-colors font-medium flex items-center gap-2"
                  >
                    {isGenerating || isAIGenerating ? (
                      <>
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                        {t('generating')}
                      </>
                    ) : (
                      <>
                        <Play size={16} />
                        {t('generateAI')}
                      </>
                    )}
                  </button>
                </div>
              </div>
            )}
            {/* Main CTA */}
            <button
              onClick={generateLineAI}
              disabled={isGenerating || isAIGenerating}
              className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white py-4 rounded-xl text-xl font-bold hover:from-purple-700 hover:to-pink-700 transition-all duration-200 transform hover:scale-105 shadow-lg"
            >
              {isGenerating || isAIGenerating ? t('generatingBestRizzLines') : t('generateRizzLinesThatWork')}
            </button>
            <p className="text-sm text-gray-500 mt-3">
              {t('aiQuotaTip', { limit: RIZZ_DAILY_LIMIT, left: RIZZ_DAILY_LIMIT - usedCount })}
            </p>
          </div>
        </div>
      </section>
      {/* How It Works Section */}
      <section id="how-it-works" className="py-16 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              {t('generatorWorksTitle')}
            </h2>
            <p className="text-xl text-gray-600">
              {t('generatorWorksDesc')}
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-purple-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-purple-600">1</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">{t('step1Title')}</h3>
              <p className="text-gray-600">{t('step1Desc')}</p>
            </div>
            <div className="text-center">
              <div className="bg-pink-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-pink-600">2</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">{t('step2Title')}</h3>
              <p className="text-gray-600">{t('step2Desc')}</p>
            </div>
            <div className="text-center">
              <div className="bg-indigo-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-indigo-600">3</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">{t('step3Title')}</h3>
              <p className="text-gray-600">{t('step3Desc')}</p>
            </div>
          </div>
        </div>
      </section>
      {/* Examples Section */}
      <section id="examples" className="py-16">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              {t('popularRizzLinesTitle')}
            </h2>
            <p className="text-xl text-gray-600">
              {t('popularRizzLinesDesc')}
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {topCategories.map((cat, index) => {
              const cardLines = cat.arr as any[];
              const randomLineObj = cardLines[Math.floor(Math.random() * cardLines.length)];
              const displayText =
                typeof randomLineObj === 'string'
                  ? randomLineObj
                  : (randomLineObj?.[lang] || randomLineObj?.en || '');
              return (
                <div key={index} className="bg-white rounded-xl p-6 shadow-lg border border-gray-100">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-sm font-medium text-purple-600 bg-purple-100 px-3 py-1 rounded-full">
                      {t(CATEGORY_KEY_MAP[cat.name] || cat.name)}
                    </span>
                    <span className="text-sm font-medium text-green-600">
                      {t('successRate', { rate: Math.floor(87 + Math.random() * 10) })}
                    </span>
                  </div>
                  <p className="text-gray-800 font-medium mb-4 italic">
                    "{displayText}"
                  </p>
                  <button
                    className="bg-gradient-to-r from-purple-100 to-pink-100 text-purple-700 font-semibold rounded-lg px-4 py-2 shadow hover:from-purple-200 hover:to-pink-200 transition-all flex items-center gap-1 mt-2"
                    onClick={() => {
                      const catPath = slugify(cat.name);
                      const currentLang = i18n.language || 'en';
                      window.location.href = `/${currentLang}/generator/${catPath}`;
                    }}
                  >
                    {t('tryThisLine')} <ArrowRight size={16} />
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
              {t('masterGuideTitle')}
            </h2>
            <div className="bg-white rounded-xl p-8 shadow-lg">
              <p className="text-gray-700 mb-4 leading-relaxed">
                {t('masterGuideDesc1')}
              </p>
              <p className="text-gray-700 mb-4 leading-relaxed">
                {t('masterGuideDesc2')}
              </p>
              <p className="text-gray-700 mb-4 leading-relaxed">
                {t('masterGuideDesc3')}
              </p>
              <h3 className="text-xl font-bold text-gray-900 mb-4 mt-8">
                {t('whyDifferentTitle')}
              </h3>
              <ul className="list-disc list-inside text-gray-700 space-y-2 mb-6">
                <li>{t('whyDifferent1')}</li>
                <li>{t('whyDifferent2')}</li>
                <li>{t('whyDifferent3')}</li>
                <li>{t('whyDifferent4')}</li>
                <li>{t('whyDifferent5')}</li>
              </ul>
            </div>
          </div>
        </div>
      </section>
      {/* FAQ Section */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
            {t('faqTitle')}
          </h2>
          <div className="space-y-6">
            {[
              {
                question: t('faq1Q'),
                answer: t('faq1A')
              },
              {
                question: t('faq2Q'),
                answer: t('faq2A')
              },
              {
                question: t('faq3Q'),
                answer: t('faq3A')
              },
              {
                question: t('faq4Q'),
                answer: t('faq4A')
              }
            ].map((faq, index) => (
              <div key={index} className="bg-white rounded-xl p-6 shadow-lg">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">{t(faq.question)}</h3>
                <p className="text-gray-700 leading-relaxed">{t(faq.answer)}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      {/* Final CTA */}
      <section className="bg-gradient-to-r from-purple-600 to-pink-600 py-16">
        <div className="max-w-4xl mx-auto px-4 text-center text-white">
          <h2 className="text-3xl font-bold mb-4">
            {t('finalCtaTitle')}
          </h2>
          <p className="text-xl mb-8 opacity-90">
            {t('finalCtaDesc')}
          </p>
          <Link href="/#generator" className="inline-block bg-white text-purple-600 px-8 py-4 rounded-full text-lg font-bold hover:bg-gray-100 transition-colors">
            {t('ctaButton')}
          </Link>
        </div>
      </section>
    </div>
  );
};

export default RizzGenerator; 