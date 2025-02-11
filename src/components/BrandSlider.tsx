'use client';

import useEmblaCarousel from 'embla-carousel-react';
import Autoplay from 'embla-carousel-autoplay';
import Image from 'next/image';

export default function BrandSection() {
  const [emblaRef] = useEmblaCarousel(
    { loop: true, dragFree: true, containScroll: 'trimSnaps' },
    [Autoplay({ delay: 3000, stopOnInteraction: false })]
  );

  return (
    <section className="py-16 bg-background relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-primary-900/5 to-transparent"></div>
        <div className="absolute inset-0 opacity-30">
          <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
            <defs>
              <pattern id="brand-grid" width="20" height="20" patternUnits="userSpaceOnUse">
                <path d="M 20 0 L 0 0 0 20" fill="none" stroke="currentColor" strokeWidth="0.5" className="text-primary-900/10"/>
              </pattern>
            </defs>
            <rect width="100" height="100" fill="url(#brand-grid)"/>
          </svg>
        </div>
      </div>

      {/* Floating Elements */}
      <div className="absolute -top-24 -right-24 w-96 h-96 bg-primary-500/10 rounded-full filter blur-3xl"></div>
      <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-primary-500/10 rounded-full filter blur-3xl"></div>
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary-500/5 rounded-full filter blur-3xl"></div>

      <div className="container mx-auto px-4 relative">
        <div className="max-w-7xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-text mb-4">
              Markalarımız
            </h2>
            <div className="h-1 w-20 bg-primary mx-auto"></div>
          </div>

          {/* Brand Slider */}
          <div className="overflow-hidden" ref={emblaRef}>
            <div className="flex -ml-6">
              {[
                '/images/brands/brand1.png',
                '/images/brands/brand2.png',
                '/images/brands/brand3.png',
                '/images/brands/brand4.png',
                '/images/brands/brand5.png',
                '/images/brands/brand6.png',
                '/images/brands/brand7.png',
                '/images/brands/brand8.png'
              ].map((brand, index) => (
                <div key={index} className="flex-[0_0_25%] min-w-0 pl-6">
                  <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-sm hover:shadow-lg transition-all border border-gray-100 h-24 flex items-center justify-center group">
                    <Image
                      src={brand}
                      alt={`Brand ${index + 1}`}
                      width={150}
                      height={48}
                      className="max-h-12 w-auto opacity-60 group-hover:opacity-100 transition-opacity grayscale group-hover:grayscale-0"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Floating Dots */}
      <div className="absolute top-12 left-8 w-3 h-3 bg-primary-500/20 rounded-full"></div>
      <div className="absolute bottom-24 right-16 w-4 h-4 bg-primary-500/20 rounded-full"></div>
      <div className="absolute top-1/2 right-32 w-2 h-2 bg-primary-500/20 rounded-full"></div>
    </section>
  );
} 