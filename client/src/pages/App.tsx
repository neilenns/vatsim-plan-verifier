import { Help } from "@mui/icons-material";
import { useMemo } from "react";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { AuthenticationGuard } from "../components/AuthenticationGuard";
import { aircraftDetailsLoader } from "../services/aircraftDetailsLoader.mts";
import { appActions } from "../services/appActions.mts";
import { clientTransceiversLoader } from "../services/clientTransceiversLoader.mts";
import { flightPlanDetailsLoader } from "../services/flightPlanDetailsLoader.mts";
import { flightPlanVerifyAction } from "../services/flightPlanVerifyAction.mts";
import { quickReferenceLoader } from "../services/quickReferenceLoader.mts";
import AircraftDetails from "./AircraftDetails";
import ClientTransceivers from "./ClientTransceivers";
import ErrorPage from "./ErrorPage";
import FlightPlanDetails from "./FlightPlanDetails";
import Logout from "./Logout";
import QuickReference from "./QuickReference";
import Verifier from "./Verifier";
import WelcomePage from "./Welcome";

const App = () => {
  const router = useMemo(() => {
    return createBrowserRouter([
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
        children: [
          {
            path: "/transceivers/:callsign",
            element: <ClientTransceivers />,
            loader: clientTransceiversLoader,
            errorElement: <ErrorPage />,
          },
          {
            path: "/verifier",
            element: <AuthenticationGuard role="user" component={Verifier} />,
            // loader: activeFlightPlansLoader,
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
                element: <AuthenticationGuard role="user" component={FlightPlanDetails} />,
                loader: flightPlanDetailsLoader,
                action: flightPlanVerifyAction,
              },
              {
                path: "flightPlan/new",
                element: <AuthenticationGuard role="user" component={FlightPlanDetails} />,
                loader: flightPlanDetailsLoader,
                action: flightPlanVerifyAction,
              },
            ],
          },
        ],
      },
    ]);
  }, []);

  return <RouterProvider router={router} />;
};

export default App;
