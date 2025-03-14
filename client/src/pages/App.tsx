import { useAuth0 } from "@auth0/auth0-react";
import { useMemo } from "react";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { AuthenticationGuard } from "../components/AuthenticationGuard";

// Actions and loaders
import { activeFlightPlansLoader } from "../services/activeFlightPlansLoader.mts";
import { aircraftDetailsLoader } from "../services/aircraftDetailsLoader.mts";
import { appActions } from "../services/appActions.mts";
import { clientTransceiversLoader } from "../services/clientTransceiversLoader.mts";
import { flightPlanDetailsLoader } from "../services/flightPlanDetailsLoader.mts";
import { flightPlanVerifyAction } from "../services/flightPlanVerifyAction.mts";
import { quickReferenceLoader } from "../services/quickReferenceLoader.mts";

// Components
import AircraftDetails from "./AircraftDetails";
import ClientTransceivers from "./ClientTransceivers";
import ErrorPage from "./ErrorPage";
import FlightPlanDetails from "./FlightPlanDetails";
import Help from "./Help";
import Logout from "./Logout";
import QuickReference from "./QuickReference";
import Verifier from "./Verifier";
import WelcomePage from "./Welcome";

const App = () => {
  const { getAccessTokenSilently } = useAuth0();

  const router = useMemo(() => {
    return createBrowserRouter([
      {
        errorElement: <ErrorPage />,
      },
      {
        path: "/",
        element: <WelcomePage />,
      },
      {
        path: "/help",
        element: <Help />,
      },
      {
        id: "logout",
        path: "/logout",
        element: <Logout />,
      },
      {
        path: "/quickreference/:key",
        element: <AuthenticationGuard role="S2" component={QuickReference} />,
        loader: quickReferenceLoader({ getAccessTokenSilently }),
      },
      {
        path: "/quickreference",
        element: <AuthenticationGuard role="S2" component={QuickReference} />,
        loader: quickReferenceLoader({ getAccessTokenSilently }),
      },
      {
        children: [
          {
            path: "/transceivers/:callsign",
            element: <ClientTransceivers />,
            loader: clientTransceiversLoader({ getAccessTokenSilently }),
          },
          {
            path: "/verifier",
            element: <AuthenticationGuard role="S2" component={Verifier} />,
            loader: activeFlightPlansLoader({ getAccessTokenSilently }),
            action: appActions({ getAccessTokenSilently }),
            children: [
              {
                path: "aircraft",
                element: <AircraftDetails />,
                loader: aircraftDetailsLoader({ getAccessTokenSilently }),
              },
              {
                path: "flightPlan/:id",
                element: <AuthenticationGuard role="S2" component={FlightPlanDetails} />,
                loader: flightPlanDetailsLoader({ getAccessTokenSilently }),
                action: flightPlanVerifyAction({ getAccessTokenSilently }),
              },
              {
                path: "flightPlan/new",
                element: <AuthenticationGuard role="S2" component={FlightPlanDetails} />,
                loader: flightPlanDetailsLoader({ getAccessTokenSilently }),
                action: flightPlanVerifyAction({ getAccessTokenSilently }),
              },
            ],
          },
        ],
      },
    ]);
  }, [getAccessTokenSilently]);

  return <RouterProvider router={router} />;
};

export default App;
