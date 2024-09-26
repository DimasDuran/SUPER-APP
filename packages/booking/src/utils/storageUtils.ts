// storageUtils.ts
import AsyncStorage from '@react-native-async-storage/async-storage';

export const updateRequestCount = async () => {
  try {
    const requestCount = await AsyncStorage.getItem('requestCount');
    let count = requestCount ? parseInt(requestCount) : 0;

    count += 1;
    await AsyncStorage.setItem('requestCount', count.toString());
    
    return count; // Retorna el número de peticiones actualizadas (opcional)
  } catch (error) {
    console.error('Error updating request count:', error);
  }
};


// Función para actualizar la cuenta de ejecuciones por clase
export const updateClassCount = async (className: string) => {
  try {
    const storedData = await AsyncStorage.getItem('classCounts');
    let classCounts = storedData ? JSON.parse(storedData) : [];

    // Verificar si la clase ya existe en el almacenamiento
    const classIndex = classCounts.findIndex((item: any) => item.name === className);
    if (classIndex >= 0) {
      // Incrementar la cuenta de la clase existente
      classCounts[classIndex].population += 1;
    } else {
      // Agregar una nueva clase con cuenta inicial de 1
      classCounts.push({
        name: className,
        population: 1,
        color: getRandomColor(), // Color aleatorio para cada clase
        legendFontColor: '#7F7F7F',
        legendFontSize: 15,
      });
    }

    // Guardar el nuevo estado en AsyncStorage
    await AsyncStorage.setItem('classCounts', JSON.stringify(classCounts));
    return classCounts;
  } catch (error) {
    console.error('Error updating class count:', error);
  }
};

// Función auxiliar para generar colores aleatorios
const getRandomColor = () => {
  const letters = '0123456789ABCDEF';
  let color = '#';
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
};
