---
layout: page
title: Release Notes
---

## ${currentVersion}

* CVE-2017-5638; upgrade struts to 2.3.32

## 1.1.15
  * documentation cleanup
  * quickstart api key fixes
  * Travis configuration
  * [issue](https://github.com/OneBusAway/onebusaway-application-modules/issues/132)
  * [issue](https://github.com/OneBusAway/onebusaway-application-modules/issues/134)
  * TripUpdate.delay support
  * agency id remapping for GTFS realtime
  * prevent assignment of backwards travel on distance-along-shape

## 1.1.13

* issue with deployment of 1.1.12 release.  Functionally equivalent.

## 1.1.12

* New Features/Bug Fixes:
  * Java 7 support
  * Issue [37](https://github.com/OneBusAway/onebusaway-application-modules/pull/37)
  * Issue [34](https://github.com/OneBusAway/onebusaway-application-modules/pull/34)
  * Issue [59](https://github.com/OneBusAway/onebusaway-application-modules/pull/59)
  * Issue [89](https://github.com/OneBusAway/onebusaway-application-modules/pull/89)

## 1.1.11

* New Features:
  * Merged OneBusAway Enterprise TransitDataService changes; see Issue 72 below.

  * Bug Fixes:
  * Issue [74](https://github.com/OneBusAway/onebusaway-application-modules/pull/74)
  * Issue [73](https://github.com/OneBusAway/onebusaway-application-modules/pull/73)
  * Issue [72](https://github.com/OneBusAway/onebusaway-application-modules/pull/72)
  * Issue [71](https://github.com/OneBusAway/onebusaway-application-modules/pull/71)
  * Issue [68](https://github.com/OneBusAway/onebusaway-application-modules/pull/68)
  * Issue [67](https://github.com/OneBusAway/onebusaway-application-modules/pull/67)
  * Issue [65](https://github.com/OneBusAway/onebusaway-application-modules/pull/65)
  * Issue [64](https://github.com/OneBusAway/onebusaway-application-modules/pull/64)

## 1.1.10

* New Features:
    * spring parameter to turn off schedule deviation history
    * support for GTFS-realtime export to onebusaway-api-webapp

* Bug Fixes:
    * Issue [#61](https://github.com/OneBusAway/onebusaway-application-modules/issues/61)
    * Issue [#40](https://github.com/OneBusAway/onebusaway-application-modules/issues/40)
    * Issue [#49](https://github.com/OneBusAway/onebusaway-application-modules/issues/49)
    * Issue [#56](https://github.com/OneBusAway/onebusaway-application-modules/issues/56)
    * Issue [#55](https://github.com/OneBusAway/onebusaway-application-modules/issues/55)
    * Issue [#52](https://github.com/OneBusAway/onebusaway-application-modules/issues/52)
    * Issue [#48](https://github.com/OneBusAway/onebusaway-application-modules/issues/48)
    * Issue [#23](https://github.com/OneBusAway/onebusaway-application-modules/issues/23)

## 1.1.7

* New Features:
    * none
* Bug Fixes:
    * More verbose exception message for a particular build failure
    * Changes to cacheManager naming policy to support newer EHCache version

## 1.1.6

* New Features:
    * none
* Bug Fixes:
    * Issue [#35](https://github.com/OneBusAway/onebusaway-application-modules/issues/35)


## 1.1.5

* New Features:
    * none
* Bug Fixes:
    * Issue [#32](https://github.com/OneBusAway/onebusaway-application-modules/issues/32)

## 1.1.3

* New Features:
    * none
* Bug Fixes:
    * Issue [#21](https://github.com/OneBusAway/onebusaway-application-modules/issues/21)

## 1.1.0

* New Features:
    * none
* Bug Fixes:
    * Issue [#14](https://github.com/OneBusAway/onebusaway-application-modules/issues/14)
    * Issue [#11](https://github.com/OneBusAway/onebusaway-application-modules/issues/11)
    * Issue [#15](https://github.com/OneBusAway/onebusaway-application-modules/issues/15)
    * Issue [#16](https://github.com/OneBusAway/onebusaway-application-modules/issues/16)
    * Issue [#17](https://github.com/OneBusAway/onebusaway-application-modules/issues/17)
    * Issue [#18](https://github.com/OneBusAway/onebusaway-application-modules/issues/18)
    * Issue [#19](https://github.com/OneBusAway/onebusaway-application-modules/issues/19)
    * Issue [#24](https://github.com/OneBusAway/onebusaway-application-modules/issues/24)

## 1.0.7

* New Features:
    * Improve the usability of the trip problem report admin interface to assist in diagnosing tracking problems -
      [issue](https://github.com/OneBusAway/onebusaway-application-modules/issues/5)
    * Improved deployment and configuration documentation - [issue](https://github.com/OneBusAway/onebusaway-application-modules/issues/8)
* Bug Fixes:
    * More flexible support for stop-to-shape matching - [issue](https://github.com/OneBusAway/onebusaway-application-modules/issues/12)
    * Add federated method dispatch for agency id / entity id argument mix -
      [issue](https://github.com/OneBusAway/onebusaway-application-modules/issues/7)
    * Fix to detect and remove duplicate stop times, so OBA logic to interpolate them can be invoked -
      [commit](https://github.com/OneBusAway/onebusaway-application-modules/commit/fc3388ed19e7a62bbd64fc0e7ff9d2d15d3b901b)
    * Fix issue where stops are not properly grouped when all trips have the same direction_id value -
      [commit](https://github.com/OneBusAway/onebusaway-application-modules/commit/7d1b35d83a7634903c4961c5d146e06cd19e667e)
    * Fix typo in setter for refreshInterval in GtfsRealtimeSource -
      [commit](https://github.com/OneBusAway/onebusaway-application-modules/commit/6671050f8c292cb71548e492e8f401985486dabd)

## 1.0.6

* New Features:
    * Add @ConfigurationParameter annotation for marking
      important OneBusAway bean configuration parameters.  Also add support for automatically generating
      documentation for these parameters.
    * Make the Google Maps API key a configurable parameter: `defaultWebappConfigurationSource.googleMapsApiKey`
    * Allow such bean properties to be overriden from the command-line for the webapp quickstart with the same
      -PbeanName.propertyName=value syntax used in the bundle builder command-line app.
    * Add more content to the trip problem report page to make it easier to diagnose problems.
    * Add a number of method for managing stale user accounts.
      [commit](https://github.com/OneBusAway/onebusaway-application-modules/commit/5fccc28658da7e2290ebf98c476d84fc655a1f51)
* Bug Fixes:
    * A number of fixes for Trip and Stop Problem reporting to handle the situation when a report refers to a stop or
      trip that is no longer loaded in the transit bundle.
    * Upgrade to struts 2.2.3.1, which hides those annoying GWT class exceptions on webapp startup.
    * ConfigurationService config cache was not properly reset on application startup.
    * In the VehicleLocationRecords API Action, the `vehicleId`, `fromTime`, and `toTime` parameters were not being
      properly set for the action.
      [commit](https://github.com/OneBusAway/onebusaway-application-modules/commit/826b4bba2a67ec28f682b6431bd5965cd34fbe10)
    * Make sure vehicleId is properly set when creating a TripProblemReportBean from a DB record.
      [commit](https://github.com/OneBusAway/onebusaway-application-modules/commit/cbd1a132fcb5d518087afb9134b8580b37b9cad5)

## 1.0.5

* Better computation of agency coverage area, using the actual routes > trips > stops to compute coverage.
* Better display of agencies on agency map, expanding map to show agency bounds in addition to agency center point.
* Bug fixes for quick-start webapp, mostly to deal with quirks of embedded Jetty webapp container.
* Add 404 page-not-found behavior to the root onebusaway-webapp index action, since it's called by default if another
  action can't be found for a URL.
* Refactor ConfigurationService to accept the webapp context-path as a parameter.  Attempting to detect the
  context-path automatically was proving to be a bit messy under different containers.
* Change how dynamic namespace matching works for the wiki (/p/*) action. The new name-based matching method doesn't
  require direct access to the underlying Struts ActionProxy and also gets rid of a ton of annoying log messages when
  running under Jetty.
* Add a configuration parameter to disable location interpolation in the BlockLocationServiceImpl.
* Remove a number of unused dependencies to get the size of release binaries down a bit.

## 1.0.4

* Merge some changes from the OneBusAway NYC branch.

## 1.0.3

* Fix problem with quickstart bundle.

## 1.0.2

* Make `onebusaway-quickstart` part of the main `onebusaway-application-modules` module set.
* Add a ui-only webapp artifact to `onebusaway-combined-webapp`.
* Tweak support for GTFS-realtime, including support for new OBA-specific delay field.
* Initial support for fixed-schedule trips with a headway-in-name-only frequency label, as indicated by frequencies.txt
  label_only feature proposal.
* Fix to make crossdomain action work whether its being called by the Struts Convention plugin OR the Rest2 plugin.
* Migrate to GitHub.

## 1.0.1

* More flexible trip matching in GTFS-realtime support
* Support for running transit data bundle building as a startup phase of webapps
* Expand onebusaway-combined-webapp to include SMS and phone support
* Expand onebusaway-combined-webapp to generate an additional API-only webapp artifact
* Move SMS actions into /sms namespace for onebusaway-sms-webapp
* Make SMS abbreviations optional in onebusaway-sms-webapp
* Additional documentation

## 1.0.0

* Initial Site Documentation
* Bump to require Maven 3

## 0.0.1

* Initial release
