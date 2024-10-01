// CameraStore.ts
import {create} from 'zustand';

// Define the store's state interface
interface CameraState {
  isCameraActive: boolean; // Indicates if the camera is active
  setCameraActive: (isActive: boolean) => void; // Function to update camera state
}

// Create the Zustand store with type safety
const useCameraStore = create<CameraState>((set) => ({
  isCameraActive: false, // Initial state
  setCameraActive: (isActive: boolean) => set({ isCameraActive: isActive }), // Update the state
}));

export default useCameraStore;
