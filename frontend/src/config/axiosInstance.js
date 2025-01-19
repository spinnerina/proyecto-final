import axios from 'axios';
import {  useRouter  } from 'vue-router';

const router = useRouter();
const axiosInstance = axios.create({
  baseURL: 'http://localhost:3000/api/', // Cambia por la URL base de tu API
});

// Interceptar respuestas
axiosInstance.interceptors.response.use(
  (response) => response, // Devolver la respuesta si es exitosa
  (error) => {
    if (error.response && error.response.status === 401) {
      // Eliminar el token de sessionStorage
      sessionStorage.removeItem('token');

      // Redirigir al usuario al login
      router.push({ name: 'login' });
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
