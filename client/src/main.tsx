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
import FlightPlan from "./routes/FlightPlan.tsx";

// Loaders
import { flightPlanLoader } from "./db/flightPlan.mts";

const handler = () => {
  console.log("Hi");
};

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "flightPlan/:id",
        element: (
          <FlightPlan
            onReset={handler}
            onStoreFlightPlan={handler}
            onVerify={handler}
            verifierResults={null}
          />
        ),
        loader: flightPlanLoader,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
