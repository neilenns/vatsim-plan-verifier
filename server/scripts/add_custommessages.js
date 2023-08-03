use("plan-verifier");

db.custommessages.deleteMany({});

db.custommessages.insertMany([
  {
    messageTarget: "Airport",
    targetName: "KVUO",
    messageId: "kvuoODPText",
    priority: 3,
    message: `**Pilot has ODP**

> Cleared to {{arrival}} {as filed/via the Pearson ODP then reroute}.  
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
    messageId: "SUMMA2Text",
    priority: 3,
    message: `**North flow**

> Cleared to {{arrival}} via the SUMMA2 departure, radar vectors SUMMA, then as filed.  
> Maintain 7,000 expect {{formattedCruiseAltitude}} 15 nautical miles from the SEATTLE VORTAC.

**South flow**

> Cleared to {{arrival}} via the SUMMA2 departure then as filed.  
> Maintain 7,000 expect {{formattedCruiseAltitude}} 15 nautical miles from the SEATTLE VORTAC.
`,
  },
  {
    messageTarget: "Departure",
    targetName: "SEA8",
    messageId: "SEA8Text",
    priority: 3,
    message: `> Cleared to {{arrival}} via the SEA8 departure, radar vectors {{initialFix}}, then as filed.  
> Maintain 7,000 expect {{formattedCruiseAltitude}} 15 nautical miles from the SEATTLE VORTAC.`,
  },
]);
