---
layout: rest_api
title: agency Method
description: Retrieve info for a specific transit agency identified by id
sample_request_url: https://api.pugetsound.onebusaway.org/api/where/agency/1.json?key=TEST
example_response_file: agency-1.json
---

## Request Parameters

* `id` - the id of the agency, encoded directly in the URL:
    * `http://api.pugetsound.onebusaway.org/api/where/agency/[ID GOES HERE].xml`

### Response

For more details on the fields returned for an agency, see the documentation for the [`<agency/>` element](/api/where/elements/agency).
