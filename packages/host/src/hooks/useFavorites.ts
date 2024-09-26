import { create } from 'zustand';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface StoreState {
  favorites: string[];
  recentAccessed: string[];
  initializeFavorites: () => Promise<void>;
  toggleFavorite: (miniappId: string) => Promise<void>;
  addRecentAccessed: (miniappId: string) => Promise<void>;
}

// Funciones para manejar almacenamiento
const loadFavorites = async () => {
  try {
    const jsonValue = await AsyncStorage.getItem('@favorites');
    return jsonValue != null ? JSON.parse(jsonValue) : [];
  } catch (error) {
    console.error('Error loading favorites:', error);
    return [];
  }
};

const saveFavorites = async (favorites: string[]) => {
  try {
    const jsonValue = JSON.stringify(favorites);
    await AsyncStorage.setItem('@favorites', jsonValue);
  } catch (error) {
    console.error('Error saving favorites:', error);
  }
};

const loadRecentAccessed = async () => {
  try {
    const jsonValue = await AsyncStorage.getItem('@recentAccessed');
    return jsonValue != null ? JSON.parse(jsonValue) : [];
  } catch (error) {
    console.error('Error loading recent accessed:', error);
    return [];
  }
};

const saveRecentAccessed = async (recentAccessed: string[]) => {
  try {
    const jsonValue = JSON.stringify(recentAccessed);
    await AsyncStorage.setItem('@recentAccessed', jsonValue);
  } catch (error) {
    console.error('Error saving recent accessed:', error);
  }
};

// Crear la tienda Zustand
const useStore = create<StoreState>((set) => ({
  favorites: [],
  recentAccessed: [],

  initializeFavorites: async () => {
    const favorites = await loadFavorites();
    const recentAccessed = await loadRecentAccessed(); // Cargar recentAccessed
    set({ favorites, recentAccessed }); // Asegúrate de establecer ambos estados
  },

  toggleFavorite: async (miniappId: string) => {
    set((state) => {
      const isFavorite = state.favorites.includes(miniappId);
      const newFavorites = isFavorite
        ? state.favorites.filter((id) => id !== miniappId) // Elimina de favoritos
        : [...state.favorites, miniappId]; // Agrega a favoritos
      
      // Guardar los nuevos favoritos
      saveFavorites(newFavorites); 
      return { favorites: newFavorites };
    });
  },

  // Definir correctamente addRecentAccessed
  addRecentAccessed: async (miniappId: string) => {
    set((state) => {
      const newAccessed = [...state.recentAccessed, miniappId]; // Agregar el ID
      saveRecentAccessed(newAccessed); // Guardar en AsyncStorage
      return { recentAccessed: newAccessed }; // Actualizar el estado
    });
  },
}));

export default useStore;
