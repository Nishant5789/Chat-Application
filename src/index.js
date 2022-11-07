import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { AuthContextProvider } from './context/Authcontext';
import { ChatcontextProvider } from './context/Chatcontext';

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <AuthContextProvider>
  <ChatcontextProvider>
  <React.StrictMode>
    <App/>
  </React.StrictMode>
  </ChatcontextProvider>
  </AuthContextProvider>
);

