import { Metadata } from 'next';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Link from 'next/link';
import { join } from 'path';
import fs from 'fs/promises';
import ProductDetailContent from './ProductDetailContent';
import { Product } from '@/data/products';

const PRODUCTS_FILE = join(process.cwd(), 'src/data/products.json');

// Ürünleri yükle
async function loadProducts(): Promise<Product[]> {
  try {
    const data = await fs.readFile(PRODUCTS_FILE, 'utf-8');
    return JSON.parse(data);
  } catch (error) {
    console.error('Ürünler yüklenirken hata:', error);
    return [];
  }
}

// ID'ye göre ürün getir
async function getProductById(id: string): Promise<Product | undefined> {
  const products = await loadProducts();
  return products.find((product: Product) => product.id === id);
}

export async function generateMetadata({ params }: { params: { id: string } }): Promise<Metadata> {
  const product = await getProductById(params.id);
  
  if (!product) {
    return {
      title: 'Ürün Bulunamadı | Güvenal Makina',
      description: 'Aradığınız ürün bulunamadı veya kaldırılmış olabilir.',
    };
  }

  return {
    title: `${product.name} | Güvenal Makina`,
    description: product.description,
  };
}

export async function generateStaticParams() {
  const products = await loadProducts();
  return products.map((product: Product) => ({
    id: product.id,
  }));
}

export default async function ProductDetailPage({
  params,
}: {
  params: { id: string };
}) {
  const product = await getProductById(params.id);

  if (!product) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="pt-[104px] container mx-auto px-4">
          <div className="py-16 text-center">
            <h1 className="text-2xl font-semibold text-gray-900 mb-4">Ürün Bulunamadı</h1>
            <p className="text-gray-600 mb-8">Aradığınız ürün bulunamadı veya kaldırılmış olabilir.</p>
            <Link 
              href="/urunler" 
              className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-primary hover:bg-primary-600"
            >
              Ürünlere Geri Dön
            </Link>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return <ProductDetailContent product={product} />;
} 