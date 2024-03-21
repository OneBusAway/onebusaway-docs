---
layout: rest_api
title: trips-for-location Method
description: Search for active trips near a specific location.
sample_request_url: https://api.pugetsound.onebusaway.org/api/where/trips-for-location.json?key=TEST&lat=47.653&lon=-122.307&latSpan=0.008&lonSpan=0.008
example_response_file: trips-for-location.json
---

## Request Parameters

* `lat` - The latitude coordinate of the search center
* `lon` - The longitude coordinate of the search center
* `latSpan`/`lonSpan` - Set the limits of the search bounding box
* `includeTrip` - Can be true/false to determine whether full [`<trip/>` elements](/api/where/elements/trip) are included in the `<references/>` section.  Defaults to false.
* `includeSchedule` - Can be true/false to determine whether full `<schedule/>` elements are included in the `<tripDetails/>` section.  Defaults to false.
* `time` - by default, the method returns the status of the system right now.  However, the system
  can also be queried at a specific time.  This can be useful for testing.  See [timestamps](/api/where/#timestamps)
  for details on the format of the `time` parameter.

## Response

The response is a list of [`<tripDetails/>` element](/api/where/elements/trip-details) that captures extended details about each active trip.  Active trips are ones where the transit vehicle is currently located within the search radius.  We use real-time arrival data to determine the position of transit vehicles when available, otherwise we determine the location of vehicles from the static schedule.
