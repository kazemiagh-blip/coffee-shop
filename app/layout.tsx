import type { Metadata } from 'next';
import './globals.css';
import { CartProvider } from '@/context/CartContext';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export const metadata: Metadata = {
  title: 'Coffee-Shop | Artisanal Specialty Roastery & Cafe',
  description: 'Experience premium single-origin coffee, handcrafted espresso, cold brews, and signature blends in Dubai. Prices in AED.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="min-h-screen flex flex-col bg-cream-100 text-coffee-900 antialiased selection:bg-gold-300 selection:text-coffee-950">
        <CartProvider>
          <Navbar />
          <main className="flex-1">
            {children}
          </main>
          <Footer />
        </CartProvider>
      </body>
    </html>
  );
}
