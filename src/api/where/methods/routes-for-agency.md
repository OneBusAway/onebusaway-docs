---
layout: page
title: routes-for-agency Method
---

Retrieve the list of all routes for a particular agency by id

## Sample Request

[http://api.pugetsound.onebusaway.org/api/where/routes-for-agency/1.json?key=TEST](http://api.pugetsound.onebusaway.org/api/where/routes-for-agency/1.json?key=TEST)

## Sample Response

   ```
   {
"code": 200,
"currentTime": 1710684835418,
"data": {
"limitExceeded": false,
"list": [],
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

* id - the id of the agency, encoded directly in the URL:
    * `http://api.pugetsound.onebusaway.org/api/where/routes-for-agency/[ID GOES HERE].xml`

## Response

Returns a list of all route ids for routes served by the specified agency.  See the full description for the [`<route/>` element](/api/where/elements/route).
