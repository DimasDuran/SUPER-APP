import AsyncStorage from '@react-native-async-storage/async-storage';
import { create } from 'zustand';

interface ImageResult {
  class: string;
  probability: number;
  date: string;
}

interface StoreState {
  imageResults: ImageResult[];
  loadResults: () => Promise<void>;
  addResult: (newResult: ImageResult) => Promise<void>;
}

const useStore = create<StoreState>((set) => ({
  imageResults: [],

  // Acción para cargar los datos desde AsyncStorage
  loadResults: async () => {
    try {
      const storedResults = await AsyncStorage.getItem('imageResults');
      const parsedResults: ImageResult[] = storedResults ? JSON.parse(storedResults) : [];
      
      // Actualizar el estado solo si hay nuevos datos
      set({ imageResults: parsedResults });
    } catch (error) {
      console.error('Error loading data from AsyncStorage:', error);
    }
  },

  // Acción para agregar un nuevo resultado
  addResult: async (newResult: ImageResult) => {
    try {
      // Obtener los resultados almacenados
      const storedResults = await AsyncStorage.getItem('imageResults');
      const parsedResults: ImageResult[] = storedResults ? JSON.parse(storedResults) : [];

      // Actualizar los resultados con el nuevo dato
      const updatedResults = [...parsedResults, newResult];

      // Guardar los datos actualizados en AsyncStorage
      await AsyncStorage.setItem('imageResults', JSON.stringify(updatedResults));

      // Actualizar el estado local
      set({ imageResults: updatedResults });
    } catch (error) {
      console.error('Error saving data to AsyncStorage:', error);
    }
  },
}));

export default useStore;
