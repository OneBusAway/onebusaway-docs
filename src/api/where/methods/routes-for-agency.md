---
layout: rest_api
title: routes-for-agency Method
description: Retrieve the list of all routes for a particular agency by id.
sample_request_url: https://api.pugetsound.onebusaway.org/api/where/routes-for-agency/40.json?key=TEST
example_response_file: routes-for-agency-40.json
---

## Request Parameters

* id - the id of the agency, encoded directly in the URL:
    * `http://api.pugetsound.onebusaway.org/api/where/routes-for-agency/[ID GOES HERE].xml`

## Response

Returns a list of all route ids for routes served by the specified agency.  See the full description for the [`<route/>` element](/api/where/elements/route).
