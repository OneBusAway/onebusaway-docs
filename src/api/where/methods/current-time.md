---
layout: rest_api
title: current-time Method
description: Retrieve the current system time.
sample_request_url: https://api.pugetsound.onebusaway.org/api/where/current-time.json?key=TEST
example_response_file: current-time.json
---

## Response

* `time` - current system time as milliseconds since the Unix epoch
* `readableTime` - current system time in [ISO 8601](http://en.wikipedia.org/wiki/ISO_8601) format