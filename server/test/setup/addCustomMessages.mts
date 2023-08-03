import CustomMessage from "../../src/models/CustomMessages.mjs";

const messages = [
  // Custom airport message
  {
    _id: "5f9f7b9b9b3b3c1b3c1b3c1a",
    messageTarget: "Airport",
    targetName: "KVUO",
    messageId: "customAirportMessage",
    priority: 3,
    message: `Custom airport message`,
  },
  // Custom departure message
  {
    _id: "5f9f7b9b9b3b3c1b3c1b3c1b",
    messageTarget: "Departure",
    targetName: "SUMMA2",
    messageId: "customDepartureMessage",
    priority: 3,
    message: `Custom departure message`,
  },
];

export default async function setup() {
  await Promise.all(
    messages.map(async (message) => {
      const record = new CustomMessage(message);
      try {
        await record.save();
      } catch (err) {
        console.log(err);
      }
    })
  );
}
