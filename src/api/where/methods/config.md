---
layout: page
title: config.json Method
---

Access to configuration information.

## Sample Request

[https://api.pugetsound.onebusaway.org/api/where/config.json?key=TEST](https://api.pugetsound.onebusaway.org/api/where/config.json?key=TEST)


## Sample Response

  ```
  {
"code": 200,
"currentTime": 1710684656313,
"data": {
"entry": {
"gitProperties": {},
"id": "b6bff432-3b99-4f75-8834-4b0c6969fb3f",
"name": "FEB24_2_4",
"serviceDateFrom": "1709280000000",
"serviceDateTo": "1722409200000"
},
"references": {
"agencies": [],
"routes": [],
"situations": [],
"stopTimes": [],
"stops": [],
"trips": []
}
},
"text": "OK",
"version": 2
}
  ```

## Request Parameters

* key - API key for authentication.
    * `https://api.pugetsound.onebusaway.org/api/where/config.json?&key=[API KEY GOES HERE]`


Replace `API KEY GOES HERE` with your actual API key obtained from OneBusAway.
Upon successful retrieval, the API responds with a JSON object containing the following fields:
