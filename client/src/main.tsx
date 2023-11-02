import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";
import { AppContextProvider } from "./context/AppContext.tsx";
import AppTheme from "./components/AppTheme.tsx";

// Routes
import ErrorPage from "./pages/ErrorPage.tsx";
import Verifier from "./pages/Verifier.tsx";
import FlightPlanDetails from "./pages/FlightPlanDetails.tsx";
import LoginSignup from "./pages/LoginSignup.tsx";
import Logout from "./pages/Logout.tsx";
import App from "./pages/App.tsx";
import Help from "./pages/Help.tsx";

// Loaders
import { flightPlanDetailsLoader } from "./services/flightPlanDetailsLoader.mts";
import { flightPlanVerifyAction } from "./services/flightPlanVerifyAction.mts";
import { activeFlightPlansLoader } from "./services/activeFlightPlansLoader.mts";
import { appActions } from "./services/appActions.mts";
import { AuthenticationGuard } from "./components/AuthenticationGuard.tsx";
import WelcomePage from "./pages/Welcome.tsx";
import AdminPage from "./pages/Admin.tsx";
import Users from "./pages/Users.tsx";
import { usersLoader } from "./services/usersLoader.mts";
import QuickReference from "./pages/QuickReference.tsx";
import { quickReferenceLoader } from "./services/quickReferenceLoader.mts";
import { clientTransceiversLoader } from "./services/clientTransceiversLoader.mts";
import ClientTransceivers from "./pages/ClientTransceivers.tsx";
import AircraftDetails from "./pages/AircraftDetails.tsx";
import { aircraftDetailsLoader } from "./services/aircraftDetailsLoader.mts";

const router = createBrowserRouter([
  {
    path: "/",
    element: <WelcomePage />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/help",
    element: <Help />,
  },
  {
    id: "login",
    path: "/login",
    element: <LoginSignup />,
    errorElement: <ErrorPage />,
  },
  {
    id: "signup",
    path: "/signup",
    element: <LoginSignup />,
    errorElement: <ErrorPage />,
  },
  {
    id: "logout",
    path: "/logout",
    element: <Logout />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/quickreference/:key",
    element: <QuickReference />,
    errorElement: <ErrorPage />,
    loader: quickReferenceLoader,
  },
  {
    path: "/quickreference",
    element: <QuickReference />,
    errorElement: <ErrorPage />,
    loader: quickReferenceLoader,
  },
  {
    element: <App />,
    children: [
      {
        path: "/transceivers/:callsign",
        element: <ClientTransceivers />,
        loader: clientTransceiversLoader,
        errorElement: <ErrorPage />,
      },
      {
        path: "/verifier",
        element: <AuthenticationGuard role="user" component={<Verifier />} />,
        loader: activeFlightPlansLoader,
        action: appActions,
        errorElement: <ErrorPage />,
        children: [
          {
            path: "aircraft",
            element: <AircraftDetails />,
            loader: aircraftDetailsLoader,
            errorElement: <ErrorPage />,
          },
          {
            path: "flightPlan/:id",
            element: <AuthenticationGuard role="user" component={<FlightPlanDetails />} />,
            loader: flightPlanDetailsLoader,
            action: flightPlanVerifyAction,
          },
          {
            path: "flightPlan/new",
            element: <AuthenticationGuard role="user" component={<FlightPlanDetails />} />,
            loader: flightPlanDetailsLoader,
            action: flightPlanVerifyAction,
          },
        ],
      },
      {
        path: "/admin",
        element: <AuthenticationGuard role="admin" component={<AdminPage />} />,
        errorElement: <ErrorPage />,
        children: [
          {
            path: "users",
            element: <AuthenticationGuard role="admin" component={<Users />} />,
            loader: usersLoader,
          },
        ],
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <AppContextProvider>
      <AppTheme>
        <RouterProvider router={router} />
      </AppTheme>
    </AppContextProvider>
  </React.StrictMode>
);
