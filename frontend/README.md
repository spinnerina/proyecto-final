# frontend

Este template te ayudará a comenzar a desarrollar con Vue 3 en Vite.


## Configuración del Proyecto

1. Instalar las dependencias del proyecto:

    ```sh
    npm install
    ```

2. Si necesitas cambiar el puerto de la API, debes modificar la URL base en `src/config/axiosInstance.js`:

    ```js
    // src/config/axiosInstance.js
    const axiosInstance = axios.create({
        baseURL: 'http://localhost:3000/api/',
    });
    ```

### Compilar y Recargar en Caliente para Desarrollo

```sh
npm run dev
```