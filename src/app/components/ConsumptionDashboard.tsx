import React from 'react';
import { ConsumptionAnalysis } from '../types';
import { TrendingUp, TrendingDown, AlertTriangle, CheckCircle2, Calendar, UtensilsCrossed } from 'lucide-react';

interface ConsumptionDashboardProps {
  analysis: ConsumptionAnalysis;
}

export function ConsumptionDashboard({ analysis }: ConsumptionDashboardProps) {
  const statusConfig = {
    insufficient: {
      icon: AlertTriangle,
      color: 'from-red-500 to-orange-500',
      bgColor: 'bg-red-50',
      borderColor: 'border-red-200',
      textColor: 'text-red-700',
      title: 'Yetersiz Ürün',
    },
    optimal: {
      icon: CheckCircle2,
      color: 'from-green-500 to-emerald-500',
      bgColor: 'bg-green-50',
      borderColor: 'border-green-200',
      textColor: 'text-green-700',
      title: 'Optimal Seviye',
    },
    excess: {
      icon: TrendingUp,
      color: 'from-yellow-500 to-orange-500',
      bgColor: 'bg-yellow-50',
      borderColor: 'border-yellow-200',
      textColor: 'text-yellow-700',
      title: 'Fazla Ürün',
    },
  };

  const wasteRiskConfig = {
    low: {
      color: 'bg-green-500',
      text: 'Düşük Risk',
    },
    medium: {
      color: 'bg-yellow-500',
      text: 'Orta Risk',
    },
    high: {
      color: 'bg-red-500',
      text: 'Yüksek Risk',
    },
  };

  const config = statusConfig[analysis.status];
  const StatusIcon = config.icon;
  const wasteConfig = wasteRiskConfig[analysis.wasteRisk];

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      {/* Ana Durum Kartı */}
      <div className={`rounded-2xl border-3 ${config.borderColor} ${config.bgColor} overflow-hidden shadow-xl`}>
        <div className={`bg-gradient-to-r ${config.color} text-white p-6`}>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-white bg-opacity-20 rounded-xl flex items-center justify-center">
                <StatusIcon className="w-7 h-7" />
              </div>
              <div>
                <h3 className="text-xl font-bold">{config.title}</h3>
                <p className="text-sm opacity-90">Tüketim Analizi</p>
              </div>
            </div>
            
            <div className={`px-4 py-2 ${wasteConfig.color} rounded-xl text-white font-semibold`}>
              {wasteConfig.text}
            </div>
          </div>
        </div>

        <div className="p-6">
          <div className="grid md:grid-cols-2 gap-6 mb-6">
            {/* Toplam Öğün */}
            <div className="bg-white rounded-xl p-5 border-2 border-gray-200 shadow-sm">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                  <UtensilsCrossed className="w-5 h-5 text-purple-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-600">Toplam Öğün</p>
                  <p className="text-2xl font-bold text-gray-900">{analysis.totalMeals}</p>
                </div>
              </div>
              <p className="text-xs text-gray-500">Mevcut ürünlerle yapılabilir</p>
            </div>

            {/* Kaç Gün Yetecek */}
            <div className="bg-white rounded-xl p-5 border-2 border-gray-200 shadow-sm">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                  <Calendar className="w-5 h-5 text-blue-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-600">Süre</p>
                  <p className="text-2xl font-bold text-gray-900">{analysis.daysWillLast} Gün</p>
                </div>
              </div>
              <p className="text-xs text-gray-500">Ürünler bu kadar yetecek</p>
            </div>
          </div>

          {/* Öneriler */}
          <div className="bg-white rounded-xl p-5 border-2 border-gray-200">
            <h4 className="mb-3 flex items-center gap-2">
              <span className="w-2 h-2 bg-gradient-to-r from-orange-500 to-red-500 rounded-full"></span>
              Öneriler
            </h4>
            <div className="space-y-2">
              {analysis.suggestions.map((suggestion, idx) => (
                <div
                  key={idx}
                  className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                >
                  <span className="text-lg flex-shrink-0">💡</span>
                  <p className="text-sm text-gray-700 flex-1">{suggestion}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Bilgilendirme Kartları */}
      <div className="grid md:grid-cols-2 gap-4">
        <div className="bg-gradient-to-br from-indigo-500 to-purple-500 rounded-xl p-5 text-white">
          <div className="flex items-center gap-2 mb-2">
            <TrendingUp className="w-5 h-5" />
            <h4>Akıllı Tüketim</h4>
          </div>
          <p className="text-sm opacity-90">
            Ev tipinize göre özelleştirilmiş tüketim analizi ile israfı önleyin
          </p>
        </div>

        <div className="bg-gradient-to-br from-pink-500 to-rose-500 rounded-xl p-5 text-white">
          <div className="flex items-center gap-2 mb-2">
            <TrendingDown className="w-5 h-5" />
            <h4>Tasarruf</h4>
          </div>
          <p className="text-sm opacity-90">
            Doğru zamanda doğru miktarda alışveriş yaparak tasarruf edin
          </p>
        </div>
      </div>
    </div>
  );
}
