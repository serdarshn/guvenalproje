'use client';

import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Image from 'next/image';
import { useState, useMemo, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { categories, getProductsByCategory, getAllProducts, getProductsBySubcategory, getProductsBySeries } from '@/data/products';

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

export default function ProductsPage() {
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [activeSubcategory, setActiveSubcategory] = useState<string | null>(null);
  const [selectedProduct, setSelectedProduct] = useState<string | null>(null);
  const [isMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState('all');

  // Mega menüden kategori seçildiğinde
  useEffect(() => {
    const handleSelectCategory = (event: CustomEvent<string>) => {
      const categorySlug = event.detail;
      const mainCategory = mainCategories.find(cat => cat.slugs?.includes(categorySlug));
      if (mainCategory) {
        setActiveTab(mainCategory.id);
        setActiveCategory(categorySlug);
        setActiveSubcategory(null);
        setSelectedProduct(null);
      }
    };

    // Custom event listener
    window.addEventListener('selectCategory', handleSelectCategory as EventListener);

    // localStorage'dan kategori kontrolü
    const savedCategory = localStorage.getItem('selectedCategory');
    if (savedCategory) {
      const mainCategory = mainCategories.find(cat => cat.slugs?.includes(savedCategory));
      if (mainCategory) {
        setActiveTab(mainCategory.id);
        setActiveCategory(savedCategory);
        setActiveSubcategory(null);
        setSelectedProduct(null);
      }
      localStorage.removeItem('selectedCategory');
    }

    return () => {
      window.removeEventListener('selectCategory', handleSelectCategory as EventListener);
    };
  }, []);

  // Kategori filtreleme fonksiyonu
  useEffect(() => {
    if (activeTab === 'all') {
      setActiveCategory(null);
      setActiveSubcategory(null);
      setSelectedProduct(null);
    } else {
      const selectedMainCategory = mainCategories.find(cat => cat.id === activeTab);
      if (selectedMainCategory?.slugs && selectedMainCategory.slugs.length > 0) {
        setActiveCategory(selectedMainCategory.slugs[0]);
        setActiveSubcategory(null);
        setSelectedProduct(null);
      }
    }
  }, [activeTab]);

  const selectedCategoryData = categories.find(cat => cat.slug === activeCategory);
  const selectedSubcategoryData = selectedCategoryData?.subcategories.find(sub => sub.slug === activeSubcategory);
  const selectedSeriesData = selectedSubcategoryData?.series?.find(s => s.slug === selectedProduct);

  // Ürünleri filtreleme
  const filteredProducts = useMemo(() => {
    let products;
    if (selectedProduct && activeCategory && activeSubcategory) {
      products = getProductsBySeries(activeCategory, activeSubcategory, selectedProduct);
    } else if (activeSubcategory && activeCategory) {
      products = getProductsBySubcategory(activeCategory, activeSubcategory);
    } else if (activeCategory) {
      products = getProductsByCategory(activeCategory);
    } else {
      products = getAllProducts();
    }

    return products.filter(product =>
      product.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [activeCategory, activeSubcategory, selectedProduct, searchQuery]);

  return (
    <main>
      <Header />
      
      {/* Banner Section */}
      <section className="pt-[104px] relative bg-background-dark overflow-hidden">
        {/* Diagonal Background */}
        <div className="absolute inset-0 bg-gradient-to-r from-primary-600 to-primary-900 transform -skew-y-6 origin-top-left scale-110"></div>
        
        {/* Content */}
        <div className="container mx-auto px-4 relative">
          <div className="max-w-7xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-8 items-center min-h-[200px]">
              {/* Left Side - Text */}
              <div className="relative z-10 py-12">
                <h1 className="text-6xl font-bold text-white mb-4">
                  Ürünlerimiz
                </h1>
                <div className="h-1 w-20 bg-white mb-4"></div>
                <p className="text-lg text-white/90">
                  Endüstriyel makina çözümleri için geniş ürün yelpazemiz
                </p>
              </div>
              
              {/* Right Side - Decorative Elements */}
              <div className="relative hidden lg:block">
                <div className="absolute right-0 top-1/2 -translate-y-1/2">
                  <div className="relative">
                    <div className="w-48 h-48 rounded-full border-8 border-white/10"></div>
                    <div className="w-32 h-32 rounded-full border-8 border-white/10 absolute -top-8 -right-8"></div>
                    <div className="w-16 h-16 rounded-full bg-white/10 absolute bottom-8 -left-8"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Floating Elements */}
        <div className="absolute top-16 left-8 w-3 h-3 bg-white/20 rounded-full"></div>
        <div className="absolute bottom-16 right-16 w-4 h-4 bg-white/20 rounded-full"></div>
        <div className="absolute top-32 right-32 w-2 h-2 bg-white/20 rounded-full"></div>
      </section>

      {/* Products Section */}
      <section className="py-12 bg-background">
        <div className="container mx-auto px-4">
          <div className="max-w-7xl mx-auto">
            {/* Results Info */}
            <div className="bg-white rounded-xl shadow-sm p-4 mb-6">
              <div className="flex flex-col lg:flex-row gap-4 items-center">
                <div className="w-full lg:w-64">
                  <div className="relative">
                    <input
                      type="text"
                      placeholder="Ürün ara..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-full px-4 py-2 rounded-lg bg-background border border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all pl-10"
                    />
                    <svg 
                      className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" 
                      fill="none" 
                      stroke="currentColor" 
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                  </div>
                </div>
                <div className="flex-1 flex flex-wrap gap-2">
                  {activeCategory && (
                    <div className="bg-primary/10 text-primary px-3 py-1 rounded-lg text-sm font-medium">
                      {selectedCategoryData?.name}
                    </div>
                  )}
                  {activeSubcategory && (
                    <div className="bg-primary/10 text-primary px-3 py-1 rounded-lg text-sm font-medium">
                      {selectedSubcategoryData?.name}
                    </div>
                  )}
                  {selectedProduct && (
                    <div className="bg-primary/10 text-primary px-3 py-1 rounded-lg text-sm font-medium">
                      {selectedSeriesData?.name}
                    </div>
                  )}
                </div>
                <div className="text-sm text-text-light whitespace-nowrap">{filteredProducts.length} ürün</div>
              </div>
            </div>

            <div className="flex flex-col lg:flex-row gap-8">
              {/* Filters Sidebar */}
              <div className={`lg:w-80 ${isMobileMenuOpen ? 'block' : 'hidden lg:block'}`}>
                <div className="bg-white rounded-xl shadow-sm divide-y divide-gray-100">
                  {/* Categories */}
                  <div className="p-6">
                    <h2 className="text-lg font-semibold text-text mb-4">Kategoriler</h2>
                    <div className="space-y-2">
                      {categories.map((category) => (
                        <div key={category.id} className="space-y-2">
                          <button
                            onClick={() => {
                              setActiveCategory(activeCategory === category.slug ? null : category.slug);
                              setActiveSubcategory(null);
                              setSelectedProduct(null);
                            }}
                            className={`w-full flex items-center justify-between py-2 text-sm transition-colors ${
                              activeCategory === category.slug ? 'text-primary font-medium' : 'text-text hover:text-primary'
                            }`}
                          >
                            <span>{category.name}</span>
                            {category.subcategories.length > 0 && (
                              <motion.svg 
                                animate={{ rotate: activeCategory === category.slug ? 180 : 0 }}
                                transition={{ duration: 0.3 }}
                                className="w-4 h-4"
                                fill="none" 
                                stroke="currentColor" 
                                viewBox="0 0 24 24"
                              >
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                              </motion.svg>
                            )}
                          </button>
                          
                          {/* Subcategories */}
                          <AnimatePresence>
                            {activeCategory === category.slug && category.subcategories.length > 0 && (
                              <motion.div
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: 'auto' }}
                                exit={{ opacity: 0, height: 0 }}
                                transition={{ duration: 0.3 }}
                                className="ml-4 overflow-hidden border-l-2 border-gray-100"
                              >
                                <div className="space-y-2 py-2">
                                  {category.subcategories.map((sub) => (
                                    <div key={sub.slug} className="space-y-1">
                                      <button
                                        onClick={() => {
                                          setActiveSubcategory(activeSubcategory === sub.slug ? null : sub.slug);
                                          setSelectedProduct(null);
                                        }}
                                        className={`w-full flex items-center justify-between pl-4 py-1 text-sm transition-colors ${
                                          activeSubcategory === sub.slug
                                            ? 'text-primary font-medium'
                                            : 'text-text-light hover:text-primary'
                                        }`}
                                      >
                                        <span>{sub.name}</span>
                                        {sub.series && sub.series.length > 0 && (
                                          <motion.svg 
                                            animate={{ rotate: activeSubcategory === sub.slug ? 180 : 0 }}
                                            transition={{ duration: 0.3 }}
                                            className="w-4 h-4"
                                            fill="none" 
                                            stroke="currentColor" 
                                            viewBox="0 0 24 24"
                                          >
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                          </motion.svg>
                                        )}
                                      </button>

                                      {/* Series */}
                                      <AnimatePresence>
                                        {activeSubcategory === sub.slug && sub.series && sub.series.length > 0 && (
                                          <motion.div
                                            initial={{ opacity: 0, height: 0 }}
                                            animate={{ opacity: 1, height: 'auto' }}
                                            exit={{ opacity: 0, height: 0 }}
                                            transition={{ duration: 0.3 }}
                                            className="pl-8 space-y-1"
                                          >
                                            {sub.series.map((series) => (
                                              <button
                                                key={series.slug}
                                                onClick={() => setSelectedProduct(selectedProduct === series.slug ? null : series.slug)}
                                                className={`w-full text-left py-1 text-sm ${
                                                  selectedProduct === series.slug
                                                    ? 'text-primary font-medium'
                                                    : 'text-text-light hover:text-primary'
                                                } transition-colors`}
                                              >
                                                {series.name}
                                              </button>
                                            ))}
                                          </motion.div>
                                        )}
                                      </AnimatePresence>
                                    </div>
                                  ))}
                                </div>
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Products Grid */}
              <div className="flex-1">
                {/* Products Grid */}
                <motion.div
                  className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                >
                  <AnimatePresence mode="wait">
                    {filteredProducts.map((product) => (
                      <motion.div
                        key={product.id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{
                          duration: 0.3,
                          ease: "easeOut"
                        }}
                        className="bg-white rounded-xl shadow-sm overflow-hidden group hover:shadow-lg transition-all duration-300"
                      >
                        <div className="relative aspect-[4/3] overflow-hidden">
                          <Image
                            src={product.images[0]}
                            alt={product.name}
                            fill
                            className="object-cover transition-transform duration-500 group-hover:scale-110"
                          />
                        </div>
                        <div className="p-4">
                          <h3 className="font-medium text-text mb-2">
                            {product.name}
                          </h3>
                          <Link 
                            href={`/urunler/${product.category.slug}/${product.slug}`}
                            className="block w-full bg-primary text-white py-2 rounded-lg opacity-90 hover:opacity-100 transition-opacity text-center"
                          >
                            İncele
                          </Link>
                        </div>
                      </motion.div>
                    ))}
                  </AnimatePresence>
                </motion.div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
} 