---
title: Quickstart Guide
layout: page
---

**NOTE**: For new users, we recommend starting with our [Render.com Deployment Guide](/guides/deployment/render), which uses our official Docker image and is actively maintained. The guide below covers the legacy WAR-based approach and can still be useful for evaluation or custom deployments.

---

We have a quick-start distribution designed to get you quickly up and running with the OneBusAway application suite.
This can be a good way to evaluate OneBusAway without getting bogged down in more complex deployment scenarios.

## What is OneBusAway?

The OneBusAway application suite is a set of tools to help share real-time public transit information with riders
across a variety of interfaces.  It includes interfaces for the web, phone, sms, large sign displays, and a REST API
that powers a number of mobile applications.  For more information on these features, see the
[application suite documentation](/).

## Prerequisites

You will need Java installed on your system.  Specifically, you'll need **Java 11 or later** (Java 17 LTS is recommended).
You can download a free JDK from [Adoptium](https://adoptium.net/temurin/releases/?version=17).  After installing, verify the installation by running `java -version` — you should see something like `openjdk version "17.x.x"`.

For large agency GTFS feeds, you may need more memory than the default. The commands below use `-Xmx1G` (1GB) — increase this if you encounter out-of-memory errors.

## Transit Data

You will need transit data to power your OneBusAway installation.  At minimum, you'll need
[GTFS](https://developers.google.com/transit/gtfs/) static schedule data feed for your target
transit agency.  This is a commonly missed step — OneBusAway cannot run without transit data.

To find a GTFS feed for your transit agency, browse the [Mobility Database](https://mobilitydatabase.org/), which provides a searchable catalog of transit feeds worldwide.  For testing and evaluation, [BART's GTFS feed](https://www.bart.gov/schedules/developers/gtfs) is well-maintained and a good size for getting started.

Optionally, but ideally, you will also need real-time data for your transit agency.  OneBusAway
supports real-time data for delays, service alerts, and vehicle positions in the
[GTFS-realtime](https://developers.google.com/transit/gtfs-realtime) format or the [SIRI](https://www.siri-cen.eu) format.

## Download a Quickstart Bundle

Download one of the quickstart `.war` files from our
[Downloads page](/downloads):

* The full webapp: `onebusaway-quickstart-assembly-webapp.war` - Includes the [REST API](/api/where) and [the web interfaces](/features/web).
* The API-only webapp: `onebusaway-quickstart-assembly-api-webapp.war` - Includes just the [REST API](/api/where).

## Let's Go!

Running OneBusAway is a two-step process:

1. Build a transit data bundle: raw transit data is processed into an optimized bundle, geared for fast access.
2. Run the OneBusAway webapp: actually start the OneBusAway web applications, using the transit data bundle.

You can perform these two steps either using our simple GUI configuration tool or from the command-line.

## Using the GUI

Simply double-click the downloaded `.war` file and follow the on-screen steps.

**NOTE:** You may need to launch from the command-line to pass extra options
to `java`, such as more memory:

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
`-help` option to get full usage instructions:

~~~
java -jar onebusaway-quickstart-assembly.war -help
~~~

## Need Help?

If you run into issues, check out our [Troubleshooting Guide](/guides/troubleshooting-guide).  For more information on deployment, see the [Render.com Deployment Guide](/guides/deployment/render).  You can also reach out on our [community Slack](https://onebusaway.slack.com), report issues on [GitHub](https://github.com/OneBusAway/onebusaway-docs/issues), or check out the [onebusaway-docker repository](https://github.com/OneBusAway/onebusaway-docker).