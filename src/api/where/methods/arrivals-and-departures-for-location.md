---
layout: rest_api
title: arrivals-and-departures-for-location Method
description: Get current arrivals and departures near a location
sample_request_url: https://api.pugetsound.onebusaway.org/api/where/arrivals-and-departures-for-location.json?key=TEST&lat=47.653&lon=-122.307&radius=50
example_response_file: arrivals-and-departures-for-location.json
---

Get current arrivals and departures for stops identified by a specific location (using a bounding box or a radius).

## Request Parameters

* `lat` - The latitude coordinate of the search center (required)
* `lon` - The longitude coordinate of the search center (required)
* `radius` - The search radius in meters, up to a maximum of 20,000 meters (20 km). The server constructs a rectangular bounding box around the coordinate with this radius, rather than a circle; stops near the corners of the box may be up to about 1.41 times the radius from the center (clients can apply a distance filter when needed). Either `radius` or both `latSpan` and `lonSpan` is required; if none is provided, the search area has zero size and returns no stops.
* `latSpan`/`lonSpan` - Sets the search bounding box as an alternative to `radius`, specified in degrees of latitude and longitude (e.g. `latSpan=0.01&lonSpan=0.01`). Each span defines the full width of the search box centered on `lat` and `lon`. Both must be provided together.
* `time` - By default, the method returns the status of the system right now. However, the system can also be queried at a specific time. See [timestamps](/api/where/#timestamps) for details on the format of the `time` parameter.
* `minutesBefore=n` - Include vehicles having arrived or departed in the previous n minutes (default=5)
* `minutesAfter=n` - Include vehicles arriving or departing in the next n minutes (default=35)
* `frequencyMinutesBefore=n` - Include frequency-based vehicles having arrived or departed in the previous n minutes (default=2)
* `frequencyMinutesAfter=n` - Include frequency-based vehicles arriving or departing in the next n minutes (default=30)
* `maxCount=n` - The maximum number of entries to return (default=250, maximum=1000). This limits the returned `stopIds`, `arrivalsAndDepartures`, and `nearbyStopIds` lists. If any list is truncated by this limit, `limitExceeded` is set to `true`. Note that all stops within the search area are still searched before list truncation, so clients should narrow the search area (`radius` or bounding box) if they need to limit the query scope.
* `routeType` - A comma-delimited list of GTFS route types to filter by (e.g. `0` for tram/light rail, `3` for bus). Filtering checks whether a stop serves the requested route type rather than checking each arrival's route; if a matching stop serves multiple route types, arrivals for other route types at that stop will still be returned, so clients should filter arrivals by route type if needed. Note that the initial stop search is unfiltered, so `stopIds` may include stops serving other route types within the search area.
* `emptyReturnsNotFound` - When set to `true`, indicates that an empty result should return a `404 Not Found` response instead of `200 OK`. Note: On the production server, this flag currently has no effect and `200 OK` is always returned. The flag also applies only when no stops are found in the search area, not when stops are found with no arrivals.

## Response

The response is primarily composed of [`<arrivalAndDeparture/>` elements](/api/where/elements/arrival-and-departure), so see the element documentation for specific details.

The `nearbyStopIds` list is designed to capture stops that are very close by (like across the street) for quick navigation. This is sorted by distance and limited by `maxCount`.

Trips will not show up in the results if their schedule relationship is SKIPPED or if there is no active service for the given time window.

### Empty Results

When no stops are found in the search area, the server returns a `200 OK` response with empty lists directly in `data` instead of the standard `entry` and `references` wrapper:

```json
{
  "code": 200,
  "currentTime": 1270614730908,
  "data": {
    "arrivalsAndDepartures": [],
    "limitExceeded": false,
    "nearbyStops": [],
    "situations": [],
    "stops": [],
    "timeZone": ""
  },
  "text": "OK",
  "version": 2
}
```

If stops are found in the search area but none have active arrivals within the requested time window, the standard structure with `data.entry` and `data.references` is returned, where `data.entry.arrivalsAndDepartures` is an empty list.
