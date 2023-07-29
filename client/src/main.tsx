import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";

// Routes
import ErrorPage from "./pages/ErrorPage.tsx";
import Verifier from "./pages/Verifier.tsx";
import FlightPlanDetails from "./pages/FlightPlanDetails.tsx";
import LoginSignup from "./pages/LoginSignup.tsx";
import Logout from "./pages/Logout.tsx";

// Loaders
import { flightPlanDetailsLoader } from "./services/flightPlanDetailsLoader.mts";
import { flightPlanVerifyAction } from "./services/flightPlanVerifyAction.mts";
import { activeFlightPlansLoader } from "./services/activeFlightPlansLoader.mts";
import { appActions } from "./services/appActions.mts";
import { signupAction } from "./services/signupAction.mts";
import { loginAction } from "./services/loginAction.mts";
import { AuthenticationGuard } from "./components/AuthenticationGuard.tsx";
import WelcomePage from "./pages/Welcome.tsx";
import AdminPage from "./pages/Admin.tsx";
import Users from "./pages/Users.tsx";
import { usersLoader } from "./services/usersLoader.mts";
import { logoutLoader } from "./services/logoutLoader.mts";
import AppFramework from "./components/AppFramework.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <WelcomePage />,
    errorElement: <ErrorPage />,
  },
  {
    id: "login",
    path: "/login",
    element: <LoginSignup />,
    errorElement: <ErrorPage />,
    action: loginAction,
  },
  {
    id: "signup",
    path: "/signup",
    element: <LoginSignup />,
    errorElement: <ErrorPage />,
    action: signupAction,
  },
  {
    id: "logout",
    path: "/logout",
    element: <Logout />,
    errorElement: <ErrorPage />,
    loader: logoutLoader,
  },
  {
    element: <AppFramework />,
    children: [
      {
        path: "/verifier",
        element: <AuthenticationGuard role="user" component={<Verifier />} />,
        loader: activeFlightPlansLoader,
        action: appActions,
        errorElement: <ErrorPage />,
        children: [
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
    <RouterProvider router={router} />
  </React.StrictMode>
);
