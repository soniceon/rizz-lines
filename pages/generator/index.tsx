import Link from 'next/link';
import React from 'react';
import rizzData from '../../rizzlines.json';
import SiteHeader from '../../components/SiteHeader';
import SiteFooter from '../../components/SiteFooter';

const categories = Object.keys(rizzData).map((name) => ({
  name,
  slug: name.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '')
}));

const MAIN_CATEGORIES = [
  { label: 'Smooth rizz lines', slug: 'smooth-rizz-lines' },
  { label: 'Funny rizz lines', slug: 'funny-rizz-lines' },
  { label: 'Modern rizz lines', slug: 'modern-rizz-lines' },
  { label: 'Bold rizz lines', slug: 'bold-rizz-lines' },
  { label: 'Classic rizz lines', slug: 'classic-rizz-lines' },
  { label: 'Best rizz lines', slug: 'best-rizz-lines' },
];

export default function GeneratorIndex() {
  return (
    <div className="min-h-screen bg-gray-50">
      <SiteHeader />
      <main className="container mx-auto px-4">
        <h1 className="text-3xl font-bold mb-6 text-center">Rizz Line Categories</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {categories.map((cat) => (
            <Link key={cat.slug} href={`/generator/${cat.slug}`}
              className="block bg-white rounded-lg shadow hover:shadow-lg transition p-6 text-center border border-pink-100 hover:border-pink-400">
              <span className="text-xl font-semibold text-pink-600">{cat.name}</span>
            </Link>
          ))}
        </div>
      </main>
      <SiteFooter />
    </div>
  );
} 