import React from "react";
import { Typography, Box, List, ListItem, ListItemText } from "@mui/material";
import IVerifierResultDocument from "../interfaces/IVerifierResultDocument.mts";

interface VerifierResultComponentProps {
  verifierResult: IVerifierResultDocument;
}

const VerifierResult: React.FC<VerifierResultComponentProps> = ({
  verifierResult,
}) => {
  const {
    flightPlanId,
    status,
    verifier,
    message,
    extendedMessage,
    flightPlanPart,
    priority,
  } = verifierResult;

  return (
    <Box>
      <Typography variant="h6">
        Flight Plan ID: {flightPlanId.toString()}
      </Typography>
      <Typography variant="body1">Status: {status}</Typography>
      <Typography variant="body1">Verifier: {verifier}</Typography>
      <Typography variant="body1">Message: {message}</Typography>

      {extendedMessage && (
        <>
          <Typography variant="subtitle1">Extended Message:</Typography>
          <List>
            {extendedMessage.map((msg, index) => (
              <ListItem key={index}>
                <ListItemText primary={msg} />
              </ListItem>
            ))}
          </List>
        </>
      )}

      <Typography variant="body1">
        Flight Plan Part: {flightPlanPart}
      </Typography>
      <Typography variant="body1">Priority: {priority}</Typography>
    </Box>
  );
};

export default VerifierResult;
