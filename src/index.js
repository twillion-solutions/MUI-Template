import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter as Router } from 'react-router-dom';
import { Toaster } from "react-hot-toast";
import { Provider } from 'react-redux';
import  store ,{ persistor } from './Redux/store/index'
import { PersistGate } from 'redux-persist/integration/react';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Router>
    <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <App />
      <Toaster/>
      </PersistGate>
    </Provider>
    </Router>
  </React.StrictMode>
);
reportWebVitals();
