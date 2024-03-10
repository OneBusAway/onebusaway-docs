---
layout: page
title: cancel-alarm Method
---

Cancel a registered alarm.

## Sample Request

[Link](http://api.pugetsound.onebusaway.org/api/where/cancel_alarm/1_00859082-9b9d-4f72-a89f-c4be0e2cf01a.json)

## Sample Response

    <response>
      <version>2</version>
      <code>200</code>
      <text>OK</text>
      <currentTime>1270614730908</currentTime>
      <data>
        <references/>
      </data>
    </response>

## Request Parameters

* id - the alarm id is encoded directly in the URL
    * `http://api.pugetsound.onebusaway.org/api/where/cancel_alarm/[ID GOES HERE].xml`

The alarm id is returned in the call to [register-alarm-for-arrival-and-departure-at-stop](/api/where/methods/register-alarm-for-arrival-and-departure-at-stop) API method.
