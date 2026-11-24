'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { Plus, Minus, ShoppingBag, Check, Star } from 'lucide-react';
import { Product } from '@/data/products';
import { useCart } from '@/context/CartContext';

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const { addToCart } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);

  const handleDecrease = () => {
    if (quantity > 1) {
      setQuantity((q) => q - 1);
    }
  };

  const handleIncrease = () => {
    setQuantity((q) => q + 1);
  };

  const handleAddToCart = () => {
    addToCart(product, quantity);
    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
  };

  return (
    <div className="group bg-cream-50 rounded-2xl overflow-hidden border border-coffee-200/80 hover:border-gold-500/50 shadow-md hover:shadow-xl transition-all duration-300 flex flex-col justify-between">
      {/* Top Image Section */}
      <div className="relative w-full h-56 overflow-hidden bg-coffee-900">
        <Image
          src={product.image}
          alt={product.name}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
          className="object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-coffee-950/80 via-transparent to-black/20" />

        {/* Badge */}
        {product.badge && (
          <span className="absolute top-3 left-3 bg-gradient-to-r from-gold-500 to-gold-400 text-coffee-950 text-xs font-bold uppercase tracking-wider px-2.5 py-1 rounded-full shadow-md">
            {product.badge}
          </span>
        )}

        {/* Rating */}
        <div className="absolute top-3 right-3 bg-coffee-950/80 backdrop-blur-md px-2 py-1 rounded-full flex items-center space-x-1 text-xs text-gold-400 border border-gold-500/30">
          <Star className="w-3.5 h-3.5 fill-gold-400 text-gold-400" />
          <span className="font-semibold text-cream-100">{product.rating}</span>
        </div>

        {/* Category Tag overlay */}
        <span className="absolute bottom-3 left-3 text-[11px] font-medium tracking-wide uppercase text-cream-200/90 bg-coffee-900/60 backdrop-blur-sm px-2 py-0.5 rounded">
          {product.category}
        </span>
      </div>

      {/* Content Section */}
      <div className="p-5 flex-1 flex flex-col justify-between">
        <div>
          <h3 className="font-serif text-lg font-bold text-coffee-900 group-hover:text-coffee-700 transition-colors line-clamp-1">
            {product.name}
          </h3>
          <p className="mt-2 text-xs text-coffee-600 line-clamp-2 leading-relaxed">
            {product.description}
          </p>
        </div>

        {/* Price and Actions */}
        <div className="mt-5 pt-4 border-t border-coffee-100">
          <div className="flex items-center justify-between mb-3">
            <div>
              <span className="text-xs text-coffee-500 uppercase tracking-wider block font-medium">Price</span>
              <span className="font-serif text-xl font-bold text-coffee-900">
                {product.price} <span className="text-sm font-sans font-semibold text-gold-600">AED</span>
              </span>
            </div>

            {/* Quantity Controls */}
            <div className="flex items-center bg-cream-200 rounded-full border border-coffee-300 p-0.5">
              <button
                type="button"
                onClick={handleDecrease}
                className="w-7 h-7 rounded-full flex items-center justify-center text-coffee-800 hover:bg-cream-300 transition-colors"
                aria-label="Decrease quantity"
              >
                <Minus className="w-3.5 h-3.5" />
              </button>
              <span className="w-7 text-center text-xs font-bold text-coffee-900">
                {quantity}
              </span>
              <button
                type="button"
                onClick={handleIncrease}
                className="w-7 h-7 rounded-full flex items-center justify-center text-coffee-800 hover:bg-cream-300 transition-colors"
                aria-label="Increase quantity"
              >
                <Plus className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Add to Cart Button */}
          <button
            type="button"
            onClick={handleAddToCart}
            className={`w-full py-2.5 px-4 rounded-xl font-medium text-xs tracking-wider uppercase flex items-center justify-center space-x-2 transition-all duration-200 shadow-sm ${
              added
                ? 'bg-emerald-600 text-white'
                : 'bg-coffee-900 hover:bg-coffee-800 text-cream-100 hover:text-gold-300 active:scale-[0.98]'
            }`}
          >
            {added ? (
              <>
                <Check className="w-4 h-4 text-white" />
                <span>Added to Cart ({quantity})</span>
              </>
            ) : (
              <>
                <ShoppingBag className="w-4 h-4 text-gold-400" />
                <span>Add to Cart</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
