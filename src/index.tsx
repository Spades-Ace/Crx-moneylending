import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import ParticleAnimation from './media/bg-canvas/bg-canvas';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <ParticleAnimation />
    <App />
  </React.StrictMode>
);
