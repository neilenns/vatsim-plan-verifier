import { Tooltip, Typography } from "@mui/material";
import { IPilotStats } from "../interfaces/IPilotStats.mts";
import ITelephony from "../interfaces/ITelephony.mts";

type CallsignTooltipProps = {
  callsign: string | undefined;
  telephony: ITelephony | undefined;
  pilotStats: IPilotStats | undefined;
};

export const CallsignTooltip = ({ callsign, telephony, pilotStats }: CallsignTooltipProps) => {
  if (!pilotStats) {
    return <>{telephony ? telephony.telephony : ""}</>;
  }
  return (
    pilotStats && (
      <Tooltip
        title={
          <div>
            Pilot hours: {Math.round(pilotStats.pilot)}
            <br />
            ATC hours: {Math.round(pilotStats.atc)}
          </div>
        }
      >
        <Typography variant="caption" sx={{ cursor: "pointer" }}>
          <div>{telephony ? telephony.telephony : callsign}</div>
        </Typography>
      </Tooltip>
    )
  );
};
