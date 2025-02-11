'use client';

import Link from 'next/link';
import { useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';

// Mega menu için tip tanımlamaları
interface Series {
  name: string;
  slug: string;
}

interface Subcategory {
  name: string;
  slug: string;
  series?: Series[];
}

interface Category {
  title: string;
  slug: string;
  subcategories: Subcategory[];
}

// Mega menu için kategoriler
const menuCategories: Category[] = [
  {
    title: 'CNC Double Kolon Dik İşleme Merkezi',
    slug: 'cnc-double-kolon',
    subcategories: [
      {
        name: 'CNC Double Kolon',
        slug: 'cnc-double-kolon',
        series: [{ name: 'Double Kolon', slug: 'double-kolon' }]
      }
    ]
  },
  {
    title: 'Dalma Erozyon Tezgahları',
    slug: 'dalma-erozyon',
    subcategories: [
      {
        name: 'BEST EDM',
        slug: 'best-edm',
        series: [
          { name: 'ZNC Serisi', slug: 'znc-serisi' },
          { name: 'PNC Serisi', slug: 'pnc-serisi' },
          { name: 'CNC Serisi', slug: 'cnc-serisi' }
        ]
      },
      {
        name: 'KING EDM',
        slug: 'king-edm',
        series: [
          { name: 'PNC SERİSİ', slug: 'pnc-serisi' },
          { name: 'ZNC SERİSİ', slug: 'znc-serisi' }
        ]
      },
      {
        name: 'ÇİFT KAFALI DALMA EREZYON',
        slug: 'cift-kafali-dalma-erezyon',
        series: []
      }
    ]
  },
  {
    title: 'Kalıpçı Freze Tezgahları',
    slug: 'kalipci-freze',
    subcategories: [
      {
        name: 'KİNG',
        slug: 'king',
        series: []
      },
      {
        name: 'JETCO',
        slug: 'jetco',
        series: []
      },
      {
        name: 'KG SUPER',
        slug: 'kg-super',
        series: []
      }
    ]
  },
  {
    title: 'Üniversal Kalıpçı Freze Tezgahları',
    slug: 'universal-kalipci-freze',
    subcategories: [
      {
        name: 'KİNG',
        slug: 'king',
        series: []
      },
      {
        name: 'KİNG YSM',
        slug: 'king-ysm',
        series: []
      },
      {
        name: 'KG SUPER',
        slug: 'kg-super',
        series: []
      }
    ]
  },
  {
    title: 'Koç Kafa Universal Freze',
    slug: 'koc-kafa-universal-freze',
    subcategories: []
  },
  {
    title: 'Taşlama Tezgahları',
    slug: 'taslama',
    subcategories: [
      {
        name: 'KİNG GRINDER',
        slug: 'king-grinder',
        series: []
      }
    ]
  },
  {
    title: 'Torna Tezgahları',
    slug: 'torna',
    subcategories: [
      {
        name: 'KING',
        slug: 'king',
        series: []
      },
      {
        name: 'JETCO',
        slug: 'jetco',
        series: []
      },
      {
        name: 'TOS',
        slug: 'tos',
        series: []
      }
    ]
  },
  {
    title: 'Masa Üstü Torna Tezgahları',
    slug: 'masa-ustu-torna',
    subcategories: []
  },
  {
    title: 'Radyal Matkap Tezgahları',
    slug: 'radyal-matkap',
    subcategories: [
      {
        name: 'TAILIFT',
        slug: 'tailift',
        series: []
      },
      {
        name: 'KG SUPER',
        slug: 'kg-super',
        series: []
      }
    ]
  },
  {
    title: 'Sütunlu Matkap Tezgahları',
    slug: 'sutunlu-matkap',
    subcategories: [
      {
        name: 'KING',
        slug: 'king',
        series: []
      },
      {
        name: 'JETCO',
        slug: 'jetco',
        series: []
      },
      {
        name: 'ŞAHİN',
        slug: 'sahin',
        series: []
      },
      {
        name: 'BOYKA',
        slug: 'boyka',
        series: []
      }
    ]
  },
  {
    title: 'Testere Tezgahları',
    slug: 'testere',
    subcategories: [
      {
        name: 'KING TYC',
        slug: 'king-tyc',
        series: []
      },
      {
        name: 'JETCO',
        slug: 'jetco',
        series: []
      },
      {
        name: 'KESMAK',
        slug: 'kesmak',
        series: []
      }
    ]
  },
  {
    title: 'Kılavuz Çekme Tezgahları',
    slug: 'kilavuz-cekme',
    subcategories: [
      {
        name: 'KING TAPPING',
        slug: 'king-tapping',
        series: []
      }
    ]
  },
  {
    title: 'Makina Aksesuarları',
    slug: 'makina-aksesuarlari',
    subcategories: [
      { name: 'Otomatik Yağlama', slug: 'otomatik-yaglama' },
      { name: 'Filtre', slug: 'filtre' },
      { name: 'Alıgn Motor', slug: 'align-motor' },
      { name: 'Manuel Yağlama', slug: 'manuel-yaglama' },
      { name: 'Havalı Çektirme', slug: 'havali-cektirme' },
      { name: 'Erozyon Sıvısı', slug: 'erozyon-sivisi' },
      { name: 'Kriko', slug: 'kriko' },
      { name: 'System 3R', slug: 'system-3r' },
      { name: 'Pens Takımı', slug: 'pens-takimi' },
      { name: 'Bağlama Seti', slug: 'baglama-seti' },
      { name: 'Mengene', slug: 'mengene' },
      { name: 'Yan Tarama Kafası', slug: 'yan-tarama-kafasi' },
      { name: 'Dijital Sistem', slug: 'dijital-sistem' },
      { name: 'Yük Taşıma Arabası', slug: 'yuk-tasima-arabasi' },
      { name: 'Korumalık', slug: 'korumalik' }
    ]
  }
];

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isMegaMenuOpen, setIsMegaMenuOpen] = useState(false);
  const router = useRouter();
  const pathname = usePathname();

  const handleCategoryClick = (slug: string) => {
    setIsMegaMenuOpen(false);
    
    if (pathname === '/urunler') {
      // Ürünler sayfasındayken sayfayı yeniden yüklemek yerine kategoriyi seçelim
      const event = new CustomEvent('selectCategory', { detail: slug });
      window.dispatchEvent(event);
    } else {
      // Başka sayfadayken ürünler sayfasına yönlendirelim ve kategoriyi localStorage'a kaydedelim
      localStorage.setItem('selectedCategory', slug);
      router.push('/urunler');
    }
  };

  return (
    <header className="fixed w-full top-0 z-50">
      {/* Top Bar */}
      <div className="bg-gradient-to-r from-primary-600 via-primary-500 to-primary-400">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-stretch h-10 text-sm">
            {/* Sol taraf - Servis Numarası */}
            <div className="flex items-center px-6 -ml-6 bg-primary-700/20">
              <span className="font-medium text-white">Servis:</span>
              <a href="tel:+905334251321" className="ml-2 text-white hover:text-white/90 transition-colors">
                0533 425 13 21
              </a>
            </div>

            {/* Orta kısım - Sosyal Medya */}
            <div className="flex items-center space-x-1 px-6 border-x border-white/20">
              <a href="#" className="text-white hover:text-white p-1.5 hover:bg-primary-600/50 rounded-full transition-all">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
              </a>
              <a href="#" className="text-white hover:text-white p-1.5 hover:bg-primary-600/50 rounded-full transition-all">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                </svg>
              </a>
              <a href="#" className="text-white hover:text-white p-1.5 hover:bg-primary-600/50 rounded-full transition-all">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                </svg>
              </a>
            </div>

            {/* Sağ taraf - E-Katalog ve Dil Seçimi */}
            <div className="flex items-center ml-auto">
              <Link
                href="/e-katalog"
                className="flex items-center px-6 text-white hover:text-white hover:bg-primary-600/30 h-full border-x border-white/20 transition-colors"
              >
                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
                E-Katalog
              </Link>
              <div className="flex items-center px-6">
                <a href="#" className="text-white font-medium hover:text-white/90 transition-colors">TR</a>
                <span className="mx-2 text-white/30">|</span>
                <a href="#" className="text-white/80 hover:text-white transition-colors">EN</a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Ana Header */}
      <div className="bg-white/80 backdrop-blur-lg shadow-soft">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            {/* Logo */}
            <div className="flex-shrink-0">
              <Link href="/" className="flex items-center">
                <span className="bg-gradient-to-r from-primary-600 to-primary-500 bg-clip-text text-transparent text-2xl font-bold tracking-tight">
                  GÜVENAL MAKİNA
                </span>
              </Link>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-1">
              <Link href="/" className="text-text hover:text-primary-500 px-4 py-2 text-sm font-medium rounded-lg hover:bg-primary-50 transition-all">
                ANA SAYFA
              </Link>
              <Link href="/kurumsal" className="text-text hover:text-primary-500 px-4 py-2 text-sm font-medium rounded-lg hover:bg-primary-50 transition-all">
                KURUMSAL
              </Link>
              
              {/* Ürünler Mega Menu */}
              <div className="relative">
                <Link
                  href="/urunler"
                  onMouseEnter={() => setIsMegaMenuOpen(true)}
                  onClick={() => setIsMegaMenuOpen(!isMegaMenuOpen)}
                  className="text-text hover:text-primary-500 px-4 py-2 text-sm font-medium rounded-lg hover:bg-primary-50 transition-all flex items-center gap-1"
                >
                  ÜRÜNLER
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </Link>

                {/* Mega Menu Dropdown */}
                {isMegaMenuOpen && (
                  <div
                    onMouseLeave={() => setIsMegaMenuOpen(false)}
                    className="absolute left-1/2 -translate-x-1/2 z-10 mt-2 w-screen max-w-7xl px-4"
                  >
                    <div className="bg-white rounded-2xl shadow-xl border border-gray-100">
                      <div className="grid grid-cols-5 gap-3 p-4">
                        {menuCategories.map((category) => (
                          <button
                            key={category.slug}
                            onClick={() => handleCategoryClick(category.slug)}
                            className="group p-2 rounded-xl hover:bg-primary-50/50 transition-all text-left"
                          >
                            <div className="flex items-center gap-2">
                              <div className="w-7 h-7 rounded-lg bg-primary-50 flex items-center justify-center group-hover:bg-primary-100/80 transition-colors">
                                <svg className="w-4 h-4 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" />
                                </svg>
                              </div>
                              <h3 className="text-xs font-medium text-text group-hover:text-primary-600 transition-colors line-clamp-2">
                                {category.title}
                              </h3>
                            </div>
                          </button>
                        ))}
                      </div>
                      <div className="bg-gray-50 p-3 rounded-b-2xl border-t border-gray-100">
                        <div className="flex items-center justify-between max-w-7xl mx-auto">
                          <div className="text-sm text-text-light">
                            Tüm ürünlerimizi görmek için
                          </div>
                          <Link
                            href="/urunler"
                            className="text-sm font-medium text-primary hover:text-primary-600 transition-colors flex items-center gap-1"
                          >
                            Ürünler Sayfasına Git
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                            </svg>
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              <Link href="/ikinci-el" className="text-text hover:text-primary-500 px-4 py-2 text-sm font-medium rounded-lg hover:bg-primary-50 transition-all">
                İKİNCİ EL
              </Link>
              <Link href="/kariyer" className="text-text hover:text-primary-500 px-4 py-2 text-sm font-medium rounded-lg hover:bg-primary-50 transition-all">
                KARİYER
              </Link>
              <Link 
                href="/iletisim" 
                className="ml-2 bg-primary-500 text-white px-6 py-2 text-sm font-medium rounded-lg hover:bg-primary-600 transition-colors shadow-sm"
              >
                BİZE ULAŞIN
              </Link>
            </nav>

            {/* Mobile menu button */}
            <div className="md:hidden">
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="inline-flex items-center justify-center p-2 rounded-lg text-text hover:text-primary-500 hover:bg-primary-50 transition-all"
              >
                <span className="sr-only">Menüyü aç</span>
                <svg
                  className={`${isMenuOpen ? 'hidden' : 'block'} h-6 w-6`}
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
                <svg
                  className={`${isMenuOpen ? 'block' : 'hidden'} h-6 w-6`}
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          </div>
        </div>

        {/* Mobile menu */}
        <div className={`${isMenuOpen ? 'block' : 'hidden'} md:hidden bg-white/80 backdrop-blur-xl border-t border-gray-100`}>
          <div className="max-w-7xl mx-auto divide-y divide-gray-100">
            <div className="py-3 px-4 space-y-1">
              <Link href="/" className="flex items-center gap-2 p-2 rounded-xl hover:bg-primary-50/50 text-text hover:text-primary-600 transition-all">
                <div className="w-7 h-7 rounded-lg bg-primary-50 flex items-center justify-center">
                  <svg className="w-4 h-4 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                  </svg>
                </div>
                <span className="text-sm font-medium">Ana Sayfa</span>
              </Link>

              <Link href="/kurumsal" className="flex items-center gap-2 p-2 rounded-xl hover:bg-primary-50/50 text-text hover:text-primary-600 transition-all">
                <div className="w-7 h-7 rounded-lg bg-primary-50 flex items-center justify-center">
                  <svg className="w-4 h-4 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                  </svg>
                </div>
                <span className="text-sm font-medium">Kurumsal</span>
              </Link>

              <Link href="/urunler" className="flex items-center gap-2 p-2 rounded-xl hover:bg-primary-50/50 text-text hover:text-primary-600 transition-all">
                <div className="w-7 h-7 rounded-lg bg-primary-50 flex items-center justify-center">
                  <svg className="w-4 h-4 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" />
                  </svg>
                </div>
                <span className="text-sm font-medium">Ürünler</span>
              </Link>

              <Link href="/ikinci-el" className="flex items-center gap-2 p-2 rounded-xl hover:bg-primary-50/50 text-text hover:text-primary-600 transition-all">
                <div className="w-7 h-7 rounded-lg bg-primary-50 flex items-center justify-center">
                  <svg className="w-4 h-4 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v13m0-13V6a2 2 0 112 2h-2zm0 0V5.5A2.5 2.5 0 109.5 8H12zm-7 4h14M5 12a2 2 0 110-4h14a2 2 0 110 4M5 12v7a2 2 0 002 2h10a2 2 0 002-2v-7" />
                  </svg>
                </div>
                <span className="text-sm font-medium">İkinci El</span>
              </Link>

              <Link href="/e-katalog" className="flex items-center gap-2 p-2 rounded-xl hover:bg-primary-50/50 text-text hover:text-primary-600 transition-all">
                <div className="w-7 h-7 rounded-lg bg-primary-50 flex items-center justify-center">
                  <svg className="w-4 h-4 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                  </svg>
                </div>
                <span className="text-sm font-medium">E-Katalog</span>
              </Link>

              <Link href="/kariyer" className="flex items-center gap-2 p-2 rounded-xl hover:bg-primary-50/50 text-text hover:text-primary-600 transition-all">
                <div className="w-7 h-7 rounded-lg bg-primary-50 flex items-center justify-center">
                  <svg className="w-4 h-4 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <span className="text-sm font-medium">Kariyer</span>
              </Link>

              <Link href="/iletisim" className="flex items-center gap-2 p-2 rounded-xl bg-primary-500 hover:bg-primary-600 text-white transition-all">
                <div className="w-7 h-7 rounded-lg bg-white/20 flex items-center justify-center">
                  <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <span className="text-sm font-medium">Bize Ulaşın</span>
              </Link>
            </div>

            {/* Mobile Ürünler Accordion */}
            <div className="py-3 px-4">
              <div className="text-xs font-medium text-text-light mb-2 px-2">Ürün Kategorileri</div>
              <div className="space-y-1">
                {menuCategories.map((category) => (
                  <Link
                    key={category.slug}
                    href={`/urunler#${category.slug}`}
                    onClick={() => setIsMenuOpen(false)}
                    className="w-full flex items-center gap-2 p-2 rounded-xl hover:bg-primary-50/50 text-text hover:text-primary-600 transition-all"
                  >
                    <div className="w-7 h-7 rounded-lg bg-primary-50 flex items-center justify-center">
                      <svg className="w-4 h-4 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" />
                      </svg>
                    </div>
                    <span className="text-sm font-medium flex-1 text-left">{category.title}</span>
                    <svg className="w-4 h-4 text-text-light" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
} 