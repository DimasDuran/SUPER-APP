import {create} from 'zustand';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface RecentAppState {
  recentApps: string[]; // Lista de IDs únicos de las últimas apps accedidas
  loadRecentApps: () => Promise<void>; // Cargar la lista desde AsyncStorage
  addRecentApp: (appId: string) => Promise<void>; // Añadir un nuevo ID único a la lista
}

const useRecentAppStore = create<RecentAppState>((set) => ({
  recentApps: [],
  
  // Cargar los últimos IDs accedidos desde AsyncStorage
  loadRecentApps: async () => {
    try {
      const storedApps = await AsyncStorage.getItem('recentApps');
      if (storedApps) {
        set({ recentApps: JSON.parse(storedApps) });
      }
    } catch (error) {
      console.error('Error loading recent apps:', error);
    }
  },

  // Añadir un nuevo ID único a la lista y guardarlo en AsyncStorage
  addRecentApp: async (appId: string) => {
    try {
      set((state) => {
        // Asegurar que el ID es único
        const updatedApps = state.recentApps.includes(appId)
          ? state.recentApps
          : [...state.recentApps, appId];

        // Guardar en AsyncStorage
        AsyncStorage.setItem('recentApps', JSON.stringify(updatedApps));

        return { recentApps: updatedApps };
      });
    } catch (error) {
      console.error('Error adding recent app:', error);
    }
  },
}));

export default useRecentAppStore;
