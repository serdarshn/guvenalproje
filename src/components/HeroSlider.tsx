'use client';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, EffectFade, Navigation, Pagination } from 'swiper/modules';
import Image from 'next/image';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Product } from '@/data/products';

// Swiper styles
import 'swiper/css';
import 'swiper/css/effect-fade';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

interface Spec {
  label: string;
  value: string;
}

interface Slide {
  id: string;
  image: string;
  title: string;
  subtitle: string;
  description: string;
  specs: Spec[];
}

const DEFAULT_SLIDES: Slide[] = [
  {
    id: 'default-1',
    image: '/images/hero/slide1.jpg',
    title: 'Endüstriyel Çözümler',
    subtitle: 'Kalıpçı Freze Tezgahları',
    description: 'Modern üretim ihtiyaçlarınız için yüksek kaliteli endüstriyel makineler.',
    specs: []
  },
  {
    id: 'default-2',
    image: '/images/hero/slide2.jpg',
    title: 'Profesyonel Ekipmanlar',
    subtitle: 'Dalma Erozyon Tezgahları',
    description: 'Endüstriyel üretimde maksimum verimlilik için tasarlanmış çözümler.',
    specs: []
  }
];

// Ürünleri Slide formatına dönüştüren yardımcı fonksiyon
const productToSlide = (product: Product): Slide => {
  // Açıklamayı 50 karakterle sınırla
  const limitedDescription = product.description 
    ? product.description.length > 50 
      ? product.description.substring(0, 50) + '...' 
      : product.description
    : 'Ürün detayları için tıklayın.';

  // Özellikleri 50 karakterle sınırla
  const limitedSpecs = product.specs 
    ? product.specs.map(spec => ({
        label: spec.label,
        value: spec.value.length > 50 
          ? spec.value.substring(0, 50) + '...' 
          : spec.value
      }))
    : [];

  return {
    id: product.id,
    image: product.image || '/images/placeholder-product.jpg',
    title: product.name,
    subtitle: 'Ürün Vitrini',
    description: limitedDescription,
    specs: limitedSpecs
  };
};

export default function HeroSlider() {
  const [mounted, setMounted] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [slides, setSlides] = useState<Slide[]>(DEFAULT_SLIDES);
  const [isLoading, setIsLoading] = useState(true);

  // Ürünleri yükle ve rastgele 5 tanesini seç
  useEffect(() => {
    const fetchRandomProducts = async () => {
      try {
        setIsLoading(true);
        const response = await fetch('/api/products');
        const data = await response.json();
        
        if (data.success) {
          // Sadece "products" tipindeki ürünleri filtrele
          const productsOnly = data.products.filter((p: Product) => p.type === 'products' && !p.campaign);
          
          // Rastgele 5 ürün seç
          const randomProducts = getRandomProducts(productsOnly, 5);
          
          // Ürünleri slide formatına dönüştür
          const productSlides = randomProducts.map(productToSlide);
          
          setSlides(productSlides.length > 0 ? productSlides : DEFAULT_SLIDES);
        }
      } catch (error) {
        console.error('Ürünler yüklenirken hata:', error);
        setSlides(DEFAULT_SLIDES);
      } finally {
        setIsLoading(false);
      }
    };

    // Rastgele ürün seçme fonksiyonu
    const getRandomProducts = (products: Product[], count: number) => {
      const shuffled = [...products].sort(() => 0.5 - Math.random());
      return shuffled.slice(0, count);
    };

    if (mounted) {
      fetchRandomProducts();
    }
  }, [mounted]);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="relative h-[calc(100vh-104px)] bg-background-dark overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary-900/95 via-gray-900/98 to-gray-900"></div>
      </div>
    );
  }

  return (
    <div className="relative h-[calc(100vh-104px)] bg-background-dark overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-br from-primary-900/95 via-gray-900/98 to-gray-900 z-0"></div>
        <div className="absolute inset-0 opacity-10 z-0">
          <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
            <defs>
              <pattern id="hero-grid" width="20" height="20" patternUnits="userSpaceOnUse">
                <path d="M 20 0 L 0 0 0 20" fill="none" stroke="white" strokeWidth="0.5"/>
              </pattern>
            </defs>
            <rect width="100" height="100" fill="url(#hero-grid)"/>
          </svg>
        </div>
      </div>

      {/* Animated Background Elements */}
      <motion.div 
        animate={{ 
          rotate: [0, 360],
          scale: [1, 1.2, 1]
        }}
        transition={{ 
          duration: 20,
          repeat: Infinity,
          ease: "linear"
        }}
        className="absolute -top-24 right-0 w-96 h-96 bg-primary-500/10 rounded-full filter blur-3xl z-0"
      />
      <motion.div 
        animate={{ 
          rotate: [360, 0],
          scale: [1, 1.3, 1]
        }}
        transition={{ 
          duration: 25,
          repeat: Infinity,
          ease: "linear"
        }}
        className="absolute -bottom-24 left-0 w-96 h-96 bg-primary-500/10 rounded-full filter blur-3xl z-0"
      />

      <div className="container mx-auto h-full relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 h-full items-center py-8">
          {/* Sol Taraf - Statik İçerik */}
          <div className="text-white space-y-6 px-4 lg:px-8 relative z-50">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <span className="text-primary-300 font-medium tracking-wider text-sm inline-flex items-center gap-2">
                <span className="w-2 h-2 bg-primary-300 rounded-full animate-pulse"></span>
                GÜVENAL MAKİNA
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-4xl lg:text-6xl font-bold leading-tight"
            >
              Üretimin Geleceği<br />
              <span className="text-primary-400">Güvenal ile Şekilleniyor</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="text-lg text-white/90 max-w-xl"
            >
              Sanayi devriminin Türkiye&apos;deki güçlü temsilcisi Güvenal Makina ile tanışın, üretimde fark yaratın! 
              Güvenal Makina olarak, talaşlı imalat sektöründe güvenilir ve yenilikçi çözümler sunuyoruz. 
              40 yılı aşkın deneyimimizle, müşterilerimizin ihtiyaçlarını derinlemesine analiz ediyor ve 
              en uygun çözümleri geliştiriyoruz.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.6 }}
              className="flex flex-wrap gap-4 pt-4"
            >
              <Link 
                href="/urunler?filter=urunler" 
                className="group bg-primary hover:bg-primary-600 text-white px-8 py-4 rounded-lg font-medium transition-all duration-300 inline-flex items-center gap-2 shadow-lg shadow-primary/25 relative overflow-hidden"
              >
                <span className="relative z-10">Ürünlerimizi İnceleyin</span>
                <svg className="w-5 h-5 relative z-10 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
                <div className="absolute inset-0 bg-gradient-to-r from-primary-600 to-primary opacity-0 group-hover:opacity-100 transition-opacity" />
              </Link>

              <Link 
                href="/iletisim" 
                className="relative group border-2 border-white/30 hover:border-white/50 text-white px-8 py-4 rounded-lg font-medium transition-all duration-300"
              >
                <span className="relative z-10">İletişime Geçin</span>
                <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity rounded-lg" />
              </Link>
            </motion.div>
          </div>

          {/* Sağ Taraf - Slider */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="relative h-[500px] lg:h-[600px] max-h-[calc(100vh-200px)]"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            {isLoading ? (
              <div className="h-full w-full rounded-2xl overflow-hidden bg-gray-800 flex items-center justify-center">
                <div className="animate-pulse flex flex-col items-center">
                  <div className="h-8 w-64 bg-gray-700 rounded mb-4"></div>
                  <div className="h-4 w-48 bg-gray-700 rounded"></div>
                </div>
              </div>
            ) : (
              <Swiper
                modules={[Autoplay, EffectFade, Navigation, Pagination]}
                effect="fade"
                speed={800}
                autoplay={{
                  delay: 5000,
                  disableOnInteraction: false,
                }}
                pagination={{
                  clickable: true,
                  type: 'bullets',
                }}
                navigation={{
                  prevEl: '.custom-prev',
                  nextEl: '.custom-next',
                }}
                loop
                className="h-full w-full rounded-2xl overflow-hidden group"
              >
                {slides.map((slide, index) => (
                  <SwiperSlide key={slide.id} className="relative">
                    <Link href={`/urunler/${slide.id}`} className="block h-full">
                      <div className="relative h-full rounded-2xl overflow-hidden">
                        <Image
                          src={slide.image}
                          alt={slide.title}
                          fill
                          className="object-cover"
                          priority={index === 0}
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                        <div className="absolute bottom-0 left-0 right-0 p-8">
                          <p className="text-primary-300 text-sm uppercase tracking-wider font-medium mb-2">{slide.subtitle}</p>
                          <h3 className="text-white text-2xl font-bold leading-tight mb-2">{slide.title}</h3>
                          <p className="text-white/70 text-base font-medium max-w-xl mb-4">{slide.description}</p>
                          <div className="flex gap-6 flex-wrap">
                            {slide.specs.slice(0, 3).map((spec, specIndex) => (
                              <div key={specIndex} className="bg-white/10 backdrop-blur-sm rounded-lg px-4 py-3">
                                <div className="text-white/60 text-sm mb-1">{spec.label}</div>
                                <div className="text-white font-semibold">{spec.value}</div>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </Link>
                  </SwiperSlide>
                ))}

                {/* Custom Navigation */}
                <motion.button 
                  animate={{ opacity: isHovered ? 1 : 0 }}
                  className="custom-prev absolute left-4 top-1/2 -translate-y-1/2 z-20 w-12 h-12 flex items-center justify-center rounded-full bg-white/10 backdrop-blur-sm text-white hover:bg-white/20 transition-all"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                </motion.button>
                <motion.button 
                  animate={{ opacity: isHovered ? 1 : 0 }}
                  className="custom-next absolute right-4 top-1/2 -translate-y-1/2 z-20 w-12 h-12 flex items-center justify-center rounded-full bg-white/10 backdrop-blur-sm text-white hover:bg-white/20 transition-all"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </motion.button>
              </Swiper>
            )}
          </motion.div>
        </div>
      </div>
    </div>
  );
} 