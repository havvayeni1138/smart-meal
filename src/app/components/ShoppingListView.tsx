import React, { useState } from 'react';
import { ShoppingItem, RecipeRecommendation } from '../types';
import { marketPriceDatabase } from '../data/mockData';
import { ShoppingBag, TrendingDown, MapPin, DollarSign } from 'lucide-react';

interface ShoppingListViewProps {
  recommendation: RecipeRecommendation;
  onBack: () => void;
}

export function ShoppingListView({ recommendation, onBack }: ShoppingListViewProps) {
  const [selectedMarket, setSelectedMarket] = useState<string>('');

  // Alışveriş listesi oluştur
  const shoppingItems: ShoppingItem[] = recommendation.missingIngredients.map(ingredient => {
    const prices = marketPriceDatabase[ingredient.name] || [];
    return {
      name: ingredient.name,
      quantity: ingredient.quantity,
      unit: ingredient.unit,
      prices,
    };
  });

  // Market bazında toplam fiyat hesapla
  const calculateMarketTotals = () => {
    const markets = new Set<string>();
    shoppingItems.forEach(item => {
      item.prices.forEach(price => markets.add(price.market));
    });

    return Array.from(markets).map(market => {
      let total = 0;
      let itemsAvailable = 0;

      shoppingItems.forEach(item => {
        const priceInfo = item.prices.find(p => p.market === market);
        if (priceInfo) {
          // Basit fiyat hesaplama (gerçekte birim bazlı olmalı)
          total += priceInfo.price * item.quantity;
          itemsAvailable++;
        }
      });

      const distance = shoppingItems[0]?.prices.find(p => p.market === market)?.distance || 0;

      return {
        market,
        total,
        itemsAvailable,
        totalItems: shoppingItems.length,
        distance,
      };
    }).sort((a, b) => a.total - b.total);
  };

  const marketTotals = calculateMarketTotals();
  const bestMarket = marketTotals[0];

  return (
    <div className="max-w-6xl mx-auto p-6">
      {/* Header */}
      <div className="mb-8">
        <button
          onClick={onBack}
          className="mb-4 px-4 py-2 text-gray-600 hover:text-gray-900 transition-colors"
        >
          ← Tariflere Dön
        </button>
        
        <div className="bg-gradient-to-r from-green-500 to-emerald-500 text-white rounded-2xl p-6 shadow-lg">
          <div className="flex items-start justify-between">
            <div>
              <h2 className="mb-2 flex items-center gap-2">
                <ShoppingBag className="w-7 h-7" />
                Alışveriş Listesi
              </h2>
              <p className="text-green-100">
                {recommendation.recipe.name} için {shoppingItems.length} ürün
              </p>
            </div>
            
            {bestMarket && (
              <div className="bg-white bg-opacity-20 rounded-xl p-4 text-center">
                <p className="text-sm text-green-100 mb-1">En Uygun</p>
                <p className="font-bold">{bestMarket.market}</p>
                <p className="text-sm">₺{bestMarket.total.toFixed(2)}</p>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Ürünler Listesi */}
        <div className="lg:col-span-2 space-y-4">
          <h3 className="flex items-center gap-2">
            <ShoppingBag className="w-5 h-5 text-green-600" />
            Almanız Gereken Ürünler
          </h3>
          
          {shoppingItems.map((item, idx) => (
            <div key={idx} className="bg-white rounded-xl shadow-md p-5 border-2 border-gray-100">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h4 className="mb-1">{item.name}</h4>
                  <p className="text-gray-600">
                    {item.quantity} {item.unit}
                  </p>
                </div>
              </div>

              {item.prices.length > 0 ? (
                <div className="space-y-2">
                  <p className="text-sm font-medium text-gray-700 mb-2">Market Fiyatları:</p>
                  {item.prices.map((price, pidx) => (
                    <div
                      key={pidx}
                      className={`flex items-center justify-between p-3 rounded-lg border-2 transition-all ${
                        selectedMarket === price.market
                          ? 'border-green-500 bg-green-50'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <span className="font-medium">{price.market}</span>
                        <span className="flex items-center gap-1 text-sm text-gray-500">
                          <MapPin className="w-3 h-3" />
                          {price.distance} km
                        </span>
                      </div>
                      <span className="font-semibold text-green-700">
                        ₺{(price.price * item.quantity).toFixed(2)}
                      </span>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-sm text-gray-500 italic">Fiyat bilgisi mevcut değil</p>
              )}
            </div>
          ))}
        </div>

        {/* Market Karşılaştırması */}
        <div className="space-y-4">
          <h3 className="flex items-center gap-2">
            <TrendingDown className="w-5 h-5 text-green-600" />
            Market Karşılaştırması
          </h3>

          <div className="space-y-3">
            {marketTotals.map((market, idx) => (
              <div
                key={market.market}
                className={`rounded-xl p-5 border-2 transition-all cursor-pointer ${
                  idx === 0
                    ? 'bg-gradient-to-br from-green-50 to-emerald-50 border-green-300 shadow-lg'
                    : 'bg-white border-gray-200 hover:border-green-200'
                }`}
                onClick={() => setSelectedMarket(market.market)}
              >
                {idx === 0 && (
                  <div className="flex items-center gap-1 text-green-600 mb-2 text-sm font-medium">
                    <TrendingDown className="w-4 h-4" />
                    En Ucuz
                  </div>
                )}
                
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h4 className="mb-1">{market.market}</h4>
                    <p className="text-sm text-gray-600">
                      {market.itemsAvailable}/{market.totalItems} ürün
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-lg">₺{market.total.toFixed(2)}</p>
                    {idx > 0 && (
                      <p className="text-sm text-red-600">
                        +₺{(market.total - bestMarket.total).toFixed(2)}
                      </p>
                    )}
                  </div>
                </div>

                <div className="flex items-center justify-between text-sm text-gray-600">
                  <div className="flex items-center gap-1">
                    <MapPin className="w-4 h-4" />
                    <span>{market.distance} km</span>
                  </div>
                  {market.itemsAvailable === market.totalItems && (
                    <span className="text-green-600 font-medium">✓ Tüm ürünler</span>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Özet */}
          <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-5 border-2 border-blue-200">
            <h4 className="mb-3 flex items-center gap-2">
              <DollarSign className="w-5 h-5 text-blue-600" />
              Tasarruf Özeti
            </h4>
            {marketTotals.length > 1 && (
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">En ucuz:</span>
                  <span className="font-semibold">₺{marketTotals[0].total.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">En pahalı:</span>
                  <span className="font-semibold">₺{marketTotals[marketTotals.length - 1].total.toFixed(2)}</span>
                </div>
                <div className="flex justify-between pt-2 border-t border-blue-200">
                  <span className="text-gray-700 font-medium">Tasarruf:</span>
                  <span className="font-bold text-green-600">
                    ₺{(marketTotals[marketTotals.length - 1].total - marketTotals[0].total).toFixed(2)}
                  </span>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
