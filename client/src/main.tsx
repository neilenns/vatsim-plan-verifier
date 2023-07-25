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
import { appActions } from "./routes/appActions.mts";
import { registerAction } from "./routes/registerAction.mts";
import { loginAction } from "./routes/loginAction.mts";
import { AuthenticationGuard } from "./routes/AuthenticationGuard.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <AuthenticationGuard component={<App />} />,
    loader: activeFlightPlansLoader,
    action: appActions,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "flightPlan/:id",
        element: <AuthenticationGuard component={<FlightPlanDetails />} />,
        loader: flightPlanDetailsLoader,
        action: flightPlanVerifyAction,
      },
      {
        path: "flightPlan/new",
        element: <AuthenticationGuard component={<FlightPlanDetails />} />,
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

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
