---
layout: page
title: routes-for-location Method
---

Search for routes near a specific location, optionally by name

## Sample Request

[http://api.pugetsound.onebusaway.org/api/where/routes-for-location.json?key=TEST&amp;lat=47.653435&amp;lon=-122.305641](http://api.pugetsound.onebusaway.org/api/where/routes-for-location.json?key=TEST&amp;lat=47.653435&amp;lon=-122.305641)

## Sample Response

```
{
"code": 200,
"currentTime": 1710684911089,
"data": {
"limitExceeded": true,
"list": [],
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
},
{}
],
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

* lat - The latitude coordinate of the search center
* lon - The longitude coordinate of the search center
* radius - The search radius in meters (optional)
* latSpan/lonSpan - An alternative to `radius` to set the search bounding box (optional)
* query	- A specific route short name to search for (optional)

If you just specify a lat,lon search location, the `routes-for-location` method will just return nearby routes.  If you specify an optional `query` parameter, we'll search for nearby routes with the specified route short name.  This is the primary method from going from a user-facing route name like "44" to the actual underlying route id unique to a route for a particular transit agency.

## Response

The `routes-for-location` method returns a [list result](/api/where/elements/list-result), so see additional documentation on controlling the number of elements returned and interpreting the results.  The list contents are [`<route/>` elements](/api/where/elements/route).
