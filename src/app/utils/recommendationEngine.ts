import { Product, Recipe, RecipeRecommendation, UserProfile, RecipeIngredient } from '../types';

// Kural tabanlı tarif önerme motoru
export class RecommendationEngine {
  private products: Product[];
  private recipes: Recipe[];
  private userProfile: UserProfile;

  constructor(products: Product[], recipes: Recipe[], userProfile: UserProfile) {
    this.products = products;
    this.recipes = recipes;
    this.userProfile = userProfile;
  }

  // Ana öneri fonksiyonu
  getRecommendations(): RecipeRecommendation[] {
    const recommendations: RecipeRecommendation[] = [];

    for (const recipe of this.recipes) {
      // 1. Alerjen kontrolü - alerji varsa bu tarifi gösterme
      if (this.hasAllergen(recipe)) {
        continue;
      }

      // 2. Kişi sayısı uygunluğu kontrolü (±2 kişi tolerans)
      const servingSizeDiff = Math.abs(recipe.servings - this.userProfile.personCount);
      if (servingSizeDiff > 2) {
        continue; // Çok büyük fark varsa atla
      }

      // 3. Kültürel tercih kontrolü
      if (!this.matchesCulturalPreference(recipe)) {
        continue;
      }

      // 4. Özel gün kontrolü
      if (!this.matchesOccasion(recipe)) {
        continue;
      }

      // 5. Malzeme eşleştirme ve skorlama
      const matchResult = this.calculateMatch(recipe);
      
      if (matchResult.matchScore > 0) {
        const recommendation: RecipeRecommendation = {
          recipe,
          matchScore: matchResult.matchScore,
          matchedProducts: matchResult.matchedProducts,
          expiringProducts: matchResult.expiringProducts,
          missingIngredients: matchResult.missingIngredients,
          reason: this.generateReason(matchResult, recipe),
        };
        recommendations.push(recommendation);
      }
    }

    // Skorlara göre sırala (en yüksek skor en üstte)
    recommendations.sort((a, b) => b.matchScore - a.matchScore);

    return recommendations;
  }

  // Tarif alerjen içeriyor mu?
  private hasAllergen(recipe: Recipe): boolean {
    for (const ingredient of recipe.ingredients) {
      if (ingredient.allergen && this.userProfile.allergens.includes(ingredient.allergen)) {
        return true;
      }
    }
    return false;
  }

  // Kültürel tercih eşleşiyor mu?
  private matchesCulturalPreference(recipe: Recipe): boolean {
    if (this.userProfile.culturalPreferences.length === 0) {
      return true; // Tercih yoksa hepsini göster
    }

    // "Sağlıklı" tercihi özel - vegan/vejetaryen gibi
    if (this.userProfile.culturalPreferences.includes('Vegan')) {
      // Hayvansal ürün var mı kontrol et
      const hasAnimalProduct = recipe.ingredients.some(ing => 
        ing.allergen === 'süt' || ing.allergen === 'yumurta' || 
        ing.name.toLowerCase().includes('et') || 
        ing.name.toLowerCase().includes('tavuk') ||
        ing.name.toLowerCase().includes('balık')
      );
      if (hasAnimalProduct) return false;
    }

    if (this.userProfile.culturalPreferences.includes('Vejetaryen')) {
      // Et ürünü var mı kontrol et
      const hasMeat = recipe.ingredients.some(ing => 
        ing.name.toLowerCase().includes('et') || 
        ing.name.toLowerCase().includes('tavuk') ||
        ing.name.toLowerCase().includes('balık') ||
        ing.name.toLowerCase().includes('kıyma')
      );
      if (hasMeat) return false;
    }

    return this.userProfile.culturalPreferences.some(pref => 
      recipe.cuisine === pref || recipe.tags.includes(pref.toLowerCase())
    );
  }

  // Özel gün eşleşiyor mu?
  private matchesOccasion(recipe: Recipe): boolean {
    if (this.userProfile.specialOccasion === 'Günlük') {
      return true; // Günlük ise her tarif uygun
    }

    if (!recipe.occasion) {
      return this.userProfile.specialOccasion === 'Günlük';
    }

    return recipe.occasion === this.userProfile.specialOccasion;
  }

  // Malzeme eşleştirme ve skorlama
  private calculateMatch(recipe: Recipe): {
    matchScore: number;
    matchedProducts: string[];
    expiringProducts: string[];
    missingIngredients: RecipeIngredient[];
  } {
    const matchedProducts: string[] = [];
    const expiringProducts: string[] = [];
    const missingIngredients: RecipeIngredient[] = [];
    
    let totalIngredients = recipe.ingredients.length;
    let matchedCount = 0;
    let expiringScore = 0;

    for (const ingredient of recipe.ingredients) {
      const product = this.findProduct(ingredient.name);
      
      if (product) {
        matchedCount++;
        matchedProducts.push(product.name);
        
        // Bozulmaya yakın ürünler için ekstra puan
        if (product.expiryDays <= 3) {
          expiringScore += 30; // Çok yakın
          expiringProducts.push(product.name);
        } else if (product.expiryDays <= 7) {
          expiringScore += 15; // Yakın
          expiringProducts.push(product.name);
        }
      } else {
        missingIngredients.push(ingredient);
      }
    }

    // Eşleşme yüzdesi (0-100)
    const matchPercentage = (matchedCount / totalIngredients) * 100;
    
    // Toplam skor = Eşleşme skoru + Bozulma skoru
    // En az %40 malzeme eşleşmesi gerekli
    if (matchPercentage < 40) {
      return { matchScore: 0, matchedProducts: [], expiringProducts: [], missingIngredients: [] };
    }

    const matchScore = matchPercentage + expiringScore;

    return { matchScore, matchedProducts, expiringProducts, missingIngredients };
  }

  // Ürün bul (benzer isimler için)
  private findProduct(ingredientName: string): Product | undefined {
    const normalizedIngredient = ingredientName.toLowerCase().trim();
    
    return this.products.find(product => {
      const normalizedProduct = product.name.toLowerCase().trim();
      return normalizedProduct === normalizedIngredient || 
             normalizedProduct.includes(normalizedIngredient) ||
             normalizedIngredient.includes(normalizedProduct);
    });
  }

  // Öneri nedeni oluştur
  private generateReason(matchResult: any, recipe: Recipe): string {
    const reasons: string[] = [];

    // Bozulma durumu
    if (matchResult.expiringProducts.length > 0) {
      const expiringList = matchResult.expiringProducts.slice(0, 2).join(', ');
      reasons.push(`🔴 Bozulmaya yakın ürünler: ${expiringList}`);
    }

    // Eşleşme oranı
    const matchPercentage = Math.round(
      (matchResult.matchedProducts.length / recipe.ingredients.length) * 100
    );
    reasons.push(`✅ Elinizdeki malzemelerle %${matchPercentage} eşleşiyor`);

    // Eksik malzemeler
    if (matchResult.missingIngredients.length > 0) {
      reasons.push(`🛒 ${matchResult.missingIngredients.length} malzeme eksik`);
    } else {
      reasons.push(`🎉 Tüm malzemeler elinizde!`);
    }

    // Kişi sayısı
    if (recipe.servings === this.userProfile.personCount) {
      reasons.push(`👥 ${this.userProfile.personCount} kişilik porsiyon`);
    }

    // Özel gün
    if (recipe.occasion && recipe.occasion === this.userProfile.specialOccasion) {
      reasons.push(`🎊 ${this.userProfile.specialOccasion} için uygun`);
    }

    return reasons.join(' • ');
  }
}
