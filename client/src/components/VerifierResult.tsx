import { useEffect } from "react";
import {
  Typography,
  Box,
  List,
  ListItem,
  ListItemText,
  useTheme,
  Paper,
  Stack,
} from "@mui/material";
import IVerifierResultDocument from "../interfaces/IVerifierResult.mts";
import IFlightPlan from "../interfaces/IFlightPlan.mts";
import StatusIndicator from "./StatusIndicator";
import Markdown from "./Markdown";

interface VerifierResultComponentProps {
  verifierResult: IVerifierResultDocument;
  flightPlan: IFlightPlan;
}

const maxExtendedMessages = 3;

const VerifierResult = ({ verifierResult, flightPlan }: VerifierResultComponentProps) => {
  const { message, extendedMessage, status } = verifierResult;
  const { departure, arrival } = flightPlan;
  const additionalItemsCount = Math.max(0, (extendedMessage?.length ?? 0) - maxExtendedMessages);
  const flightAwareIFRRouteVerifierUrl = `https://flightaware.com/analysis/route.rvt?origin=${
    departure ?? ""
  }&destination=${arrival ?? ""}`;
  const theme = useTheme();

  const getColorForStatus = (status: string): string => {
    switch (status.toLowerCase()) {
      case "ok":
        return theme.palette.success.main;
      case "warning":
        return theme.palette.warning.main;
      case "error":
        return theme.palette.error.main;
      case "custommessage":
        return theme.palette.info.main;
      default:
        return "#fff";
    }
  };
  useEffect(() => {
    // Nothing to do but reload the component when the theme changes.
  }, [theme]);

  return (
    <Paper
      elevation={0}
      variant="outlined"
      sx={{ padding: "10px", borderColor: getColorForStatus(status) }}
    >
      <Stack direction="row" spacing={2} alignItems="center">
        <StatusIndicator status={status} />
        <Box>
          {status === "CustomMessage" ? (
            <Markdown children={message} />
          ) : (
            <Typography variant="body1">{message}</Typography>
          )}
          {extendedMessage && extendedMessage.length > 0 && (
            <>
              <List dense>
                {extendedMessage.slice(0, maxExtendedMessages).map((msg, index) => (
                  <ListItem key={index}>
                    <ListItemText primary={msg} />
                  </ListItem>
                ))}
                {additionalItemsCount > 0 && (
                  <ListItem>
                    <ListItemText
                      primary={
                        <a
                          href={flightAwareIFRRouteVerifierUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          {`and ${additionalItemsCount} more...`}
                        </a>
                      }
                    />
                  </ListItem>
                )}
              </List>
            </>
          )}
        </Box>
      </Stack>
    </Paper>
  );
};

export default VerifierResult;
