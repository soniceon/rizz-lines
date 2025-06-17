import React, { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { Heart } from 'lucide-react';
import PixelHeartIcon from './PixelHeartIcon';
import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';

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
  'Dirty Pickup Lines To Use on Girl Over Text': 'dirtyPickupLinesToUseOnGirlOverText',
  'Dirty Pickup Lines to Make Her Laugh': 'dirtyPickupLinesToMakeHerLaugh',
  'Dirty Pickup Lines To Make Her Laugh': 'dirtyPickupLinesToMakeHerLaugh',
  'Flirty Rizz Lines': 'flirtyRizzLines',
  'Romantic Rizz Lines': 'romanticRizzLines',
  'Steamy Rizz Lines': 'steamyRizzLines',
  'Creative Rizz Lines': 'creativeRizzLines',
  'Poetic Rizz Lines': 'poeticRizzLines',
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
  'Sexy Pick Up Lines': 'sexyPickUpLines',
  'Flirty Pick Up Lines': 'flirtyPickUpLines',
  'Corny Pick Up Lines': 'cornyPickUpLines',
  '中文搭讪话术': 'chinesePickUpLines',
  '日本語のナンパフレーズ': 'japanesePickUpLines',
  '한국어 대화 문구': 'koreanPickUpLines',
  "Phrases d'accroche en français": 'frenchPickUpLines',
  'Frases para ligar en español': 'spanishPickUpLines',
  'Deutsche Anmachsprüche': 'germanPickUpLines',
  'best': 'bestRizzLines',
};

const SiteHeader = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const closeTimer = useRef<NodeJS.Timeout | null>(null);
  const router = useRouter();
  const { i18n, t } = useTranslation('common');
  const [rizzData, setRizzData] = useState<any>(null);

  useEffect(() => {
    const lang = i18n.language || 'en';
    fetch(`/locales/${lang}/rizzlines.json`)
      .then(res => res.json())
      .then(data => setRizzData(data));
  }, [i18n.language]);

  const categories = rizzData ? Object.entries(rizzData)
    .map(([name, arr]) => ({
      name,
      slug: name.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, ''),
      count: Array.isArray(arr) ? arr.length : 0
    }))
    .sort((a, b) => b.count - a.count)
    .slice(0, 6) : [];

  const handleMenuEnter = () => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    setMenuOpen(true);
  };
  const handleMenuLeave = () => {
    closeTimer.current = setTimeout(() => setMenuOpen(false), 200);
  };

  const handleLanguageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const lang = e.target.value;
    if (i18n.language === lang) return; // 避免重复跳转
    router.replace(router.asPath, undefined, { locale: lang });
  };

  const languages = [
    { code: 'en', label: t('language.en') },
    { code: 'zh', label: t('language.zh') },
    { code: 'fr', label: t('language.fr') },
    { code: 'de', label: t('language.de') },
    { code: 'ja', label: t('language.ja') },
    { code: 'ko', label: t('language.ko') },
    { code: 'ru', label: t('language.ru') },
    { code: 'es', label: t('language.es') },
    { code: 'pt', label: t('language.pt') },
  ];

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 py-4">
        <nav className="flex items-center justify-between">
          <div className="flex items-center gap-0">
            <Link href="/" className="flex items-center gap-2">
              <span className="w-16 h-12 flex items-center justify-center align-middle" style={{lineHeight: 0}}><PixelHeartIcon size={48} /></span>
              <span className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-500 bg-clip-text text-transparent flex items-center">{t('siteName')}</span>
            </Link>
          </div>
          <div className="hidden md:flex items-center gap-6">
            <div className="relative" onMouseEnter={handleMenuEnter} onMouseLeave={handleMenuLeave}>
              <Link href="/generator" className="text-gray-700 hover:text-purple-600 font-medium px-2 py-1 rounded focus:outline-none focus:ring-2 focus:ring-purple-300 transition" type="button" onClick={() => setMenuOpen(false)}>{t('generator')}</Link>
              {menuOpen && (
                <div className="absolute left-0 mt-2 bg-white shadow-lg rounded-lg min-w-[180px] z-50 border border-gray-100 animate-fade-in">
                  {categories.map(cat => (
                    <Link key={cat.slug} href={`/generator/${cat.slug}`} className="flex items-center gap-2 px-4 py-2 text-purple-600 hover:bg-purple-50 hover:text-pink-500 transition rounded">
                      <Heart size={16} /> <span>{t(CATEGORY_KEY_MAP[cat.name] || cat.name)}</span>
                    </Link>
                  ))}
                </div>
              )}
            </div>
            <Link href="/#how-it-works" className="text-gray-700 hover:text-purple-600 font-medium">{t('howItWorks')}</Link>
            <Link href="/#examples" className="text-gray-700 hover:text-purple-600 font-medium">{t('examples')}</Link>
            <Link href="/articles" className="text-gray-700 hover:text-purple-600 font-medium">{t('articles')}</Link>
            <select
              className="ml-4 px-2 py-1 border rounded text-sm bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-purple-300"
              value={router.locale || 'en'}
              onChange={handleLanguageChange}
              aria-label="Select language"
            >
              {languages.map(lang => (
                <option key={lang.code} value={lang.code}>{lang.label}</option>
              ))}
            </select>
          </div>
        </nav>
      </div>
    </header>
  );
}

export default SiteHeader; 