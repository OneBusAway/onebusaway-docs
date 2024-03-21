---
layout: rest_api
title: shape Method
description: Retrieve a shape (the path traveled by a transit vehicle) by id.
sample_request_url: https://api.pugetsound.onebusaway.org/api/where/shape/1_10002005.json?key=TEST
example_response_file: shape-1_10002005.json
---

## Request Parameters

* `id` - the shape id, encoded directly in the URL:
    * `http://api.pugetsound.onebusaway.org/api/where/shape/[ID GOES HERE].xml`

## Response

The path is returned as a `<shape/>` element with a points in the [encoded polyline format](http://code.google.com/apis/maps/documentation/polylinealgorithm.html) defined for Google Maps.