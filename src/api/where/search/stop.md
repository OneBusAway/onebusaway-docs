---
layout: page
title: Stop Search API
---

Search for a stop based on its name.

## Sample Request

[http://api.pugetsound.onebusaway.org/api/where/search/stop.json?input=crystal&key=TEST](http://api.pugetsound.onebusaway.org/api/where/search/stop.json?input=crystal&key=TEST)

## Sample Response

<pre><code class="language-json">
{
"code": 200,
"currentTime": 1674233149269,
"data": {
    "limitExceeded": false,
    "list": [
        {
            "code": "2001084",
            "direction": "SE",
            "id": "1_12968",
            "lat": 39.147039,
            "locationType": 0,
            "lon": -77.009724,
            "name": "NEW HAMPSHIRE AVE + CRYSTAL SPRING DR",
            "parent": "",
            "routeIds": [
                "1_Z2"
            ],
            "wheelchairBoarding": "UNKNOWN"
        }
        ...
    ],
    "outOfRange": false,
    "references": {
        ...
    }
},
"text": "OK",
"version": 2
}
</code></pre>

## Request Parameters

* `input` - the string to search for, encoded directly in the URL:
    * `http://api.pugetsound.onebusaway.org/api/where/search/stop.json?input=[INPUT GOES HERE]`
* `maxCount` - the max number of results to return. Defaults to 20.