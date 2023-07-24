import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";

import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";

// Routes
import ErrorPage from "./ErrorPage";
import App from "./routes/App.tsx";
import FlightPlanDetails from "./routes/FlightPlanDetails.tsx";
import LoginRegister from "./routes/LoginRegister.tsx";

// Loaders
import { flightPlanDetailsLoader } from "./routes/flightPlanDetailsLoader.mts";
import { flightPlanVerifyAction } from "./routes/flightPlanVerifyAction.mts";
import { activeFlightPlansLoader } from "./routes/activeFlightPlansLoader.mts";
import { activeFlightPlansAction } from "./routes/activeFlightPlansAction.mts";
import { ThemeProvider } from "@emotion/react";
import { createTheme, CssBaseline } from "@mui/material";
import { registerAction } from "./routes/registerAction.mts";
import { loginAction } from "./routes/loginAction.mts";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    loader: activeFlightPlansLoader,
    action: activeFlightPlansAction,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "flightPlan/:id",
        element: <FlightPlanDetails />,
        loader: flightPlanDetailsLoader,
        action: flightPlanVerifyAction,
      },
      {
        path: "flightPlan/new",
        element: <FlightPlanDetails />,
        loader: flightPlanDetailsLoader,
        action: flightPlanVerifyAction,
      },
    ],
  },
  {
    id: "login",
    path: "/login",
    element: <LoginRegister />,
    errorElement: <ErrorPage />,
    action: loginAction,
  },
  {
    id: "register",
    path: "/register",
    element: <LoginRegister />,
    errorElement: <ErrorPage />,
    action: registerAction,
  },
]);

const defaultTheme = createTheme();

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ThemeProvider theme={defaultTheme}>
      <CssBaseline />
      <RouterProvider router={router} />
    </ThemeProvider>
  </React.StrictMode>
);
