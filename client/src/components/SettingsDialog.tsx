import { useAuth0 } from "@auth0/auth0-react";
import { Dialog, DialogTitle, FormControlLabel, Stack, Switch } from "@mui/material";
import { useCallback } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import {
  autoHideImportedState,
  hideInformationalState,
  sortByCreatedAtState,
  streamingModeState,
  userInfoState,
} from "../context/atoms";
import { putUserInfo } from "../services/user.mts";

interface SettingsDialogProps {
  open: boolean;
  onClose: () => void;
}

export const SettingsDialog = (props: SettingsDialogProps) => {
  const { onClose, open } = props;
  const [sortByCreatedAt, setSortByCreatedAt] = useRecoilState(sortByCreatedAtState);
  const [autoHideImported, setAutoHideImported] = useRecoilState(autoHideImportedState);
  const [hideInformational, setHideInformational] = useRecoilState(hideInformationalState);
  const [streamingMode, setStreamingMode] = useRecoilState(streamingModeState);
  const { getAccessTokenSilently } = useAuth0();

  const handleClose = () => {
    onClose();
  };
  const userInfo = useRecoilValue(userInfoState);

  const handleSortByCreatedAtChanged = useCallback(
    async (event: React.ChangeEvent<HTMLInputElement>) => {
      setSortByCreatedAt(event.target.checked);

      const token = await getAccessTokenSilently();
      await putUserInfo(token, {
        sortByCreatedAt: event.target.checked,
      });
    },
    [getAccessTokenSilently, setSortByCreatedAt]
  );

  const handleAutoHideChanged = useCallback(
    async (event: React.ChangeEvent<HTMLInputElement>) => {
      setAutoHideImported(event.target.checked);

      const token = await getAccessTokenSilently();
      await putUserInfo(token, {
        autoHideImported: event.target.checked,
      });
    },
    [getAccessTokenSilently, setAutoHideImported]
  );

  const handleStreamingModeChanged = useCallback(
    async (event: React.ChangeEvent<HTMLInputElement>) => {
      setStreamingMode(event.target.checked);

      const token = await getAccessTokenSilently();
      await putUserInfo(token, {
        streamingMode: event.target.checked,
      });
    },
    [getAccessTokenSilently, setStreamingMode]
  );

  const handleHideInformationalChanged = useCallback(
    async (event: React.ChangeEvent<HTMLInputElement>) => {
      setHideInformational(event.target.checked);

      const token = await getAccessTokenSilently();
      await putUserInfo(token, {
        hideInformational: event.target.checked,
      });
    },
    [getAccessTokenSilently, setHideInformational]
  );

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>Settings</DialogTitle>
      <Stack sx={{ ml: 2, mr: 2, mb: 2 }}>
        <FormControlLabel
          control={
            <Switch
              checked={sortByCreatedAt}
              onChange={(event) => {
                handleSortByCreatedAtChanged(event).catch((err: unknown) => {
                  console.error(err);
                });
              }}
            />
          }
          label="Sort VATSIM plans by created time"
        />
        <FormControlLabel
          control={
            <Switch
              checked={autoHideImported}
              onChange={(event) => {
                handleAutoHideChanged(event).catch((err: unknown) => {
                  console.error(err);
                });
              }}
            />
          }
          label="Hide imported flight plans"
        />
        <FormControlLabel
          control={
            <Switch
              checked={streamingMode}
              onChange={(event) => {
                handleStreamingModeChanged(event).catch((err: unknown) => {
                  console.error(err);
                });
              }}
            />
          }
          label="Streaming mode"
        />
        {userInfo?.roles.includes("admin") && (
          <FormControlLabel
            control={
              <Switch
                checked={hideInformational}
                onChange={(event) => {
                  handleHideInformationalChanged(event).catch((err: unknown) => {
                    console.error(err);
                  });
                }}
              />
            }
            label="Hide informational results"
          />
        )}
      </Stack>
    </Dialog>
  );
};
