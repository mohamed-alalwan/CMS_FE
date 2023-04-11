import React from 'react';
import ReactDOM from 'react-dom/client';
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.min.js';
import './index.css';
import './builder.css'
import App from './App';
import './App.css';
import '@fortawesome/fontawesome-free/css/all.css';
import reportWebVitals from './reportWebVitals';
import "grapesjs/dist/css/grapes.min.css";

import "grapesjs/dist/css/grapes.min.css";


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <App />
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
