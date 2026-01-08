import React, { useState } from 'react';
import { SelectedProduct } from '../types';
import { availableProducts, productImages, productCategories } from '../data/mockData';
import { Check, Plus, Minus, ShoppingCart, Sparkles } from 'lucide-react';

interface ProductCatalogProps {
  selectedProducts: SelectedProduct[];
  onProductsChange: (products: SelectedProduct[]) => void;
  onGetRecipes: () => void;
  onAddToCart: () => void;
}

export function ProductCatalog({ selectedProducts, onProductsChange, onGetRecipes, onAddToCart }: ProductCatalogProps) {
  const [activeCategory, setActiveCategory] = useState<string>('Sebze');

  // Kategorilere göre ürünleri grupla
  const productsByCategory = availableProducts.reduce((acc, product) => {
    if (!acc[product.category]) {
      acc[product.category] = [];
    }
    acc[product.category].push(product);
    return acc;
  }, {} as Record<string, typeof availableProducts>);

  const categories = Object.keys(productsByCategory);

  // Ürün seçimi/seçim kaldırma
  const toggleProduct = (productName: string, category: string, defaultUnit: string) => {
    const existing = selectedProducts.find(p => p.productName === productName);
    
    if (existing) {
      // Kaldır
      onProductsChange(selectedProducts.filter(p => p.productName !== productName));
    } else {
      // Ekle
      const newProduct: SelectedProduct = {
        productName,
        category,
        quantity: 1,
        unit: defaultUnit,
        image: productImages[productName],
      };
      onProductsChange([...selectedProducts, newProduct]);
    }
  };

  // Miktar artır/azalt
  const updateQuantity = (productName: string, delta: number) => {
    onProductsChange(
      selectedProducts.map(p => {
        if (p.productName === productName) {
          const newQuantity = Math.max(1, p.quantity + delta);
          return { ...p, quantity: newQuantity };
        }
        return p;
      })
    );
  };

  const isSelected = (productName: string) => {
    return selectedProducts.some(p => p.productName === productName);
  };

  const getQuantity = (productName: string) => {
    return selectedProducts.find(p => p.productName === productName)?.quantity || 1;
  };

  return (
    <div className="max-w-7xl mx-auto p-6">
      {/* Header */}
      <div className="mb-8">
        <h2 className="mb-2">Dolabınızdaki Ürünler</h2>
        <p className="text-gray-600">
          {selectedProducts.length} ürün seçildi
        </p>
      </div>

      {/* Kategori Seçimi */}
      <div className="mb-6 flex gap-2 overflow-x-auto pb-2">
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => setActiveCategory(category)}
            className={`px-6 py-3 rounded-xl font-medium whitespace-nowrap transition-all ${
              activeCategory === category
                ? 'bg-gradient-to-r from-purple-500 to-indigo-500 text-white shadow-lg'
                : 'bg-white text-gray-700 hover:bg-gray-50 border-2 border-gray-200'
            }`}
          >
            {category}
          </button>
        ))}
      </div>

      {/* Ürün Kartları */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 mb-8">
        {productsByCategory[activeCategory]?.map((product) => {
          const selected = isSelected(product.name);
          const quantity = getQuantity(product.name);
          const emoji = productImages[product.name] || '📦';

          return (
            <div
              key={product.name}
              className={`relative rounded-2xl p-4 border-3 transition-all cursor-pointer ${
                selected
                  ? 'bg-gradient-to-br from-green-50 to-emerald-50 border-green-400 shadow-lg scale-105'
                  : 'bg-white border-gray-200 hover:border-gray-300 hover:shadow-md'
              }`}
              onClick={() => toggleProduct(product.name, product.category, product.defaultUnit)}
            >
              {/* Seçim Göstergesi */}
              {selected && (
                <div className="absolute top-2 right-2 w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                  <Check className="w-4 h-4 text-white" />
                </div>
              )}

              {/* Ürün Görseli */}
              <div className="text-6xl mb-3 text-center">
                {emoji}
              </div>

              {/* Ürün İsmi */}
              <h4 className="text-center mb-2 text-sm">{product.name}</h4>

              {/* Miktar Kontrolü */}
              {selected && (
                <div className="flex items-center justify-center gap-2 mt-3" onClick={(e) => e.stopPropagation()}>
                  <button
                    onClick={() => updateQuantity(product.name, -1)}
                    className="w-8 h-8 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors flex items-center justify-center"
                  >
                    <Minus className="w-4 h-4" />
                  </button>
                  
                  <div className="px-3 py-1 bg-white rounded-lg border-2 border-green-300 min-w-[60px] text-center">
                    <span className="font-semibold">{quantity}</span>
                    <span className="text-xs text-gray-600 ml-1">{product.defaultUnit}</span>
                  </div>
                  
                  <button
                    onClick={() => updateQuantity(product.name, 1)}
                    className="w-8 h-8 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors flex items-center justify-center"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Aksiyon Butonları */}
      {selectedProducts.length > 0 && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 bg-white rounded-2xl shadow-2xl p-4 border-2 border-gray-200 max-w-2xl w-full mx-4">
          <div className="flex items-center justify-between gap-4">
            <div className="flex-1">
              <p className="font-semibold text-gray-900">{selectedProducts.length} ürün seçildi</p>
              <p className="text-sm text-gray-600">
                Toplam: {selectedProducts.reduce((sum, p) => sum + p.quantity, 0)} adet
              </p>
            </div>
            
            <div className="flex gap-3">
              <button
                onClick={onAddToCart}
                className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-500 to-cyan-500 text-white rounded-xl hover:from-blue-600 hover:to-cyan-600 transition-all shadow-lg font-medium"
              >
                <ShoppingCart className="w-5 h-5" />
                Sepete Ekle
              </button>
              
              <button
                onClick={onGetRecipes}
                className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-orange-500 to-red-500 text-white rounded-xl hover:from-orange-600 hover:to-red-600 transition-all shadow-lg font-medium"
              >
                <Sparkles className="w-5 h-5" />
                Tarif Al
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
