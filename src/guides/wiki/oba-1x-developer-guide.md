---
title: OBA v1.x Developer Guide
layout: page
---

<div class='bg-blue-50 border-blue-500 dark:bg-slate-800 p-4 rounded-md'>
    <div><strong>Original location</strong>: <a href='https://github.com/OneBusAway/onebusaway-application-modules/wiki/Developer-Guide'>https://github.com/OneBusAway/onebusaway-application-modules/wiki/Developer-Guide</a></div>
    <div><strong>Last updated</strong>: October 2021</div>
</div>

This guide is designed to get you up and running with the OneBusAway application suite source code as quickly as possible.  For more general documentation on OneBusAway development, including details about contributing changes, code-style, and other details, check out the [Contribution Guide](https://github.com/OneBusAway/onebusaway/wiki/Developer-Guide).

If you don't want to dig into the code, but just want to get a demo instance up quickly, checkout the [Quickstart Guide](https://github.com/OneBusAway/onebusaway-application-modules/wiki/OneBusAway-Quickstart-Guide).

***EDIT October 13, 2021***

OneBusAway has upgraded to v2.0:
* v2 examples - [Puget Sound](http://pugetsound.onebusaway.org), [WMATA in Washington, D.C.](http://buseta.wmata.com/) and [HART in Tampa, FL](https://tampa.onebusaway.org/)

The below developer guide applied to v1.x of OneBusAway, which is now outdated. Components like the web interface may not work using v1.

The master branch is now at v2, and you should look at an [early version of an updated Developer Guide for v2.0](https://github.com/OneBusAway/onebusaway-application-modules/wiki/Enterprise-Webapp-Configuration) if you're trying to build the master branch.

## Getting the Source and Importing it into Eclipse

This tutorial was tested using Eclipse IDE for Java EE Developers Juno (4.2) 64-bit and [Kepler Release 2 64 bit Window 7 64 bit](http://www.eclipse.org/downloads/) on Windows 7 64-bit with the most recent release version of all plugins as of early August 2012.

The Git repository for the `onebusaway-application-modules` project is available at:

`https://github.com/OneBusAway/onebusaway-application-modules`

For general instructions on importing the source into Eclipse, check out [Importing Souce Code Into Eclipse](https://github.com/OneBusAway/onebusaway/wiki/Importing-Source-Code-Into-Eclipse).

*(NOTE: OBA 1.1.13 and higher is compatible with both Java 6 and 7, while OBA 1.1.11 and earlier are only compatible with Java 6)*

## Setting up the Webapps

The application suite is actually a series of Java webapps.  For general instructions on setting up a webapp in Eclipse, see [Setting Up a Tomcat Server in Eclipse](https://github.com/OneBusAway/onebusaway/wiki/Setting-Up-a-Tomcat-Server-in-Eclipse).  At a minimum, you'll need to setup two webapps:

1. A transit data webapp: it should include the `onebusaway-transit-data-federation-webapp` module
2. A user-interface webapp: it can include any of the user-interface webapps:
  * `onebusaway-webapp` - the [OBA website](https://github.com/OneBusAway/onebusaway-application-modules/wiki/OneBusAway-Web)
  * `onebusaway-api-webapp` - the [REST API](http://developer.onebusaway.org/modules/onebusaway-application-modules/current/api/where/index.html)
  * `onebusaway-sms-webapp` - the [text-messaging interface](https://github.com/OneBusAway/onebusaway-application-modules/wiki/OneBusAway-Phone-and-SMS)
  * `onebusaway-phone-webapp` - the [interactive voice response (IVR) for phone calls interface](https://github.com/OneBusAway/onebusaway-application-modules/wiki/OneBusAway-Phone-and-SMS)

We suggest you start simple by just deploying the transit data webapp, onebusaway-api-webapp, and onebusaway-webapp, which are detailed in later steps.  If you have problems (likely with Google Web Toolkit, required by the onebusaway-webapp), remove the onebusaway-webapp, and try again with just the transit data webapp and the REST API.

## Building a Transit Data Bundle

A transit data bundle collects all the transit data that is needed to power OneBusAway, bundle into a series of files and optimized data structures.

At a minimum, you need a GTFS feed of static schedule data for your target transit agency.  You can use [MBTA's GTFS data](https://www.mbta.com/developers/gtfs) for this example deployment (MBTA also has a [MBTA GTFS-realtime](https://www.mbta.com/developers/gtfs-realtime) feed that you can test with later - see the Real-time Data Configuration link at the bottom of this page under "What's Next?").

### Command-line

If you're running from the command-line, you can quickly build a bundle with the following command:

    java -jar /path/to/onebusaway-transit-data-federation-builder.jar org.onebusaway.transit_data_federation.bundle.FederatedTransitDataBundleCreatorMain /path/to/your/GTFS.zip /path/to/your/transit_data_bundle

### or In Eclipse

If you're building from within Eclipse, right-click on the "onebusaway-transit-data-federation-builder" project, then "Run As->Run Configurations."  You'll need to create a new Run Configuration.  To do this, right-click on "Java Application" in the left pane, and click on "New".  Click on the new configuration that appears under the "Java Application Node."  Change the "Name" at the top to "OneBusAway_BundleBuilder".  Set the "Project:" field to `onebusaway-transit-data-federation-builder`, and the "Main class:" field to `org.onebusaway.transit_data_federation.bundle.FederatedTransitDataBundleCreatorMain`.  Click on the "Arguments" tab, and add the following to the "Program Arguments:" field:
~~~
C:\path\to\GTFS\zip\file\google_transit.zip C:\path\to\onebusaway\bundle
~~~
For example, `C:\OneBusAway\MBTA_GTFS\MBTA_GTFS.zip C:\OneBusAway\bundle`.

In the "VM arguments:" field, enter `-Xmx2000m` (if you get stackoverflow error after running this module then try `-Xss6000` instead - notice the option is -Xss and NOT -Xmx), or however much memory you have available on your computer (and need to build your transit bundle based on the size of your GTFS dataset).

Click on "Apply", and then "Run" to start building your bundle.

Note: my city almost always has bad gtfs data and that gave a major headache troubleshooting the configuration, hence this process always fails for me, if in the same circumstance i recommend you to try with Tampa a small and good set of gtfs http://www.gohart.org/developers/

### Common problems building bundle

If you get a "InvalidStopToShapeMappingException" during graph building, there are likely issues with your GTFS data.  See the [Stop to Shape Matching page](https://github.com/OneBusAway/onebusaway-application-modules/wiki/Stop-to-Shape-Matching) for help.

See the [Transit Data Bundle Guide](https://github.com/OneBusAway/onebusaway-application-modules/wiki/Transit-Data-Bundle-Guide) for further details on bundle building.

## Choosing a Database

By default, OneBusAway supports an embedded HSQLDB instance for building transit data bundles and persisting user data.  HSQLDB works well for OneBusAway demos.  However, it is recommended that you use a more full-featured database for managing your persistent application data in a production deployment of OneBusAway.

If you keep the embedded HSQLDB, note:
* You CANNOT use the same bundle directory for all the webapp projects.  Therefore, you'll need to copy your bundle directory into new directories, with only ONE directory per webapp.  At the end of this step, if you're deploying the transit-data-federation webapp, the api-webapp, and the normal webapp, you should have three bundle directories with identical contents (e.g., C:\oba\bundle_fed, C:\oba\bundle_api, and C:\oba\bundle_webapp).  You'll need to reference each unique directory in each of the data-sources.xml files specified in the following sections.  We also suggest you keep a copy of the bundle in a separate location as a backup (e.g., C:\oba\bundle_backup), in case you need to start over with a fresh bundle due to a corrupted bundle error.

If you do choose a different database, note:

  * Make sure the JDBC adapter jar for your database is on your classpath and that you've set the appropriate Hibernate dialect.

See [Database Setup and Configuration Guide](../database-configuration-guide) for more details.

## Setting up a Tomcat server in Eclipse

See the [Setting Up A Tomcat Server In Eclipse setup guide](https://github.com/OneBusAway/onebusaway/wiki/Setting-Up-a-Tomcat-Server-in-Eclipse).  You will need one server instance called `onebusaway` and it will need the following webapp modules:

  * `onebusaway-transit-data-federation-webapp`
  * `onebusaway-api-webapp`
  * `onebusaway-webapp`

## Configuring onebusaway-transit-data-federation-webapp

You'll need to create the following file:

    onebusaway-transit-data-federation-webapp/src/main/resources/data-sources.xml

Here is an example file to get you started:

    <?xml version="1.0" encoding="UTF-8"?>
    <beans xmlns="http://www.springframework.org/schema/beans" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
    xmlns:context="http://www.springframework.org/schema/context"
    xsi:schemaLocation="
        http://www.springframework.org/schema/beans http://www.springframework.org/schema/beans/spring-beans-3.0.xsd
        http://www.springframework.org/schema/context http://www.springframework.org/schema/context/spring-context-3.0.xsd">

    <!-- Database Connection Configuration - used by the other webapps to retrieve transit data-->
    <bean id="dataSource" class="org.springframework.jdbc.datasource.DriverManagerDataSource">
        <property name="driverClassName" value="org.hsqldb.jdbcDriver" />
        <property name="url" value="jdbc:hsqldb:file:/path/to/your/transit_data_bundle/org_onebusaway_database" />
        <property name="username" value="sa" />
        <property name="password" value="" />
    </bean>

    <alias name="dataSource" alias="mutableDataSource" />

    <bean class="org.onebusaway.container.spring.SystemPropertyOverrideConfigurer">
        <property name="order" value="-2" />
        <property name="properties">
            <props>
                <prop key="bundlePath">/path/to/your/transit_data_bundle</prop>
            </props>
        </property>
    </bean>

    <!-- Tells ehCache to use a different name for the cache (to avoid conflicting with other onebusaway webapps)  -->
    <bean class="org.onebusaway.container.spring.PropertyOverrideConfigurer">
        <property name="properties">
            <props>
                <prop key="cacheManager.cacheManagerName">org.onebusaway.transit_data_federation_webapp.cacheManager</prop>
            </props>
        </property>
    </bean>

    <!-- You can add real-time transit data config info here later.  See https://github.com/OneBusAway/onebusaway-application-modules/wiki/Real-Time-Data-Configuration-Guide for instructions  -->

    </beans>

Be sure to change path/to/your/transit_data_bundle to the path to your transit bundle on your computer.  For example, if the bundle is in "C:\oba\bundle_fed", the dataSource url value would read `jdbc:hsqldb:file:/oba/bundle_fed/org_onebusaway_database` and the bundlePath prop key would be `/oba/bundle` (this is the original bundle that you created with onebusaway-transit-data-federation-builder module).  Remember that if you're using the embedded HSQLDB, you can only have one webapp per bundle directory.

## Configuring onebusaway-api-webapp

You'll need to create the following file:

    onebusaway-api-webapp/src/main/resources/data-sources.xml


Here is an example file to get you started:

    <?xml version="1.0" encoding="UTF-8"?>
    <beans xmlns="http://www.springframework.org/schema/beans" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
    xmlns:context="http://www.springframework.org/schema/context"
    xsi:schemaLocation="
        http://www.springframework.org/schema/beans http://www.springframework.org/schema/beans/spring-beans-3.0.xsd
        http://www.springframework.org/schema/context http://www.springframework.org/schema/context/spring-context-3.0.xsd">

    <!-- Specify our transit data source (from the onebusaway-transit-data-federation-webapp)-->
    <bean id="transitDataService" class="org.springframework.remoting.caucho.HessianProxyFactoryBean">
        <property name="serviceUrl"
            value="http://localhost:8080/onebusaway-transit-data-federation-webapp/remoting/transit-data-service" />
        <property name="serviceInterface" value="org.onebusaway.transit_data.services.TransitDataService" />
    </bean>

    <!-- Database Connection Configuration - Used to manage user account information.
    (NOTE: It's recommended to use a stand-alone DBMS instead of embedded HSQLDB for a production instance
    -->
    <bean id="dataSource" class="org.springframework.jdbc.datasource.DriverManagerDataSource">
        <property name="driverClassName" value="org.hsqldb.jdbcDriver" />
        <property name="url" value="jdbc:hsqldb:file:/path/to/your/transit_data_bundle/org_onebusaway_database" />
        <property name="username" value="sa" />
        <property name="password" value="" />
    </bean>

    <bean id="externalGeocoderImpl" class="org.onebusaway.geocoder.impl.FixedGeocoderImpl">
        <property name="lat" value="42.345" />
        <property name="lon" value="-71.083" />
        <property name="city" value="Boston" />
        <property name="state" value="MA" />
        <property name="postalCode" value="02116" />
    </bean>

    <!-- Service that is used to verify API keys -->
    <bean id="apiKeyValidationService" class="org.onebusaway.users.impl.validation.KeyValidationServiceImpl" />

    <!-- Allows the TEST key for OBA API testing.  Should be removed in production -->
    <bean class="org.onebusaway.users.impl.CreateApiKeyAction">
        <property name="key" value="TEST"/>
    </bean>

    <!-- iOS Client key -->
    <bean class="org.onebusaway.users.impl.CreateApiKeyAction">
        <property name="key" value="org.onebusaway.iphone"/>
    </bean>

    <!-- Android Client key -->
    <bean class="org.onebusaway.users.impl.CreateApiKeyAction">
        <property name="key" value="v1_BktoDJ2gJlu6nLM6LsT9H8IUbWc=cGF1bGN3YXR0c0BnbWFpbC5jb20="/>
    </bean>

    <!-- Windows Phone Client key -->
    <bean class="org.onebusaway.users.impl.CreateApiKeyAction">
        <property name="key" value="v1_C5+aiesgg8DxpmG1yS2F/pj2zHk=c3BoZW5yeUBnbWFpbC5jb20=="/>
    </bean>

    <!-- Windows 8 Client key -->
    <bean class="org.onebusaway.users.impl.CreateApiKeyAction">
        <property name="key" value="693c0a55-9ef0-4302-8bc3-f9b2db93e124"/>
    </bean>

    <!-- Alexa Skill key -->
    <bean class="org.onebusaway.users.impl.CreateApiKeyAction">
        <property name="key" value="e5c0e97a-729d-4fdb-a3ca-2fccb20ac3ab"/>
    </bean>

    <!-- Pebble Smartwatch key -->
    <bean class="org.onebusaway.users.impl.CreateApiKeyAction">
        <property name="key" value="48d59e79-ed33-4be0-9db3-912f8f521fec"/>
    </bean>

    <!-- Tells ehCache to use a different name for the cache (to avoid conflicting with other onebusaway webapps)  -->
    <bean class="org.onebusaway.container.spring.PropertyOverrideConfigurer">
      <property name="properties">
        <props>
          <prop key="cacheManager.cacheManagerName">org.onebusaway.api_webapp.cacheManager</prop>
        </props>
      </property>
    </bean>

    </beans>

Be sure to change path/to/your/transit_data_bundle to the path to your transit bundle on your computer.  For example, if the bundle is in "C:\oba\bundle_api", the dataSource url value would read `jdbc:hsqldb:file:/oba/bundle_api/org_onebusaway_database`.  Also, make sure the port number in the transitDataService serviceUrl value is set to the port number that your `onebusaway-transit-data-federation-webapp` is deployed to.  Remember that if you're using the embedded HSQLDB, you can only have one webapp per bundle directory.

## Configuring onebusaway-webapp

You'll need to create the following file:

    onebusaway-webapp/src/main/resources/data-sources.xml

Here is an example file to get you started:

    <?xml version="1.0" encoding="UTF-8"?>
    <beans xmlns="http://www.springframework.org/schema/beans" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
    xmlns:context="http://www.springframework.org/schema/context"
    xsi:schemaLocation="
        http://www.springframework.org/schema/beans http://www.springframework.org/schema/beans/spring-beans-3.0.xsd
        http://www.springframework.org/schema/context http://www.springframework.org/schema/context/spring-context-3.0.xsd">

    <bean id="transitDataService" class="org.springframework.remoting.caucho.HessianProxyFactoryBean">
        <property name="serviceUrl"
            value="http://localhost:8080/onebusaway-transit-data-federation-webapp/remoting/transit-data-service" />
        <property name="serviceInterface" value="org.onebusaway.transit_data.services.TransitDataService" />
    </bean>

    <!-- Database Connection Configuration -->
    <bean id="dataSource" class="org.springframework.jdbc.datasource.DriverManagerDataSource">
        <property name="driverClassName" value="org.hsqldb.jdbcDriver" />
        <property name="url" value="jdbc:hsqldb:file:/path/to/your/transit_data_bundle/org_onebusaway_database" />
        <property name="username" value="sa" />
        <property name="password" value="" />
    </bean>

    <!--
        The Geocoder is used in the SMS interface for determining your default search location. The DefaultGeocoderImpl doesn't actually do much geocoding... it's just there for testing
    -->
    <bean id="externalGeocoderImpl" class="org.onebusaway.geocoder.impl.FixedGeocoderImpl">
        <property name="lat" value="42.345" />
        <property name="lon" value="-71.083" />
        <property name="city" value="Boston" />
        <property name="state" value="MA" />
        <property name="postalCode" value="02116" />
    </bean>

    <bean id="serviceAreaServiceImpl" class="org.onebusaway.presentation.impl.ServiceAreaServiceImpl">
        <property name="defaultBounds">
          <bean class="org.onebusaway.geospatial.model.CoordinateBounds">
            <property name="minLat" value="42.237" />
            <property name="minLon" value="-71.247" />
            <property name="maxLat" value="42.452" />
            <property name="maxLon" value="-70.945" />
          </bean>
        </property>
        <property name="calculateDefaultBoundsFromAgencyCoverage" value="false" />
    </bean>

    <bean id="wikiDocumentService" class="org.onebusaway.wiki.xwiki.impl.XWikiDocumentServiceImpl">
        <property name="xwikiUrl" value="http://wiki.onebusaway.org" />
    </bean>

    <bean id="wikiRenderingService" class="org.onebusaway.wiki.xwiki.impl.XWikiRenderingServiceImpl">
        <property name="wikiDocumentViewUrl" value="/onebusaway-webapp/p/%{documentName}.action" />
        <property name="wikiDocumentEditUrl" value="http://wiki.onebusaway.org/bin/edit/Main/%{documentName}" />
        <property name="wikiAttachmentUrl" value="http://wiki.onebusaway.org/bin/download/Main/%{documentName}/%{attachmentName}" />
    </bean>

    <!-- Tells ehCache to use a different name for the cache (to avoid conflicting with other onebusaway webapps)  -->
    <bean class="org.onebusaway.container.spring.PropertyOverrideConfigurer">
      <property name="properties">
        <props>
          <prop key="cacheManager.cacheManagerName">org.onebusaway.webapp.cacheManager</prop>
        </props>
      </property>
    </bean>

    </beans>

Be sure to change path/to/your/transit_data_bundle to the path to your transit bundle on your computer.  For example, if the bundle is in "C:\oba\bundle_webapp", the dataSource url value would read `jdbc:hsqldb:file:/oba/bundle_webapp/org_onebusaway_database`.  Also, make sure the port number in the transitDataService serviceUrl value is set to the port number that your `onebusaway-transit-data-federation-webapp` is deployed to.  Remember that if you're using the embedded HSQLDB, you can only have one webapp per bundle directory.

### onebusaway-webapp Google Web Toolkit configuration

Before you can deploy the OneBusAway webapp for the main OneBusAway web page interface, you need to do some additional configuration for the [Google Web Toolkit (GWT)](https://developers.google.com/web-toolkit/).  GWT is used to build and optimize complex browser-based applications from Java code.  Therefore, you need to generate the OBA webapp JavaScript using GWT.

*GWT can be difficult to configure/use - if you're new to GWT, we suggest getting onebusaway-transit-data-federation-webapp and onebusaway-api-webapp configured and up and running first.  Once those are working, then try setting up the onebusaway-webapp project.*

**Note**:  You'll need the Google Plugins for Eclipse and the GWT SDK for this, which you can install from [here](https://developers.google.com/eclipse/docs/getting_started).  Make sure you download the version that matches your Eclipse version.  When installing in Eclipse, make sure you install the "Google Plugin for Eclipse", the "GWT Designer for GPE", and the "SDKs->Google Web Toolkit".

To compile the GWT sources, go to the command line and go to the **root** `onebusaway-application-modules` parent module (i.e., **NOT** the webapp project).  Note that you'll need [Maven](http://maven.apache.org/) installed and configured to be executable from the command line.  Then, execute the following:

    mvn -am -pl onebusaway-webapp package

This will compile and package the GWT modules in the `onebusaway-webapp/target/gwt` directory.

Once compiled, you need to copy the GWT output into your deployed webapp.  There is a helper Java class in the onebusaway-presentation project that will examine the `onebusaway-webapp/pom.xml` and copy the GWT resources into the deployed webapp:

    org.onebusaway.presentation.impl.CopyCompiledGwtResourcesMain

This application takes a single argument, which is the path to your deployed onebusaway-webapp.

Before we set up a "Run Configuration" to run this helper application, you need to find the path to your deployed onebusaway-webapp in Eclipse.  This will look something like:

    /Users/bdferris/oba/apache-tomcat-config/onebusaway-webapp/wtpwebapps/onebusaway-webapp

You can find the path to your deployed webapp in Eclipse by double-clicking on your server in your "Servers" tab where you deploy your apps, and this will open the server configuration window.  Click on "Open launch configuration," and then click on the "Arguments" tab.  Under VM arguments, find the "-Dwtp.deploy" argument and copy the following string, which will look something like:

    D:\Eclipse_Juno\.metadata\.plugins\org.eclipse.wst.server.core\tmp1\wtpwebapps

Then, just add "onebusaway-webapp" to the end, so you have the full path:

    D:\Eclipse_Juno\.metadata\.plugins\org.eclipse.wst.server.core\tmp1\wtpwebapps\onebusaway-webapp

Copy this path, since you'll need it when setting up the "Run Configuration" below.

Now, you can set set up a new "Run Configuration" in Eclipse:

  1. Click on "Run->Run Configurations..."
  2. Right-click on the "Java Application" node in the left column, and click "New".
  3. In the "Name:" field, enter `CopyCompiledGwtResources`.
  4. On the "Main" tab, in the "Project:" field enter `onebusaway-webapp` and in the "Main class:" field enter `org.onebusaway.presentation.impl.CopyCompiledGwtResourcesMain`.
  5. On the "Arguments:" tab, in the "Program Arguments:" field enter the full path to your deployed webapp, which you found earlier (e.g., `D:\Eclipse_Juno\.metadata\.plugins\org.eclipse.wst.server.core\tmp1\wtpwebapps\onebusaway-webapp`)

Click "Apply", and then "Run".  In the console window, you should see the helper application copying the GWT output to the deployed onebusaway-webapp location.  Make sure you wait for the copy to **fully complete** (it will say `<terminated>` at the top of the console window in Eclipse when its done) before exporting a WAR file, otherwise you may end up with a partially complete web app!

#### Important General OBA & GWT notes
* If you edit any of the GWT content, or clean the onebusaway-webapp project, you'll need to run both the mvn command as well as the helper copy app to regenerate and update the output in the server deploy directory.
* Check out the [Webapp Config. Guide](https://github.com/OneBusAway/onebusaway-application-modules/wiki/Webapp-Configuration-Guide) which includes more info on developing and debugging with OBA and GWT.

## Running the OBA apps in a web server

Hopefully you've now got a Tomcat instance called `onebusaway` that includes the following three webapp modules:

  * `onebusaway-transit-data-federation-webapp`
  * `onebusaway-api-webapp`
  * `onebusaway-webapp`

**Note** - If you're not using Tomcat, note that there are some [known issues](https://groups.google.com/forum/#!topic/onebusaway-developers/PhL01aGUu0M) with running on Jetty or WebSphere on Java 7.

To test the main webapp (i.e., `onebusaway-webapp`), start up the Tomcat instance within Eclipse and use your favorite Internet browser to visit:

    http://localhost:8080/onebusaway-webapp/

If this is the first visit to that page, you'll be prompted to create an admin user.  Do this, and then login with your newly created user.  Then, return to `http://localhost:8080/onebusaway-webapp/` to see the OneBusAway homepage.

To test the REST API (i.e., `onebusaway-api-webapp`), make sure the Tomcat instance is started and enter:
~~~
http://localhost:8080/onebusaway-api-webapp/api/where/agencies-with-coverage.xml?key=TEST
~~~

You should see a list of the supported agencies (based on the GTFS data you used to build the bundle) in XML format.

## Deploying the OBA apps in Tomcat web server (Windows)
* As mentioned above https://github.com/OneBusAway/onebusaway-application-modules/wiki/Developer-Guide#setting-up-the-webapps. You need at least `onebusaway-transit-data-federation-webapp` and `onebusaway-webapp` or `onebusaway-api-webapp`.
* So go to your Eclipse workspace and copy the 2 .war files - I use Windows explorer to navigate, for example here on my machine and Eclipse environment: `C:\Program2\onebusaway-application-modules\onebusaway-webapp\target\onebusaway-webapp.war` and `C:\Program2\onebusaway-application-modules\onebusaway-transit-data-federation-webapp\target\onebusaway-transit-data-federation-webapp.war`.
* Copy/deploy these 2 war files to your tomcat web application server (I use tomcat 7). Do not start tomcat YET.
* You need to copy data bundle (You created them in this step https://github.com/OneBusAway/onebusaway-application-modules/wiki/Developer-Guide#in-eclipse). Copy the data bundle on server (this is for embedded HSQLDB) to the exact same path as in the development, if the path and folder is not existing on the server create them. My paths look like this: `C:\Program2\gtfs\bundle`, `C:\Program2\gtfs\bundle_api`, `C:\Program2\gtfs\bundle_fed`, `C:\Program2\gtfs\bundle_webapp`
* Now you can start tomcat and allow it time to load. Then try out these links mine look like this: `http://10.17.10.10:8080/onebusaway-webapp/where/sign/stop.action?id=Calgary+Transit_5697` or `http://10.17.10.10:8080/onebusaway-webapp/where/standard/`
* If you run into issues check your tomcat log files mine is here `C:\Program2\apache-tomcat-7.0.47\logs`, I think it is mostly because of memory issues with tomcat or Java environment variables/version and JAVA OPTIONS. I use Tomcat 7.0.47 and Java JDK 7.0.45. To set you tomcat memory  OPTIONS you can look on line here http://stackoverflow.com/questions/17147117/in-which-file-tomcat-java-memory-options-are-saved or Java environment and OPTIONS try this link http://stackoverflow.com/questions/2619584/how-to-set-java-home-on-windows-7. Or post your question here for help https://groups.google.com/forum/#!forum/onebusaway-developers.

## Linux Hints and Tips

- Work in progress, see:

    https://github.com/OneBusAway/onebusaway-application-modules/wiki/Linux-Hints-and-Tips


## What's Next?

Add real-time data:
* [Real-time Data Configuration page](https://github.com/OneBusAway/onebusaway-application-modules/wiki/Real-Time-Data-Configuration-Guide) - Info on configuring OneBusAway to use real-time transit data.

Check out the following additional developer resources for the API and webapp projects:
* [OBA Architecture](https://github.com/OneBusAway/onebusaway-application-modules/wiki/Architecture) - A high-level overview of the current OBA architecture design.
* [Transit Data Bundle Guide](https://github.com/OneBusAway/onebusaway-application-modules/wiki/Transit-Data-Bundle-Guide) - More info about building a transit data bundle from static GTFS data.
* [API Webapp Configuration Guide](https://github.com/OneBusAway/onebusaway-application-modules/wiki/API-Webapp-Configuration-Guide) - More info on setting up the OneBusAway REST API webapp.
* [Webapp Configuration Guide](https://github.com/OneBusAway/onebusaway-application-modules/wiki/Webapp-Configuration-Guide) - More info on setting up the OneBusAway Webapp for the main website, including Google Web Toolkit (GWT) setup and debugging.
* [Database Configuration Guide](https://github.com/OneBusAway/onebusaway-application-modules/wiki/Database-Guide) - Info on using different types of database management systems with OneBusAway.
* [Wiki Configuration Guide](https://github.com/OneBusAway/onebusaway/wiki/Wiki-Integration) - Information on how to configure the OneBusAway integrated wiki.
* [REST API Documentation](../../api/where) - Info on all the API calls that are supported by the `onebusaway-api-webapp`.
* [GTFS Maintenance] (https://github.com/OneBusAway/onebusaway-application-modules/wiki/Maintenance) - Information on how to handle GTFS updates

And check out the other ways to share OneBusAway info via SMS and Phone IVR webapps:
* [Phone IVR Configuration Guide](https://github.com/OneBusAway/onebusaway-application-modules/wiki/Phone-Service-Configuration-Guide) - More information on how to configure the OneBusAway Phone webapp that uses an interactive-voice-response (IVR) interface.
* [SMS Configuration Guide](https://github.com/OneBusAway/onebusaway-application-modules/wiki/SMS-Configuration-Guide) - Information on how to configure the OneBusAway SMS webapp.

Want to create a mobile app for OneBusAway?
* [Mobile App Design Considerations](https://github.com/OneBusAway/onebusaway-application-modules/wiki/Mobile-App-Design-Considerations)

Make your OneBusAway server part of the larger OneBusAway community, including easy access for riders to the mobile apps, by becoming part of the Multi-Region architecture:
* [Multi-Region](https://github.com/OneBusAway/onebusaway/wiki/Multi-Region)

## Troubleshooting

Having problems?  Check out our [Troubleshooting page](https://github.com/OneBusAway/onebusaway/wiki/Troubleshooting) to see if we have a known solution.

If you're building on Linux, you may want to check out the [OneBusAway Linux Developer Guide](https://github.com/OneBusAway/onebusaway-application-modules/wiki/Developer-Guide-In-Progress)
