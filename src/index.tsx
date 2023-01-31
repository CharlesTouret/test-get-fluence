import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { Provider } from 'react-redux';
import { ConfigProvider } from 'antd';
import frFR from 'antd/es/locale/fr_FR';
import enUS from 'antd/es/locale/en_US';
import { PersistGate } from 'redux-persist/integration/react';
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
        <PersistGate loading={null} persistor={persistor}>
          <Router />
        </PersistGate>
      </ConfigProvider>
    </Provider>
  </React.StrictMode>,
);
