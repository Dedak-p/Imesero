import axios from 'axios'; //Importamos axios , es una libreria JavaScript utilizadas para hacer solicitudes HTTP . Es una alternativa mas moderna y facil de usar que XMLHttpRequest 
// o fetch para interactuar con Apis o servidores
window.axios = axios; //Assignamos axios al objeto global window
//Esta linea esta configurando los encabezados por defecto que se enviaran con todas las solicitudes HTTP realizadas mediante axios.
window.axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';
