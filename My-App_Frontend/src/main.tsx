import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { I18nextProvider } from 'react-i18next';
import i18n from './utils/i18n';
import { LanguageProvider } from './utils/LanguageContext';
// 🔁 Wenn dein Routing in der URL sein soll, nutze BrowserRouter
import { BrowserRouter } from 'react-router-dom';

const root = ReactDOM.createRoot(document.getElementById('root')!);

root.render(
  <React.StrictMode>
    <I18nextProvider i18n={i18n}>
      <LanguageProvider>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </LanguageProvider>
    </I18nextProvider>
  </React.StrictMode>
);

// optional: Wenn du Web Vitals nutzen willst
reportWebVitals();
