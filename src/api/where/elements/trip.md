---
layout: page
title: Trip Element
---

The `<trip/>` element models trips in OneBusAway. Trips are directly mapped from entries in the [GTFS trips.txt](https://gtfs.org/documentation/schedule/reference/#tripstxt) file from the GTFS feeds that power an API instance.

## Example

    <trip>
      <id>1_12540399</id>
      <routeId>1_44</routeId>
      <tripShortName>LOCAL</tripShortName>
      <tripHeadsign>Downtown via University District</tripHeadsign>
      <serviceId>1_114-115-WEEK</serviceId>
      <shapeId>1_20044006</shapeId>
      <directionId>1</directionId>
    </trip>

## Details

The fields of the trip element closely match the fields defined for trips in the [GTFS spec](https://gtfs.org/documentation/schedule/reference/#tripstxt).

A few important details:

- The only fields that are absolutely required are `id`, `routeId`, and `serviceId`.
