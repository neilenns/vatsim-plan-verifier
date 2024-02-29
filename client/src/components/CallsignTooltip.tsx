import { Tooltip } from "@mui/material";
import { IPilotStats } from "../interfaces/IPilotStats.mts";
import { HyperlinkedCallsign } from "./HyperlinkedCallsign";

interface CallsignTooltipProps {
  callsignTelephony: string | undefined;
  pilotStats: IPilotStats | undefined;
  pilotName: string | undefined;
  cid: number | undefined;
}

export const CallsignTooltip = ({
  pilotName,
  callsignTelephony,
  pilotStats,
  cid,
}: CallsignTooltipProps) => {
  if (!pilotStats) {
    return <HyperlinkedCallsign cid={cid} callsignTelephony={callsignTelephony} />;
  }
  return (
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
      {/* Without the <div> here this results in the error described at */}
      {/* https://stackoverflow.com/questions/56347839/material-ui-v4-0-1-warning-expected-an-element-that-can-hold-a-ref */}
      <span>
        <HyperlinkedCallsign cid={cid} callsignTelephony={callsignTelephony} />
      </span>
    </Tooltip>
  );
};
