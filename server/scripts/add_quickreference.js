use("plan-verifier");

db.quickreferences.deleteMany({});

db.quickreferences.insertMany([
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
  {
    key: "pearson",
    label: "KVUO advisory",
    markdown: `# Pearson

## VFR departure

> **N738FD**: Pearson Advisory, Skyhawk 738 Foxtrot Delta on the ground at Pearson, ready for departure, northbound.  

> **PDX_TWR**: Skyhawk 738 Foxtrot Delta, Portland International Airport reporting {current weather and altimeter}.  
> Remain outside the Portland Class Charlie airspace. Squawk 1200, maintain VFR at all times.  
> Portland departing {west, caution wake turbulence from our departures/east, caution wake turbulence from our arrivals}.  
> {Specific traffic point outs, including any other aircraft in the Pearson SFRA, should also be made.}  
> Pearson Advisory is on 122.8, frequency change approved.

*Source: [Pearson field operations (TWR)](https://zseartcc.org/documents/view/140)*

## VFR departure - north bank transition

> **N738FD**: Pearson Advisory, Skyhawk 738 Foxtrot Delta on the ground at Pearson, ready for departure, request North Bank Transition.
>
> **PDX_TWR**: Skyhawk 738 Foxtrot Delta, Portland International Airport reporting {current weather and altimeter}.  
> North Bank Transition approved at or below 2,500. Squawk {code}.  
>
> **N738FD**: North Bank Transition approved at or below 2,500, squawk {code}. Copy the numbers.  
>
> **PDX_TWR**: Readback correct. Portland departing {west, caution wake turbulence from our departures/east, caution wake turbulence from our arrivals}.  
> {Specific traffic point outs, including any other aircraft in the Pearson SFRA, should also be made}.  
> Pearson Advisory is on 122.8, frequency change approved.  
> Contact Portland Tower this frequency prior to entering the Class Charlie. Talk to you soon!

*Source: [Pearson field operations (TWR)](https://zseartcc.org/documents/view/140)*

## VFR arrivals

> **N738FD**: Pearson Advisory, Skyhawk 738 Foxtrot Delta is two miles north of Vancouver Lake for landing Pearson.  
> *or*  
> Pearson Advisory, Skyhawk 738 Foxtrot Delta, visual runway 26, circling north of the field.  
>  
> **PDX_TWR**: Skyhawk 738 Foxtrot Delta, Portland International Airport reporting {current weather and altimeter}.  
> Remain outside the Portland Class Charlie airspace.  
> Portland departing {west, caution wake turbulence from our departures/east, caution wake turbulence from our arrivals}.  
> {Specific traffic point outs, including any other aircraft in the Pearson SFRA, should also be made.}  
> Pearson Advisory is on 122.8, frequency change approved.

*Source: [Pearson field operations (TWR)](https://zseartcc.org/documents/view/140)*
`,
  },
]);
