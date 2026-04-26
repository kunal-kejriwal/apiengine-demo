import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { APIEngineProvider } from "@apiengine/react-sdk";
import "@apiengine/react-sdk/styles.css";
import App from "./App";

const BASE_URL     = import.meta.env.VITE_API_BASE_URL     || "https://api.theapiengine.com";
const API_KEY      = import.meta.env.VITE_API_KEY          || "";
const APP_NAME     = import.meta.env.VITE_APP_NAME         || "My App";
const DOCS_URL     = import.meta.env.VITE_DOCS_URL         || "";
const DASHBOARD_URL = import.meta.env.VITE_DASHBOARD_URL   || "";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <APIEngineProvider
        baseURL={BASE_URL}
        apiKey={API_KEY}
        appName={APP_NAME}
        docsUrl={DOCS_URL}
        dashboardUrl={DASHBOARD_URL}
      >
        <App />
      </APIEngineProvider>
    </BrowserRouter>
  </React.StrictMode>
);