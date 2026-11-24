'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Trash2, Plus, Minus, ArrowRight, ShoppingBag, ArrowLeft, Tag, Check, AlertCircle } from 'lucide-react';
import { useCart } from '@/context/CartContext';

export default function CartPage() {
  const {
    items,
    updateQuantity,
    removeFromCart,
    clearCart,
    totalItems,
    subtotal,
    tax,
    deliveryFee,
    total,
    isHydrated,
  } = useCart();

  const [promoCode, setPromoCode] = useState('');
  const [promoApplied, setPromoApplied] = useState(false);
  const [promoError, setPromoError] = useState('');

  // Discount calculation if promo code GOLD10 is applied
  const discountAmount = promoApplied ? Math.round(subtotal * 0.1 * 100) / 100 : 0;
  const finalTotal = Math.max(0, Math.round((total - discountAmount) * 100) / 100);

  const handleApplyPromo = (e: React.FormEvent) => {
    e.preventDefault();
    setPromoError('');
    if (promoCode.trim().toUpperCase() === 'GOLD10' || promoCode.trim().toUpperCase() === 'DUBAI') {
      setPromoApplied(true);
    } else {
      setPromoError('Invalid promo code. Try "GOLD10" for 10% off.');
    }
  };

  if (!isHydrated) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="w-8 h-8 border-4 border-gold-400 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-20 text-center">
        <div className="w-24 h-24 rounded-full bg-cream-200 text-coffee-800 flex items-center justify-center mx-auto mb-6 shadow-inner">
          <ShoppingBag className="w-12 h-12 text-coffee-400" />
        </div>
        <h1 className="font-serif text-3xl sm:text-4xl font-bold text-coffee-950 mb-3">
          Your Cart is Empty
        </h1>
        <p className="text-sm text-coffee-600 max-w-md mx-auto mb-8">
          It looks like you haven&apos;t added any artisanal roasts or beverages to your cart yet.
        </p>
        <Link
          href="/menu"
          className="inline-flex items-center space-x-2 px-8 py-3.5 rounded-full bg-coffee-900 hover:bg-coffee-800 text-gold-400 hover:text-gold-300 font-bold text-xs uppercase tracking-wider shadow-lg transition-transform hover:scale-[1.02]"
        >
          <span>Explore Our Menu</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-8">
      {/* Page Title */}
      <div>
        <Link
          href="/menu"
          className="inline-flex items-center space-x-1.5 text-xs font-semibold text-coffee-600 hover:text-gold-600 transition-colors uppercase tracking-wider mb-3"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Continue Shopping</span>
        </Link>
        <h1 className="font-serif text-3xl sm:text-4xl font-bold text-coffee-950">
          Your Shopping Cart
        </h1>
        <p className="text-xs text-coffee-600 mt-1">
          Review your selections, adjust quantities, and proceed to checkout.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Cart Items List */}
        <div className="lg:col-span-8 space-y-4">
          <div className="bg-cream-50 rounded-2xl border border-coffee-200/80 shadow-sm overflow-hidden">
            <div className="p-4 sm:p-6 border-b border-coffee-100 flex items-center justify-between">
              <span className="font-serif text-lg font-bold text-coffee-900">
                Cart Items ({totalItems})
              </span>
              <button
                type="button"
                onClick={clearCart}
                className="text-xs font-semibold text-rose-600 hover:text-rose-700 hover:underline flex items-center space-x-1"
              >
                <Trash2 className="w-3.5 h-3.5" />
                <span>Clear All</span>
              </button>
            </div>

            <div className="divide-y divide-coffee-100">
              {items.map(({ product, quantity }) => (
                <div
                  key={product.id}
                  className="p-4 sm:p-6 flex flex-col sm:flex-row items-center gap-4 sm:gap-6 hover:bg-cream-100/50 transition-colors"
                >
                  {/* Product Image */}
                  <div className="relative w-20 h-20 sm:w-24 sm:h-24 rounded-xl overflow-hidden shrink-0 bg-coffee-900 border border-coffee-200">
                    <Image
                      src={product.image}
                      alt={product.name}
                      fill
                      className="object-cover"
                    />
                  </div>

                  {/* Details */}
                  <div className="flex-1 text-center sm:text-left">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-gold-600 bg-gold-100/70 px-2 py-0.5 rounded">
                      {product.category}
                    </span>
                    <h3 className="font-serif text-base font-bold text-coffee-900 mt-1">
                      {product.name}
                    </h3>
                    <p className="text-xs text-coffee-500 mt-0.5">
                      {product.price} AED each
                    </p>
                  </div>

                  {/* Quantity adjustment */}
                  <div className="flex items-center bg-white rounded-full border border-coffee-300 p-1 shadow-sm">
                    <button
                      type="button"
                      onClick={() => updateQuantity(product.id, quantity - 1)}
                      className="w-7 h-7 rounded-full flex items-center justify-center text-coffee-800 hover:bg-cream-200 transition-colors"
                      aria-label="Decrease quantity"
                    >
                      <Minus className="w-3.5 h-3.5" />
                    </button>
                    <span className="w-8 text-center text-xs font-bold text-coffee-950">
                      {quantity}
                    </span>
                    <button
                      type="button"
                      onClick={() => updateQuantity(product.id, quantity + 1)}
                      className="w-7 h-7 rounded-full flex items-center justify-center text-coffee-800 hover:bg-cream-200 transition-colors"
                      aria-label="Increase quantity"
                    >
                      <Plus className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  {/* Item Total */}
                  <div className="text-right min-w-[80px]">
                    <span className="text-xs text-coffee-500 block uppercase sm:hidden">Total</span>
                    <span className="font-serif text-base font-bold text-coffee-900">
                      {product.price * quantity} <span className="text-xs font-sans text-gold-600">AED</span>
                    </span>
                  </div>

                  {/* Remove Button */}
                  <button
                    type="button"
                    onClick={() => removeFromCart(product.id)}
                    className="p-2 rounded-lg text-coffee-400 hover:text-rose-600 hover:bg-rose-50 transition-colors"
                    title="Remove item"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Delivery perk callout */}
          <div className="p-4 rounded-xl bg-gold-100/70 border border-gold-400/40 text-xs text-coffee-900 flex items-center justify-between">
            <span>
              {subtotal >= 60 ? (
                <span className="font-bold text-emerald-800">
                  🎉 Congratulations! You have unlocked Free Dubai Express Delivery.
                </span>
              ) : (
                <span>
                  Add <strong className="text-coffee-950 font-bold">{60 - subtotal} AED</strong> more of coffee to get <strong>Free Delivery</strong>!
                </span>
              )}
            </span>
          </div>
        </div>

        {/* Order Summary Sidebar */}
        <div className="lg:col-span-4 space-y-6">
          <div className="bg-cream-50 rounded-2xl border border-coffee-200/80 p-6 shadow-sm space-y-6">
            <h2 className="font-serif text-xl font-bold text-coffee-950 pb-4 border-b border-coffee-100">
              Order Summary
            </h2>

            {/* Calculations */}
            <div className="space-y-3 text-sm text-coffee-700">
              <div className="flex justify-between">
                <span>Subtotal ({totalItems} items)</span>
                <span className="font-bold text-coffee-900">{subtotal.toFixed(2)} AED</span>
              </div>
              <div className="flex justify-between">
                <span>UAE VAT (5%)</span>
                <span className="font-bold text-coffee-900">{tax.toFixed(2)} AED</span>
              </div>
              <div className="flex justify-between">
                <span>Delivery Fee</span>
                <span>
                  {deliveryFee === 0 ? (
                    <span className="text-emerald-700 font-bold uppercase text-xs">FREE</span>
                  ) : (
                    <span className="font-bold text-coffee-900">{deliveryFee.toFixed(2)} AED</span>
                  )}
                </span>
              </div>

              {promoApplied && (
                <div className="flex justify-between text-emerald-700 font-semibold pt-1 border-t border-coffee-100">
                  <span>Promo Discount (10%)</span>
                  <span>-{discountAmount.toFixed(2)} AED</span>
                </div>
              )}

              <div className="pt-4 border-t border-coffee-200 flex justify-between items-baseline">
                <span className="font-serif text-base font-bold text-coffee-950">Total Amount</span>
                <div className="text-right">
                  <span className="font-serif text-2xl font-bold text-coffee-950">
                    {finalTotal.toFixed(2)}{' '}
                    <span className="text-sm font-sans font-semibold text-gold-600">AED</span>
                  </span>
                  <span className="block text-[10px] text-coffee-500 uppercase tracking-wider">
                    All taxes included
                  </span>
                </div>
              </div>
            </div>

            {/* Promo code form */}
            <form onSubmit={handleApplyPromo} className="space-y-2 pt-2">
              <label htmlFor="promo" className="block text-xs font-semibold text-coffee-700 uppercase tracking-wider">
                Promo Code
              </label>
              <div className="flex space-x-2">
                <input
                  id="promo"
                  type="text"
                  placeholder="Enter GOLD10"
                  value={promoCode}
                  disabled={promoApplied}
                  onChange={(e) => setPromoCode(e.target.value)}
                  className="flex-1 px-3 py-2 rounded-xl bg-white border border-coffee-200 text-xs text-coffee-900 uppercase font-medium focus:outline-none focus:ring-2 focus:ring-gold-500/40"
                />
                <button
                  type="submit"
                  disabled={promoApplied || !promoCode}
                  className="px-4 py-2 rounded-xl bg-coffee-800 hover:bg-coffee-700 disabled:opacity-50 text-gold-400 font-bold text-xs uppercase tracking-wider transition-colors"
                >
                  {promoApplied ? <Check className="w-4 h-4 text-emerald-400" /> : 'Apply'}
                </button>
              </div>
              {promoApplied && (
                <p className="text-[11px] text-emerald-700 font-medium flex items-center space-x-1">
                  <Check className="w-3.5 h-3.5" />
                  <span>Coupon &apos;GOLD10&apos; applied (10% off)!</span>
                </p>
              )}
              {promoError && (
                <p className="text-[11px] text-rose-600 font-medium flex items-center space-x-1">
                  <AlertCircle className="w-3.5 h-3.5" />
                  <span>{promoError}</span>
                </p>
              )}
            </form>

            {/* Checkout Button */}
            <Link
              href="/checkout"
              className="w-full py-4 rounded-xl bg-gradient-to-r from-gold-400 via-gold-500 to-gold-600 hover:from-gold-300 hover:to-gold-400 text-coffee-950 font-bold text-xs uppercase tracking-wider shadow-lg flex items-center justify-center space-x-2 transition-transform hover:scale-[1.01]"
            >
              <span>Proceed to Checkout</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
