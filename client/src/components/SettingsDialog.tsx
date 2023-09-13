import { Box, Dialog, DialogTitle, FormControlLabel, Switch } from "@mui/material";
import useAppContext from "../context/AppContext";

type SettingsDialogProps = {
  open: boolean;
  onClose: () => void;
};

export const SettingsDialog = (props: SettingsDialogProps) => {
  const { onClose, open } = props;
  const { autoHideImported, setAutoHideImported } = useAppContext();
  const handleClose = () => {
    onClose();
  };

  const handleAutoHideChanged = (event: React.ChangeEvent<HTMLInputElement>) => {
    setAutoHideImported(event.target.checked);
  };

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>Settings</DialogTitle>
      <Box sx={{ ml: 2, mr: 2, mb: 2 }}>
        <FormControlLabel
          control={<Switch checked={autoHideImported} onChange={handleAutoHideChanged} />}
          label="Hide imported flight plans"
        />
      </Box>
    </Dialog>
  );
};
