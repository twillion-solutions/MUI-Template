import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter as Router } from 'react-router-dom';
import { Toaster } from "react-hot-toast";
import { Provider } from 'react-redux';
import rootReducer from './Redux/store/index'

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Router>
    <Provider store={rootReducer}>
      <App />
      <Toaster/>
    </Provider>
    </Router>
  </React.StrictMode>
);
reportWebVitals();
