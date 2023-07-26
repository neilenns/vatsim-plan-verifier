import { RouterProvider, createBrowserRouter } from "react-router-dom";
import ErrorPage from "./ErrorPage";
import Auth0Callback from "./components/Auth0Callback";
import Auth0ProviderLayout from "./components/Auth0ProviderLayout";
import { ProtectedRoute } from "./components/ProtectedRoute";
import Verifier from "./routes/Verifier";
import FlightPlanDetails from "./routes/FlightPlanDetails";
import WelcomePage from "./routes/Welcome";
import { activeFlightPlansLoader } from "./routes/activeFlightPlansLoader.mts";
import { flightPlanDetailsLoader } from "./routes/flightPlanDetailsLoader.mts";
import { flightPlanVerifyAction } from "./routes/flightPlanVerifyAction.mts";
import { appAction } from "./routes/appAction.mts";
import { useAuth0 } from "@auth0/auth0-react";

const App: React.FC = () => {
  const { getAccessTokenSilently } = useAuth0();
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
          path: "/callback",
          element: <Auth0Callback />,
        },
        {
          path: "/verifier",
          element: <ProtectedRoute component={Verifier} />,
          loader: activeFlightPlansLoader,
          action: appAction({ getAccessTokenSilently }),
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

  return <RouterProvider router={router} />;
};

export default App;
