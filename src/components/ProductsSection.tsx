'use client';

import React, { useCallback, useEffect, useState } from 'react';
import Link from 'next/link';
import useEmblaCarousel from 'embla-carousel-react';
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/outline';
import { motion, AnimatePresence } from 'framer-motion';
import { categories } from '@/data/products';

// Ana kategorileri grupla
const mainCategories = [
  { id: 'all', name: 'Tüm Kategoriler' },
  { id: 'cnc', name: 'CNC Double Kolon Dik İşleme Merkezi', slugs: ['cnc-double-kolon'] },
  { id: 'erozyon', name: 'Dalma Erozyon Tezgahları', slugs: ['dalma-erozyon'] },
  { id: 'kalipci-freze', name: 'Kalıpçı Freze Tezgahları', slugs: ['kalipci-freze'] },
  { id: 'universal-freze', name: 'Üniversal Kalıpçı Freze Tezgahları', slugs: ['universal-kalipci-freze'] },
  { id: 'koc-kafa', name: 'Koç Kafa Universal Freze', slugs: ['koc-kafa-universal-freze'] },
  { id: 'taslama', name: 'Taşlama Tezgahları', slugs: ['taslama'] },
  { id: 'torna', name: 'Torna Tezgahları', slugs: ['torna'] },
  { id: 'masa-ustu-torna', name: 'Masa Üstü Torna Tezgahları', slugs: ['masa-ustu-torna'] },
  { id: 'radyal-matkap', name: 'Radyal Matkap Tezgahları', slugs: ['radyal-matkap'] },
  { id: 'sutunlu-matkap', name: 'Sütunlu Matkap Tezgahları', slugs: ['sutunlu-matkap'] },
  { id: 'testere', name: 'Testere Tezgahları', slugs: ['testere'] },
  { id: 'kilavuz', name: 'Kılavuz Çekme Tezgahları', slugs: ['kilavuz-cekme'] },
  { id: 'aksesuarlar', name: 'Makina Aksesuarları', slugs: ['makina-aksesuarlari'] }
];

export default function ProductsSection() {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [activeTab, setActiveTab] = useState('all');
  const [filteredCategories, setFilteredCategories] = useState(categories);
  
  const [emblaRef, emblaApi] = useEmblaCarousel(
    {
      align: 'center',
      loop: true,
      skipSnaps: false,
      slidesToScroll: 1,
      dragFree: true,
      containScroll: 'trimSnaps'
    }
  );

  // Kategori filtreleme fonksiyonu
  useEffect(() => {
    if (activeTab === 'all') {
      setFilteredCategories(categories);
      if (emblaApi) {
        emblaApi.scrollTo(0);
        setSelectedIndex(0);
      }
    } else {
      const selectedMainCategory = mainCategories.find(cat => cat.id === activeTab);
      if (selectedMainCategory?.slugs) {
        // İlgili kategoriyi bul
        const categoryIndex = categories.findIndex(category => 
          selectedMainCategory.slugs.includes(category.slug)
        );
        
        if (categoryIndex !== -1 && emblaApi) {
          // Slider'ı ilgili kategoriye kaydır
          emblaApi.scrollTo(categoryIndex);
          setSelectedIndex(categoryIndex);
        }
      }
    }
  }, [activeTab, emblaApi]);

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);

  const scrollTo = useCallback((index: number) => {
    if (emblaApi) emblaApi.scrollTo(index);
  }, [emblaApi]);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    onSelect();
    emblaApi.on('select', onSelect);
    return () => {
      emblaApi.off('select', onSelect);
    };
  }, [emblaApi, onSelect]);

  return (
    <section className="py-16 bg-gray-900 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0">
        {/* Gradient Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary-900/90 to-gray-900"></div>
        
        {/* Pattern Overlay */}
        <div className="absolute inset-0 opacity-5">
          <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
            <defs>
              <pattern id="grid" width="20" height="20" patternUnits="userSpaceOnUse">
                <path d="M 20 0 L 0 0 0 20" fill="none" stroke="white" strokeWidth="0.5"/>
              </pattern>
            </defs>
            <rect width="100" height="100" fill="url(#grid)"/>
          </svg>
        </div>

        {/* Glowing Orbs */}
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-primary-500/20 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-primary-500/20 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary-500/5 rounded-full blur-3xl"></div>
      </div>

      <div className="container mx-auto px-4 relative">
        <div className="max-w-7xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-10 relative">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Ürün <span className="text-primary-400">Kategorilerimiz</span>
            </h2>
            <p className="text-gray-300 text-lg max-w-2xl mx-auto">
              Endüstriyel makina ihtiyaçlarınız için geniş ürün yelpazemiz ile hizmetinizdeyiz
            </p>
          </div>

          {/* Category Tabs */}
          <div className="mb-8 relative">
            {/* Desktop Tabs */}
            <div className="hidden md:flex items-center justify-center overflow-x-auto pb-4 gap-2 scrollbar-hide">
              <div className="flex flex-wrap justify-center gap-2 px-4">
                {mainCategories.map((category) => (
                  <button
                    key={category.id}
                    onClick={() => setActiveTab(category.id)}
                    className={`
                      px-6 py-3 rounded-xl font-medium text-sm whitespace-nowrap transition-all duration-300
                      ${activeTab === category.id
                        ? 'bg-primary text-white shadow-lg shadow-primary/25'
                        : 'bg-white/10 text-white/70 hover:bg-white/20'
                      }
                    `}
                  >
                    {category.name}
                  </button>
                ))}
              </div>
            </div>

            {/* Mobile Filter */}
            <div className="md:hidden px-4">
              <div className="relative">
                <select
                  value={activeTab}
                  onChange={(e) => setActiveTab(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl bg-white/10 text-white appearance-none cursor-pointer focus:outline-none focus:ring-2 focus:ring-primary/50 border border-white/20"
                >
                  {mainCategories.map((category) => (
                    <option key={category.id} value={category.id} className="bg-gray-900 text-white">
                      {category.name}
                    </option>
                  ))}
                </select>
                <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-white/70">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              </div>
            </div>
          </div>

          {/* Categories Slider */}
          <div className="relative products-carousel">
            <div className="overflow-hidden rounded-2xl" ref={emblaRef}>
              <div className="flex -ml-4">
                <AnimatePresence mode="wait">
                  {filteredCategories.length > 0 ? (
                    filteredCategories.map((category, index) => (
                      <div key={category.id} className="flex-[0_0_100%] min-w-0 sm:flex-[0_0_50%] lg:flex-[0_0_33.333%] pl-4">
                        <motion.div
                          initial={{ opacity: 0, y: 20 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          viewport={{ once: true }}
                          transition={{ duration: 0.3, delay: index * 0.05 }}
                          className="h-full"
                        >
                          <Link href={`/urunler#${category.slug}`} className="block h-full">
                            <div className="group bg-gray-800/40 backdrop-blur-sm rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 relative overflow-hidden h-full flex flex-col border border-white/5">
                              {/* Card Background Pattern */}
                              <div className="absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-300">
                                <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
                                  <defs>
                                    <pattern id={`grid-${category.id}`} width="10" height="10" patternUnits="userSpaceOnUse">
                                      <path d="M 10 0 L 0 0 0 10" fill="none" stroke="white" strokeWidth="0.5"/>
                                    </pattern>
                                  </defs>
                                  <rect width="100" height="100" fill={`url(#grid-${category.id})`}/>
                                </svg>
                              </div>

                              {/* Card Header */}
                              <div className="p-6 pb-4 border-b border-white/5 relative">
                                <div className="flex items-center gap-4">
                                  <div className="w-12 h-12 bg-primary-500/20 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                                    <svg className="w-6 h-6 text-primary-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" />
                                    </svg>
                                  </div>
                                  <h3 className="text-lg font-semibold text-white group-hover:text-primary-400 transition-colors line-clamp-2 flex-1">
                                    {category.name}
                                  </h3>
                                </div>
                              </div>

                              {/* Card Content */}
                              <div className="p-6 flex-1 flex flex-col relative bg-gradient-to-br from-gray-800/40 via-gray-800/40 to-gray-900/40">
                                {/* Subcategories */}
                                {category.subcategories.length > 0 && (
                                  <div className="space-y-2.5 flex-1">
                                    {category.subcategories.slice(0, 3).map((sub) => (
                                      <div key={sub.slug} className="flex items-center gap-2.5 text-gray-400 group-hover:text-gray-300 transition-colors">
                                        <div className="w-1.5 h-1.5 rounded-full bg-primary-400/40 group-hover:bg-primary-400/60 transition-colors"></div>
                                        <span className="text-sm">{sub.name}</span>
                                      </div>
                                    ))}
                                    {category.subcategories.length > 3 && (
                                      <div className="flex items-center gap-2.5 text-gray-400 group-hover:text-gray-300 transition-colors">
                                        <div className="w-1.5 h-1.5 rounded-full bg-primary-400/40 group-hover:bg-primary-400/60 transition-colors"></div>
                                        <span className="text-sm">+{category.subcategories.length - 3} daha fazla</span>
                                      </div>
                                    )}
                                  </div>
                                )}

                                {/* Card Footer */}
                                <div className="pt-4 mt-auto border-t border-white/5">
                                  <div className="flex items-center justify-between text-primary-400 font-medium group-hover:gap-2 transition-all">
                                    <span className="text-sm">Detaylı İncele</span>
                                    <svg className="w-5 h-5 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                    </svg>
                                  </div>
                                </div>
                              </div>

                              {/* Hover Gradient */}
                              <div className="absolute inset-0 bg-gradient-to-br from-primary-500/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
                            </div>
                          </Link>
                        </motion.div>
                      </div>
                    ))
                  ) : (
                    // Eğer filtrelenmiş kategori yoksa, boş kartlar göster
                    Array.from({ length: 3 }).map((_, index) => (
                      <div key={`empty-${index}`} className="flex-[0_0_100%] min-w-0 sm:flex-[0_0_50%] lg:flex-[0_0_33.333%] pl-4">
                        <div className="h-full">
                          <div className="bg-gray-800/20 backdrop-blur-sm rounded-2xl shadow-lg relative overflow-hidden h-full flex flex-col border border-white/5 min-h-[300px]">
                            <div className="absolute inset-0 flex items-center justify-center text-white/30">
                              <p>Bu kategoride ürün bulunmamaktadır</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))
                  )}
                </AnimatePresence>
              </div>
            </div>

            {/* Navigation Buttons */}
            <button
              onClick={scrollPrev}
              className={`absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 bg-white hover:bg-primary hover:text-white text-primary p-3 rounded-xl shadow-lg backdrop-blur-sm transition-all duration-300 z-10 ${
                filteredCategories.length <= 3 ? 'hidden' : ''
              }`}
              aria-label="Previous slide"
            >
              <ChevronLeftIcon className="w-6 h-6" />
            </button>
            <button
              onClick={scrollNext}
              className={`absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 bg-white hover:bg-primary hover:text-white text-primary p-3 rounded-xl shadow-lg backdrop-blur-sm transition-all duration-300 z-10 ${
                filteredCategories.length <= 3 ? 'hidden' : ''
              }`}
              aria-label="Next slide"
            >
              <ChevronRightIcon className="w-6 h-6" />
            </button>

            {/* Updated Dots Navigation */}
            <div className={`flex justify-center gap-2 mt-8 ${filteredCategories.length <= 3 ? 'hidden' : ''}`}>
              {filteredCategories.map((_, index) => (
                <button
                  key={index}
                  className={`w-2 h-2 rounded-full transition-all duration-300 ${
                    index === selectedIndex
                      ? 'w-6 bg-primary'
                      : 'bg-primary/30 hover:bg-primary/50'
                  }`}
                  onClick={() => scrollTo(index)}
                  aria-label={`Go to slide ${index + 1}`}
                />
              ))}
            </div>
          </div>

          {/* Bottom CTA */}
          <div className="mt-10 text-center">
            <Link
              href="/urunler"
              className="inline-flex items-center gap-2 bg-white/10 text-white hover:bg-white/20 px-8 py-4 rounded-xl font-medium transition-colors"
            >
              Tüm Ürünlerimizi İnceleyin
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </div>
        </div>
      </div>

      {/* Floating Dots */}
      <div className="absolute top-12 left-8 w-3 h-3 bg-white/10 rounded-full"></div>
      <div className="absolute bottom-24 right-16 w-4 h-4 bg-white/10 rounded-full"></div>
      <div className="absolute top-1/2 right-32 w-2 h-2 bg-white/10 rounded-full"></div>

      <style jsx global>{`
        .products-carousel {
          position: relative;
          padding: 0 2rem;
          margin: 0 -2rem;
        }

        @media (min-width: 1024px) {
          .products-carousel {
            padding: 0 3rem;
            margin: 0 -3rem;
          }
        }
      `}</style>
    </section>
  );
} 