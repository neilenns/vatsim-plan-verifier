use("plan-verifier");

db.custommessages.deleteMany({});

db.custommessages.insertMany([
  {
    messageTarget: "Airport",
    targetName: "KVUO",
    messageId: "kvuoODPText",
    message: `**Pilot has ODP**

> Cleared to {{arrival}} {as filed/via the Pearson ODP then reroute}.
> Maintain 4,000. Expect {{formattedCruiseAltitude}} five minutes after departure.
> Departure frequency {freuqency}. Squawk {{squawk}}.

> Readback correct. Hold for release. Contact {departure/center} when ready for departure.

> *or*of
.S

> Readback correct. Monitor 122.8 when ready for departure.

**Pilot does not have ODP**

> Cleared to {{arrival}} as filed, fly runway heading, leaving 600' proceed direct BATTLEGROUND VOR.
> Maintain 4,000. Expect {{formattedCruiseAltitude}} five minutes after departure.
> Departure frequency {freuqency}. Squawk {{squawk}}.

> Readback correct. Hold for release. Contact {departure/center} when ready for departure.

> *or*

> Readback correct. Monitor 122.8 when ready for departure.
`,
  },
]);
