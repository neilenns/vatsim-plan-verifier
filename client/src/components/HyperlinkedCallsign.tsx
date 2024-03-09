import { Link, Typography } from "@mui/material";

interface HyperlinkedCallsignProps {
  cid: number | undefined;
  callsignTelephony: string | undefined;
}

export const HyperlinkedCallsign = ({ cid, callsignTelephony }: HyperlinkedCallsignProps) => {
  if (!cid) {
    return <>{callsignTelephony ?? ""}</>;
  }
  return (
    <Typography variant="caption" sx={{ cursor: "pointer" }}>
      <Link
        href={`http://stats.vatsim.net/stats/${cid}`}
        target="_blank"
        rel="noreferrer"
        underline="hover"
      >
        {callsignTelephony ?? ""}
      </Link>
    </Typography>
  );
};
