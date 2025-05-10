import axios from 'axios';

/**
 * Instancia de cliente Axios configurada para comunicarse con la API del backend.
 *
 * - Base URL: definida por la variable de entorno `VITE_API_URL`.
 * - Envía credenciales (cookies) con cada petición.
 *
 * @external AxiosInstance
 * @see https://axios-http.com/docs/instance
 */

/**
 * Cliente Axios utilizado en toda la aplicación.
 *
 * @type {external:AxiosInstance}
 */
const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  withCredentials: true,
});

export default apiClient;
