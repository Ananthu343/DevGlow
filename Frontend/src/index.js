import React from 'react';
import ReactDOM from 'react-dom/client';
import './tailwind.css'
import App from './App';
import { Provider } from 'react-redux';
import store from './app/store';
import { Toaster } from 'react-hot-toast';
import { SocketProvider } from './configs/socket';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  // <React.StrictMode>
  <SocketProvider>
    <Provider store={store}>
      <Toaster containerClassName='align-left' />
      <App />
    </Provider>
  </SocketProvider>
  // </React.StrictMode> 
);



