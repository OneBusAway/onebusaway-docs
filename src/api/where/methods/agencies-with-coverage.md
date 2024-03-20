---
layout: rest_api
title: agency-with-coverage Method
description: Returns a list of all transit agencies currently supported by OneBusAway along with the center of their coverage area.
sample_request_url: https://api.pugetsound.onebusaway.org/api/where/agencies-with-coverage.json?key=TEST
example_response_file: agencies-with-coverage.json
---

## Response

The response has the following fields:

* `agencyId` - an agency id for the agency whose coverage is included.  Should match an [`<agency/>` element](/api/where/elements/agency) referenced in the `<references/>` section.
* `lat` and `lon` - indicates the center of the agency's coverage area
* `latSpan` and `lonSpan` - indicate the height (lat) and width (lon) of the coverage bounding box for the agency.