'use client';

import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { useState, useEffect, useRef } from 'react';
import { toast } from 'react-hot-toast';

// Captcha kodu üretme fonksiyonu
function generateCaptchaCode() {
  const chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
  let code = '';
  for (let i = 0; i < 6; i++) {
    code += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return code;
}

// Captcha canvas'ını çizme fonksiyonu
function drawCaptcha(canvas: HTMLCanvasElement, code: string) {
  const ctx = canvas.getContext('2d');
  if (!ctx) return;

  // Canvas'ı temizle
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Arkaplan
  ctx.fillStyle = '#f3f4f6';
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // Karıştırıcı çizgiler
  for (let i = 0; i < 10; i++) {
    ctx.beginPath();
    ctx.moveTo(Math.random() * canvas.width, Math.random() * canvas.height);
    ctx.lineTo(Math.random() * canvas.width, Math.random() * canvas.height);
    ctx.strokeStyle = `rgba(37, 99, 235, ${Math.random() * 0.2 + 0.1})`;
    ctx.stroke();
  }

  // Metni çiz
  ctx.font = 'bold 24px Arial';
  ctx.fillStyle = '#2563eb';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  
  // Her karakteri ayrı ayrı çiz ve hafifçe döndür
  for (let i = 0; i < code.length; i++) {
    const x = (canvas.width / code.length) * (i + 0.5);
    const y = canvas.height / 2;
    ctx.save();
    ctx.translate(x, y);
    ctx.rotate((Math.random() - 0.5) * 0.4);
    ctx.fillText(code[i], 0, 0);
    ctx.restore();
  }

  // Noktalar ekle
  for (let i = 0; i < 50; i++) {
    ctx.beginPath();
    ctx.arc(
      Math.random() * canvas.width,
      Math.random() * canvas.height,
      1,
      0,
      Math.PI * 2
    );
    ctx.fillStyle = `rgba(37, 99, 235, ${Math.random() * 0.2 + 0.1})`;
    ctx.fill();
  }
}

export default function CareerPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    position: '',
    cv: null as File | null,
    note: '',
    captcha: ''
  });

  const [isLoading, setIsLoading] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [captchaCode, setCaptchaCode] = useState(() => generateCaptchaCode());
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Captcha'yı yenile
  const refreshCaptcha = () => {
    const newCode = generateCaptchaCode();
    setCaptchaCode(newCode);
    if (canvasRef.current) {
      drawCaptcha(canvasRef.current, newCode);
    }
  };

  // İlk yükleme ve yenileme durumlarında captcha'yı oluştur
  useEffect(() => {
    if (canvasRef.current) {
      drawCaptcha(canvasRef.current, captchaCode);
    }
  }, [captchaCode]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Captcha kontrolü
    if (formData.captcha.toLowerCase() !== captchaCode.toLowerCase()) {
      toast.error('Güvenlik kodu hatalı. Lütfen tekrar deneyin.');
      refreshCaptcha();
      setFormData(prev => ({ ...prev, captcha: '' }));
      return;
    }

    setIsLoading(true);

    try {
      // Form verilerini hazırla
      const submitData = new FormData();
      Object.entries(formData).forEach(([key, value]) => {
        if (value) submitData.append(key, value);
      });

      // API'ye gönder
      const response = await fetch('/api/career', {
        method: 'POST',
        body: submitData
      });

      const result = await response.json();

      if (result.success) {
        setSubmitSuccess(true);
        toast.success('Başvurunuz başarıyla gönderildi.');
        // Formu temizle
        setFormData({
          name: '',
          email: '',
          phone: '',
          position: '',
          cv: null,
          note: '',
          captcha: ''
        });
        refreshCaptcha();
      } else {
        throw new Error(result.message);
      }
    } catch (error) {
      toast.error('Başvuru gönderilirken bir hata oluştu. Lütfen tekrar deneyin.');
      console.error('Form gönderme hatası:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main>
      <Header />

      {/* Banner Section */}
      <section className="pt-[104px] relative bg-background-dark overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-primary-600 to-primary-900 opacity-90"></div>
        <div className="container mx-auto px-4 relative">
          <div className="max-w-7xl mx-auto py-16 md:py-20">
            <h1 className="text-4xl md:text-5xl font-bold text-white text-center mb-6">
              Kariyer
            </h1>
            <p className="text-lg text-white/80 text-center max-w-3xl mx-auto">
              Güvenal Makina ailesine katılın, geleceği birlikte şekillendirelim
            </p>
          </div>
        </div>
      </section>

      {/* İK Politikası Section */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="max-w-7xl mx-auto">
            <div className="grid md:grid-cols-2 gap-12 items-start">
              {/* Sol Taraf - İK Politikası */}
              <div className="space-y-8">
                <div>
                  <h2 className="text-3xl font-bold text-text mb-6">İnsan Kaynakları Politikası</h2>
                  <p className="text-text-light leading-relaxed">
                    İnsan Kaynakları&apos;nın misyonu bireylerin, ekiplerin ve organizasyonların katkısını ve gelişimini artıracak ve diğer yandan Güvenal Makina&apos;nın çalışanlarının hoşnut olacakları ve şirketleriyle gurur duyacakları bir ortamın geliştirilmesi ve korunmasıdır.
                  </p>
                </div>

                <div>
                  <h3 className="text-xl font-semibold text-text mb-4">Güvenal Makina&apos;nın İnsan Kaynakları İlkeleri</h3>
                  <div className="space-y-6">
                    <div className="flex gap-4">
                      <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                        <span className="text-primary font-semibold">1</span>
                      </div>
                      <p className="text-text-light">
                        Bireylerin onuruna ve değerine saygı gösterilmelidir. Bunun için objektif, işbirliği ve ekip çalışma ortamında çalışanların en yüksek performans düzeylerini teşvik etmelidir.
                      </p>
                    </div>
                    <div className="flex gap-4">
                      <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                        <span className="text-primary font-semibold">2</span>
                      </div>
                      <p className="text-text-light">
                        Her bir çalışanın inisiyatif almasını teşvik etmek. Bunu yaratıcı çalışmalar ortaya konması için hem yön çizerek hem de özgürlük vererek yapmak.
                      </p>
                    </div>
                    <div className="flex gap-4">
                      <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                        <span className="text-primary font-semibold">3</span>
                      </div>
                      <p className="text-text-light">
                        Bireysel yeteneklerin geliştirilmesini teşvik etmek. Bunu sağlıklı yerleştirme, yönlendirme ve geliştirme çalışmaları ile yapmak.
                      </p>
                    </div>
                    <div className="flex gap-4">
                      <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                        <span className="text-primary font-semibold">4</span>
                      </div>
                      <p className="text-text-light">
                        Çalışanların kendilerini geliştirmeleri için eşit fırsat vermek ve iyi performansı objektif bir şekilde ödüllendirmek.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Sağ Taraf - Başvuru Formu */}
              <div>
                <div className="bg-white rounded-2xl shadow-sm p-8">
                  <h3 className="text-2xl font-bold text-text mb-6">Başvuru Formu</h3>
                  <p className="text-gray-600 mb-8">
                    Güvenal Makina&apos;da kariyer fırsatları ve açık pozisyonlar hakkında bilgi alın. Ekibimize katılmak için başvurunuzu yapın.
                  </p>
                  <p className="text-gray-600 mb-8">
                    Güvenal Makina&apos;nın başarısı, çalışanlarının başarısıdır.
                  </p>

                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-text mb-2">
                        Ad, Soyad
                      </label>
                      <input
                        type="text"
                        id="name"
                        value={formData.name}
                        onChange={(e) => setFormData({...formData, name: e.target.value})}
                        className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors"
                        required
                        disabled={isLoading}
                      />
                    </div>

                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-text mb-2">
                        E-Posta
                      </label>
                      <input
                        type="email"
                        id="email"
                        value={formData.email}
                        onChange={(e) => setFormData({...formData, email: e.target.value})}
                        className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors"
                        required
                        disabled={isLoading}
                      />
                    </div>

                    <div>
                      <label htmlFor="phone" className="block text-sm font-medium text-text mb-2">
                        Telefon
                      </label>
                      <input
                        type="tel"
                        id="phone"
                        value={formData.phone}
                        onChange={(e) => setFormData({...formData, phone: e.target.value})}
                        className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors"
                        required
                        disabled={isLoading}
                        pattern="[0-9]{10,11}"
                        title="Lütfen geçerli bir telefon numarası girin"
                      />
                    </div>

                    <div>
                      <label htmlFor="position" className="block text-sm font-medium text-text mb-2">
                        Pozisyon
                      </label>
                      <input
                        type="text"
                        id="position"
                        value={formData.position}
                        onChange={(e) => setFormData({...formData, position: e.target.value})}
                        className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors"
                        required
                        disabled={isLoading}
                      />
                    </div>

                    <div>
                      <label htmlFor="cv" className="block text-sm font-medium text-text mb-2">
                        CV Yükle
                      </label>
                      <input
                        type="file"
                        id="cv"
                        onChange={(e) => setFormData({...formData, cv: e.target.files?.[0] || null})}
                        className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors"
                        accept=".pdf,.doc,.docx"
                        required
                        disabled={isLoading}
                      />
                      <p className="mt-1 text-sm text-text-light">
                        Maksimum dosya boyutu: 5MB. Kabul edilen formatlar: PDF, DOC, DOCX
                      </p>
                    </div>

                    <div>
                      <label htmlFor="note" className="block text-sm font-medium text-text mb-2">
                        Notunuz
                      </label>
                      <textarea
                        id="note"
                        value={formData.note}
                        onChange={(e) => setFormData({...formData, note: e.target.value})}
                        className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors"
                        rows={4}
                        disabled={isLoading}
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-text mb-1">
                        Kodu girin
                      </label>
                      <div className="space-y-4">
                        <div>
                          <canvas
                            ref={canvasRef}
                            width={140}
                            height={42}
                            className="w-[140px] h-[42px] bg-white rounded-lg border border-gray-200"
                          />
                          <button
                            type="button"
                            onClick={refreshCaptcha}
                            className="mt-1 text-xs text-primary hover:text-primary-600 transition-colors"
                          >
                            Yeni Kod
                          </button>
                        </div>
                        <input
                          type="text"
                          id="captcha"
                          value={formData.captcha}
                          onChange={(e) => setFormData({...formData, captcha: e.target.value})}
                          className="w-full h-[42px] px-4 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors"
                          required
                          disabled={isLoading}
                        />
                      </div>
                    </div>

                    <button
                      type="submit"
                      disabled={isLoading}
                      className={`w-full bg-primary hover:bg-primary-600 text-white font-medium py-3 rounded-lg transition-colors relative ${
                        isLoading ? 'opacity-70 cursor-not-allowed' : ''
                      }`}
                    >
                      {isLoading ? (
                        <>
                          <span className="opacity-0">Başvuru Yap</span>
                          <div className="absolute inset-0 flex items-center justify-center">
                            <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                          </div>
                        </>
                      ) : (
                        'Başvuru Yap'
                      )}
                    </button>

                    {submitSuccess && (
                      <div className="mt-4 p-4 bg-green-50 text-green-700 rounded-lg">
                        Başvurunuz başarıyla gönderildi. En kısa sürede sizinle iletişime geçeceğiz.
                      </div>
                    )}
                  </form>
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