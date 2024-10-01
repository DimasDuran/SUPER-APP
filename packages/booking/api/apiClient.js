import axios from 'react-native-axios';
import { API_URL } from '../env';
const apiClient = axios.create({
  // baseURL:"https://us-central1-tizonmodel-beta.cloudfunctions.net", 
  baseURL:API_URL,
  timeout: 10000,
  headers: {
    'Accept': 'application/json',
  },
});

apiClient.interceptors.response.use(
  response => response,
  error => {
    if (error.response) {
      const status = error.response.status;
      console.error(`Error ${status}:`, error.response.data || 'No additional info');
    } else {
      console.error('Error:', error.message);
    }
    return Promise.reject(error);
  }
);


export default apiClient;


