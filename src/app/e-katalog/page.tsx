'use client';

import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function CatalogPage() {
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
                  E-Katalog
                </h1>
                <div className="h-1 w-20 bg-white mb-4"></div>
                <p className="text-lg text-white/90">
                  Ürün kataloğumuzu indirebilirsiniz
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

      {/* Catalog Content Section */}
      <section className="py-12 bg-background">
        <div className="container mx-auto px-4">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Katalog Kartları */}
              {[
                {
                  title: 'CNC Katalog 2020',
                  description: 'CNC tezgahları ve özellikleri hakkında detaylı bilgiler',
                  pdfUrl: '/catalogs/cnc-2020.pdf'
                },
                {
                  title: 'Dalma Erozyon Katalog 2020',
                  description: 'Dalma erozyon tezgahları ve teknik özellikleri',
                  pdfUrl: '/catalogs/dalma-erozyon-2020.pdf'
                },
                {
                  title: 'Torna Taşlama Matkap Testere 2020',
                  description: 'Torna, taşlama, matkap ve testere tezgahları kataloğu',
                  pdfUrl: '/catalogs/torna-taslama-matkap-testere-2020.pdf'
                },
                {
                  title: 'Universal Frezeler Katalog 2020',
                  description: 'Universal freze tezgahları ve teknik detayları',
                  pdfUrl: '/catalogs/universal-frezeler-2020.pdf'
                }
              ].map((catalog, index) => (
                <div key={index} className="bg-white rounded-xl shadow-sm overflow-hidden hover:shadow-md transition-shadow">
                  <div className="p-6">
                    <h3 className="text-xl font-semibold text-text mb-2">{catalog.title}</h3>
                    <p className="text-text-light mb-4">{catalog.description}</p>
                    <div className="flex justify-center">
                      <a 
                        href={catalog.pdfUrl}
                        download
                        className="bg-primary hover:bg-primary-600 text-white font-medium py-2 px-6 rounded-lg transition-colors flex items-center justify-center gap-2"
                      >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                        </svg>
                        PDF İndir
                      </a>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
} 