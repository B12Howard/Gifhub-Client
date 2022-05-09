import React from 'react';
import ReactDOM from 'react-dom';
import './index.scss';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from 'react-router-dom';
import { register as registerServiceWorker } from './serviceWorkerRegistration';
import AppRoutes from './Views/Routes';
import { HelmetProvider } from 'react-helmet-async';
// import Offline from './Shared/Components/Offline/offline';

ReactDOM.render(
    <React.StrictMode>
        <HelmetProvider>
            <BrowserRouter>
                <AppRoutes />
            </BrowserRouter>
        </HelmetProvider>
    </React.StrictMode>,
    document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

registerServiceWorker();
