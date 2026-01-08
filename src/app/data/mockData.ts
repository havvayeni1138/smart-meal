import { Recipe, MarketPrice, HomeTypeConfig } from '../types';

// Ev tipi konfigürasyonları
export const homeTypeConfigs: Record<string, HomeTypeConfig> = {
  student: {
    name: 'Öğrenci Evi',
    icon: '🎓',
    avgMealsPerDay: 2,
    portionMultiplier: 1,
    consumptionSpeed: 2,
    description: 'Pratik ve ekonomik yemekler'
  },
  single: {
    name: 'Tek Kişilik Ev',
    icon: '🏠',
    avgMealsPerDay: 2.5,
    portionMultiplier: 1,
    consumptionSpeed: 1.5,
    description: 'Dengeli ve öğün çeşitliliği'
  },
  couple: {
    name: 'Çift',
    icon: '💑',
    avgMealsPerDay: 2.5,
    portionMultiplier: 2,
    consumptionSpeed: 2,
    description: 'İki kişilik dengeli beslenme'
  },
  family: {
    name: 'Aile Evi',
    icon: '👨‍👩‍👧‍👦',
    avgMealsPerDay: 3,
    portionMultiplier: 1.5,
    consumptionSpeed: 2.5,
    description: 'Çeşitli ve doyurucu yemekler'
  },
  athlete: {
    name: 'Sporcu Evi',
    icon: '💪',
    avgMealsPerDay: 4,
    portionMultiplier: 1.3,
    consumptionSpeed: 3,
    description: 'Yüksek protein ve enerji'
  }
};

// Ürün görselleri (emoji tabanlı)
export const productImages: Record<string, string> = {
  // Sebzeler
  'Domates': '🍅',
  'Biber': '🫑',
  'Soğan': '🧅',
  'Patates': '🥔',
  'Havuç': '🥕',
  'Patlıcan': '🍆',
  'Sarımsak': '🧄',
  'Salatalık': '🥒',
  'Marul': '🥬',
  
  // Et ve Tavuk
  'Tavuk göğsü': '🍗',
  'Kıyma': '🥩',
  
  // Süt Ürünleri
  'Süt': '🥛',
  'Yumurta': '🥚',
  'Tereyağı': '🧈',
  'Kaşar peyniri': '🧀',
  'Parmesan peyniri': '🧀',
  'Yoğurt': '🥛',
  
  // Baklagiller
  'Kırmızı mercimek': '🫘',
  'Kuru fasulye': '🫘',
  
  // Tahıllar
  'Makarna': '🍝',
  'Pirinç': '🍚',
  'Ekmek': '🍞',
  'Un': '🌾',
  
  // Temel Gıdalar
  'Zeytinyağı': '🫒',
  'Ayçiçek yağı': '🌻',
  'Domates salçası': '🥫',
  'Limon': '🍋',
};

// Mock tarifler
export const mockRecipes: Recipe[] = [
  {
    id: '1',
    name: 'Menemen',
    category: 'Kahvaltı',
    cuisine: 'Türk',
    servings: 2,
    prepTime: 15,
    ingredients: [
      { name: 'Domates', quantity: 3, unit: 'adet' },
      { name: 'Biber', quantity: 2, unit: 'adet' },
      { name: 'Yumurta', quantity: 4, unit: 'adet', allergen: 'yumurta' },
      { name: 'Soğan', quantity: 1, unit: 'adet' },
      { name: 'Tereyağı', quantity: 2, unit: 'yemek kaşığı', allergen: 'süt' },
    ],
    instructions: [
      'Soğanı doğrayın ve tereyağında kavurun',
      'Biberleri ekleyin ve kavurmaya devam edin',
      'Domatesleri ekleyip pişirin',
      'Yumurtaları ekleyip karıştırın',
    ],
    tags: ['kolay', 'hızlı', 'geleneksel'],
  },
  {
    id: '2',
    name: 'Mercimek Çorbası',
    category: 'Çorba',
    cuisine: 'Türk',
    servings: 4,
    prepTime: 30,
    ingredients: [
      { name: 'Kırmızı mercimek', quantity: 1, unit: 'su bardağı' },
      { name: 'Soğan', quantity: 1, unit: 'adet' },
      { name: 'Havuç', quantity: 1, unit: 'adet' },
      { name: 'Patates', quantity: 1, unit: 'adet' },
      { name: 'Domates salçası', quantity: 1, unit: 'yemek kaşığı' },
      { name: 'Tereyağı', quantity: 2, unit: 'yemek kaşığı', allergen: 'süt' },
    ],
    instructions: [
      'Sebzeleri doğrayın',
      'Tereyağında kavurun',
      'Mercimek ve suyu ekleyip pişirin',
      'Blenderdan geçirip servis edin',
    ],
    tags: ['sağlıklı', 'kolay', 'ekonomik'],
  },
  {
    id: '3',
    name: 'Tavuk Güveç',
    category: 'Ana Yemek',
    cuisine: 'Türk',
    servings: 4,
    prepTime: 60,
    ingredients: [
      { name: 'Tavuk göğsü', quantity: 500, unit: 'gram' },
      { name: 'Patates', quantity: 3, unit: 'adet' },
      { name: 'Havuç', quantity: 2, unit: 'adet' },
      { name: 'Domates', quantity: 3, unit: 'adet' },
      { name: 'Biber', quantity: 2, unit: 'adet' },
      { name: 'Soğan', quantity: 1, unit: 'adet' },
    ],
    instructions: [
      'Tavuğu küp şeklinde doğrayın',
      'Sebzeleri küp şeklinde kesin',
      'Tüm malzemeleri güveç kabında karıştırın',
      'Fırında 180 derecede 45 dakika pişirin',
    ],
    tags: ['özel', 'lezzetli', 'besleyici'],
    occasion: 'Aile yemeği',
  },
  {
    id: '4',
    name: 'Makarna',
    category: 'Ana Yemek',
    cuisine: 'İtalyan',
    servings: 3,
    prepTime: 20,
    ingredients: [
      { name: 'Makarna', quantity: 300, unit: 'gram', allergen: 'gluten' },
      { name: 'Domates', quantity: 4, unit: 'adet' },
      { name: 'Sarımsak', quantity: 3, unit: 'diş' },
      { name: 'Parmesan peyniri', quantity: 50, unit: 'gram', allergen: 'süt' },
      { name: 'Zeytinyağı', quantity: 3, unit: 'yemek kaşığı' },
    ],
    instructions: [
      'Makarnayı kaynar tuzlu suda haşlayın',
      'Sarımsağı zeytinyağında kavurun',
      'Domatesleri ekleyip sos yapın',
      'Makarnayı sosla karıştırıp servis edin',
    ],
    tags: ['hızlı', 'kolay', 'pratik'],
  },
  {
    id: '5',
    name: 'Patlıcan Musakka',
    category: 'Ana Yemek',
    cuisine: 'Türk',
    servings: 4,
    prepTime: 75,
    ingredients: [
      { name: 'Patlıcan', quantity: 4, unit: 'adet' },
      { name: 'Kıyma', quantity: 300, unit: 'gram' },
      { name: 'Domates', quantity: 3, unit: 'adet' },
      { name: 'Soğan', quantity: 2, unit: 'adet' },
      { name: 'Süt', quantity: 1, unit: 'su bardağı', allergen: 'süt' },
      { name: 'Un', quantity: 2, unit: 'yemek kaşığı', allergen: 'gluten' },
    ],
    instructions: [
      'Patlıcanları dilimleyip kızartın',
      'Kıymayı soğanla kavurup sosu hazırlayın',
      'Beşamel sos yapın',
      'Katmanları dizin ve fırında pişirin',
    ],
    tags: ['özel', 'geleneksel', 'lezzetli'],
    occasion: 'Misafir ağırlama',
  },
  {
    id: '6',
    name: 'Omlet',
    category: 'Kahvaltı',
    cuisine: 'Uluslararası',
    servings: 2,
    prepTime: 10,
    ingredients: [
      { name: 'Yumurta', quantity: 4, unit: 'adet', allergen: 'yumurta' },
      { name: 'Süt', quantity: 50, unit: 'ml', allergen: 'süt' },
      { name: 'Domates', quantity: 1, unit: 'adet' },
      { name: 'Biber', quantity: 1, unit: 'adet' },
      { name: 'Tereyağı', quantity: 1, unit: 'yemek kaşığı', allergen: 'süt' },
    ],
    instructions: [
      'Yumurtaları çırpın',
      'Sebzeleri ince doğrayın',
      'Tereyağında sebzeleri soteleyin',
      'Yumurtaları dökün ve pişirin',
    ],
    tags: ['hızlı', 'kolay', 'protein'],
  },
  {
    id: '7',
    name: 'Sebze Sote',
    category: 'Yan Yemek',
    cuisine: 'Sağlıklı',
    servings: 3,
    prepTime: 20,
    ingredients: [
      { name: 'Havuç', quantity: 2, unit: 'adet' },
      { name: 'Patates', quantity: 2, unit: 'adet' },
      { name: 'Biber', quantity: 2, unit: 'adet' },
      { name: 'Soğan', quantity: 1, unit: 'adet' },
      { name: 'Zeytinyağı', quantity: 3, unit: 'yemek kaşığı' },
    ],
    instructions: [
      'Tüm sebzeleri küp şeklinde doğrayın',
      'Zeytinyağında önce soğanı kavurun',
      'Diğer sebzeleri ekleyip soteleyin',
      'Tuz ve baharatla tatlandırın',
    ],
    tags: ['sağlıklı', 'vegan', 'kolay'],
  },
  {
    id: '8',
    name: 'Domates Çorbası',
    category: 'Çorba',
    cuisine: 'Türk',
    servings: 4,
    prepTime: 25,
    ingredients: [
      { name: 'Domates', quantity: 6, unit: 'adet' },
      { name: 'Un', quantity: 2, unit: 'yemek kaşığı', allergen: 'gluten' },
      { name: 'Tereyağı', quantity: 2, unit: 'yemek kaşığı', allergen: 'süt' },
      { name: 'Süt', quantity: 1, unit: 'su bardağı', allergen: 'süt' },
      { name: 'Soğan', quantity: 1, unit: 'adet' },
    ],
    instructions: [
      'Domatesleri rendeleyin',
      'Tereyağında unu kavurun',
      'Domates ve suyu ekleyin',
      'Süt ekleyip karıştırarak pişirin',
    ],
    tags: ['klasik', 'sıcak', 'rahatlatıcı'],
  },
  {
    id: '9',
    name: 'Patates Kızartması',
    category: 'Yan Yemek',
    cuisine: 'Uluslararası',
    servings: 3,
    prepTime: 25,
    ingredients: [
      { name: 'Patates', quantity: 4, unit: 'adet' },
      { name: 'Ayçiçek yağı', quantity: 500, unit: 'ml' },
    ],
    instructions: [
      'Patatesleri çubuk şeklinde kesin',
      'Suda bekletin ve kurulayın',
      'Kızgın yağda kızartın',
      'Tuz ekleyip servis edin',
    ],
    tags: ['hızlı', 'çıtır', 'pratik'],
  },
  {
    id: '10',
    name: 'Peynirli Sandviç',
    category: 'Kahvaltı',
    cuisine: 'Uluslararası',
    servings: 2,
    prepTime: 10,
    ingredients: [
      { name: 'Ekmek', quantity: 4, unit: 'dilim', allergen: 'gluten' },
      { name: 'Kaşar peyniri', quantity: 4, unit: 'dilim', allergen: 'süt' },
      { name: 'Domates', quantity: 1, unit: 'adet' },
      { name: 'Tereyağı', quantity: 2, unit: 'yemek kaşığı', allergen: 'süt' },
    ],
    instructions: [
      'Ekmekleri yağlayın',
      'Peynir ve domates ekleyin',
      'Tost makinesinde veya tavada kızartın',
    ],
    tags: ['hızlı', 'kolay', 'pratik'],
  },
  {
    id: '11',
    name: 'Tavuk Döner',
    category: 'Ana Yemek',
    cuisine: 'Türk',
    servings: 4,
    prepTime: 90,
    ingredients: [
      { name: 'Tavuk göğsü', quantity: 800, unit: 'gram' },
      { name: 'Soğan', quantity: 2, unit: 'adet' },
      { name: 'Yoğurt', quantity: 100, unit: 'gram', allergen: 'süt' },
      { name: 'Domates', quantity: 2, unit: 'adet' },
      { name: 'Biber', quantity: 2, unit: 'adet' },
    ],
    instructions: [
      'Tavukları marine edin',
      'Fırında yavaş pişirin',
      'İnce dilimler halinde kesin',
      'Sebzelerle servis edin',
    ],
    tags: ['lezzetli', 'özel', 'besleyici'],
    occasion: 'Hafta sonu',
  },
  {
    id: '12',
    name: 'Salata',
    category: 'Yan Yemek',
    cuisine: 'Sağlıklı',
    servings: 2,
    prepTime: 10,
    ingredients: [
      { name: 'Marul', quantity: 1, unit: 'adet' },
      { name: 'Domates', quantity: 2, unit: 'adet' },
      { name: 'Salatalık', quantity: 1, unit: 'adet' },
      { name: 'Zeytinyağı', quantity: 2, unit: 'yemek kaşığı' },
      { name: 'Limon', quantity: 1, unit: 'adet' },
    ],
    instructions: [
      'Sebzeleri yıkayın',
      'İstediğiniz şekilde doğrayın',
      'Zeytinyağı ve limonla tatlandırın',
    ],
    tags: ['sağlıklı', 'hızlı', 'hafif'],
  },
  {
    id: '13',
    name: 'Pilav',
    category: 'Yan Yemek',
    cuisine: 'Türk',
    servings: 4,
    prepTime: 30,
    ingredients: [
      { name: 'Pirinç', quantity: 2, unit: 'su bardağı' },
      { name: 'Tereyağı', quantity: 2, unit: 'yemek kaşığı', allergen: 'süt' },
    ],
    instructions: [
      'Pirinci yıkayın',
      'Tereyağında kavurun',
      'Su ekleyip pişirin',
      'Dinlendirip servis edin',
    ],
    tags: ['klasik', 'temel', 'kolay'],
  },
  {
    id: '14',
    name: 'İmam Bayıldı',
    category: 'Ana Yemek',
    cuisine: 'Türk',
    servings: 4,
    prepTime: 90,
    ingredients: [
      { name: 'Patlıcan', quantity: 6, unit: 'adet' },
      { name: 'Soğan', quantity: 3, unit: 'adet' },
      { name: 'Domates', quantity: 4, unit: 'adet' },
      { name: 'Sarımsak', quantity: 5, unit: 'diş' },
      { name: 'Zeytinyağı', quantity: 200, unit: 'ml' },
    ],
    instructions: [
      'Patlıcanları kızartın',
      'İç harcı hazırlayın',
      'Patlıcanları doldurun',
      'Yavaş ateşte pişirin',
    ],
    tags: ['geleneksel', 'özel', 'zeytinyağlı'],
    occasion: 'Misafir ağırlama',
  },
  {
    id: '15',
    name: 'Kuru Fasulye',
    category: 'Ana Yemek',
    cuisine: 'Türk',
    servings: 5,
    prepTime: 120,
    ingredients: [
      { name: 'Kuru fasulye', quantity: 300, unit: 'gram' },
      { name: 'Soğan', quantity: 2, unit: 'adet' },
      { name: 'Domates salçası', quantity: 2, unit: 'yemek kaşığı' },
      { name: 'Tereyağı', quantity: 2, unit: 'yemek kaşığı', allergen: 'süt' },
    ],
    instructions: [
      'Fasulyeleri bir gece önceden ıslatın',
      'Haşlayın',
      'Soğan ve salçayla kavrulmuş yağ hazırlayın',
      'Birleştirip pişirin',
    ],
    tags: ['geleneksel', 'doyurucu', 'ekonomik'],
  },
];

// Ürün kategorileri ve tahmini bozulma süreleri
export const productCategories = {
  'Sebze': 7,
  'Meyve': 5,
  'Süt Ürünleri': 7,
  'Et ve Tavuk': 3,
  'Balık': 2,
  'Baklagil': 365,
  'Tahıl': 180,
  'Şarküteri': 7,
  'Temel Gıda': 365,
  'Baharat': 365,
  'Yağlar': 180,
};

// Ürün listesi (kullanıcının seçeceği)
export const availableProducts = [
  // Sebzeler
  { name: 'Domates', category: 'Sebze', defaultUnit: 'adet' },
  { name: 'Biber', category: 'Sebze', defaultUnit: 'adet' },
  { name: 'Soğan', category: 'Sebze', defaultUnit: 'adet' },
  { name: 'Patates', category: 'Sebze', defaultUnit: 'adet' },
  { name: 'Havuç', category: 'Sebze', defaultUnit: 'adet' },
  { name: 'Patlıcan', category: 'Sebze', defaultUnit: 'adet' },
  { name: 'Sarımsak', category: 'Sebze', defaultUnit: 'diş' },
  { name: 'Salatalık', category: 'Sebze', defaultUnit: 'adet' },
  { name: 'Marul', category: 'Sebze', defaultUnit: 'adet' },
  
  // Et ve Tavuk
  { name: 'Tavuk göğsü', category: 'Et ve Tavuk', defaultUnit: 'gram' },
  { name: 'Kıyma', category: 'Et ve Tavuk', defaultUnit: 'gram' },
  
  // Süt Ürünleri
  { name: 'Süt', category: 'Süt Ürünleri', defaultUnit: 'ml', allergen: 'süt' },
  { name: 'Yumurta', category: 'Süt Ürünleri', defaultUnit: 'adet', allergen: 'yumurta' },
  { name: 'Tereyağı', category: 'Süt Ürünleri', defaultUnit: 'gram', allergen: 'süt' },
  { name: 'Kaşar peyniri', category: 'Süt Ürünleri', defaultUnit: 'gram', allergen: 'süt' },
  { name: 'Parmesan peyniri', category: 'Süt Ürünleri', defaultUnit: 'gram', allergen: 'süt' },
  { name: 'Yoğurt', category: 'Süt Ürünleri', defaultUnit: 'gram', allergen: 'süt' },
  
  // Baklagiller
  { name: 'Kırmızı mercimek', category: 'Baklagil', defaultUnit: 'gram' },
  { name: 'Kuru fasulye', category: 'Baklagil', defaultUnit: 'gram' },
  
  // Tahıllar
  { name: 'Makarna', category: 'Tahıl', defaultUnit: 'gram', allergen: 'gluten' },
  { name: 'Pirinç', category: 'Tahıl', defaultUnit: 'gram' },
  { name: 'Ekmek', category: 'Tahıl', defaultUnit: 'dilim', allergen: 'gluten' },
  { name: 'Un', category: 'Tahıl', defaultUnit: 'gram', allergen: 'gluten' },
  
  // Temel Gıdalar
  { name: 'Zeytinyağı', category: 'Yağlar', defaultUnit: 'ml' },
  { name: 'Ayçiçek yağı', category: 'Yağlar', defaultUnit: 'ml' },
  { name: 'Domates salçası', category: 'Temel Gıda', defaultUnit: 'yemek kaşığı' },
  { name: 'Limon', category: 'Meyve', defaultUnit: 'adet' },
];

// Market fiyat simülasyonu
export const marketPriceDatabase: { [key: string]: MarketPrice[] } = {
  'Domates': [
    { market: 'Migros', price: 15.50, distance: 1.2 },
    { market: 'A101', price: 12.90, distance: 0.8 },
    { market: 'ŞOK', price: 13.50, distance: 1.5 },
    { market: 'Carrefour', price: 16.00, distance: 2.0 },
  ],
  'Biber': [
    { market: 'Migros', price: 22.50, distance: 1.2 },
    { market: 'A101', price: 19.90, distance: 0.8 },
    { market: 'ŞOK', price: 20.50, distance: 1.5 },
    { market: 'Carrefour', price: 23.00, distance: 2.0 },
  ],
  'Soğan': [
    { market: 'Migros', price: 8.50, distance: 1.2 },
    { market: 'A101', price: 7.90, distance: 0.8 },
    { market: 'ŞOK', price: 8.00, distance: 1.5 },
    { market: 'Carrefour', price: 9.00, distance: 2.0 },
  ],
  'Patates': [
    { market: 'Migros', price: 10.50, distance: 1.2 },
    { market: 'A101', price: 9.50, distance: 0.8 },
    { market: 'ŞOK', price: 9.90, distance: 1.5 },
    { market: 'Carrefour', price: 11.00, distance: 2.0 },
  ],
  'Havuç': [
    { market: 'Migros', price: 12.00, distance: 1.2 },
    { market: 'A101', price: 10.90, distance: 0.8 },
    { market: 'ŞOK', price: 11.50, distance: 1.5 },
    { market: 'Carrefour', price: 12.50, distance: 2.0 },
  ],
  'Patlıcan': [
    { market: 'Migros', price: 28.00, distance: 1.2 },
    { market: 'A101', price: 25.90, distance: 0.8 },
    { market: 'ŞOK', price: 26.50, distance: 1.5 },
    { market: 'Carrefour', price: 29.00, distance: 2.0 },
  ],
  'Tavuk göğsü': [
    { market: 'Migros', price: 95.00, distance: 1.2 },
    { market: 'A101', price: 89.90, distance: 0.8 },
    { market: 'ŞOK', price: 92.00, distance: 1.5 },
    { market: 'Carrefour', price: 98.00, distance: 2.0 },
  ],
  'Kıyma': [
    { market: 'Migros', price: 180.00, distance: 1.2 },
    { market: 'A101', price: 175.00, distance: 0.8 },
    { market: 'ŞOK', price: 178.00, distance: 1.5 },
    { market: 'Carrefour', price: 185.00, distance: 2.0 },
  ],
  'Yumurta': [
    { market: 'Migros', price: 4.50, distance: 1.2 },
    { market: 'A101', price: 4.20, distance: 0.8 },
    { market: 'ŞOK', price: 4.30, distance: 1.5 },
    { market: 'Carrefour', price: 4.70, distance: 2.0 },
  ],
  'Süt': [
    { market: 'Migros', price: 22.50, distance: 1.2 },
    { market: 'A101', price: 20.90, distance: 0.8 },
    { market: 'ŞOK', price: 21.50, distance: 1.5 },
    { market: 'Carrefour', price: 23.00, distance: 2.0 },
  ],
  'Tereyağı': [
    { market: 'Migros', price: 85.00, distance: 1.2 },
    { market: 'A101', price: 79.90, distance: 0.8 },
    { market: 'ŞOK', price: 82.00, distance: 1.5 },
    { market: 'Carrefour', price: 87.00, distance: 2.0 },
  ],
  'Kaşar peyniri': [
    { market: 'Migros', price: 120.00, distance: 1.2 },
    { market: 'A101', price: 115.00, distance: 0.8 },
    { market: 'ŞOK', price: 118.00, distance: 1.5 },
    { market: 'Carrefour', price: 125.00, distance: 2.0 },
  ],
  'Makarna': [
    { market: 'Migros', price: 18.50, distance: 1.2 },
    { market: 'A101', price: 16.90, distance: 0.8 },
    { market: 'ŞOK', price: 17.50, distance: 1.5 },
    { market: 'Carrefour', price: 19.00, distance: 2.0 },
  ],
  'Pirinç': [
    { market: 'Migros', price: 35.00, distance: 1.2 },
    { market: 'A101', price: 32.90, distance: 0.8 },
    { market: 'ŞOK', price: 34.00, distance: 1.5 },
    { market: 'Carrefour', price: 36.00, distance: 2.0 },
  ],
  'Kırmızı mercimek': [
    { market: 'Migros', price: 28.00, distance: 1.2 },
    { market: 'A101', price: 25.90, distance: 0.8 },
    { market: 'ŞOK', price: 27.00, distance: 1.5 },
    { market: 'Carrefour', price: 29.00, distance: 2.0 },
  ],
  'Zeytinyağı': [
    { market: 'Migros', price: 180.00, distance: 1.2 },
    { market: 'A101', price: 165.00, distance: 0.8 },
    { market: 'ŞOK', price: 172.00, distance: 1.5 },
    { market: 'Carrefour', price: 185.00, distance: 2.0 },
  ],
  'Ekmek': [
    { market: 'Migros', price: 8.00, distance: 1.2 },
    { market: 'A101', price: 7.50, distance: 0.8 },
    { market: 'ŞOK', price: 7.75, distance: 1.5 },
    { market: 'Carrefour', price: 8.50, distance: 2.0 },
  ],
  'Domates salçası': [
    { market: 'Migros', price: 25.00, distance: 1.2 },
    { market: 'A101', price: 22.90, distance: 0.8 },
    { market: 'ŞOK', price: 24.00, distance: 1.5 },
    { market: 'Carrefour', price: 26.00, distance: 2.0 },
  ],
};

// Alerjenler
export const allergensList = [
  'süt',
  'yumurta',
  'gluten',
  'fındık',
  'yer fıstığı',
  'balık',
  'kabuklu deniz ürünleri',
  'soya',
];

// Kültürel tercihler
export const culturalPreferences = [
  'Türk',
  'İtalyan',
  'Uzak Doğu',
  'Akdeniz',
  'Vegan',
  'Vejetaryen',
  'Helal',
  'Uluslararası',
];

// Özel günler
export const specialOccasions = [
  'Günlük',
  'Hafta sonu',
  'Misafir ağırlama',
  'Aile yemeği',
  'Romantik akşam',
  'Çocuklu aile',
  'Bayram',
  'Doğum günü',
];