export interface Product {
  id: string;
  name: string;
  description: string;
  price: number; // in AED
  category: 'Espresso & Hot' | 'Cold Brews & Iced' | 'Signature Blends';
  image: string;
  rating: number;
  badge?: string;
}

export const sampleProducts: Product[] = [
  {
    id: 'prod-1',
    name: 'Royal Dubai Gold Espresso',
    description: 'Double shot of single-origin Ethiopian Yirgacheffe crowned with edible 24K gold leaf and dense, velvety crema.',
    price: 28,
    category: 'Signature Blends',
    image: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?q=80&w=800&auto=format&fit=crop',
    rating: 4.9,
    badge: 'Signature',
  },
  {
    id: 'prod-2',
    name: 'Caramel Macchiato Royale',
    description: 'Steamed creamy whole milk marked with bold roasted espresso, infused with Madagascan vanilla and rich golden caramel drizzle.',
    price: 26,
    category: 'Espresso & Hot',
    image: 'https://images.unsplash.com/photo-1485808191679-5f86510681a2?q=80&w=800&auto=format&fit=crop',
    rating: 4.8,
    badge: 'Best Seller',
  },
  {
    id: 'prod-3',
    name: 'Saffron & Cardamom Qahwa Latte',
    description: 'Heritage Emirati blend infused with crushed green cardamom pods, prized saffron strands, and textured oat milk.',
    price: 25,
    category: 'Signature Blends',
    image: 'https://images.unsplash.com/photo-1541167760496-1628856ab772?q=80&w=800&auto=format&fit=crop',
    rating: 5.0,
    badge: 'Heritage',
  },
  {
    id: 'prod-4',
    name: 'Spanish Latte Supremo',
    description: 'Silky sweetened condensed milk base layered with a robust double espresso shot and creamy micro-foam.',
    price: 24,
    category: 'Espresso & Hot',
    image: 'https://images.unsplash.com/photo-1517701550927-30cf4ba1dba5?q=80&w=800&auto=format&fit=crop',
    rating: 4.9,
    badge: 'Popular',
  },
  {
    id: 'prod-5',
    name: 'Kyoto 16-Hour Cold Brew',
    description: 'Slow cold-water drip extracted drop by drop from single-origin Colombian beans; notes of cacao and candied orange.',
    price: 29,
    category: 'Cold Brews & Iced',
    image: 'https://images.unsplash.com/photo-1517701604599-bb29b565090c?q=80&w=800&auto=format&fit=crop',
    rating: 4.9,
    badge: 'Craft Brew',
  },
  {
    id: 'prod-6',
    name: 'Pistachio Velvet Flat White',
    description: 'Intense ristretto paired with Sicilian pistachio purée and steamed textured milk, dusted with roasted crushed pistachios.',
    price: 27,
    category: 'Espresso & Hot',
    image: 'https://images.unsplash.com/photo-1534778101976-62847782c213?q=80&w=800&auto=format&fit=crop',
    rating: 4.7,
  },
  {
    id: 'prod-7',
    name: 'Smoked Hazelnut Dark Mocha',
    description: 'Melted Belgian 70% dark chocolate folded into hazelnut-infused espresso, topped with artisan golden cocoa dust.',
    price: 26,
    category: 'Signature Blends',
    image: 'https://images.unsplash.com/photo-1572442388796-11668a67e53d?q=80&w=800&auto=format&fit=crop',
    rating: 4.8,
  },
  {
    id: 'prod-8',
    name: 'Vanilla Bean Iced Shakerato',
    description: 'Fresh espresso vigorously shaken over crystal ice spheres with organic Tahitian vanilla extract and demerara cane sugar.',
    price: 23,
    category: 'Cold Brews & Iced',
    image: 'https://images.unsplash.com/photo-1461023058943-07fcbe16d735?q=80&w=800&auto=format&fit=crop',
    rating: 4.8,
    badge: 'Refreshing',
  },
];
