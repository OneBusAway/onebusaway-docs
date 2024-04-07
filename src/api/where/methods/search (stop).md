---
layout: rest_api
title: search (stop) Method
description: Search for a stop based on its name.
sample_request_url: http://api.pugetsound.onebusaway.org/api/where/search/stop.json?input=crystal&key=TEST
example_response_file: search_stop_crystal.json
---

## Request Parameters

* `input` - the string to search for, encoded directly in the URL:
    * `http://api.pugetsound.onebusaway.org/api/where/search/stop.json?input=[INPUT GOES HERE]`
* `maxCount` - the max number of results to return. Defaults to 20.
