// Tip tanımlamaları

export type HomeType = 'student' | 'single' | 'family' | 'athlete' | 'couple';

export interface HomeTypeConfig {
  name: string;
  icon: string;
  avgMealsPerDay: number;
  portionMultiplier: number;
  consumptionSpeed: number; // 1-3 arası (1=yavaş, 3=hızlı)
  description: string;
}

export interface UserProfile {
  name: string;
  personCount: number;
  homeType: HomeType;
  allergens: string[];
  culturalPreferences: string[];
  specialOccasion: string;
}

export interface Product {
  id: string;
  name: string;
  category: string;
  quantity: number;
  unit: string;
  expiryDays: number;
  addedDate: string;
  image?: string;
}

export interface Recipe {
  id: string;
  name: string;
  category: string;
  cuisine: string;
  servings: number;
  prepTime: number;
  ingredients: RecipeIngredient[];
  instructions: string[];
  tags: string[];
  occasion?: string;
}

export interface RecipeIngredient {
  name: string;
  quantity: number;
  unit: string;
  allergen?: string;
}

export interface RecipeRecommendation {
  recipe: Recipe;
  matchScore: number;
  matchedProducts: string[];
  expiringProducts: string[];
  missingIngredients: RecipeIngredient[];
  reason: string;
}

export interface MarketPrice {
  market: string;
  price: number;
  distance: number;
  logo?: string;
}

export interface ShoppingItem {
  name: string;
  quantity: number;
  unit: string;
  prices: MarketPrice[];
}

export interface ConsumptionAnalysis {
  totalMeals: number;
  daysWillLast: number;
  wasteRisk: 'low' | 'medium' | 'high';
  status: 'insufficient' | 'optimal' | 'excess';
  suggestions: string[];
}

export interface SelectedProduct {
  productName: string;
  category: string;
  quantity: number;
  unit: string;
  image?: string;
}