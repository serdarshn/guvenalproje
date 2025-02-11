'use client';

import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { useState, useRef, useEffect } from 'react';
import { toast } from 'react-hot-toast';
import { products } from '@/data/products';

export default function ContactPage() {
  const [activeTab, setActiveTab] = useState('contact');
  const [activeLocationTab, setActiveLocationTab] = useState('merkez');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    subject: '',
    message: '',
    captcha: '',
    product: ''
  });
  const [isLoading, setIsLoading] = useState(false);
  const [captchaCode, setCaptchaCode] = useState(() => {
    return generateCaptchaCode();
  });
  
  // Captcha kodu oluşturma fonksiyonu
  function generateCaptchaCode() {
    const chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
    let code = '';
    for (let i = 0; i < 6; i++) {
      code += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return code;
  }

  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Ürün arama için state'ler
  const [isProductDropdownOpen, setIsProductDropdownOpen] = useState(false);
  const [productSearchQuery, setProductSearchQuery] = useState('');
  const [filteredProducts, setFilteredProducts] = useState(products);
  const productDropdownRef = useRef<HTMLDivElement>(null);

  // Ürün arama fonksiyonu
  useEffect(() => {
    if (productSearchQuery) {
      const filtered = products.filter(product =>
        product.name.toLowerCase().includes(productSearchQuery.toLowerCase())
      );
      setFilteredProducts(filtered);
    } else {
      setFilteredProducts(products);
    }
  }, [productSearchQuery]);

  // Dropdown dışına tıklandığında kapanması için
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (productDropdownRef.current && !productDropdownRef.current.contains(event.target as Node)) {
        setIsProductDropdownOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // İlk yükleme ve yenileme durumlarında captcha'yı oluştur
  useEffect(() => {
    function drawCaptcha() {
      const canvas = canvasRef.current;
      if (!canvas) return;
      
      const ctx = canvas.getContext('2d');
      if (!ctx) return;

      requestAnimationFrame(() => {
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
        for (let i = 0; i < captchaCode.length; i++) {
          const x = (canvas.width / captchaCode.length) * (i + 0.5);
          const y = canvas.height / 2;
          ctx.save();
          ctx.translate(x, y);
          ctx.rotate((Math.random() - 0.5) * 0.4);
          ctx.fillText(captchaCode[i], 0, 0);
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
      });
    }

    drawCaptcha();
  }, [captchaCode, activeTab]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Captcha kontrolü
    if (formData.captcha.toLowerCase() !== captchaCode.toLowerCase()) {
      toast.error('Güvenlik kodu hatalı. Lütfen tekrar deneyin.');
      setCaptchaCode(() => {
        const chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
        let code = '';
        for (let i = 0; i < 6; i++) {
          code += chars.charAt(Math.floor(Math.random() * chars.length));
        }
        return code;
      });
      return;
    }

    setIsLoading(true);

    try {
      // Form verilerini hazırla
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (result.success) {
        toast.success('Mesajınız başarıyla gönderildi.');
        // Formu temizle
        setFormData({
          name: '',
          email: '',
          phone: '',
          company: '',
          subject: '',
          message: '',
          captcha: '',
          product: ''
        });
        setCaptchaCode(() => {
          const chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
          let code = '';
          for (let i = 0; i < 6; i++) {
            code += chars.charAt(Math.floor(Math.random() * chars.length));
          }
          return code;
        });
      } else {
        throw new Error(result.message);
      }
    } catch (error) {
      toast.error('Mesaj gönderilirken bir hata oluştu. Lütfen tekrar deneyin.');
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
        {/* Diagonal Background */}
        <div className="absolute inset-0 bg-gradient-to-r from-primary-600 to-primary-900 transform -skew-y-6 origin-top-left scale-110"></div>
        
        {/* Content */}
        <div className="container mx-auto px-4 relative">
          <div className="max-w-7xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-8 items-center min-h-[200px]">
              {/* Left Side - Text */}
              <div className="relative z-10 py-12">
                <h1 className="text-6xl font-bold text-white mb-4">
                  İletişim
                </h1>
                <div className="h-1 w-20 bg-white mb-4"></div>
                <p className="text-lg text-white/90">
                  Sorularınız ve talepleriniz için bizimle iletişime geçebilirsiniz
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

      {/* Forms Section */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="max-w-7xl mx-auto">
            {/* Tabs */}
            <div className="flex flex-wrap justify-center gap-2 mb-12">
              <button
                onClick={() => setActiveTab('contact')}
                className={`px-6 py-3 rounded-lg font-medium transition-all ${
                  activeTab === 'contact'
                    ? 'bg-primary text-white shadow-lg shadow-primary/30'
                    : 'bg-white text-text hover:bg-primary/5'
                }`}
              >
                İletişim Formu
              </button>
              <button
                onClick={() => setActiveTab('service')}
                className={`px-6 py-3 rounded-lg font-medium transition-all ${
                  activeTab === 'service'
                    ? 'bg-primary text-white shadow-lg shadow-primary/30'
                    : 'bg-white text-text hover:bg-primary/5'
                }`}
              >
                Servis Talebi
              </button>
              <button
                onClick={() => setActiveTab('reference')}
                className={`px-6 py-3 rounded-lg font-medium transition-all ${
                  activeTab === 'reference'
                    ? 'bg-primary text-white shadow-lg shadow-primary/30'
                    : 'bg-white text-text hover:bg-primary/5'
                }`}
              >
                Referans Talebi
              </button>
              <button
                onClick={() => setActiveTab('product')}
                className={`px-6 py-3 rounded-lg font-medium transition-all ${
                  activeTab === 'product'
                    ? 'bg-primary text-white shadow-lg shadow-primary/30'
                    : 'bg-white text-text hover:bg-primary/5'
                }`}
              >
                Ürün Talep Formu
              </button>
            </div>

            {/* Form Content */}
            {activeTab === 'contact' && (
              <div className="bg-white rounded-2xl shadow-sm p-8">
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-text mb-1">
                        Ad, Soyad
                      </label>
                      <input
                        type="text"
                        id="name"
                        value={formData.name}
                        onChange={(e) => setFormData({...formData, name: e.target.value})}
                        className="w-full h-[42px] px-4 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors"
                        required
                        disabled={isLoading}
                      />
                    </div>

                    <div>
                      <label htmlFor="surname" className="block text-sm font-medium text-text mb-1">
                        E-posta
                      </label>
                      <input
                        type="email"
                        id="email"
                        value={formData.email}
                        onChange={(e) => setFormData({...formData, email: e.target.value})}
                        className="w-full h-[42px] px-4 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors"
                        required
                        disabled={isLoading}
                      />
                    </div>

                    <div>
                      <label htmlFor="phone" className="block text-sm font-medium text-text mb-1">
                        Telefon
                      </label>
                      <input
                        type="tel"
                        id="phone"
                        value={formData.phone}
                        onChange={(e) => setFormData({...formData, phone: e.target.value})}
                        className="w-full h-[42px] px-4 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors"
                        required
                        disabled={isLoading}
                      />
                    </div>

                    <div>
                      <label htmlFor="company" className="block text-sm font-medium text-text mb-1">
                        Firma Adı
                      </label>
                      <input
                        type="text"
                        id="company"
                        value={formData.company}
                        onChange={(e) => setFormData({...formData, company: e.target.value})}
                        className="w-full h-[42px] px-4 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors"
                        required
                        disabled={isLoading}
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="subject" className="block text-sm font-medium text-text mb-1">
                      Konu
                    </label>
                    <input
                      type="text"
                      id="subject"
                      value={formData.subject}
                      onChange={(e) => setFormData({...formData, subject: e.target.value})}
                      className="w-full h-[42px] px-4 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors"
                      required
                      disabled={isLoading}
                    />
                  </div>

                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-text mb-1">
                      Mesajınız
                    </label>
                    <textarea
                      id="message"
                      value={formData.message}
                      onChange={(e) => setFormData({...formData, message: e.target.value})}
                      className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors"
                      rows={4}
                      required
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
                          onClick={() => setCaptchaCode(generateCaptchaCode())}
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
                    className={`w-full bg-primary hover:bg-primary-600 text-white font-medium h-[42px] rounded-lg transition-colors relative ${
                      isLoading ? 'opacity-70 cursor-not-allowed' : ''
                    }`}
                  >
                    {isLoading ? (
                      <>
                        <span className="opacity-0">Gönder</span>
                        <div className="absolute inset-0 flex items-center justify-center">
                          <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                          </svg>
                        </div>
                      </>
                    ) : (
                      'Gönder'
                    )}
                  </button>
                </form>
              </div>
            )}

            {activeTab === 'service' && (
              <div className="bg-white rounded-2xl shadow-sm p-8">
                <div className="mb-6">
                  <h3 className="text-xl font-semibold text-text mb-2">Servis Talebi</h3>
                  <p className="text-text-light">Teknik servis talebiniz için lütfen aşağıdaki formu doldurunuz.</p>
                </div>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-text mb-1">
                        Ad, Soyad
                      </label>
                      <input
                        type="text"
                        id="name"
                        value={formData.name}
                        onChange={(e) => setFormData({...formData, name: e.target.value})}
                        className="w-full h-[42px] px-4 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors"
                        required
                        disabled={isLoading}
                      />
                    </div>

                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-text mb-1">
                        E-posta
                      </label>
                      <input
                        type="email"
                        id="email"
                        value={formData.email}
                        onChange={(e) => setFormData({...formData, email: e.target.value})}
                        className="w-full h-[42px] px-4 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors"
                        required
                        disabled={isLoading}
                      />
                    </div>

                    <div>
                      <label htmlFor="phone" className="block text-sm font-medium text-text mb-1">
                        Telefon
                      </label>
                      <input
                        type="tel"
                        id="phone"
                        value={formData.phone}
                        onChange={(e) => setFormData({...formData, phone: e.target.value})}
                        className="w-full h-[42px] px-4 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors"
                        required
                        disabled={isLoading}
                      />
                    </div>

                    <div>
                      <label htmlFor="company" className="block text-sm font-medium text-text mb-1">
                        Firma Adı
                      </label>
                      <input
                        type="text"
                        id="company"
                        value={formData.company}
                        onChange={(e) => setFormData({...formData, company: e.target.value})}
                        className="w-full h-[42px] px-4 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors"
                        required
                        disabled={isLoading}
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="product" className="block text-sm font-medium text-text mb-1">
                      Ürün
                    </label>
                    <div className="relative" ref={productDropdownRef}>
                      <div
                        className="w-full h-[42px] px-4 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors flex items-center cursor-pointer"
                        onClick={() => setIsProductDropdownOpen(!isProductDropdownOpen)}
                      >
                        <span className={formData.product ? 'text-text' : 'text-gray-400'}>
                          {formData.product ? products.find(p => p.id === formData.product)?.name : 'Ürün Seçin'}
                        </span>
                        <svg className="w-5 h-5 ml-auto text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                      </div>

                      {isProductDropdownOpen && (
                        <div className="absolute z-10 w-full mt-1 bg-white rounded-lg shadow-lg border border-gray-200 max-h-[300px] overflow-auto">
                          <div className="p-2 border-b sticky top-0 bg-white">
                            <input
                              type="text"
                              placeholder="Ürün ara..."
                              value={productSearchQuery}
                              onChange={(e) => setProductSearchQuery(e.target.value)}
                              className="w-full px-3 py-2 rounded-md border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                              onClick={(e) => e.stopPropagation()}
                            />
                          </div>
                          <div className="py-1">
                            {filteredProducts.length === 0 ? (
                              <div className="px-4 py-2 text-sm text-gray-500">
                                Sonuç bulunamadı
                              </div>
                            ) : (
                              filteredProducts.map((product) => (
                                <div
                                  key={product.id}
                                  className={`px-4 py-2 text-sm cursor-pointer hover:bg-gray-100 ${
                                    formData.product === product.id ? 'bg-primary/5 text-primary' : 'text-text'
                                  }`}
                                  onClick={() => {
                                    setFormData({ ...formData, product: product.id });
                                    setIsProductDropdownOpen(false);
                                    setProductSearchQuery('');
                                  }}
                                >
                                  {product.name}
                                </div>
                              ))
                            )}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>

                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-text mb-1">
                      Mesajınız
                    </label>
                    <textarea
                      id="message"
                      value={formData.message}
                      onChange={(e) => setFormData({...formData, message: e.target.value})}
                      className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors"
                      rows={4}
                      required
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
                          onClick={() => setCaptchaCode(generateCaptchaCode())}
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
                    className={`w-full bg-primary hover:bg-primary-600 text-white font-medium h-[42px] rounded-lg transition-colors relative ${
                      isLoading ? 'opacity-70 cursor-not-allowed' : ''
                    }`}
                  >
                    {isLoading ? (
                      <>
                        <span className="opacity-0">Gönder</span>
                        <div className="absolute inset-0 flex items-center justify-center">
                          <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                          </svg>
                        </div>
                      </>
                    ) : (
                      'Gönder'
                    )}
                  </button>
                </form>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* İletişim Bilgileri Section */}
      <section className="py-24 relative z-10 bg-background-off">
        <div className="container mx-auto px-4">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold text-text mb-4">İletişim Bilgileri</h2>
              <p className="text-text-light max-w-2xl mx-auto">
                Size en yakın lokasyonumuz ile iletişime geçebilirsiniz
              </p>
            </div>

            {/* Location Tabs */}
            <div className="flex flex-wrap justify-center gap-2 mb-12">
              <button
                onClick={() => setActiveLocationTab('merkez')}
                className={`px-6 py-3 rounded-lg font-medium transition-all ${
                  activeLocationTab === 'merkez'
                    ? 'bg-primary text-white shadow-lg shadow-primary/30'
                    : 'bg-white text-text hover:bg-primary/5'
                }`}
              >
                Merkez Lokasyonlar
              </button>
              <button
                onClick={() => setActiveLocationTab('subeler')}
                className={`px-6 py-3 rounded-lg font-medium transition-all ${
                  activeLocationTab === 'subeler'
                    ? 'bg-primary text-white shadow-lg shadow-primary/30'
                    : 'bg-white text-text hover:bg-primary/5'
                }`}
              >
                Şubeler
              </button>
              <button
                onClick={() => setActiveLocationTab('temsilcilikler')}
                className={`px-6 py-3 rounded-lg font-medium transition-all ${
                  activeLocationTab === 'temsilcilikler'
                    ? 'bg-primary text-white shadow-lg shadow-primary/30'
                    : 'bg-white text-text hover:bg-primary/5'
                }`}
              >
                Bölge Temsilcilikleri
              </button>
            </div>

            {/* Merkez Lokasyonlar */}
            {activeLocationTab === 'merkez' && (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {/* Merkez */}
                <div className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all p-6 group hover:-translate-y-1 duration-300">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                      <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                      </svg>
                    </div>
                    <h3 className="font-semibold text-lg text-text">Merkez</h3>
                  </div>
                  <div className="space-y-3">
                    <p className="text-text-light text-sm leading-relaxed">
                      İkitelli OSB Demirciler Küçük San. Sit. B1 Blok No: 34 K2 Başakşehir - İstanbul
                    </p>
                    <div className="pt-2 space-y-2">
                      <a href="tel:02125673887" className="flex items-center gap-2 text-primary hover:text-primary-600 transition-colors">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                        </svg>
                        <span className="text-sm">0212 567 38 87</span>
                      </a>
                      <div className="flex items-center gap-2 text-text-light">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                        </svg>
                        <a href="mailto:info@guvenalmakina.com.tr" className="text-sm text-primary hover:text-primary-600 transition-colors">
                          info@guvenalmakina.com.tr
                        </a>
                      </div>
                      <div className="flex items-center gap-2 text-text-light">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                        </svg>
                        <span className="text-sm">Faks: 0212 567 42 59</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Mağaza */}
                <div className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all p-6 group hover:-translate-y-1 duration-300">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                      <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                      </svg>
                    </div>
                    <h3 className="font-semibold text-lg text-text">Mağaza</h3>
                  </div>
                  <div className="space-y-3">
                    <p className="text-text-light text-sm leading-relaxed">
                      İsmet Paşa Mah. Abdi İpekçi Cad. No: 113/2 Bayrampaşa - İstanbul
                    </p>
                    <div className="pt-2 space-y-2">
                      <a href="tel:02125673887" className="flex items-center gap-2 text-primary hover:text-primary-600 transition-colors">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                        </svg>
                        <span className="text-sm">0212 567 38 87</span>
                      </a>
                      <div className="flex items-center gap-2 text-text-light">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                        </svg>
                        <a href="mailto:info@guvenalmakina.com.tr" className="text-sm text-primary hover:text-primary-600 transition-colors">
                          info@guvenalmakina.com.tr
                        </a>
                      </div>
                      <div className="flex items-center gap-2 text-text-light">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                        </svg>
                        <span className="text-sm">Faks: 0212 567 42 59</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Topçular */}
                <div className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all p-6 group hover:-translate-y-1 duration-300">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                      <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                      </svg>
                    </div>
                    <h3 className="font-semibold text-lg text-text">Topçular</h3>
                  </div>
                  <div className="space-y-3">
                    <p className="text-text-light text-sm leading-relaxed">
                      Rami Kışla Cd. Emintaş 3 San. Sit. No:56-57-58 Topçular - Eyüp - İstanbul
                    </p>
                    <div className="pt-2 space-y-2">
                      <a href="tel:02125015381" className="flex items-center gap-2 text-primary hover:text-primary-600 transition-colors">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                        </svg>
                        <span className="text-sm">0212 501 53 81</span>
                      </a>
                      <div className="flex items-center gap-2 text-text-light">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                        </svg>
                        <a href="mailto:guvenal@guvenal.net" className="text-sm text-primary hover:text-primary-600 transition-colors">
                          guvenal@guvenal.net
                        </a>
                      </div>
                      <div className="flex items-center gap-2 text-text-light">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                        </svg>
                        <span className="text-sm">Faks: 0212 577 37 43</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Şubeler */}
            {activeLocationTab === 'subeler' && (
              <div className="grid md:grid-cols-2 gap-6">
                {/* Esenyurt Şube */}
                <div className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all p-6 group hover:-translate-y-1 duration-300">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                      <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                      </svg>
                    </div>
                    <h3 className="font-semibold text-lg text-text">Esenyurt Şube</h3>
                  </div>
                  <div className="space-y-3">
                    <p className="text-text-light text-sm leading-relaxed">
                      Çakmaklı Mh. Akçaburgaz Mevkii ALKOP Sanayi Sitesi A11 Blok No: 17 Kıraç - Hadımköy
                    </p>
                    <div className="pt-2 space-y-2">
                      <a href="tel:02128580081" className="flex items-center gap-2 text-primary hover:text-primary-600 transition-colors">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                        </svg>
                        <span className="text-sm">0212 858 00 81</span>
                      </a>
                      <div className="flex items-center gap-2 text-text-light">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                        </svg>
                        <a href="mailto:info@guvenalmakina.com.tr" className="text-sm text-primary hover:text-primary-600 transition-colors">
                          info@guvenalmakina.com.tr
                        </a>
                      </div>
                      <div className="flex items-center gap-2 text-text-light">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                        </svg>
                        <span className="text-sm">Faks: 0212 858 05 02</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Bursa Ofis */}
                <div className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all p-6 group hover:-translate-y-1 duration-300">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                      <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                      </svg>
                    </div>
                    <h3 className="font-semibold text-lg text-text">Bursa Ofis</h3>
                  </div>
                  <div className="space-y-3">
                    <p className="text-text-light text-sm leading-relaxed">
                      Beşevler Mah. Aktaş Sk. Güleçler İş Merkezi No: 3 Kat: 4 D: 17 Nilüfer / Bursa
                    </p>
                    <div className="pt-2 space-y-2">
                      <div className="flex items-center gap-2 text-text-light mb-2">
                        <svg className="w-4 h-4 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                        </svg>
                        <span className="text-sm">Temsilci: Murat YALÇINAR</span>
                      </div>
                      <a href="tel:02244419838" className="flex items-center gap-2 text-primary hover:text-primary-600 transition-colors">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                        </svg>
                        <span className="text-sm">0224 441 98 38</span>
                      </a>
                      <div className="flex items-center gap-2 text-text-light">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                        </svg>
                        <a href="mailto:bursa1@guvenal.net" className="text-sm text-primary hover:text-primary-600 transition-colors">
                          bursa1@guvenal.net
                        </a>
                      </div>
                      <div className="flex items-center gap-2 text-text-light">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                        </svg>
                        <span className="text-sm">Faks: 0224 441 98 39</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Bölge Temsilcilikleri placeholder */}
            {activeLocationTab === 'temsilcilikler' && (
              <div className="grid md:grid-cols-3 gap-6">
                {/* Ankara Bölge */}
                <div className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all p-6 group hover:-translate-y-1 duration-300">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                      <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                    </div>
                    <h3 className="font-semibold text-lg text-text">Ankara Bölge</h3>
                  </div>
                  <div className="space-y-3">
                    <div className="flex items-center gap-2 text-text-light mb-2">
                      <svg className="w-4 h-4 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                      </svg>
                      <span className="text-sm">Temsilci: Ahmet YILMAZ</span>
                    </div>
                    <div className="pt-2 space-y-2">
                      <a href="tel:05321234567" className="flex items-center gap-2 text-primary hover:text-primary-600 transition-colors">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                        </svg>
                        <span className="text-sm">0532 123 45 67</span>
                      </a>
                      <div className="flex items-center gap-2 text-text-light">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                        </svg>
                        <a href="mailto:ankara@guvenal.net" className="text-sm text-primary hover:text-primary-600 transition-colors">
                          ankara@guvenal.net
                        </a>
                      </div>
                    </div>
                  </div>

                </div>

                {/* Ege Bölge */}
                <div className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all p-6 group hover:-translate-y-1 duration-300">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                      <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                    </div>
                    <h3 className="font-semibold text-lg text-text">Ege Bölge</h3>
                  </div>
                  <div className="space-y-3">
                    <div className="flex items-center gap-2 text-text-light mb-2">
                      <svg className="w-4 h-4 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                      </svg>
                      <span className="text-sm">Temsilci: Mehmet DEMİR</span>
                    </div>
                    <div className="pt-2 space-y-2">
                      <a href="tel:05331234567" className="flex items-center gap-2 text-primary hover:text-primary-600 transition-colors">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                        </svg>
                        <span className="text-sm">0533 123 45 67</span>
                      </a>
                      <div className="flex items-center gap-2 text-text-light">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                        </svg>
                        <a href="mailto:ege@guvenal.net" className="text-sm text-primary hover:text-primary-600 transition-colors">
                          ege@guvenal.net
                        </a>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Trakya Bölge */}
                <div className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all p-6 group hover:-translate-y-1 duration-300">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                      <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                    </div>
                    <h3 className="font-semibold text-lg text-text">Trakya Bölge</h3>
                  </div>
                  <div className="space-y-3">
                    <div className="flex items-center gap-2 text-text-light mb-2">
                      <svg className="w-4 h-4 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                      </svg>
                      <span className="text-sm">Temsilci: Ali KAYA</span>
                    </div>
                    <div className="pt-2 space-y-2">
                      <a href="tel:05341234567" className="flex items-center gap-2 text-primary hover:text-primary-600 transition-colors">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                        </svg>
                        <span className="text-sm">0534 123 45 67</span>
                      </a>
                      <div className="flex items-center gap-2 text-text-light">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                        </svg>
                        <a href="mailto:trakya@guvenal.net" className="text-sm text-primary hover:text-primary-600 transition-colors">
                          trakya@guvenal.net
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
} 