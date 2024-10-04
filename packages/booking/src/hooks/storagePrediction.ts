import AsyncStorage from '@react-native-async-storage/async-storage';

const PREDICTION_KEY = 'PREDICTION_DATA';

export interface PredictionResult {
  imageUri: string;
  date: string; // Formatted date as YYYY-MM-DD HH:00
  result: {
    class: string;
    confidence: number;
    // recommendations: {
    //   description: string;
    //   precautions: string[];
    //   testimonials: string[];
    // };
  };
}

// Helper function to format the date as "YYYY-MM-DD HH:00"
const formatDate = (date: Date): string => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are zero-indexed
  const day = String(date.getDate()).padStart(2, '0');
  const hours = String(date.getHours()).padStart(2, '0');

  return `${year}-${month}-${day} ${hours}:00`;
};

// Save new prediction data
export const savePredictionData = async (data: Omit<PredictionResult, 'date'>): Promise<void> => {
  try {
    // Retrieve existing predictions
    const existingData = await getPredictionData();
    const predictions = existingData ? existingData : [];

    // Create a new prediction with the current formatted date
    const newPrediction: PredictionResult = {
      ...data,
      date: formatDate(new Date()), // Add formatted date (YYYY-MM-DD HH:00)
    };

    // Add the new prediction to the array
    predictions.push(newPrediction);

    // Store the updated array back in AsyncStorage
    await AsyncStorage.setItem(PREDICTION_KEY, JSON.stringify(predictions));
  } catch (e) {
    console.error('Failed to save prediction data:', e);
  }
};

// Retrieve all prediction data
export const getPredictionData = async (): Promise<PredictionResult[]> => {
  try {
    const jsonValue = await AsyncStorage.getItem(PREDICTION_KEY);
    return jsonValue ? JSON.parse(jsonValue) : [];
  } catch (e) {
    console.error('Failed to retrieve prediction data:', e);
    return [];
  }
};

// Clear all prediction data
export const clearPredictionData = async (): Promise<void> => {
  try {
    await AsyncStorage.removeItem(PREDICTION_KEY);
  } catch (e) {
    console.error('Failed to clear prediction data:', e);
  }
};
