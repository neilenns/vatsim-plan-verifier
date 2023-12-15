import { Dialog, DialogTitle, FormControlLabel, Stack, Switch } from "@mui/material";
import useAppContext from "../context/AppContext";

type SettingsDialogProps = {
  open: boolean;
  onClose: () => void;
};

export const SettingsDialog = (props: SettingsDialogProps) => {
  const { onClose, open } = props;
  const { autoHideImported, setAutoHideImported, hideInformational, setHideInformational, streamingMode, setStreamingMode } =
    useAppContext();
  const handleClose = () => {
    onClose();
  };
  const role = localStorage.getItem("role");

  const handleAutoHideChanged = (event: React.ChangeEvent<HTMLInputElement>) => {
    setAutoHideImported(event.target.checked);
  };

  const handleStreamingModeChanged = (event: React.ChangeEvent<HTMLInputElement>) => {
    setStreamingMode(event.target.checked);
  };

  const handleHideInformationalChanged = (event: React.ChangeEvent<HTMLInputElement>) => {
    setHideInformational(event.target.checked);
  };

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>Settings</DialogTitle>
      <Stack sx={{ ml: 2, mr: 2, mb: 2 }}>
        <FormControlLabel
          control={<Switch checked={autoHideImported} onChange={handleAutoHideChanged} />}
          label="Hide imported flight plans"
        />
        <FormControlLabel
          control={<Switch checked={streamingMode} onChange={handleStreamingModeChanged} />}
          label="Streaming mode"
        />
        {role === "admin" && (
          <FormControlLabel
            control={
              <Switch checked={hideInformational} onChange={handleHideInformationalChanged} />
            }
            label="Hide informational results"
          />
        )}
      </Stack>
    </Dialog>
  );
};
