'use client';

import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Image from 'next/image';
import { useState, useCallback, useEffect } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import Autoplay from 'embla-carousel-autoplay';

export default function CorporatePage() {
  const [activeTab, setActiveTab] = useState('about');
  const [emblaRef, emblaApi] = useEmblaCarousel(
    {
      loop: true,
      align: 'center',
      dragFree: false,
      containScroll: 'trimSnaps',
      slidesToScroll: 1,
      duration: 50
    },
    [
      Autoplay({
        delay: 4000,
        stopOnInteraction: true,
        stopOnMouseEnter: true,
        rootNode: (emblaRoot) => emblaRoot.parentElement,
      })
    ]
  );

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);

  // Autoplay functionality
  useEffect(() => {
    if (emblaApi) {
      const autoplay = setInterval(() => {
        emblaApi.scrollNext();
      }, 3000); // Scroll every 3 seconds

      return () => clearInterval(autoplay);
    }
  }, [emblaApi]);

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
                  Kurumsal
                </h1>
                <div className="h-1 w-20 bg-white mb-4"></div>
                <p className="text-lg text-white/90">
                  1983&apos;ten beri endüstriyel makina sektöründe öncü çözümler
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

      {/* Hakkımızda Section */}
      <section className="py-24 bg-white relative overflow-hidden">
        {/* Background Decoration */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(var(--color-primary),0.05),transparent_50%)]"></div>
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,rgba(var(--color-primary),0.05),transparent_50%)]"></div>
          <div className="absolute top-1/2 left-0 w-full h-px bg-gradient-to-r from-transparent via-primary/10 to-transparent"></div>
        </div>

        <div className="container mx-auto px-4 relative">
          <div className="max-w-7xl mx-auto">
            {/* Başlık */}
            <div className="text-center mb-16">
              <div className="inline-block bg-primary/10 px-4 py-2 rounded-full text-primary text-sm font-medium mb-6">
                Hakkımızda
              </div>
              <h2 className="text-4xl lg:text-5xl font-bold text-text mb-6">
                Endüstriyel Çözümlerde<br />
                <span className="text-primary">Güvenilir İş Ortağınız</span>
              </h2>
              <div className="h-1 w-20 bg-primary mx-auto"></div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
              {/* Sol taraf - Fotoğraf ve İstatistikler */}
              <div className="lg:col-span-5 space-y-8">
                <div className="relative">
                  <div className="aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl">
                    <Image
                      src="https://images.pexels.com/photos/3846226/pexels-photo-3846226.jpeg"
                      alt="Güvenal Makina Üretim"
                      fill
                      className="object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
                  </div>
                  
                  {/* Floating Stats */}
                  <div className="absolute -bottom-4 -right-4 bg-white p-4 rounded-xl shadow-xl">
                    <div className="text-2xl font-bold text-primary">20+</div>
                    <div className="text-sm text-text-light">Yıllık Tecrübe</div>
                  </div>
                  
                  <div className="absolute -top-4 -left-4 bg-white p-4 rounded-xl shadow-xl">
                    <div className="text-2xl font-bold text-primary">8+</div>
                    <div className="text-sm text-text-light">Bölge Temsilciliği</div>
                  </div>
                </div>
              </div>

              {/* Sağ taraf - İçerik */}
              <div className="lg:col-span-7 space-y-8">
                <div className="prose prose-lg">
                  <div className="space-y-6">
                    <p className="text-xl font-medium text-text leading-relaxed">
                      2003 yılında kurulan GÜVENAL MAKİNA TİCARET VE SANAYİ LTD. ŞTİ. 13 yıldır üniversal takım tezgahları ve CNC tezgahlarının satışı konusunda siz değerli müşterilerimize hizmet vermektedir.
                    </p>
                    
                    <div className="space-y-4 text-text-light">
                      <p>
                        Firmamız her geçen gün kendini geliştirerek ve tecrübe kazanarak sizlere daha hizmet verebilmek için şubeleşmeye başlamıştır. Bu kapsamda İkitelli bölgesinde 2008 yılında hizmete giren şubemiz bulunmaktadır.
                      </p>
                      <p>
                        İkitelli şubemizde 2. el takas ve aynı zamanda revizyon işlemleri de yapılmaktadır.
                      </p>
                    </div>

                    {/* Feature Cards */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
                      {/* Global Presence Card */}
                      <div className="bg-background rounded-xl p-6 border border-primary/10">
                        <div className="flex items-start gap-4">
                          <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                            <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                          </div>
                          <div>
                            <h3 className="font-semibold text-text mb-2">Uluslararası Takip</h3>
                            <p className="text-text-light text-sm">
                              Her sene düzenli olarak TAIWAN-ÇİN-İTALYA-ALMANYA gibi ülkelerdeki fuarları takip ederek yeni teknolojileri ülkemize getiriyoruz.
                            </p>
                          </div>
                        </div>
                      </div>

                      {/* CE Certificate Card */}
                      <div className="bg-background rounded-xl p-6 border border-primary/10">
                        <div className="flex items-start gap-4">
                          <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                            <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                            </svg>
                          </div>
                          <div>
                            <h3 className="font-semibold text-text mb-2">CE Sertifikalı Ürünler</h3>
                            <p className="text-text-light text-sm">
                              Ülkemize sadece CE belgesine sahip ürünleri getirmekteyiz.
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Location Map */}
                    <div className="bg-background rounded-xl p-6 mt-6 border border-primary/10">
                      <div className="flex items-start gap-4">
                        <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                          <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                          </svg>
                        </div>
                        <div>
                          <h3 className="font-semibold text-text mb-2">Türkiye Genelinde Hizmet</h3>
                          <p className="text-text-light">
                            Müşterilerimize daha hızlı hizmet verebilmek için ANKARA-KONYA-İZMİR-BURSA-KAYSERİ-ADANA-TRAKYA ve BOLU bölgelerinde temsilciliklerimiz bulunmaktadır.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Vizyon & Misyon Section */}
      <section className="py-24 bg-white relative overflow-hidden">
        {/* Dekoratif Arka Plan */}
        <div className="absolute inset-0">
          <div className="absolute left-0 top-0 w-1/3 h-full bg-primary/5 -skew-x-12 -translate-x-1/4"></div>
          <div className="absolute right-0 bottom-0 w-1/3 h-full bg-primary/5 -skew-x-12 translate-x-1/4"></div>
        </div>

        <div className="container mx-auto px-4 relative">
          <div className="max-w-7xl mx-auto">
            {/* Başlık */}
            <div className="text-center mb-16">
              <div className="inline-block bg-primary/10 px-4 py-2 rounded-full text-primary text-sm font-medium mb-6">
                Vizyon & Misyon
              </div>
              <h2 className="text-4xl font-bold text-text mb-6">
                Geleceğe Yön Veren Hedefler
              </h2>
              <div className="h-1 w-20 bg-primary mx-auto"></div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
              {/* Vizyon */}
              <div className="bg-white p-10 rounded-2xl shadow-soft border border-gray-100 relative">
                {/* Dekoratif İkon */}
                <div className="absolute -top-8 left-10">
                  <div className="w-16 h-16 bg-primary text-white rounded-2xl shadow-lg flex items-center justify-center transform -rotate-6">
                    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    </svg>
                  </div>
                </div>

                <div className="pt-6">
                  <h3 className="text-2xl font-bold text-text mb-6">Vizyonumuz</h3>
                  <p className="text-text-light text-lg leading-relaxed">
                    Sunduğumuz ürün kalitesi, hizmet ve katma değer ile sektörümüzün öncü firması haline gelmek.
                  </p>
                </div>
              </div>

              {/* Misyon */}
              <div className="bg-white p-10 rounded-2xl shadow-soft border border-gray-100 relative">
                {/* Dekoratif İkon */}
                <div className="absolute -top-8 left-10">
                  <div className="w-16 h-16 bg-primary text-white rounded-2xl shadow-lg flex items-center justify-center transform rotate-6">
                    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                    </svg>
                  </div>
                </div>

                <div className="pt-6">
                  <h3 className="text-2xl font-bold text-text mb-6">Misyonumuz</h3>
                  <p className="text-text-light text-lg leading-relaxed">
                    Teknolojinin hızla ilerlediği günümüzde, dünya çapında teknolojiyi yakından takip ederek, sanayicilerimizin maliyetlerini en aza indirerek verimi arttıracak makinalarla hizmetlerine emin adımlarla devam etmesini sağlamak önceliğimizdir.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Şubelerimiz Section */}
      <section className="py-24 bg-background relative overflow-hidden">
        {/* Background Decoration */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(var(--color-primary),0.05),transparent_50%)]"></div>
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,rgba(var(--color-primary),0.05),transparent_50%)]"></div>
        </div>

        <div className="container mx-auto px-4 relative">
          <div className="max-w-7xl mx-auto">
            {/* Başlık */}
            <div className="text-center mb-16">
              <div className="inline-block bg-primary/10 px-4 py-2 rounded-full text-primary text-sm font-medium mb-6">
                Şubelerimiz
              </div>
              <h2 className="text-4xl font-bold text-text mb-6">
                Size En Yakın Şubemiz
              </h2>
              <div className="h-1 w-20 bg-primary mx-auto"></div>
            </div>

            {/* Şubeler Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* İkitelli Mağaza */}
              <div className="bg-white p-8 rounded-2xl shadow-soft border border-gray-100">
                <div className="flex items-start gap-4 mb-6">
                  <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center flex-shrink-0">
                    <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-text">İkitelli Mağaza</h3>
                    <p className="text-text-light mt-2">
                      İkitelli OSB Demirciler Küçük San. Sit. B1 Blok No: 34 K2 Başakşehir - İstanbul / TÜRKİYE
                    </p>
                  </div>
                </div>
                <div className="space-y-3 text-text-light">
                  <div className="flex items-center gap-3">
                    <svg className="w-5 h-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                    <span>0212 671 09 10 pbx</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <svg className="w-5 h-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                    <span>ikitelli@guvenalmakina.com.tr</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <svg className="w-5 h-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
                    </svg>
                    <a href="#" className="text-primary hover:underline">Kroki için tıklayın</a>
                  </div>
                </div>
              </div>

              {/* Bayrampaşa Mağaza */}
              <div className="bg-white p-8 rounded-2xl shadow-soft border border-gray-100">
                <div className="flex items-start gap-4 mb-6">
                  <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center flex-shrink-0">
                    <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-text">Bayrampaşa Mağaza</h3>
                    <p className="text-text-light mt-2">
                      İsmet Paşa Mah. Abdi İpekçi Cad. No: 113 / 2 Bayrampaşa - İstanbul / TÜRKİYE
                    </p>
                  </div>
                </div>
                <div className="space-y-3 text-text-light">
                  <div className="flex items-center gap-3">
                    <svg className="w-5 h-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                    <span>0212 567 38 87</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <svg className="w-5 h-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                    <span>bayrampasa@guvenalmakina.com.tr</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <svg className="w-5 h-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
                    </svg>
                    <a href="#" className="text-primary hover:underline">Kroki için tıklayın</a>
                  </div>
                </div>
              </div>

              {/* Kıraç Şube */}
              <div className="bg-white p-8 rounded-2xl shadow-soft border border-gray-100">
                <div className="flex items-start gap-4 mb-6">
                  <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center flex-shrink-0">
                    <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-text">Kıraç Şube (Hırdavat)</h3>
                    <p className="text-text-light mt-2">
                      Çakmaklı Mh. Akçaburgaz Mevkii ALKOP Sanayi Sitesi A11 Blok No: 17 Kıraç - Hadımköy - Büyükçekmece - İSTANBUL - TÜRKİYE
                    </p>
                  </div>
                </div>
                <div className="space-y-3 text-text-light">
                  <div className="flex items-center gap-3">
                    <svg className="w-5 h-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                    <span>0212 858 00 81</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <svg className="w-5 h-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                    <span>info@guvenalmakina.com.tr</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <svg className="w-5 h-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
                    </svg>
                    <a href="#" className="text-primary hover:underline">Kroki için tıklayın</a>
                  </div>
                </div>
              </div>

              {/* Topçular */}
              <div className="bg-white p-8 rounded-2xl shadow-soft border border-gray-100">
                <div className="flex items-start gap-4 mb-6">
                  <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center flex-shrink-0">
                    <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-text">Topçular (Hırdavat)</h3>
                    <p className="text-text-light mt-2">
                      Rami Kışla Cd. Emintaş 3 San. Sit. No:56-57-58 Topçular - Eyüp İSTANBUL - TÜRKİYE
                    </p>
                  </div>
                </div>
                <div className="space-y-3 text-text-light">
                  <div className="flex items-center gap-3">
                    <svg className="w-5 h-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                    <span>0212 501 53 81</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <svg className="w-5 h-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                    <span>info@guvenalmakina.com.tr</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <svg className="w-5 h-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
                    </svg>
                    <a href="#" className="text-primary hover:underline">Kroki için tıklayın</a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Markalarımız ve Çözüm Ortaklarımız Section */}
      <section className="py-24 bg-white relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(var(--color-primary),0.02)_1px,transparent_1px),linear-gradient(to_bottom,rgba(var(--color-primary),0.02)_1px,transparent_1px)] bg-[size:4rem_4rem]"></div>
        </div>

        <div className="container mx-auto px-4 relative">
          <div className="max-w-7xl mx-auto">
            {/* Başlık */}
            <div className="text-center mb-16">
              <div className="inline-block bg-primary/10 px-4 py-2 rounded-full text-primary text-sm font-medium mb-6">
                İş Ortaklarımız
              </div>
              <h2 className="text-4xl font-bold text-text mb-6">
                Güçlü İş Birliklerimiz
              </h2>
              <div className="h-1 w-20 bg-primary mx-auto mb-12"></div>

              {/* Tab Buttons */}
              <div className="flex justify-center gap-4 mb-12">
                <button 
                  onClick={() => setActiveTab('brands')}
                  className={`px-8 py-3 rounded-lg font-medium transition-all duration-300 ${
                    activeTab === 'brands' 
                      ? 'bg-primary text-white shadow-lg' 
                      : 'bg-gray-100 text-text hover:bg-gray-200'
                  }`}
                >
                  Markalarımız
                </button>
                <button 
                  onClick={() => setActiveTab('partners')}
                  className={`px-8 py-3 rounded-lg font-medium transition-all duration-300 ${
                    activeTab === 'partners' 
                      ? 'bg-primary text-white shadow-lg' 
                      : 'bg-gray-100 text-text hover:bg-gray-200'
                  }`}
                >
                  Çözüm Ortaklarımız
                </button>
              </div>
            </div>

            {/* Brands Slider */}
            <div className={`transition-all duration-500 ${activeTab === 'brands' ? 'block' : 'hidden'}`}>
              <div className="relative px-12">
                <div className="overflow-hidden" ref={emblaRef}>
                  <div className="flex -ml-4">
                    {[...Array(22)].map((_, index) => (
                      <div key={index} className="flex-[0_0_calc(20%-16px)] min-w-0 pl-4">
                        <div className="relative h-24 bg-white rounded-xl shadow-soft border border-gray-100 p-6 transition-all duration-300 hover:shadow-lg group">
                          <Image
                            src={`https://images.pexels.com/photos/1337380/pexels-photo-1337380.jpeg`}
                            alt={`Brand Logo ${index + 1}`}
                            fill
                            className="object-contain filter grayscale group-hover:grayscale-0 transition-all duration-300 p-4"
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Navigation Buttons */}
                <button
                  onClick={scrollPrev}
                  className="absolute left-0 top-1/2 -translate-y-1/2 bg-white text-primary p-3 rounded-full shadow-lg transition-all duration-300 hover:bg-primary hover:text-white z-10"
                  aria-label="Previous slide"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                </button>
                <button
                  onClick={scrollNext}
                  className="absolute right-0 top-1/2 -translate-y-1/2 bg-white text-primary p-3 rounded-full shadow-lg transition-all duration-300 hover:bg-primary hover:text-white z-10"
                  aria-label="Next slide"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </div>
            </div>

            {/* Partners Grid */}
            <div className={`transition-all duration-500 ${activeTab === 'partners' ? 'block' : 'hidden'}`}>
              <div className="grid grid-cols-2 md:grid-cols-5 gap-8 items-center">
                {[1, 2, 3, 4, 5].map((index) => (
                  <div key={index} className="group relative">
                    <div className="relative h-24 bg-white rounded-xl shadow-soft border border-gray-100 p-6 transition-all duration-300 hover:shadow-lg">
                      <Image
                        src={`https://images.pexels.com/photos/1337380/pexels-photo-1337380.jpeg`}
                        alt={`Partner Logo ${index}`}
                        fill
                        className="object-contain filter grayscale group-hover:grayscale-0 transition-all duration-300 p-4"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Sertifikalarımız Section */}
      <section className="py-24 bg-background relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(var(--color-primary),0.05),transparent_50%)]"></div>
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,rgba(var(--color-primary),0.05),transparent_50%)]"></div>
        </div>

        <div className="container mx-auto px-4 relative">
          <div className="max-w-7xl mx-auto">
            {/* Başlık */}
            <div className="text-center mb-16">
              <div className="inline-block bg-primary/10 px-4 py-2 rounded-full text-primary text-sm font-medium mb-6">
                Sertifikalarımız
              </div>
              <h2 className="text-4xl font-bold text-text mb-6">
                Kalite ve Güvenilirlik
              </h2>
              <div className="h-1 w-20 bg-primary mx-auto"></div>
            </div>

            {/* Sertifikalar Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {/* CE Sertifikası */}
              <div className="group">
                <div className="bg-white rounded-xl overflow-hidden shadow-soft border border-gray-100 transition-all duration-300 hover:shadow-lg">
                  <div className="relative aspect-[3/4] overflow-hidden">
                    <Image
                      src="https://images.pexels.com/photos/5726839/pexels-photo-5726839.jpeg"
                      alt="CE Sertifikası"
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                    <div className="absolute bottom-0 left-0 right-0 p-6">
                      <h3 className="text-lg font-bold text-white mb-2">CE Sertifikası</h3>
                      <p className="text-sm text-white/80">Avrupa Birliği Standartları</p>
                    </div>
                  </div>
                  <div className="p-6 bg-white">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-text-light">Belge No: CE-2024-001</span>
                      <button className="text-primary hover:text-primary-600 transition-colors">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                        </svg>
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* ISO 9001 */}
              <div className="group">
                <div className="bg-white rounded-xl overflow-hidden shadow-soft border border-gray-100 transition-all duration-300 hover:shadow-lg">
                  <div className="relative aspect-[3/4] overflow-hidden">
                    <Image
                      src="https://images.pexels.com/photos/5726838/pexels-photo-5726838.jpeg"
                      alt="ISO 9001 Sertifikası"
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                    <div className="absolute bottom-0 left-0 right-0 p-6">
                      <h3 className="text-lg font-bold text-white mb-2">ISO 9001</h3>
                      <p className="text-sm text-white/80">Kalite Yönetim Sistemi</p>
                    </div>
                  </div>
                  <div className="p-6 bg-white">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-text-light">Belge No: ISO-2024-002</span>
                      <button className="text-primary hover:text-primary-600 transition-colors">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                        </svg>
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* TSE */}
              <div className="group">
                <div className="bg-white rounded-xl overflow-hidden shadow-soft border border-gray-100 transition-all duration-300 hover:shadow-lg">
                  <div className="relative aspect-[3/4] overflow-hidden">
                    <Image
                      src="https://images.pexels.com/photos/5726837/pexels-photo-5726837.jpeg"
                      alt="TSE Sertifikası"
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                    <div className="absolute bottom-0 left-0 right-0 p-6">
                      <h3 className="text-lg font-bold text-white mb-2">TSE</h3>
                      <p className="text-sm text-white/80">Türk Standartları Uygunluk</p>
                    </div>
                  </div>
                  <div className="p-6 bg-white">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-text-light">Belge No: TSE-2024-003</span>
                      <button className="text-primary hover:text-primary-600 transition-colors">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                        </svg>
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* ISO 14001 */}
              <div className="group">
                <div className="bg-white rounded-xl overflow-hidden shadow-soft border border-gray-100 transition-all duration-300 hover:shadow-lg">
                  <div className="relative aspect-[3/4] overflow-hidden">
                    <Image
                      src="https://images.pexels.com/photos/5726836/pexels-photo-5726836.jpeg"
                      alt="ISO 14001 Sertifikası"
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                    <div className="absolute bottom-0 left-0 right-0 p-6">
                      <h3 className="text-lg font-bold text-white mb-2">ISO 14001</h3>
                      <p className="text-sm text-white/80">Çevre Yönetim Sistemi</p>
                    </div>
                  </div>
                  <div className="p-6 bg-white">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-text-light">Belge No: ISO-2024-004</span>
                      <button className="text-primary hover:text-primary-600 transition-colors">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                        </svg>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
} 