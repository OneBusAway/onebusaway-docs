---
layout: rest_api
title: Search-Stop Method
description: Search for a stop based on its name.
sample_request_url: https://api.pugetsound.onebusaway.org/api/where/search/stop.json?input=crystal&key=TEST
example_response_file: search_stop_crystal.json
---

## Request Parameters

* `input` - the string to search for, encoded directly in the URL:
* `https://api.pugetsound.onebusaway.org/api/where/search/stop.json?input=[INPUT GOES HERE]`
* `maxCount` - the max number of results to return. Defaults to 20.

## Response

The method returns a [list result](/api/where/elements/list-result), so see additional documentation on controlling the number of elements returned and interpreting the results.  The list contents are `<stop/>` elements, so see details about the various properties of the [`<stop/>` element](/api/where/elements/stop).
