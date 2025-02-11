'use client';

import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Image from 'next/image';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { useState, use } from 'react';
import { getProductBySlug } from '@/data/products';

export default function ProductDetailPage({
  params,
}: {
  params: Promise<{ category: string; product: string }>;
}) {
  const [selectedImage, setSelectedImage] = useState(0);
  const resolvedParams = use(params);
  const product = getProductBySlug(resolvedParams.product);

  if (!product) {
    return (
      <main>
        <Header />
        <section className="pt-[104px] min-h-screen bg-background">
          <div className="container mx-auto px-4">
            <div className="max-w-7xl mx-auto py-12">
              <h1 className="text-3xl font-bold text-text mb-4">
                Ürün Bulunamadı
              </h1>
              <Link href="/urunler" className="text-primary hover:underline">
                Ürünler sayfasına dön
              </Link>
            </div>
          </div>
        </section>
        <Footer />
      </main>
    );
  }

  return (
    <main>
      <Header />

      <section className="pt-[104px] min-h-screen bg-background">
        <div className="container mx-auto px-4">
          <div className="max-w-7xl mx-auto py-12">
            {/* Breadcrumb */}
            <nav className="flex items-center gap-2 text-sm mb-8">
              <Link href="/urunler" className="text-text-light hover:text-primary transition-colors">
                Ürünler
              </Link>
              <span className="text-text-light">/</span>
              <Link href={`/urunler/${resolvedParams.category}`} className="text-text-light hover:text-primary transition-colors">
                {product.category.name}
              </Link>
              <span className="text-text-light">/</span>
              <span className="text-primary font-medium">{product.name}</span>
            </nav>

            <div className="grid lg:grid-cols-2 gap-12">
              {/* Sol Taraf - Ürün Görselleri */}
              <div className="space-y-6">
                {/* Başlık ve Açıklama */}
                <div>
                  <h1 className="text-3xl font-bold text-text mb-4">
                    {product.name}
                  </h1>
                  <p className="text-text-light leading-relaxed mb-8">
                    {product.description}
                  </p>
                </div>

                {/* Ana Görsel */}
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="relative aspect-square rounded-2xl overflow-hidden bg-white shadow-sm"
                >
                  <Image
                    src={product.images[selectedImage]}
                    alt={product.name}
                    fill
                    className="object-cover"
                  />
                </motion.div>

                {/* Küçük Görseller */}
                <motion.div 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.2 }}
                  className="grid grid-cols-4 gap-4"
                >
                  {product.images.map((image, index) => (
                    <button
                      key={index}
                      onClick={() => setSelectedImage(index)}
                      className={`relative aspect-square rounded-xl overflow-hidden bg-white shadow-sm transition-all ${
                        selectedImage === index ? 'ring-2 ring-primary' : 'hover:ring-2 ring-primary/50'
                      }`}
                    >
                      <Image
                        src={image}
                        alt={`${product.name} Görsel ${index + 1}`}
                        fill
                        className="object-cover"
                      />
                    </button>
                  ))}
                </motion.div>
              </div>

              {/* Sağ Taraf - Ürün Bilgileri */}
              <motion.div 
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                className="space-y-8"
              >
                {/* Özellikler */}
                <div>
                  <h2 className="text-xl font-semibold text-text mb-4">Teknik Özellikler</h2>
                  <div className="grid gap-4">
                    <div className="bg-white rounded-xl p-6 shadow-sm">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {product.specifications.map((spec, index) => (
                          <div key={index}>
                            <div className="text-sm text-text-light mb-1">{spec.label}</div>
                            <div className="font-medium text-text">{spec.value}</div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Aksesuarlar */}
                <div className="grid md:grid-cols-2 gap-6">
                  {/* Standart Aksesuarlar */}
                  <div>
                    <h2 className="text-xl font-semibold text-text mb-4">Standart Aksesuarlar</h2>
                    <div className="bg-white rounded-xl p-6 shadow-sm">
                      <ul className="space-y-2">
                        {product.standardAccessories.map((accessory, index) => (
                          <li key={index} className="flex items-center gap-2 text-text">
                            <svg className="w-5 h-5 text-primary flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                            {accessory}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  {/* Opsiyonel Aksesuarlar */}
                  <div>
                    <h2 className="text-xl font-semibold text-text mb-4">Opsiyonel Aksesuarlar</h2>
                    <div className="bg-white rounded-xl p-6 shadow-sm">
                      <ul className="space-y-2">
                        {product.optionalAccessories.map((accessory, index) => (
                          <li key={index} className="flex items-center gap-2 text-text">
                            <svg className="w-5 h-5 text-primary flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                            </svg>
                            {accessory}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>

                {/* Dokümanlar */}
                {product.documents && product.documents.length > 0 && (
                  <div>
                    <h2 className="text-xl font-semibold text-text mb-4">Dokümanlar</h2>
                    <div className="grid gap-4">
                      {product.documents.map((doc, index) => (
                        <a 
                          key={index}
                          href={doc.url}
                          className="flex items-center gap-4 bg-white rounded-xl p-4 shadow-sm hover:shadow-md transition-shadow group"
                        >
                          <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                            <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                            </svg>
                          </div>
                          <div className="flex-1">
                            <div className="font-medium text-text">{doc.name}</div>
                            <div className="text-sm text-text-light">{doc.type}, {doc.size}</div>
                          </div>
                          <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                            <svg className="w-4 h-4 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                            </svg>
                          </div>
                        </a>
                      ))}
                    </div>
                  </div>
                )}

                {/* İletişim CTA */}
                <div className="pt-6">
                  <Link
                    href="/iletisim"
                    className="inline-flex items-center gap-2 bg-primary hover:bg-primary-600 text-white px-8 py-4 rounded-xl font-medium transition-colors"
                  >
                    Teklif İste
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </Link>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
} 