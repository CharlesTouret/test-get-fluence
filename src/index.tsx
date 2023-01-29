import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { Provider } from 'react-redux';
import { ConfigProvider } from 'antd';
import frFR from 'antd/es/locale/fr_FR';
import enUS from 'antd/es/locale/en_US';
import { PersistGate } from 'redux-persist/integration/react';
import { GoogleOAuthProvider } from '@react-oauth/google';
import reportWebVitals from './reportWebVitals';
import Router from './router/Router';
import { store, persistor } from './store/store';
import 'antd/dist/antd.css';
import i18n from './helpers/trads/i18n';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement,
);
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <ConfigProvider locale={i18n.resolvedLanguage === 'fr' ? frFR : enUS}>
        <GoogleOAuthProvider clientId={process.env.REACT_APP_GOOGLE_OAUTH_CLIENT_ID || ''}>
          <PersistGate loading={null} persistor={persistor}>
            <Router />
          </PersistGate>
        </GoogleOAuthProvider>
      </ConfigProvider>

    </Provider>
  </React.StrictMode>,
);

reportWebVitals();
