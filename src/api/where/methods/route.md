---
layout: page
title: route Method
---

Retrieve info for a specific route by id.

## Sample Request

[http://api.pugetsound.onebusaway.org/api/where/route/1_100224.json?key=TEST](http://api.pugetsound.onebusaway.org/api/where/route/1_100224.json?key=TEST)

## Sample Response

  ```
  {
"code": 200,
"currentTime": 1710420331130,
"data": {
"entry": {
"agencyId": "1",
"color": "",
"description": "Ballard - Montlake",
"id": "1_100224",
"longName": "",
"nullSafeShortName": "44",
"shortName": "44",
"textColor": "",
"type": 3,
"url": "https://kingcounty.gov/en/dept/metro/routes-and-service/schedules-and-maps/044.html"
},
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

* `id` - the id of the route, encoded directly in the URL:
    * `http://api.pugetsound.onebusaway.org/api/where/route/[ID GOES HERE].xml`

## Response

See details about the various properties of the [`<route/>` element](/api/where/elements/route).
