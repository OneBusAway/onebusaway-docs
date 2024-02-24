---
title: Enterprise Webapp Configuration
layout: page
---

<div class='bg-blue-50 border-blue-500 dark:bg-slate-800 p-4 rounded-md'>
    <div><strong>Original location</strong>: <a href='https://github.com/OneBusAway/onebusaway-application-modules/wiki/Enterprise-Webapp-Configuration'>https://github.com/OneBusAway/onebusaway-application-modules/wiki/Enterprise-Webapp-Configuration</a></div>
    <div><strong>Last updated</strong>: December 2019</div>
</div>

This page documents how to do a minimal deploy of the onebusaway-enterprise-acta-webapp module introduced by [Pull 176](https://github.com/OneBusAway/onebusaway-application-modules/pull/176) for v2.0 of OBA.  Consider it a preview of things to come!

# Docker

Note that there is a [OneBusAway Docker](https://github.com/OneBusAway/onebusaway-docker) package if you want to start there!

# Basic Steps to Build it Yourself

**CAUTION** - Looks like there is an updated configuration guide at https://github.com/OneBusAway/onebusaway/wiki/Configuration-and-Deployment-Guide-for-v2.x. The below may be outdated.


* Build the project

```
// example commands to follow
// this will be from onebusaway repo shortly -- still some issues to sort out
$ git clone git@github.com:OneBusAway/onebusaway-application-modules.git
$ mvn clean install
```

* Build a Transit Data Federated Bundle using the same version of onebusaway-transit-data-builder as onebusaway-enterprise-acta-webapp.  See https://github.com/OneBusAway/onebusaway-application-modules/wiki/Developer-Guide#building-a-transit-data-bundle and https://github.com/OneBusAway/onebusaway-application-modules/wiki/Transit-Data-Bundle-Guide for details on building bundles.
* deploy onebusaway-transit-data-federation-webapp to tomcat

```
$ sudo mkdir /var/lib/tomcat6/webapps/onebusaway-transit-data-federation-webapp && sudo unzip onebusaway-transit-data-federation-webapp/target/onebusaway-transit-data-federation-webapp.war -d /var/lib/tomcat6/webapps/onebusaway-transit-data-federation-webapp
```

* Make sure you've added the `data-sources.xml` files to the webapps - see the [v1.x config guide](https://github.com/OneBusAway/onebusaway-application-modules/wiki/Developer-Guide#configuring-onebusaway-transit-data-federation-webapp) for the steps, and the data-sources.xml files in the [Docker repo](https://github.com/OneBusAway/onebusaway-docker/tree/main/oba/config) for v2.0 examples.
* edit `data-sources.xml` in `onebusaway-enterprise-acta-webapp` to reflect your data sources

```
<?xml version="1.0" encoding="UTF-8"?>
<beans xmlns="http://www.springframework.org/schema/beans" xmlns:context="http://www.springframework.org/schema/context" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:schemaLocation=" http://www.springframework.org/schema/beans http://www.springframework.org/schema/beans/spring-beans-2.5.xsd http://www.springframework.org/schema/context http://www.springframework.org/schema/context/spring-context-2.5.xsd">
  <bean id="dataSource" class="org.springframework.jndi.JndiObjectFactoryBean">
    <property name="jndiName" value="java:comp/env/jdbc/appDB" />
    <property name="lookupOnStartup" value="true" />
    <property name="cache" value="true" />
    <property name="proxyInterface" value="javax.sql.DataSource" />
    <property name="resourceRef" value="true" />
  </bean>
  <bean class="org.onebusaway.container.spring.SystemPropertyOverrideConfigurer">
    <property name="order" value="-2" />
    <property name="properties">
      <props>
        <!-- this property is deprecated, use bundleStoreRoot now -->
        <prop key="bundlePath">/var/lib/oba/no-such-dir</prop>
      </props>
    </property>
  </bean>
  <bean class="org.onebusaway.transit_data_federation.impl.realtime.gtfs_realtime.GtfsRealtimeSource">
    <property name="tripUpdatesUrl" value="http://realtime.prod.obahart.org:8088/trip-updates" />
    <property name="vehiclePositionsUrl" value="http://realtime.prod.obahart.org:8088/vehicle-positions" />
    <property name="refreshInterval" value="60" />
    <property name="agencyIds">
      <list>
        <value>Hillsborough Area Regional Transit</value>
      </list>
    </property>
  </bean>
  <bean id="httpServiceClient" class="org.onebusaway.transit_data_federation.util.HttpServiceClientImpl">
    <constructor-arg type="java.lang.String" value="no-such-host" />
    <constructor-arg type="java.lang.Integer" value="9999" />
    <constructor-arg type="java.lang.String" value="/onebusaway-admin-webapp/api/" />
  </bean>
  <bean id="bundleManagementService" class="org.onebusaway.transit_data_federation.impl.bundle.BundleManagementServiceImpl">
    <property name="bundleStoreRoot" value="/var/lib/oba/tds/bundle" />
    <property name="standaloneMode" value="true" />
  </bean>
</beans>
```

* restart tomcat
* verify deployment:  go to [http://localhost:8080/onebusaway-transit-data-federation-webapp/](http://localhost:8080/onebusaway-transit-data-federation-webapp/)  and ensure the index page comes up.
* deploy onebusaway-application-webapp to tomcat

```
$ sudo mkdir /var/lib/tomcat7/webapps/onebusaway-api-webapp && sudo unzip  onebusaway-api-webapp/target/onebusaway-api-webapp.war -d /var/lib/tomcat7/webapps/onebusaway-api-webapp
```

* edit data-sources to reflect the path to above

```
<?xml version="1.0" encoding="UTF-8"?>
<beans xmlns="http://www.springframework.org/schema/beans" xmlns:context="http://www.springframework.org/schema/context" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:schemaLocation="         http://www.springframework.org/schema/beans http://www.springframework.org/schema/beans/spring-beans-2.5.xsd         http://www.springframework.org/schema/context http://www.springframework.org/schema/context/spring-context-2.5.xsd">
  <!-- Specify our transit data source -->
  <bean id="transitDataService" class="org.springframework.remoting.caucho.HessianProxyFactoryBean">
    <property name="serviceUrl" value="http://localhost:8080/onebusaway-transit-data-federation-webapp/remoting/transit-data-service" />
    <property name="serviceInterface" value="org.onebusaway.transit_data.services.TransitDataService" />
  </bean>
  <bean id="apiKeyValidationService" class="org.onebusaway.users.impl.validation.KeyValidationServiceImpl" />
  <!-- Database Configuration -->
  <bean id="dataSource" class="org.springframework.jndi.JndiObjectFactoryBean">
    <property name="jndiName" value="java:comp/env/jdbc/appDB" />
    <property name="lookupOnStartup" value="true" />
    <property name="cache" value="true" />
    <property name="proxyInterface" value="javax.sql.DataSource" />
    <property name="resourceRef" value="true" />
  </bean>
  <bean id="agencyMetadataDataSource" class="org.springframework.jndi.JndiObjectFactoryBean">
    <property name="jndiName" value="java:comp/env/jdbc/agencyMetadataDB" />
    <property name="lookupOnStartup" value="true" />
    <property name="cache" value="true" />
    <property name="proxyInterface" value="javax.sql.DataSource" />
    <property name="resourceRef" value="true" />
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
</beans>
```

* restart tomcat
* verify deployment:  go to [http://localhost:8080/onebusaway-api-webapp/api/where/config.json?key=TEST](http://localhost:8080/onebusaway-api-webapp/api/where/config.json?key=TEST) and ensure the api returns with valid JSON
* deploy onebusaway-enterprise-acta-webapp to tomcat

```
$ sudo mkdir /var/lib/tomcat7/webapps/ROOT && sudo unzip  onebusaway-enterprise-acta-webapp/target/onebusaway-enterprise-acta-webapp.war -d /var/lib/tomcat7/webapps/ROOT
```

* edit data-sources to reflect the path above and any additional configuration (geocoders, service area, etc)

```
<?xml version="1.0" encoding="UTF-8"?>
<beans xmlns="http://www.springframework.org/schema/beans" xmlns:aop="http://www.springframework.org/schema/aop" xmlns:context="http://www.springframework.org/schema/context" xmlns:jee="http://www.springframework.org/schema/jee" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:schemaLocation="http://www.springframework.org/schema/beans http://www.springframework.org/schema/beans/spring-beans-3.0.xsd         http://www.springframework.org/schema/context http://www.springframework.org/schema/context/spring-context-3.0.xsd         http://www.springframework.org/schema/aop http://www.springframework.org/schema/aop/spring-aop-3.0.xsd         http://www.springframework.org/schema/jee http://www.springframework.org/schema/jee/spring-jee-3.0.xsd">
  <bean id="transitDataService" class="org.springframework.remoting.caucho.HessianProxyFactoryBean">
    <property name="serviceUrl" value="http://localhost:8080/onebusaway-transit-data-federation-webapp/remoting/transit-data-service" />
    <property name="serviceInterface" value="org.onebusaway.transit_data.services.TransitDataService" />
  </bean>
  <!-- Database Configuration -->
  <bean id="dataSource" class="org.springframework.jndi.JndiObjectFactoryBean">
    <property name="jndiName" value="java:comp/env/jdbc/appDB" />
    <property name="lookupOnStartup" value="true" />
    <property name="cache" value="true" />
    <property name="proxyInterface" value="javax.sql.DataSource" />
    <property name="resourceRef" value="true" />
  </bean>
  <alias name="dataSource" alias="mutableDataSource" />
  <!-- Other Stuff: -->
  <bean id="externalGeocoderImpl" class="org.onebusaway.geocoder.enterprise.impl.EnterpriseGoogleGeocoderImpl">
    <property name="wktFilterPolygon" value="POLYGON((-82.553075 27.978988,-82.533849 27.998997,-82.487511 28.001203, -82.481664 28.055366,-82.426732 28.056578,-82.425359 28.068697,-82.410939 28.069908,-82.410939 28.109889,-82.424672 28.110495,-82.38828 28.146222,-82.389653 28.171042,-82.354634 28.171648,-82.351888 28.143195,-82.314122 28.1438,-82.316182 28.172253,-82.264684 28.170437,-82.305196 28.127451,-82.363561 28.124424,-82.356007 28.069303,-82.402013 28.068697,-82.393086 27.972318,-82.368367 27.970499,-82.377293 27.943205,-82.408193 27.941992,-82.414372 27.914085,-82.461751 27.909231,-82.463811 27.938959,-82.491277 27.920152,-82.47411 27.823034,-82.549641 27.861892,-82.553075 27.978988))" />
  </bean>
  <bean id="configurationServiceClient" class="org.onebusaway.util.impl.configuration.ConfigurationServiceClientFileImpl">
    <constructor-arg type="java.lang.String" value="/var/lib/oba/config.json" />
  </bean>
  <bean id="serviceAreaServiceImpl" class="org.onebusaway.presentation.impl.ServiceAreaServiceImpl">
    <property name="calculateDefaultBoundsFromAgencyCoverage" value="true" />
  </bean>
  <bean class="org.onebusaway.container.spring.PropertyOverrideConfigurer">
    <property name="properties">
      <props>
        <prop key="cacheManager.cacheManagerName">org.onebusaway.nyc_webapp.cacheManager</prop>
      </props>
    </property>
  </bean>
  <bean id="siriCacheService" class="org.onebusaway.presentation.services.cachecontrol.SiriCacheServiceImpl">
    <property name="disabled" value="true" />
  </bean>
</beans>
```

* restart tomcat
* verify deployment:  go to [http://localhost:8080/routes](http://localhost:8080/routes) and verify the list of routes renders.
