import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './store/store';
import App from './App';
import './index.css';
// Import Font Awesome CSS for icons
import '@fortawesome/fontawesome-free/css/all.min.css';

// Create a root for the React application
const root = ReactDOM.createRoot(document.getElementById('root'));

// Render the application
root.render(
    <Provider store={store}>
        <BrowserRouter>
            <App />
        </BrowserRouter>
    </Provider>
);
