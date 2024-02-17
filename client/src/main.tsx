import React from "react";
import ReactDOM from "react-dom/client";
import AppTheme from "./components/AppTheme.tsx";
import { AppContextProvider } from "./context/AppContext.tsx";
import { Auth0ProviderWithNavigate } from "./context/Auth0ProviderWithNavigate.tsx";
import "./index.css";
import App from "./pages/App.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <AppTheme>
      <AppContextProvider>
        <Auth0ProviderWithNavigate>
          <App />
        </Auth0ProviderWithNavigate>
      </AppContextProvider>
    </AppTheme>
  </React.StrictMode>
);
