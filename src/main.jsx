import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import netlifyIdentity from 'netlify-identity-widget';
import { AuthProvider } from './context/AuthContext';

// Initialize Netlify Identity
netlifyIdentity.init();

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AuthProvider>
      <App />
    </AuthProvider>
  </React.StrictMode>
);