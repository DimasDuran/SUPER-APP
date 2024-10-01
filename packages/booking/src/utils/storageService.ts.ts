import AsyncStorage from '@react-native-async-storage/async-storage';

// Llaves para guardar los datos
const IMAGE_KEY = 'saved_image';
const INFO_KEY = 'saved_info';

// Guardar imagen en AsyncStorage
export const saveImage = async (imageUri: string) => {
  try {
    await AsyncStorage.setItem(IMAGE_KEY, imageUri);
    console.log('Image saved successfully');
  } catch (error) {
    console.error('Error saving image:', error);
  }
};

// Obtener imagen de AsyncStorage
export const getImage = async (): Promise<string | null> => {
  try {
    const imageUri = await AsyncStorage.getItem(IMAGE_KEY);
    return imageUri;
  } catch (error) {
    console.error('Error retrieving image:', error);
    return null;
  }
};

// Guardar otros datos (ejemplo: resultados de la predicción)
export const saveInfo = async (info: object) => {
  try {
    const jsonValue = JSON.stringify(info);
    await AsyncStorage.setItem(INFO_KEY, jsonValue);
    console.log('Info saved successfully');
  } catch (error) {
    console.error('Error saving info:', error);
  }
};

// Obtener otros datos de AsyncStorage
export const getInfo = async (): Promise<object | null> => {
  try {
    const jsonValue = await AsyncStorage.getItem(INFO_KEY);
    return jsonValue != null ? JSON.parse(jsonValue) : null;
  } catch (error) {
    console.error('Error retrieving info:', error);
    return null;
  }
};

// Borrar los datos
export const clearStorage = async () => {
  try {
    await AsyncStorage.removeItem(IMAGE_KEY);
    await AsyncStorage.removeItem(INFO_KEY);
    console.log('Storage cleared successfully');
  } catch (error) {
    console.error('Error clearing storage:', error);
  }
};
