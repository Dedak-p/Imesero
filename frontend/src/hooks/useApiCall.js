// src/hooks/useApiCall.js
import { useState, useEffect, useCallback } from 'react';
import apiClient from '../api/apiClient';

/**
 * Hook genérico para realizar llamadas a la API. Las peticiones simpre devolveran array auqne el resultado no lo sea.Para evitar comprovarlo constantemente en cada componente
 * @param {string} endpoint - La ruta a la que se hará la solicitud (por ej. '/productes')
 * @param {string} method - Método HTTP a utilizar (por defecto 'get')
 * @param {object|null} body - Cuerpo de la solicitud (para POST, PUT, etc)
 * @param {Array} dependencies - Dependencias del useEffect para volver a ejecutar la petición
 */
const useApiCall = (endpoint, method = 'get', body = null, dependencies = []) => {
    // Se inicializa data como un array vacío para evitar errores en operaciones de arrays.
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
  
    const callApi = useCallback(() => {
      setLoading(true);
      setError(null);
  
      const lowerMethod = method.toLowerCase();
      let request;
      if (lowerMethod === 'get' || lowerMethod === 'delete') {
        request = apiClient[lowerMethod](endpoint);
      } else if (lowerMethod === 'post' || lowerMethod === 'put' || lowerMethod === 'patch') {
        request = apiClient[lowerMethod](endpoint, body);
      } else {
        request = Promise.reject(new Error(`Método ${method} no soportado`));
      }
  
      request
        .then(response => {
          // Verificamos el tipo de dato recibido y lo normalizamos a array en caso de que no lo sea.
          let result = response.data;
          if (!Array.isArray(result)) {
            result = [result];
          }
          setData(result);
          setLoading(false);
        })
        .catch(err => {
          setError(err);
          setLoading(false);
        });
    }, [endpoint, method, body, ...dependencies]);
  
    useEffect(() => {
      callApi();
    }, [callApi]);
  
    return { data, loading, error, refetch: callApi };
  };
  
  export default useApiCall;