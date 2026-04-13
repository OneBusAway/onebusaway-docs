---
title: Configuration and Deployment Guide for v2.x
layout: page
---

**NOTE**: Unless you have a specific reason to set up OneBusAway manually, we strongly recommend using the [official Docker image](/guides/deployment) instead. It is easier to install, maintain, and is actively supported.

This guide is designed to provide a comprehensive deployment method for users who wish to set up a simple OneBusAway application with minimal configurations. It is primarily intended for use cases that would need to be more permanent than just using the quick start version of OneBusAway. Unlike quick start, this solution boots with the server automatically with no additional configuration required.

## Note on Software Versions

When using this guide, be certain to use the exact same versions of all software mentioned here. Any discrepancies between this guide and your actual installation will more than likely result in complicated errors and, ultimately, failure. Follow the instructions exactly and there should be no issues.

## Server Minimum Requirements

The minimum system requirements for your server depend on the size of the transit agency that the deployment is for. Failure to select a server with sufficient processing power and, more importantly, memory, will result in the Tomcat service, or the server itself needing a reboot several times a day. This guide is written for a small to medium sized municipal transit agency, with about 64 routes, 317 vehicles and 2414 stops. For this deployment I am using a virtual server with 2.0 GHz of processor power and 2048 MB of memory.

## Server Operating System

This guide assumes the end user already knows how to set up a server (virtual or dedicated) using the Ubuntu 22.04 LTS operating system. We need to start with a clean installation of Ubuntu 22.04 with no extra anything, not even the desktop environment.

When setting up Ubuntu 22.04 using the installer, be certain not to install any additional components except for the SSH server and standard system utilities. You can likely get away with including more on the server but this guide is written with a clean, lightweight server environment in mind and making your server the same will help ensure success. Also, the less that is running on the server, the more resources available for OneBusAway.

You will need access to the root user to follow this guide. All commands are executed as the root user.

## Installing Required Software

Before performing these steps, make sure Ubuntu's software repository is up to date. To do this, run this command:

`apt-get update`

Using Ubuntu 22.04, the following software must be installed:

### OpenJDK 11

This is the open source version of the Java 11 JDK. To install it run the following command:

`apt-get install openjdk-11-jdk`

### Tomcat 9

This software is used to serve the OneBusAway web application. To install it run the following command:

`apt-get install tomcat9`

### MySQL Server

The MySQL Server is used to store OneBusAway user data and API keys. To install it, run the following commands:

    apt-get install mysql-server

After installation, run the following to set the root password manually, as newer versions of MySQL no longer prompt you to set one during install:

    mysql -u root

Once in the MySQL shell, run:

    ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY 'your_root_password';
    FLUSH PRIVILEGES;
    EXIT;

Replace **your_root_password** with a secure password of your choice. Take note of this password as it will be needed later.

## Configure Tomcat to use More Memory

By default Tomcat uses a very small amount of memory. Usually this is not enough memory to run OneBusAway. To fix this run the following command:

`nano /etc/default/tomcat9`

Change the line that says `-Djava.awt.headless=true` to `JAVA_OPTS="-Djava.awt.headless=true -Xss4m -Xmx2g"`

Note the **Xmx** variable. This variable is used to indicate to Tomcat exactly how much memory it is allowed to use. You may need to tweak this variable dependent on the size of the transit agency.
Also note the **Xss** variable. This variable is used to indicate to Tomcat the maximum stack size it is allowed to have. You may also need to tweak this variable dependent on the size of the transit agency.

## Acquiring the Binaries

Now that all of the required supporting software is installed, we must either download the binaries from OneBusAway or we must compile and build the binaries from the source code.

### Compile and Build the Binaries

It is recommended that you **do not** attempt to compile and build the binaries if you are not going to make any changes to OneBusAway's source code. If you just want to install it, skip this and proceed to the Download the Binaries step.

If you are keen to make changes to the source code of OBA, please see the [Enterprise Webapp Configuration](https://github.com/OneBusAway/onebusaway-application-modules/wiki/Enterprise-Webapp-Configuration).

**Please note:** If you build the binaries instead of downloading them, the paths in the remaining commands in this guide may vary from the actual locations of the built binaries. You will need to adjust the paths in the commands accordingly.

### Download the Binaries

You can download pre-compiled binaries for OneBusAway from the [Downloads](/downloads) page.  Make sure to download the *onebusaway-transit-data-federation-webapp*, *onebusaway-api-webapp* and *onebusaway-enterprise-acta-webapp* files from the same version build.  **Note:** Some versions of OBA may not be compatible with all versions of Tomcat and Java. If you encounter issues, check the release notes for the version you are using.

To download the current version (`2.5.12-cs`), run the following commands.  If a newer version is available on the [Downloads](/downloads) page, replace `2.5.12-cs` with the latest version number throughout this guide.

    mkdir /oba
    cd /oba
    wget https://repo.camsys-apps.com/releases/org/onebusaway/onebusaway-transit-data-federation-builder/2.5.12-cs/onebusaway-transit-data-federation-builder-2.5.12-cs-withAllDependencies.jar
    wget https://repo.camsys-apps.com/releases/org/onebusaway/onebusaway-transit-data-federation-webapp/2.5.12-cs/onebusaway-transit-data-federation-webapp-2.5.12-cs.war
    wget https://repo.camsys-apps.com/releases/org/onebusaway/onebusaway-api-webapp/2.5.12-cs/onebusaway-api-webapp-2.5.12-cs.war
    wget https://repo.camsys-apps.com/releases/org/onebusaway/onebusaway-enterprise-acta-webapp/2.5.12-cs/onebusaway-enterprise-acta-webapp-2.5.12-cs.war

## Download the Transit GTFS Data From the Transit Agency

Next we need to download the GTFS Data from the transit agency. With this data we can build the Transit Data Bundle that OneBusAway will use as a data source. To do this run the following commands in sequence:

    mkdir /oba/gtfs
    cd /oba/gtfs
    wget http://transitagency.example.com/gtfs.zip

In the proceeding command, replace **http://transitagency.example.com/gtfs.zip** with the full URL of the GTFS from your respective transit agency. Take note of the actual file name being downloaded, as it will be needed later.

## Build the Transit Data Bundle

Now it is time to build the Transit Data Bundle that OneBusAway will use to display route and schedule information. To do this run the following command:

    cd /oba/gtfs
    java -jar -Xss4m -Xmx1g \
      /oba/onebusaway-transit-data-federation-builder-2.5.12-cs-withAllDependencies.jar \
      /oba/gtfs/gtfs.zip \
      /oba/gtfs

In the above command, replace **gtfs.zip** with the name of the GTFS data file that was downloaded earlier. The extension of the file should end with **.zip**. This process will take a while to run. When it is complete you should see "Shutting down EHCache CacheManager" with no major errors before it.

When executing this particular script, you must run it from within the /oba/gtfs directory because it puts the built files in the current active directory of the command line. To avoid this problem, be certain to execute all of the commands in this step.

## Download the MySQL Connector Java Library

Next we need the MySQL Connector Java Library. This will allow OneBusAway to use the MySQL database. To do this, run the following commands in sequence:

    cd /oba
    wget https://dev.mysql.com/get/Downloads/Connector-J/mysql-connector-j-8.3.0.tar.gz
    tar -zxvf mysql-connector-j-8.3.0.tar.gz
    mv mysql-connector-j-8.3.0/mysql-connector-j-8.3.0.jar .
    rm -rf mysql-connector-j-8.3.0.tar.gz
    rm -rf mysql-connector-j-8.3.0

## Create the MySQL Database

Now we are going to create the database that OneBusAway will use to store user and API data. To do this run the following command:

    mysql -p -e "CREATE DATABASE oba; GRANT ALL PRIVILEGES ON oba.* TO 'oba'@'localhost' IDENTIFIED BY 'newPassword';"

In the above commands, replace **newPassword** with something secure. This will be the password for the MySQL user oba who will only have access to the database oba. When prompted for a password, enter the root password you set earlier.

## Stop the Tomcat 9 Service

To prepare for deployment, we need to stop the Tomcat 9 service. To do this run the following command:

`service tomcat9 stop`

## Deploy and Configure the OneBusAway Transit Data Federation Webapp

### Copy The Files

    mkdir /var/lib/tomcat9/webapps/onebusaway-transit-data-federation-webapp
    cd /var/lib/tomcat9/webapps/onebusaway-transit-data-federation-webapp
    mv /oba/onebusaway-transit-data-federation-webapp-2.5.12-cs.war /var/lib/tomcat9/webapps/onebusaway-transit-data-federation-webapp
    jar xvf /var/lib/tomcat9/webapps/onebusaway-transit-data-federation-webapp/onebusaway-transit-data-federation-webapp-2.5.12-cs.war
    rm -rf /var/lib/tomcat9/webapps/onebusaway-transit-data-federation-webapp/onebusaway-transit-data-federation-webapp-2.5.12-cs.war

### Copy the MySQL Driver

    cd /var/lib/tomcat9/webapps/onebusaway-transit-data-federation-webapp/WEB-INF/lib
    cp /oba/mysql-connector-j-8.3.0.jar .

### Configure the OneBusAway Transit Data Federation Webapp

`nano /var/lib/tomcat9/webapps/onebusaway-transit-data-federation-webapp/WEB-INF/classes/data-sources.xml`

Using the editor, clear out the contents of this file and replace it with:

    <?xml version="1.0" encoding="UTF-8"?>
    <beans xmlns="http://www.springframework.org/schema/beans" xmlns:context="http://www.springframework.org/schema/context" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:schemaLocation="http://www.springframework.org/schema/beans http://www.springframework.org/schema/beans/spring-beans-2.5.xsd http://www.springframework.org/schema/context http://www.springframework.org/schema/context/spring-context-2.5.xsd">
      <bean id="dataSource" class="org.springframework.jdbc.datasource.DriverManagerDataSource">
        <property name="driverClassName" value="com.mysql.cj.jdbc.Driver" />
        <property name="url" value="jdbc:mysql://127.0.0.1/oba?characterEncoding=UTF-8" />
        <property name="username" value="oba" />
        <property name="password" value="newPassword" />
      </bean>
      <bean class="org.onebusaway.container.spring.SystemPropertyOverrideConfigurer">
        <property name="order" value="-2" />
        <property name="properties">
          <props>
            <!-- this property is deprecated, use bundleStoreRoot now -->
            <prop key="bundlePath">/oba/gtfs</prop>
          </props>
        </property>
      </bean>
      <bean class="org.onebusaway.transit_data_federation.impl.realtime.gtfs_realtime.GtfsRealtimeSource">
        <property name="tripUpdatesUrl" value="http://transitagency.example.com/realtime/TripUpdate/TripUpdates.pb" />
        <property name="vehiclePositionsUrl" value="http://transitagency.example.com/realtime/Vehicle/VehiclePositions.pb" />
        <property name="alertsUrl" value="http://transitagency.example.com/realtime/Alert/Alerts.pb" />
        <property name="refreshInterval" value="10" />
        <property name="agencyId" value="MyAgency" />
      </bean>
      <bean id="httpServiceClient" class="org.onebusaway.transit_data_federation.util.HttpServiceClientImpl">
        <constructor-arg type="java.lang.String" value="localhost"/>
        <constructor-arg type="java.lang.Integer" value="8080" />
        <constructor-arg type="java.lang.String" value="/onebusaway-admin-webapp/api/" />
      </bean>
      <bean id="bundleManagementService" class="org.onebusaway.transit_data_federation.impl.bundle.BundleManagementServiceImpl">
        <property name="bundleStoreRoot" value="/oba/gtfs" />
        <property name="standaloneMode" value="true" />
      </bean>
    </beans>

In the above XML code you will need to replace newPassword in the SQL settings with the password you chose for the oba user. You will also need to set the URLs of the GTFS real-time data feeds to that of your transit agency. Next, set an ID for the transit agency by replacing MyAgency.

## Deploy and Configure the OneBusAway API Webapp

### Copy The Files

    mkdir /var/lib/tomcat9/webapps/onebusaway-api-webapp
    cd /var/lib/tomcat9/webapps/onebusaway-api-webapp
    mv /oba/onebusaway-api-webapp-2.5.12-cs.war /var/lib/tomcat9/webapps/onebusaway-api-webapp/
    jar xvf /var/lib/tomcat9/webapps/onebusaway-api-webapp/onebusaway-api-webapp-2.5.12-cs.war
    rm -rf /var/lib/tomcat9/webapps/onebusaway-api-webapp/onebusaway-api-webapp-2.5.12-cs.war

### Copy the MySQL Driver

    cd /var/lib/tomcat9/webapps/onebusaway-api-webapp/WEB-INF/lib
    cp /oba/mysql-connector-j-8.3.0.jar .

### Configure the OneBusAway API Webapp

`nano /var/lib/tomcat9/webapps/onebusaway-api-webapp/WEB-INF/classes/data-sources.xml`

    <?xml version="1.0" encoding="UTF-8"?>
    <beans xmlns="http://www.springframework.org/schema/beans" xmlns:context="http://www.springframework.org/schema/context" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:schemaLocation="http://www.springframework.org/schema/beans http://www.springframework.org/schema/beans/spring-beans-2.5.xsd http://www.springframework.org/schema/context http://www.springframework.org/schema/context/spring-context-2.5.xsd">
      <!-- Specify our transit data source -->
      <bean id="transitDataService" class="org.springframework.remoting.caucho.HessianProxyFactoryBean">
        <property name="serviceUrl" value="http://localhost:8080/onebusaway-transit-data-federation-webapp/remoting/transit-data-service" />
        <property name="serviceInterface" value="org.onebusaway.transit_data.services.TransitDataService" />
      </bean>
      <bean id="apiKeyValidationService" class="org.onebusaway.users.impl.validation.KeyValidationServiceImpl" />
      <!-- Database Configuration -->
      <bean id="dataSource" class="org.springframework.jdbc.datasource.DriverManagerDataSource">
        <property name="driverClassName" value="com.mysql.cj.jdbc.Driver" />
        <property name="url" value="jdbc:mysql://127.0.0.1/oba?characterEncoding=UTF-8" />
        <property name="username" value="oba" />
        <property name="password" value="newPassword" />
      </bean>
      <bean id="agencyMetadataDataSource" class="org.springframework.jdbc.datasource.DriverManagerDataSource">
        <property name="driverClassName" value="com.mysql.cj.jdbc.Driver" />
        <property name="url" value="jdbc:mysql://127.0.0.1/oba?characterEncoding=UTF-8" />
        <property name="username" value="oba" />
        <property name="password" value="newPassword" />
      </bean>
      <bean id="agencyMetadataSessionFactory" class="org.springframework.orm.hibernate3.annotation.AnnotationSessionFactoryBean">
        <property name="dataSource" ref="agencyMetadataDataSource" />
        <property name="annotatedClasses">
          <list>
            <value>org.onebusaway.agency_metadata.model.AgencyMetadata</value>
            <value>org.onebusaway.agency_metadata.service.AgencyMetadataDaoImpl</value>
          </list>
        </property>
        <property name="hibernateProperties">
          <props>
            <prop key="hibernate.connection.pool_size">1</prop>
            <prop key="hibernate.current_session_context_class">thread</prop>
            <prop key="hibernate.cache.provider_class">org.hibernate.cache.NoCacheProvider</prop>
          </props>
        </property>
      </bean>
      <bean class="org.onebusaway.container.spring.PropertyOverrideConfigurer">
        <property name="properties">
          <props>
            <prop key="cacheManager.cacheManagerName">org.onebusaway.api_webapp.cacheManager</prop>
          </props>
        </property>
      </bean>
      <!-- Allows the TEST key for OBA API testing.  Should be removed in production -->
      <bean class="org.onebusaway.users.impl.CreateApiKeyAction">
        <property name="key" value="TEST"/>
      </bean>
    </beans>

Take note of the second-to-last bean in the XML. This is an API key for testing purposes. It is very important to either change the key or remove it entirely before making your OBA installation live. If you want to allow users to connect to your OBA instance with the various OBA apps, you must include additional beans that have the default API keys for the respective app. You can get the code for these beans from this file before you replace its contents.

Also, in the above XML code you will need to replace newPassword in the SQL settings with the password you chose for the oba user.

## Deploy and Configure the OneBusAway Enterprise ACTA Webapp

### Copy The Files

    rm -rf /var/lib/tomcat9/webapps/ROOT/*
    cd /var/lib/tomcat9/webapps/ROOT
    mv /oba/onebusaway-enterprise-acta-webapp-2.5.12-cs.war /var/lib/tomcat9/webapps/ROOT/
    jar xvf /var/lib/tomcat9/webapps/ROOT/onebusaway-enterprise-acta-webapp-2.5.12-cs.war
    rm -rf /var/lib/tomcat9/webapps/ROOT/onebusaway-enterprise-acta-webapp-2.5.12-cs.war

### Copy the MySQL Driver

    cd /var/lib/tomcat9/webapps/ROOT/WEB-INF/lib
    cp /oba/mysql-connector-j-8.3.0.jar .

### Configure the OneBusAway Enterprise ACTA Webapp

`nano /var/lib/tomcat9/webapps/ROOT/WEB-INF/classes/data-sources.xml`

    <?xml version="1.0" encoding="UTF-8"?>
    <beans xmlns="http://www.springframework.org/schema/beans" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:context="http://www.springframework.org/schema/context" xmlns:aop="http://www.springframework.org/schema/aop" xmlns:jee="http://www.springframework.org/schema/jee" xsi:schemaLocation="http://www.springframework.org/schema/beans http://www.springframework.org/schema/beans/spring-beans-3.0.xsd http://www.springframework.org/schema/context http://www.springframework.org/schema/context/spring-context-3.0.xsd http://www.springframework.org/schema/aop http://www.springframework.org/schema/aop/spring-aop-3.0.xsd http://www.springframework.org/schema/jee http://www.springframework.org/schema/jee/spring-jee-3.0.xsd">
        <!-- Transit Data Service -->
        <bean id="transitDataService" class="org.springframework.remoting.caucho.HessianProxyFactoryBean">
            <property name="serviceUrl" value="http://localhost:8080/onebusaway-transit-data-federation-webapp/remoting/transit-data-service" />
            <property name="serviceInterface" value="org.onebusaway.transit_data.services.TransitDataService" />
        </bean>
        <bean id="configurationServiceClient" class="org.onebusaway.util.impl.configuration.ConfigurationServiceClientFileImpl" >
            <constructor-arg type="java.lang.String" value="/var/lib/obanyc/config.json"/>
        </bean>
        <!-- Database Configuration -->
        <bean id="dataSource" class="org.springframework.jdbc.datasource.DriverManagerDataSource">
            <property name="driverClassName" value="com.mysql.cj.jdbc.Driver" />
            <property name="url" value="jdbc:mysql://127.0.0.1/oba?characterEncoding=UTF-8" />
            <property name="username" value="oba" />
            <property name="password" value="newPassword" />
        </bean>
        <alias name="dataSource" alias="mutableDataSource" />
        <!-- Other Stuff: -->
        <bean id="serviceAreaServiceImpl" class="org.onebusaway.presentation.impl.ServiceAreaServiceImpl" />
        <bean id="externalGeocoderImpl" class="org.onebusaway.geocoder.enterprise.impl.EnterpriseGoogleGeocoderImpl" depends-on="serviceAreaServiceImpl">
        </bean>
        <bean class="org.onebusaway.container.spring.SystemPropertyOverrideConfigurer">
            <property name="properties">
                <props>
                    <prop key="front-end.version">58e1687c091f6c591fca74c76c13d61a8c0dc630</prop>
                </props>
            </property>
        </bean>
        <bean class="org.onebusaway.container.spring.PropertyOverrideConfigurer">
            <property name="properties">
                <props>
                    <prop key="cacheManager.cacheManagerName">org.onebusaway.nyc_webapp.cacheManager</prop>
                </props>
            </property>
        </bean>
        <bean id="siriCacheService" class="org.onebusaway.presentation.services.cachecontrol.SiriCacheServiceImpl">
            <property name="disabled" value="false" />
        </bean>
    </beans>

In the above XML code you will need to replace newPassword in the SQL settings with the password you chose for the oba user.

## Start the Tomcat 9 Service

Finally we can start the Tomcat 9 Service to see if everything worked. In a second SSH window you may want to run the following command so that you can watch the console output of the Tomcat 9 service as OneBusAway starts up for the first time:

`tail -f /var/log/tomcat9/catalina.out`

To start the Tomcat 9 Service simply run this command:

`service tomcat9 start`

## Check all of the Services

OBA v2 uses multiple different services to make sure each one is working correctly you should be able to visit:
* http://myoba.example.com:8080/routes
* http://myoba.example.com:8080/onebusaway-transit-data-federation-webapp/
* http://myoba.example.com:8080/onebusaway-api-webapp/api/where/agencies-with-coverage.json?key=TEST

Each URL should be responding with no errors.

## Visit Your OneBusAway Installation from a Web Browser

Finally, to use your OneBusAway instance visit http://myoba.example.com:8080/routes

## Troubleshooting

Here are some suggestions on what adjustments you can make to fix common problems.

### Real Time Data Not Working

Set your server's timezone to that of the Transit Agency whose data you are accessing.