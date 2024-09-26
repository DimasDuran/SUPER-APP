import axios from 'react-native-axios';
import Config from 'react-native-config';

const apiClient = axios.create({
  baseURL: Config.API_URL, 
  timeout: 10000,
  headers: {
    'Accept': 'application/json',
  },
});

apiClient.interceptors.response.use(
  response => response,
  error => {
    const status = error.response ? error.response.status : null;
    if (status === 404) {
      console.error('Error 404: Not Found');
    } else if (status === 500) {
      console.error('Error 500: Internal Server Error');
    } else {
      console.error('An unexpected error occurred:', error.message);
    }
    return Promise.reject(error);
  }
);

export default apiClient;


