// Ürün tipi için enum
export type ProductType = 'products' | 'used' | 'spare' | 'accessories' | 'campaign';

// Ürün arayüzü
export interface Product {
  id: string;
  name: string;
  description: string;
  image: string;
  images?: string[];
  category: string;
  subcategory?: string;
  type: ProductType;
  price?: number;
  oldPrice?: number;
  specs: {
    label: string;
    value: string;
  }[];
  standardAccessories?: string[]; // Standart Aksesuarlar
  optionalAccessories?: string[]; // Opsiyonel Aksesuarlar
  campaign?: Campaign;
}

// Kampanya tipi için interface
export interface Campaign {
  type: 'discount' | 'gift' | 'special';
  value: string;
  endDate: string;
  description?: string;
}

// Örnek ürünler
export const products: Product[] = [
  // Normal Ürünler
  {
    id: 'cnc-torna-1',
    name: 'KING CS - 6250 / 1500',
    description: 'Modern üretim hatları için yüksek hassasiyetli CNC torna tezgahı. Profesyonel kullanım için tasarlanmış güçlü ve dayanıklı yapı.',
    image: '/images/products/product1.jpg',
    category: 'torna',
    type: 'products',
    specs: [],
  },
  // Diğer ürünler...
]; 