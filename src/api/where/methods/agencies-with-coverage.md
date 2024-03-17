---
layout: page
title: agency-with-coverage Method
---

Returns a list of all transit agencies currently supported by OneBusAway along with the center of their coverage area.

## Sample Request

[http://api.pugetsound.onebusaway.org/api/where/agencies-with-coverage.json?key=TEST](http://api.pugetsound.onebusaway.org/api/where/agencies-with-coverage.json?key=TEST)

## Sample Response

   ```
       {
"code": 200,
"currentTime": 1710684245449,
"data": {
"limitExceeded": false,
"list": [],
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

## Response

The response has the following fields:

* `agencyId` - an agency id for the agency whose coverage is included.  Should match an [`<agency/>` element](/api/where/elements/agency) referenced in the `<references/>` section.
* `lat` and `lon` - indicates the center of the agency's coverage area
* `latSpan` and `lonSpan` - indicate the height (lat) and width (lon) of the coverage bounding box for the agency.