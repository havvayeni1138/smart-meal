import { UserProfile, Product } from '../types';

const STORAGE_KEYS = {
  USER_PROFILE: 'smartFood_userProfile',
  PRODUCTS: 'smartFood_products',
};

// LocalStorage yardımcı fonksiyonları
export const storage = {
  // Kullanıcı profili
  saveUserProfile(profile: UserProfile): void {
    try {
      localStorage.setItem(STORAGE_KEYS.USER_PROFILE, JSON.stringify(profile));
    } catch (error) {
      console.error('Profil kaydedilemedi:', error);
    }
  },

  getUserProfile(): UserProfile | null {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.USER_PROFILE);
      return data ? JSON.parse(data) : null;
    } catch (error) {
      console.error('Profil okunamadı:', error);
      return null;
    }
  },

  clearUserProfile(): void {
    localStorage.removeItem(STORAGE_KEYS.USER_PROFILE);
  },

  // Ürünler
  saveProducts(products: Product[]): void {
    try {
      localStorage.setItem(STORAGE_KEYS.PRODUCTS, JSON.stringify(products));
    } catch (error) {
      console.error('Ürünler kaydedilemedi:', error);
    }
  },

  getProducts(): Product[] {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.PRODUCTS);
      return data ? JSON.parse(data) : [];
    } catch (error) {
      console.error('Ürünler okunamadı:', error);
      return [];
    }
  },

  clearProducts(): void {
    localStorage.removeItem(STORAGE_KEYS.PRODUCTS);
  },

  // Tümünü temizle
  clearAll(): void {
    this.clearUserProfile();
    this.clearProducts();
  },
};
