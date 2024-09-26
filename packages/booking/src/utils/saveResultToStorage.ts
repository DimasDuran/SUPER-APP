import AsyncStorage from '@react-native-async-storage/async-storage';

// Función para obtener la fecha en formato 'año-mes-día-hora'
const getFormattedDate = () => {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, '0'); // Mes en formato 'MM'
  const day = String(now.getDate()).padStart(2, '0'); // Día en formato 'DD'
  const hour = String(now.getHours()).padStart(2, '0'); // Hora en formato 'HH'
  const minutes = String(now.getMinutes()).padStart(2, '0'); // Minutos en formato 'MM'

  return `${year}-${month}-${day}-${hour}:${minutes}`;
};

// Función para guardar datos en AsyncStorage con la fecha incluida
const saveResultToStorage = async (result: object) => {
  try {
    const storedResults = await AsyncStorage.getItem('imageResults');
    let parsedResults = storedResults ? JSON.parse(storedResults) : [];

    // Agregar la fecha al resultado
    const resultWithDate = {
      ...result,
      date: getFormattedDate(), // Agregar la fecha formateada al objeto result
    };

    // Agregar el nuevo resultado al array existente
    parsedResults.push(resultWithDate);

    // Guardar el array actualizado en AsyncStorage
    await AsyncStorage.setItem('imageResults', JSON.stringify(parsedResults));
    console.log('Data saved to AsyncStorage:', resultWithDate);
  } catch (error) {
    console.error('Error saving to AsyncStorage:', error);
  }
};

export default saveResultToStorage;
