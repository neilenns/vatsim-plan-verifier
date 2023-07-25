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
import WelcomePage from "./routes/Welcome.tsx";

const router = createBrowserRouter([
  {
    // This method of wrapping the Auth0Provider around the entire route comes from
    // https://stackoverflow.com/questions/73934043/how-to-use-auth0-provider-with-the-new-createbrowsererouter-in-v6-4.
    element: <Auth0ProviderLayout />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        element: <WelcomePage />,
      },
      {
        path: "/app",
        element: <ProtectedRoute component={App} />,
        loader: activeFlightPlansLoader,
        action: appActions,
        children: [
          {
            path: "flightPlan/:id",
            element: <ProtectedRoute component={FlightPlanDetails} />,
            loader: flightPlanDetailsLoader,
            action: flightPlanVerifyAction,
          },
          {
            path: "flightPlan/new",
            element: <ProtectedRoute component={FlightPlanDetails} />,
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
