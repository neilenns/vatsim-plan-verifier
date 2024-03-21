import { Table, TableBody, TableCell, TableHead, TableRow } from "@mui/material";
import { useEffect, useState } from "react";
import { useLoaderData } from "react-router-dom";
import { IVatsimClientTransceivers } from "../interfaces/IVatsimClientTransceivers.mts";
import { ClientTransceiversLoaderResult } from "../services/clientTransceiversLoader.mts";
import { enqueueSnackbar } from "notistack";

const ClientTransceivers = () => {
  const loaderData = useLoaderData() as ClientTransceiversLoaderResult;
  const [clientTransceivers, setClientTransceivers] = useState<IVatsimClientTransceivers>();

  useEffect(() => {
    if (!loaderData.success) {
      enqueueSnackbar(loaderData.error, {
        variant: "error",
      });
      return;
    }

    setClientTransceivers(loaderData.data);
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
          <TableBody>
            <TableRow>
              <TableCell>{clientTransceivers.callsign}</TableCell>
              <TableCell>
                {clientTransceivers.com1
                  ? (clientTransceivers.com1 / 1000000).toFixed(3)
                  : "not tuned"}
              </TableCell>
              <TableCell>
                {clientTransceivers.com2
                  ? (clientTransceivers.com2 / 1000000).toFixed(3)
                  : "not tuned"}
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      )}
    </>
  );
};

export default ClientTransceivers;
