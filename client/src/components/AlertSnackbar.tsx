import { Alert, AlertProps, Snackbar } from "@mui/material";
import { useEffect, useState } from "react";
import { snackbarAutoHideDuration } from "../configs/planVerifierServer.mts";

export type AlertSnackbarProps = {
  children?: AlertProps["children"] | null;
  severity?: AlertProps["severity"] | undefined;
  onClose?: AlertProps["onClose"];
} | null;

const AlertSnackbar = (props: AlertSnackbarProps) => {
  const [snackbar, setSnackbar] = useState<Pick<
    AlertProps,
    "children" | "severity" | "onClose"
  > | null>(props);

  useEffect(() => {
    setSnackbar(props);
  }, [props]);

  return (
    !!snackbar?.children && (
      <Snackbar
        open
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
        onClose={() => snackbar.onClose}
        autoHideDuration={snackbarAutoHideDuration}
      >
        <Alert {...snackbar} />
      </Snackbar>
    )
  );
};

export default AlertSnackbar;
