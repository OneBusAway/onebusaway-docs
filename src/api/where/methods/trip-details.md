---
layout: rest_api
title: trip-details Method
description: Get extended details for a specific trip
sample_request_url: https://api.pugetsound.onebusaway.org/api/where/trip-details/1_562510385.json?key=TEST
example_response_file: trip-details-1_562510385.json
---

## Request Parameters

* `id` - the id of the trip, encoded directly in the URL:
    * `http://api.pugetsound.onebusaway.org/api/where/trip-details/[ID GOES HERE].xml`
* `serviceDate` - the service date for the trip as unix-time in ms (optional).  Used to disambiguate different versions of the same trip.  See [Glossary#ServiceDate the glossary entry for service date].
* `includeTrip` - Can be true/false to determine whether full [`<trip/>`](/api/where/elements/trip) element is included in the `<references/>` section.  Defaults to true.
* `includeSchedule` - Can be true/false to determine whether full `<schedule/>` element is included in the `<tripDetails/>` section.  Defaults to true.
* `includeStatus` - Can be true/false to determine whether the full `<status/>` element is include in the `<tripDetails/>` section.  Defaults to true.
* `time` - by default, the method returns the status of the system right now.  However, the system
  can also be queried at a specific time.  This can be useful for testing.  See [timestamps](/api/where/#timestamps)
  for details on the format of the `time` parameter.

## Response

The response `<entry/>` element is a
[`<tripDetails/>` element](/api/where/elements/trip-details) that captures extended
details about a trip.

The status element will indicate whether the trip is scheduled or canceled.
