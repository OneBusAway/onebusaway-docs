---
layout: page
title: agency Method
---

Retrieve info for a specific transit agency identified by id

## Sample Request

[http://api.pugetsound.onebusaway.org/api/where/agency/1.json?key=TEST](http://api.pugetsound.onebusaway.org/api/where/agency/1.json?key=TEST)

## Sample Response

 ```
   {
"code": 200,
"currentTime": 1710417390914,
"data": {
"entry": {
"disclaimer": "",
"email": "",
"fareUrl": "https://kingcounty.gov/en/dept/metro/fares-and-payment/prices",
"id": "1",
"lang": "EN",
"name": "Metro Transit",
"phone": "206-553-3000",
"privateService": false,
"timezone": "America/Los_Angeles",
"url": "https://kingcounty.gov/en/dept/metro"
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

* `id` - the id of the agency, encoded directly in the URL:
    * `http://api.pugetsound.onebusaway.org/api/where/agency/[ID GOES HERE].xml`

### Response

For more details on the fields returned for an agency, see the documentation for the [`<agency/>` element](/api/where/elements/agency).
