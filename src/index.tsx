import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter } from 'react-router-dom';
import AppContext from './context';
import { CustomErrorBoundary } from './components/ErrorBoundary';
import '../src/styles/projects.css';
import 'react-toastify/ReactToastify.min.css';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);

root.render(
  <AppContext>
    <BrowserRouter>
      <CustomErrorBoundary>
        <React.StrictMode>
          <App />
        </React.StrictMode>
      </CustomErrorBoundary>
    </BrowserRouter>
  </AppContext>
);
