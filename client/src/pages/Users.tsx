import { useLoaderData } from "react-router-dom";
import { IUser } from "../interfaces/IUser.mts";
import { DataGrid, GridColDef, GridRowModel } from "@mui/x-data-grid";
import { useCallback, useState } from "react";
import Snackbar from "@mui/material/Snackbar";
import { Alert, AlertProps } from "@mui/material";
import { updateUser } from "../services/users.mts";

const columns: GridColDef[] = [
  { field: "_id" },
  { field: "firstName", headerName: "First name", width: 150, editable: true },
  { field: "lastName", headerName: "Last name", width: 150, editable: true },
  { field: "username", headerName: "Username", width: 150, editable: true },
  {
    field: "isVerified",
    headerName: "Verified",
    width: 150,
    type: "boolean",
    editable: true,
  },
  {
    field: "role",
    headerName: "Role",
    width: 150,
    type: "singleSelect",
    valueOptions: ["admin", "user"],
    editable: true,
  },
];

const useUpdateUser = () => {
  return useCallback(async (user: IUser) => {
    try {
      const updatedUser = await updateUser(user);
      return updatedUser; // Return the updated user on success
    } catch (error) {
      throw new Error("Update failed."); // Throw an error in case of failure
    }
  }, []);
};

function Users() {
  const users = useLoaderData() as IUser[];
  const updateUser = useUpdateUser();
  const [snackbar, setSnackbar] = useState<Pick<AlertProps, "children" | "severity"> | null>(null);

  const processRowUpdate = useCallback(
    async (newRow: GridRowModel) => {
      // Make the HTTP request to save in the backend
      const updatedUser = await updateUser(newRow as IUser);

      setSnackbar({ children: "User successfully saved", severity: "success" });
      return updatedUser;
    },
    [updateUser]
  );

  const handleProcessRowUpdateError = useCallback((error: Error) => {
    setSnackbar({ children: error.message, severity: "error" });
  }, []);

  const handleCloseSnackbar = () => setSnackbar(null);

  return (
    <>
      <DataGrid
        editMode="row"
        rows={users}
        columns={columns}
        getRowId={(row) => (row as IUser)._id}
        initialState={{
          columns: {
            columnVisibilityModel: {
              _id: false,
            },
          },
        }}
        processRowUpdate={processRowUpdate}
        onProcessRowUpdateError={handleProcessRowUpdateError}
      />
      {!!snackbar && (
        <Snackbar
          open
          anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
          onClose={handleCloseSnackbar}
          autoHideDuration={6000}
        >
          <Alert {...snackbar} onClose={handleCloseSnackbar} />
        </Snackbar>
      )}
    </>
  );
}

export default Users;
