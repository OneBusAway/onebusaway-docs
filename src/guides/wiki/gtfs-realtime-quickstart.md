---
title: GTFS Realtime Quickstart
layout: page
---

<div class='bg-blue-50 border-blue-500 dark:bg-slate-800 p-4 rounded-md'>
    <div><strong>Original location</strong>: <a href='https://github.com/OneBusAway/onebusaway-application-modules/wiki/GTFS-realtime-Quick-Start'>https://github.com/OneBusAway/onebusaway-application-modules/wiki/GTFS-realtime-Quick-Start</a></div>
    <div><strong>Last updated</strong>: September 2017</div>
</div>


# GTFS realtime Quick Start · OneBusAway/onebusaway-application-modules Wiki · GitHub

The OneBusAway (OBA) application suite makes it easy to integrate [GTFS][1] and [GTFS-realtime][2] data into a unified bundle that can power webapps, mobile apps through a REST API, SMS and phone interface, and large displays. For more information on OBA features, see the [OBA application suite documentation] ().

In this tutorial, we'll show you how you can be up and running in five minutes with your data and OBA without having to edit any code.

##  Installing Java

You must have Java installed to use OBA. Please install [Java SE JDK 1.6 (i.e., Java 6)][3], since other versions of Java (1.5, 1.7) seem to have problems with annotations used in OBA.

##  Downloading Files You'll Need

###  Downloading the OneBusAway Quick-Start Java Application

The first step is to download the latest OneBusAway Quick-Start Java Application. Pick an application based on what features you are interested in:

In our example, we'll use the API-only webapp.

###  Getting Transit Data

To run the quick-start, you will need both a [GTFS][1] feed and a [GTFS-realtime][2] feed from a transit system.

For our quick-start, we'll use [BART's GTFS feed][4] and [BART's GTFS-realtime feed][5].

##  Let's Go!

Running OneBusAway is a two-step process:

* Build a transit data bundle: raw transit data is processed into an optimized bundle, geared for fast access.
* Run the OneBusAway webapp: actually start the OneBusAway web applications, using the transit data bundle.

You can perform these two steps either using our simple GUI configuration tool or from the command-line.

###  Using the GUI

We provide a simple wizard to help you configure and run the OneBusAway quick-start application. Simply double-click the downloaded quick-start war file. Follow the steps and you'll be up and running in no time.

**NOTE:** You may need to run the OneBusAway quick-start GUI from the command-line if you want to pass additional options to java, like specifying more memory or server optimization:


    java -Xmx1G -server -jar onebusaway-quickstart-assembly.war


###  Using the Command-Line

To build the bundle, run the following:


    java -Xmx1G -server -jar onebusaway-quickstart-assembly.war -build path/to/gtfs.zip path/to/created-transit-bundle


To run the application suite:


    java -jar onebusaway-quickstart-assembly.war
     -webapp
     -gtfsRealtimeAlertsUrl=http://www.bart.gov/dev/gtrtfs/alerts.aspx
     -gtfsRealtimeTripUpdatesUrl=http://www.bart.gov/dev/gtrtfs/tripupdate.aspx
     path/to/created-transit-bundle


This specifies that GTFS-realtime alerts and trip-updates should be pulled from the BART GTFS-realtime feeds. If everything goes well, you can now start making calls to the [OneBusAway REST API][7], which is discussed below.

##  Testing the REST API

The REST API should now be up and running, so you can query the OBA REST API for a variety of transit information via pasting the below URLs into your web browser.

###  Stops for Location

Retrieve the set of stops near a location using the [stops-for-location][8] method:

[http://localhost:8080/api/where/stops-for-location.xml?key=TEST&lat=37.785045&lon=-122.407049][9]




      2
      200
      1330945230362
      OK

        ...


            BART_MONT
            37.7893359611
            -122.401485489
            Montgomery St. BART
            MONT
            0

              BART_12
              BART_06
              ...



            BART_POWL
            37.7849710021
            -122.407012285
            Powell St. BART
            POWL
            0

              BART_12
              BART_06
              ...



        false
        false




###  Arrivals and Departures for Stop

Retrieve the set of real-time arrivals and departures at a particular stop using the [arrivals-and-departures-for-stop][10] method:






      2
      200
      1330945364170
      OK


          ...


              BART_BSA_94422
              1330899176218
              MAINTENANCE


                  BART




                  significant_delays






          BART_POWL



            BART_BSA_94422






##  Testing the webapp

If you deployed the full OneBusAway webapp Java application that contains the [web user interfaces][11], you can open your browser to the below URL to see the interface:


    http://localhost:8080/


##  Troubleshooting

To see more options for configuring the build and the webapp, including adding real-time information, specify the -help option to get full usage instructions:


    java -jar onebusaway-quickstart-assembly.war -help


Also, check out the main [OneBusAway Troubleshooting page][12].

##  What's Next?

If you want to get your hands dirty with the code, head over to the [OBA Developer Guide][13] for a tutorial on deploying the web applications discussed here from the source code using Eclipse.

Also, see how to configure OneBusAway to consume other [other real-time transit data formats][14].

[1]: https://developers.google.com/transit/gtfs/
[2]: https://developers.google.com/transit/gtfs-realtime/
[3]: http://www.oracle.com/technetwork/java/javase/downloads/index.html
[4]: http://www.bart.gov/schedules/developers/gtfs.aspx
[5]: http://www.bart.gov/schedules/developers/gtfs-realtime.aspx
[6]: https://camo.githubusercontent.com/75dc67e42c838144f7d5f6f2901461c0272888ab/687474703a2f2f646576656c6f7065722e6f6e65627573617761792e6f72672f6d6f64756c65732f6f6e65627573617761792d6170706c69636174696f6e2d6d6f64756c65732f63757272656e742f6775696465732f517569636b53746172744775692e706e67
[7]: http://developer.onebusaway.org/api/where
[8]: http://developer.onebusaway.org/api/where/methods/stops-for-location
[9]: http://localhost:8080/api/where/stops-for-location.xml?key=TEST&lat=37.785045&lon=-122.407049
[10]: http://developer.onebusaway.org/api/where/methods/arrivals-and-departures-for-stop
[11]: https://github.com/OneBusAway/onebusaway-application-modules/wiki/OneBusAway-Web
[12]: https://github.com/OneBusAway/onebusaway/wiki/Troubleshooting
[13]: https://github.com/OneBusAway/onebusaway-application-modules/wiki/Developer-Guide
[14]: https://github.com/OneBusAway/onebusaway-application-modules/wiki/Real-Time-Data-Configuration-Guide
