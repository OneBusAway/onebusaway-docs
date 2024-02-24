---
title: GTFS Realtime Resources
layout: page
---

<div class='bg-blue-50 border-blue-500 dark:bg-slate-800 p-4 rounded-md'>
    <div><strong>Original location</strong>: <a href='https://github.com/OneBusAway/onebusaway/wiki/GTFS-Realtime-Resources'>https://github.com/OneBusAway/onebusaway/wiki/GTFS-Realtime-Resources</a></div>
    <div><strong>Last updated</strong>: January 2021</div>
</div>


## Applications

The [OneBusAway application suite](https://github.com/OneBusAway/onebusaway-application-modules/wiki) has support for both GTFS-realtime import and export.  The application suite can be used to provide a high-level API from low level GTFS and GTFS-realtime data feeds, for example.

## Tools and Libraries

We provide a number of libraries and tools for working with [GTFS-realtime](https://developers.google.com/transit/gtfs-realtime/) data:

* [**onebusaway-gtfs-realtime-api**](https://github.com/OneBusAway/onebusaway-gtfs-realtime-api/wiki) - a set of Java classes generated from the [GTFS-realtime Protocol Buffer spec](https://developers.google.com/transit/gtfs-realtime/gtfs-realtime-proto) that allow you to produce and consume raw GTFS-realtime data.
* [**onebusaway-gtfs-realtime-exporter**](https://github.com/OneBusAway/onebusaway-gtfs-realtime-exporter/wiki) provides a simple library to assist in sharing GTFS-realtime data.
* [**onebusaway-gtfs-realtime-from-siri-cli**](https://github.com/OneBusAway/onebusaway-gtfs-realtime-from-siri-cli/wiki) provides a command-line tool for converting [SIRI](https://www.siri-cen.eu) real-time data into GTFS-realtime.
* [**onebusaway-gtfs-realtime-from-nextbus-cli**](https://github.com/OneBusAway/onebusaway-gtfs-realtime-from-nextbus-cli/wiki) provide a command-line tool for converting [NextBus API](https://retro.umoiq.com/xmlFeedDocs/NextBusXMLFeed.pdf) real-time data into GTFS-realtime.
* [**onebusaway-gtfs-realtime-munin-plugin**](https://github.com/OneBusAway/onebusaway-gtfs-realtime-munin-plugin/wiki) provides a [Munin](http://munin-monitoring.org/) plugin for logging information about a GTFS-realtime feed.
* [**onebusaway-gtfs-realtime-nagios-plugin**](https://github.com/OneBusAway/onebusaway-gtfs-realtime-nagios-plugin/wiki) provides a [Nagios](http://www.nagios.org/) plugin for monitoring a GTFS-realtime feed.

Also see a number of third-party tools [here](https://github.com/OneBusAway/onebusaway-application-modules/wiki/Real-Time-Data-Configuration-Guide#data-processing-tools).

## Tutorials

* A brief intro to GTFS-realtime and show how to produce a GTFS-realtime alerts feed: https://github.com/OneBusAway/onebusaway/wiki/GTFS-Realtime-Tutorial-%231:-Intro-to-GTFS-Realtime
* How to produce GTFS-realtime trip update and vehicle position feeds: https://github.com/OneBusAway/onebusaway/wiki/GTFS-Realtime-Tutorial-%232:-How-to-produce-GTFS-realtime-trip-update-and-vehicle-position-feed
* How to consume a GTFS-realtime feed, with a simple visualization of vehicle positions: https://github.com/OneBusAway/onebusaway/wiki/GTFS-Realtime-Tutorial-%233:--Vehicle-Positions
* GTFS-realtime's place in the API ecosystem and using GTFS-realtime to power OneBusAway: https://github.com/OneBusAway/onebusaway/wiki/GTFS-Realtime-Tutorial-%234:-GTFS-in-the-API-ecosystem
* A number of other GTFS-realtime resources, including various adapters and plugins that work with the spec: https://github.com/OneBusAway/onebusaway/wiki/GTFS-Realtime-Tutorial-%235:-Additional-Resources

## Example Code

We also provide a number of demonstration projects with example code designed to get your up and running with GTFS-realtime.

* [GTFS-realtime Alerts Producer Example Project](https://github.com/OneBusAway/onebusaway-gtfs-realtime-alerts-producer-demo/wiki)
* [GTFS-realtime Trip Updates and Vehicle Positions Producer Example Project](https://github.com/OneBusAway/onebusaway-gtfs-realtime-trip-updates-producer-demo/wiki)
* [GTFS-realtime Vehicle Positions Consumer Example Project](https://github.com/OneBusAway/onebusaway-gtfs-realtime-visualizer/wiki)
