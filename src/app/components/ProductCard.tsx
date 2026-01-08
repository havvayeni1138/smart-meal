import React from 'react';
import { Product } from '../types';
import { Trash2, Clock, AlertCircle } from 'lucide-react';

interface ProductCardProps {
  product: Product;
  status: 'good' | 'warning' | 'critical';
  onDelete: () => void;
}

export function ProductCard({ product, status, onDelete }: ProductCardProps) {
  const statusColors = {
    good: 'bg-green-50 border-green-200',
    warning: 'bg-yellow-50 border-yellow-200',
    critical: 'bg-red-50 border-red-200',
  };

  const statusTextColors = {
    good: 'text-green-700',
    warning: 'text-yellow-700',
    critical: 'text-red-700',
  };

  const statusBadgeColors = {
    good: 'bg-green-100 text-green-700',
    warning: 'bg-yellow-100 text-yellow-700',
    critical: 'bg-red-100 text-red-700',
  };

  return (
    <div className={`rounded-xl p-5 border-2 transition-all hover:shadow-lg ${statusColors[status]}`}>
      <div className="flex items-start justify-between mb-3">
        <div className="flex-1">
          <h3 className="mb-1">{product.name}</h3>
          <p className="text-sm text-gray-600">{product.category}</p>
        </div>
        <button
          onClick={onDelete}
          className="p-2 hover:bg-white rounded-lg transition-colors"
          title="Ürünü sil"
        >
          <Trash2 className="w-4 h-4 text-gray-500 hover:text-red-500" />
        </button>
      </div>

      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="px-3 py-1 bg-white rounded-full">
            <span className="font-semibold">{product.quantity} {product.unit}</span>
          </div>
        </div>

        <div className={`flex items-center gap-1 px-3 py-1 rounded-full ${statusBadgeColors[status]}`}>
          {status === 'critical' && <AlertCircle className="w-4 h-4" />}
          {status === 'warning' && <Clock className="w-4 h-4" />}
          {status === 'good' && <Clock className="w-4 h-4" />}
          <span className="text-sm font-medium">
            {product.expiryDays} gün
          </span>
        </div>
      </div>

      {status === 'critical' && (
        <div className="mt-3 pt-3 border-t border-red-200">
          <p className="text-sm text-red-700 font-medium">⚠️ Yakında bozulacak!</p>
        </div>
      )}
    </div>
  );
}
