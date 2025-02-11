'use client';

import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function PrivacyNoticePage() {
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
                  Gizlilik Bildirimi
                </h1>
                <div className="h-1 w-20 bg-white mb-4"></div>
                <p className="text-lg text-white/90">
                  Kişisel verilerinizin korunması ve gizliliğiniz bizim için önemli
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

      {/* Main Content */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto prose prose-lg">
            <h2>Kişisel Bilgilerin Korunması</h2>
            <p>
              Güvenal Makina olarak, web sitemizi ziyaret eden kullanıcılarımızın gizliliğine saygı duyuyor ve kişisel bilgilerinin korunmasına özen gösteriyoruz. Sitemizde, sizin tarafınızdan gönüllü olarak paylaşılan bilgiler dışında herhangi bir kişisel bilgi toplanmamaktadır.
            </p>

            <h2>Site İstatistikleri</h2>
            <p>
              Web sitemizin kullanımını analiz etmek ve geliştirmek amacıyla istatistiksel veriler toplanmaktadır. Bu veriler, kişisel bilgileriniz kullanılmadan, tamamen anonim olarak işlenmektedir.
            </p>

            <h2>Çerezler (Cookies)</h2>
            <p>
              Sitemiz, kullanıcı deneyimini iyileştirmek ve site fonksiyonlarını geliştirmek amacıyla çerezler kullanmaktadır. Bu çerezler, onayınız olmadan kişisel verilerinizi toplamamakta ve sadece teknik işlevler için kullanılmaktadır.
            </p>

            <h2>Dış Bağlantılar</h2>
            <p>
              Web sitemizde yer alan dış bağlantılar (external links) aracılığıyla ulaşacağınız içerikler hakkında sorumluluk kabul etmemekteyiz. Bu sitelerin içerik ve gizlilik uygulamalarından, ilgili siteler sorumludur.
            </p>

            <div className="bg-primary/5 p-6 rounded-xl mt-8">
              <p className="text-sm text-text-light mb-0">
                Bu gizlilik bildirimini kabul ederek, web sitemizi kullanmaya devam etmeniz halinde, burada belirtilen şartları kabul etmiş sayılırsınız.
              </p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
} 