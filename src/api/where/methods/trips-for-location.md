---
layout: page
title: trips-for-location Method
---


Search for active trips near a specific location.

## Sample Request

[http://api.pugetsound.onebusaway.org/api/where/trips-for-location.json?key=TEST&amp;lat=47.653&amp;lon=-122.307&amp;latSpan=0.008&amp;lonSpan=0.008](http://api.pugetsound.onebusaway.org/api/where/trips-for-location.json?key=TEST&lat=47.653&lon=-122.307&latSpan=0.008&lonSpan=0.008)

## Sample Response

```
{
"code": 200,
"currentTime": 1710424623553,
"data": {
"limitExceeded": false,
"list": [
{
"frequency": null,
"serviceDate": 1710399600000,
"situationIds": [],
"tripId": "1_635875995"
}
],
"outOfRange": false,
"references": {
"agencies": [
{
"disclaimer": "",
"email": "",
"fareUrl": "https://kingcounty.gov/en/dept/metro/fares-and-payment/prices",
"id": "1",
"lang": "EN",
"name": "Metro Transit",
"phone": "206-553-3000",
"privateService": false,
"timezone": "America/Los_Angeles",
"url": "https://kingcounty.gov/en/dept/metro"
}
],
"routes": [
{
"agencyId": "1",
"color": "",
"description": "Totem Lake TC-Kirkand TC-UW Link Sta-Univ Dist",
"id": "1_100146",
"longName": "",
"nullSafeShortName": "255",
"shortName": "255",
"textColor": "",
"type": 3,
"url": "https://kingcounty.gov/en/dept/metro/routes-and-service/schedules-and-maps/255.html"
},
],
"situations": [],
"stopTimes": [],
"stops": [],
"trips": [
{
"blockId": "1_7087169",
"directionId": "0",
"id": "1_561354885",
"peakOffpeak": 0,
"routeId": "1_100225",
"routeShortName": "",
"serviceId": "1_45626",
"shapeId": "1_31045010",
"timeZone": "",
"tripHeadsign": "Loyal Heights Greenwood",
"tripShortName": ""
}
]
}
},
"text": "OK",
"version": 2
}
```

## Request Parameters

* lat - The latitude coordinate of the search center
* lon - The longitude coordinate of the search center
* latSpan/lonSpan - Set the limits of the search bounding box
* includeTrip - Can be true/false to determine whether full [`<trip/>` elements](/api/where/elements/trip) are included in the `<references/>` section.  Defaults to false.
* includeSchedule - Can be true/false to determine whether full `<schedule/>` elements are included in the `<tripDetails/>` section.  Defaults to false.
* time - by default, the method returns the status of the system right now.  However, the system
  can also be queried at a specific time.  This can be useful for testing.  See [timestamps](/api/where/#timestamps)
  for details on the format of the `time` parameter.

## Response

The response is a list of
[`<tripDetails/>` element](/api/where/elements/trip-details) that captures extended
details about each active trip.  Active trips are ones where the transit vehicle
is currently located within the search radius.  We use real-time arrival data to
determine the position of transit vehicles when available, otherwise we
determine the location of vehicles from the static schedule.
