import React from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App';

//ReactDOM.render(
//  <React.StrictMode>
//    <App />
//  </React.StrictMode>,
//  document.getElementById('root')
//);
createRoot(document.getElementById('root')).render(<App />);
