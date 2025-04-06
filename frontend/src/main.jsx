import React from 'react';
import ReactDOM from 'react';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.jsx';
import { BrowserRouter as Router } from 'react-router-dom';
import axe from '@axe-core/react';
import AppContext from './context/AppContext.jsx';

axe(React, ReactDOM, 1000);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Router>
      <AppContext>
        <App />
      </AppContext>
    </Router>
  </StrictMode>
);