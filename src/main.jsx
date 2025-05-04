import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";  // ← dikkat: ./src/index.css değil sadece ./index.css

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);