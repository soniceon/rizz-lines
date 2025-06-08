import Link from 'next/link';
import { useState, useRef } from 'react';
import { Heart } from 'lucide-react';
import rizzData from '../rizzlines.json';

// 动态获取内容最多的6个分类
const categories = Object.entries(rizzData)
  .map(([name, arr]) => ({
    name,
    slug: name.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, ''),
    count: Array.isArray(arr) ? arr.length : 0
  }))
  .sort((a, b) => b.count - a.count)
  .slice(0, 6);

export default function SiteHeader() {
  const [menuOpen, setMenuOpen] = useState(false);
  const closeTimer = useRef<NodeJS.Timeout | null>(null);
  const handleMenuEnter = () => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    setMenuOpen(true);
  };
  const handleMenuLeave = () => {
    closeTimer.current = setTimeout(() => setMenuOpen(false), 200);
  };
  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 py-4">
        <nav className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Link href="/" className="flex items-center gap-2">
              <span className="text-purple-600"><svg width="32" height="32" fill="none" viewBox="0 0 24 24"><path stroke="currentColor" strokeWidth="2" d="M12 21s-7-5.686-7-10.5A4.5 4.5 0 0 1 12 6.5a4.5 4.5 0 0 1 7 4.001C19 15.314 12 21 12 21Z"/></svg></span>
              <span className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-500 bg-clip-text text-transparent">RizzLines</span>
            </Link>
          </div>
          <div className="hidden md:flex items-center gap-6">
            <div className="relative" onMouseEnter={handleMenuEnter} onMouseLeave={handleMenuLeave}>
              <Link href="/generator" className="text-gray-700 hover:text-purple-600 font-medium px-2 py-1 rounded focus:outline-none focus:ring-2 focus:ring-purple-300 transition" type="button" onClick={() => setMenuOpen(false)}>Generator</Link>
              {menuOpen && (
                <div className="absolute left-0 mt-2 bg-white shadow-lg rounded-lg min-w-[180px] z-50 border border-gray-100 animate-fade-in">
                  {categories.map(cat => (
                    <Link key={cat.slug} href={`/generator/${cat.slug}`} className="flex items-center gap-2 px-4 py-2 text-purple-600 hover:bg-purple-50 hover:text-pink-500 transition rounded">
                      <Heart size={16} /> {cat.name}
                    </Link>
                  ))}
                </div>
              )}
            </div>
            <a href="#how-it-works" className="text-gray-700 hover:text-purple-600 font-medium">How It Works</a>
            <a href="#examples" className="text-gray-700 hover:text-purple-600 font-medium">Examples</a>
            <Link href="/articles" className="text-gray-700 hover:text-purple-600 font-medium">Articles</Link>
          </div>
        </nav>
      </div>
    </header>
  );
} 