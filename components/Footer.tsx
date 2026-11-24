import React from 'react';
import Link from 'next/link';
import { Coffee, MapPin, Clock, Phone, Mail, Instagram, Facebook, Twitter } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-coffee-950 text-cream-200 border-t border-gold-500/20 pt-16 pb-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 pb-12 border-b border-coffee-800">
          {/* Brand info */}
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-full bg-gold-400 flex items-center justify-center">
                <Coffee className="w-5 h-5 text-coffee-950" />
              </div>
              <span className="font-serif text-2xl font-bold tracking-wide text-cream-50">
                Coffee<span className="text-gold-400">Shop</span>
              </span>
            </div>
            <p className="text-sm text-cream-300/80 leading-relaxed">
              Pouring distinction since 2021. Specialty single-origin beans, hand-roasted locally in Dubai and crafted with unmatched precision.
            </p>
            <div className="flex space-x-3 pt-2">
              <a href="#" className="w-8 h-8 rounded-full bg-coffee-900 border border-gold-500/30 flex items-center justify-center text-gold-400 hover:bg-gold-500 hover:text-coffee-950 transition-colors">
                <Instagram className="w-4 h-4" />
              </a>
              <a href="#" className="w-8 h-8 rounded-full bg-coffee-900 border border-gold-500/30 flex items-center justify-center text-gold-400 hover:bg-gold-500 hover:text-coffee-950 transition-colors">
                <Facebook className="w-4 h-4" />
              </a>
              <a href="#" className="w-8 h-8 rounded-full bg-coffee-900 border border-gold-500/30 flex items-center justify-center text-gold-400 hover:bg-gold-500 hover:text-coffee-950 transition-colors">
                <Twitter className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Quick links */}
          <div>
            <h3 className="font-serif text-base font-semibold text-gold-400 uppercase tracking-wider mb-4">
              Explore
            </h3>
            <ul className="space-y-2.5 text-sm text-cream-300">
              <li>
                <Link href="/" className="hover:text-gold-300 transition-colors">Home & Roastery</Link>
              </li>
              <li>
                <Link href="/menu" className="hover:text-gold-300 transition-colors">Artisanal Menu</Link>
              </li>
              <li>
                <Link href="/cart" className="hover:text-gold-300 transition-colors">Shopping Cart</Link>
              </li>
              <li>
                <Link href="/checkout" className="hover:text-gold-300 transition-colors">Express Checkout</Link>
              </li>
            </ul>
          </div>

          {/* Hours & Location */}
          <div>
            <h3 className="font-serif text-base font-semibold text-gold-400 uppercase tracking-wider mb-4">
              Hours & Location
            </h3>
            <ul className="space-y-3 text-sm text-cream-300">
              <li className="flex items-start space-x-2.5">
                <MapPin className="w-4 h-4 text-gold-400 shrink-0 mt-0.5" />
                <span>Downtown Boulevard, Dubai, United Arab Emirates</span>
              </li>
              <li className="flex items-start space-x-2.5">
                <Clock className="w-4 h-4 text-gold-400 shrink-0 mt-0.5" />
                <div>
                  <p>Mon - Fri: 7:00 AM – 11:00 PM</p>
                  <p>Sat - Sun: 8:00 AM – 12:00 AM</p>
                </div>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-serif text-base font-semibold text-gold-400 uppercase tracking-wider mb-4">
              Get in Touch
            </h3>
            <ul className="space-y-3 text-sm text-cream-300">
              <li className="flex items-center space-x-2.5">
                <Phone className="w-4 h-4 text-gold-400 shrink-0" />
                <span>+971 4 800 2633</span>
              </li>
              <li className="flex items-center space-x-2.5">
                <Mail className="w-4 h-4 text-gold-400 shrink-0" />
                <span>orders@coffeeshop.ae</span>
              </li>
            </ul>
            <div className="mt-5 p-3 rounded-lg bg-coffee-900 border border-gold-500/20 text-xs text-cream-300">
              ✨ Free Dubai delivery on orders over <strong className="text-gold-400">60 AED</strong>.
            </div>
          </div>
        </div>

        <div className="mt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-cream-400/60">
          <p>© {new Date().getFullYear()} Coffee-Shop LLC. All rights reserved. Prices in AED.</p>
          <p className="mt-2 sm:mt-0">Curated with passion in the UAE ☕</p>
        </div>
      </div>
    </footer>
  );
}
