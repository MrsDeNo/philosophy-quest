import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import ComparePortal from './ComparePortal';
import './styles.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <>
      <App />
      <ComparePortal />
    </>
  </React.StrictMode>
);
