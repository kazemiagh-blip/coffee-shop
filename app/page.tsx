import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Coffee, Award, Sparkles, Truck, ShieldCheck, ArrowRight } from 'lucide-react';
import { fetchProducts } from '@/lib/products';
import ProductCard from '@/components/ProductCard';

export default async function HomePage() {
  const products = await fetchProducts();
  const featuredProducts = products.slice(0, 4);

  return (
    <div className="space-y-20 pb-20">
      {/* Hero Section */}
      <section className="relative min-h-[85vh] flex items-center justify-center bg-coffee-950 overflow-hidden text-cream-100">
        <div className="absolute inset-0 z-0">
          <Image
            src="https://images.unsplash.com/photo-1447933601403-0c6688de566e?q=80&w=1600&auto=format&fit=crop"
            alt="Coffee Roastery Background"
            fill
            priority
            className="object-cover opacity-25 scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-coffee-950 via-coffee-950/90 to-coffee-900/80" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-gold-500/10 via-transparent to-transparent" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center sm:text-left">
          <div className="max-w-3xl space-y-6">
            <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-coffee-900/80 border border-gold-500/30 text-gold-400 text-xs font-semibold tracking-wider uppercase backdrop-blur-md shadow-md">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Specialty Coffee Roasted in Dubai</span>
            </div>

            <h1 className="font-serif text-4xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-cream-50 leading-[1.15]">
              Pure Passion In <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-gold-300 via-gold-400 to-gold-600">
                Every Single Drop
              </span>
            </h1>

            <p className="text-base sm:text-lg text-cream-200/90 font-light leading-relaxed max-w-2xl">
              From the high-altitude hills of Ethiopia and Colombia to our Dubai roastery. Experience artisanal espressos, slow cold extractions, and signature Emirati-infused lattes.
            </p>

            <div className="pt-4 flex flex-col sm:flex-row items-center space-y-3 sm:space-y-0 sm:space-x-4">
              <Link
                href="/menu"
                className="w-full sm:w-auto px-8 py-4 rounded-full bg-gradient-to-r from-gold-400 via-gold-500 to-gold-600 text-coffee-950 font-bold text-sm uppercase tracking-wider shadow-lg hover:shadow-gold-500/30 hover:scale-[1.02] transition-all duration-300 flex items-center justify-center space-x-2"
              >
                <span>Explore Full Menu</span>
                <ArrowRight className="w-4 h-4" />
              </Link>

              <Link
                href="/cart"
                className="w-full sm:w-auto px-8 py-4 rounded-full bg-coffee-900/80 hover:bg-coffee-800 text-cream-100 border border-gold-500/30 font-semibold text-sm tracking-wider uppercase transition-all duration-200 flex items-center justify-center space-x-2"
              >
                <span>View Cart & Order</span>
              </Link>
            </div>

            {/* Quick trust perks */}
            <div className="pt-8 border-t border-coffee-800/80 grid grid-cols-3 gap-4 text-xs text-cream-300/80">
              <div className="flex items-center space-x-2">
                <Coffee className="w-4 h-4 text-gold-400 shrink-0" />
                <span>100% Arabica Beans</span>
              </div>
              <div className="flex items-center space-x-2">
                <Truck className="w-4 h-4 text-gold-400 shrink-0" />
                <span>Express UAE Delivery</span>
              </div>
              <div className="flex items-center space-x-2">
                <Award className="w-4 h-4 text-gold-400 shrink-0" />
                <span>Barista Guild Certified</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Highlights / Features Banner */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="p-8 rounded-2xl bg-cream-50 border border-coffee-200/80 shadow-sm hover:shadow-md transition-shadow">
            <div className="w-12 h-12 rounded-xl bg-coffee-900 text-gold-400 flex items-center justify-center mb-5">
              <Coffee className="w-6 h-6" />
            </div>
            <h3 className="font-serif text-xl font-bold text-coffee-900 mb-2">
              Single-Origin Micro Lots
            </h3>
            <p className="text-sm text-coffee-600 leading-relaxed">
              Ethically sourced direct from independent cooperative farms in Ethiopia, Colombia, Guatemala, and Yemen.
            </p>
          </div>

          <div className="p-8 rounded-2xl bg-cream-50 border border-coffee-200/80 shadow-sm hover:shadow-md transition-shadow">
            <div className="w-12 h-12 rounded-xl bg-coffee-900 text-gold-400 flex items-center justify-center mb-5">
              <Sparkles className="w-6 h-6" />
            </div>
            <h3 className="font-serif text-xl font-bold text-coffee-900 mb-2">
              Daily Precision Roasting
            </h3>
            <p className="text-sm text-coffee-600 leading-relaxed">
              Profile-roasted in small batches to preserve natural aromatics, crisp acidity, and deep chocolate undertones.
            </p>
          </div>

          <div className="p-8 rounded-2xl bg-cream-50 border border-coffee-200/80 shadow-sm hover:shadow-md transition-shadow">
            <div className="w-12 h-12 rounded-xl bg-coffee-900 text-gold-400 flex items-center justify-center mb-5">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <h3 className="font-serif text-xl font-bold text-coffee-900 mb-2">
              Freshness Guaranteed
            </h3>
            <p className="text-sm text-coffee-600 leading-relaxed">
              Delivered within 45 minutes across Dubai in thermal-insulated containers to ensure optimal sipping temperature.
            </p>
          </div>
        </div>
      </section>

      {/* Featured Coffee Highlights */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10">
          <div>
            <div className="inline-flex items-center space-x-1.5 text-xs font-bold uppercase tracking-wider text-gold-600 mb-2">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Customer Favorites</span>
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-coffee-900">
              Signature Coffees & Brews
            </h2>
            <p className="mt-2 text-sm text-coffee-600 max-w-xl">
              Curated master creations, from our 24K Gold Espresso to our slow-dripped Kyoto Cold Brew. All prices in AED.
            </p>
          </div>
          <Link
            href="/menu"
            className="mt-4 md:mt-0 inline-flex items-center space-x-2 text-sm font-bold text-gold-600 hover:text-gold-700 uppercase tracking-wider group"
          >
            <span>View All Coffees</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* Heritage / Story Banner */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative rounded-3xl bg-coffee-900 overflow-hidden shadow-xl text-cream-100">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center p-8 sm:p-12 lg:p-16">
            <div className="space-y-6">
              <span className="inline-block text-xs font-bold uppercase tracking-widest text-gold-400 bg-coffee-800 px-3 py-1 rounded-full border border-gold-500/20">
                The Dubai Roastery
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl font-bold text-cream-50 leading-tight">
                Honoring Arabian Tradition with Modern Precision
              </h2>
              <p className="text-sm sm:text-base text-cream-300/90 leading-relaxed font-light">
                Coffee culture traces its deepest historical roots to the Arabian Peninsula. At Coffee-Shop, we honor this heritage by pairing fragrant cardamom, saffron, and dates with contemporary extraction techniques and micro-foamed milk.
              </p>
              <div className="flex items-center space-x-6 pt-2">
                <div>
                  <p className="font-serif text-3xl font-bold text-gold-400">100%</p>
                  <p className="text-xs text-cream-400 uppercase tracking-wider mt-1">Specialty Grade</p>
                </div>
                <div className="h-10 w-px bg-coffee-700" />
                <div>
                  <p className="font-serif text-3xl font-bold text-gold-400">45 Min</p>
                  <p className="text-xs text-cream-400 uppercase tracking-wider mt-1">Dubai Express</p>
                </div>
                <div className="h-10 w-px bg-coffee-700" />
                <div>
                  <p className="font-serif text-3xl font-bold text-gold-400">5.0 ★</p>
                  <p className="text-xs text-cream-400 uppercase tracking-wider mt-1">Over 2,400 Reviews</p>
                </div>
              </div>
              <div className="pt-2">
                <Link
                  href="/menu"
                  className="inline-flex items-center space-x-2 px-6 py-3 rounded-full bg-gold-400 text-coffee-950 font-bold text-xs uppercase tracking-wider hover:bg-gold-300 transition-colors shadow-md"
                >
                  <span>Taste The Difference</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>

            <div className="relative h-72 sm:h-96 rounded-2xl overflow-hidden shadow-2xl border border-gold-500/20">
              <Image
                src="https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?q=80&w=1000&auto=format&fit=crop"
                alt="Barista brewing latte art"
                fill
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
