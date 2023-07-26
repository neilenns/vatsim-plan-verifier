import Grid from "@mui/material/Unstable_Grid2/Grid2"; // Grid version 2

import { Button, Stack } from "@mui/material";
import FlightPlan from "../components/FlightPlan";
import { useEffect, useState } from "react";
import IFlightPlan from "../interfaces/IFlightPlan.mjs";
import IVerifyAllResult from "../interfaces/IVerifyAllResult.mts";
import VerifierResults from "../components/VerifierResults";
import { OpenInNew } from "@mui/icons-material";
import { useLoaderData } from "react-router-dom";

type LoaderProps = {
  flightPlan: IFlightPlan;
  verifyResults: IVerifyAllResult;
};

function App() {
  const { flightPlan, verifyResults } = useLoaderData() as LoaderProps;
  const [skyVectorUrl, setSkyVectorUrl] = useState<string>("");
  const [flightAwareUrl, setFlightAwareUrl] = useState<string>("");
  const [viewAircraftUrl, setViewAircraftUrl] = useState<string>("");

  useEffect(() => {
    if (!flightPlan.callsign) {
      document.title = "Plan verifier";
    } else {
      document.title = `${flightPlan.callsign} (${flightPlan.departure}-${flightPlan.arrival})`;
    }

    if (flightPlan.departure && flightPlan.arrival && flightPlan.route) {
      const flightPlanString = `${flightPlan.departure} ${flightPlan.route} ${flightPlan.arrival}`;
      const skyVectorUrl = `https://skyvector.com/?fpl=${encodeURIComponent(flightPlanString)}`;

      setSkyVectorUrl(skyVectorUrl);
      setFlightAwareUrl(
        `https://flightaware.com/analysis/route.rvt?origin=${flightPlan.departure}&destination=${flightPlan.arrival}`
      );
    }

    if (flightPlan.equipmentCode) {
      const searchString = `${flightPlan.equipmentCode} aircraft`;
      setViewAircraftUrl(`http://www.bing.com/search?q=${encodeURIComponent(searchString)}`);
    }
  }, [flightPlan]);

  return (
    <>
      <Grid container spacing={2}>
        <Grid xs={10}>
          <FlightPlan
            flightPlan={flightPlan}
            verifierResults={verifyResults}
            onStoreFlightPlan={(flightPlan) => {
              console.log(flightPlan);
            }}
            onVerify={(results) => {
              console.log(results);
            }}
          />
        </Grid>
        <Grid xs={2} sx={{ mt: 1 }}>
          <Stack spacing={2}>
            <Button
              fullWidth
              disabled={!flightPlan.departure || !flightPlan.arrival || !flightPlan.route}
              href={skyVectorUrl}
              target="_blank"
              rel="noopener noreferrer"
              endIcon={<OpenInNew />}
            >
              SkyVector
            </Button>
            <Button
              fullWidth
              disabled={!flightPlan.departure || !flightPlan.arrival || !flightPlan.route}
              href={flightAwareUrl}
              target="_blank"
              rel="noopener noreferrer"
              endIcon={<OpenInNew />}
            >
              FlightAware
            </Button>
            <Button
              fullWidth
              disabled={!flightPlan.equipmentCode}
              href={viewAircraftUrl}
              target="_blank"
              rel="noopener noreferrer"
              endIcon={<OpenInNew />}
            >
              View aircraft
            </Button>
          </Stack>
        </Grid>
        <Grid xs={12}>
          <VerifierResults verifierResults={verifyResults?.results} flightPlan={flightPlan} />
        </Grid>
      </Grid>
    </>
  );
}

export default App;
