import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import axios from 'axios';
import './App.css'

axios.defaults.withCredentials = true;
axios.defaults.baseURL = 'http://192.168.1.139:8000';


const getProduct = async () => {
  
  axios.get('/api/products')
  .then(response => console.log(response.data))
  .catch(error => console.error(error));
  
};

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div>
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>

      <div className='bg-yellow-300 rounded-lg my-8 px-8 py-4 text-black hover:bg-white transition-color duration-500 hover:scale-110 cursor-pointer'>
        <h2> Esto es una prueba con tailwindCSS</h2>
        <p className='mt-5 text-right'>- Dídac -</p>
      </div>
      <button onClick={getProduct} >Prueba con axios (peticion AYAX con react)</button>
      <p className='my-4'>
        Comprueba la respuesta por consola
      </p>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.jsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  )
}

export default App
