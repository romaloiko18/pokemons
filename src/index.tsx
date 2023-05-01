import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter } from 'react-router-dom';
import { ModalContextProvider } from './context/modal';
import { ProjectContextProvider } from './context/project';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
  <ProjectContextProvider>
    <ModalContextProvider>
      <BrowserRouter>
        <React.StrictMode>
          <App />
        </React.StrictMode>
      </BrowserRouter>
    </ModalContextProvider>
  </ProjectContextProvider>
);
