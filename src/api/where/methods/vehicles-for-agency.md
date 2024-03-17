---
layout: page
title: vehicles-for-agency Method
---

Search for active vehicles for a particular agency by id.

## Sample Request

[http://api.pugetsound.onebusaway.org/api/where/vehicles-for-agency/1.json?key=TEST](http://api.pugetsound.onebusaway.org/api/where/vehicles-for-agency/1.json?key=TEST)

## Sample Response

```
{
"code": 200,
"currentTime": 1710683312951,
"data": {
"limitExceeded": false,
"list": [],
"outOfRange": false,
"references": {}
},
"text": "OK",
"version": 2
}
```

## Request Parameters

* id - the id of the agency, encoded directly in the URL:
    * `http://api.onebusaway.org/api/where/vehicles-for-agency/[ID GOES HERE].xml`
* time - by default, the method returns the status of the system right now.  However, the system
  can also be queried at a specific time.  This can be useful for testing.  See [timestamps](/api/where/#timestamps)
  for details on the format of the `time` parameter.

## Response

The response is a list of
[`<vehicleStatus/>` elements](/api/where/elements/vehicle-status) that captures extended
details about each active vehicle associated with the specified agency.
