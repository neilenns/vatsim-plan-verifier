import { useLoaderData } from "react-router-dom";
import AlertSnackbar, {
  AlertSnackBarOnClose,
  AlertSnackbarProps,
} from "../components/AlertSnackbar";
import { useEffect, useState } from "react";
import { Table, TableBody, TableCell, TableHead, TableRow } from "@mui/material";
import { AircraftDetailsLoaderResult } from "../services/aircraftDetailsLoader.mts";
import IAircraft from "../interfaces/IAircraft.mts";

function AircraftDetails() {
  const loaderData = useLoaderData() as AircraftDetailsLoaderResult;
  const [snackbar, setSnackbar] = useState<AlertSnackbarProps>(null);
  const [aircraftDetails, setAircraftDetails] = useState<IAircraft[]>();
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

    setAircraftDetails(loaderData.data ?? {});
    document.title = `Aircraft details`;
  }, [loaderData]);

  return (
    <>
      {aircraftDetails && aircraftDetails.length > 0 && (
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Manufacturer</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Equipment code</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {aircraftDetails.map((aircraft) => (
              <TableRow>
                <TableCell>{aircraft.manufacturer}</TableCell>
                <TableCell>{aircraft.name}</TableCell>
                <TableCell>{aircraft.equipmentCode}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}
      <AlertSnackbar {...snackbar} onClose={handleSnackbarClose} />
    </>
  );
}

export default AircraftDetails;
