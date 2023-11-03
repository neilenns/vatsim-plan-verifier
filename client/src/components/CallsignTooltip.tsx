import { Link, Tooltip, Typography } from "@mui/material";
import { IPilotStats } from "../interfaces/IPilotStats.mts";

type CallsignTooltipProps = {
  callsignTelephony: string | undefined;
  pilotStats: IPilotStats | undefined;
  pilotName: string | undefined;
  cid: number | undefined;
};

export const CallsignTooltip = ({
  pilotName,
  callsignTelephony,
  pilotStats,
  cid,
}: CallsignTooltipProps) => {
  if (!pilotStats) {
    return <>{callsignTelephony ?? ""}</>;
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
          <Link
            href={`http://stats.vatsim.net/stats/${cid ?? ""}`}
            target="_blank"
            rel="noreferrer"
            underline="hover"
          >
            {callsignTelephony ?? ""}
          </Link>
        </Typography>
      </Tooltip>
    )
  );
};
