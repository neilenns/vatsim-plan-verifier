import { Tooltip, Typography } from "@mui/material";
import { IPilotStats } from "../interfaces/IPilotStats.mts";
import ITelephony from "../interfaces/ITelephony.mts";

type CallsignTooltipProps = {
  callsign: string | undefined;
  telephony: ITelephony | undefined;
  flightNumber: string | undefined;
  pilotStats: IPilotStats | undefined;
  pilotName: string | undefined;
};

export const CallsignTooltip = ({
  callsign,
  pilotName,
  telephony,
  flightNumber,
  pilotStats,
}: CallsignTooltipProps) => {
  if (!pilotStats) {
    return <>{telephony ? telephony.telephony : ""}</>;
  }
  return (
    pilotStats && (
      <Tooltip
        title={
          <span>
            Name: {pilotName ?? "Unknown"}
            <br />
            Pilot hours: {Math.round(pilotStats.pilot)}
            <br />
            ATC hours: {Math.round(pilotStats.atc)}
          </span>
        }
      >
        <Typography variant="caption" sx={{ cursor: "pointer" }}>
          <span>{telephony ? `${telephony.telephony} ${flightNumber ?? ""}` : callsign}</span>
        </Typography>
      </Tooltip>
    )
  );
};
