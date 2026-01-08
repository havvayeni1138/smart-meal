import React from 'react';
import { RecipeRecommendation } from '../types';
import { X, Clock, Users, ChefHat } from 'lucide-react';

interface RecipeDetailModalProps {
  recommendation: RecipeRecommendation;
  onClose: () => void;
}

export function RecipeDetailModal({ recommendation, onClose }: RecipeDetailModalProps) {
  const { recipe } = recommendation;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 bg-gradient-to-r from-orange-500 to-red-500 text-white p-6 rounded-t-2xl flex items-start justify-between">
          <div>
            <h2 className="mb-2">{recipe.name}</h2>
            <div className="flex gap-4 text-sm">
              <div className="flex items-center gap-1">
                <Clock className="w-4 h-4" />
                <span>{recipe.prepTime} dk</span>
              </div>
              <div className="flex items-center gap-1">
                <Users className="w-4 h-4" />
                <span>{recipe.servings} kişilik</span>
              </div>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-white hover:bg-opacity-20 rounded-lg transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          {/* Malzemeler */}
          <div className="mb-8">
            <h3 className="mb-4 flex items-center gap-2">
              <ChefHat className="w-5 h-5 text-orange-500" />
              Malzemeler
            </h3>
            <div className="grid gap-2">
              {recipe.ingredients.map((ingredient, idx) => {
                const isAvailable = recommendation.matchedProducts.some(p => 
                  p.toLowerCase().includes(ingredient.name.toLowerCase()) ||
                  ingredient.name.toLowerCase().includes(p.toLowerCase())
                );
                
                return (
                  <div
                    key={idx}
                    className={`flex items-center justify-between p-3 rounded-lg ${
                      isAvailable ? 'bg-green-50' : 'bg-gray-50'
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      {isAvailable && <span className="text-green-600">✓</span>}
                      {!isAvailable && <span className="text-gray-400">○</span>}
                      <span className={isAvailable ? 'text-green-900' : 'text-gray-900'}>
                        {ingredient.name}
                      </span>
                    </div>
                    <span className="text-gray-600">
                      {ingredient.quantity} {ingredient.unit}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Yapılış */}
          <div>
            <h3 className="mb-4">Yapılış</h3>
            <div className="space-y-4">
              {recipe.instructions.map((instruction, idx) => (
                <div key={idx} className="flex gap-4">
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-orange-500 text-white flex items-center justify-center font-semibold">
                    {idx + 1}
                  </div>
                  <p className="flex-1 pt-1 text-gray-700">{instruction}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Kategoriler ve Etiketler */}
          <div className="mt-8 pt-6 border-t border-gray-200">
            <div className="flex flex-wrap gap-2">
              <span className="px-4 py-2 bg-purple-100 text-purple-700 rounded-full">
                {recipe.category}
              </span>
              <span className="px-4 py-2 bg-blue-100 text-blue-700 rounded-full">
                {recipe.cuisine}
              </span>
              {recipe.tags.map(tag => (
                <span key={tag} className="px-4 py-2 bg-gray-100 text-gray-700 rounded-full">
                  #{tag}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="sticky bottom-0 bg-gray-50 p-6 rounded-b-2xl border-t border-gray-200">
          <button
            onClick={onClose}
            className="w-full py-3 bg-gray-200 text-gray-700 rounded-xl hover:bg-gray-300 transition-colors font-medium"
          >
            Kapat
          </button>
        </div>
      </div>
    </div>
  );
}
