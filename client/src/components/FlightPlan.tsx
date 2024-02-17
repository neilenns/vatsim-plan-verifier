import { OpenInNew } from "@mui/icons-material";
import { LoadingButton } from "@mui/lab";
import { Box, Button, Grid, Link, Stack, Tooltip, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { Form, useNavigation } from "react-router-dom";
import { useAppContext } from "../hooks/useAppContext.mjs";
import IFlightPlan from "../interfaces/IFlightPlan.mjs";
import IVerifyAllResult from "../interfaces/IVerifyAllResult.mts";
import {
  formattedExpectIn,
  formattedInitialAltitude,
  hyperlinkSidName,
  normalizeAirportName,
  parseFlightPlan,
  validateFlightPlan,
} from "../utils/flightPlanParser";
import { CallsignTooltip } from "./CallsignTooltip";
import { EquipmentInfoTooltip } from "./EquipmentInfoTooltip";
import FlightPlanTextField from "./FlightPlanTextField";

interface FlightPlanProps {
  flightPlan: IFlightPlan;
  verifierResults: IVerifyAllResult | undefined;
}

const FlightPlan = (props: FlightPlanProps) => {
  const [flightPlan, setFlightPlan] = useState<IFlightPlan>(props.flightPlan);
  const [verifierResults, setVerifierResults] = useState<IVerifyAllResult | undefined>(undefined);
  const [skyVectorUrl, setSkyVectorUrl] = useState<string>("");
  const [flightAwareUrl, setFlightAwareUrl] = useState<string>("");
  const [viewAircraftUrl, setViewAircraftUrl] = useState<string>("");
  const navigation = useNavigation();
  const { flow } = useAppContext();

  useEffect(() => {
    setFlightPlan(props.flightPlan);
    setVerifierResults(props.verifierResults);
  }, [props.flightPlan, props.verifierResults]);

  useEffect(() => {
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

  const copyPlan = async () => {
    if (!flightPlan) {
      return;
    }

    // Convert cruiseAltitude to a string so padStart() can be called on it
    const cruiseAltitude = flightPlan.cruiseAltitude?.toString() ?? "";

    const formattedPlan = `${flightPlan.callsign ?? ""}  ${flightPlan.rawAircraftType ?? ""}  ${
      flightPlan.squawk ?? ""
    }  ${flightPlan.departure ?? ""} - ${flightPlan.arrival ?? ""}  ${cruiseAltitude.padStart(
      3,
      "0"
    )}  ${flightPlan.route ?? ""}`;
    await navigator.clipboard.writeText(formattedPlan);
  };

  const parsePastedFlightPlan = (text: string): boolean => {
    const pastedFlightPlan = parseFlightPlan(text);
    const isValidFlightPlan = validateFlightPlan(pastedFlightPlan);

    // If it's not a valid flight plan then it's a paste of data just for the
    // field so return false and the component will handle it.
    if (!isValidFlightPlan) {
      return false;
    }

    setFlightPlan(pastedFlightPlan);

    return true;
  };

  return (
    <Box sx={{ mt: 1 }}>
      <Form method="post" id="verify-form">
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6} md={4} lg={2} key="callsign">
            <FlightPlanTextField
              id="callsign"
              label="Callsign"
              name="callsign"
              inputRef={(input: HTMLInputElement) => input && input.focus()}
              value={flightPlan.callsign ?? ""}
              helperText={
                <CallsignTooltip
                  cid={flightPlan.cid}
                  pilotName={flightPlan.pilotName}
                  callsignTelephony={flightPlan.callsignTelephony}
                  pilotStats={flightPlan.pilotStats}
                />
              }
              trim
              onPaste={parsePastedFlightPlan}
              onChange={(text) => {
                flightPlan.callsign = text;
              }}
              hasErrors={verifierResults?.hasCallsignErrors}
              hasWarnings={verifierResults?.hasCallsignWarnings}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={4} lg={2} key="aircraft">
            <FlightPlanTextField
              id="rawAircraftType"
              label="Aircraft type"
              name="rawAircraftType"
              value={flightPlan.rawAircraftType ?? ""}
              helperText={<EquipmentInfoTooltip equipmentInfo={flightPlan.equipmentInfo} />}
              trim
              onPaste={parsePastedFlightPlan}
              onChange={(text) => {
                flightPlan.rawAircraftType = text;
              }}
              hasErrors={verifierResults?.hasRawAircraftTypeErrors}
              hasWarnings={verifierResults?.hasRawAircraftTypeWarnings}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={4} lg={2} key="squawk">
            <FlightPlanTextField
              id="squawk"
              label="Squawk code"
              name="squawk"
              value={flightPlan.squawk ?? ""}
              trim
              onPaste={parsePastedFlightPlan}
              onChange={(text) => {
                flightPlan.squawk = text;
              }}
              hasErrors={verifierResults?.hasSquawkErrors}
              hasWarnings={verifierResults?.hasSquawkWarnings}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={4} lg={2} key="departure">
            <FlightPlanTextField
              id="departure"
              label="Departure"
              name="departure"
              value={flightPlan.departure ?? ""}
              helperText={
                flightPlan?.departureAirportInfo?.name ? (
                  <Link
                    href={`https://chartfox.org/${flightPlan.departure ?? ""}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    underline="hover"
                  >
                    {normalizeAirportName(flightPlan.departureAirportInfo.name)}
                  </Link>
                ) : (
                  " "
                )
              }
              trim
              onPaste={parsePastedFlightPlan}
              onChange={(text) => {
                flightPlan.departure = text;
              }}
              hasErrors={verifierResults?.hasDepartureErrors}
              hasWarnings={verifierResults?.hasDepartureWarnings}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={4} lg={2} key="arrival">
            <FlightPlanTextField
              id="arrival"
              label="Arrival"
              name="arrival"
              value={flightPlan.arrival ?? ""}
              helperText={
                flightPlan?.arrivalAirportInfo?.name ? (
                  <Link
                    href={`https://chartfox.org/${flightPlan.arrival ?? ""}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    underline="hover"
                  >
                    {normalizeAirportName(flightPlan.arrivalAirportInfo.name)}
                  </Link>
                ) : (
                  " "
                )
              }
              trim
              onPaste={parsePastedFlightPlan}
              onChange={(text) => {
                flightPlan.arrival = text;
              }}
              hasErrors={verifierResults?.hasArrivalErrors}
              hasWarnings={verifierResults?.hasArrivalWarnings}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={4} lg={2} key="altitude">
            <FlightPlanTextField
              id="cruiseAltitude"
              label="Cruise altitude"
              name="cruiseAltitude"
              value={flightPlan.cruiseAltitude ?? ""}
              helperText={
                flightPlan.initialAltitudeInfo && (
                  <>
                    {formattedInitialAltitude(flightPlan)}
                    <br />
                    {formattedExpectIn(flightPlan)}
                  </>
                )
              }
              trim
              onPaste={parsePastedFlightPlan}
              onChange={(text) => {
                flightPlan.cruiseAltitude = text;
              }}
              hasErrors={verifierResults?.hasCruiseAltitudeErrors}
              hasWarnings={verifierResults?.hasCruiseAltitudeWarnings}
            />
          </Grid>
          <Grid item xs={12} key="route">
            <FlightPlanTextField
              id="route"
              label="Route"
              name="route"
              canCopy
              value={flightPlan.route ?? ""}
              helperText={
                <Stack direction="row" justifyContent="space-between" width="100%" component="span">
                  <Typography variant="caption" sx={{ minWidth: "50%" }}>
                    {hyperlinkSidName(flightPlan)}
                  </Typography>
                  <Tooltip title={flightPlan.remarks}>
                    {/* This method of forcing the remarks to be no longer than two lines comes from https://stackoverflow.com/a/68567180/9206264 */}
                    <Typography
                      variant="caption"
                      sx={{
                        cursor: "pointer",
                        display: "-webkit-box",
                        overflow: "hidden",
                        WebkitBoxOrient: "vertical",
                        WebkitLineClamp: 2,
                      }}
                    >
                      {flightPlan.cleanedRemarks}
                    </Typography>
                  </Tooltip>
                </Stack>
              }
              onPaste={parsePastedFlightPlan}
              onChange={(text) => {
                flightPlan.route = text;
              }}
              hasErrors={verifierResults?.hasRouteErrors}
              hasWarnings={verifierResults?.hasRouteWarnings}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={3} lg={2} key="verify">
            <LoadingButton
              fullWidth
              type="submit"
              variant="contained"
              loading={navigation.state === "submitting"}
            >
              {flightPlan.verifierResultsCount ? "Re-verify" : "Verify"}
            </LoadingButton>
          </Grid>
          <Grid item xs={12} sm={6} md={3} lg={2} key="skyvector">
            <Button
              fullWidth
              disabled={
                !flightPlan.departure || !flightPlan.arrival || !flightPlan.route || !flightPlan._id
              }
              href={skyVectorUrl}
              target="_blank"
              rel="noopener noreferrer"
              endIcon={<OpenInNew />}
            >
              SkyVector
            </Button>
          </Grid>
          <Grid item xs={12} sm={6} md={3} lg={2} key="flightaware">
            <Button
              fullWidth
              disabled={
                !flightPlan.departure || !flightPlan.arrival || !flightPlan.route || !flightPlan._id
              }
              href={flightAwareUrl}
              target="_blank"
              rel="noopener noreferrer"
              endIcon={<OpenInNew />}
            >
              FlightAware
            </Button>
          </Grid>
          <Grid item xs={12} sm={6} md={3} lg={2} key="viewaircraft">
            <Button
              fullWidth
              disabled={!flightPlan.equipmentCode || !flightPlan._id}
              href={viewAircraftUrl}
              target="_blank"
              rel="noopener noreferrer"
              endIcon={<OpenInNew />}
            >
              View aircraft
            </Button>
          </Grid>
          <Grid item xs={12} sm={6} md={3} lg={2} key="copyPlan">
            <Button
              fullWidth
              disabled={
                !flightPlan ||
                !flightPlan.callsign ||
                !flightPlan.rawAircraftType ||
                !flightPlan.squawk ||
                !flightPlan.departure ||
                !flightPlan.arrival ||
                !flightPlan.cruiseAltitude ||
                !flightPlan.route
              }
              onClick={
                // All this nonsense to handle an async method in an onClick handler comes from
                // https://stackoverflow.com/a/77162986
                () => {
                  void (async () => {
                    await copyPlan();
                  })();
                }
              }
            >
              Copy plan
            </Button>
          </Grid>
        </Grid>
        <input aria-label="hidden flow" hidden name="flow" value={flow} readOnly />
        <input
          aria-label="hidden flight plan remarks"
          hidden
          name="remarks"
          defaultValue={flightPlan.remarks}
        />
        <input aria-label="hidden cid" hidden name="cid" defaultValue={flightPlan.cid} />
        <input
          aria-label="hidden pilotName"
          hidden
          name="pilotName"
          defaultValue={flightPlan.pilotName}
        />
      </Form>
    </Box>
  );
};

export default FlightPlan;
