import clsx from "clsx";
import { Stream as StreamIcon } from "@mui/icons-material";
import { Box, IconButton, Stack, TextField, darken, lighten, styled } from "@mui/material";
import {
  DataGrid,
  GridCellParams,
  GridColDef,
  GridRowParams,
  GridValueFormatterParams,
} from "@mui/x-data-grid";
import debug from "debug";
import { DateTime } from "luxon";
import pluralize from "pluralize";
import { useEffect, useRef, useState } from "react";
import { useIdleTimer } from "react-idle-timer";
import socketIOClient, { Socket } from "socket.io-client";
import { apiKey, serverUrl } from "../configs/planVerifierServer.mts";
import { IVatsimFlightPlan, ImportState } from "../interfaces/IVatsimFlightPlan.mts";
import { processFlightPlans } from "../utils/vatsim.mts";
import AlertSnackbar, { AlertSnackBarOnClose, AlertSnackbarProps } from "./AlertSnackbar";
import { useAudio } from "./AudioHook";

function formatDateTime(params: GridValueFormatterParams<string>) {
  if (params.value === null) {
    return;
  }

  const depTime = DateTime.fromISO(params.value, { zone: "UTC" });
  return depTime.toLocaleString(DateTime.TIME_24_SIMPLE);
}

const logger = debug("plan-verifier:EDCTFlightPlans");

const columns: GridColDef[] = [
  { field: "_id" },
  {
    field: "callsign",
    headerName: "Callsign",
    width: 150,
    editable: false,
    type: "string",
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    cellClassName: (params: GridCellParams<any, string>) => {
      const flightPlan = params.row as IVatsimFlightPlan;

      return clsx({
        "vatsim--callsign": true,
        "vatsim--new": flightPlan.importState === ImportState.NEW,
        "vatsim--updated": flightPlan.importState === ImportState.UPDATED,
        "vatsim--imported": flightPlan.importState === ImportState.IMPORTED,
      });
    },
  },
  {
    field: "departure",
    headerName: "Departure airport",
    align: "center",
    headerAlign: "center",
    width: 175,
    editable: false,
  },
  {
    field: "arrival",
    headerName: "Arrival airport",
    align: "center",
    headerAlign: "center",
    width: 175,
    editable: false,
  },
  {
    field: "departureTime",
    headerName: "Departure time",
    align: "center",
    headerAlign: "center",
    width: 175,
    editable: false,
    valueFormatter: formatDateTime,
  },
  {
    field: "EDCT",
    headerName: "EDCT",
    align: "center",
    headerAlign: "center",
    width: 100,
    editable: false,
    valueFormatter: formatDateTime,
  },
  {
    field: "minutesToEDCT",
    headerName: "To EDCT",
    align: "center",
    headerAlign: "center",
    width: 100,
    editable: false,
  },
];

const getBackgroundColor = (color: string, mode: string) =>
  mode === "dark" ? darken(color, 0.7) : lighten(color, 0.7);

const getHoverBackgroundColor = (color: string, mode: string) =>
  mode === "dark" ? darken(color, 0.6) : lighten(color, 0.6);

const getSelectedBackgroundColor = (color: string, mode: string) =>
  mode === "dark" ? darken(color, 0.5) : lighten(color, 0.5);

const getSelectedHoverBackgroundColor = (color: string, mode: string) =>
  mode === "dark" ? darken(color, 0.4) : lighten(color, 0.4);

function getRowClassName(params: GridRowParams) {
  const flightPlan = params.row as IVatsimFlightPlan;
  if (!flightPlan || flightPlan.minutesToEDCT === undefined) {
    return "";
  }

  return clsx({
    "vatsim--EDCT--late": flightPlan.minutesToEDCT <= 0,
    "vatsim--EDCT--urgent": flightPlan.minutesToEDCT > 0 && flightPlan.minutesToEDCT < 10,
    "": flightPlan.minutesToEDCT >= 10,
  });
}

const StyledDataGrid = styled(DataGrid)(({ theme }) => ({
  "& .vatsim--callsign": {
    fontWeight: "bold",
    cursor: "pointer",
  },
  "& .vatsim--prefile": {
    fontStyle: "italic",
  },
  "& .vatsim--new": {
    color: theme.palette.warning.main,
  },
  "& .vatsim-updated": {
    color: theme.palette.error.main,
  },
  "& .vatsim-imported": {
    color: theme.palette.text.primary,
  },
  "& .vatsim--EDCT--urgent": {
    backgroundColor: getBackgroundColor(theme.palette.warning.main, theme.palette.mode),
    "&:hover": {
      backgroundColor: getHoverBackgroundColor(theme.palette.warning.main, theme.palette.mode),
    },
    "&.Mui-selected": {
      backgroundColor: getSelectedBackgroundColor(theme.palette.warning.main, theme.palette.mode),
      "&:hover": {
        backgroundColor: getSelectedHoverBackgroundColor(
          theme.palette.warning.main,
          theme.palette.mode
        ),
      },
    },
  },
  "& .vatsim--EDCT--late": {
    backgroundColor: getBackgroundColor(theme.palette.error.main, theme.palette.mode),
    "&:hover": {
      backgroundColor: getHoverBackgroundColor(theme.palette.error.main, theme.palette.mode),
    },
    "&.Mui-selected": {
      backgroundColor: getSelectedBackgroundColor(theme.palette.error.main, theme.palette.mode),
      "&:hover": {
        backgroundColor: getSelectedHoverBackgroundColor(
          theme.palette.error.main,
          theme.palette.mode
        ),
      },
    },
  },
}));

const VatsimEDCTFlightPlans = () => {
  const bellPlayer = useAudio("/bell.mp3");
  const disconnectedPlayer = useAudio("/disconnected.mp3");
  const [flightPlans, setFlightPlans] = useState<IVatsimFlightPlan[]>([]);
  // isConnected is initialized to null so useEffect can tell the difference between first page load
  // and actually being disconnected. Otherwise what happens is on page load the disconnect
  // sound will attempt to play.
  const [isConnected, setIsConnected] = useState<boolean | null>(null);
  const [departureCodes, setDepartureCodes] = useState(
    localStorage.getItem("edctDepartureCodes") || ""
  );
  const [arrivalCodes, setArrivalCodes] = useState(localStorage.getItem("edctArrivalCodes") || "");
  // Issue 709: This is a non-rendering version of airportCodesRef that can get safely used in useEffect()
  // to send the airport codes to the connected socket.
  const departureCodesRef = useRef<string>(localStorage.getItem("edctDepartureCodes") || "");
  const arrivalCodesCodesRef = useRef<string>(localStorage.getItem("edctArrivalCodes") || "");
  const [snackbar, setSnackbar] = useState<AlertSnackbarProps>(null);
  const socketRef = useRef<Socket | null>(null);
  const [hasNew, setHasNew] = useState(false);
  const [hasUpdates, setHasUpdates] = useState(false);

  const handleSnackbarClose: AlertSnackBarOnClose = () => setSnackbar(null);

  useEffect(() => {
    if (hasNew || hasUpdates) {
      void bellPlayer.play();
      setHasNew(false);
      setHasUpdates(false);
    }
  }, [hasNew, hasUpdates, bellPlayer]);

  useEffect(() => {
    if (isConnected !== null && !isConnected) {
      void disconnectedPlayer.play();
      // Issue 644: Once the sound's played once set isConnected to null
      // so any future calls to this method due to re-renders won't cause
      // the disconnected sound to play.
      setIsConnected(null);
    }
  }, [isConnected, disconnectedPlayer]);

  useEffect(() => {
    document.title = `EDCT planning`;

    socketRef.current = socketIOClient(serverUrl, {
      autoConnect: false,
      reconnection: true,
      reconnectionAttempts: 5,
      auth: { token: apiKey },
    });

    socketRef.current.on("vatsimEDCTupdate", (vatsimPlans: IVatsimFlightPlan[]) => {
      logger("Received VATSIM EDCT flight plans");

      // This just feels like a giant hack to get around the closure issues of useEffect and
      // useState not having flightPlans be the current value every time the update event is received.
      setFlightPlans((currentPlans) => {
        const result = processFlightPlans(currentPlans, vatsimPlans, true);
        setHasNew(result.hasNew);
        setHasUpdates(result.hasUpdates);
        return result.flightPlans;
      });
    });

    socketRef.current.on("connect", () => {
      logger("Connected for VATSIM EDCT flight plan updates");

      socketRef.current?.emit(
        "watchEDCT",
        departureCodesRef.current?.split(","),
        arrivalCodesCodesRef.current?.split(",")
      );

      setIsConnected(true);
    });

    socketRef.current.on("disconnect", () => {
      logger("Disconnected from VATSIM EDCT flight plan updates");
      setIsConnected(false);
    });

    socketRef.current.on("airportNotFound", (airportCodes: string[]) => {
      const message = `${pluralize("Airport", airportCodes.length)} ${airportCodes.join(
        ", "
      )} not found`;
      logger(message);
      setSnackbar({
        children: message,
        severity: "warning",
      });
      socketRef.current?.disconnect();
      setIsConnected(false);
    });

    socketRef.current.on("insecureAirportCode", (airportCodes: string[]) => {
      const message = `${pluralize("Airport", airportCodes.length)} ${airportCodes.join(
        ", "
      )} not valid`;
      logger(message);
      setSnackbar({
        children: message,
        severity: "error",
      });
      socketRef.current?.disconnect();
      setIsConnected(false);
    });

    socketRef.current.on("connect_error", (error: Error) => {
      logger(`Error connecting for VATSIM EDCT flight plans: ${error.message}`);
      setSnackbar({
        children: `Unable to retrieve VATSIM EDCT flight plans.`,
        severity: "error",
      });
      setIsConnected(null); // null to avoid playing the disconnect sound.
    });

    // Note the use of .io here, to get the manager. reconnect_error fires from
    // the manager, not the socket. Super annoying.
    socketRef.current.io.on("reconnect_error", (error: Error) => {
      logger(`Error reconnecting for VATSIM EDCT flight plans: ${error.message}`);
      setSnackbar({
        children: `Unable to reconnect to server.`,
        severity: "error",
      });
      setIsConnected(null); // null to avoid playing the disconnect sound.
    });

    // Make sure to disconnect when we are cleaned up
    return () => {
      if (socketRef.current) {
        socketRef.current.disconnect();
      }
    };
  }, []);

  const onIdle = () => {
    if (isConnected) {
      logger(`Inactivity detected, stopping auto-refresh.`);
      socketRef.current?.disconnect();
      setIsConnected(false);
    }
  };

  const onPrompt = () => {
    if (isConnected) {
      const message = `Inactivity detected, auto-refresh will stop in five minutes.`;
      logger(message);
      setSnackbar({
        children: message,
        severity: "warning",
      });
    }
  };

  const disconnectFromVatsim = () => {
    if (isConnected) {
      socketRef.current?.disconnect();
      setIsConnected(false);
    }
  };

  const cleanCodes = (codes: string): string => {
    return codes
      .split(",")
      .map((code) => code.trim())
      .join(",");
  };

  const toggleVatsimConnection = () => {
    if (departureCodes === "" || arrivalCodes === "") return;

    // Not currently connected so connect
    if (!isConnected && socketRef.current) {
      setFlightPlans([]);

      // Clean up the airport codes
      const cleanedDepartureCodes = cleanCodes(departureCodes);
      const cleanedArrivalCodes = cleanCodes(arrivalCodes);

      localStorage.setItem("edctDepartureCodes", cleanedDepartureCodes);
      localStorage.setItem("edctArrivalCodes", cleanedArrivalCodes);

      // Issue 709: This is set as both a state and a ref to ensure the
      // airport codes are available in the socket connected event without
      //having to add them as a useEffects() dependency.
      setDepartureCodes(cleanedDepartureCodes);
      departureCodesRef.current = cleanedDepartureCodes;
      setArrivalCodes(cleanedArrivalCodes);
      arrivalCodesCodesRef.current = cleanedArrivalCodes;

      socketRef.current.connect();
    }
    // Currently connected so disconnect
    else {
      disconnectFromVatsim();
    }
  };

  useIdleTimer({
    timeout: 1000 * 60 * 60, // 60 minutes
    promptBeforeIdle: 1000 * 60 * 55, // 55 minutes
    onIdle,
    onPrompt,
  });

  const toggleFlightPlanState = (params: GridCellParams) => {
    if (params.field !== "callsign") {
      return;
    }

    const planIndex = flightPlans.findIndex((plan) => plan.callsign === params.value);
    if (planIndex !== -1) {
      const updatedFlightPlans = [...flightPlans];

      updatedFlightPlans[planIndex].importState !== ImportState.IMPORTED
        ? (updatedFlightPlans[planIndex].importState = ImportState.IMPORTED)
        : (updatedFlightPlans[planIndex].importState = ImportState.NEW);
      setFlightPlans(updatedFlightPlans);
    }
  };

  return (
    <>
      <Box sx={{ mt: 2 }}>
        <form>
          <Stack direction="row" sx={{ mt: 2, ml: 1 }} spacing={2}>
            <TextField
              label="Departure codes"
              value={departureCodes}
              onChange={(e) => {
                setDepartureCodes(e.target.value);
                disconnectFromVatsim();
              }}
            />
            <TextField
              label="Arrival codes"
              value={arrivalCodes}
              onChange={(e) => {
                setArrivalCodes(e.target.value);
                disconnectFromVatsim();
              }}
            />
            <IconButton
              onClick={toggleVatsimConnection}
              color={isConnected ? "primary" : "default"}
              title={isConnected ? "Disconnect" : "Connect"}
            >
              <StreamIcon />
            </IconButton>
          </Stack>
        </form>
        <StyledDataGrid
          sx={{
            mt: 2,
            ml: 1,
          }}
          disableRowSelectionOnClick
          onCellClick={toggleFlightPlanState}
          autoHeight
          rows={flightPlans}
          columns={columns}
          getRowId={(row) => (row as IVatsimFlightPlan)._id!}
          getRowClassName={getRowClassName}
          initialState={{
            columns: {
              columnVisibilityModel: {
                _id: false,
              },
            },
          }}
        />
      </Box>
      <AlertSnackbar {...snackbar} onClose={handleSnackbarClose} />
    </>
  );
};

export default VatsimEDCTFlightPlans;
