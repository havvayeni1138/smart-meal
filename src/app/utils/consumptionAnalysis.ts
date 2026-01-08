import { ConsumptionAnalysis, UserProfile, SelectedProduct } from '../types';
import { homeTypeConfigs } from '../data/mockData';

// Ev tipi bazlı tüketim analizi
export function analyzeConsumption(
  selectedProducts: SelectedProduct[],
  userProfile: UserProfile
): ConsumptionAnalysis {
  const homeConfig = homeTypeConfigs[userProfile.homeType];
  
  // Ortalama günlük öğün sayısı
  const mealsPerDay = homeConfig.avgMealsPerDay;
  
  // Toplam kişi sayısı
  const totalPersons = userProfile.personCount;
  
  // Tahmini toplam öğün hesaplama (basitleştirilmiş)
  // Her ürünün kaç öğün için yeterli olduğunu hesapla
  let totalMealCapacity = 0;
  
  selectedProducts.forEach(product => {
    // Basit hesaplama: Her ürün kategorisine göre öğün kapasitesi
    let mealCapacity = 0;
    
    if (product.category === 'Sebze') {
      // Her 3 sebze 1 öğün için yeterli kabul ediyoruz
      mealCapacity = product.quantity / 3;
    } else if (product.category === 'Et ve Tavuk') {
      // Her 200gr et/tavuk 1 kişi için 1 öğün
      mealCapacity = product.quantity / (200 * totalPersons);
    } else if (product.category === 'Süt Ürünleri') {
      if (product.productName === 'Yumurta') {
        mealCapacity = product.quantity / (2 * totalPersons); // 2 yumurta/kişi
      } else if (product.productName === 'Süt') {
        mealCapacity = product.quantity / (200 * totalPersons); // 200ml/kişi
      } else {
        mealCapacity = product.quantity / (100 * totalPersons);
      }
    } else if (product.category === 'Tahıl') {
      if (product.productName === 'Ekmek') {
        mealCapacity = product.quantity / totalPersons; // 1 dilim/kişi
      } else {
        mealCapacity = product.quantity / (100 * totalPersons); // 100gr/kişi
      }
    } else if (product.category === 'Baklagil') {
      mealCapacity = product.quantity / (100 * totalPersons);
    } else {
      mealCapacity = product.quantity / 5; // Genel hesap
    }
    
    totalMealCapacity += mealCapacity;
  });
  
  // Günlük öğün ihtiyacı
  const dailyMealNeed = mealsPerDay * totalPersons;
  
  // Kaç gün yeteceği
  const daysWillLast = totalMealCapacity / dailyMealNeed;
  
  // İsraf riski ve durum belirleme
  let wasteRisk: 'low' | 'medium' | 'high';
  let status: 'insufficient' | 'optimal' | 'excess';
  const suggestions: string[] = [];
  
  // Tüketim hızına göre ayarlama
  const adjustedDays = daysWillLast / homeConfig.consumptionSpeed;
  
  if (adjustedDays < 2) {
    status = 'insufficient';
    wasteRisk = 'low';
    suggestions.push('⚠️ Ürünleriniz çok az! Acil alışveriş yapmanız önerilir.');
    suggestions.push(`📅 Mevcut ürünler yaklaşık ${Math.ceil(adjustedDays)} gün yetecek.`);
    suggestions.push(`🛒 ${homeConfig.name} için en az 3-4 günlük ürün bulundurmanız önerilir.`);
  } else if (adjustedDays >= 2 && adjustedDays <= 7) {
    status = 'optimal';
    wasteRisk = 'low';
    suggestions.push('✅ Ürün miktarınız ideal seviyede!');
    suggestions.push(`📅 Mevcut ürünler yaklaşık ${Math.ceil(adjustedDays)} gün yetecek.`);
    suggestions.push('💡 Bozulmaya yakın ürünleri öncelikle kullanmayı unutmayın.');
  } else if (adjustedDays > 7 && adjustedDays <= 14) {
    status = 'excess';
    wasteRisk = 'medium';
    suggestions.push('⚡ Ürün miktarınız fazla olabilir.');
    suggestions.push(`📅 Mevcut ürünler yaklaşık ${Math.ceil(adjustedDays)} gün yetecek.`);
    suggestions.push(`🗑️ ${homeConfig.name} için israf riski var! Hızlı tüketilmesi gereken yemekler yapın.`);
    suggestions.push('🥘 Toplu yemek pişirip dondurabilirsiniz.');
  } else {
    status = 'excess';
    wasteRisk = 'high';
    suggestions.push('🚨 Çok fazla ürün var! Yüksek israf riski!');
    suggestions.push(`📅 Mevcut ürünler yaklaşık ${Math.ceil(adjustedDays)} gün yetecek.`);
    suggestions.push('🗑️ Bu miktar ürün bozulabilir. Hemen harekete geçin!');
    suggestions.push('👨‍🍳 Toplu yemek yapıp dondurma önerilir.');
    suggestions.push('🎁 Komşularınızla paylaşmayı düşünün.');
  }
  
  // Ev tipine özel öneriler
  if (homeConfig.consumptionSpeed >= 2.5) {
    suggestions.push(`💪 ${homeConfig.name} için protein ağırlıklı tarifler önerilir.`);
  }
  
  if (homeConfig.avgMealsPerDay >= 3) {
    suggestions.push('🍽️ Çeşitli öğünler için farklı tarifler deneyin.');
  }
  
  return {
    totalMeals: Math.round(totalMealCapacity),
    daysWillLast: Math.ceil(adjustedDays),
    wasteRisk,
    status,
    suggestions,
  };
}
