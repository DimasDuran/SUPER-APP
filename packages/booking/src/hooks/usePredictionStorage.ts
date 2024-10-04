import { useEffect, useState } from 'react';
import { getPredictionData, savePredictionData, PredictionResult } from './storagePrediction';

const usePredictionStorage = () => {
  const [predictionData, setPredictionData] = useState<PredictionResult[]>([]); // Changed to array

  useEffect(() => {
    const fetchData = async () => {
      const data = await getPredictionData();
      setPredictionData(data); // Set the fetched data
    };

    fetchData();
  }, []);

  const saveData = async (data: PredictionResult) => {
    await savePredictionData(data);
    const updatedData = await getPredictionData(); // Fetch updated predictions
    setPredictionData(updatedData); // Set the updated data
  };

  return { predictionData, saveData };
};

export default usePredictionStorage;
