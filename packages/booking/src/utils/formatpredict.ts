const formatPrediction = (prediction: number): string => {
  const percentage = (prediction * 100).toFixed(1); // Multiplica por 100 y formatea
  return `${percentage} %`; // Retorna el formato deseado
};

export default formatPrediction
  