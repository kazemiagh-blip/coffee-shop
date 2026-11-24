'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  ShieldCheck,
  CreditCard,
  Banknote,
  Smartphone,
  ArrowLeft,
  CheckCircle2,
  Clock,
  MapPin,
  ShoppingBag,
  Sparkles,
  Database,
  AlertTriangle,
} from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { saveOrderToSupabase } from '@/lib/products';
import { isSupabaseConfigured } from '@/lib/supabase';

export default function CheckoutPage() {
  const {
    items,
    clearCart,
    totalItems,
    subtotal,
    tax,
    deliveryFee,
    total,
    isHydrated,
  } = useCart();

  // Form states
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    emirate: 'Dubai',
    area: '',
    street: '',
    building: '',
    notes: '',
    paymentMethod: 'cod', // 'cod' | 'card' | 'applepay'
    cardNumber: '',
    cardExpiry: '',
    cardCvc: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [orderSuccess, setOrderSuccess] = useState<any | null>(null);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => {
        const next = { ...prev };
        delete next[name];
        return next;
      });
    }
  };

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.fullName.trim()) newErrors.fullName = 'Full name is required';
    if (!formData.email.trim() || !formData.email.includes('@'))
      newErrors.email = 'Valid email is required';
    if (!formData.phone.trim() || formData.phone.length < 7)
      newErrors.phone = 'Valid UAE phone number is required';
    if (!formData.street.trim()) newErrors.street = 'Street address is required';
    if (!formData.building.trim()) newErrors.building = 'Building / Villa is required';

    if (formData.paymentMethod === 'card') {
      if (!formData.cardNumber.trim()) newErrors.cardNumber = 'Card number required';
      if (!formData.cardExpiry.trim()) newErrors.cardExpiry = 'Expiry required';
      if (!formData.cardCvc.trim()) newErrors.cardCvc = 'CVC required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmitOrder = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) {
      return;
    }

    setIsSubmitting(true);

    const orderNumber = `DXB-${Math.floor(100000 + Math.random() * 900000)}`;

    const orderPayload = {
      order_number: orderNumber,
      customer_name: formData.fullName,
      email: formData.email,
      phone: `+971 ${formData.phone}`,
      emirate: formData.emirate,
      area: formData.area || undefined,
      street: formData.street,
      building: formData.building,
      notes: formData.notes || undefined,
      payment_method:
        formData.paymentMethod === 'cod'
          ? 'Cash on Delivery'
          : formData.paymentMethod === 'card'
          ? 'Credit Card'
          : 'Apple Pay',
      items: items.map((i) => ({
        id: i.product.id,
        name: i.product.name,
        price: i.product.price,
        quantity: i.quantity,
      })),
      subtotal,
      tax,
      delivery_fee: deliveryFee,
      total,
    };

    // Save order to Supabase
    const dbResult = await saveOrderToSupabase(orderPayload);

    const completedOrder = {
      ...orderPayload,
      savedToSupabase: dbResult.savedToDb,
      dbError: dbResult.error,
      date: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setOrderSuccess(completedOrder);
    clearCart();
    setIsSubmitting(false);
  };

  if (!isHydrated) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="w-8 h-8 border-4 border-gold-400 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  // Order Confirmed Screen
  if (orderSuccess) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-16">
        <div className="bg-cream-50 rounded-3xl border border-gold-500/40 p-8 sm:p-12 shadow-2xl text-center space-y-6">
          <div className="w-20 h-20 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto shadow-md">
            <CheckCircle2 className="w-12 h-12" />
          </div>

          <div>
            <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-gold-100 text-gold-700 text-xs font-bold uppercase tracking-wider mb-2">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Order Confirmed & Placed</span>
            </div>
            <h1 className="font-serif text-3xl sm:text-4xl font-bold text-coffee-950">
              Thank You For Your Order!
            </h1>
            <p className="text-sm text-coffee-600 mt-2">
              We&apos;ve received your request and our Dubai baristas have begun preparing your freshly roasted brew.
            </p>
          </div>

          {/* Database status banner */}
          <div className="text-xs p-3.5 rounded-xl border flex items-center justify-center space-x-2 bg-white text-coffee-800 border-coffee-200">
            <Database className="w-4 h-4 text-gold-600 shrink-0" />
            {orderSuccess.savedToSupabase ? (
              <span className="text-emerald-700 font-semibold">
                ✓ Successfully synced and saved to your Supabase &quot;orders&quot; table.
              </span>
            ) : orderSuccess.dbError ? (
              <span className="text-rose-600">
                Notice: Could not insert to Supabase ({orderSuccess.dbError}). Check .env.local keys.
              </span>
            ) : (
              <span className="text-amber-700">
                Notice: Supabase credentials pending in .env.local. Order processed in memory.
              </span>
            )}
          </div>

          {/* Order Details Card */}
          <div className="bg-white rounded-2xl border border-coffee-200/80 p-6 text-left space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-coffee-100 gap-2">
              <div>
                <span className="text-xs text-coffee-500 uppercase tracking-wider block">Order Reference</span>
                <span className="font-serif text-lg font-bold text-gold-600">
                  #{orderSuccess.order_number}
                </span>
              </div>
              <div className="flex items-center space-x-2 text-xs text-coffee-700 bg-cream-100 px-3 py-1.5 rounded-lg border border-coffee-200">
                <Clock className="w-4 h-4 text-gold-600 shrink-0" />
                <span>Estimated Delivery: <strong>35 - 45 Minutes</strong></span>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs text-coffee-700">
              <div>
                <span className="text-coffee-500 uppercase tracking-wider block mb-1">Delivering To</span>
                <p className="font-bold text-coffee-900">{orderSuccess.customer_name}</p>
                <p className="text-coffee-600 flex items-start space-x-1 mt-0.5">
                  <MapPin className="w-3.5 h-3.5 shrink-0 mt-0.5 text-gold-600" />
                  <span>
                    {orderSuccess.building}, {orderSuccess.street}, {orderSuccess.emirate}
                  </span>
                </p>
              </div>

              <div>
                <span className="text-coffee-500 uppercase tracking-wider block mb-1">Payment & Total</span>
                <p className="font-bold text-coffee-900">{orderSuccess.payment_method}</p>
                <p className="text-gold-600 font-bold font-serif text-base mt-0.5">
                  {orderSuccess.total.toFixed(2)} AED
                </p>
              </div>
            </div>

            {/* Items summary */}
            <div className="pt-3 border-t border-coffee-100">
              <span className="text-xs text-coffee-500 uppercase tracking-wider block mb-2">Items Ordered:</span>
              <div className="space-y-1.5">
                {orderSuccess.items.map((item: any) => (
                  <div key={item.id} className="flex justify-between text-xs text-coffee-800">
                    <span>
                      {item.quantity}x {item.name}
                    </span>
                    <span className="font-medium">
                      {(item.price * item.quantity).toFixed(2)} AED
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-3">
            <Link
              href="/menu"
              className="w-full sm:w-auto px-8 py-3.5 rounded-full bg-coffee-900 hover:bg-coffee-800 text-gold-400 font-bold text-xs uppercase tracking-wider transition-colors shadow-md text-center"
            >
              Order More Coffees
            </Link>
            <Link
              href="/"
              className="w-full sm:w-auto px-8 py-3.5 rounded-full bg-cream-200 hover:bg-cream-300 text-coffee-900 font-bold text-xs uppercase tracking-wider transition-colors text-center"
            >
              Return to Home
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // If user visits checkout without items
  if (items.length === 0) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-20 text-center">
        <div className="w-20 h-20 rounded-full bg-cream-200 text-coffee-800 flex items-center justify-center mx-auto mb-6">
          <ShoppingBag className="w-10 h-10 text-coffee-400" />
        </div>
        <h1 className="font-serif text-3xl font-bold text-coffee-950 mb-3">
          Your Cart is Empty
        </h1>
        <p className="text-xs text-coffee-600 max-w-md mx-auto mb-6">
          Please add some delicious specialty coffee to your cart before proceeding to checkout.
        </p>
        <Link
          href="/menu"
          className="inline-flex items-center space-x-2 px-6 py-3 rounded-full bg-coffee-900 text-gold-400 font-bold text-xs uppercase tracking-wider"
        >
          <span>Browse Menu</span>
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-8">
      <div>
        <Link
          href="/cart"
          className="inline-flex items-center space-x-1.5 text-xs font-semibold text-coffee-600 hover:text-gold-600 transition-colors uppercase tracking-wider mb-3"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to Cart</span>
        </Link>
        <h1 className="font-serif text-3xl sm:text-4xl font-bold text-coffee-950">
          Express Checkout
        </h1>
        <p className="text-xs text-coffee-600 mt-1">
          Complete your contact, delivery and payment details below.
        </p>
      </div>

      <form onSubmit={handleSubmitOrder} className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Form fields */}
        <div className="lg:col-span-8 space-y-6">
          {/* Section 1: Customer Contact */}
          <div className="bg-cream-50 rounded-2xl border border-coffee-200/80 p-6 shadow-sm space-y-4">
            <h2 className="font-serif text-lg font-bold text-coffee-950 pb-2 border-b border-coffee-100 flex items-center space-x-2">
              <span className="w-6 h-6 rounded-full bg-coffee-900 text-gold-400 text-xs flex items-center justify-center font-sans">1</span>
              <span>Contact Information</span>
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-coffee-700 uppercase tracking-wider mb-1">
                  Full Name *
                </label>
                <input
                  type="text"
                  name="fullName"
                  placeholder="e.g. Fatima Al-Hashimi"
                  value={formData.fullName}
                  onChange={handleInputChange}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-coffee-200 text-sm text-coffee-900 focus:outline-none focus:ring-2 focus:ring-gold-500/40"
                />
                {errors.fullName && (
                  <p className="text-[11px] text-rose-600 mt-1">{errors.fullName}</p>
                )}
              </div>

              <div>
                <label className="block text-xs font-semibold text-coffee-700 uppercase tracking-wider mb-1">
                  Email Address *
                </label>
                <input
                  type="email"
                  name="email"
                  placeholder="e.g. fatima@example.com"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-coffee-200 text-sm text-coffee-900 focus:outline-none focus:ring-2 focus:ring-gold-500/40"
                />
                {errors.email && (
                  <p className="text-[11px] text-rose-600 mt-1">{errors.email}</p>
                )}
              </div>

              <div className="sm:col-span-2">
                <label className="block text-xs font-semibold text-coffee-700 uppercase tracking-wider mb-1">
                  UAE Mobile Phone *
                </label>
                <div className="flex">
                  <span className="inline-flex items-center px-3 rounded-l-xl border border-r-0 border-coffee-200 bg-cream-200 text-xs font-bold text-coffee-800">
                    +971
                  </span>
                  <input
                    type="tel"
                    name="phone"
                    placeholder="50 123 4567"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className="flex-1 px-3.5 py-2.5 rounded-r-xl bg-white border border-coffee-200 text-sm text-coffee-900 focus:outline-none focus:ring-2 focus:ring-gold-500/40"
                  />
                </div>
                {errors.phone && (
                  <p className="text-[11px] text-rose-600 mt-1">{errors.phone}</p>
                )}
              </div>
            </div>
          </div>

          {/* Section 2: Delivery Address */}
          <div className="bg-cream-50 rounded-2xl border border-coffee-200/80 p-6 shadow-sm space-y-4">
            <h2 className="font-serif text-lg font-bold text-coffee-950 pb-2 border-b border-coffee-100 flex items-center space-x-2">
              <span className="w-6 h-6 rounded-full bg-coffee-900 text-gold-400 text-xs flex items-center justify-center font-sans">2</span>
              <span>UAE Delivery Address</span>
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-coffee-700 uppercase tracking-wider mb-1">
                  Emirate
                </label>
                <select
                  name="emirate"
                  value={formData.emirate}
                  onChange={handleInputChange}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-coffee-200 text-sm text-coffee-900 focus:outline-none focus:ring-2 focus:ring-gold-500/40"
                >
                  <option value="Dubai">Dubai</option>
                  <option value="Abu Dhabi">Abu Dhabi</option>
                  <option value="Sharjah">Sharjah</option>
                  <option value="Ajman">Ajman</option>
                  <option value="Ras Al Khaimah">Ras Al Khaimah</option>
                  <option value="Fujairah">Fujairah</option>
                  <option value="Umm Al Quwain">Umm Al Quwain</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-coffee-700 uppercase tracking-wider mb-1">
                  Area / Neighborhood
                </label>
                <input
                  type="text"
                  name="area"
                  placeholder="e.g. Downtown Dubai / Marina / Jumeirah"
                  value={formData.area}
                  onChange={handleInputChange}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-coffee-200 text-sm text-coffee-900 focus:outline-none focus:ring-2 focus:ring-gold-500/40"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-coffee-700 uppercase tracking-wider mb-1">
                  Street Address *
                </label>
                <input
                  type="text"
                  name="street"
                  placeholder="e.g. Sheikh Mohammed bin Rashid Blvd"
                  value={formData.street}
                  onChange={handleInputChange}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-coffee-200 text-sm text-coffee-900 focus:outline-none focus:ring-2 focus:ring-gold-500/40"
                />
                {errors.street && (
                  <p className="text-[11px] text-rose-600 mt-1">{errors.street}</p>
                )}
              </div>

              <div>
                <label className="block text-xs font-semibold text-coffee-700 uppercase tracking-wider mb-1">
                  Villa / Apartment & Floor *
                </label>
                <input
                  type="text"
                  name="building"
                  placeholder="e.g. Burj Views Tower A, Apt 1402"
                  value={formData.building}
                  onChange={handleInputChange}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-coffee-200 text-sm text-coffee-900 focus:outline-none focus:ring-2 focus:ring-gold-500/40"
                />
                {errors.building && (
                  <p className="text-[11px] text-rose-600 mt-1">{errors.building}</p>
                )}
              </div>

              <div className="sm:col-span-2">
                <label className="block text-xs font-semibold text-coffee-700 uppercase tracking-wider mb-1">
                  Special Delivery Instructions (Optional)
                </label>
                <textarea
                  name="notes"
                  rows={2}
                  placeholder="e.g. Leave with concierge or ring doorbell."
                  value={formData.notes}
                  onChange={handleInputChange}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-coffee-200 text-sm text-coffee-900 focus:outline-none focus:ring-2 focus:ring-gold-500/40"
                />
              </div>
            </div>
          </div>

          {/* Section 3: Payment Method */}
          <div className="bg-cream-50 rounded-2xl border border-coffee-200/80 p-6 shadow-sm space-y-4">
            <h2 className="font-serif text-lg font-bold text-coffee-950 pb-2 border-b border-coffee-100 flex items-center space-x-2">
              <span className="w-6 h-6 rounded-full bg-coffee-900 text-gold-400 text-xs flex items-center justify-center font-sans">3</span>
              <span>Payment Method</span>
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <label
                className={`p-4 rounded-xl border cursor-pointer flex flex-col items-center justify-center text-center space-y-2 transition-all ${
                  formData.paymentMethod === 'cod'
                    ? 'border-gold-500 bg-gold-50/50 shadow-sm'
                    : 'border-coffee-200 bg-white hover:border-coffee-300'
                }`}
              >
                <input
                  type="radio"
                  name="paymentMethod"
                  value="cod"
                  checked={formData.paymentMethod === 'cod'}
                  onChange={handleInputChange}
                  className="sr-only"
                />
                <Banknote className="w-6 h-6 text-gold-600" />
                <span className="text-xs font-bold text-coffee-900">Cash on Delivery</span>
                <span className="text-[10px] text-coffee-500">Pay cash or card at door</span>
              </label>

              <label
                className={`p-4 rounded-xl border cursor-pointer flex flex-col items-center justify-center text-center space-y-2 transition-all ${
                  formData.paymentMethod === 'card'
                    ? 'border-gold-500 bg-gold-50/50 shadow-sm'
                    : 'border-coffee-200 bg-white hover:border-coffee-300'
                }`}
              >
                <input
                  type="radio"
                  name="paymentMethod"
                  value="card"
                  checked={formData.paymentMethod === 'card'}
                  onChange={handleInputChange}
                  className="sr-only"
                />
                <CreditCard className="w-6 h-6 text-gold-600" />
                <span className="text-xs font-bold text-coffee-900">Credit / Debit Card</span>
                <span className="text-[10px] text-coffee-500">Visa, Mastercard, Amex</span>
              </label>

              <label
                className={`p-4 rounded-xl border cursor-pointer flex flex-col items-center justify-center text-center space-y-2 transition-all ${
                  formData.paymentMethod === 'applepay'
                    ? 'border-gold-500 bg-gold-50/50 shadow-sm'
                    : 'border-coffee-200 bg-white hover:border-coffee-300'
                }`}
              >
                <input
                  type="radio"
                  name="paymentMethod"
                  value="applepay"
                  checked={formData.paymentMethod === 'applepay'}
                  onChange={handleInputChange}
                  className="sr-only"
                />
                <Smartphone className="w-6 h-6 text-gold-600" />
                <span className="text-xs font-bold text-coffee-900">Apple Pay</span>
                <span className="text-[10px] text-coffee-500">Instant one-tap checkout</span>
              </label>
            </div>

            {/* Credit card inputs if card selected */}
            {formData.paymentMethod === 'card' && (
              <div className="pt-3 p-4 rounded-xl bg-white border border-coffee-200 space-y-3">
                <div>
                  <label className="block text-xs font-semibold text-coffee-700 uppercase tracking-wider mb-1">
                    Card Number
                  </label>
                  <input
                    type="text"
                    name="cardNumber"
                    placeholder="4111 2222 3333 4444"
                    value={formData.cardNumber}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 rounded-lg border border-coffee-200 text-xs text-coffee-900"
                  />
                  {errors.cardNumber && (
                    <p className="text-[11px] text-rose-600 mt-1">{errors.cardNumber}</p>
                  )}
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-semibold text-coffee-700 uppercase tracking-wider mb-1">
                      Expiry (MM/YY)
                    </label>
                    <input
                      type="text"
                      name="cardExpiry"
                      placeholder="12/28"
                      value={formData.cardExpiry}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 rounded-lg border border-coffee-200 text-xs text-coffee-900"
                    />
                    {errors.cardExpiry && (
                      <p className="text-[11px] text-rose-600 mt-1">{errors.cardExpiry}</p>
                    )}
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-coffee-700 uppercase tracking-wider mb-1">
                      CVC / CVV
                    </label>
                    <input
                      type="text"
                      name="cardCvc"
                      placeholder="123"
                      value={formData.cardCvc}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 rounded-lg border border-coffee-200 text-xs text-coffee-900"
                    />
                    {errors.cardCvc && (
                      <p className="text-[11px] text-rose-600 mt-1">{errors.cardCvc}</p>
                    )}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Sidebar Summary */}
        <div className="lg:col-span-4 space-y-6">
          <div className="bg-cream-50 rounded-2xl border border-coffee-200/80 p-6 shadow-sm space-y-6">
            <h2 className="font-serif text-xl font-bold text-coffee-950 pb-4 border-b border-coffee-100">
              Order Review
            </h2>

            {/* Mini Items list */}
            <div className="space-y-3 max-h-60 overflow-y-auto pr-1">
              {items.map(({ product, quantity }) => (
                <div key={product.id} className="flex items-center gap-3">
                  <div className="relative w-12 h-12 rounded-lg overflow-hidden shrink-0 bg-coffee-900 border border-coffee-200">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-bold text-coffee-900 truncate">
                      {product.name}
                    </p>
                    <p className="text-[11px] text-coffee-500">
                      Qty: {quantity} × {product.price} AED
                    </p>
                  </div>
                  <span className="text-xs font-bold text-coffee-900 shrink-0">
                    {product.price * quantity} AED
                  </span>
                </div>
              ))}
            </div>

            {/* Pricing Breakdown */}
            <div className="pt-4 border-t border-coffee-200 space-y-2.5 text-xs text-coffee-700">
              <div className="flex justify-between">
                <span>Subtotal ({totalItems} items)</span>
                <span className="font-semibold text-coffee-900">{subtotal.toFixed(2)} AED</span>
              </div>
              <div className="flex justify-between">
                <span>UAE 5% VAT</span>
                <span className="font-semibold text-coffee-900">{tax.toFixed(2)} AED</span>
              </div>
              <div className="flex justify-between">
                <span>Delivery (Dubai)</span>
                <span>
                  {deliveryFee === 0 ? (
                    <span className="text-emerald-700 font-bold uppercase text-[11px]">FREE</span>
                  ) : (
                    <span className="font-semibold text-coffee-900">{deliveryFee.toFixed(2)} AED</span>
                  )}
                </span>
              </div>
              <div className="pt-3 border-t border-coffee-200 flex justify-between items-baseline">
                <span className="font-serif text-base font-bold text-coffee-950">Grand Total</span>
                <span className="font-serif text-2xl font-bold text-coffee-950">
                  {total.toFixed(2)}{' '}
                  <span className="text-sm font-sans font-semibold text-gold-600">AED</span>
                </span>
              </div>
            </div>

            {/* Place Order Button */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-4 rounded-xl bg-gradient-to-r from-gold-400 via-gold-500 to-gold-600 hover:from-gold-300 hover:to-gold-400 disabled:opacity-75 text-coffee-950 font-bold text-xs uppercase tracking-wider shadow-lg flex items-center justify-center space-x-2 transition-transform hover:scale-[1.01]"
            >
              {isSubmitting ? (
                <>
                  <div className="w-4 h-4 border-2 border-coffee-950 border-t-transparent rounded-full animate-spin" />
                  <span>Connecting to Supabase & Processing...</span>
                </>
              ) : (
                <>
                  <ShieldCheck className="w-4 h-4 text-coffee-950" />
                  <span>Place Order ({total.toFixed(2)} AED)</span>
                </>
              )}
            </button>

            <p className="text-[10px] text-center text-coffee-500 flex items-center justify-center space-x-1">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
              <span>Safe & Secure 256-bit Encrypted Checkout</span>
            </p>
          </div>
        </div>
      </form>
    </div>
  );
}
