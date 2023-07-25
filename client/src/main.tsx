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

// Loaders
import { flightPlanDetailsLoader } from "./routes/flightPlanDetailsLoader.mts";
import { flightPlanVerifyAction } from "./routes/flightPlanVerifyAction.mts";
import { activeFlightPlansLoader } from "./routes/activeFlightPlansLoader.mts";
import { appActions } from "./routes/appActions.mts";
import { ProtectedRoute } from "./components/ProtectedRoute.tsx";
import Auth0ProviderLayout from "./components/Auth0ProviderLayout.tsx";

const router = createBrowserRouter([
  {
    element: <Auth0ProviderLayout />,
    children: [
      {
        path: "/",
        element: <ProtectedRoute component={<App />} />,
        loader: activeFlightPlansLoader,
        action: appActions,
        errorElement: <ErrorPage />,
        children: [
          {
            path: "flightPlan/:id",
            element: <ProtectedRoute component={<FlightPlanDetails />} />,
            loader: flightPlanDetailsLoader,
            action: flightPlanVerifyAction,
          },
          {
            path: "flightPlan/new",
            element: <ProtectedRoute component={<FlightPlanDetails />} />,
            loader: flightPlanDetailsLoader,
            action: flightPlanVerifyAction,
          },
        ],
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
