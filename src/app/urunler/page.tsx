'use client';

import { useEffect, useState, Suspense } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Image from 'next/image';
import Link from 'next/link';
import { Product } from '@/data/products';

// Ürün kategorileri
const productCategories = [
  { id: 'cnc-double-kolon', name: 'CNC Double Kolon Dik İşleme Merkezi' },
  { id: 'dalma-erozyon', name: 'Dalma Erozyon Tezgahları' },
  { id: 'kalipci-freze', name: 'Kalıpçı Freze Tezgahları' },
  { id: 'universal-kalipci-freze', name: 'Üniversal Kalıpçı Freze Tezgahları' },
  { id: 'koc-kafa', name: 'Koç Kafa Universal Freze' },
  { id: 'taslama', name: 'Taşlama Tezgahları' },
  { id: 'torna', name: 'Torna Tezgahları' },
  { id: 'masa-ustu-torna', name: 'Masa Üstü Torna Tezgahları' },
  { id: 'radyal-matkap', name: 'Radyal Matkap Tezgahları' },
  { id: 'sutunlu-matkap', name: 'Sütunlu Matkap Tezgahları' },
  { id: 'testere', name: 'Testere Tezgahları' },
  { id: 'kilavuz', name: 'Kılavuz Çekme Tezgahları' }
];

type FilterType = 'urunler' | 'ikinci-el' | 'yedek-parca' | 'aksesuar' | 'kampanya' | '';

export default function ProductsPage() {
  const [activeFilter, setActiveFilter] = useState<FilterType>('');
  const [allProducts, setAllProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [activeCategory, setActiveCategory] = useState('');

  useEffect(() => {
    const filterParam = new URLSearchParams(window.location.search).get('filter') as FilterType;
    if (filterParam) {
      setActiveFilter(filterParam);
    }
  }, []);

  useEffect(() => {
    async function fetchProducts() {
      try {
        const response = await fetch('/api/products');
        const data = await response.json();
        if (data.success) {
          setAllProducts(data.products);
        }
      } catch (error) {
        console.error('Ürünler yüklenirken hata:', error);
      }
    }

    fetchProducts();
  }, []);

  useEffect(() => {
    let filtered = allProducts;

    if (activeFilter === 'urunler') {
      filtered = allProducts.filter(product => product.type === 'products' && !product.campaign);
    } else if (activeFilter === 'ikinci-el') {
      filtered = allProducts.filter(product => product.type === 'used' && !product.campaign);
    } else if (activeFilter === 'yedek-parca') {
      filtered = allProducts.filter(product => product.type === 'spare' && !product.campaign);
    } else if (activeFilter === 'aksesuar') {
      filtered = allProducts.filter(product => product.type === 'accessories' && !product.campaign);
    } else if (activeFilter === 'kampanya') {
      filtered = allProducts.filter(product => product.type === 'campaign' || product.campaign);
    }

    if (activeCategory) {
      filtered = filtered.filter(product => 
        product.category.toLowerCase() === activeCategory.toLowerCase() ||
        (activeCategory === 'all-campaigns' && (product.type === 'campaign' || product.campaign))
      );
    }

    setFilteredProducts(filtered);
  }, [activeFilter, activeCategory, allProducts]);

  if (!allProducts.length) {
    return (
      <Suspense fallback={<div>Yükleniyor...</div>}>
        <div className="min-h-screen bg-background">
          <Header />
          <main className="pt-[104px]">
            {/* Banner */}
            <section className="relative bg-background-dark overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-primary-600 to-primary-900 transform -skew-y-6 origin-top-left scale-110"></div>
              <div className="container mx-auto px-4 relative">
                <div className="py-16 lg:py-24">
                  <h1 className="text-4xl lg:text-6xl font-bold text-white mb-4">
                    Ürünlerimiz
                  </h1>
                  <p className="text-lg text-white/90 max-w-2xl">
                    Endüstriyel üretim ihtiyaçlarınız için geniş ürün yelpazemizi keşfedin.
                  </p>
                </div>
              </div>
            </section>
            {/* Filtreler */}
            <section className="py-8">
              <div className="container mx-auto px-4">
                <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
                  <div className="flex flex-col lg:flex-row gap-6">
                    {/* Sol Taraf - Tip Filtreleri */}
                    <div className="lg:w-3/4">
                      <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                        <svg className="w-5 h-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
                        </svg>
                        Ürün Filtreleri
                      </h2>
                      <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
                        <button
                          onClick={() => {
                            setActiveFilter('urunler');
                            if (activeFilter !== 'urunler') {
                              setActiveCategory('');
                            }
                          }}
                          className={`relative px-4 py-3 rounded-xl font-medium transition-all ${
                            activeFilter === 'urunler'
                              ? 'bg-primary text-white shadow-lg shadow-primary/25'
                              : 'bg-gray-50 text-gray-600 hover:bg-primary/10 hover:text-primary'
                          }`}
                        >
                          <span className="relative z-10">Ürünler</span>
                          <span className="absolute top-2 right-2 text-xs bg-white/20 px-2 py-1 rounded-full">
                            {allProducts.filter(p => p.type === 'products').length}
                          </span>
                        </button>
                        <button
                          onClick={() => {
                            setActiveFilter('ikinci-el');
                            setActiveCategory('');
                          }}
                          className={`relative px-4 py-3 rounded-xl font-medium transition-all border ${
                            activeFilter === 'ikinci-el'
                              ? 'bg-amber-500 text-white shadow-lg shadow-amber-500/25'
                              : 'bg-white text-gray-600 hover:bg-amber-500/10 hover:text-amber-600 border-amber-500/20 shadow-sm hover:shadow'
                          }`}
                        >
                          <span className="relative z-10">İkinci El</span>
                          <span className="absolute top-2 right-2 text-xs bg-white/20 px-2 py-1 rounded-full">
                            {allProducts.filter(p => p.type === 'used').length}
                          </span>
                        </button>
                        <button
                          onClick={() => {
                            setActiveFilter('yedek-parca');
                            setActiveCategory('');
                          }}
                          className={`relative px-4 py-3 rounded-xl font-medium transition-all border ${
                            activeFilter === 'yedek-parca'
                              ? 'bg-blue-500 text-white shadow-lg shadow-blue-500/25'
                              : 'bg-white text-gray-600 hover:bg-blue-500/10 hover:text-blue-600 border-blue-500/20 shadow-sm hover:shadow'
                          }`}
                        >
                          <span className="relative z-10">Yedek Parçalar</span>
                          <span className="absolute top-2 right-2 text-xs bg-white/20 px-2 py-1 rounded-full">
                            {allProducts.filter(p => p.type === 'spare').length}
                          </span>
                        </button>
                        <button
                          onClick={() => {
                            setActiveFilter('aksesuar');
                            setActiveCategory('');
                          }}
                          className={`relative px-4 py-3 rounded-xl font-medium transition-all border ${
                            activeFilter === 'aksesuar'
                              ? 'bg-green-500 text-white shadow-lg shadow-green-500/25'
                              : 'bg-white text-gray-600 hover:bg-green-500/10 hover:text-green-600 border-green-500/20 shadow-sm hover:shadow'
                          }`}
                        >
                          <span className="relative z-10">Aksesuarlar</span>
                          <span className="absolute top-2 right-2 text-xs bg-white/20 px-2 py-1 rounded-full">
                            {allProducts.filter(p => p.type === 'accessories').length}
                          </span>
                        </button>
                        <button
                          onClick={() => {
                            setActiveFilter('kampanya');
                            setActiveCategory('');
                          }}
                          className={`relative px-4 py-3 rounded-xl font-medium transition-all border ${
                            activeFilter === 'kampanya'
                              ? 'bg-rose-500 text-white shadow-lg shadow-rose-500/25'
                              : 'bg-white text-gray-600 hover:bg-rose-500/10 hover:text-rose-600 border-rose-500/20 shadow-sm hover:shadow'
                          }`}
                        >
                          <span className="relative z-10">Kampanyalar</span>
                          <span className="absolute top-2 right-2 text-xs bg-white/20 px-2 py-1 rounded-full">
                            {allProducts.filter(p => p.type === 'campaign' || p.campaign).length}
                          </span>
                        </button>
                      </div>
                    </div>

                    {/* Sağ Taraf - Arama ve Görünüm */}
                    <div className="lg:w-1/4">
                      <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                        <svg className="w-5 h-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                        </svg>
                        Ürün Ara
                      </h2>
                      <div className="relative">
                        <input
                          type="text"
                          placeholder="Ürün ara..."
                          className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all pr-10"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Aktif Filtreler */}
                  {(activeFilter || activeCategory) && (
                    <div className="mt-6 pt-6 border-t border-gray-100">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="text-sm text-gray-500">Aktif Filtreler:</span>
                        {activeFilter && (
                          <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-lg text-sm ${
                            activeFilter === 'urunler' ? 'bg-primary/10 text-primary' :
                            activeFilter === 'ikinci-el' ? 'bg-amber-500/10 text-amber-600' :
                            activeFilter === 'yedek-parca' ? 'bg-blue-500/10 text-blue-600' :
                            activeFilter === 'aksesuar' ? 'bg-green-500/10 text-green-600' :
                            'bg-rose-500/10 text-rose-600'
                          }`}>
                              {activeFilter === 'urunler' ? 'Ürünler' :
                               activeFilter === 'ikinci-el' ? 'İkinci El' :
                               activeFilter === 'yedek-parca' ? 'Yedek Parçalar' :
                               activeFilter === 'aksesuar' ? 'Aksesuarlar' :
                               'Kampanyalı Ürünler'}
                              <button
                                onClick={() => setActiveFilter('')}
                                className="ml-1 hover:text-primary-600"
                              >
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                </svg>
                              </button>
                          </span>
                        )}
                        {activeCategory && (
                          <span className="inline-flex items-center gap-1 px-3 py-1 rounded-lg bg-primary/10 text-primary text-sm">
                            {productCategories.find(c => c.id === activeCategory)?.name}
                            <button
                              onClick={() => setActiveCategory('')}
                              className="ml-1 hover:text-primary-600"
                            >
                              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                              </svg>
                            </button>
                          </span>
                        )}
                        <button
                          onClick={() => {
                            setActiveFilter('');
                            setActiveCategory('');
                          }}
                          className="text-sm text-gray-500 hover:text-primary"
                        >
                          Filtreleri Temizle
                        </button>
                      </div>
                    </div>
                  )}

                  {/* Sonuç Sayısı */}
                  <div className="mt-6 flex items-center justify-between">
                    <div className="text-sm text-gray-500">
                      Toplam <span className="font-medium text-gray-900">{filteredProducts.length}</span> ürün bulundu
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </main>
          <Footer />
        </div>
      </Suspense>
    );
  }

  return (
    <Suspense fallback={<div>Yükleniyor...</div>}>
      <div className="min-h-screen bg-background">
        <Header />

        {/* Ana İçerik */}
        <main className="pt-[104px]">
          {/* Banner */}
          <section className="relative bg-background-dark overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-primary-600 to-primary-900 transform -skew-y-6 origin-top-left scale-110"></div>
            <div className="container mx-auto px-4 relative">
              <div className="py-16 lg:py-24">
                <h1 className="text-4xl lg:text-6xl font-bold text-white mb-4">
                  Ürünlerimiz
                </h1>
                <p className="text-lg text-white/90 max-w-2xl">
                  Endüstriyel üretim ihtiyaçlarınız için geniş ürün yelpazemizi keşfedin.
                </p>
              </div>
            </div>
          </section>

          {/* Ürünler Bölümü */}
          <section className="py-24 bg-background relative overflow-hidden">
            {/* Background Elements */}
            <div className="absolute inset-0">
              <div className="absolute inset-0 bg-gradient-to-br from-primary-900/5 to-transparent"></div>
              <div className="absolute inset-0 opacity-30">
                <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
                  <defs>
                    <pattern id="products-grid" width="20" height="20" patternUnits="userSpaceOnUse">
                      <path d="M 20 0 L 0 0 0 20" fill="none" stroke="currentColor" strokeWidth="0.5" className="text-primary-900/10"/>
                    </pattern>
                  </defs>
                  <rect width="100" height="100" fill="url(#products-grid)"/>
                </svg>
              </div>
            </div>

            {/* Floating Dots */}
            <div className="absolute top-12 left-8 w-3 h-3 bg-primary-500/20 rounded-full"></div>
            <div className="absolute bottom-24 right-16 w-4 h-4 bg-primary-500/20 rounded-full"></div>
            <div className="absolute top-1/2 right-32 w-2 h-2 bg-primary-500/20 rounded-full"></div>

            <div className="container mx-auto px-4 relative">
              {/* Filtreler */}
              <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
                <div className="flex flex-col lg:flex-row gap-6">
                  {/* Sol Taraf - Tip Filtreleri */}
                  <div className="lg:w-3/4">
                    <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                      <svg className="w-5 h-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
                      </svg>
                      Ürün Filtreleri
                    </h2>
                    <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
                      <button
                        onClick={() => {
                          setActiveFilter('urunler');
                          if (activeFilter !== 'urunler') {
                            setActiveCategory('');
                          }
                        }}
                        className={`relative px-4 py-3 rounded-xl font-medium transition-all ${
                          activeFilter === 'urunler'
                            ? 'bg-primary text-white shadow-lg shadow-primary/25'
                            : 'bg-gray-50 text-gray-600 hover:bg-primary/10 hover:text-primary'
                        }`}
                      >
                        <span className="relative z-10">Ürünler</span>
                        <span className="absolute top-2 right-2 text-xs bg-white/20 px-2 py-1 rounded-full">
                          {allProducts.filter(p => p.type === 'products').length}
                        </span>
                      </button>
                      <button
                        onClick={() => {
                          setActiveFilter('ikinci-el');
                          setActiveCategory('');
                        }}
                        className={`relative px-4 py-3 rounded-xl font-medium transition-all border ${
                          activeFilter === 'ikinci-el'
                            ? 'bg-amber-500 text-white shadow-lg shadow-amber-500/25'
                            : 'bg-white text-gray-600 hover:bg-amber-500/10 hover:text-amber-600 border-amber-500/20 shadow-sm hover:shadow'
                        }`}
                      >
                        <span className="relative z-10">İkinci El</span>
                        <span className="absolute top-2 right-2 text-xs bg-white/20 px-2 py-1 rounded-full">
                          {allProducts.filter(p => p.type === 'used').length}
                        </span>
                      </button>
                      <button
                        onClick={() => {
                          setActiveFilter('yedek-parca');
                          setActiveCategory('');
                        }}
                        className={`relative px-4 py-3 rounded-xl font-medium transition-all border ${
                          activeFilter === 'yedek-parca'
                            ? 'bg-blue-500 text-white shadow-lg shadow-blue-500/25'
                            : 'bg-white text-gray-600 hover:bg-blue-500/10 hover:text-blue-600 border-blue-500/20 shadow-sm hover:shadow'
                        }`}
                      >
                        <span className="relative z-10">Yedek Parçalar</span>
                        <span className="absolute top-2 right-2 text-xs bg-white/20 px-2 py-1 rounded-full">
                          {allProducts.filter(p => p.type === 'spare').length}
                        </span>
                      </button>
                      <button
                        onClick={() => {
                          setActiveFilter('aksesuar');
                          setActiveCategory('');
                        }}
                        className={`relative px-4 py-3 rounded-xl font-medium transition-all border ${
                          activeFilter === 'aksesuar'
                            ? 'bg-green-500 text-white shadow-lg shadow-green-500/25'
                            : 'bg-white text-gray-600 hover:bg-green-500/10 hover:text-green-600 border-green-500/20 shadow-sm hover:shadow'
                        }`}
                      >
                        <span className="relative z-10">Aksesuarlar</span>
                        <span className="absolute top-2 right-2 text-xs bg-white/20 px-2 py-1 rounded-full">
                          {allProducts.filter(p => p.type === 'accessories').length}
                        </span>
                      </button>
                      <button
                        onClick={() => {
                          setActiveFilter('kampanya');
                          setActiveCategory('');
                        }}
                        className={`relative px-4 py-3 rounded-xl font-medium transition-all border ${
                          activeFilter === 'kampanya'
                            ? 'bg-rose-500 text-white shadow-lg shadow-rose-500/25'
                            : 'bg-white text-gray-600 hover:bg-rose-500/10 hover:text-rose-600 border-rose-500/20 shadow-sm hover:shadow'
                        }`}
                      >
                        <span className="relative z-10">Kampanyalar</span>
                        <span className="absolute top-2 right-2 text-xs bg-white/20 px-2 py-1 rounded-full">
                          {allProducts.filter(p => p.type === 'campaign' || p.campaign).length}
                        </span>
                      </button>
                    </div>
                  </div>

                  {/* Sağ Taraf - Arama ve Görünüm */}
                  <div className="lg:w-1/4">
                    <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                      <svg className="w-5 h-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                      </svg>
                      Ürün Ara
                    </h2>
                    <div className="relative">
                      <input
                        type="text"
                        placeholder="Ürün ara..."
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all pr-10"
                      />
                    </div>
                  </div>
                </div>

                {/* Aktif Filtreler */}
                {(activeFilter || activeCategory) && (
                  <div className="mt-6 pt-6 border-t border-gray-100">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="text-sm text-gray-500">Aktif Filtreler:</span>
                      {activeFilter && (
                        <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-lg text-sm ${
                          activeFilter === 'urunler' ? 'bg-primary/10 text-primary' :
                          activeFilter === 'ikinci-el' ? 'bg-amber-500/10 text-amber-600' :
                          activeFilter === 'yedek-parca' ? 'bg-blue-500/10 text-blue-600' :
                          activeFilter === 'aksesuar' ? 'bg-green-500/10 text-green-600' :
                          'bg-rose-500/10 text-rose-600'
                        }`}>
                              {activeFilter === 'urunler' ? 'Ürünler' :
                               activeFilter === 'ikinci-el' ? 'İkinci El' :
                               activeFilter === 'yedek-parca' ? 'Yedek Parçalar' :
                               activeFilter === 'aksesuar' ? 'Aksesuarlar' :
                               'Kampanyalı Ürünler'}
                              <button
                                onClick={() => setActiveFilter('')}
                                className="ml-1 hover:text-primary-600"
                              >
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                </svg>
                              </button>
                        </span>
                      )}
                      {activeCategory && (
                        <span className="inline-flex items-center gap-1 px-3 py-1 rounded-lg bg-primary/10 text-primary text-sm">
                          {productCategories.find(c => c.id === activeCategory)?.name}
                          <button
                            onClick={() => setActiveCategory('')}
                            className="ml-1 hover:text-primary-600"
                          >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                          </button>
                        </span>
                      )}
                      <button
                        onClick={() => {
                          setActiveFilter('');
                          setActiveCategory('');
                        }}
                        className="text-sm text-gray-500 hover:text-primary"
                      >
                        Filtreleri Temizle
                      </button>
                    </div>
                  </div>
                )}

                {/* Sonuç Sayısı */}
                <div className="mt-6 flex items-center justify-between">
                  <div className="text-sm text-gray-500">
                    Toplam <span className="font-medium text-gray-900">{filteredProducts.length}</span> ürün bulundu
                  </div>
                </div>
              </div>

              {/* Ürün Listesi ve Kategoriler */}
              <div className="flex flex-col lg:flex-row gap-8">
                {/* Sol Taraf - Kategoriler (Sadece Ürünler seçiliyse göster) */}
                {activeFilter === 'urunler' && (
                  <div className="lg:w-1/4">
                    <div className="bg-white rounded-2xl shadow-lg sticky top-[120px]">
                      {/* Başlık */}
                      <div className="p-4 border-b border-gray-100">
                        <h2 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                          <svg className="w-5 h-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h7" />
                          </svg>
                          Kategoriler
                        </h2>
                      </div>
                      
                      {/* Kategori Listesi */}
                      <div className="p-4">
                        <div className="space-y-3">
                          <button
                            onClick={() => {
                              setActiveCategory('');
                              setActiveFilter('urunler');
                            }}
                            className={`w-full text-left px-4 py-3 rounded-xl transition-all flex items-center justify-between group border ${
                              activeFilter === 'urunler' && !activeCategory
                                ? 'bg-primary text-white shadow-lg shadow-primary/25'
                                : 'bg-white text-gray-600 hover:bg-primary/10 hover:text-primary border-primary/20 shadow-sm hover:shadow'
                            }`}
                          >
                            <span className="flex items-center gap-2">
                              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                              </svg>
                              Tüm Ürünler
                            </span>
                            <svg className="w-5 h-5 opacity-0 group-hover:opacity-100 transition-opacity" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                            </svg>
                          </button>

                          {productCategories.map((category) => (
                            <button
                              key={category.id}
                              onClick={() => {
                                setActiveCategory(category.id);
                                setActiveFilter('urunler');
                              }}
                              className={`w-full text-left px-4 py-3 rounded-xl transition-all flex items-center justify-between group border ${
                                activeCategory === category.id
                                  ? 'bg-primary text-white shadow-lg shadow-primary/25'
                                  : 'bg-white text-gray-600 hover:bg-primary/10 hover:text-primary border-primary/20 shadow-sm hover:shadow'
                              }`}
                            >
                              <span className={activeCategory === category.id ? 'text-white' : 'text-gray-600 group-hover:text-gray-900'}>
                                {category.name}
                              </span>
                              <svg className="w-5 h-5 opacity-0 group-hover:opacity-100 transition-opacity" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                              </svg>
                            </button>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Sağ Taraf - Ürün Listesi */}
                <div className={activeFilter === 'urunler' ? 'lg:w-3/4' : 'w-full'}>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {filteredProducts.map((product) => (
                      <Link
                        key={product.id}
                        href={`/urunler/${product.id}`}
                        className="group"
                      >
                        <div className="bg-white rounded-2xl shadow-lg relative overflow-hidden h-full flex flex-col">
                          {/* Ürün Görseli */}
                          <div className="relative aspect-[4/3]">
                            <Image
                              src={product.image || '/images/placeholder-product.jpg'}
                              alt={product.name}
                              fill
                              className="object-cover group-hover:scale-105 transition-transform duration-500"
                            />
                          </div>

                          {/* Ürün Detayları */}
                          <div className="p-4 flex flex-col gap-2">
                            <h3 className="text-lg font-semibold text-gray-900 line-clamp-2 group-hover:text-primary transition-colors">
                              {product.name}
                            </h3>
                            <p className="text-sm text-gray-600 line-clamp-2">
                              {product.description}
                            </p>
                            {product.price && (
                              <div className="mt-2">
                                <div className="text-xl font-bold text-primary">
                                  {product.price.toLocaleString('tr-TR')} ₺
                                </div>
                                {product.oldPrice && (
                                  <div className="text-sm text-gray-500 line-through">
                                    {product.oldPrice.toLocaleString('tr-TR')} ₺
                                  </div>
                                )}
                              </div>
                            )}
                          </div>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </section>
        </main>

        <Footer />
      </div>
    </Suspense>
  );
} 