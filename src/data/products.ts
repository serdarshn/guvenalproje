export interface Series {
  name: string;
  slug: string;
}

export interface Subcategory {
  name: string;
  slug: string;
  series: Series[];
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  subcategories: Subcategory[];
}

export interface Product {
  id: string;
  name: string;
  slug: string;
  category: {
    id: string;
    name: string;
    slug: string;
    subcategory?: {
      name: string;
      slug: string;
      series?: Series[];
    };
  };
  description: string;
  images: string[];
  specifications: {
    label: string;
    value: string;
  }[];
  standardAccessories: string[];
  optionalAccessories: string[];
  documents?: {
    name: string;
    type: string;
    size: string;
    url: string;
  }[];
}

export interface ProductOption {
  id: string;
  name: string;
  category: {
    id: string;
    name: string;
    slug: string;
  };
}

// Örnek ürün verisi
export const products: Product[] = [
  {
    id: "king-sz-a8-v",
    name: "KİNG SZ A8 V",
    slug: "king-sz-a8-v",
    category: {
      id: "kalipci-freze",
      name: "Kalıpçı Freze Tezgahları",
      slug: "kalipci-freze",
      subcategory: {
        name: "KİNG",
        slug: "king"
      }
    },
    description: "KİNG SZ A8 V Kalıpçı Freze Tezgahı, yüksek hassasiyet ve performans sunan endüstriyel çözüm.",
    images: [
      'https://images.pexels.com/photos/5726837/pexels-photo-5726837.jpeg',
      'https://images.pexels.com/photos/5726833/pexels-photo-5726833.jpeg'
    ],
    specifications: [
      { label: 'Model', value: 'KİNG SZ A8 V' },
      { label: 'Tabla Boyutu', value: '800 x 400 mm' }
    ],
    standardAccessories: [
      'Soğutma Sistemi',
      'Otomatik Yağlama',
      'LED Aydınlatma'
    ],
    optionalAccessories: [
      'Dijital Pozisyon Göstergesi',
      'Talaş Konveyörü'
    ]
  },
  {
    id: "king-sz-a8vs",
    name: "KİNG SZ A8VS",
    slug: "king-sz-a8vs",
    category: {
      id: "kalipci-freze",
      name: "Kalıpçı Freze Tezgahları",
      slug: "kalipci-freze",
      subcategory: {
        name: "KİNG",
        slug: "king"
      }
    },
    description: "KİNG SZ A8VS Kalıpçı Freze Tezgahı, hassas işleme gerektiren uygulamalar için ideal çözüm.",
    images: [
      'https://images.pexels.com/photos/5726837/pexels-photo-5726837.jpeg',
      'https://images.pexels.com/photos/5726833/pexels-photo-5726833.jpeg'
    ],
    specifications: [
      { label: 'Model', value: 'KİNG SZ A8VS' },
      { label: 'Tabla Boyutu', value: '800 x 400 mm' }
    ],
    standardAccessories: [
      'Soğutma Sistemi',
      'Otomatik Yağlama',
      'LED Aydınlatma'
    ],
    optionalAccessories: [
      'Dijital Pozisyon Göstergesi',
      'Talaş Konveyörü'
    ]
  },
  {
    id: "king-sz-1820-v",
    name: "KİNG SZ 1820 V",
    slug: "king-sz-1820-v",
    category: {
      id: "kalipci-freze",
      name: "Kalıpçı Freze Tezgahları",
      slug: "kalipci-freze",
      subcategory: {
        name: "KİNG",
        slug: "king"
      }
    },
    description: "KİNG SZ 1820 V Kalıpçı Freze Tezgahı, geniş tabla yüzeyi ve yüksek hassasiyet sunar.",
    images: [
      'https://images.pexels.com/photos/5726837/pexels-photo-5726837.jpeg',
      'https://images.pexels.com/photos/5726833/pexels-photo-5726833.jpeg'
    ],
    specifications: [
      { label: 'Model', value: 'KİNG SZ 1820 V' },
      { label: 'Tabla Boyutu', value: '1800 x 450 mm' }
    ],
    standardAccessories: [
      'Soğutma Sistemi',
      'Otomatik Yağlama',
      'LED Aydınlatma'
    ],
    optionalAccessories: [
      'Dijital Pozisyon Göstergesi',
      'Talaş Konveyörü'
    ]
  },
  {
    id: "king-sz-1820-vs",
    name: "KİNG SZ 1820 VS",
    slug: "king-sz-1820-vs",
    category: {
      id: "kalipci-freze",
      name: "Kalıpçı Freze Tezgahları",
      slug: "kalipci-freze",
      subcategory: {
        name: "KİNG",
        slug: "king"
      }
    },
    description: "KİNG SZ 1820 VS Kalıpçı Freze Tezgahı, endüstriyel ölçekte üretim için tasarlanmış yüksek performanslı model.",
    images: [
      'https://images.pexels.com/photos/5726837/pexels-photo-5726837.jpeg',
      'https://images.pexels.com/photos/5726833/pexels-photo-5726833.jpeg'
    ],
    specifications: [
      { label: 'Model', value: 'KİNG SZ 1820 VS' },
      { label: 'Tabla Boyutu', value: '1800 x 450 mm' }
    ],
    standardAccessories: [
      'Soğutma Sistemi',
      'Otomatik Yağlama',
      'LED Aydınlatma'
    ],
    optionalAccessories: [
      'Dijital Pozisyon Göstergesi',
      'Talaş Konveyörü'
    ]
  },
  {
    id: "k2000h2",
    name: "K 2000 H2",
    slug: "k-2000-h2",
    category: {
      id: "dalma-erozyon",
      name: "Dalma Erozyon Tezgahları",
      slug: "dalma-erozyon",
      subcategory: {
        name: "BEST EDM",
        slug: "best-edm",
        series: [{ name: "ZNC Serisi", slug: "znc-serisi" }]
      }
    },
    description: "Yüksek hassasiyet ve performans sunan K 2000 H2 dalma erozyon tezgahı, geniş iş parçası kapasitesi ve kullanıcı dostu özellikleriyle endüstriyel üretim ihtiyaçlarınız için ideal çözüm sunar.",
    images: [
      'https://images.pexels.com/photos/2876439/pexels-photo-2876439.jpeg',
      'https://images.pexels.com/photos/3846226/pexels-photo-3846226.jpeg',
      'https://images.pexels.com/photos/5726837/pexels-photo-5726837.jpeg',
      'https://images.pexels.com/photos/5726833/pexels-photo-5726833.jpeg'
    ],
    specifications: [
      { label: 'Model', value: 'K 2000 H2' },
      { label: 'X Eksen Hareketi', value: '2000 mm' },
      { label: 'Y Eksen Hareketi', value: '1000 mm' },
      { label: 'Z Eksen Hareketi', value: '550 mm' },
      { label: 'Tablo Boyutu', value: '200x1000 mm' },
      { label: 'Maksimum Elektrot Ağırlığı', value: '400 kg' }
    ],
    standardAccessories: [
      'Yangın Tüpü',
      'Filtre Takımı',
      'Halojen Lamba'
    ],
    optionalAccessories: [
      'System 3R Hızlı Bağlama Seti'
    ]
  },
  {
    id: "pnc-500",
    name: "PNC 500",
    slug: "pnc-500",
    category: {
      id: "dalma-erozyon",
      name: "Dalma Erozyon Tezgahları",
      slug: "dalma-erozyon",
      subcategory: {
        name: "BEST EDM",
        slug: "best-edm",
        series: [{ name: "PNC Serisi", slug: "pnc-serisi" }]
      }
    },
    description: "PNC 500 Dalma Erozyon Tezgahı, hassas işleme gerektiren uygulamalar için geliştirilmiş kompakt ve verimli bir çözümdür.",
    images: [
      'https://images.pexels.com/photos/3846226/pexels-photo-3846226.jpeg',
      'https://images.pexels.com/photos/2876439/pexels-photo-2876439.jpeg',
      'https://images.pexels.com/photos/5726837/pexels-photo-5726837.jpeg',
      'https://images.pexels.com/photos/5726833/pexels-photo-5726833.jpeg'
    ],
    specifications: [
      { label: 'Model', value: 'PNC 500' },
      { label: 'X Eksen Hareketi', value: '500 mm' },
      { label: 'Y Eksen Hareketi', value: '300 mm' },
      { label: 'Z Eksen Hareketi', value: '300 mm' },
      { label: 'Tablo Boyutu', value: '650x350 mm' },
      { label: 'Maksimum Elektrot Ağırlığı', value: '100 kg' }
    ],
    standardAccessories: [
      'Yangın Tüpü',
      'Filtre Takımı',
      'LED Aydınlatma'
    ],
    optionalAccessories: [
      'Otomatik Elektrot Değiştirici'
    ]
  },
  {
    id: "3000-znc",
    name: "3000 ZNC",
    slug: "3000-znc",
    category: {
      id: "dalma-erozyon",
      name: "Dalma Erozyon Tezgahları",
      slug: "dalma-erozyon",
      subcategory: {
        name: "BEST EDM",
        slug: "best-edm",
        series: [{ 
          name: "ZNC Serisi",
          slug: "znc-serisi"
        }]
      }
    },
    description: "3000 ZNC Dalma Erozyon Tezgahı, yüksek hassasiyet ve performans sunan endüstriyel çözüm.",
    images: [
      'https://images.pexels.com/photos/2876439/pexels-photo-2876439.jpeg',
      'https://images.pexels.com/photos/3846226/pexels-photo-3846226.jpeg'
    ],
    specifications: [
      { label: 'Model', value: '3000 ZNC' },
      { label: 'Tabla Boyutu', value: '800 x 500 mm' }
    ],
    standardAccessories: [
      'Yangın Tüpü',
      'Filtre Takımı',
      'LED Aydınlatma'
    ],
    optionalAccessories: [
      'Otomatik Elektrot Değiştirici'
    ]
  },
  {
    id: "680-znc",
    name: "680 ZNC",
    slug: "680-znc",
    category: {
      id: "dalma-erozyon",
      name: "Dalma Erozyon Tezgahları",
      slug: "dalma-erozyon",
      subcategory: {
        name: "BEST EDM",
        slug: "best-edm",
        series: [{
          name: "ZNC Serisi",
          slug: "znc-serisi"
        }]
      }
    },
    description: "680 ZNC Dalma Erozyon Tezgahı, kompakt boyutları ve yüksek performansıyla öne çıkar.",
    images: [
      'https://images.pexels.com/photos/3846226/pexels-photo-3846226.jpeg',
      'https://images.pexels.com/photos/2876439/pexels-photo-2876439.jpeg'
    ],
    specifications: [
      { label: 'Model', value: '680 ZNC' },
      { label: 'Tabla Boyutu', value: '600 x 400 mm' }
    ],
    standardAccessories: [
      'Yangın Tüpü',
      'Filtre Takımı',
      'LED Aydınlatma'
    ],
    optionalAccessories: [
      'Otomatik Elektrot Değiştirici'
    ]
  },
  {
    id: "560-znc",
    name: "560 ZNC",
    slug: "560-znc",
    category: {
      id: "dalma-erozyon",
      name: "Dalma Erozyon Tezgahları",
      slug: "dalma-erozyon",
      subcategory: {
        name: "BEST EDM",
        slug: "best-edm",
        series: [{
          name: "ZNC Serisi",
          slug: "znc-serisi"
        }]
      }
    },
    description: "560 ZNC Dalma Erozyon Tezgahı, hassas işlemler için ideal çözüm sunar.",
    images: [
      'https://images.pexels.com/photos/3846226/pexels-photo-3846226.jpeg',
      'https://images.pexels.com/photos/2876439/pexels-photo-2876439.jpeg'
    ],
    specifications: [
      { label: 'Model', value: '560 ZNC' },
      { label: 'Tabla Boyutu', value: '500 x 300 mm' }
    ],
    standardAccessories: [
      'Yangın Tüpü',
      'Filtre Takımı',
      'LED Aydınlatma'
    ],
    optionalAccessories: [
      'Otomatik Elektrot Değiştirici'
    ]
  },
  {
    id: "570-znc",
    name: "570 ZNC",
    slug: "570-znc",
    category: {
      id: "dalma-erozyon",
      name: "Dalma Erozyon Tezgahları",
      slug: "dalma-erozyon",
      subcategory: {
        name: "BEST EDM",
        slug: "best-edm",
        series: [{
          name: "ZNC Serisi",
          slug: "znc-serisi"
        }]
      }
    },
    description: "570 ZNC Dalma Erozyon Tezgahı, orta ölçekli işlemler için optimize edilmiş performans.",
    images: [
      'https://images.pexels.com/photos/3846226/pexels-photo-3846226.jpeg',
      'https://images.pexels.com/photos/2876439/pexels-photo-2876439.jpeg'
    ],
    specifications: [
      { label: 'Model', value: '570 ZNC' },
      { label: 'Tabla Boyutu', value: '550 x 350 mm' }
    ],
    standardAccessories: [
      'Yangın Tüpü',
      'Filtre Takımı',
      'LED Aydınlatma'
    ],
    optionalAccessories: [
      'Otomatik Elektrot Değiştirici'
    ]
  },
  {
    id: "best-2500-znc",
    name: "BEST 2500 ZNC",
    slug: "best-2500-znc",
    category: {
      id: "dalma-erozyon",
      name: "Dalma Erozyon Tezgahları",
      slug: "dalma-erozyon",
      subcategory: {
        name: "BEST EDM",
        slug: "best-edm",
        series: [{
          name: "ZNC Serisi",
          slug: "znc-serisi"
        }]
      }
    },
    description: "BEST 2500 ZNC Dalma Erozyon Tezgahı, büyük ölçekli işlemler için yüksek kapasite.",
    images: [
      'https://images.pexels.com/photos/3846226/pexels-photo-3846226.jpeg',
      'https://images.pexels.com/photos/2876439/pexels-photo-2876439.jpeg'
    ],
    specifications: [
      { label: 'Model', value: 'BEST 2500 ZNC' },
      { label: 'Tabla Boyutu', value: '900 x 600 mm' }
    ],
    standardAccessories: [
      'Yangın Tüpü',
      'Filtre Takımı',
      'LED Aydınlatma'
    ],
    optionalAccessories: [
      'Otomatik Elektrot Değiştirici'
    ]
  },
  {
    id: "best-3500-znc",
    name: "BEST 3500 ZNC",
    slug: "best-3500-znc",
    category: {
      id: "dalma-erozyon",
      name: "Dalma Erozyon Tezgahları",
      slug: "dalma-erozyon",
      subcategory: {
        name: "BEST EDM",
        slug: "best-edm",
        series: [{
          name: "ZNC Serisi",
          slug: "znc-serisi"
        }]
      }
    },
    description: "BEST 3500 ZNC Dalma Erozyon Tezgahı, endüstriyel ölçekte üretim için tasarlanmış.",
    images: [
      'https://images.pexels.com/photos/3846226/pexels-photo-3846226.jpeg',
      'https://images.pexels.com/photos/2876439/pexels-photo-2876439.jpeg'
    ],
    specifications: [
      { label: 'Model', value: 'BEST 3500 ZNC' },
      { label: 'Tabla Boyutu', value: '1000 x 700 mm' }
    ],
    standardAccessories: [
      'Yangın Tüpü',
      'Filtre Takımı',
      'LED Aydınlatma'
    ],
    optionalAccessories: [
      'Otomatik Elektrot Değiştirici'
    ]
  },
  {
    id: "best-4500-znc",
    name: "BEST 4500 ZNC",
    slug: "best-4500-znc",
    category: {
      id: "dalma-erozyon",
      name: "Dalma Erozyon Tezgahları",
      slug: "dalma-erozyon",
      subcategory: {
        name: "BEST EDM",
        slug: "best-edm",
        series: [{
          name: "ZNC Serisi",
          slug: "znc-serisi"
        }]
      }
    },
    description: "BEST 4500 ZNC Dalma Erozyon Tezgahı, maksimum kapasite ve hassasiyet gerektiren uygulamalar için.",
    images: [
      'https://images.pexels.com/photos/3846226/pexels-photo-3846226.jpeg',
      'https://images.pexels.com/photos/2876439/pexels-photo-2876439.jpeg'
    ],
    specifications: [
      { label: 'Model', value: 'BEST 4500 ZNC' },
      { label: 'Tabla Boyutu', value: '1200 x 800 mm' }
    ],
    standardAccessories: [
      'Yangın Tüpü',
      'Filtre Takımı',
      'LED Aydınlatma'
    ],
    optionalAccessories: [
      'Otomatik Elektrot Değiştirici'
    ]
  },
  {
    id: "best-cift-kafali-1000",
    name: "BEST ÇİFT KAFALI 1000",
    slug: "best-cift-kafali-1000",
    category: {
      id: "dalma-erozyon",
      name: "Dalma Erozyon Tezgahları",
      slug: "dalma-erozyon",
      subcategory: {
        name: "ÇİFT KAFALI DALMA EREZYON",
        slug: "cift-kafali-dalma-erezyon"
      }
    },
    description: "BEST ÇİFT KAFALI 1000 Dalma Erozyon Tezgahı, çift kafalı yapısı sayesinde yüksek verimlilik ve hassasiyet sunar.",
    images: [
      'https://images.pexels.com/photos/3846226/pexels-photo-3846226.jpeg',
      'https://images.pexels.com/photos/2876439/pexels-photo-2876439.jpeg'
    ],
    specifications: [
      { label: 'Model', value: 'BEST ÇİFT KAFALI 1000' },
      { label: 'Tabla Boyutu', value: '1000 x 500 mm' },
      { label: 'Kafa Sayısı', value: '2' }
    ],
    standardAccessories: [
      'Yangın Tüpü',
      'Filtre Takımı',
      'LED Aydınlatma'
    ],
    optionalAccessories: [
      'Otomatik Elektrot Değiştirici'
    ]
  },
  {
    id: "king-cift-kafali-1200",
    name: "KING ÇİFT KAFALI 1200",
    slug: "king-cift-kafali-1200",
    category: {
      id: "dalma-erozyon",
      name: "Dalma Erozyon Tezgahları",
      slug: "dalma-erozyon",
      subcategory: {
        name: "ÇİFT KAFALI DALMA EREZYON",
        slug: "cift-kafali-dalma-erezyon"
      }
    },
    description: "KING ÇİFT KAFALI 1200 Dalma Erozyon Tezgahı, geniş tabla yüzeyi ve çift kafalı yapısıyla endüstriyel üretim için ideal çözüm sunar.",
    images: [
      'https://images.pexels.com/photos/3846226/pexels-photo-3846226.jpeg',
      'https://images.pexels.com/photos/2876439/pexels-photo-2876439.jpeg'
    ],
    specifications: [
      { label: 'Model', value: 'KING ÇİFT KAFALI 1200' },
      { label: 'Tabla Boyutu', value: '1200 x 600 mm' },
      { label: 'Kafa Sayısı', value: '2' }
    ],
    standardAccessories: [
      'Yangın Tüpü',
      'Filtre Takımı',
      'LED Aydınlatma'
    ],
    optionalAccessories: [
      'Otomatik Elektrot Değiştirici'
    ]
  },
  {
    id: "3000-pnc",
    name: "3000 PNC",
    slug: "3000-pnc",
    category: {
      id: "dalma-erozyon",
      name: "Dalma Erozyon Tezgahları",
      slug: "dalma-erozyon",
      subcategory: {
        name: "BEST EDM",
        slug: "best-edm",
        series: [{ name: "PNC Serisi", slug: "pnc-serisi" }]
      }
    },
    description: "3000 PNC Dalma Erozyon Tezgahı, yüksek hassasiyet ve performans sunan endüstriyel çözüm.",
    images: [
      'https://images.pexels.com/photos/3846226/pexels-photo-3846226.jpeg',
      'https://images.pexels.com/photos/2876439/pexels-photo-2876439.jpeg'
    ],
    specifications: [
      { label: 'Model', value: '3000 PNC' },
      { label: 'Tabla Boyutu', value: '800 x 500 mm' }
    ],
    standardAccessories: [
      'Yangın Tüpü',
      'Filtre Takımı',
      'LED Aydınlatma'
    ],
    optionalAccessories: [
      'Otomatik Elektrot Değiştirici'
    ]
  },
  {
    id: "850-pnc",
    name: "850 PNC",
    slug: "850-pnc",
    category: {
      id: "dalma-erozyon",
      name: "Dalma Erozyon Tezgahları",
      slug: "dalma-erozyon",
      subcategory: {
        name: "BEST EDM",
        slug: "best-edm",
        series: [{ name: "PNC Serisi", slug: "pnc-serisi" }]
      }
    },
    description: "850 PNC Dalma Erozyon Tezgahı, orta ölçekli işlemler için optimize edilmiş performans.",
    images: [
      'https://images.pexels.com/photos/3846226/pexels-photo-3846226.jpeg',
      'https://images.pexels.com/photos/2876439/pexels-photo-2876439.jpeg'
    ],
    specifications: [
      { label: 'Model', value: '850 PNC' },
      { label: 'Tabla Boyutu', value: '850 x 450 mm' }
    ],
    standardAccessories: [
      'Yangın Tüpü',
      'Filtre Takımı',
      'LED Aydınlatma'
    ],
    optionalAccessories: [
      'Otomatik Elektrot Değiştirici'
    ]
  },
  {
    id: "560-pnc",
    name: "560 PNC",
    slug: "560-pnc",
    category: {
      id: "dalma-erozyon",
      name: "Dalma Erozyon Tezgahları",
      slug: "dalma-erozyon",
      subcategory: {
        name: "BEST EDM",
        slug: "best-edm",
        series: [{ name: "PNC Serisi", slug: "pnc-serisi" }]
      }
    },
    description: "560 PNC Dalma Erozyon Tezgahı, kompakt boyutları ve hassas işleme kabiliyeti.",
    images: [
      'https://images.pexels.com/photos/3846226/pexels-photo-3846226.jpeg',
      'https://images.pexels.com/photos/2876439/pexels-photo-2876439.jpeg'
    ],
    specifications: [
      { label: 'Model', value: '560 PNC' },
      { label: 'Tabla Boyutu', value: '560 x 350 mm' }
    ],
    standardAccessories: [
      'Yangın Tüpü',
      'Filtre Takımı',
      'LED Aydınlatma'
    ],
    optionalAccessories: [
      'Otomatik Elektrot Değiştirici'
    ]
  },
  {
    id: "570-pnc",
    name: "570 PNC",
    slug: "570-pnc",
    category: {
      id: "dalma-erozyon",
      name: "Dalma Erozyon Tezgahları",
      slug: "dalma-erozyon",
      subcategory: {
        name: "BEST EDM",
        slug: "best-edm",
        series: [{ name: "PNC Serisi", slug: "pnc-serisi" }]
      }
    },
    description: "570 PNC Dalma Erozyon Tezgahı, hassas işleme gerektiren uygulamalar için ideal çözüm.",
    images: [
      'https://images.pexels.com/photos/3846226/pexels-photo-3846226.jpeg',
      'https://images.pexels.com/photos/2876439/pexels-photo-2876439.jpeg'
    ],
    specifications: [
      { label: 'Model', value: '570 PNC' },
      { label: 'Tabla Boyutu', value: '570 x 350 mm' }
    ],
    standardAccessories: [
      'Yangın Tüpü',
      'Filtre Takımı',
      'LED Aydınlatma'
    ],
    optionalAccessories: [
      'Otomatik Elektrot Değiştirici'
    ]
  },
  {
    id: "680-pnc",
    name: "680 PNC",
    slug: "680-pnc",
    category: {
      id: "dalma-erozyon",
      name: "Dalma Erozyon Tezgahları",
      slug: "dalma-erozyon",
      subcategory: {
        name: "BEST EDM",
        slug: "best-edm",
        series: [{ name: "PNC Serisi", slug: "pnc-serisi" }]
      }
    },
    description: "680 PNC Dalma Erozyon Tezgahı, geniş iş parçası kapasitesi ve yüksek hassasiyet.",
    images: [
      'https://images.pexels.com/photos/3846226/pexels-photo-3846226.jpeg',
      'https://images.pexels.com/photos/2876439/pexels-photo-2876439.jpeg'
    ],
    specifications: [
      { label: 'Model', value: '680 PNC' },
      { label: 'Tabla Boyutu', value: '680 x 400 mm' }
    ],
    standardAccessories: [
      'Yangın Tüpü',
      'Filtre Takımı',
      'LED Aydınlatma'
    ],
    optionalAccessories: [
      'Otomatik Elektrot Değiştirici'
    ]
  },
  {
    id: "1060-pnc",
    name: "1060 PNC",
    slug: "1060-pnc",
    category: {
      id: "dalma-erozyon",
      name: "Dalma Erozyon Tezgahları",
      slug: "dalma-erozyon",
      subcategory: {
        name: "BEST EDM",
        slug: "best-edm",
        series: [{ name: "PNC Serisi", slug: "pnc-serisi" }]
      }
    },
    description: "1060 PNC Dalma Erozyon Tezgahı, endüstriyel ölçekte üretim için tasarlanmış.",
    images: [
      'https://images.pexels.com/photos/3846226/pexels-photo-3846226.jpeg',
      'https://images.pexels.com/photos/2876439/pexels-photo-2876439.jpeg'
    ],
    specifications: [
      { label: 'Model', value: '1060 PNC' },
      { label: 'Tabla Boyutu', value: '1000 x 600 mm' }
    ],
    standardAccessories: [
      'Yangın Tüpü',
      'Filtre Takımı',
      'LED Aydınlatma'
    ],
    optionalAccessories: [
      'Otomatik Elektrot Değiştirici'
    ]
  },
  {
    id: "1200-pnc",
    name: "1200 PNC",
    slug: "1200-pnc",
    category: {
      id: "dalma-erozyon",
      name: "Dalma Erozyon Tezgahları",
      slug: "dalma-erozyon",
      subcategory: {
        name: "BEST EDM",
        slug: "best-edm",
        series: [{ name: "PNC Serisi", slug: "pnc-serisi" }]
      }
    },
    description: "1200 PNC Dalma Erozyon Tezgahı, büyük ölçekli işlemler için yüksek kapasite.",
    images: [
      'https://images.pexels.com/photos/3846226/pexels-photo-3846226.jpeg',
      'https://images.pexels.com/photos/2876439/pexels-photo-2876439.jpeg'
    ],
    specifications: [
      { label: 'Model', value: '1200 PNC' },
      { label: 'Tabla Boyutu', value: '1200 x 800 mm' }
    ],
    standardAccessories: [
      'Yangın Tüpü',
      'Filtre Takımı',
      'LED Aydınlatma'
    ],
    optionalAccessories: [
      'Otomatik Elektrot Değiştirici'
    ]
  },
  {
    id: "1500-pnc",
    name: "1500 PNC",
    slug: "1500-pnc",
    category: {
      id: "dalma-erozyon",
      name: "Dalma Erozyon Tezgahları",
      slug: "dalma-erozyon",
      subcategory: {
        name: "BEST EDM",
        slug: "best-edm",
        series: [{ name: "PNC Serisi", slug: "pnc-serisi" }]
      }
    },
    description: "1500 PNC Dalma Erozyon Tezgahı, maksimum kapasite ve hassasiyet.",
    images: [
      'https://images.pexels.com/photos/3846226/pexels-photo-3846226.jpeg',
      'https://images.pexels.com/photos/2876439/pexels-photo-2876439.jpeg'
    ],
    specifications: [
      { label: 'Model', value: '1500 PNC' },
      { label: 'Tabla Boyutu', value: '1500 x 1000 mm' }
    ],
    standardAccessories: [
      'Yangın Tüpü',
      'Filtre Takımı',
      'LED Aydınlatma'
    ],
    optionalAccessories: [
      'Otomatik Elektrot Değiştirici'
    ]
  },
  {
    id: "best-2500-pnc",
    name: "BEST 2500 PNC",
    slug: "best-2500-pnc",
    category: {
      id: "dalma-erozyon",
      name: "Dalma Erozyon Tezgahları",
      slug: "dalma-erozyon",
      subcategory: {
        name: "BEST EDM",
        slug: "best-edm",
        series: [{ name: "PNC Serisi", slug: "pnc-serisi" }]
      }
    },
    description: "BEST 2500 PNC Dalma Erozyon Tezgahı, endüstriyel ölçekte üretim için özel tasarım.",
    images: [
      'https://images.pexels.com/photos/3846226/pexels-photo-3846226.jpeg',
      'https://images.pexels.com/photos/2876439/pexels-photo-2876439.jpeg'
    ],
    specifications: [
      { label: 'Model', value: 'BEST 2500 PNC' },
      { label: 'Tabla Boyutu', value: '2500 x 1500 mm' }
    ],
    standardAccessories: [
      'Yangın Tüpü',
      'Filtre Takımı',
      'LED Aydınlatma'
    ],
    optionalAccessories: [
      'Otomatik Elektrot Değiştirici'
    ]
  },
  {
    id: "best-3500-pnc",
    name: "BEST 3500 PNC",
    slug: "best-3500-pnc",
    category: {
      id: "dalma-erozyon",
      name: "Dalma Erozyon Tezgahları",
      slug: "dalma-erozyon",
      subcategory: {
        name: "BEST EDM",
        slug: "best-edm",
        series: [{ name: "PNC Serisi", slug: "pnc-serisi" }]
      }
    },
    description: "BEST 3500 PNC Dalma Erozyon Tezgahı, yüksek hassasiyet ve geniş çalışma alanı.",
    images: [
      'https://images.pexels.com/photos/3846226/pexels-photo-3846226.jpeg',
      'https://images.pexels.com/photos/2876439/pexels-photo-2876439.jpeg'
    ],
    specifications: [
      { label: 'Model', value: 'BEST 3500 PNC' },
      { label: 'Tabla Boyutu', value: '3500 x 2000 mm' }
    ],
    standardAccessories: [
      'Yangın Tüpü',
      'Filtre Takımı',
      'LED Aydınlatma'
    ],
    optionalAccessories: [
      'Otomatik Elektrot Değiştirici'
    ]
  },
  {
    id: "best-4500-pnc",
    name: "BEST 4500 PNC",
    slug: "best-4500-pnc",
    category: {
      id: "dalma-erozyon",
      name: "Dalma Erozyon Tezgahları",
      slug: "dalma-erozyon",
      subcategory: {
        name: "BEST EDM",
        slug: "best-edm",
        series: [{ name: "PNC Serisi", slug: "pnc-serisi" }]
      }
    },
    description: "BEST 4500 PNC Dalma Erozyon Tezgahı, maksimum kapasite ve hassasiyet gerektiren uygulamalar için.",
    images: [
      'https://images.pexels.com/photos/3846226/pexels-photo-3846226.jpeg',
      'https://images.pexels.com/photos/2876439/pexels-photo-2876439.jpeg'
    ],
    specifications: [
      { label: 'Model', value: 'BEST 4500 PNC' },
      { label: 'Tabla Boyutu', value: '4500 x 2500 mm' }
    ],
    standardAccessories: [
      'Yangın Tüpü',
      'Filtre Takımı',
      'LED Aydınlatma'
    ],
    optionalAccessories: [
      'Otomatik Elektrot Değiştirici'
    ]
  },
  {
    id: "300-cnc",
    name: "300 CNC",
    slug: "300-cnc",
    category: {
      id: "dalma-erozyon",
      name: "Dalma Erozyon Tezgahları",
      slug: "dalma-erozyon",
      subcategory: {
        name: "BEST EDM",
        slug: "best-edm",
        series: [{ name: "CNC Serisi", slug: "cnc-serisi" }]
      }
    },
    description: "300 CNC Dalma Erozyon Tezgahı, kompakt boyutları ve yüksek hassasiyetiyle öne çıkar.",
    images: [
      'https://images.pexels.com/photos/3846226/pexels-photo-3846226.jpeg',
      'https://images.pexels.com/photos/2876439/pexels-photo-2876439.jpeg'
    ],
    specifications: [
      { label: 'Model', value: '300 CNC' },
      { label: 'Tabla Boyutu', value: '300 x 200 mm' }
    ],
    standardAccessories: [
      'Yangın Tüpü',
      'Filtre Takımı',
      'LED Aydınlatma'
    ],
    optionalAccessories: [
      'Otomatik Elektrot Değiştirici'
    ]
  },
  {
    id: "340-cnc",
    name: "340 CNC",
    slug: "340-cnc",
    category: {
      id: "dalma-erozyon",
      name: "Dalma Erozyon Tezgahları",
      slug: "dalma-erozyon",
      subcategory: {
        name: "BEST EDM",
        slug: "best-edm",
        series: [{ name: "CNC Serisi", slug: "cnc-serisi" }]
      }
    },
    description: "340 CNC Dalma Erozyon Tezgahı, hassas işleme gerektiren uygulamalar için ideal çözüm.",
    images: [
      'https://images.pexels.com/photos/3846226/pexels-photo-3846226.jpeg',
      'https://images.pexels.com/photos/2876439/pexels-photo-2876439.jpeg'
    ],
    specifications: [
      { label: 'Model', value: '340 CNC' },
      { label: 'Tabla Boyutu', value: '340 x 250 mm' }
    ],
    standardAccessories: [
      'Yangın Tüpü',
      'Filtre Takımı',
      'LED Aydınlatma'
    ],
    optionalAccessories: [
      'Otomatik Elektrot Değiştirici'
    ]
  },
  {
    id: "850-cnc",
    name: "850 CNC",
    slug: "850-cnc",
    category: {
      id: "dalma-erozyon",
      name: "Dalma Erozyon Tezgahları",
      slug: "dalma-erozyon",
      subcategory: {
        name: "BEST EDM",
        slug: "best-edm",
        series: [{ name: "CNC Serisi", slug: "cnc-serisi" }]
      }
    },
    description: "850 CNC Dalma Erozyon Tezgahı, geniş iş parçası kapasitesi ve yüksek hassasiyet.",
    images: [
      'https://images.pexels.com/photos/3846226/pexels-photo-3846226.jpeg',
      'https://images.pexels.com/photos/2876439/pexels-photo-2876439.jpeg'
    ],
    specifications: [
      { label: 'Model', value: '850 CNC' },
      { label: 'Tabla Boyutu', value: '850 x 500 mm' }
    ],
    standardAccessories: [
      'Yangın Tüpü',
      'Filtre Takımı',
      'LED Aydınlatma'
    ],
    optionalAccessories: [
      'Otomatik Elektrot Değiştirici'
    ]
  },
  {
    id: "348-cnc",
    name: "348 CNC",
    slug: "348-cnc",
    category: {
      id: "dalma-erozyon",
      name: "Dalma Erozyon Tezgahları",
      slug: "dalma-erozyon",
      subcategory: {
        name: "BEST EDM",
        slug: "best-edm",
        series: [{ name: "CNC Serisi", slug: "cnc-serisi" }]
      }
    },
    description: "348 CNC Dalma Erozyon Tezgahı, orta ölçekli işlemler için optimize edilmiş performans.",
    images: [
      'https://images.pexels.com/photos/3846226/pexels-photo-3846226.jpeg',
      'https://images.pexels.com/photos/2876439/pexels-photo-2876439.jpeg'
    ],
    specifications: [
      { label: 'Model', value: '348 CNC' },
      { label: 'Tabla Boyutu', value: '348 x 250 mm' }
    ],
    standardAccessories: [
      'Yangın Tüpü',
      'Filtre Takımı',
      'LED Aydınlatma'
    ],
    optionalAccessories: [
      'Otomatik Elektrot Değiştirici'
    ]
  },
  {
    id: "448-cnc",
    name: "448 CNC",
    slug: "448-cnc",
    category: {
      id: "dalma-erozyon",
      name: "Dalma Erozyon Tezgahları",
      slug: "dalma-erozyon",
      subcategory: {
        name: "BEST EDM",
        slug: "best-edm",
        series: [{ name: "CNC Serisi", slug: "cnc-serisi" }]
      }
    },
    description: "448 CNC Dalma Erozyon Tezgahı, hassas işleme gerektiren uygulamalar için ideal çözüm.",
    images: [
      'https://images.pexels.com/photos/3846226/pexels-photo-3846226.jpeg',
      'https://images.pexels.com/photos/2876439/pexels-photo-2876439.jpeg'
    ],
    specifications: [
      { label: 'Model', value: '448 CNC' },
      { label: 'Tabla Boyutu', value: '448 x 300 mm' }
    ],
    standardAccessories: [
      'Yangın Tüpü',
      'Filtre Takımı',
      'LED Aydınlatma'
    ],
    optionalAccessories: [
      'Otomatik Elektrot Değiştirici'
    ]
  },
  {
    id: "450-cnc",
    name: "450 CNC",
    slug: "450-cnc",
    category: {
      id: "dalma-erozyon",
      name: "Dalma Erozyon Tezgahları",
      slug: "dalma-erozyon",
      subcategory: {
        name: "BEST EDM",
        slug: "best-edm",
        series: [{ name: "CNC Serisi", slug: "cnc-serisi" }]
      }
    },
    description: "450 CNC Dalma Erozyon Tezgahı, orta ölçekli işlemler için optimize edilmiş performans.",
    images: [
      'https://images.pexels.com/photos/3846226/pexels-photo-3846226.jpeg',
      'https://images.pexels.com/photos/2876439/pexels-photo-2876439.jpeg'
    ],
    specifications: [
      { label: 'Model', value: '450 CNC' },
      { label: 'Tabla Boyutu', value: '450 x 300 mm' }
    ],
    standardAccessories: [
      'Yangın Tüpü',
      'Filtre Takımı',
      'LED Aydınlatma'
    ],
    optionalAccessories: [
      'Otomatik Elektrot Değiştirici'
    ]
  },
  {
    id: "560-cnc",
    name: "560 CNC",
    slug: "560-cnc",
    category: {
      id: "dalma-erozyon",
      name: "Dalma Erozyon Tezgahları",
      slug: "dalma-erozyon",
      subcategory: {
        name: "BEST EDM",
        slug: "best-edm",
        series: [{ name: "CNC Serisi", slug: "cnc-serisi" }]
      }
    },
    description: "560 CNC Dalma Erozyon Tezgahı, kompakt boyutları ve hassas işleme kabiliyeti.",
    images: [
      'https://images.pexels.com/photos/3846226/pexels-photo-3846226.jpeg',
      'https://images.pexels.com/photos/2876439/pexels-photo-2876439.jpeg'
    ],
    specifications: [
      { label: 'Model', value: '560 CNC' },
      { label: 'Tabla Boyutu', value: '560 x 350 mm' }
    ],
    standardAccessories: [
      'Yangın Tüpü',
      'Filtre Takımı',
      'LED Aydınlatma'
    ],
    optionalAccessories: [
      'Otomatik Elektrot Değiştirici'
    ]
  },
  {
    id: "570-cnc",
    name: "570 CNC",
    slug: "570-cnc",
    category: {
      id: "dalma-erozyon",
      name: "Dalma Erozyon Tezgahları",
      slug: "dalma-erozyon",
      subcategory: {
        name: "BEST EDM",
        slug: "best-edm",
        series: [{ name: "CNC Serisi", slug: "cnc-serisi" }]
      }
    },
    description: "570 CNC Dalma Erozyon Tezgahı, hassas işleme gerektiren uygulamalar için ideal çözüm.",
    images: [
      'https://images.pexels.com/photos/3846226/pexels-photo-3846226.jpeg',
      'https://images.pexels.com/photos/2876439/pexels-photo-2876439.jpeg'
    ],
    specifications: [
      { label: 'Model', value: '570 CNC' },
      { label: 'Tabla Boyutu', value: '570 x 350 mm' }
    ],
    standardAccessories: [
      'Yangın Tüpü',
      'Filtre Takımı',
      'LED Aydınlatma'
    ],
    optionalAccessories: [
      'Otomatik Elektrot Değiştirici'
    ]
  },
  {
    id: "860-cnc",
    name: "860 CNC",
    slug: "860-cnc",
    category: {
      id: "dalma-erozyon",
      name: "Dalma Erozyon Tezgahları",
      slug: "dalma-erozyon",
      subcategory: {
        name: "BEST EDM",
        slug: "best-edm",
        series: [{ name: "CNC Serisi", slug: "cnc-serisi" }]
      }
    },
    description: "860 CNC Dalma Erozyon Tezgahı, geniş iş parçası kapasitesi ve yüksek hassasiyet.",
    images: [
      'https://images.pexels.com/photos/3846226/pexels-photo-3846226.jpeg',
      'https://images.pexels.com/photos/2876439/pexels-photo-2876439.jpeg'
    ],
    specifications: [
      { label: 'Model', value: '860 CNC' },
      { label: 'Tabla Boyutu', value: '860 x 500 mm' }
    ],
    standardAccessories: [
      'Yangın Tüpü',
      'Filtre Takımı',
      'LED Aydınlatma'
    ],
    optionalAccessories: [
      'Otomatik Elektrot Değiştirici'
    ]
  },
  {
    id: "1060-cnc",
    name: "1060 CNC",
    slug: "1060-cnc",
    category: {
      id: "dalma-erozyon",
      name: "Dalma Erozyon Tezgahları",
      slug: "dalma-erozyon",
      subcategory: {
        name: "BEST EDM",
        slug: "best-edm",
        series: [{ name: "CNC Serisi", slug: "cnc-serisi" }]
      }
    },
    description: "1060 CNC Dalma Erozyon Tezgahı, endüstriyel ölçekte üretim için tasarlanmış.",
    images: [
      'https://images.pexels.com/photos/3846226/pexels-photo-3846226.jpeg',
      'https://images.pexels.com/photos/2876439/pexels-photo-2876439.jpeg'
    ],
    specifications: [
      { label: 'Model', value: '1060 CNC' },
      { label: 'Tabla Boyutu', value: '1000 x 600 mm' }
    ],
    standardAccessories: [
      'Yangın Tüpü',
      'Filtre Takımı',
      'LED Aydınlatma'
    ],
    optionalAccessories: [
      'Otomatik Elektrot Değiştirici'
    ]
  },
  {
    id: "1200-cnc",
    name: "1200 CNC",
    slug: "1200-cnc",
    category: {
      id: "dalma-erozyon",
      name: "Dalma Erozyon Tezgahları",
      slug: "dalma-erozyon",
      subcategory: {
        name: "BEST EDM",
        slug: "best-edm",
        series: [{ name: "CNC Serisi", slug: "cnc-serisi" }]
      }
    },
    description: "1200 CNC Dalma Erozyon Tezgahı, büyük ölçekli işlemler için yüksek kapasite.",
    images: [
      'https://images.pexels.com/photos/3846226/pexels-photo-3846226.jpeg',
      'https://images.pexels.com/photos/2876439/pexels-photo-2876439.jpeg'
    ],
    specifications: [
      { label: 'Model', value: '1200 CNC' },
      { label: 'Tabla Boyutu', value: '1200 x 800 mm' }
    ],
    standardAccessories: [
      'Yangın Tüpü',
      'Filtre Takımı',
      'LED Aydınlatma'
    ],
    optionalAccessories: [
      'Otomatik Elektrot Değiştirici'
    ]
  },
  {
    id: "1500-cnc",
    name: "1500 CNC",
    slug: "1500-cnc",
    category: {
      id: "dalma-erozyon",
      name: "Dalma Erozyon Tezgahları",
      slug: "dalma-erozyon",
      subcategory: {
        name: "BEST EDM",
        slug: "best-edm",
        series: [{ name: "CNC Serisi", slug: "cnc-serisi" }]
      }
    },
    description: "1500 CNC Dalma Erozyon Tezgahı, maksimum kapasite ve hassasiyet.",
    images: [
      'https://images.pexels.com/photos/3846226/pexels-photo-3846226.jpeg',
      'https://images.pexels.com/photos/2876439/pexels-photo-2876439.jpeg'
    ],
    specifications: [
      { label: 'Model', value: '1500 CNC' },
      { label: 'Tabla Boyutu', value: '1500 x 1000 mm' }
    ],
    standardAccessories: [
      'Yangın Tüpü',
      'Filtre Takımı',
      'LED Aydınlatma'
    ],
    optionalAccessories: [
      'Otomatik Elektrot Değiştirici'
    ]
  },
  {
    id: "king-edm-450-pnc",
    name: "KİNG EDM 450 PNC",
    slug: "king-edm-450-pnc",
    category: {
      id: "dalma-erozyon",
      name: "Dalma Erozyon Tezgahları",
      slug: "dalma-erozyon",
      subcategory: {
        name: "KING EDM",
        slug: "king-edm",
        series: [
          { name: 'PNC SERİSİ', slug: 'pnc-serisi' },
          { name: 'ZNC SERİSİ', slug: 'znc-serisi' }
        ]
      }
    },
    description: "KİNG EDM 450 PNC Dalma Erozyon Tezgahı, orta ölçekli işlemler için optimize edilmiş performans sunar.",
    images: [
      'https://images.pexels.com/photos/3846226/pexels-photo-3846226.jpeg',
      'https://images.pexels.com/photos/2876439/pexels-photo-2876439.jpeg'
    ],
    specifications: [
      { label: 'Model', value: 'KİNG EDM 450 PNC' },
      { label: 'Tabla Boyutu', value: '450 x 300 mm' }
    ],
    standardAccessories: [
      'Yangın Tüpü',
      'Filtre Takımı',
      'LED Aydınlatma'
    ],
    optionalAccessories: [
      'Otomatik Elektrot Değiştirici'
    ]
  },
  {
    id: "king-edm-350-pnc",
    name: "KİNG EDM 350 PNC",
    slug: "king-edm-350-pnc",
    category: {
      id: "dalma-erozyon",
      name: "Dalma Erozyon Tezgahları",
      slug: "dalma-erozyon",
      subcategory: {
        name: "KING EDM",
        slug: "king-edm",
        series: [
          { name: 'PNC SERİSİ', slug: 'pnc-serisi' },
          { name: 'ZNC SERİSİ', slug: 'znc-serisi' }
        ]
      }
    },
    description: "KİNG EDM 350 PNC Dalma Erozyon Tezgahı, kompakt boyutları ve hassas işleme kabiliyeti ile öne çıkar.",
    images: [
      'https://images.pexels.com/photos/3846226/pexels-photo-3846226.jpeg',
      'https://images.pexels.com/photos/2876439/pexels-photo-2876439.jpeg'
    ],
    specifications: [
      { label: 'Model', value: 'KİNG EDM 350 PNC' },
      { label: 'Tabla Boyutu', value: '350 x 250 mm' }
    ],
    standardAccessories: [
      'Yangın Tüpü',
      'Filtre Takımı',
      'LED Aydınlatma'
    ],
    optionalAccessories: [
      'Otomatik Elektrot Değiştirici'
    ]
  },
  {
    id: "king-edm-540-pnc",
    name: "KİNG EDM 540 PNC",
    slug: "king-edm-540-pnc",
    category: {
      id: "dalma-erozyon",
      name: "Dalma Erozyon Tezgahları",
      slug: "dalma-erozyon",
      subcategory: {
        name: "KING EDM",
        slug: "king-edm",
        series: [
          { name: 'PNC SERİSİ', slug: 'pnc-serisi' },
          { name: 'ZNC SERİSİ', slug: 'znc-serisi' }
        ]
      }
    },
    description: "KİNG EDM 540 PNC Dalma Erozyon Tezgahı, geniş iş parçası kapasitesi ve yüksek hassasiyet sunar.",
    images: [
      'https://images.pexels.com/photos/3846226/pexels-photo-3846226.jpeg',
      'https://images.pexels.com/photos/2876439/pexels-photo-2876439.jpeg'
    ],
    specifications: [
      { label: 'Model', value: 'KİNG EDM 540 PNC' },
      { label: 'Tabla Boyutu', value: '540 x 350 mm' }
    ],
    standardAccessories: [
      'Yangın Tüpü',
      'Filtre Takımı',
      'LED Aydınlatma'
    ],
    optionalAccessories: [
      'Otomatik Elektrot Değiştirici'
    ]
  },
  {
    id: "king-edm-750-pnc",
    name: "KİNG EDM 750 PNC",
    slug: "king-edm-750-pnc",
    category: {
      id: "dalma-erozyon",
      name: "Dalma Erozyon Tezgahları",
      slug: "dalma-erozyon",
      subcategory: {
        name: "KING EDM",
        slug: "king-edm",
        series: [
          { name: 'PNC SERİSİ', slug: 'pnc-serisi' },
          { name: 'ZNC SERİSİ', slug: 'znc-serisi' }
        ]
      }
    },
    description: "KİNG EDM 750 PNC Dalma Erozyon Tezgahı, endüstriyel ölçekte üretim için tasarlanmış yüksek performanslı model.",
    images: [
      'https://images.pexels.com/photos/3846226/pexels-photo-3846226.jpeg',
      'https://images.pexels.com/photos/2876439/pexels-photo-2876439.jpeg'
    ],
    specifications: [
      { label: 'Model', value: 'KİNG EDM 750 PNC' },
      { label: 'Tabla Boyutu', value: '750 x 450 mm' }
    ],
    standardAccessories: [
      'Yangın Tüpü',
      'Filtre Takımı',
      'LED Aydınlatma'
    ],
    optionalAccessories: [
      'Otomatik Elektrot Değiştirici'
    ]
  },
  {
    id: 'king-edm-450-znc',
    name: 'KİNG EDM 450 ZNC',
    slug: 'king-edm-450-znc',
    category: {
      id: 'dalma-erozyon',
      name: 'Dalma Erozyon Tezgahları',
      slug: 'dalma-erozyon',
      subcategory: {
        name: 'KING EDM',
        slug: 'king-edm',
        series: [{ name: 'ZNC SERİSİ', slug: 'znc-serisi' }]
      }
    },
    description: 'KİNG EDM 450 ZNC modeli, yüksek hassasiyet ve performans sunan bir dalma erozyon tezgahıdır. Orta ölçekli işletmeler için ideal çözüm sunar.',
    images: [
      'https://images.pexels.com/photos/3846226/pexels-photo-3846226.jpeg',
      'https://images.pexels.com/photos/3846227/pexels-photo-3846227.jpeg',
      'https://images.pexels.com/photos/3846228/pexels-photo-3846228.jpeg',
      'https://images.pexels.com/photos/3846229/pexels-photo-3846229.jpeg'
    ],
    specifications: [
      { label: 'Model', value: 'KİNG EDM 450 ZNC' },
      { label: 'Tabla Ölçüsü', value: '450 x 300 mm' }
    ],
    standardAccessories: [
      'Yangın Tüpü',
      'Filtre Takımı',
      'LED Aydınlatma'
    ],
    optionalAccessories: [
      'Otomatik Elektrot Değiştirici'
    ]
  },
  {
    id: 'king-edm-350-znc',
    name: 'KİNG EDM 350 ZNC',
    slug: 'king-edm-350-znc',
    category: {
      id: 'dalma-erozyon',
      name: 'Dalma Erozyon Tezgahları',
      slug: 'dalma-erozyon',
      subcategory: {
        name: 'KING EDM',
        slug: 'king-edm',
        series: [{ name: 'ZNC SERİSİ', slug: 'znc-serisi' }]
      }
    },
    description: 'KİNG EDM 350 ZNC modeli, kompakt boyutlarına rağmen yüksek hassasiyet sunan bir dalma erozyon tezgahıdır. Küçük ve orta ölçekli işletmeler için ideal çözüm sunar.',
    images: [
      'https://images.pexels.com/photos/3846226/pexels-photo-3846226.jpeg',
      'https://images.pexels.com/photos/3846227/pexels-photo-3846227.jpeg',
      'https://images.pexels.com/photos/3846228/pexels-photo-3846228.jpeg',
      'https://images.pexels.com/photos/3846229/pexels-photo-3846229.jpeg'
    ],
    specifications: [
      { label: 'Model', value: 'KİNG EDM 350 ZNC' },
      { label: 'Tabla Ölçüsü', value: '350 x 250 mm' }
    ],
    standardAccessories: [
      'Yangın Tüpü',
      'Filtre Takımı',
      'LED Aydınlatma'
    ],
    optionalAccessories: [
      'Otomatik Elektrot Değiştirici'
    ]
  },
  {
    id: 'king-edm-540-znc',
    name: 'KİNG EDM 540 ZNC',
    slug: 'king-edm-540-znc',
    category: {
      id: 'dalma-erozyon',
      name: 'Dalma Erozyon Tezgahları',
      slug: 'dalma-erozyon',
      subcategory: {
        name: 'KING EDM',
        slug: 'king-edm',
        series: [{ name: 'ZNC SERİSİ', slug: 'znc-serisi' }]
      }
    },
    description: 'KİNG EDM 540 ZNC modeli, geniş tabla ölçüsü ve yüksek hassasiyeti ile öne çıkan bir dalma erozyon tezgahıdır. Orta ve büyük ölçekli işletmeler için ideal çözüm sunar.',
    images: [
      'https://images.pexels.com/photos/3846226/pexels-photo-3846226.jpeg',
      'https://images.pexels.com/photos/3846227/pexels-photo-3846227.jpeg',
      'https://images.pexels.com/photos/3846228/pexels-photo-3846228.jpeg',
      'https://images.pexels.com/photos/3846229/pexels-photo-3846229.jpeg'
    ],
    specifications: [
      { label: 'Model', value: 'KİNG EDM 540 ZNC' },
      { label: 'Tabla Ölçüsü', value: '540 x 350 mm' }
    ],
    standardAccessories: [
      'Yangın Tüpü',
      'Filtre Takımı',
      'LED Aydınlatma'
    ],
    optionalAccessories: [
      'Otomatik Elektrot Değiştirici'
    ]
  },
  {
    id: 'king-edm-750-znc',
    name: 'KİNG EDM 750 ZNC',
    slug: 'king-edm-750-znc',
    category: {
      id: 'dalma-erozyon',
      name: 'Dalma Erozyon Tezgahları',
      slug: 'dalma-erozyon',
      subcategory: {
        name: 'KING EDM',
        slug: 'king-edm',
        series: [{ name: 'ZNC SERİSİ', slug: 'znc-serisi' }]
      }
    },
    description: 'KİNG EDM 750 ZNC modeli, büyük tabla ölçüsü ve yüksek hassasiyeti ile öne çıkan bir dalma erozyon tezgahıdır. Büyük ölçekli işletmeler için ideal çözüm sunar.',
    images: [
      'https://images.pexels.com/photos/3846226/pexels-photo-3846226.jpeg',
      'https://images.pexels.com/photos/3846227/pexels-photo-3846227.jpeg',
      'https://images.pexels.com/photos/3846228/pexels-photo-3846228.jpeg',
      'https://images.pexels.com/photos/3846229/pexels-photo-3846229.jpeg'
    ],
    specifications: [
      { label: 'Model', value: 'KİNG EDM 750 ZNC' },
      { label: 'Tabla Ölçüsü', value: '750 x 450 mm' }
    ],
    standardAccessories: [
      'Yangın Tüpü',
      'Filtre Takımı',
      'LED Aydınlatma'
    ],
    optionalAccessories: [
      'Otomatik Elektrot Değiştirici'
    ]
  },
  {
    id: "kg-super-m250",
    name: "KG SUPER M250",
    slug: "kg-super-m250",
    category: {
      id: "kalipci-freze",
      name: "Kalıpçı Freze Tezgahları",
      slug: "kalipci-freze",
      subcategory: {
        name: "KG SUPER",
        slug: "kg-super"
      }
    },
    description: "KG SUPER M250, yüksek hassasiyet ve dayanıklılık sunan profesyonel bir freze tezgahıdır. Gelişmiş kontrol sistemi ve geniş tabla yüzeyi ile kalıp işleme operasyonlarınız için mükemmel çözüm sunar.",
    images: [
      'https://images.pexels.com/photos/5726837/pexels-photo-5726837.jpeg',
      'https://images.pexels.com/photos/5726833/pexels-photo-5726833.jpeg',
      'https://images.pexels.com/photos/2876439/pexels-photo-2876439.jpeg',
      'https://images.pexels.com/photos/3846226/pexels-photo-3846226.jpeg'
    ],
    specifications: [
      { label: 'Model', value: 'KG SUPER M250' },
      { label: 'Tabla Boyutu', value: '1600 x 360 mm' },
      { label: 'X Eksen Hareketi', value: '1200 mm' },
      { label: 'Y Eksen Hareketi', value: '600 mm' },
      { label: 'Z Eksen Hareketi', value: '500 mm' },
      { label: 'Spindle Devri', value: '60-4200 dev/dak' },
      { label: 'Motor Gücü', value: '9 kW' }
    ],
    standardAccessories: [
      'Soğutma Sistemi',
      'Otomatik Yağlama',
      'LED Aydınlatma',
      'Takım Seti'
    ],
    optionalAccessories: [
      'Dijital Pozisyon Göstergesi',
      'Talaş Konveyörü',
      'Takım Tutucu Set'
    ]
  },
  {
    id: "kg-super-m250d",
    name: "KG SUPER M250D",
    slug: "kg-super-m250d",
    category: {
      id: "kalipci-freze",
      name: "Kalıpçı Freze Tezgahları",
      slug: "kalipci-freze",
      subcategory: {
        name: "KG SUPER",
        slug: "kg-super"
      }
    },
    description: "KG SUPER M250D, dijital kontrol sistemi ve yüksek hassasiyetiyle öne çıkan profesyonel bir freze tezgahıdır. Gelişmiş özellikleri ve dayanıklı yapısı ile uzun ömürlü kullanım sağlar.",
    images: [
      'https://images.pexels.com/photos/5726837/pexels-photo-5726837.jpeg',
      'https://images.pexels.com/photos/5726833/pexels-photo-5726833.jpeg',
      'https://images.pexels.com/photos/2876439/pexels-photo-2876439.jpeg',
      'https://images.pexels.com/photos/3846226/pexels-photo-3846226.jpeg'
    ],
    specifications: [
      { label: 'Model', value: 'KG SUPER M250D' },
      { label: 'Tabla Boyutu', value: '1600 x 360 mm' },
      { label: 'X Eksen Hareketi', value: '1200 mm' },
      { label: 'Y Eksen Hareketi', value: '600 mm' },
      { label: 'Z Eksen Hareketi', value: '500 mm' },
      { label: 'Spindle Devri', value: '60-4200 dev/dak' },
      { label: 'Motor Gücü', value: '9 kW' }
    ],
    standardAccessories: [
      'Soğutma Sistemi',
      'Otomatik Yağlama',
      'LED Aydınlatma',
      'Takım Seti',
      'Dijital Gösterge'
    ],
    optionalAccessories: [
      'Talaş Konveyörü',
      'Takım Tutucu Set',
      'CNC Kontrol Sistemi'
    ]
  },
  {
    id: "kg-super-x6325w",
    name: "KG SUPER X6325W UNİVERSAL FREZE",
    slug: "kg-super-x6325w",
    category: {
      id: "universal-kalipci-freze",
      name: "Üniversal Kalıpçı Freze Tezgahları",
      slug: "universal-kalipci-freze",
      subcategory: {
        name: "KG SUPER",
        slug: "kg-super"
      }
    },
    description: "KG SUPER X6325W UNİVERSAL FREZE, yüksek hassasiyet ve dayanıklılık sunan profesyonel bir freze tezgahıdır. Gelişmiş kontrol sistemi ve geniş tabla yüzeyi ile kalıp işleme operasyonlarınız için mükemmel çözüm sunar.",
    images: [
      'https://images.pexels.com/photos/5726837/pexels-photo-5726837.jpeg',
      'https://images.pexels.com/photos/5726833/pexels-photo-5726833.jpeg'
    ],
    specifications: [
      { label: 'Model', value: 'KG SUPER X6325W' }
    ],
    standardAccessories: [
      'Soğutma Sistemi',
      'Otomatik Yağlama',
      'LED Aydınlatma',
      'Takım Seti'
    ],
    optionalAccessories: [
      'Dijital Pozisyon Göstergesi',
      'Talaş Konveyörü',
      'Takım Tutucu Set'
    ]
  },
  {
    id: "king-sz-2200-hvd",
    name: "KİNG SZ 2200 HVD",
    slug: "king-sz-2200-hvd",
    category: {
      id: "universal-kalipci-freze",
      name: "Üniversal Kalıpçı Freze Tezgahları",
      slug: "universal-kalipci-freze",
      subcategory: {
        name: "KİNG",
        slug: "king"
      }
    },
    description: "KİNG SZ 2200 HVD Üniversal Kalıpçı Freze Tezgahı, yüksek hassasiyet ve performans sunan endüstriyel çözüm.",
    images: [
      'https://images.pexels.com/photos/5726837/pexels-photo-5726837.jpeg',
      'https://images.pexels.com/photos/5726833/pexels-photo-5726833.jpeg'
    ],
    specifications: [
      { label: 'Model', value: 'KİNG SZ 2200 HVD' },
      { label: 'Tabla Boyutu', value: '2200 x 460 mm' }
    ],
    standardAccessories: [
      'Soğutma Sistemi',
      'Otomatik Yağlama',
      'LED Aydınlatma'
    ],
    optionalAccessories: [
      'Dijital Pozisyon Göstergesi',
      'Talaş Konveyörü'
    ]
  },
  {
    id: "king-sz-2200-hvsd",
    name: "KİNG SZ 2200 HVSD",
    slug: "king-sz-2200-hvsd",
    category: {
      id: "universal-kalipci-freze",
      name: "Üniversal Kalıpçı Freze Tezgahları",
      slug: "universal-kalipci-freze",
      subcategory: {
        name: "KİNG",
        slug: "king"
      }
    },
    description: "KİNG SZ 2200 HVSD Üniversal Kalıpçı Freze Tezgahı, hassas işleme gerektiren uygulamalar için ideal çözüm.",
    images: [
      'https://images.pexels.com/photos/5726837/pexels-photo-5726837.jpeg',
      'https://images.pexels.com/photos/5726833/pexels-photo-5726833.jpeg'
    ],
    specifications: [
      { label: 'Model', value: 'KİNG SZ 2200 HVSD' },
      { label: 'Tabla Boyutu', value: '2200 x 460 mm' }
    ],
    standardAccessories: [
      'Soğutma Sistemi',
      'Otomatik Yağlama',
      'LED Aydınlatma'
    ],
    optionalAccessories: [
      'Dijital Pozisyon Göstergesi',
      'Talaş Konveyörü'
    ]
  },
  {
    id: "ysm-26shb",
    name: "YSM-26SHB",
    slug: "ysm-26shb",
    category: {
      id: "universal-kalipci-freze",
      name: "Üniversal Kalıpçı Freze Tezgahları",
      slug: "universal-kalipci-freze",
      subcategory: {
        name: "KİNG YSM",
        slug: "king-ysm"
      }
    },
    description: "YSM-26SHB Üniversal Kalıpçı Freze Tezgahı, yüksek hassasiyet ve performans sunan endüstriyel çözüm.",
    images: [
      'https://images.pexels.com/photos/5726837/pexels-photo-5726837.jpeg',
      'https://images.pexels.com/photos/5726833/pexels-photo-5726833.jpeg'
    ],
    specifications: [
      { label: 'Model', value: 'YSM-26SHB' }
    ],
    standardAccessories: [
      'Soğutma Sistemi',
      'Otomatik Yağlama',
      'LED Aydınlatma'
    ],
    optionalAccessories: [
      'Dijital Pozisyon Göstergesi',
      'Talaş Konveyörü'
    ]
  },
  {
    id: "king-ysm-26-chb",
    name: "KİNG YSM - 26 CHB",
    slug: "king-ysm-26-chb",
    category: {
      id: "universal-kalipci-freze",
      name: "Üniversal Kalıpçı Freze Tezgahları",
      slug: "universal-kalipci-freze",
      subcategory: {
        name: "KİNG YSM",
        slug: "king-ysm"
      }
    },
    description: "KİNG YSM - 26 CHB Üniversal Kalıpçı Freze Tezgahı, hassas işleme gerektiren uygulamalar için ideal çözüm.",
    images: [
      'https://images.pexels.com/photos/5726837/pexels-photo-5726837.jpeg',
      'https://images.pexels.com/photos/5726833/pexels-photo-5726833.jpeg'
    ],
    specifications: [
      { label: 'Model', value: 'KİNG YSM - 26 CHB' }
    ],
    standardAccessories: [
      'Soğutma Sistemi',
      'Otomatik Yağlama',
      'LED Aydınlatma'
    ],
    optionalAccessories: [
      'Dijital Pozisyon Göstergesi',
      'Talaş Konveyörü'
    ]
  }
];

// Ürün getirme fonksiyonları
export function getProductBySlug(slug: string): Product | undefined {
  return products.find(product => product.slug === slug);
}

export function getProductsByCategory(categorySlug: string): Product[] {
  return products.filter(product => product.category.slug === categorySlug);
}

export function getProductsBySubcategory(categorySlug: string, subcategorySlug: string): Product[] {
  return products.filter(
    product => 
      product.category.slug === categorySlug && 
      product.category.subcategory?.slug === subcategorySlug
  );
}

export function getProductsBySeries(categorySlug: string, subcategorySlug: string, seriesSlug: string): Product[] {
  return products.filter(
    product => 
      product.category.slug === categorySlug && 
      product.category.subcategory?.slug === subcategorySlug &&
      product.category.subcategory?.series?.some(s => s.slug === seriesSlug)
  );
}

export function getAllProducts(): Product[] {
  return products;
}

// Kategoriler
export const categories: Category[] = [
  {
    id: 'cnc-double-kolon',
    name: 'CNC Double Kolon Dik İşleme Merkezi',
    slug: 'cnc-double-kolon',
    subcategories: [
      {
        name: 'CNC Double Kolon',
        slug: 'cnc-double-kolon',
        series: [{ name: 'Double Kolon', slug: 'double-kolon' }]
      }
    ]
  },
  {
    id: 'dalma-erozyon',
    name: 'Dalma Erozyon Tezgahları',
    slug: 'dalma-erozyon',
    subcategories: [
      {
        name: 'BEST EDM',
        slug: 'best-edm',
        series: [
          { name: 'ZNC Serisi', slug: 'znc-serisi' },
          { name: 'PNC Serisi', slug: 'pnc-serisi' },
          { name: 'CNC Serisi', slug: 'cnc-serisi' }
        ]
      },
      {
        name: 'KING EDM',
        slug: 'king-edm',
        series: [
          { name: 'PNC SERİSİ', slug: 'pnc-serisi' },
          { name: 'ZNC SERİSİ', slug: 'znc-serisi' }
        ]
      },
      {
        name: 'ÇİFT KAFALI DALMA EREZYON',
        slug: 'cift-kafali-dalma-erezyon',
        series: []
      }
    ]
  },
  {
    id: 'kalipci-freze',
    name: 'Kalıpçı Freze Tezgahları',
    slug: 'kalipci-freze',
    subcategories: [
      {
        name: 'KİNG',
        slug: 'king',
        series: []
      },
      {
        name: 'JETCO',
        slug: 'jetco',
        series: []
      },
      {
        name: 'KG SUPER',
        slug: 'kg-super',
        series: []
      }
    ]
  },
  {
    id: 'universal-kalipci-freze',
    name: 'Üniversal Kalıpçı Freze Tezgahları',
    slug: 'universal-kalipci-freze',
    subcategories: [
      {
        name: 'KİNG',
        slug: 'king',
        series: []
      },
      {
        name: 'KİNG YSM',
        slug: 'king-ysm',
        series: []
      },
      {
        name: 'KG SUPER',
        slug: 'kg-super',
        series: []
      }
    ]
  },
  {
    id: 'koc-kafa-universal-freze',
    name: 'Koç Kafa Universal Freze',
    slug: 'koc-kafa-universal-freze',
    subcategories: []
  },
  {
    id: 'taslama',
    name: 'Taşlama Tezgahları',
    slug: 'taslama',
    subcategories: [
      {
        name: 'KİNG GRINDER',
        slug: 'king-grinder',
        series: []
      }
    ]
  },
  {
    id: 'torna',
    name: 'Torna Tezgahları',
    slug: 'torna',
    subcategories: [
      {
        name: 'KING',
        slug: 'king',
        series: []
      },
      {
        name: 'JETCO',
        slug: 'jetco',
        series: []
      },
      {
        name: 'TOS',
        slug: 'tos',
        series: []
      }
    ]
  },
  {
    id: 'masa-ustu-torna',
    name: 'Masa Üstü Torna Tezgahları',
    slug: 'masa-ustu-torna',
    subcategories: []
  },
  {
    id: 'radyal-matkap',
    name: 'Radyal Matkap Tezgahları',
    slug: 'radyal-matkap',
    subcategories: [
      {
        name: 'TAILIFT',
        slug: 'tailift',
        series: []
      },
      {
        name: 'KG SUPER',
        slug: 'kg-super',
        series: []
      }
    ]
  },
  {
    id: 'sutunlu-matkap',
    name: 'Sütunlu Matkap Tezgahları',
    slug: 'sutunlu-matkap',
    subcategories: [
      {
        name: 'KING',
        slug: 'king',
        series: []
      },
      {
        name: 'JETCO',
        slug: 'jetco',
        series: []
      },
      {
        name: 'ŞAHİN',
        slug: 'sahin',
        series: []
      },
      {
        name: 'BOYKA',
        slug: 'boyka',
        series: []
      }
    ]
  },
  {
    id: 'testere',
    name: 'Testere Tezgahları',
    slug: 'testere',
    subcategories: [
      {
        name: 'KING TYC',
        slug: 'king-tyc',
        series: []
      },
      {
        name: 'JETCO',
        slug: 'jetco',
        series: []
      },
      {
        name: 'KESMAK',
        slug: 'kesmak',
        series: []
      }
    ]
  },
  {
    id: 'kilavuz-cekme',
    name: 'Kılavuz Çekme Tezgahları',
    slug: 'kilavuz-cekme',
    subcategories: [
      {
        name: 'KING TAPPING',
        slug: 'king-tapping',
        series: []
      }
    ]
  },
  {
    id: 'makina-aksesuarlari',
    name: 'Makina Aksesuarları',
    slug: 'makina-aksesuarlari',
    subcategories: [
      {
        name: 'Otomatik Yağlama',
        slug: 'otomatik-yaglama',
        series: []
      },
      {
        name: 'Filtre',
        slug: 'filtre',
        series: []
      },
      {
        name: 'Alıgn Motor',
        slug: 'align-motor',
        series: []
      },
      {
        name: 'Manuel Yağlama',
        slug: 'manuel-yaglama',
        series: []
      },
      {
        name: 'Havalı Çektirme',
        slug: 'havali-cektirme',
        series: []
      },
      {
        name: 'Erozyon Sıvısı',
        slug: 'erozyon-sivisi',
        series: []
      },
      {
        name: 'Kriko',
        slug: 'kriko',
        series: []
      },
      {
        name: 'System 3R',
        slug: 'system-3r',
        series: []
      },
      {
        name: 'Pens Takımı',
        slug: 'pens-takimi',
        series: []
      },
      {
        name: 'Bağlama Seti',
        slug: 'baglama-seti',
        series: []
      },
      {
        name: 'Mengene',
        slug: 'mengene',
        series: []
      },
      {
        name: 'Yan Tarama Kafası',
        slug: 'yan-tarama-kafasi',
        series: []
      },
      {
        name: 'Dijital Sistem',
        slug: 'dijital-sistem',
        series: []
      },
      {
        name: 'Yük Taşıma Arabası',
        slug: 'yuk-tasima-arabasi',
        series: []
      },
      {
        name: 'Korumalık',
        slug: 'korumalik',
        series: []
      }
    ]
  }
];

// productOptions array'ini de kaldıralım çünkü artık kullanmıyoruz 