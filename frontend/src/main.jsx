import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.jsx';
import { BrowserRouter as Router } from 'react-router-dom';  // Importa Router

createRoot(document.getElementById('root')).render(
  <StrictMode> {/*StrictMode nos permite detectar problemas potenciales en desarrollo  */}
    <Router>  {/* Envolvemos todo el árbol de componentes dentro de Router */}
      <App />
    </Router>
  </StrictMode>
);