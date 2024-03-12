---
layout: page
title: arrivals-and-departures-for-stop Method
---

Get current arrivals and departures for a stop identified by id

## Sample Request

[http://api.pugetsound.onebusaway.org/api/where/arrivals-and-departures-for-stop/1_75403.json?key=TEST](http://api.pugetsound.onebusaway.org/api/where/arrivals-and-departures-for-stop/1_75403.json?key=TEST)

## Sample Response

    <response>
      <version>2</version>
      <code>200</code>
      <text>OK</text>
      <currentTime>1270614730908</currentTime>
      <data class="listWithReferences">
        <references>...</references>
        <entry class="stopWithArrivalsAndDepartures">
          <stopId>1_75403</stopId>
          <arrivalsAndDepartures>
            <arrivalAndDeparture>...</arrivalAndDeparture>
            <arrivalAndDeparture>...</arrivalAndDeparture>
            <arrivalAndDeparture>...</arrivalAndDeparture>
          </arrivalsAndDepartures>
          <nearbyStopIds>
            <string>1_75414</string>
            <string>...</string>
          </nearbyStopIds>
        </entry>
      </data>
    </response>

## Request Parameters

* `id` - the stop id, encoded directly in the URL:
    * `http://api.pugetsound.onebusaway.org/api/where/arrivals-and-departures-for-stop/[ID GOES HERE].xml`
* `minutesBefore=n` - include vehicles having arrived or departed in the previous n minutes (default=5)
* `minutesAfter=n` - include vehicles arriving or departing in the next n minutes (default=35)
* `time` - by default, the method returns the status of the system right now.  However, the system
  can also be queried at a specific time.  This can be useful for testing.  See [timestamps](/api/where/#timestamps)
  for details on the format of the `time` parameter.


## Response

The response is primarily composed of [`<arrivalAndDeparture/>` elements](/api/where/elements/arrival-and-departure),  so see the element documentation for specific details.

The nearby stop list is designed to capture stops that are very close by (like across the street) for quick navigation.

Trips will not show up in the results if the schedule_relationship is SKIPPED.