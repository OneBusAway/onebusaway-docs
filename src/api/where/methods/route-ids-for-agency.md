---
layout: rest_api
title: route-ids-for-agency Method
description: Retrieve the list of all route ids for a particular agency.
sample_request_url: https://api.pugetsound.onebusaway.org/api/where/route-ids-for-agency/40.json?key=TEST
example_response_file: route-ids-for-agency-40.json
---

## Request Parameters

* `id` - the id of the agency, encoded directly in the URL:
    * `http://api.pugetsound.onebusaway.org/api/where/route-ids-for-agency/[ID GOES HERE].xml?key=TEST`

## Response

Returns a list of all route ids for routes served by the specified agency.  Note that `<route/>` elements for the referenced routes will NOT be included in the `<references/>` section, since there are potentially a large number of routes for an agency.