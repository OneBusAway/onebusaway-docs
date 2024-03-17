---
layout: page
title: trip Method
---


Get details of a specific trip by id

## Sample Request

[http://api.pugetsound.onebusaway.org/api/where/trip/1_12540399.json?key=TEST](http://api.pugetsound.onebusaway.org/api/where/trip/1_12540399.json?key=TEST)

## Sample Response

```
    {
"code": 429,
"currentTime": 1710424569201,
"text": "rate limit exceeded",
"version": 1
}
```

## Request Parameters

* id - the id of the trip, encoded directly in the URL:
    * `http://api.pugetsound.onebusaway.org/api/where/trip/[ID GOES HERE].xml`

## Response

See details about the various properties of the [`<trip/>` element](/api/where/elements/trip).
