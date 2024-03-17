---
layout: page
title: stops-for-route Method
---

Retrieve the set of stops serving a particular route, including groups by direction of travel.  The `stops-for-route` method first and foremost provides a method for retrieving the set of stops that serve a particular route.  In addition to the full set of stops, we provide various "stop groupings" that are used to group the stops into useful collections.  Currently, the main grouping provided organizes the set of stops by direction of travel  for the route.  Finally, this method also returns a set of polylines that can be used to draw the path traveled by the route.

## Sample Request

[http://api.pugetsound.onebusaway.org/api/where/stops-for-route/1_100224.json?key=TEST](http://api.pugetsound.onebusaway.org/api/where/stops-for-route/1_100224.json?key=TEST)

## Sample Response

 ```
 {
"code": 200,
"currentTime": 1710685582525,
"data": {
"entry": {
"polylines": [],
"routeId": "1_100224",
"stopGroupings": [],
"stopIds": []
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

* `id` - The route id, encoded directly in the URL:
    * `http://api.pugetsound.onebusaway.org/api/where/stops-for-route/[ID GOES HERE].xml`
* `includePolylines=true|false` = Optional parameter that controls whether polyline elements are included in the response.  Defaults to true.
* `time=YYYY-MM-DD|epoch` = specify the service date explicitly.  Defaults to today.

## Response
