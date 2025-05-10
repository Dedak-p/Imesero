/**
 * Punto de entrada de la aplicación React.
 *
 * Configura las comprobaciones de accesibilidad con axe-core,
 * envuelve el árbol de componentes en StrictMode, Router y AppContext,
 * y renderiza el componente <App /> en el elemento con id "root".
 */
import React from 'react';
import ReactDOM from 'react';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.jsx';
import { BrowserRouter as Router } from 'react-router-dom';
import axe from '@axe-core/react';
import AppContext from './context/AppContext.jsx';

/**
 * Inicializa axe-core para realizar auditorías de accesibilidad
 * cada 1000 ms tras el montaje del DOM.
 */
axe(React, ReactDOM, 1000);

/**
 * Renderiza la aplicación React en el DOM.
 *
 * @returns {void}
 */
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Router>
      <AppContext>
        <App />
      </AppContext>
    </Router>
  </StrictMode>
);
