---
layout: rest_api
title: search (route) Method
description: Search for a route based on its name.
sample_request_url: http://api.pugetsound.onebusaway.org/api/where/search/route.json?input=crystal&key=TEST
example_response_file: search_route_crystal.json
---

## Request Parameters

* `input` - the string to search for, encoded directly in the URL:
    * `http://api.pugetsound.onebusaway.org/api/where/search/route.json?input=[INPUT GOES HERE]`
* `maxCount` - the max number of results to return. Defaults to 20.
## Response
The method returns a [list result](../elements/list-result), so see additional documentation on controlling the number of elements returned and interpreting the results.  The list contents are `<route/>` elements, so see details about the various properties of the [`<route/>` element](../elements/route).