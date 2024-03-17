---
layout: page
title: block Method
---

Get details of a specific block by id

## Sample Request

[http://api.pugetsound.onebusaway.org/api/where/block/1_5678585.json?key=TEST](http://api.pugetsound.onebusaway.org/api/where/block/1_5678585.json?key=TEST)

## Sample Response

```
    {
"code": 429,
"currentTime": 1710684609908,
"text": "rate limit exceeded",
"version": 1
}
```

## Request Parameters

* id - the id of the block, encoded directly in the url:
    * `http://api.pugetsound.onebusaway.org/api/where/block/[ID GOES HERE].xml`

## Response

See details about the various properties of the [`<blockConfiguration/>` element](/api/where/elements/block-configuration).
