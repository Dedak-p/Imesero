// src/hooks/useApiCall.js
import { useState, useEffect, useCallback } from 'react';
import apiClient from '../api/apiClient';

/**
 * Resultado devuelto por el hook useApiCall.
 *
 * @typedef {Object} ApiCallResult
 * @property {Array<any>} data        - Array de resultados (normalizado a array).
 * @property {boolean}     loading     - Indica si la petición está en curso.
 * @property {Error|null}  error       - Error ocurrido o null si no hay error.
 * @property {function():void} refetch - Función para volver a ejecutar la llamada manualmente.
 */

/**
 * Hook genérico para realizar llamadas a la API y normalizar la respuesta siempre como un array.
 *
 * @param {string} endpoint
 *   Ruta de la API a la que se hará la solicitud (por ejemplo '/productos').
 * @param {'get'|'post'|'put'|'patch'|'delete'} [method='get']
 *   Método HTTP a utilizar.
 * @param {Object|null} [body=null]
 *   Cuerpo de la solicitud para métodos POST, PUT o PATCH.
 * @param {Array<any>} [dependencies=[]]
 *   Dependencias que, al cambiar, volverán a disparar la llamada.
 * @returns {ApiCallResult}
 *   Objeto con propiedades { data, loading, error, refetch }.
 */
const useApiCall = (endpoint, method = 'get', body = null, dependencies = []) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  /**
   * Ejecuta la petición a la API usando axios, actualiza los estados
   * y normaliza la respuesta a un array.
   *
   * @async
   * @private
   * @returns {Promise<void>}
   */
  const callApi = useCallback(async () => {
    setLoading(true);
    setError(null);

    const lowerMethod = method.toLowerCase();
    let request;
    if (lowerMethod === 'get' || lowerMethod === 'delete') {
      request = apiClient[lowerMethod](endpoint);
    } else if (['post', 'put', 'patch'].includes(lowerMethod)) {
      request = apiClient[lowerMethod](endpoint, body);
    } else {
      return Promise.reject(new Error(`Método ${method} no soportado`));
    }

    try {
      const response = await request;
      let result = response.data;
      if (!Array.isArray(result)) {
        result = [result];
      }
      setData(result);
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  }, [endpoint, method, body, ...dependencies]);

  useEffect(() => {
    callApi();
  }, [callApi]);

  return { data, loading, error, refetch: callApi };
};

export default useApiCall;
