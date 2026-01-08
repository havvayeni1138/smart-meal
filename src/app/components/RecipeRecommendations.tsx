import React, { useState } from 'react';
import { RecipeRecommendation } from '../types';
import { ChefHat, Clock, Users, ShoppingBag, CheckCircle2, AlertCircle, Sparkles } from 'lucide-react';
import { RecipeDetailModal } from './RecipeDetailModal';

interface RecipeRecommendationsProps {
  recommendations: RecipeRecommendation[];
  onSelectRecipe: (recommendation: RecipeRecommendation) => void;
}

export function RecipeRecommendations({ recommendations, onSelectRecipe }: RecipeRecommendationsProps) {
  const [selectedRecipe, setSelectedRecipe] = useState<RecipeRecommendation | null>(null);

  if (recommendations.length === 0) {
    return (
      <div className="max-w-4xl mx-auto p-6">
        <div className="bg-gray-50 rounded-2xl p-12 text-center">
          <ChefHat className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <h3 className="mb-2 text-gray-600">Henüz tarif önerisi yok</h3>
          <p className="text-gray-500">
            Profil bilgilerinizi ve dolabınızdaki ürünleri ekleyerek size özel tarif önerileri alın
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto p-6">
      <div className="mb-8">
        <h2 className="mb-2 flex items-center gap-2">
          <Sparkles className="w-7 h-7 text-orange-500" />
          Size Özel Tarif Önerileri
        </h2>
        <p className="text-gray-600">
          {recommendations.length} tarif sizin için önerildi
        </p>
      </div>

      <div className="space-y-4">
        {recommendations.map((recommendation) => (
          <div
            key={recommendation.recipe.id}
            className="bg-white rounded-2xl shadow-lg border-2 border-gray-100 overflow-hidden hover:shadow-xl transition-all"
          >
            <div className="p-6">
              {/* Başlık ve Skor */}
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <h3 className="mb-2">{recommendation.recipe.name}</h3>
                  <div className="flex flex-wrap gap-2 mb-3">
                    <span className="px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-sm">
                      {recommendation.recipe.category}
                    </span>
                    <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm">
                      {recommendation.recipe.cuisine}
                    </span>
                    {recommendation.recipe.tags.map(tag => (
                      <span key={tag} className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm">
                        #{tag}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Eşleşme Skoru */}
                <div className="ml-4 text-center">
                  <div className="w-16 h-16 rounded-full bg-gradient-to-br from-orange-400 to-red-500 flex items-center justify-center mb-1">
                    <span className="text-white font-bold">{Math.round(recommendation.matchScore)}</span>
                  </div>
                  <p className="text-xs text-gray-600">Skor</p>
                </div>
              </div>

              {/* Bilgiler */}
              <div className="flex flex-wrap gap-4 mb-4 text-sm text-gray-600">
                <div className="flex items-center gap-1">
                  <Clock className="w-4 h-4" />
                  <span>{recommendation.recipe.prepTime} dk</span>
                </div>
                <div className="flex items-center gap-1">
                  <Users className="w-4 h-4" />
                  <span>{recommendation.recipe.servings} kişilik</span>
                </div>
                <div className="flex items-center gap-1">
                  <CheckCircle2 className="w-4 h-4 text-green-600" />
                  <span>{recommendation.matchedProducts.length} malzeme mevcut</span>
                </div>
                {recommendation.missingIngredients.length > 0 && (
                  <div className="flex items-center gap-1">
                    <ShoppingBag className="w-4 h-4 text-orange-600" />
                    <span>{recommendation.missingIngredients.length} malzeme eksik</span>
                  </div>
                )}
              </div>

              {/* Öneri Nedeni */}
              <div className="bg-gradient-to-r from-orange-50 to-red-50 rounded-xl p-4 mb-4">
                <p className="text-sm text-gray-700">
                  <strong className="text-orange-700">Neden bu tarif?</strong> {recommendation.reason}
                </p>
              </div>

              {/* Eşleşen Ürünler */}
              {recommendation.matchedProducts.length > 0 && (
                <div className="mb-4">
                  <p className="text-sm font-medium text-gray-700 mb-2">✅ Elinizde var:</p>
                  <div className="flex flex-wrap gap-2">
                    {recommendation.matchedProducts.map((product, idx) => (
                      <span
                        key={idx}
                        className={`px-3 py-1 rounded-full text-sm ${
                          recommendation.expiringProducts.includes(product)
                            ? 'bg-red-100 text-red-700 font-medium'
                            : 'bg-green-100 text-green-700'
                        }`}
                      >
                        {product}
                        {recommendation.expiringProducts.includes(product) && ' ⚠️'}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Eksik Malzemeler */}
              {recommendation.missingIngredients.length > 0 && (
                <div className="mb-4">
                  <p className="text-sm font-medium text-gray-700 mb-2">🛒 Almanız gerekenler:</p>
                  <div className="flex flex-wrap gap-2">
                    {recommendation.missingIngredients.slice(0, 5).map((ingredient, idx) => (
                      <span key={idx} className="px-3 py-1 bg-orange-100 text-orange-700 rounded-full text-sm">
                        {ingredient.name}
                      </span>
                    ))}
                    {recommendation.missingIngredients.length > 5 && (
                      <span className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm">
                        +{recommendation.missingIngredients.length - 5} daha
                      </span>
                    )}
                  </div>
                </div>
              )}

              {/* Aksiyonlar */}
              <div className="flex gap-3">
                <button
                  onClick={() => setSelectedRecipe(recommendation)}
                  className="flex-1 py-3 bg-orange-500 text-white rounded-xl hover:bg-orange-600 transition-colors font-medium"
                >
                  Tarifi Görüntüle
                </button>
                {recommendation.missingIngredients.length > 0 && (
                  <button
                    onClick={() => onSelectRecipe(recommendation)}
                    className="px-6 py-3 bg-green-500 text-white rounded-xl hover:bg-green-600 transition-colors font-medium flex items-center gap-2"
                  >
                    <ShoppingBag className="w-5 h-5" />
                    Alışveriş Listesi
                  </button>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Tarif Detay Modal */}
      {selectedRecipe && (
        <RecipeDetailModal
          recommendation={selectedRecipe}
          onClose={() => setSelectedRecipe(null)}
        />
      )}
    </div>
  );
}
