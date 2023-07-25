import React, { useEffect } from "react";
import {
  Typography,
  Box,
  List,
  ListItem,
  ListItemText,
  useTheme,
  CustomTheme,
} from "@mui/material";
import IVerifierResultDocument from "../interfaces/IVerifierResult.mts";
import IFlightPlan from "../interfaces/IFlightPlan.mts";

interface VerifierResultComponentProps {
  verifierResult: IVerifierResultDocument;
  flightPlan: IFlightPlan;
}

const maxExtendedMessages = 3;

const VerifierResult: React.FC<VerifierResultComponentProps> = ({ verifierResult, flightPlan }) => {
  const { message, extendedMessage } = verifierResult;
  const { departure, arrival } = flightPlan;
  const additionalItemsCount = Math.max(0, (extendedMessage?.length ?? 0) - maxExtendedMessages);
  const flightAwareIFRRouteVerifierUrl = `https://flightaware.com/analysis/route.rvt?origin=${departure}&destination=${arrival}`;
  const theme: CustomTheme = useTheme();

  const getBackgroundColorForStatus = (status: string): string => {
    switch (status.toLowerCase()) {
      case "ok":
        return theme.status.ok;
      case "warning":
        return theme.status.warning;
      case "error":
        return theme.status.error;
      default:
        return "#fff";
    }
  };
  useEffect(() => {
    // Nothing to do but reload the component when the theme changes.
  }, [theme]);

  return (
    <Box
      sx={{
        backgroundColor: getBackgroundColorForStatus(verifierResult.status),
        padding: "10px",
        border: "1px solid #ccc",
      }}
    >
      <Typography variant="body1">{message}</Typography>

      {extendedMessage && (
        <>
          <List>
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
  );
};

export default VerifierResult;
