import { MenuItem, GalleryItem } from './types';

export const MENU_ITEMS: MenuItem[] = [
  {
    id: 'm1',
    name: 'Emerald Einspänner',
    koreanName: '아인슈페너',
    price: 'Rp 45.000',
    description: 'Kopi hitam dingin premium bertabur krim lembut tebal rasa kelapa pandan khas Emerald Brew yang manis dan gurih.',
    category: 'signature',
    imageUrl: 'https://images.unsplash.com/photo-1541167760496-1628856ab772?auto=format&fit=crop&q=80&w=600',
    tag: 'Best Seller'
  },
  {
    id: 'm2',
    name: 'Korean Strawberry Latte',
    koreanName: '딸기 라떼',
    price: 'Rp 42.000',
    description: 'Susu segar dingin dipadukan dengan kompot stroberi asli buatan tangan yang manis segar, khas kafe populer Seoul.',
    category: 'non-coffee',
    imageUrl: 'https://images.unsplash.com/photo-1572490122747-3968b75cc699?auto=format&fit=crop&q=80&w=600',
    tag: 'Signature'
  },
  {
    id: 'm3',
    name: 'Sweet Dalgona Latte',
    koreanName: '달고나 라떼',
    price: 'Rp 38.000',
    description: 'Espresso shot ganda dengan susu segar hangat, disajikan dengan pecahan permen honeycomb tradisional Korea (Dalgona) yang gurih-manis.',
    category: 'coffee',
    imageUrl: 'https://images.unsplash.com/photo-1578314675249-a6910f80cc4e?auto=format&fit=crop&q=80&w=600',
    tag: 'Popular'
  },
  {
    id: 'm4',
    name: 'Black Sesame Latte',
    koreanName: '흑임자 라떼',
    price: 'Rp 40.000',
    description: 'Minuman oat milk beraroma wijen hitam panggang khas Korea yang kaya nutrisi, dipadukan krim lembut di atasnya.',
    category: 'signature',
    imageUrl: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&q=80&w=600'
  },
  {
    id: 'm5',
    name: 'Premium Jeju Matcha Latte',
    koreanName: '제주 말차 라떼',
    price: 'Rp 42.000',
    description: 'Bubuk matcha murni berkualitas premium langsung diimpor dari perkebunan Jeju, disajikan dengan susu almond hangat atau dingin.',
    category: 'non-coffee',
    imageUrl: 'https://images.unsplash.com/photo-1536256263959-770b48d82b0a?auto=format&fit=crop&q=80&w=600',
    tag: 'Healthy Accent'
  },
  {
    id: 'm6',
    name: 'Signature Ice Croffle',
    koreanName: '크로플',
    price: 'Rp 48.000',
    description: 'Croissant panggang berbentuk waffle yang sangat renyah di luar dan lembut di dalam, disajikan dengan es krim vanila Madagaskar dan taburan bubuk kayu manis.',
    category: 'dessert',
    imageUrl: 'https://images.unsplash.com/photo-1551024601-bec78aea704b?auto=format&fit=crop&q=80&w=600',
    tag: 'Highly Recommended'
  },
  {
    id: 'm7',
    name: 'Emerald Cold Brew',
    koreanName: '콜드 브루',
    price: 'Rp 36.000',
    description: 'Kopi seduh dingin selama 12 jam menggunakan biji kopi arabika pilihan dari pegunungan Gayo, menghasilkan rasa yang bersih dan beraroma buah lembut.',
    category: 'coffee',
    imageUrl: 'https://images.unsplash.com/photo-1517701604599-bb29b565090c?auto=format&fit=crop&q=80&w=600'
  },
  {
    id: 'm8',
    name: 'Sweet Injeolmi Cake',
    koreanName: '인절미 케이크',
    price: 'Rp 45.000',
    description: 'Sponge cake vanilla yang sangat lembut dengan lapisan krim bubuk kacang kedelai panggang (injeolmi) tradisional yang manis gurih dan bertekstur unik.',
    category: 'dessert',
    imageUrl: 'https://images.unsplash.com/photo-1606313564200-e75d5e30476c?auto=format&fit=crop&q=80&w=600'
  }
];

export const GALLERY_ITEMS: GalleryItem[] = [
  {
    id: 'g1',
    title: 'Warm Wooden Interiors',
    category: 'Ambience',
    imageUrl: 'https://images.unsplash.com/photo-1554118811-1e0d58224f24?auto=format&fit=crop&q=80&w=600'
  },
  {
    id: 'g2',
    title: 'Pouring with Love',
    category: 'Craftsmanship',
    imageUrl: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&q=80&w=600'
  },
  {
    id: 'g3',
    title: 'Premium Handcrafted Coffee',
    category: 'Beverage',
    imageUrl: 'https://images.unsplash.com/photo-1507133750040-4a8f57021571?auto=format&fit=crop&q=80&w=600'
  },
  {
    id: 'g4',
    title: 'Symmetrical Architecture',
    category: 'Minimalist Design',
    imageUrl: 'https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?auto=format&fit=crop&q=80&w=600'
  },
  {
    id: 'g5',
    title: 'La Marzocco Crafting',
    category: 'Precision',
    imageUrl: 'https://images.unsplash.com/photo-1510972527409-cef1903972fa?auto=format&fit=crop&q=80&w=600'
  },
  {
    id: 'g6',
    title: 'Aesthetic Desserts Pair',
    category: 'Bite Size',
    imageUrl: 'https://images.unsplash.com/photo-1509042239860-f550ce710b93?auto=format&fit=crop&q=80&w=600'
  }
];
