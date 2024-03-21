import { Search as SearchIcon } from "@mui/icons-material";
import {
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TextField,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useLoaderData, useSearchParams } from "react-router-dom";
import IAircraft from "../interfaces/IAircraft.mts";
import { AircraftDetailsLoaderResult } from "../services/aircraftDetailsLoader.mts";
import { enqueueSnackbar } from "notistack";

const AircraftDetails = () => {
  const loaderData = useLoaderData() as AircraftDetailsLoaderResult;
  const [aircraftDetails, setAircraftDetails] = useState<IAircraft[]>();
  const [aircraftName, setAircraftName] = useState("");
  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    if (!loaderData.success) {
      setAircraftDetails([]);
      setAircraftName("");
      // Handles the case where the page is reloaded/navigated to without any aircraft
      // name specified in the URL.
      if (loaderData.error === "NoNameSpecified") {
        return;
      }

      enqueueSnackbar(loaderData.error, {
        variant: "error",
      });

      return;
    }

    setAircraftDetails(loaderData.data);
    setAircraftName(searchParams.get("name") ?? "");

    if (loaderData.data.length === 0) {
      enqueueSnackbar("No matching aircraft found", {
        variant: "warning",
      });
    }
  }, [loaderData, searchParams]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSearchParams({ name: aircraftName });
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <TextField
          type="text"
          value={aircraftName}
          onChange={(e) => {
            setAircraftName(e.target.value);
          }}
          helperText="Aircraft name"
          size="small"
        />
        <IconButton aria-label="search" type="submit">
          <SearchIcon />
        </IconButton>
      </form>

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
              <TableRow key={aircraft.equipmentCode}>
                <TableCell>{aircraft.manufacturer}</TableCell>
                <TableCell>{aircraft.name}</TableCell>
                <TableCell>{aircraft.equipmentCode}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}
    </>
  );
};

export default AircraftDetails;
