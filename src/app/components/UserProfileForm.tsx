import React, { useState } from 'react';
import { UserProfile, HomeType } from '../types';
import { allergensList, culturalPreferences, specialOccasions, homeTypeConfigs } from '../data/mockData';
import { User, Users, AlertCircle, Calendar, Home } from 'lucide-react';

interface UserProfileFormProps {
  onSubmit: (profile: UserProfile) => void;
  initialProfile?: UserProfile;
}

export function UserProfileForm({ onSubmit, initialProfile }: UserProfileFormProps) {
  const [name, setName] = useState(initialProfile?.name || '');
  const [personCount, setPersonCount] = useState(initialProfile?.personCount || 2);
  const [homeType, setHomeType] = useState<HomeType>(initialProfile?.homeType || 'single');
  const [selectedAllergens, setSelectedAllergens] = useState<string[]>(
    initialProfile?.allergens || []
  );
  const [selectedCultures, setSelectedCultures] = useState<string[]>(
    initialProfile?.culturalPreferences || []
  );
  const [specialOccasion, setSpecialOccasion] = useState(
    initialProfile?.specialOccasion || 'Günlük'
  );

  const toggleAllergen = (allergen: string) => {
    setSelectedAllergens(prev =>
      prev.includes(allergen)
        ? prev.filter(a => a !== allergen)
        : [...prev, allergen]
    );
  };

  const toggleCulture = (culture: string) => {
    setSelectedCultures(prev =>
      prev.includes(culture)
        ? prev.filter(c => c !== culture)
        : [...prev, culture]
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const profile: UserProfile = {
      name,
      personCount,
      homeType,
      allergens: selectedAllergens,
      culturalPreferences: selectedCultures,
      specialOccasion,
    };

    onSubmit(profile);
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="bg-white rounded-2xl shadow-lg p-8">
        <div className="mb-8 text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-orange-400 to-red-500 rounded-full mb-4">
            <User className="w-8 h-8 text-white" />
          </div>
          <h2 className="mb-2">Hoş Geldiniz!</h2>
          <p className="text-gray-600">Size özel tarif önerileri için birkaç bilgiye ihtiyacımız var</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* İsim */}
          <div>
            <label className="block mb-2 font-medium text-gray-700">
              Adınız
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Örn: Ayşe"
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none transition"
            />
          </div>

          {/* Ev Tipi */}
          <div>
            <label className="block mb-3 font-medium text-gray-700 flex items-center gap-2">
              <Home className="w-5 h-5 text-orange-500" />
              Ev Tipiniz
            </label>
            <div className="grid md:grid-cols-3 gap-3">
              {Object.entries(homeTypeConfigs).map(([key, config]) => (
                <button
                  key={key}
                  type="button"
                  onClick={() => setHomeType(key as HomeType)}
                  className={`p-4 rounded-xl border-2 transition-all ${
                    homeType === key
                      ? 'bg-gradient-to-br from-orange-500 to-red-500 border-orange-500 text-white shadow-lg scale-105'
                      : 'bg-white border-gray-300 text-gray-700 hover:border-orange-300'
                  }`}
                >
                  <div className="text-3xl mb-2">{config.icon}</div>
                  <div className="font-semibold mb-1">{config.name}</div>
                  <div className={`text-xs ${homeType === key ? 'text-white opacity-90' : 'text-gray-600'}`}>
                    {config.description}
                  </div>
                  <div className={`text-xs mt-2 ${homeType === key ? 'text-white opacity-75' : 'text-gray-500'}`}>
                    {config.avgMealsPerDay} öğün/gün
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Kişi Sayısı */}
          <div>
            <label className="block mb-2 font-medium text-gray-700 flex items-center gap-2">
              <Users className="w-5 h-5 text-orange-500" />
              Kaç Kişilik Yemek Pişiriyorsunuz?
            </label>
            <div className="flex items-center gap-4">
              <input
                type="range"
                min="1"
                max="10"
                value={personCount}
                onChange={(e) => setPersonCount(Number(e.target.value))}
                className="flex-1"
              />
              <div className="w-16 text-center">
                <span className="inline-block px-4 py-2 bg-orange-100 text-orange-700 rounded-lg font-semibold">
                  {personCount}
                </span>
              </div>
            </div>
          </div>

          {/* Alerjenler */}
          <div>
            <label className="block mb-3 font-medium text-gray-700 flex items-center gap-2">
              <AlertCircle className="w-5 h-5 text-red-500" />
              Alerji veya İstemediğiniz İçerikler
            </label>
            <div className="flex flex-wrap gap-2">
              {allergensList.map((allergen) => (
                <button
                  key={allergen}
                  type="button"
                  onClick={() => toggleAllergen(allergen)}
                  className={`px-4 py-2 rounded-full border-2 transition-all ${
                    selectedAllergens.includes(allergen)
                      ? 'bg-red-500 border-red-500 text-white'
                      : 'bg-white border-gray-300 text-gray-700 hover:border-red-300'
                  }`}
                >
                  {allergen}
                </button>
              ))}
            </div>
          </div>

          {/* Kültürel Tercihler */}
          <div>
            <label className="block mb-3 font-medium text-gray-700">
              Mutfak Tercihleri
            </label>
            <div className="flex flex-wrap gap-2">
              {culturalPreferences.map((culture) => (
                <button
                  key={culture}
                  type="button"
                  onClick={() => toggleCulture(culture)}
                  className={`px-4 py-2 rounded-full border-2 transition-all ${
                    selectedCultures.includes(culture)
                      ? 'bg-orange-500 border-orange-500 text-white'
                      : 'bg-white border-gray-300 text-gray-700 hover:border-orange-300'
                  }`}
                >
                  {culture}
                </button>
              ))}
            </div>
          </div>

          {/* Özel Gün */}
          <div>
            <label className="block mb-3 font-medium text-gray-700 flex items-center gap-2">
              <Calendar className="w-5 h-5 text-purple-500" />
              Bugün Özel Bir Gün mü?
            </label>
            <select
              value={specialOccasion}
              onChange={(e) => setSpecialOccasion(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none"
            >
              {specialOccasions.map((occasion) => (
                <option key={occasion} value={occasion}>
                  {occasion}
                </option>
              ))}
            </select>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full py-4 bg-gradient-to-r from-orange-500 to-red-500 text-white rounded-xl font-semibold hover:from-orange-600 hover:to-red-600 transition-all shadow-lg hover:shadow-xl"
          >
            Devam Et
          </button>
        </form>
      </div>
    </div>
  );
}