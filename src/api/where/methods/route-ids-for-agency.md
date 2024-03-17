---
layout: page
title: route-ids-for-agency Method
---

Retrieve the list of all route ids for a particular agency.

## Sample Request

[http://api.pugetsound.onebusaway.org/api/where/route-ids-for-agency/40.json?key=TEST](http://api.pugetsound.onebusaway.org/api/where/route-ids-for-agency/40.json?key=TEST)

## Sample Response

  ```
  {
"code": 200,
"currentTime": 1710420207277,
"data": {
"limitExceeded": false,
"list": [
"40_100511",
"40_513"
],
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

* id - the id of the agency, encoded directly in the URL:
    * `http://api.pugetsound.onebusaway.org/api/where/route-ids-for-agency/[ID GOES HERE].xml?key=TEST`

## Response

Returns a list of all route ids for routes served by the specified agency.  Note that `<route/>` elements for the referenced routes will NOT be included in the `<references/>` section, since there are potentially a large number of routes for an agency.