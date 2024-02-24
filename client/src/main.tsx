import React from "react";
import ReactDOM from "react-dom/client";
import AppTheme from "./components/AppTheme.tsx";
import { AppContextProvider } from "./context/AppContext.tsx";
import { Auth0ProviderWithNavigate } from "./context/Auth0ProviderWithNavigate.tsx";
import "./index.css";
import App from "./pages/App.tsx";
import { RecoilRoot } from "recoil";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <AppContextProvider>
      <RecoilRoot>
        <Auth0ProviderWithNavigate>
          <AppTheme>
            <App />
          </AppTheme>
        </Auth0ProviderWithNavigate>
      </RecoilRoot>
    </AppContextProvider>
  </React.StrictMode>
);
