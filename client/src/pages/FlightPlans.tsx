import { DataGrid, GridColDef } from "@mui/x-data-grid";
import IFlightPlan from "../interfaces/IFlightPlan.mts";
import IPaginatedFlightPlans from "../interfaces/IPaginatedFlightPlans.mts";
import { useEffect, useState } from "react";
import { getFlightPlans } from "../services/flightPlan.mts";

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
  const [data, setData] = useState<IPaginatedFlightPlans>();
  const [paginationModel, setPaginationModel] = useState({
    pageSize: 100,
    page: 0,
  });

  useEffect(() => {
    getFlightPlans(paginationModel.page, paginationModel.pageSize)
      .then((result) => {
        setData(result);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [paginationModel]);

  return (
    <>
      <DataGrid
        editMode="row"
        rows={data?.flightPlans || []}
        columns={columns}
        paginationMode="server"
        paginationModel={paginationModel}
        onPaginationModelChange={setPaginationModel}
        rowCount={data?.pages || 0}
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
