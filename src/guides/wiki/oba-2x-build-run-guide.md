---
title: OBA 2.x Build and Run Guide (App Modules Wiki Home)
layout: page
---

<div class='bg-blue-50 border-blue-500 dark:bg-slate-800 p-4 rounded-md'>
    <div><strong>Original location</strong>: <a href='https://github.com/OneBusAway/onebusaway-application-modules/wiki'>https://github.com/OneBusAway/onebusaway-application-modules/wiki</a></div>
    <div><strong>Last updated</strong>: February 2025</div>
</div>

Welcome to OneBusAway!

OneBusAway Application modules are a suite of modules that assist in providing Customer Information Systems (CIS) features for fixed route Service.  As an open source project it pairs nicely with [TheTransitClock](https://github.com/theTransitClock/transitime/) and [OpenTripPlanner](https://github.com/opentripplanner/OpenTripPlanner) to bring transit features to your agency.

## Building OneBusAway Application Modules

v2.1 is intended for Java 11 or later on a Unix/Linux or macOS platform. Ensure you have the following prerequisites installed:
* Git (latest version)
* Maven 3.9.x or later
* Java 11 (1.11.x) or later
* MySQL 8.0 or compatible alternative (e.g., PostgreSQL)


Clone the Repository
```bash
mkdir ~/src
cd ~/src
git clone https://github.com/OneBusAway/onebusaway-application-modules.git
cd onebusaway-application-modules
mvn clean install
```

Ensure all tests pass before proceeding. If tests fail, verify Maven and Java configurations.

## Running OneBusAway Application Modules

This guide outlines the setup for a common configuration, using the following.

### Modules:
* onebusaway-admin-webapp: Builds the GTFS bundle and provides services via /api/bundle/list
* onebusaway-transit-data-webapp: used to load the bundle and provide a data tier layer
* onebusaway-api-webapp: provide the developer API for native apps
* onebusaway-acta-webapp: an example branded UI for providing desktop web and mobile web interfaces

### Setting Up MySQL Database
Run the following commands in a bash terminal:
```
mysql -u root -p
mysql> CREATE DATABASE onebusaway;
mysql> \q
```

### Configure Apache Tomcat for Admin Console

Tomcat Setup

1. Download and extract the latest version of Tomcat 9.x or 10.x from  [Apache Tomcat](https://downloads.apache.org/tomcat/).


In a bash terminal:

```
mkdir ~/tomcat
cd ~/tomcat
wget https://archive.apache.org/dist/tomcat/tomcat-9/v9.0.80/bin/apache-tomcat-9.0.80.zip
mkdir admin
cd admin
unzip ../apache-tomcat-10.1.0.zip
```

2. Deploy the onebusaway-admin-webapp:

Ensure you've run mvn clean install before copying .war files, otherwise target/ won't exist.

In a bash terminal:
```
cd apache-tomcat-10.1.0/webapps
cp ~/src/onebusaway-application-modules/onebusaway-admin-webapp/target/onebusaway-admin-webapp.war ROOT.war
```
3. Update server.xml and context.xml to configure ports an:

* Change the port from 8080 to 9999.
* Add parameters for the admin console:

```
sed -i 's!port="8080"!port="9999"!g;s!port="8005"!port="8115"!g' ../conf/server.xml
sed -i 's!</Context>!<Parameter name="file.bundle.bucketName" value="/var/lib/oba/bundles/builder" override="false" />\
<Parameter name="admin.instanceId" value="localhost" override="false" />\
<Parameter name="admin.port" value="9999" override="false" />\
<Parameter name="admin.context" value="api" override="false" /></Context>!' ../conf/context.xml

```
3. Add mail support:

In a bash terminal:
```
cd ../lib
wget https://repo1.maven.org/maven2/javax/mail/mail/1.4/mail-1.4.jar

```
5. Copy the example configuration:

* Download config.json.example from the [GitHub wiki](https://github.com/OneBusAway/onebusaway-application-modules/wiki).
* Save it to /var/lib/oba/config.json.

6. Start the server:

In a bash terminal:

``` 
cd ../bin
chmod 755 catalina.sh
./catalina.sh run
```
Build and Deploy the GTFS Bundle

1. Access the admin console at http://localhost:9999/.

* Username: admin
* Password: admin

2. Follow these steps:

* Navigate to "Manage Agency Metadata" > "Create new agency metadata."
* Fill in the fields:
    * Agency Name: 1
    * Agency Short Name: 1
    * GTFS Feed URL: http://www.gohart.org/google/google_transit.zip
    * GTFS ID: 1
    * Legacy ID: 1

3. Build the bundle:

* Go to "Transit Data Bundle Utility."
* Enter a dataset name (e.g., 20230114-hart).
* In the "Build" tab, upload and configure:
    * Build Name: 20230114-hart-1
    * Start Date: Today
    * End Date: 3 months from today
* Click "Build," then "Stage Bundle" and "Deploy Bundle(s)."



## Configuring the UI Tier

1. Set up another Tomcat instance for the UI modules:

In a new bash terminal:
```
cd ~/tomcat
mkdir app
cd app
unzip ../apache-tomcat-10.1.0.zip

```
2. Deploy the UI modules:

``` 
cd apache-tomcat-10.1.0/webapps
cp ~/src/onebusaway-application-modules/onebusaway-transit-data-federation-webapp/target/onebusaway-transit-data-federation-webapp.war ./
cp ~/src/onebusaway-application-modules/onebusaway-api-webapp/target/onebusaway-api-webapp.war ./
cp ~/src/onebusaway-application-modules/onebusaway-enterprise-acta-webapp/target/onebusaway-enterprise-acta-webapp.war ROOT.war

```
3. Start the server:

```
cd ../bin
chmod 755 catalina.sh
./catalina.sh run

```
4. Verify deployment:

* API: http://localhost:8080/onebusaway-api-webapp/api/where/config.json?key=OBA
* Web UI: http://localhost:8080/routes/index


Ensure the branded webapp loaded in a web browser load http://localhost:8080/routes/index

Congrats!  You've installed an example configuration!