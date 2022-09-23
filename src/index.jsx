import React from 'react';
import ReactDOM from 'react-dom/client';

import App from './App';
import './assets/stylesheet/main.scss';

import { store } from './app/store';
import { Provider } from 'react-redux';

import { config } from '@fortawesome/fontawesome-svg-core';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

config.autoAddCss = false;
const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path='/*' element={<App />} />
        </Routes>
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
);
