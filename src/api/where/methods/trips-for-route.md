---
layout: page
title: trips-for-route Method
---

Search for active trips for a specific route.

## Sample Request

[http://api.pugetsound.onebusaway.org/api/where/trips-for-route/1_100224.json?key=TEST](http://api.pugetsound.onebusaway.org/api/where/trips-for-route/1_100224.json?key=TEST)

## Sample Response

```
{
"code": 200,
"currentTime": 1710684080565,
"data": {
"limitExceeded": false,
"list": [],
"outOfRange": false,
"references": {}
},
"text": "OK",
"version": 2
}
```

## Request Parameters

* id - the id of the route, encoded directly in the URL:
    * `http://api.pugetsound.onebusaway.org/api/where/trips-for-route/[ID GOES HERE].xml`
* includeStatus - Can be true/false to determine whether full
  [`<tripStatus/>` elements](/api/where/elements/trip-status) with full real-time
  information are included in the `<status/>` section for each `<tripDetails/>`
  element.  Defaults to false.
* includeSchedule - Can be true/false to determine whether full `<schedule/>`
  elements are included in the `<tripDetails/>` element.  Defaults to false.
* time - by default, the method returns the status of the system right now.  However, the system
  can also be queried at a specific time.  This can be useful for testing.  See [timestamps](/api/where/#timestamps)
  for details on the format of the `time` parameter.

## Response

The response is a list of
[`<tripDetails/>` element](/api/where/elements/trip-details) that captures extended
details about each active trip.  The set of active trips includes any trip that
serves that specified route that is currently active.
The status element will indicate whether the trip is scheduled or canceled.
