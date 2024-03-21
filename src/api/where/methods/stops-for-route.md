---
layout: rest_api
title: stops-for-route Method
description: |
    Retrieve the set of stops serving a particular route, including groups by direction of travel.
    The `stops-for-route` method first and foremost provides a method for retrieving the set of stops
    that serve a particular route.  In addition to the full set of stops, we provide various "stop groupings"
    that are used to group the stops into useful collections.  Currently, the main grouping provided organizes
    the set of stops by direction of travel  for the route.  Finally, this method also returns a set of
    polylines that can be used to draw the path traveled by the route.
sample_request_url: https://api.pugetsound.onebusaway.org/api/where/stops-for-route/1_100224.json?key=TEST
example_response_file: stops-for-route-1_100224.json
---

## Request Parameters

* `id` - The route id, encoded directly in the URL:
    * `http://api.pugetsound.onebusaway.org/api/where/stops-for-route/[ID GOES HERE].xml`
* `includePolylines=true|false` = Optional parameter that controls whether polyline elements are included in the response.  Defaults to true.
* `time=YYYY-MM-DD|epoch` = specify the service date explicitly.  Defaults to today.
