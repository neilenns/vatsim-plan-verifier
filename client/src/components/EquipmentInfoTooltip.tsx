import { Tooltip, Typography } from "@mui/material";
import IAircraft from "../interfaces/IAircraft.mts";

type EquipmentInfoTooltipProps = {
  equipmentInfo: IAircraft | undefined;
};

export const EquipmentInfoTooltip = ({ equipmentInfo }: EquipmentInfoTooltipProps) => {
  return equipmentInfo?.name ? (
    <Tooltip
      title={
        <div>
          Engines: {equipmentInfo.engineCount} {equipmentInfo.engineType}
          <br />
          Wake turb. class: {equipmentInfo.weightClass}
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
