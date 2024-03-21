---
layout: rest_api
title: vehicles-for-agency Method
description: Search for active vehicles for a particular agency by id.
sample_request_url: https://api.pugetsound.onebusaway.org/api/where/vehicles-for-agency/40.json?key=TEST
example_response_file: vehicles-for-agency-40.json
---

## Request Parameters

* `id` - the id of the agency, encoded directly in the URL:
    * `http://api.onebusaway.org/api/where/vehicles-for-agency/[ID GOES HERE].xml`
* `time` - by default, the method returns the status of the system right now.  However, the system
  can also be queried at a specific time.  This can be useful for testing.  See [timestamps](/api/where/#timestamps)
  for details on the format of the `time` parameter.

## Response

The response is a list of
[`<vehicleStatus/>` elements](/api/where/elements/vehicle-status) that captures extended
details about each active vehicle associated with the specified agency.
