use("plan-verifier");

db.custommessages.deleteMany({});

db.custommessages.insertMany([
  {
    messageTarget: "Airport",
    targetName: "KVUO",
    messageId: "kvuoODPText",
    priority: 3,
    message: `**Pilot has ODP**

> Cleared to {{arrival}} as filed.  
> Maintain 4,000. Expect {{formattedCruiseAltitude}} five minutes after departure.  
> Departure frequency {frequency}. Squawk {{squawk}}.  

> Readback correct. Hold for release. Contact {departure/center} when ready for departure.

> *or*

> Readback correct. Monitor 122.8 when ready for departure.

**Pilot does not have ODP**

> Cleared to {{arrival}} as filed, fly runway heading, leaving 600' proceed direct BATTLEGROUND VOR.  
> Maintain 4,000. Expect {{formattedCruiseAltitude}} five minutes after departure.  
> Departure frequency {frequency}. Squawk {{squawk}}.  

> Readback correct. Hold for release. Contact {departure/center} when ready for departure.

> *or*

> Readback correct. Monitor 122.8 when ready for departure.
`,
  },
  {
    messageTarget: "Departure",
    targetName: "SUMMA2",
    flow: "NORTH",
    messageId: "SUMMA2TextNorth",
    priority: 3,
    message: `> Cleared to {{arrival}} via the SUMMA2 departure, SUMMA, then as filed.  
> Climb via SID except maintain 9,000. Expect {{formattedCruiseAltitude}} 15 nautical miles from the SEATTLE VORTAC.
`,
  },
  {
    messageTarget: "Departure",
    targetName: "SUMMA2",
    flow: "SOUTH",
    messageId: "SUMMA2TextSouth",
    priority: 3,
    message: `> Cleared to {{arrival}} via the SUMMA2 departure, {SUMMA/transition}, then as filed.  
> Maintain 7,000. Expect {{formattedCruiseAltitude}} 15 nautical miles from the SEATTLE VORTAC.  
`,
  },
  {
    messageTarget: "Departure",
    targetName: "SEA9",
    messageId: "SEA9TextNorth",
    flow: "NORTH",
    priority: 3,
    message: `> Cleared to {{arrival}} then as filed.  
> Maintain 9,000 expect {{formattedCruiseAltitude}} 15 nautical miles from the SEATTLE VORTAC.`,
  },
  {
    messageTarget: "Departure",
    targetName: "SEA9",
    messageId: "SEA9TextSouth",
    flow: "SOUTH",
    priority: 3,
    message: `> Cleared to {{arrival}} then as filed.  
> Maintain 7,000 expect {{formattedCruiseAltitude}} 15 nautical miles from the SEATTLE VORTAC.`,
  },
]);
