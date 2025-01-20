# Proyecto Final - Backend

## Requisitos Previos

- Tener instalada una base de datos MongoDB en la máquina local.
- Tener instalada la última versión estable de Node.js.

## Instalación

1. Clonar el repositorio del proyecto:

    ```bash
    git clone https://github.com/spinnerina/proyecto-final.git
    ```

2. Navegar al directorio del backend:

    ```bash
    cd proyecto-final/backend
    ```

3. Copiar el archivo `.env.example` y guardarlo como `.env`:

    ```bash
    cp .env.example .env
    ```
    4. Editar el archivo `.env` y configurar las siguientes variables:

        ```env
        PORT=3000
        JWT_SECRET=<GENERAR_SECRET_KEY>
        URI_DB=<CADENA_DE_CONEXION_A_MONGO>
        ```

        Para generar una `JWT_SECRET`, puedes usar el siguiente comando en bash:

        ```bash
        openssl rand -base64 32
        ```

5. Instalar las dependencias del proyecto:

    ```bash
    npm install
    ```

## Ejecución

Para ejecutar el proyecto en modo desarrollo, utiliza el siguiente comando:

```bash
npm run dev
```

## Configuración Adicional

Si decides cambiar el puerto en el archivo `.env`, asegúrate de actualizar la URL base en el archivo `frontend/src/config/axiosInstance.js` con el nuevo puerto.

## Colección de Postman

Para facilitar las pruebas de los endpoints del backend, se ha incluido una colección de Postman. Puedes importarla en tu Postman siguiendo estos pasos:

1. Abre Postman y haz clic en "Importar" en la esquina superior izquierda.
2. Selecciona la opción "Archivo" y carga el archivo `proyecto-final-backend.postman_collection.json` que se encuentra en el directorio raíz del proyecto.
3. Una vez importada, podrás ver y utilizar todos los endpoints disponibles en el backend.
