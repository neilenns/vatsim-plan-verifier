use("plan-verifier");

db.quickreferences.deleteMany({});

db.quickreferences.insertMany([
  {
    key: "vfrontop",
    label: "VFR to IFR on top",
    markdown: `# VFR to IFR on top
  
> N1234, Portland Tower. Cleared to BTG VOR via the PTLD2 departure.

> Climb to and report reaching VFR on top.

> If not on top at {altitude} maintain {altitude} and advise.

> Departure frequency 124.350, squawk 5542.
`,
  },
  {
    key: "pearson",
    label: "Pearson advisory",
    markdown: `# Pearson Advisory

## VFR departures

> Portland landing runways {10/28}.

> Cleared {to enter/out of} the Echo surface area north of Pearson Field Airport.

> Maintain Special VFR conditions and remain outside the Charlie airspace.

> Report {landing complete/exiting Echo airspace} on this frequency.

## IFR departures

### With ODP

> Cleared to {AIRPORT} {as filed/depart via the Pearson obstacle departure procedure}.

> After departure turn {left/right} heading 360, expect vectors on course leaving 2000'.

> Maintain 4,000. Expect (FILED ALTITUDE) 5 minutes after departure.

> Departure frequency {FREQUENCY}.

> Squawk {CODE}

### Without ODP

> Cleared to {AIRPORT} as filed, fly runway heading, leaving 600' turn {left/right heading 360}.

> Expect vectors on course leaving 2000'.

> Maintain 4,000. Expect {FILED ALTITUDE} 5 minutes after departure.

> Departure frequency {FREQUENCY}.

> Squawk {CODE}

**Readback must include everything except "Cleared to {AIRPORT}"**

## After readback (VFR or IFR)

> {CALLSIGN} readback correct. Hold for release, advise ready departure on this frequency.

## When ready for departure

> {CALLSIGN} released for departure, clearance void if not off in two minutes. Contact {app/ctr/unicom} when airborne.

## Arrivals

> {CALLSIGN} remain outside Charlie airspace. Portland landing runways {10/28}. {No traffic/traffic advisories}.

If it's an IFR arrival, after they report IFR cancellation acknowledge it then alert APP/CTR.
`,
  },
  {
    key: "helicopters",
    label: "Helicopters",
    markdown: `# Helicopters

## Taxiing

### Air taxi

> Air taxi via {direct/as requested/specific route} to {location, heliport, helipad, operating/movement area, active/inactive runway}.  
> Land and contact tower  
> *or*  
> Hold for {takeoff clearance, release, landing/taxiing aircraft, etc.}
>
> Optionally add: caution {wake turbulence/etc.}

**Avoid clearances which require aircraft or helicopters to taxi in proximity to taxiing or hover-taxi helicopters**

*Source: [7110.65 3-11-1](https://www.faa.gov/air_traffic/publications/atpubs/atc_html/chap3_section_11.html)*

### Hover taxi

> Hover taxi to {runway} via {direction} {cautions}

*Source: [7110.65 3-11-1](https://www.faa.gov/air_traffic/publications/atpubs/atc_html/chap3_section_11.html)*

## Takeoff

### From runway

Treat as a normal aircraft.

### From movement area other than runway

> {Present position/taxiway, helipad, numbers} make {right/left} turn for {direction/heading/NAVAID} departure, {cautions}. Cleared for takeoff.

*Source: [7110.65 3-11-2](https://www.faa.gov/air_traffic/publications/atpubs/atc_html/chap3_section_11.html)*

### From non-movement area not crossing airport or runway

> Departure from ramp will be at your own risk. Remain {direction} of the {runway} extended centerline. {Cautions}. Departure to the {direction} approved.

*Source: [7110.65 3-11-2](https://www.faa.gov/air_traffic/publications/atpubs/atc_html/chap3_section_11.html)*

### From non-movement area crossing airport or runway

> Departure from ramp will be at your own risk. Cross the airport at midfield then remain {direction} of the {runway} extended center line. {Cautions}. Departure to the {direction} approved.

*Source: [7110.65 3-11-2](https://www.faa.gov/air_traffic/publications/atpubs/atc_html/chap3_section_11.html) and [ZSE helicopter operations](https://zseartcc.org/documents/view/254)*

## Landing

### To runway or other movement area

> Make approach {straight in/circuling left/circling right turn} to {location, runway, taxiway, helipad, Maltese cross}.  
> Hold short of {active runway, extended runway centerline, etc.}.  
> Remain {direction/distance} of/from {runway, runway centerline, etc.}.  
> Caution {power lines, etc.}  
> Cleared to land.

*Source: [7110.65 3-11-6](https://www.faa.gov/air_traffic/publications/atpubs/atc_html/chap3_section_11.html)*

### To non-movement area not crossing airport or runway

> Landing at ramp will be at your own risk. Make approach {straight in/circling left/right turn}. Remain {direction} of the {runway} extended centerline. {Cautions}

*Source: [7110.65 3-11-6](https://www.faa.gov/air_traffic/publications/atpubs/atc_html/chap3_section_11.html)*

### To non-movement area crossing airport or runway

> Landing at ramp will be at your own risk. Make approach {straight in/circling left/right turn}. Cross the airport at midfield, then remain {direction} of the {runway} extended centerline. {Cautions}

*Source: [7110.65 3-11-2](https://www.faa.gov/air_traffic/publications/atpubs/atc_html/chap3_section_11.html) and [ZSE helicopter operations](https://zseartcc.org/documents/view/254)*
`,
  },
  {
    key: "military",
    label: "Military",
    markdown: `# Military

## Formation flights

Lead plane gets a squawk code. All other aircraft squawk standby.

> “N123JP squawk standby.”

or

> “N123SP have N123JP squawk standby.”

*Source: [7110.65 2-1-13 c](https://www.faa.gov/air_traffic/publications/atpubs/atc_html/chap2_section_1.html)*

## Takeoff (except cargo)

> Winds {wind} runway {runway}, cleared for takeoff, change to departure.

## Overhead maneuvers

> **FOX1**: Portland Tower, FOX1 is on a 5 mile straight in for runway 28R, requesting overhead maneuver.  
> **PDX_TWR** : FOX1, Portland Tower, pattern altitude 1,500. {left/right} turns. Report initial.  
> **FOX1**: Pattern altitude 1,500 with right turn. Will report initial for FOX1.  
> **FOX1**: FOX1 is initial.  
> **PDX_TWR**: FOX1, break at midfield. Report break.  
> **FOX1**: Break at midfield and will report the break for FOX1.  
> **FOX1**: FOX1 is break.  
> **PDX_TWR**: FOX1, check wheels down. Wind {wind}, runway {runway} cleared to land.  
> **FOX1**: Three in the green. Cleared to land runway 28R for FOX1.  

*Source: [ZSE military procedures](https://zseartcc.org/documents/view/136)*    
`,
  },
  {
    key: "equipmentsuffixes",
    label: "Equipment suffixes",
    markdown: `# Equipment suffixes

|              | No RVSM | RVSM  |
| ------------ | :-----: | :---: |
| No DME       |         |  /U   |
| TACAN        |   /P    |       |
| DME          |   /A    |  /W   |
| RNAV no GNSS |   /I    |  /Z   |
| GNSS         |   /G    |  /L   |

*Source: [FlightAware](https://flightaware.com/about/faq_aircraft_flight_plan_suffix.rvt)*
`,
  },
]);
