# VATSIM plan verifier

This app verifies flight plans for VATSIM controllers. It is designed to report
common errors in flight plans filed by VATSIM pilots.

## Importing flight plans from VATSIM

The app supports listening for new flight plans at an airport to simplify the process of entering
flight plan data for verification. To start watching for flight plans enter a comma separated
list of airports to watch in the text box then click the connect icon:

![Configuring VATSIM flight plan import](/help_vatsimImport.png)

As flight plans are filed they will appear in the list. To import a flight plan for verification
click the import icon to the right of the entry.

## Using with VRC

Flight plan details can also be copied directly from VRC's Aircraft window:

![VRC arrivals & departures window](/help_vrcArrivalsDepartures.png)

Then paste it in to any of the fields of a new flight plan. The plan parts will automatically
get split apart and will populate the appropriate fields:

![VRC flight plan after being pasted into a new verifier form](/help_planAfterPaste.png)

After populating the flight plan details hit the `Verify` button to see the results.

## Using with other software

For other software you'll need to manually input each part of the flight plan.

## Flight plan information after verifying

After a flight plan is verified the plan will update to show helpful information underneath each of the flight plan parts.

| Part            | Information                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  |
| --------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| Callsign        | The telephony for the airline                                                                                                                                                                                                                                                                                                                                                                                                                                                                                |
| Aircraft type   | The aircraft manufacturer and name                                                                                                                                                                                                                                                                                                                                                                                                                                                                           |
| Departure       | The departure airport name                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   |
| Arrival         | The arrival airport name                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     |
| Cruise altitude | The first line shows the initial altitude to assign, if known, and how to phrase it. `CVS` means `Climb via SID except maintain`. `CVD` means `Climb via departure except maintain`. The second line shows when the pilot should expect to get their final cruise altitude, in minutes. If this information is shown in parenthesis, e.g. `(5 minutes)`, then the time is published on the chart and does not have to be given to the pilot as part of the clearance unless the cruise altitude was amended. |
| Route           | The telephony for the route, including how to say the SID (if known) and any navaids on the route.                                                                                                                                                                                                                                                                                                                                                                                                           |

![Flight plan after verifying](/help_planAfterVerifying.png)

## Seeing errors and warnings

Any errors and warnings for the flight plan will be shown in a list below the flight plan
and the associated fields will be highlighted:

![Flight plan with errors and warnings](/help_planWithErrorsAndWarnings.png)

After updating the flight plan to correct the errors hit the `Re-verify` button to validate
the changes.

## Removing completed flight plans

After clearing a pilot the flight plan verifier results can be removed from the left pane
by clicking the trash can icon next to the flight. Plans are also automatically removed
from the list two hours after they are verified.

## List of verifications

### Route verifications

* **Is the aircraft flying on valid airways?** This checks the aircraft's equipment suffix to see if it is GNSS-capable, and then looks for any GNSS-required airways in the flight plan. If the plane is not GNSS-capable and is flying on a `T` or `Q` airway then a warning is thrown.

* **Is the route a preferred route?** This check compares the filed route against known preferred routes in the ZSE ARTCC. The known preferred routes are more detailed than the ones on the website and take into account the filed aircraft type, its top cruise speed (if known), and altitude requirements for the route. Preferred routes for flights out of KPDX to smaller airports are also known. If there is any mismatch a warning will be thrown and the suggested preferred route for the filed aircraft type and destination will be shown.

* **Does the route have a SID?** This check looks at the filed route and attempts to determine whether it starts with a SID. This is not a detailed comparison against all known SIDs, it's a simple test to see if the first element of the route looks like a SID. If not a warning will be thrown.

* **Does the route have a valid first fix?** This check compares the first fix of a route against known ZSE ARTCC SIDs to ensure the first fix is one that is present on the SID. If the first fix isn't valid a warning will be thrown that shows the list of valid first fixes for the SID.

* **Is the aircraft a non-jet on an RNAV SID?** This check throws a warning if any piston or turboprop aircraft filed with an RNAV SID in the flight plan. This may indicate the flight should be assigned a different SID.

* **Does a non-RNAV aircraft have airways in the flight plan?** This check throws an error if the aircraft doesn't have RNAV (typically a `/A` aircraft) and filed a route that doesn't have any airways in it.

* **Is the route a common FlightAware route?** This check throws a warning if the filed route and cruise altitude doesn't match routes filed with FlightAware. If there is no match the first five most popular FlightAware routes and filed altitudes are shown, along with a link to view the rest on FlightAware. If the check passes a message will be shown indicating the route is good according to FlightAware.

* **Is the departure airport valid?** This check throws a warning if the departure airport isn't known by FlightAware.

* **Is the arrival airport valid?** This check throws a warning if the arrival airport isn't known by FlightAware.

### Altitude verifications

* **Is the plane too high for non-RVSM flight?** This check throws an error if the aircraft isn't capable of operating in RVSM airspace but filed a flight plan with a cruise altitude of FL290 or higher.

* **Is the altitude correct for direction of flight?** This calculates the direction of flight between the departure and arrival airports, accounting for magnetic variance, and returns an error if the altitude doesn't match the NEODD/SWEVEN rule. It also correctly handles flights above RVSM airspace.

* **Is the altitude correct for KPDX to KSLE flights?** This handles the special case mandatory 5,000' altitude for flights from KPDX to KSLE and provides the correct phrasing to amend the filed altitude if it is below or above 5,000'.

### Equipment suffix verifications

* **Is there an equipment suffix?** This check throws an error if no equipment suffix was provided.

* **Is the equipment suffix a known one for the aircraft type?** This checks the filed equipment suffix against known common equipment suffixes for the aircraft type. For example, if the pilot filed `B39M/A`, this would throw a warning as `/L` is the known common equipment suffix for a Boeing 737-9 MAX. Not all aircraft have a list of known equipment suffixes so don't rely on this test to be 100% confident in the suffix.

* **Is the equipment suffix a non-standard suffix?** This checks the filed equipment suffix and reports a warning if it isn't one of `/A`, `/G`, `/L`, `/W`, `/Z`, `/I` or `/U`.

* **Is the plane a piston with an odd equipment suffix?** This check throws a warning if the aircraft has piston engines and filed as `/L` or `/Z`.

* **Is the aircraft a jet with /A for an equipment suffix?** This check throws a warning if a jet aircraft filed with `/A` for the equipment suffix.

### Other verifications

* **Is the aircraft a heavy?** This check throws a warning if the aircraft is a heavy, reminding the controller to ensure the departure is assigned a runway that can accomodate heavy aircraft (e.g. `10R/28L` at `KPDX`).
