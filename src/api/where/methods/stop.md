---
layout: page
title: stop Method
---

Retrieve info for a specific stop by id

## Sample Request

[http://api.pugetsound.onebusaway.org/api/where/stop/1_75403.json?key=TEST](http://api.pugetsound.onebusaway.org/api/where/stop/1_75403.json?key=TEST)

## Sample Response

```
{
"code": 200,
"currentTime": 1710685450792,
"data": {
"entry": {
"code": "75403",
"direction": "SW",
"id": "1_75403",
"lat": 47.654503,
"locationType": 0,
"lon": -122.30513,
"name": "East Stevens Way NE & Benton Ln",
"parent": "",
"routeIds": [
"1_100225",
"1_100259",
"1_100214"
],
"staticRouteIds": [
"1_100225",
"1_100259",
"1_100214"
],
"wheelchairBoarding": "ACCESSIBLE"
},
"references": {
"agencies": [],
"routes": [],
"situations": [],
"stopTimes": [],
"stops": [],
"trips": []
}
},
"text": "OK",
"version": 2
}
```

## Request Parameters

* `id` - the id of the requested stop, encoded directly in the URL:
    * `http://api.pugetsound.onebusaway.org/api/where/stop/[ID GOES HERE].xml`

## Response

See details about the various properties of the [`<stop/>` element](/api/where/elements/stop).