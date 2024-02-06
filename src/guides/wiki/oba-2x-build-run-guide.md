---
title: OBA 2.x Build and Run Guide (App Modules Wiki Home)
layout: page
---

<div class='bg-blue-50 border-blue-500 dark:bg-slate-800 p-4 rounded-md'>
    <div><strong>Original location</strong>: <a href='https://github.com/OneBusAway/onebusaway-application-modules/wiki'>https://github.com/OneBusAway/onebusaway-application-modules/wiki</a></div>
    <div><strong>Last updated</strong>: April 2022</div>
</div>

Welcome to OneBusAway!

OneBusAway Application modules are a suite of modules that assist in providing Customer Information Systems (CIS) features for fixed route Service.  As an open source project it pairs nicely with [TheTransitClock](https://github.com/theTransitClock/transitime/) and [OpenTripPlanner](https://github.com/opentripplanner/OpenTripPlanner) to bring transit features to your agency.

## Building OneBusAway Application Modules

v2.1 is intended for java11 on a Unix/Linux or mac platform.  As preconditions these instruction assume you have installed:
* a recent git version
* mvn 3.5.4
* java 1.11.x
* mysql 5.7


In a bash terminal:
```bash
mkdir ~/src
cd ~/src
git checkout git@github.com:onebusaway/onebusaway-applicaton-modules
cd onebusaway-applicaton-modules
mvn clean install
```

Verify the tests succeed before proceeding.

## Running OneBusAway Application Modules

There are many possible configurations of these modules.  Here we will detail one popular configuration.

### Modules:
* onebusaway-admin-webapp: used to build the GTFS into the onebusaway-federated-transit-data-bundle and service via /api/bundle/list
* onebusaway-transit-data-webapp: used to load the bundle and provide a data tier layer
* onebusaway-api-webapp: provide the developer API for native apps
* onebusaway-acta-webapp: an example branded UI for providing desktop web and mobile web interfaces

### Database setup using mysql
In a bash terminal:
```
mysql -u root -P
mysql> create database onebusaway;
mysql> \q
```

### Admin Console setup:
Here we dedicate a Tomcat Server instance to the onebusaway-admin-webapp to provide bundle services.

Go to https://downloads.apache.org/tomcat/tomcat-8/ and find the latest version of Tomcat 8.5.  For this example its 8.5.75
In a bash terminal:

```
mkdir ~/tomcat
cd ~/tomcat
wget https://www.apache.org/dist/tomcat/tomcat-8/v8.5.75/bin/apache-tomcat-8.5.75.zip
mkdir admin
cd admin
unzip ../apache-tomcat-8.5.75.zip
cd apache-tomcat-8.5.75/webapps
cp ~/src/onebusaway-application-modules/onebusaway-admin-webapp/target/onebusaway-admin-webapp.war ROOT.war
cd ../conf
# change port from 8080 to 9999 for admin server
# this may be mac specific
sed -i ''  's!port="8080"!port="9999"!g;s!port="8005"!port="8115"' server.xml
sed -i '' 's!</Context>!<Parameter name="file.bundle.bucketName" value="/var/lib/oba/bundles/builder" override="false" /><Parameter name="admin.instanceId" value="localhost" override="false" /><Parameter name="admin.port" value="9999" override="false" /><Parameter name="admin.context" value="api" override="false" /></Context>!' context.xml
# linux
sed -i server.xml -e 's!port="8080"!port="9999"!g;s!port="8005"!port="8115"!g'
sed -i context.xml -e 's!</Context>!<Parameter name="file.bundle.bucketName" value="/var/lib/oba/bundles/builder" override="false" /><Parameter name="admin.instanceId" value="localhost" override="false" /><Parameter name="admin.port" value="9999" override="false" /><Parameter name="admin.context" value="api" override="false" /></Context>!'

# add mail support
cd ../lib
wget https://repo1.maven.org/maven2/javax/mail/mail/1.4/mail-1.4.jar
# setup config.json
# copy contents of https://github.com/OneBusAway/onebusaway-application-modules/wiki/config.json.example to /var/lib/oba/config.json
cd ../bin
chmod 755 catalina.sh
./catalina.sh run
```

Now load and build the GTFS into a transit-data-bundle via the admin console. We use Tampa Bay's HART as an example below.
In a web browser go http://localhost:9999/
user: admin
password: admin

Then execute the following steps:
* Click "Manage Agency Metadata"
* Click "Create new agency metadata"
* Agency Name: 1
* Agency Short Name: 1
* GTFS Feed Url: http://www.gohart.org/google/google_transit.zip
* GTFS Id: 1
* Legacy Id: 1

* Click "Transit Data Bundle Utility"
* in "What do you want to name your dataset?" enter "20220114-hart" then click "Save and Continue"
* In Build Tab click "Upload"
* Switch to the Build tab
* Build Name: 20220114-hart-1
* Start Date: today
* End Date: 3 months from now
* Click "Build"
* Upon a successful Build go to "Stage" tab
* Click "Stage Bundle"
* Go to "Deploy" tab
* Click "Deploy Bundle(s)"



## UI tier

Here we dedicate another tomcat instance to the UI tier.

In a new bash terminal:
```
cd ~/tomcat
mkdir app
cd app
unzip ../apache-tomcat-8.5.75.zip
cd apache-tomcat-8.5.75/webapps
cp ~/src/onebusaway-application-modules/onebusaway-transit-data-federation-webapp/target/onebusaway-transit-data-federation-webapp.war ./
cp ~/src/onebusaway-application-modules/onebusaway-api-webapp/target/onebusaway-api-webapp.war ./
cp ~/src/onebusaway-application-modules/onebusaway-enterprise-acta-webapp/target/onebusaway-enterprise-acta-webapp.war ROOT.war
cd ../bin
chmod 755 catalina.sh
./catalina.sh run

```

Validate the api deployed correctly:
```
wget -O - http://localhost:8080/onebusaway-api-webapp/api/where/config.json?key=OBA
```

Ensure the branded webapp loaded in a web browser load http://localhost:8080/routes/index

Congrats!  You've installed an example configuration!