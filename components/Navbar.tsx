'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Coffee, ShoppingBag, Menu as MenuIcon, X, Sparkles } from 'lucide-react';
import { useCart } from '@/context/CartContext';

export default function Navbar() {
  const pathname = usePathname();
  const { totalItems, isHydrated } = useCart();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'Menu', href: '/menu' },
    { name: 'Cart', href: '/cart' },
    { name: 'Checkout', href: '/checkout' },
  ];

  return (
    <header className="sticky top-0 z-50 bg-coffee-950/95 backdrop-blur-md border-b border-gold-500/20 text-cream-100 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Brand Logo */}
          <Link href="/" className="flex items-center space-x-3 group">
            <div className="w-11 h-11 rounded-full bg-gradient-to-br from-gold-400 to-gold-600 flex items-center justify-center shadow-md group-hover:scale-105 transition-transform duration-300">
              <Coffee className="w-6 h-6 text-coffee-950" />
            </div>
            <div>
              <div className="flex items-center space-x-1.5">
                <span className="font-serif text-2xl font-bold tracking-wide text-cream-50">
                  Coffee<span className="text-gold-400">Shop</span>
                </span>
                <Sparkles className="w-3.5 h-3.5 text-gold-400 animate-pulse" />
              </div>
              <p className="text-[10px] tracking-widest uppercase text-gold-300/80 font-medium -mt-1">
                Artisanal Roastery · Dubai
              </p>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  className={`text-sm font-medium tracking-wide transition-colors duration-200 relative py-1 ${
                    isActive
                      ? 'text-gold-400 font-semibold'
                      : 'text-cream-200 hover:text-gold-300'
                  }`}
                >
                  {link.name}
                  {isActive && (
                    <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-gold-400 to-gold-600 rounded-full" />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Cart Icon & Quick Action */}
          <div className="flex items-center space-x-4">
            <Link
              href="/cart"
              className="relative p-2.5 rounded-full bg-coffee-900 border border-gold-500/30 hover:border-gold-400 transition-colors group flex items-center justify-center"
              aria-label="View Shopping Cart"
            >
              <ShoppingBag className="w-5 h-5 text-gold-400 group-hover:scale-110 transition-transform" />
              {isHydrated && totalItems > 0 && (
                <span className="absolute -top-1.5 -right-1.5 bg-gradient-to-r from-gold-500 to-gold-400 text-coffee-950 text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center shadow-md animate-bounce">
                  {totalItems}
                </span>
              )}
            </Link>

            <Link
              href="/menu"
              className="hidden sm:inline-flex items-center justify-center px-4 py-2 rounded-full text-xs font-semibold uppercase tracking-wider text-coffee-950 bg-gradient-to-r from-gold-400 to-gold-500 hover:from-gold-300 hover:to-gold-400 shadow-md transition-all duration-200 hover:shadow-gold-500/20 hover:scale-[1.02]"
            >
              Order Now
            </Link>

            {/* Mobile menu button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 rounded-lg text-cream-200 hover:text-gold-400 hover:bg-coffee-900 transition-colors"
              aria-label="Toggle Menu"
            >
              {mobileMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <MenuIcon className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-coffee-900 border-b border-gold-500/20 px-4 pt-3 pb-5 space-y-2">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.name}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className={`block px-3 py-2 rounded-md text-base font-medium ${
                  isActive
                    ? 'bg-coffee-800 text-gold-400 font-bold'
                    : 'text-cream-200 hover:bg-coffee-800/60 hover:text-gold-300'
                }`}
              >
                {link.name}
              </Link>
            );
          })}
          <div className="pt-2">
            <Link
              href="/menu"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full inline-flex items-center justify-center py-2.5 rounded-lg text-sm font-semibold uppercase tracking-wider text-coffee-950 bg-gold-400 hover:bg-gold-300 text-center"
            >
              Order Now
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
