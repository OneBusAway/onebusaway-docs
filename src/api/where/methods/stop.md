---
layout: rest_api
title: stop Method
description: Retrieve info for a specific stop by id.
sample_request_url: https://api.pugetsound.onebusaway.org/api/where/stop/1_75403.json?key=TEST
example_response_file: stop-1_75403.json
---

## Request Parameters

* `id` - the id of the requested stop, encoded directly in the URL:
    * `http://api.pugetsound.onebusaway.org/api/where/stop/[ID GOES HERE].xml`

## Response

See details about the various properties of the [`<stop/>` element](/api/where/elements/stop).