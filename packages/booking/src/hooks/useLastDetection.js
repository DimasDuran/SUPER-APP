import { create } from 'zustand';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Hook de Zustand para manejar las detecciones
const useLastDetection = create((set) => ({
  lastDetections: [],
  
  // Añadir una nueva detección y guardarla en AsyncStorage
  addDetection: async (detection) => {
    set((state) => ({
      lastDetections: [...state.lastDetections, detection],
    }));

    try {
      const currentDetections = await AsyncStorage.getItem('detections');
      const parsedDetections = currentDetections ? JSON.parse(currentDetections) : [];
      const updatedDetections = [...parsedDetections, detection];
      await AsyncStorage.setItem('detections', JSON.stringify(updatedDetections));
    } catch (error) {
      console.error('Error saving detection:', error);
    }
  },

  // Cargar las detecciones almacenadas desde AsyncStorage
  loadDetections: async () => {
    try {
      const savedDetections = await AsyncStorage.getItem('detections');
      const parsedDetections = savedDetections ? JSON.parse(savedDetections) : [];
      set({ lastDetections: parsedDetections });
    } catch (error) {
      console.error('Error loading detections:', error);
    }
  },
}));

export default useLastDetection;
