import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import ComparePortal from './ComparePortal';
import PortraitFallbacks from './PortraitFallbacks';
import ProfileAlignmentNotes from './ProfileAlignmentNotes';
import './styles.css';
import './portrait-art.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <>
      <App />
      <ComparePortal />
      <PortraitFallbacks />
      <ProfileAlignmentNotes />
    </>
  </React.StrictMode>
);
