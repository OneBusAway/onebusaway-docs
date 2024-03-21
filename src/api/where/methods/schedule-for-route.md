---
layout: rest_api
title: schedule-for-route Method
description: Retrieve the full schedule for a route on a particular day
sample_request_url: https://api.pugetsound.onebusaway.org/api/where/schedule-for-route/1_100223.json?key=TEST
example_response_file: schedule-for-route-1_100223.json
---

## Request Parameters

* `id` - the route id to request the schedule for, encoded directly in the URL:
	* `http://api.pugetsound.onebusaway.org/api/where/schedule-for-route/[ID_GOES_HERE].xml`
* `date` - The date for which you want to request a schedule of the format `YYYY-MM-DD` (optional, defaults to current date)
    * `http://api.pugetsound.onebusaway.org/api/where/schedule-for-route/[ID_GOES_HERE].json?key=[KEY]&date=[DATE-GOES-HERE]`


## Response

The intent of this response is to mimic a traditional schedule-table format for viewing a route. As such the entry includes traditional header information, as well as a section of concentrated schedule information (in the form of `stopTripGrouping`s).

The header information is:
* `<routeId/>` - the route being looked into -  this information is presented in the format `[agency]_[routeIdentifier]`
* `<scheduleDate/>` - the date being looked at  -  the date of service in milliseconds since the Unix epoch
* `<serviceIds>` - the Service Ids which contain that route and are live on the specified date -  for more information see the [GTFS spec](http://code.google.com/transit/spec/transit_feed_specification.html)

The entry also has concentrated schedule information in the form of `stopTripGrouping`s. Each grouping includes:
* `directionId` - the direction the trips are heading -  for more information see the [GTFS spec](http://code.google.com/transit/spec/transit_feed_specification.html)
* `tripHeadsign` - the trip headsign - a string indicting the destination of the trip
* `stopIds` - an ordered list of stop Ids - Each id is of the format `[agency]_[stopIdentifier]`
* `tripIds` - a list of trip Ids that matched by shared direction - Each `tripId` is of the format `[agency]_[tripIdentifier]`

Alternate codes:

* `404` - returned if the route ID in the request is not found
* `510` - returned if the route has no schedules for the day requested
