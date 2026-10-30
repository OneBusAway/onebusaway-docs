---
layout: page
title: Stop Element
---

The `<stop/>` element models stops in OneBusAway.  Stops are directly mapped from entries in the [GTFS stops.txt](https://gtfs.org/documentation/schedule/reference/#stopstxt) file from the GTFS feeds that power an API instance.

## Example

    <stop>
      <id>1_75403</id>
      <lat>47.6543655</lat>
      <lon>-122.305206</lon>
      <direction>S</direction>
      <name>Stevens Way &amp; BENTON LANE</name>
      <code>75403</code>
      <locationType>0</locationType>
      <wheelchairBoarding>ACCESSIBLE</wheelchairBoarding>
      <routeIds>
        <string>1_31</string>
        <string>...</string>
      </routeIds>
    </stop>

## Details

The fields of the stop element closely match the fields defined for stops in the [GTFS spec](https://gtfs.org/documentation/schedule/reference/#stopstxt).

A few important details:

The following fields are optional:

* direction
* code
* wheelchairBoarding

The following values are supported for the `<wheelchairBoarding/>` element:

* ACCESSIBLE
* NOT_ACCESSIBLE
* UNKNOWN
