---
title: OneBusAway Developer Documentation
layout: default
---

This is the primary documentation for all the application modules the make up the primary
[OneBusAway](http://onebusaway.org) website and application framework.

**Current Version:** ${currentVersion}

Details on all releases can be found in the [Release Notes](/release-notes).

## Help us improve our documentation!

This is a living website that needs help from the entire OneBusAway community:

* Notice a typo?
* See some outdated or incorrect information?
* Want to improve our web design?

Help out! If you can edit a text file, you can improve this site. [Find the source
code on GitHub](https://github.com/onebusAway/onebusaway-docs).

## Functionality

The OneBusAway application suite's primary function is to share real-time public transit information with riders across
a variety of interfaces:

* [OneBusAway Web](/features/web) - A variety of web interfaces to transit data
    * A standard web interface to transit data, including maps and stop pages with real-time info
    * A mobile-optimized version of the web interface for mobile browsers
    * A text-only version of the web interface for more-basic mobile browsers
* [OneBusAway REST API](/api/where) - A RESTful web-service that can be used to quickly write applications
built on top of transit data.  This API powers:
    * The OneBusAway [iOS application](https://github.com/onebusaway/onebusaway-ios)
    * The OneBusAway [Android application](https://github.com/onebusaway/onebusaway-android)
* [OneBusAway Phone](/features/phone-and-sms) - A Interactive Voice Response (IVR) phone application for accessing real-time transit information
* [OneBusAway SMS](/features/phone-and-sms) - An SMS service for accessing real-time transit information
* [OneBusAway Sign Mode](/features/sign-mode) - A interface mode optimized for large public displays

These interfaces are powered by a transit-data back-end module that combines raw transit data (GTFS, GTFS-realtime, etc)
into an optimized data-bundle appropriate for application development.

## Quick-Start

Want to quickly get started with OneBusAway? Check out the [Quickstart Guide](/guides/quickstart-guide).

## Guides

There are a number of guides to help get you started with installing, configuring, and running OneBusAway:

* [Quickstart Guide](/guides/quickstart-guide)
* [Installation Guide](/guides/installation-guide)
* [Real-Time Configuration Guide](/guides/realtime-configuration-guide)

If those guides don't help, there are [other resources for getting help](/getting-help).
