---
layout: rest_api
title: report-problem-with-trip Method
description: |
  Submit a user-generated problem report for a particular trip.  The reporting mechanism provides lots of fields that can
  be specified to give more context about the details of the problem (which trip, stop, vehicle, etc was involved),
  making it easier for a developer or transit agency staff to diagnose the problem.  These reports feed into the
  problem reporting admin interface.
sample_request_url: https://api.pugetsound.onebusaway.org/api/where/report-problem-with-trip/1_79430293.json?key=TEST&serviceDate=1291536000000&vehicleId=1_3521&stopId=1_75403&code=vehicle_never_came
example_response_file: report-problem-with-trip-1_79430293.json
---

## Request Parameters

* `tripId` - the trip id, encoded directly in the URL:
    * `http://api.pugetsound.onebusaway.org/api/where/report-problem-with-trip/[ID GOES HERE].xml`
* `serviceDate` - the service date of the trip
* `vehicleId` - the vehicle actively serving the trip
* `stopId` - a stop id indicating the stop where the user is experiencing the problem
* `code` - a string code identifying the nature of the problem
    * `vehicle_never_came`
    * `vehicle_came_early` - the vehicle arrived earlier than predicted
    * `vehicle_came_late` - the vehicle arrived later than predicted
    * `wrong_headsign` - the headsign reported by OneBusAway differed from the vehicle's actual headsign
    * `vehicle_does_not_stop_here` - the trip in question does not actually service the indicated stop
    * `other` - catch-all for everythign else
* `userComment` - additional comment text supplied by the user describing the problem
* `userOnVehicle` - true/false to indicate if the user is on the transit vehicle experiencing the problem
* `userVehicleNumber` - the vehicle number, as reported by the user
* `userLat` - the reporting user's current latitude
* `userLon` - the reporting user's current longitude
* `userLocationAccuracy` - the reporting user's location accuracy, in meters

In general, everything but the `tripId` itself is optional, but generally speaking, providing more fields in the report
will make it easier to diagnose the actual underlying problem.  Note that while we record specific location information
for the user, we do not store any identifying information for the user in order to make it hard to link the user to
their location as some point in the future.
