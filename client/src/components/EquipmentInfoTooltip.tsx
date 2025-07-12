import { Tooltip, Typography } from "@mui/material";
import IAircraft from "../interfaces/IAircraft.mts";

interface EquipmentInfoTooltipProps {
  equipmentInfo: IAircraft | undefined;
}

// Converts feet to meters with the specified number of fraction digits
function feetToMeters(feet: number, fractionDigits: number): string {
  // 1 foot is approximately 0.3048 meters
  const conversionFactor = 0.3048;
  return (feet * conversionFactor).toFixed(fractionDigits);
}

export const EquipmentInfoTooltip = ({ equipmentInfo }: EquipmentInfoTooltipProps) => {
  return equipmentInfo?.name ? (
    <Tooltip
      title={
        <div>
          Engines: {equipmentInfo.engineCount} {equipmentInfo.engineType}
          <br />
          Wake turb. class: {equipmentInfo.weightClass}
          {equipmentInfo.cwt && (
            <>
              <br />
              CWT class: {equipmentInfo.cwt}
            </>
          )}
          <br />
          SRS class: {equipmentInfo.srsClass}
          {equipmentInfo.maxCruiseSpeed ? (
            <>
              <br />
              Max cruise speed: {equipmentInfo.maxCruiseSpeed} kts
            </>
          ) : (
            ""
          )}
          {equipmentInfo.airplaneDesignGroup && (
            <>
              <br />
              Group: {equipmentInfo.airplaneDesignGroup}
            </>
          )}
          {equipmentInfo.wingspan && (
            <>
              <br />
              Wingspan: {equipmentInfo.wingspan}&apos; ({feetToMeters(equipmentInfo.wingspan, 1)}m)
            </>
          )}
          {equipmentInfo.tailHeight && (
            <>
              <br />
              Tail height: {equipmentInfo.tailHeight}&apos; (
              {feetToMeters(equipmentInfo.tailHeight, 1)}
              m)
            </>
          )}
        </div>
      }
    >
      <Typography variant="caption" sx={{ cursor: "pointer" }}>
        {equipmentInfo.manufacturer} {equipmentInfo.name}
      </Typography>
    </Tooltip>
  ) : (
    " "
  );
};
