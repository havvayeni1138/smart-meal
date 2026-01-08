import React, { useState, useEffect } from 'react';
import { UserProfile, SelectedProduct, RecipeRecommendation, ConsumptionAnalysis } from './types';
import { mockRecipes, homeTypeConfigs } from './data/mockData';
import { storage } from './utils/localStorage';
import { RecommendationEngine } from './utils/recommendationEngine';
import { analyzeConsumption } from './utils/consumptionAnalysis';
import { UserProfileForm } from './components/UserProfileForm';
import { ProductCatalog } from './components/ProductCatalog';
import { ConsumptionDashboard } from './components/ConsumptionDashboard';
import { RecipeRecommendations } from './components/RecipeRecommendations';
import { ShoppingListView } from './components/ShoppingListView';
import { ChefHat, Package, TrendingUp, Sparkles, ShoppingBag, RotateCcw, ShoppingCart } from 'lucide-react';

type AppStep = 'profile' | 'catalog' | 'analysis' | 'recommendations' | 'shopping' | 'cart';

export default function App() {
  const [currentStep, setCurrentStep] = useState<AppStep>('profile');
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [selectedProducts, setSelectedProducts] = useState<SelectedProduct[]>([]);
  const [consumptionAnalysis, setConsumptionAnalysis] = useState<ConsumptionAnalysis | null>(null);
  const [recommendations, setRecommendations] = useState<RecipeRecommendation[]>([]);
  const [selectedRecipeForShopping, setSelectedRecipeForShopping] = useState<RecipeRecommendation | null>(null);
  const [shoppingCart, setShoppingCart] = useState<SelectedProduct[]>([]);

  // LocalStorage'dan veri yükle
  useEffect(() => {
    const savedProfile = storage.getUserProfile();
    
    if (savedProfile) {
      setUserProfile(savedProfile);
      setCurrentStep('catalog');
    }
  }, []);

  // Profil kaydet
  const handleProfileSubmit = (profile: UserProfile) => {
    setUserProfile(profile);
    storage.saveUserProfile(profile);
    setCurrentStep('catalog');
  };

  // Ürünler değiştiğinde analiz güncelle
  useEffect(() => {
    if (selectedProducts.length > 0 && userProfile) {
      const analysis = analyzeConsumption(selectedProducts, userProfile);
      setConsumptionAnalysis(analysis);
    }
  }, [selectedProducts, userProfile]);

  // Tarif önerileri al
  const handleGetRecipes = () => {
    if (userProfile && selectedProducts.length > 0) {
      // SelectedProduct'ları Product'a dönüştür
      const products = selectedProducts.map(sp => ({
        id: Date.now().toString() + Math.random(),
        name: sp.productName,
        category: sp.category,
        quantity: sp.quantity,
        unit: sp.unit,
        expiryDays: 7, // Varsayılan
        addedDate: new Date().toISOString(),
        image: sp.image,
      }));

      const engine = new RecommendationEngine(products, mockRecipes, userProfile);
      const newRecommendations = engine.getRecommendations();
      setRecommendations(newRecommendations);
      setCurrentStep('recommendations');
    }
  };

  // Sepete ekle
  const handleAddToCart = () => {
    setShoppingCart([...shoppingCart, ...selectedProducts]);
    setCurrentStep('cart');
  };

  // Alışveriş listesine git
  const handleSelectRecipeForShopping = (recommendation: RecipeRecommendation) => {
    setSelectedRecipeForShopping(recommendation);
    setCurrentStep('shopping');
  };

  // Baştan başla
  const handleReset = () => {
    if (confirm('Tüm veriler silinecek. Emin misiniz?')) {
      storage.clearAll();
      setUserProfile(null);
      setSelectedProducts([]);
      setConsumptionAnalysis(null);
      setRecommendations([]);
      setSelectedRecipeForShopping(null);
      setShoppingCart([]);
      setCurrentStep('profile');
    }
  };

  // Analizi göster
  const handleShowAnalysis = () => {
    if (consumptionAnalysis) {
      setCurrentStep('analysis');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-red-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 shadow-sm sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-red-500 rounded-xl flex items-center justify-center">
                <ChefHat className="w-7 h-7 text-white" />
              </div>
              <div>
                <h1 className="text-xl">Akıllı Yemek Asistanı</h1>
                <p className="text-sm text-gray-600">Gıda israfını azalt, bilinçli tüket</p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              {userProfile && (
                <div className="text-right">
                  <p className="font-medium">{userProfile.name}</p>
                  <p className="text-sm text-gray-600">
                    {homeTypeConfigs[userProfile.homeType].icon} {homeTypeConfigs[userProfile.homeType].name} • {userProfile.personCount} kişi
                  </p>
                </div>
              )}
              {currentStep !== 'profile' && (
                <button
                  onClick={handleReset}
                  className="p-2 text-gray-600 hover:text-red-600 transition-colors"
                  title="Baştan başla"
                >
                  <RotateCcw className="w-5 h-5" />
                </button>
              )}
            </div>
          </div>

          {/* Navigation Steps */}
          {currentStep !== 'profile' && (
            <div className="mt-4 flex gap-2 overflow-x-auto pb-2">
              <button
                onClick={() => setCurrentStep('catalog')}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all whitespace-nowrap ${
                  currentStep === 'catalog'
                    ? 'bg-orange-500 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                <Package className="w-4 h-4" />
                Ürünler ({selectedProducts.length})
              </button>
              
              {consumptionAnalysis && (
                <button
                  onClick={handleShowAnalysis}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all whitespace-nowrap ${
                    currentStep === 'analysis'
                      ? 'bg-purple-500 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  <TrendingUp className="w-4 h-4" />
                  Analiz
                </button>
              )}
              
              <button
                onClick={() => selectedProducts.length > 0 ? handleGetRecipes() : null}
                disabled={selectedProducts.length === 0}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all whitespace-nowrap ${
                  currentStep === 'recommendations'
                    ? 'bg-orange-500 text-white'
                    : selectedProducts.length > 0
                    ? 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    : 'bg-gray-100 text-gray-400 cursor-not-allowed'
                }`}
              >
                <Sparkles className="w-4 h-4" />
                Tarifler ({recommendations.length})
              </button>

              {shoppingCart.length > 0 && (
                <button
                  onClick={() => setCurrentStep('cart')}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all whitespace-nowrap ${
                    currentStep === 'cart'
                      ? 'bg-blue-500 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  <ShoppingCart className="w-4 h-4" />
                  Sepet ({shoppingCart.length})
                </button>
              )}

              {selectedRecipeForShopping && (
                <button
                  onClick={() => setCurrentStep('shopping')}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all whitespace-nowrap ${
                    currentStep === 'shopping'
                      ? 'bg-green-500 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  <ShoppingBag className="w-4 h-4" />
                  Alışveriş
                </button>
              )}
            </div>
          )}
        </div>
      </header>

      {/* Main Content */}
      <main className="py-8 pb-24">
        {currentStep === 'profile' && (
          <UserProfileForm
            onSubmit={handleProfileSubmit}
            initialProfile={userProfile || undefined}
          />
        )}

        {currentStep === 'catalog' && (
          <ProductCatalog
            selectedProducts={selectedProducts}
            onProductsChange={setSelectedProducts}
            onGetRecipes={handleGetRecipes}
            onAddToCart={handleAddToCart}
          />
        )}

        {currentStep === 'analysis' && consumptionAnalysis && (
          <ConsumptionDashboard analysis={consumptionAnalysis} />
        )}

        {currentStep === 'recommendations' && (
          <RecipeRecommendations
            recommendations={recommendations}
            onSelectRecipe={handleSelectRecipeForShopping}
          />
        )}

        {currentStep === 'shopping' && selectedRecipeForShopping && (
          <ShoppingListView
            recommendation={selectedRecipeForShopping}
            onBack={() => setCurrentStep('recommendations')}
          />
        )}

        {currentStep === 'cart' && (
          <div className="max-w-4xl mx-auto p-6">
            <div className="bg-white rounded-2xl shadow-lg p-8">
              <h2 className="mb-6 flex items-center gap-2">
                <ShoppingCart className="w-6 h-6 text-blue-600" />
                Alışveriş Sepeti
              </h2>
              
              {shoppingCart.length === 0 ? (
                <div className="text-center py-12">
                  <p className="text-gray-500">Sepetiniz boş</p>
                </div>
              ) : (
                <div className="space-y-3">
                  {shoppingCart.map((item, idx) => (
                    <div key={idx} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                      <div className="flex items-center gap-3">
                        <span className="text-3xl">{item.image || '📦'}</span>
                        <div>
                          <p className="font-medium">{item.productName}</p>
                          <p className="text-sm text-gray-600">{item.category}</p>
                        </div>
                      </div>
                      <div className="font-semibold">
                        {item.quantity} {item.unit}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 mt-16 py-8">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <p className="text-gray-600">
            Gıda israfını azaltmak ve bilinçli tüketim için geliştirildi
          </p>
          <p className="text-sm text-gray-500 mt-2">
            Tüm veriler tarayıcınızda saklanır • LocalStorage kullanılır
          </p>
        </div>
      </footer>
    </div>
  );
}