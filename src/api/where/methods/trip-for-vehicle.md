---
layout: rest_api
title: trip-for-vehicle Method
description: Get extended trip details for a specific transit vehicle.  That is, given a vehicle id for a transit vehicle currently operating in the field, return extended trips details about the current trip for the vehicle.
sample_request_url: https://api.pugetsound.onebusaway.org/api/where/trip-for-vehicle/1_4531.json?key=TEST
example_response_file: trip-for-vehicle-1_4531.json
---

## Request Parameters

* `id` - the id of the vehicle, encoded directly in the URL:
    * `http://api.pugetsound.onebusaway.org/api/where/trip-for-vehicle/[ID GOES HERE].xml`
* `includeTrip` - Can be true/false to determine whether full [`<trip/>` element](/api/where/elements/trip) is included in the `<references/>` section.  Defaults to false.
* `includeSchedule` - Can be true/false to determine whether full `<schedule/>` element is included in the `<tripDetails/>` section.  Defaults to fale.
* `includeStatus` - Can be true/false to determine whether the full `<status/>` element is include in the `<tripDetails/>` section.  Defaults to true.
* `time` - by default, the method returns the status of the system right now.  However, the system
  can also be queried at a specific time.  This can be useful for testing.  See [timestamps](/api/where/#timestamps)
  for details on the format of the `time` parameter.

## Response

The respone `<entry/>` element is a [`<tripDetails/>` element](/api/where/elements/trip-details) that captures extended details about a trip.
