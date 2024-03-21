---
layout: rest_api
title: stops-ids-for-agency Method
description: Retrieve the list of all stops for a particular agency by id.
sample_request_url: https://api.pugetsound.onebusaway.org/api/where/stop-ids-for-agency/40.json?key=TEST
example_response_file: stop-ids-for-agency-40.json
---

## Request Parameters

* `id` - the id of the agency, encoded directly in the URL:
    * `http://api.pugetsound.onebusaway.org/api/where/stop-ids-for-agency/[ID GOES HERE].xml`

## Response

Returns a list of all stop ids for stops served by the specified agency.  Note that `<stop/>` elements for the referenced stops will NOT be included in the `<references/>` section, since there are potentially a large number of stops for an agency.