'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'react-hot-toast';
import { FaPlus, FaTrash } from 'react-icons/fa';
import { use } from 'react';
import Image from 'next/image';

interface Specification {
  id: string;
  name: string;
  value: string;
}

interface Campaign {
  type: 'discount';
  endDate: string;
}

const initializeCampaign = () => ({
  type: 'discount' as const,
  endDate: new Date().toISOString().split('T')[0]
});

export default function EditProductPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = use(params);
  const productId = resolvedParams.id;
  const router = useRouter();
  
  const [loading, setLoading] = useState(false);
  const [loadingProduct, setLoadingProduct] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    category: '',
    price: '',
    oldPrice: '',
    type: '',
    existingImages: [] as string[],
    newImages: [] as File[],
    specifications: [] as Specification[],
    standardAccessories: [] as string[],
    optionalAccessories: [] as string[],
    slug: '',
    campaign: null as Campaign | null
  });

  // Ürün tipini ayarla
  useEffect(() => {
    const searchParams = new URLSearchParams(window.location.search);
    const type = searchParams.get('type');
    if (type) {
      setFormData(prev => ({
        ...prev,
        type: type,
        category: type === 'campaign' ? 'campaign' : prev.category,
        campaign: type === 'campaign' ? initializeCampaign() : prev.campaign
      }));
    }
  }, []);

  // Ürün verilerini getir
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoadingProduct(true);
        setError(null);
        
        const response = await fetch(`/api/admin/products?id=${productId}`);
        const data = await response.json();
        
        if (!response.ok) {
          throw new Error(data.message || 'Ürün getirilirken bir hata oluştu');
        }
        
        if (!data.success || !data.product) {
          throw new Error('Ürün bulunamadı');
        }
        
        const product = data.product;
        
        // Specs'i specifications formatına dönüştür
        const specifications = product.specs ? product.specs.map((spec: { label: string; value: string }, index: number) => ({
          id: `spec-${index}`,
          name: spec.label || '',
          value: spec.value || ''
        })) : [];

        console.log('Gelen ürün verileri:', product);
        console.log('Dönüştürülen specifications:', specifications);
        
        setFormData(prev => ({
          ...prev,
          name: product.name || '',
          description: product.description || '',
          category: product.category || '',
          price: product.price?.toString() || '',
          oldPrice: product.oldPrice?.toString() || '',
          type: product.type || '',
          existingImages: product.images || [],
          newImages: [],
          specifications: specifications,
          standardAccessories: product.standardAccessories || [],
          optionalAccessories: product.optionalAccessories || [],
          slug: product.slug || '',
          campaign: product.campaign || null
        }));
      } catch (error) {
        console.error('Ürün getirme hatası:', error);
        setError(error instanceof Error ? error.message : 'Ürün getirilirken bir hata oluştu');
      } finally {
        setLoadingProduct(false);
      }
    };

    fetchProduct();
  }, [productId]);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const filesArray = Array.from(e.target.files);
      setFormData({
        ...formData,
        newImages: [...formData.newImages, ...filesArray],
      });
    }
  };

  const removeExistingImage = (index: number) => {
    const updatedImages = [...formData.existingImages];
    updatedImages.splice(index, 1);
    setFormData({
      ...formData,
      existingImages: updatedImages,
    });
  };

  const removeNewImage = (index: number) => {
    const updatedImages = [...formData.newImages];
    updatedImages.splice(index, 1);
    setFormData({
      ...formData,
      newImages: updatedImages,
    });
  };

  const addSpecification = () => {
    const newSpec = { 
      id: `spec-${formData.specifications.length}`, 
      name: '', 
      value: '' 
    };
    setFormData({
      ...formData,
      specifications: [...formData.specifications, newSpec],
    });
  };

  const removeSpecification = (id: string) => {
    setFormData({
      ...formData,
      specifications: formData.specifications.filter((spec) => spec.id !== id),
    });
  };

  const changeSpecification = (id: string, field: 'name' | 'value', value: string) => {
    setFormData(prev => ({
      ...prev,
      specifications: prev.specifications.map((spec) =>
        spec.id === id ? { ...spec, [field]: value || '' } : spec
      ),
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name || !formData.description) {
      toast.error('Lütfen tüm zorunlu alanları doldurun');
      return;
    }

    try {
      setLoading(true);
      setError(null);
      
      const formDataToSend = new FormData();
      formDataToSend.append('id', productId);
      formDataToSend.append('data', JSON.stringify({
        name: formData.name,
        description: formData.description,
        category: formData.category,
        price: formData.price,
        oldPrice: formData.oldPrice,
        type: formData.type,
        specs: formData.specifications.map(spec => ({
          label: spec.name,
          value: spec.value
        })),
        standardAccessories: formData.standardAccessories.filter(acc => acc.trim()),
        optionalAccessories: formData.optionalAccessories.filter(acc => acc.trim()),
        campaign: formData.campaign
      }));
      
      // Mevcut resimleri ekle
      formDataToSend.append('existingImages', JSON.stringify(formData.existingImages));
      
      // Yeni resimleri ekle
      formData.newImages.forEach((image, index) => {
        formDataToSend.append(`image${index}`, image);
      });

      const response = await fetch('/api/admin/products', {
        method: 'PUT',
        body: formDataToSend,
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Ürün güncellenirken bir hata oluştu');
      }

      toast.success('Ürün başarıyla güncellendi');
      router.push('/admin/panel/urunler');
    } catch (error) {
      console.error('Ürün güncelleme hatası:', error);
      toast.error(error instanceof Error ? error.message : 'Ürün güncellenirken bir hata oluştu');
      setError(error instanceof Error ? error.message : 'Ürün güncellenirken bir hata oluştu');
    } finally {
      setLoading(false);
    }
  };

  const handleStandardAccessoryAdd = () => {
    setFormData(prev => ({
      ...prev,
      standardAccessories: [...prev.standardAccessories, '']
    }));
  };

  const handleOptionalAccessoryAdd = () => {
    setFormData(prev => ({
      ...prev,
      optionalAccessories: [...prev.optionalAccessories, '']
    }));
  };

  const handleStandardAccessoryChange = (index: number, value: string) => {
    setFormData(prev => ({
      ...prev,
      standardAccessories: prev.standardAccessories.map((acc, i) => 
        i === index ? value : acc
      )
    }));
  };

  const handleOptionalAccessoryChange = (index: number, value: string) => {
    setFormData(prev => ({
      ...prev,
      optionalAccessories: prev.optionalAccessories.map((acc, i) => 
        i === index ? value : acc
      )
    }));
  };

  const handleStandardAccessoryRemove = (index: number) => {
    setFormData(prev => ({
      ...prev,
      standardAccessories: prev.standardAccessories.filter((_, i) => i !== index)
    }));
  };

  const handleOptionalAccessoryRemove = (index: number) => {
    setFormData(prev => ({
      ...prev,
      optionalAccessories: prev.optionalAccessories.filter((_, i) => i !== index)
    }));
  };

  // Kampanya state güncellemeleri
  const updateCampaign = (field: keyof Campaign, value: string) => {
    setFormData(prev => ({
      ...prev,
      campaign: {
        type: 'discount',
        endDate: field === 'endDate' ? value : prev.campaign?.endDate || '',
      }
    }));
  };

  if (loadingProduct) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
          <strong className="font-bold">Hata! </strong>
          <span className="block sm:inline">{error}</span>
        </div>
        <button 
          onClick={() => router.push('/admin/panel/urunler')}
          className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Ürünler Sayfasına Dön
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-2xl font-bold text-gray-900 mb-8">
          Ürün Düzenle
        </h1>

        {error && (
          <div className="mb-6 bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Temel Bilgiler */}
          <div className="bg-white rounded-xl shadow-sm p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Temel Bilgiler</h2>
            <div className="grid grid-cols-1 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Ürün Adı
                </label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Açıklama
                </label>
                <textarea
                  required
                  value={formData.description}
                  onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                  rows={4}
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Kategori
                </label>
                <select
                  value={formData.category}
                  onChange={(e) => setFormData(prev => ({ ...prev, category: e.target.value }))}
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary focus:border-transparent"
                >
                  <option value="">Kategori Seçin</option>
                  {formData.type === 'products' && (
                    <>
                      <option value="cnc-double">CNC Double Kolon Dik İşleme Merkezi</option>
                      <option value="dalma-erozyon">Dalma Erozyon Tezgahları</option>
                      <option value="kalipci-freze">Kalıpçı Freze Tezgahları</option>
                      <option value="universal-kalipci-freze">Üniversal Kalıpçı Freze Tezgahları</option>
                      <option value="koc-kafa-freze">Koç Kafa Universal Freze</option>
                      <option value="taslama">Taşlama Tezgahları</option>
                      <option value="universal-torna">Universal Torna Tezgahları</option>
                      <option value="masa-ustu-torna">Masa Üstü Torna Tezgahları</option>
                      <option value="radyal-matkap">Radyal Matkap Tezgahları</option>
                      <option value="sutunlu-matkap">Şanzımanlı & Kayışlı Sütunlu Matkaplar</option>
                      <option value="testere">Testere Tezgahları</option>
                      <option value="kilavuz">Kılavuz Çekme Tezgahları</option>
                    </>
                  )}
                  {formData.type === 'used' && (
                    <option value="all">Tüm İkinci El Ürünler</option>
                  )}
                  {formData.type === 'spare' && (
                    <option value="all">Tüm Yedek Parçalar</option>
                  )}
                  {formData.type === 'accessories' && (
                    <option value="all">Tüm Aksesuarlar</option>
                  )}
                  {formData.type === 'campaign' && (
                    <option value="all-campaigns">Tüm Kampanyalar</option>
                  )}
                </select>
              </div>

              {formData.type !== 'campaign' && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Fiyat (TL)
                  </label>
                  <input
                    type="number"
                    value={formData.price}
                    onChange={(e) => setFormData(prev => ({ ...prev, price: e.target.value }))}
                    className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary focus:border-transparent"
                  />
                </div>
              )}
            </div>
          </div>

          {/* Görseller */}
          <div className="bg-white rounded-xl shadow-sm p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Ürün Görselleri</h2>
            <div className="space-y-4">
              <input
                type="file"
                multiple
                accept="image/*"
                onChange={handleImageChange}
                className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-primary-50 file:text-primary hover:file:bg-primary-100"
              />
              
              {/* Mevcut Görseller */}
              {formData.existingImages.length > 0 && (
                <div>
                  <h3 className="text-sm font-medium text-gray-700 mb-2">Mevcut Görseller</h3>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    {formData.existingImages.map((image, index) => (
                      <div key={index} className="relative group">
                        <div className="aspect-square relative rounded-lg overflow-hidden bg-gray-100">
                          <Image
                            src={image}
                            alt={`Mevcut ürün görseli ${index + 1}`}
                            width={100}
                            height={100}
                            className="rounded-lg object-cover"
                          />
                        </div>
                        <button
                          type="button"
                          onClick={() => removeExistingImage(index)}
                          className="absolute top-2 right-2 p-1 bg-red-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                        >
                          <FaTrash className="w-4 h-4" />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Yeni Görseller */}
              {formData.newImages.length > 0 && (
                <div>
                  <h3 className="text-sm font-medium text-gray-700 mb-2">Yeni Görseller</h3>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    {formData.newImages.map((image, index) => (
                      <div key={index} className="relative group">
                        <div className="aspect-square relative rounded-lg overflow-hidden bg-gray-100">
                          <Image
                            src={URL.createObjectURL(image)}
                            alt={`Yeni yüklenen ürün görseli ${index + 1}`}
                            width={100}
                            height={100}
                            className="rounded-lg object-cover"
                          />
                        </div>
                        <button
                          type="button"
                          onClick={() => removeNewImage(index)}
                          className="absolute top-2 right-2 p-1 bg-red-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                        >
                          <FaTrash className="w-4 h-4" />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Özellikler */}
          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-gray-900">Teknik Özellikler</h2>
              <button
                type="button"
                onClick={addSpecification}
                className="inline-flex items-center px-3 py-1.5 border border-transparent text-sm font-medium rounded-full text-primary bg-primary-50 hover:bg-primary-100"
              >
                <FaPlus className="w-4 h-4 mr-1" />
                Özellik Ekle
              </button>
            </div>
            <div className="space-y-4">
              {formData.specifications.map((spec) => (
                <div key={spec.id} className="flex items-center space-x-2">
                  <div className="grid grid-cols-2 gap-4 flex-grow">
                    <input
                      type="text"
                      value={spec.name || ''}
                      onChange={(e) => changeSpecification(spec.id, 'name', e.target.value)}
                      placeholder="Özellik (örn: Boyut)"
                      className="px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary focus:border-transparent w-full"
                    />
                    <input
                      type="text"
                      value={spec.value || ''}
                      onChange={(e) => changeSpecification(spec.id, 'value', e.target.value)}
                      placeholder="Değer (örn: 10x15 cm)"
                      className="px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary focus:border-transparent w-full"
                    />
                  </div>
                  <button
                    type="button"
                    onClick={() => removeSpecification(spec.id)}
                    className="flex-shrink-0 text-red-500 hover:text-red-700"
                  >
                    <FaTrash className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Aksesuarlar */}
          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Standart Aksesuarlar */}
              <div>
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-lg font-semibold text-gray-900">Standart Aksesuarlar</h2>
                  <button
                    type="button"
                    onClick={handleStandardAccessoryAdd}
                    className="inline-flex items-center px-3 py-1.5 border border-transparent text-sm font-medium rounded-full text-primary bg-primary-50 hover:bg-primary-100"
                  >
                    <FaPlus className="w-4 h-4 mr-1" />
                    Ekle
                  </button>
                </div>
                <div className="space-y-4">
                  {formData.standardAccessories.map((accessory, index) => (
                    <div key={index} className="flex items-center space-x-2">
                      <input
                        type="text"
                        value={accessory || ''}
                        onChange={(e) => handleStandardAccessoryChange(index, e.target.value)}
                        placeholder="Aksesuar adı"
                        className="flex-grow px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary focus:border-transparent"
                      />
                      <button
                        type="button"
                        onClick={() => handleStandardAccessoryRemove(index)}
                        className="flex-shrink-0 text-red-500 hover:text-red-700"
                      >
                        <FaTrash className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              {/* Opsiyonel Aksesuarlar */}
              <div>
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-lg font-semibold text-gray-900">Opsiyonel Aksesuarlar</h2>
                  <button
                    type="button"
                    onClick={handleOptionalAccessoryAdd}
                    className="inline-flex items-center px-3 py-1.5 border border-transparent text-sm font-medium rounded-full text-primary bg-primary-50 hover:bg-primary-100"
                  >
                    <FaPlus className="w-4 h-4 mr-1" />
                    Ekle
                  </button>
                </div>
                <div className="space-y-4">
                  {formData.optionalAccessories.map((accessory, index) => (
                    <div key={index} className="flex items-center space-x-2">
                      <input
                        type="text"
                        value={accessory || ''}
                        onChange={(e) => handleOptionalAccessoryChange(index, e.target.value)}
                        placeholder="Aksesuar adı"
                        className="flex-grow px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary focus:border-transparent"
                      />
                      <button
                        type="button"
                        onClick={() => handleOptionalAccessoryRemove(index)}
                        className="flex-shrink-0 text-red-500 hover:text-red-700"
                      >
                        <FaTrash className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Kampanya Bilgileri */}
          {formData.type === 'campaign' && (
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Kampanya Bilgileri</h2>
              <div className="grid grid-cols-1 gap-6">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Eski Fiyat (TL)
                    </label>
                    <input
                      type="number"
                      value={formData.oldPrice}
                      onChange={(e) => setFormData(prev => ({ ...prev, oldPrice: e.target.value }))}
                      className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary focus:border-transparent"
                      placeholder="Eski fiyat"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Yeni Fiyat (TL)
                    </label>
                    <input
                      type="number"
                      value={formData.price}
                      onChange={(e) => setFormData(prev => ({ ...prev, price: e.target.value }))}
                      className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary focus:border-transparent"
                      placeholder="Yeni fiyat"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Kampanya Bitiş Tarihi
                  </label>
                  <input
                    type="date"
                    value={formData.campaign?.endDate || ''}
                    onChange={(e) => updateCampaign('endDate', e.target.value)}
                    className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary focus:border-transparent"
                  />
                </div>
              </div>
            </div>
          )}

          {/* Kaydet Butonu */}
          <div className="flex justify-end">
            <button
              type="submit"
              disabled={loading}
              className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-primary hover:bg-primary-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? (
                <>
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Güncelleniyor...
                </>
              ) : (
                'Değişiklikleri Kaydet'
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
} 