import React, { useState } from 'react';
import { Product } from '../types';
import { availableProducts, productCategories } from '../data/mockData';
import { Plus, Package, Calendar } from 'lucide-react';
import { ProductCard } from './ProductCard';

interface ProductManagerProps {
  products: Product[];
  onProductsChange: (products: Product[]) => void;
}

export function ProductManager({ products, onProductsChange }: ProductManagerProps) {
  const [showAddForm, setShowAddForm] = useState(false);
  const [selectedProductName, setSelectedProductName] = useState('');
  const [quantity, setQuantity] = useState('1');

  const handleAddProduct = () => {
    if (!selectedProductName) return;

    const productInfo = availableProducts.find(p => p.name === selectedProductName);
    if (!productInfo) return;

    const expiryDays = productCategories[productInfo.category as keyof typeof productCategories] || 7;

    const newProduct: Product = {
      id: Date.now().toString(),
      name: selectedProductName,
      category: productInfo.category,
      quantity: Number(quantity),
      unit: productInfo.defaultUnit,
      expiryDays,
      addedDate: new Date().toISOString(),
    };

    onProductsChange([...products, newProduct]);
    setSelectedProductName('');
    setQuantity('1');
    setShowAddForm(false);
  };

  const handleDeleteProduct = (id: string) => {
    onProductsChange(products.filter(p => p.id !== id));
  };

  const getExpiryStatus = (expiryDays: number) => {
    if (expiryDays <= 2) return 'critical';
    if (expiryDays <= 5) return 'warning';
    return 'good';
  };

  const sortedProducts = [...products].sort((a, b) => a.expiryDays - b.expiryDays);

  return (
    <div className="max-w-6xl mx-auto p-6">
      <div className="mb-8">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="mb-2">Dolabınızdaki Ürünler</h2>
            <p className="text-gray-600">
              {products.length} ürün • {products.filter(p => p.expiryDays <= 3).length} tanesi yakında bozulacak
            </p>
          </div>
          <button
            onClick={() => setShowAddForm(!showAddForm)}
            className="flex items-center gap-2 px-6 py-3 bg-orange-500 text-white rounded-xl hover:bg-orange-600 transition-colors shadow-lg"
          >
            <Plus className="w-5 h-5" />
            Ürün Ekle
          </button>
        </div>

        {/* Ürün Ekleme Formu */}
        {showAddForm && (
          <div className="bg-white rounded-2xl shadow-lg p-6 mb-6 border-2 border-orange-200">
            <h3 className="mb-4 flex items-center gap-2">
              <Package className="w-5 h-5 text-orange-500" />
              Yeni Ürün Ekle
            </h3>
            
            <div className="grid md:grid-cols-3 gap-4">
              <div className="md:col-span-2">
                <label className="block mb-2 font-medium text-gray-700">Ürün Seçin</label>
                <select
                  value={selectedProductName}
                  onChange={(e) => setSelectedProductName(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none"
                >
                  <option value="">Bir ürün seçin...</option>
                  {Object.entries(
                    availableProducts.reduce((acc, product) => {
                      if (!acc[product.category]) acc[product.category] = [];
                      acc[product.category].push(product);
                      return acc;
                    }, {} as Record<string, typeof availableProducts>)
                  ).map(([category, items]) => (
                    <optgroup key={category} label={category}>
                      {items.map((product) => (
                        <option key={product.name} value={product.name}>
                          {product.name}
                        </option>
                      ))}
                    </optgroup>
                  ))}
                </select>
              </div>

              <div>
                <label className="block mb-2 font-medium text-gray-700">Miktar</label>
                <input
                  type="number"
                  min="1"
                  value={quantity}
                  onChange={(e) => setQuantity(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none"
                />
              </div>
            </div>

            <div className="flex gap-3 mt-4">
              <button
                onClick={handleAddProduct}
                disabled={!selectedProductName}
                className="flex-1 py-3 bg-green-500 text-white rounded-lg hover:bg-green-600 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
              >
                Ekle
              </button>
              <button
                onClick={() => setShowAddForm(false)}
                className="flex-1 py-3 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors"
              >
                İptal
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Ürün Listesi */}
      {products.length === 0 ? (
        <div className="bg-gray-50 rounded-2xl p-12 text-center">
          <Package className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <h3 className="mb-2 text-gray-600">Henüz ürün eklemediniz</h3>
          <p className="text-gray-500 mb-6">Dolabınızdaki ürünleri ekleyerek tarif önerileri alın</p>
          <button
            onClick={() => setShowAddForm(true)}
            className="px-6 py-3 bg-orange-500 text-white rounded-xl hover:bg-orange-600 transition-colors"
          >
            İlk Ürünü Ekle
          </button>
        </div>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {sortedProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              status={getExpiryStatus(product.expiryDays)}
              onDelete={() => handleDeleteProduct(product.id)}
            />
          ))}
        </div>
      )}
    </div>
  );
}
