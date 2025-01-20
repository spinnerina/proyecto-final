import axios from 'axios';
import {  useRouter  } from 'vue-router';

const router = useRouter();
const axiosInstance = axios.create({
  baseURL: 'http://localhost:3000/api/', // URL base
});

// Interceptar respuestas
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      sessionStorage.removeItem('token');
      router.push({ name: 'login' });
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
