'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Search, Sparkles, Database, ShoppingBag, Loader2 } from 'lucide-react';
import { Product, sampleProducts } from '@/data/products';
import { fetchProducts } from '@/lib/products';
import { isSupabaseConfigured } from '@/lib/supabase';
import ProductCard from '@/components/ProductCard';
import { useCart } from '@/context/CartContext';

export default function MenuPage() {
  const [products, setProducts] = useState<Product[]>(sampleProducts);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [sortBy, setSortBy] = useState<'featured' | 'price-asc' | 'price-desc' | 'rating'>('featured');
  const { totalItems, total } = useCart();

  useEffect(() => {
    async function load() {
      setLoading(true);
      const data = await fetchProducts();
      setProducts(data);
      setLoading(false);
    }
    load();
  }, []);

  const categories = ['All', 'Espresso & Hot', 'Cold Brews & Iced', 'Signature Blends'];

  // Filter products
  const filteredProducts = products.filter((product) => {
    const matchesCategory =
      selectedCategory === 'All' || product.category === selectedCategory;
    const matchesSearch =
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  // Sort products
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    if (sortBy === 'price-asc') return a.price - b.price;
    if (sortBy === 'price-desc') return b.price - a.price;
    if (sortBy === 'rating') return b.rating - a.rating;
    return 0;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-10">
      {/* Page Header */}
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <div className="inline-flex items-center space-x-2 px-3.5 py-1 rounded-full bg-coffee-100 text-gold-600 text-xs font-bold tracking-wider uppercase">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Handcrafted Beverages</span>
        </div>
        <h1 className="font-serif text-4xl sm:text-5xl font-bold text-coffee-950">
          Our Artisanal Coffee Menu
        </h1>
        <p className="text-sm sm:text-base text-coffee-600 leading-relaxed">
          Crafted from single-origin beans roasted in Dubai. All prices in UAE Dirhams (AED) and inclusive of 5% UAE VAT.
        </p>

        {/* Supabase status indicator */}
        <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full text-[11px] font-medium bg-cream-200 border border-coffee-200 text-coffee-700">
          <Database className={`w-3.5 h-3.5 ${isSupabaseConfigured ? 'text-emerald-600' : 'text-amber-600'}`} />
          <span>
            {isSupabaseConfigured
              ? 'Menu loaded from Supabase live database'
              : 'Using local menu (Supabase connection pending .env.local setup)'}
          </span>
        </div>
      </div>

      {/* Controls: Search, Categories, Sort */}
      <div className="bg-cream-50 p-6 rounded-2xl border border-coffee-200/80 shadow-sm space-y-5">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          {/* Search bar */}
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-coffee-400" />
            <input
              type="text"
              placeholder="Search coffee by name, origin or flavour..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-white border border-coffee-200 text-sm text-coffee-900 placeholder-coffee-400 focus:outline-none focus:ring-2 focus:ring-gold-500/40 focus:border-gold-500"
            />
          </div>

          {/* Sort dropdown */}
          <div className="flex items-center space-x-2">
            <span className="text-xs font-semibold text-coffee-500 uppercase tracking-wider">
              Sort by:
            </span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="px-3.5 py-2 rounded-xl bg-white border border-coffee-200 text-xs font-medium text-coffee-900 focus:outline-none focus:ring-2 focus:ring-gold-500/40"
            >
              <option value="featured">Featured Roasts</option>
              <option value="rating">Highest Rated</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
            </select>
          </div>
        </div>

        {/* Category Pills */}
        <div className="flex flex-wrap gap-2 pt-2 border-t border-coffee-100">
          {categories.map((category) => {
            const isSelected = selectedCategory === category;
            return (
              <button
                key={category}
                type="button"
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded-full text-xs font-semibold tracking-wide transition-all duration-200 ${
                  isSelected
                    ? 'bg-coffee-900 text-gold-400 shadow-md scale-[1.02]'
                    : 'bg-white text-coffee-700 border border-coffee-200 hover:bg-cream-100 hover:border-gold-500/40'
                }`}
              >
                {category}
              </button>
            );
          })}
        </div>
      </div>

      {/* Product Grid */}
      {loading ? (
        <div className="py-20 flex flex-col items-center justify-center space-y-3">
          <Loader2 className="w-8 h-8 text-gold-500 animate-spin" />
          <p className="text-xs uppercase tracking-wider font-semibold text-coffee-600">
            Loading Fresh Roasts...
          </p>
        </div>
      ) : sortedProducts.length === 0 ? (
        <div className="text-center py-16 bg-cream-50 rounded-2xl border border-dashed border-coffee-300">
          <p className="font-serif text-xl font-bold text-coffee-800">No coffees found</p>
          <p className="text-xs text-coffee-500 mt-1">Try adjusting your search or category filter.</p>
          <button
            onClick={() => {
              setSelectedCategory('All');
              setSearchQuery('');
            }}
            className="mt-4 px-4 py-2 rounded-full bg-gold-400 text-coffee-950 font-bold text-xs uppercase"
          >
            Reset Filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {sortedProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}

      {/* Floating Cart quick summary bar if items in cart */}
      {totalItems > 0 && (
        <div className="sticky bottom-6 z-40 bg-coffee-950/95 backdrop-blur-md text-cream-100 p-4 sm:p-5 rounded-2xl border border-gold-500/40 shadow-2xl flex flex-col sm:flex-row items-center justify-between gap-4 max-w-4xl mx-auto">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-full bg-gold-400 text-coffee-950 flex items-center justify-center font-bold">
              <ShoppingBag className="w-5 h-5" />
            </div>
            <div>
              <p className="text-sm font-semibold text-cream-50">
                You have <strong className="text-gold-400">{totalItems}</strong> item{totalItems > 1 ? 's' : ''} in your cart
              </p>
              <p className="text-xs text-cream-300">
                Current Total: <strong className="text-gold-400 font-bold">{total} AED</strong> (incl. VAT)
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-3 w-full sm:w-auto">
            <Link
              href="/cart"
              className="flex-1 sm:flex-none text-center px-5 py-2.5 rounded-xl bg-coffee-800 hover:bg-coffee-700 text-cream-100 border border-gold-500/30 text-xs font-semibold uppercase tracking-wider"
            >
              Review Cart
            </Link>
            <Link
              href="/checkout"
              className="flex-1 sm:flex-none text-center px-6 py-2.5 rounded-xl bg-gradient-to-r from-gold-400 to-gold-500 hover:from-gold-300 hover:to-gold-400 text-coffee-950 text-xs font-bold uppercase tracking-wider shadow-md"
            >
              Checkout Now
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
