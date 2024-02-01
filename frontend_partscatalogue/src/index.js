import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import "./i18next";
import store, { persistor } from "./redux/store";
import { Provider } from "react-redux";
import { I18nextProvider } from 'react-i18next';
import { BrowserRouter } from "react-router-dom";
import { PersistGate } from "redux-persist/integration/react";

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <BrowserRouter>
    <Provider store={store}>
      <I18nextProvider>
        <PersistGate loading={null} persistor={persistor}>
          <App />
        </PersistGate>
      </I18nextProvider>
    </Provider>
  </BrowserRouter>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
