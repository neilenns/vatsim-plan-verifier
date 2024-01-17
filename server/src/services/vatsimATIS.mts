import debug from "debug";
import { IVatsimATIS, IVatsimData } from "../interfaces/IVatsimData.mjs";
import { VatsimATISModel } from "../models/VatsimATIS.mjs";

const logger = debug("plan-verifier:vatsimATIS");

// Takes an ATIS object from vatsim and converts it to a vatsim model
function atisToVatsimModel(atis: IVatsimATIS) {
  const result = new VatsimATISModel({
    callsign: atis.callsign,
    frequency: atis.frequency,
    code: atis.atis_code,
    rawText: atis.text_atis,
  });

  return result;
}

export async function processVatsimATISData(vatsimData: IVatsimData) {
  const incomingATISData = vatsimData.atis.map(atisToVatsimModel);

  logger(`Processing ${incomingATISData.length} incoming VATSIM ATISes`);

  // Delete the old data
  await VatsimATISModel.deleteMany({});

  // Save the new data
  await Promise.all(
    incomingATISData.map(async (data) => {
      try {
        await data.save();
      } catch (error) {
        // Handle the error here
        console.error(`Error saving document ${data.callsign}:`, error);
      }
    })
  );
}
