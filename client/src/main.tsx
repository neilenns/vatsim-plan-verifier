import React from "react";
import ReactDOM from "react-dom/client";
import AppTheme from "./components/AppTheme.tsx";
import { Auth0ProviderWithNavigate } from "./context/Auth0ProviderWithNavigate.tsx";
import "./index.css";
import App from "./pages/App.tsx";
import { RecoilRoot } from "recoil";
import { SnackbarProvider } from "notistack";
import { ENV } from "./env.mts";
import { AppContextProvider } from "./context/AppContextProvider.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <AppContextProvider>
      <RecoilRoot>
        <Auth0ProviderWithNavigate>
          <AppTheme>
            <SnackbarProvider
              autoHideDuration={ENV.VITE_SNACKBAR_AUTOHIDE_DURATION}
              preventDuplicate={true}
              anchorOrigin={{ horizontal: "center", vertical: "bottom" }}
            >
              <App />
            </SnackbarProvider>
          </AppTheme>
        </Auth0ProviderWithNavigate>
      </RecoilRoot>
    </AppContextProvider>
  </React.StrictMode>
);
