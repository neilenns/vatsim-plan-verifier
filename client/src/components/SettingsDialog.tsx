import { Dialog, DialogTitle, FormControlLabel, Stack, Switch } from "@mui/material";
import { useRecoilState, useRecoilValue } from "recoil";
import {
  autoHideImportedState,
  hideInformationalState,
  streamingModeState,
  userInfoState,
} from "../context/atoms";

type SettingsDialogProps = {
  open: boolean;
  onClose: () => void;
};

export const SettingsDialog = (props: SettingsDialogProps) => {
  const { onClose, open } = props;
  const [autoHideImported, setAutoHideImported] = useRecoilState(autoHideImportedState);
  const [hideInformational, setHideInformational] = useRecoilState(hideInformationalState);
  const [streamingMode, setStreamingMode] = useRecoilState(streamingModeState);

  const handleClose = () => {
    onClose();
  };
  const userInfo = useRecoilValue(userInfoState);

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
        {userInfo?.roles.includes("admin") && (
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
