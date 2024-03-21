---
layout: rest_api
title: trip Method
description: Get details of a specific trip by id.
sample_request_url: https://api.pugetsound.onebusaway.org/api/where/trip/1_605425455.json?key=TEST
example_response_file: trip-1_605425455.json
---

## Request Parameters

* `id` - the id of the trip, encoded directly in the URL:
    * `http://api.pugetsound.onebusaway.org/api/where/trip/[ID GOES HERE].xml`

## Response

See details about the various properties of the [`<trip/>` element](/api/where/elements/trip).
