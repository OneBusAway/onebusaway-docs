---
title: onebusaway-gtfs-modules
layout: page
---


  We provide a Java library for reading and writing [ GTFS](https://developers.google.com/transit/gtfs) feeds, including database support.
  
  The library is broken up into a few key modules:
  
  * `onebusaway-gtfs` - The core library for reading and writing GTFS
  
  * `onebusaway-gtfs-hibernate` - Support for [Hibernate](http://www.hibernate.org/) database persistence of GTFS data
  
  * `onebusaway-gtfs-hibernate-cli` - Command-line utilty for loading GTFS feeds into a database - see [the full documentation](/projects/onebusaway-gtfs-modules/onebusaway-gtfs-hibernate-cli). 
  
  * `onebusaway-gtfs-transformer` - Tools for transforming GTFS data
  
  * `onebusaway-gtfs-transformer-cli` - Command-line utility for transforming GTFS - see [the full documentation](/projects/onebusaway-gtfs-modules/onebusaway-gtfs-transformer-cli).

  * `onebusaway-gtfs-merge` - Tools for merging GTFS data
  
  * `onebusaway-gtfs-merge-cli` - Command-line utility for merging GTFS feeds - see [the full documentation](/projects/onebusaway-gtfs-modules/onebusaway-gtfs-merge-cli).

## Using in Maven

  The library is available as a Maven module.  Simply add the following dependencies:

```
<dependencies>
    <!-- Core GTFS Library -->
    <dependency>
        <groupId>org.onebusaway</groupId>
        <artifactId>onebusaway-gtfs</artifactId>
        <version>${currentVersion}</version>
    </dependency>
    <!-- Optional Hibernate GTFS Database Persistence -->
    <dependency>
        <groupId>org.onebusaway</groupId>
        <artifactId>onebusaway-gtfs-hibernate</artifactId>
        <version>${currentVersion}</version>
    </dependency>
    <!-- Optional GTFS Transformation Library -->
    <dependency>
        <groupId>org.onebusaway</groupId>
        <artifactId>onebusaway-gtfs-transformer</artifactId>
        <version>${currentVersion}</version>
    </dependency>
</dependencies>
```

## Docker images

There are automatically generated docker images available at [https://registry.hub.docker.com/u/opentransitsoftwarefoundation](https://registry.hub.docker.com/u/opentransitsoftwarefoundation).

Contributions to image-specific documentation are welcome.

### `onebusaway-gtfs-transformer-cli`

See [the full documentation](./onebusaway-gtfs-transformer-cli.md) for more configuration options.

For example, assuming that all the following files are in the `/path/to/local/data/directory` directory, to run the `remove-matching-route.rule` rule against `gtfs-data.zip` to generate `gtfs-data-out.zip` you can use:
```bash
docker run -v /path/to/local/data/directory:/data --rm opentransitsoftwarefoundation/onebusaway-gtfs-transformer-cli:4.4.0 --transform=/data/remove-matching-route.rule /data/gtfs-data.zip /data/gtfs-data-out.zip
```
The `gtfs-data-out.zip` file will be in the `/path/to/local/data/directory` directory.

## Example Code

### Basic Reading

Let's introduce basic code for reading a GTFS feed and handling the resulting entities:

```
public class GtfsReaderExampleMain {

  public static void main(String[] args) throws IOException {

    if (args.length != 1) {
      System.err.println("usage: gtfs_feed_path");
      System.exit(-1);
    }

    GtfsReader reader = new GtfsReader();
    reader.setInputLocation(new File(args[0]));

    /**
     * You can register an entity handler that listens for new objects as they
     * are read
     */
    reader.addEntityHandler(new GtfsEntityHandler());

    /**
     * Or you can use the internal entity store, which has references to all the
     * loaded entities
     */
    GtfsDaoImpl store = new GtfsDaoImpl();
    reader.setEntityStore(store);

    reader.run();

    // Access entities through the store
    for (Route route : store.getAllRoutes()) {
      System.out.println("route: " + route.getShortName());
    }
  }

  private static class GtfsEntityHandler implements EntityHandler {

    public void handleEntity(Object bean) {
      if (bean instanceof Stop) {
        Stop stop = (Stop) bean;
        System.out.println("stop: " + stop.getName());
      }
    }
  }
}
```

  Notice that the [GtfsReader](./apidocs/org/onebusaway/gtfs/serialization/GtfsReader.html) does the bulk of the work of reading the GTFS feed.  The general pattern is to create the reader, set the input file, and call `run()` to start the reading process.  You can manage the resulting GTFS entities in a couple of ways:

  * Register an [EntityHandler](../../onebusaway-csv-entities/${onebusaway_csv_entities_version}/apidocs/org/onebusaway/csv_entities/EntityHandler.html) to handle entities as they are read
  
  * Use an instance of [GenericMutableDao](./apidocs/org/onebusaway/gtfs/services/GenericMutableDao.html) to examine the loaded entities after reading is complete


### Basic Writing

```
public class GtfsWriterExampleMain {

  public static void main(String[] args) throws IOException {

    if (args.length != 1) {
      System.err.println("usage: gtfs_feed_path");
      System.exit(-1);
    }


    GtfsWriter writer = new GtfsWriter();
    writer.setOutputLocation(new File(args[0]));

    Agency agency = new Agency();
    agency.setName("My agency!");
    
    writer.handleEntity(agency);

    Route route = new Route();
    route.setShortName("A");
    route.setAgency(agency);

    writer.handleEntity(route);

    writer.close();
  }
}
```

### Basic Database Reading

  The class `org.onebusaway.gtfs.examples.GtfsHibernateReaderExampleMain` in the
`onebusaway-gtfs-hibernate/src/test/java` directory includes basic code for reading
a GTFS feed into a database and querying the resulting entities.

  The sample code has been summarized for length and clarity:

```
public class GtfsHibernateReaderExampleMain {

  public static void main(String[] args) throws IOException {

    // Check args and construct application resource paths
    ...

    HibernateGtfsFactory factory = createHibernateGtfsFactory(resource);

    GtfsReader reader = new GtfsReader();
    reader.setInputLocation(new File(args[0]));

    GtfsMutableRelationalDao dao = factory.getDao();
    reader.setEntityStore(dao);
    reader.run();

    Collection<Stop> stops = dao.getAllStops();

    for (Stop stop : stops)
      System.out.println(stop.getName());

    ...
  }

  // Other methods
  private static HibernateGtfsFactory createHibernateGtfsFactory(String resource) {

    Configuration config = new Configuration();

    if (resource.startsWith(KEY_CLASSPATH)) {
      resource = resource.substring(KEY_CLASSPATH.length());
      config = config.configure(resource);
    } else if (resource.startsWith(KEY_FILE)) {
      resource = resource.substring(KEY_FILE.length());
      config = config.configure(new File(resource));
    } else {
      config = config.configure(new File(resource));
    }

    SessionFactory sessionFactory = config.buildSessionFactory();
    return new HibernateGtfsFactory(sessionFactory);
  }
}
```

  This code is roughly similar to the example reader code for
`onebusaway-gtfs`, with the main difference being the use of `HibernateGtfsFactory`, which is a convenience
factory for creating database-aware DAOs.

### Configuring Your Database

  By default, the example above is setup to run with an in-memory HSQLDB database.  Obviously, it'd be great to configure
it to use a different database and you totally can.  See {{http://hibernate.org/}} for more documentation on configuring
Hibernate, but also check out the default hibernate config file used in the example above.  It's located in the following
directory:

```
onebusaway-gtfs-hibernate/src/test/resources/org/onebusaway/gtfs/examples/hibernate-configuration-examples.xml
```

The contents look like:

```
<?xml version='1.0' encoding='utf-8'?>
<hibernate-configuration>
    <session-factory>
        <!-- Database connection settings -->
        <property name="connection.driver_class">org.hsqldb.jdbcDriver</property>
        <property name="connection.url">jdbc:hsqldb:mem:org_onebusaway_temporary</property>
        <property name="connection.username">sa</property>
        <property name="connection.password"></property>

        <!-- SQL dialect -->
        <property name="dialect">org.hibernate.dialect.HSQLDialect</property>

        <!-- More config options removed for brevity -->
    </session-factory>
</hibernate-configuration>
```

  Here you can configure the data source used for the database connection along with the Hibernate dialect.
  
### Reading Custom Fields

  Does your GTFS feed have custom fields not defined by the core `onebusaway-gtfs` library?  It's possible
to read and write this data without modify OBA source code using the "extensions" mechanism.  Consider a
`stops.txt` file with a custom `extra_stop_info` field:

```
stop_id,stop_name,stop_lat,stop_lon,extra_stop_info
123,Some Station,47.0,-122.0,This is a cool transit station
```

  The `extra_stop_info` field isn't included in the the [Stop](./apidocs/org/onebusaway/gtfs/model/Stop.html) data
model by default.  So instead, we define a special `StopExtension` Java bean type with the new field:

```
public static class StopExtension {
  @CsvField(optional = true)
  private String extraStopInfo;

  public String getExtraStopInfo() { ... }
  public void setExtraStopInfo(String info) { ... }
}
```

  We can now register our class as an extension of the default stop data model:

```
DefaultEntitySchemaFactory factory = GtfsEntitySchemaFactory.createEntitySchemaFactory();
factory.addExtension(Stop.class, StopExtension.class);
    
GtfsReader reader = new GtfsReader();
reader.setEntitySchemaFactory(factory);
```

  Now when you read your GTFS feed with the `GtfsReader` instance, `StopExtension` objects
will automatically be created, populated, and attached to stops as they are read:

```
Stop stop = dao.getStopForId(...);
StopExtension extension = stop.getExtension(StopExtension.class);
System.out.println(extension.getExtraStopInfo());
```

  For more information on defining the mapping from GTFS fields to Java beans, see documentation for
the [onebusaway-csv-entities](https://github.com/OneBusAway/onebusaway-csv-entities) project,
including the [@CsvField](../../onebusaway-csv-entities/${onebusaway_csv_entities_version}/apidocs/org/onebusaway/csv_entities/schema/annotations/CsvField.html)
annotation documentation.