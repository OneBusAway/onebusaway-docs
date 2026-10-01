---
layout: rest_api
title: arrivals-and-departures-for-location Method
description: Get current arrivals and departures for a given location
sample_request_url: https://api.pugetsound.onebusaway.org/api/where/arrivals-and-departures-for-location.json?key=TEST&lat=47.653&lon=-122.307&radius=100
example_response_file: arrivals-and-departures-for-location.json
---

Get current arrivals and departures for stops identified by a specific location (using a bounding box or a radius).

## Request Parameters

* **lat** (Required) - The latitude coordinate of the search center.
* **lon** (Required) - The longitude coordinate of the search center.
* **radius** (Optional) - The search radius in meters.
* **latSpan / lonSpan** (Optional) - Set the limits of the search bounding box. Used as an alternative to `radius`.
* **time** (Optional) - By default, the method returns the status of the system right now. However, the system can also be queried at a specific time (in milliseconds since the Unix epoch). This can be useful for testing.
* **minutesBefore** (Optional) - Include arrivals and departures this many minutes before the query time. Defaults to 5.
* **minutesAfter** (Optional) - Include arrivals and departures this many minutes after the query time. Defaults to 35.
* **maxCount** (Optional) - The maximum size of the list of nearby stops and arrivals to return. Defaults to 250, can be up to 1000.
* **routeType** (Optional) - A comma-delimited list of GTFS routeTypes to filter by.
* **emptyReturnsNotFound** (Optional) - A boolean flag. If set to `true`, the API will return a `404 Not Found` error instead of a `200 OK` with an empty result when no stops or arrivals are found in the specified location.

## Response

The response contains a list of `arrivalsAndDepartures` matching the specified location parameters. 

The `nearbyStopIds` list is designed to capture stops that are very close by (like across the street) for quick navigation. This is sorted by distance and truncated to `maxCount`. 

Trips will not show up in the results if their schedule relationship is skipped or if there is no active service for the given time window.
