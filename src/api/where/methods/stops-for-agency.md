---
layout: rest_api
title: stops-for-agency Method
description: Retrieve the list of all stops for a particular agency by id.
sample_request_url: http://localhost:8080/onebusaway-api-webapp/api/where/stops-for-agency/unitrans.json?key=TEST
example_response_file: stops-for-agency-unitrans.json
---

## Request Parameters

* `id` - the id of the agency, encoded directly in the URL:
    * `http://api.pugetsound.onebusaway.org/api/where/stops-for-agency/[ID GOES HERE].json`

## Response

Returns a list of all stops served by the specified agency.  See the full description for the [`<stop/>` element](/api/where/elements/stop).

**Note:** This endpoint was introduced in OneBusAway 2.5.13.
