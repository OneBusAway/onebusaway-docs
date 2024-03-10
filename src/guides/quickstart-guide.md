---
title: Quickstart Guide
layout: page
---

We have a quick-start distribution designed to get you quickly up and running with the OneBusAway application suite.
This can be a good way to evaluate OneBusAway without getting bogged down in more complex deployment scenarios.

## What is OneBusAway?

The OneBusAway application suite is a set of tools to help share real-time public transit information with riders
across a variety of interfaces.  It includes interfaces for the web, phone, sms, large sign displays, and a REST API
that powers a number of mobile applications.  For more information on these features, see the
[application suite documentation](/).

## Prerequisites

At a bare minimum, you'll need [Java](http://www.java.com/en/) installed on your system.  You will also need the
following:

## Transit Data

You will need transit data to power your OneBusAway installation.  At minimum, you'll need
[GTFS](https://developers.google.com/transit/gtfs/) static schedule data feed for your target
transit agency.  Optionally, but ideally, you will also need real-time data for your transit agency.  OneBusAway
supports real-time data for delays, service alerts, and vehicle positions in the
[GTFS-realtime](https://developers.google.com/transit/gtfs-realtime) format or the [SIRI](https://www.siri-cen.eu) format.

## Download a Quickstart Bundle

You need to download one of the quickstart bundles.  Pick a bundle based on what features you are interested in:

* The full webapp: **`onebusaway-quickstart-assembly-webapp.war`** - Includes the [REST API](/api/where) and [the web interfaces](/features/web).
* The API-only webapp: **`onebusaway-quickstart-assembly-api-webapp.war`** - Includes just the [REST API](/api/where).

Find links to both of these WAR files on our [Downloads page](/downloads).

## Let's Go!

Running OneBusAway is a two-step process:

1. Build a transit data bundle: raw transit data is processed into an optimized bundle, geared for fast access.
2. Run the OneBusAway webapp: actually start the OneBusAway web applications, using the transit data bundle.

You can perform these two steps either using our simple GUI configuration tool or from the command-line.

## Using the GUI

We provide a simple wizard to help you configure and run the OneBusAway quick-start application.  Simply double-click
the downloaded quick-start war file.  Follow the steps and you'll be up and running in no time.

**NOTE:** You may need to run the OneBusAway quick-start GUI from the command-line if you want to pass additional
options to **`java`**, like specifying more memory or server optimization:

~~~
java -Xmx1G -server -jar onebusaway-quickstart-assembly.war
~~~

## Using the Command-Line

First, build your transit data bundle:

~~~
java -Xmx1G -server -jar onebusaway-quickstart-assembly.war -build path/to/gtfs.zip path/to/created-transit-bundle
~~~

Next, run the webapp:

~~~
java -Xmx1G -server -jar onebusaway-quickstart-assembly.war -webapp path/to/created-transit-bundle
~~~

Once the webapp has finished startup, browse to [http://localhost:8080/](http://localhost:8080/).

To see more options for configuring the build and the webapp, including adding real-time information, specify the
**`-help`** option to get full usage instructions:

~~~
java -jar onebusaway-quickstart-assembly.war -help
~~~