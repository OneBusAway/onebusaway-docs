---
layout: page
title: stops-ids-for-agency Method
---

Retrieve the list of all stops for a particular agency by id

## Sample Request

[http://api.pugetsound.onebusaway.org/api/where/stop-ids-for-agency/40.json?key=TEST](http://api.pugetsound.onebusaway.org/api/where/stop-ids-for-agency/40.json?key=TEST)

## Sample Response

```
{
"code": 200,
"currentTime": 1710685368700,
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

## Request Parameters

* id - the id of the agency, encoded directly in the URL:
    * `http://api.pugetsound.onebusaway.org/api/where/stop-ids-for-agency/[ID GOES HERE].xml`

## Response

Returns a list of all stop ids for stops served by the specified agency.  Note that `<stop/>` elements for the referenced stops will NOT be included in the `<references/>` section, since there are potentially a large number of stops for an agency.