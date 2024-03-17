---
layout: page
title: current-time Method
---

Retrieve the current system time

## Sample Request

[http://api.pugetsound.onebusaway.org/api/where/current-time.json?key=TEST](http://api.pugetsound.onebusaway.org/api/where/current-time.json?key=TEST)

## Sample Response

```
    {
"code": 200,
"currentTime": 1710419936655,
"data": {
"entry": {
"readableTime": "2024-03-14T05:38:56-07:00",
"time": 1710419936655
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

## Response

* `time` - current system time as milliseconds since the Unix epoch
* `readableTime` - current system time in [ISO 8601](http://en.wikipedia.org/wiki/ISO_8601) format