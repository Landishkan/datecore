// src/main.jsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';

// Montserrat: базовый (400) через корень, остальные через файлы
import '@fontsource/montserrat';
import '@fontsource/montserrat/700.css';
import '@fontsource/montserrat/800.css';
import '@fontsource/montserrat/900.css';
import '@fontsource/montserrat/800-italic.css';
import '@fontsource/montserrat/900-italic.css';

// Golos Text: базовый (400) через корень
import '@fontsource/golos-text';
import '@fontsource/golos-text/500.css';
import '@fontsource/golos-text/600.css';

import './styles/globals.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);