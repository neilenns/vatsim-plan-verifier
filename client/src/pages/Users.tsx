import { useLoaderData } from "react-router-dom";
import { IUser } from "../interfaces/IUser.mts";
import { DataGrid, GridColDef, GridRowModel } from "@mui/x-data-grid";
import { useCallback, useState } from "react";
import { updateUser } from "../services/users.mts";
import AlertSnackbar, {
  AlertSnackBarOnClose,
  AlertSnackbarProps,
} from "../components/AlertSnackbar";

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

const Users = () => {
  const users = useLoaderData() as IUser[];
  const updateUser = useUpdateUser();
  const [snackbar, setSnackbar] = useState<AlertSnackbarProps>(null);

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

  const handleSnackbarClose: AlertSnackBarOnClose = () => setSnackbar(null);

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
      <AlertSnackbar {...snackbar} onClose={handleSnackbarClose} />
    </>
  );
};

export default Users;
