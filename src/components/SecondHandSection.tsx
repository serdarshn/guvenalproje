import Link from 'next/link';
import Image from 'next/image';

export default function SecondHandSection() {
  return (
    <section className="py-24 relative overflow-hidden">
      {/* Arka plan görseli */}
      <div className="absolute inset-0 -z-10">
        <Image
          src="https://images.pexels.com/photos/3822927/pexels-photo-3822927.jpeg"
          alt="İkinci El Makinalar"
          fill
          className="object-cover brightness-[0.2]"
        />
      </div>

      <div className="container mx-auto px-4">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row items-center justify-between gap-12">
            {/* Sol taraf - İçerik */}
            <div className="flex-1 text-white">
              <div className="inline-block bg-primary/20 backdrop-blur-sm px-4 py-2 rounded-full text-sm font-medium mb-6">
                İkinci El Makinalar
              </div>
              <h2 className="text-5xl font-bold mb-6 leading-tight">
                Kaliteli ve Bakımlı<br />
                <span className="text-primary">İkinci El</span> Makinalar
              </h2>
              <p className="text-lg text-white/80 mb-8 max-w-xl">
                Güvenal Makina güvencesiyle bakımı yapılmış, test edilmiş ikinci el endüstriyel makinalar için ikinci el ürünler sayfamızı ziyaret edin.
              </p>
              <div className="flex flex-wrap gap-6">
                <Link 
                  href="/ikinci-el"
                  className="inline-flex items-center gap-2 bg-primary hover:bg-primary-600 text-white px-8 py-4 rounded-xl font-medium transition-all duration-300 hover:gap-3"
                >
                  İkinci El Ürünleri İncele
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </Link>
                <Link 
                  href="/iletisim"
                  className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white px-8 py-4 rounded-xl font-medium transition-all duration-300 backdrop-blur-sm"
                >
                  Bize Ulaşın
                </Link>
              </div>
            </div>

            {/* Sağ taraf - İstatistikler */}
            <div className="grid grid-cols-2 gap-6 md:w-[400px]">
              <div className="bg-white/5 backdrop-blur-sm p-6 rounded-2xl border border-white/10">
                <div className="text-4xl font-bold text-primary mb-2">10+</div>
                <div className="text-white/80">Yıllık Tecrübe</div>
              </div>
              <div className="bg-white/5 backdrop-blur-sm p-6 rounded-2xl border border-white/10">
                <div className="text-4xl font-bold text-primary mb-2">50+</div>
                <div className="text-white/80">Memnun Müşteri</div>
              </div>
              <div className="bg-white/5 backdrop-blur-sm p-6 rounded-2xl border border-white/10">
                <div className="text-4xl font-bold text-primary mb-2">100+</div>
                <div className="text-white/80">Tamamlanan İş</div>
              </div>
              <div className="bg-white/5 backdrop-blur-sm p-6 rounded-2xl border border-white/10">
                <div className="text-4xl font-bold text-primary mb-2">%100</div>
                <div className="text-white/80">Müşteri Memnuniyeti</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
} 