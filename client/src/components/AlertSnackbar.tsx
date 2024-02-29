import { Alert, AlertProps, Snackbar, SnackbarCloseReason } from "@mui/material";
import { SyntheticEvent, useEffect, useState } from "react";
import { ENV } from "../env.mjs";

export type AlertSnackBarOnClose = (reason: SnackbarCloseReason) => undefined;

export type AlertSnackbarProps = {
  children?: AlertProps["children"] | null;
  severity?: AlertProps["severity"] | undefined;
  onClose?: AlertSnackBarOnClose;
} | null;

const AlertSnackbar = (props: AlertSnackbarProps) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [snackbar, setSnackbar] = useState<AlertSnackbarProps>(null);

  useEffect(() => {
    setSnackbar(props);
    if (props === null) {
      setIsOpen(false);
    } else {
      setIsOpen(true);
    }
  }, [props]);

  const handleClose = (_: Event | SyntheticEvent, reason: SnackbarCloseReason) => {
    props?.onClose?.(reason);
  };

  return (
    !!snackbar?.children && (
      <Snackbar
        open={isOpen}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
        onClose={handleClose}
        autoHideDuration={ENV.VITE_SNACKBAR_AUTOHIDE_DURATION}
      >
        <Alert severity={snackbar.severity}>{snackbar.children}</Alert>
      </Snackbar>
    )
  );
};

export default AlertSnackbar;
