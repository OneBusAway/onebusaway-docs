---
layout: rest_api
title: config Method
description: Get access to configuration information about the OBA server.
sample_request_url: https://api.pugetsound.onebusaway.org/api/where/config.json?key=TEST
example_response_file: config.json
---

## Request Parameters

* `key` - API key for authentication.
    * `https://api.pugetsound.onebusaway.org/api/where/config.json?&key=[API KEY GOES HERE]`


Replace `API KEY GOES HERE` with your actual API key obtained from OneBusAway.
Upon successful retrieval, the API responds with a JSON object containing the following fields:
