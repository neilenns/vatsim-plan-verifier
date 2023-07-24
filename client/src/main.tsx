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
import Root from "./routes/Root.tsx";
import FlightPlanDetails from "./routes/FlightPlanDetails.tsx";

// Loaders
import { flightPlanDetailsLoader } from "./routes/flightPlanDetailsLoader.mts";
import { flightPlanVerifyAction } from "./routes/flightPlanVerifyAction.mts";
import { activeFlightPlansLoader } from "./routes/activeFlightPlansLoader.mts";
import { activeFlightPlansAction } from "./routes/activeFlightPlansAction.mts";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
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
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
