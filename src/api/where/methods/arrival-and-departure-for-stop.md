---
layout: rest_api
title: arrival-and-departure-for-stop Method
description: Get info about a single arrival and departure for a stop.
sample_request_url: https://api.pugetsound.onebusaway.org/api/where/arrival-and-departure-for-stop/1_75403.json?key=TEST&tripId=1_604670535&serviceDate=1710918000000
example_response_file: arrival-and-departure-for-stop-1_75403.json
---

## Request Parameters

* `id` - the stop id, encoded directly in the URL:
    * `http://api.pugetsound.onebusaway.org/api/where/arrival-and-departure-for-stop/[ID GOES HERE].xml`
* `tripId` - **required** the trip id of the arriving transit vehicle
* `serviceDate` - **required**  the service date of the arriving transit vehicle
* `vehicleId` - the vehicle id of the arriving transit vehicle (optional)
* `stopSequence` - the stop sequence index of the stop in the transit vehicle's trip
* `time` - by default, the method returns the status of the system right now.  However, the system can also be queried at a specific time.  This can be useful for testing.  See [timestamps](/api/where/#timestamps) for details on the format of the `time` parameter.

The key here is uniquely identifying which arrival you are interested in.  Typically, you would first make a call to [arrivals-and-departures-for-stop](/api/where/methods/arrivals-and-departures-for-stop) to get a list of upcoming arrivals and departures at a particular stop.  You can then use information from those results to specify a particular arrival.  At minimum, you must specify the `tripId` and `serviceDate`.  Additionally, you are also encouraged to specify the `vehicleId` if available to help disambiguate between multiple vehicles serving the same trip instance.  Finally, you are encouraged to specify the `stopSequence`.  This helps in the situation when a vehicle visits a stop multiple times during a trip (it happens) plus there is performance benefit on the back-end as well.

## Response

The method returns an [`<arrivalAndDeparture/>` element](/api/where/elements/arrival-and-departure) as its content.
