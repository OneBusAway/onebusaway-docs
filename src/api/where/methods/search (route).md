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
