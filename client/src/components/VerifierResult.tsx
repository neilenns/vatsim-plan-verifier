import React from "react";
import { Typography, Box, List, ListItem, ListItemText } from "@mui/material";
import IVerifierResultDocument from "../interfaces/IVerifierResult.mts";
import IFlightPlan from "../interfaces/IFlightPlan.mts";
import "./verifierResult.css";

interface VerifierResultComponentProps {
  verifierResult: IVerifierResultDocument;
  flightPlan: IFlightPlan;
}

const maxExtendedMessages = 3;

const VerifierResult: React.FC<VerifierResultComponentProps> = ({ verifierResult, flightPlan }) => {
  const { message, extendedMessage, status } = verifierResult;
  const { departure, arrival } = flightPlan;
  const additionalItemsCount = Math.max(0, (extendedMessage?.length ?? 0) - maxExtendedMessages);
  const flightAwareIFRRouteVerifierUrl = `https://flightaware.com/analysis/route.rvt?origin=${departure}&destination=${arrival}`;
  const statusClass = `verifier-result ${status.toLowerCase()}`;

  return (
    <Box className={statusClass}>
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
