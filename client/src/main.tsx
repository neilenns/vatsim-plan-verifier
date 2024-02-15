import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { AppContextProvider } from "./context/AppContext.tsx";
import AppTheme from "./components/AppTheme.tsx";
import { Auth0ProviderWithNavigate } from "./context/Auth0ProviderWithNavigate.tsx";
import App from "./pages/App.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <AppContextProvider>
      <AppTheme>
        <Auth0ProviderWithNavigate>
          <App />
        </Auth0ProviderWithNavigate>
      </AppTheme>
    </AppContextProvider>
  </React.StrictMode>
);
