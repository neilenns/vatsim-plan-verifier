import { useLoaderData } from "react-router-dom";
import { IVatsimClientTransceivers } from "../interfaces/IVatsimClientTransceivers.mts";
import AlertSnackbar, {
  AlertSnackBarOnClose,
  AlertSnackbarProps,
} from "../components/AlertSnackbar";
import { useEffect, useState } from "react";
import { Table, TableCell, TableHead, TableRow } from "@mui/material";
import { ClientTransceiversLoaderResult } from "../services/clientTransceiversLoader.mts";

function ClientTransceivers() {
  const loaderData = useLoaderData() as ClientTransceiversLoaderResult;
  const [snackbar, setSnackbar] = useState<AlertSnackbarProps>(null);
  const [clientTransceivers, setClientTransceivers] = useState<IVatsimClientTransceivers>();
  const handleSnackbarClose: AlertSnackBarOnClose = () => setSnackbar(null);

  useEffect(() => {
    if (loaderData === undefined) {
      return;
    }

    if (!loaderData.success) {
      setSnackbar({
        children: loaderData.error,
        severity: "error",
      });
      return;
    }

    setClientTransceivers(loaderData.data ?? {});
    document.title = `${loaderData.data.callsign} transceivers`;
  }, [loaderData]);

  return (
    <>
      {clientTransceivers && (
        <Table>
          <TableHead>
            <TableCell>Callsign</TableCell>
            <TableCell>COM1</TableCell>
            <TableCell>COM2</TableCell>
          </TableHead>
          <TableRow>
            <TableCell>{clientTransceivers.callsign}</TableCell>
            <TableCell>{clientTransceivers.transceivers[0]?.frequency.toFixed(3)}</TableCell>
            <TableCell>{clientTransceivers.transceivers[1]?.frequency.toFixed(3)}</TableCell>
          </TableRow>
        </Table>
      )}
      <AlertSnackbar {...snackbar} onClose={handleSnackbarClose} />
    </>
  );
}

export default ClientTransceivers;
