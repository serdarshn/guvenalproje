'use client';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, EffectFade, Navigation, Pagination } from 'swiper/modules';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';

// Swiper styles
import 'swiper/css';
import 'swiper/css/effect-fade';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

const slides = [
  {
    id: 1,
    image: 'https://images.pexels.com/photos/3846517/pexels-photo-3846517.jpeg',
    title: 'Endüstriyel Çözümler',
    description: 'Modern teknoloji ve yüksek kalite standartlarıyla üretim çözümleri'
  },
  {
    id: 2,
    image: 'https://images.pexels.com/photos/2760243/pexels-photo-2760243.jpeg',
    title: 'Profesyonel Ekipman',
    description: 'Endüstriyel üretim için profesyonel makina ve ekipmanlar'
  },
  {
    id: 3,
    image: 'https://images.pexels.com/photos/3912982/pexels-photo-3912982.jpeg',
    title: 'Teknik Servis',
    description: 'Uzman kadromuzla teknik servis ve bakım hizmetleri'
  }
];

export default function HeroSection() {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <div className="relative min-h-[85vh] bg-background-dark">
      <div className="container mx-auto h-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 h-full items-center py-20">
          {/* Sol Taraf - Statik İçerik */}
          <div className="text-white space-y-6 px-4 lg:px-8">
            <span className="text-primary-400 font-medium tracking-wider text-sm">
              GÜVENAL MAKİNA
            </span>
            <h1 className="text-4xl lg:text-6xl font-bold leading-tight">
              Endüstriyel Çözüm<br />
              <span className="text-primary">Ortağınız</span>
            </h1>
            <p className="text-lg text-gray-300 max-w-xl">
              40 yılı aşkın tecrübemizle endüstriyel makina ve ekipman çözümleri sunuyoruz. 
              Yenilikçi teknolojiler ve uzman kadromuzla işletmenizi geleceğe taşıyoruz.
            </p>
            <div className="flex flex-wrap gap-4 pt-4">
              <Link 
                href="/urunler" 
                className="bg-primary hover:bg-primary-600 text-white px-8 py-4 rounded-lg font-medium transition-all duration-300 inline-flex items-center gap-2"
              >
                Ürünlerimizi İnceleyin
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
              <Link 
                href="/iletisim" 
                className="border border-white/20 hover:border-white/40 text-white px-8 py-4 rounded-lg font-medium transition-all duration-300"
              >
                İletişime Geçin
              </Link>
            </div>
          </div>

          {/* Sağ Taraf - Ürün Slider */}
          <div className="relative h-[500px] lg:h-[600px]">
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
              onSlideChange={(swiper) => setActiveIndex(swiper.realIndex)}
            >
              {slides.map((slide, index) => (
                <SwiperSlide key={slide.id} className="relative">
                  <Image
                    src={slide.image}
                    alt={slide.title}
                    fill
                    className="object-cover"
                    priority={index === 0}
                  />
                  <div className="absolute inset-0 bg-black/40" />
                  
                  {/* Ürün Bilgisi */}
                  <div className="absolute bottom-0 left-0 right-0 p-8">
                    <div className="space-y-2 relative">
                      <h3 className="text-2xl font-bold text-white">
                        {slide.title}
                      </h3>
                      <p className="text-lg text-gray-300 max-w-xl">
                        {slide.description}
                      </p>
                    </div>
                  </div>
                </SwiperSlide>
              ))}

              {/* Custom Navigation */}
              <button className="custom-prev absolute left-4 top-1/2 -translate-y-1/2 z-10 w-12 h-12 flex items-center justify-center rounded-full bg-white/10 backdrop-blur-sm text-white hover:bg-white/20 transition-all opacity-0 group-hover:opacity-100">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              <button className="custom-next absolute right-4 top-1/2 -translate-y-1/2 z-10 w-12 h-12 flex items-center justify-center rounded-full bg-white/10 backdrop-blur-sm text-white hover:bg-white/20 transition-all opacity-0 group-hover:opacity-100">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>

              {/* Slide Counter */}
              <div className="absolute bottom-8 right-8 z-10 text-white font-medium">
                <span className="text-2xl">{(activeIndex + 1).toString().padStart(2, '0')}</span>
                <span className="mx-2 text-white/50">/</span>
                <span className="text-white/50">{slides.length.toString().padStart(2, '0')}</span>
              </div>
            </Swiper>
          </div>
        </div>
      </div>
    </div>
  );
} 