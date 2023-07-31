import { useLoaderData } from "react-router-dom";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import IFlightPlan from "../interfaces/IFlightPlan.mts";

const columns: GridColDef[] = [
  { field: "_id" },
  { field: "callsign", headerName: "Call sign", width: 100 },
  { field: "rawAircraftType", headerName: "Aircraft", width: 100 },
  { field: "departure", headerName: "Departure", width: 100 },
  { field: "arrival", headerName: "Arrival", width: 100 },
  { field: "squawk", headerName: "Squawk", width: 100 },
  { field: "cruiseAltitude", headerName: "Cruise", width: 100 },
  { field: "route", headerName: "Route", flex: 1 },
];

function FlightPlans() {
  const flightPlans = useLoaderData() as IFlightPlan[];

  return (
    <>
      <DataGrid
        editMode="row"
        rows={flightPlans}
        columns={columns}
        getRowId={(row) => (row as IFlightPlan)._id!}
        initialState={{
          columns: {
            columnVisibilityModel: {
              _id: false,
            },
          },
        }}
      />
    </>
  );
}

export default FlightPlans;
