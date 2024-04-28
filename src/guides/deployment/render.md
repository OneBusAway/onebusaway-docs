---
title: Deploying OneBusAway on Render.com
layout: page
---

[Render.com](https://www.render.com) ("Render" for short) is a Platform as a Service (PaaS) provider that can be much easier to work with than AWS, GCP, or Azure while still offering a rich and compelling set of services for creating, orchestrating, and maintaining software using Docker and Render's Infrastructure as Code (IaC) tooling.

Unless your needs are highly complex, or you have already evaluated and rejected Render, it is in the opinion of your author that Render will be the best bet for hosting OneBusAway in the vast majority of cases due to its comparatively intuitive user interface, clear pricing, thriving community, and responsive support services.

## Overview

A basic OneBusAway deployment requires three separate services:

* MySQL Database - [PlanetScale](https://www.planetscale.com)
* Docker container hosting - [Render](https://www.render.com)
* Transit data bundle creation from a GTFS zip file - build locally and upload

## MySQL Database - PlanetScale

Unfortunately, the OneBusAway Docker image currently only supports MySQL databases, which Render does not offer at present. When hosting on Render, we currently recommend using [PlanetScale](https://www.planetscale.com) for database services. PlanetScale offers a managed MySQL solution that can scale up or down with usage, which will save you money and ensure that your database isn't overwhelmed by traffic.

### Create the Database

#### Step 1: Create new database

Once you have created a PlanetScale account, click on the "Create new database" from the dashboard.

<img src="/images/guides/render/01-create-database.png" alt="" class="max-w-[600px]">

#### Step 2: Naming, region, and plan

Name the database, choose a region, and a plan. The name isn't especially important, and the plan can be changed later. Choose the cheapest plan, PS-10, unless you know what your needs will require.

The region is important; choose the closest AWS region to your users from the list below:

* ap-southeast-1 (Singapore)
* us-east-2 (Ohio)
* us-west-2 (Oregon)
* eu-central-1 (Frankfurt)

These are the four regions that are supported by Render at present, and it's vitally important that your database and web app server are in close physical proximity.

<img src="/images/guides/render/02-create-database.png" alt="" class="max-w-[600px]">

#### Step 3: Retrieve credentials

On the next page, PlanetScale will ask you to 'name' your password. This is for your own record-keeping and you can select the default unless you feel strongly about it. Click the affirmative button to go to the next step, depicted in the screenshot below.

Save your username and password somewhere secure, like in [a password manager](https://www.nytimes.com/wirecutter/reviews/best-password-managers/).

Under _Select your language or framework_, choose Java.

<img src="/images/guides/render/03-db-credentials.png" alt="" class="max-w-[600px]">

Scroll down the page to the section entitled _Add credentials to .env_. Copy the contents of the box labeled `.env` and add it to your password manager, too. Finally, scroll to the bottom of the page and click the _Go to your database dashboard_ button.

<img src="/images/guides/render/04-db-credentials.png" alt="" class="max-w-[600px]">

### Create a JDBC connection URL

You'll need to craft a JDBC connection URL from the data contained in the `.env` section. PlanetScale can help a bit, too. From the dashboard page for the new database you just created, click the _Connect_ button, which will display the modal dialog shown below. Copy _only_ the JDBC connection URL. Yours will look _slightly_ different from what's shown below, as it will have your unique database name included in the URL.

```
jdbc:mysql://aws.connect.psdb.cloud/YOUR_DB_NAME_GOES_HERE?sslMode=VERIFY_IDENTITY
```

<img src="/images/guides/render/05-db-conn-string.png" alt="" class="max-w-[600px]">

## Docker container hosting - Render

Now that our database is launched and accessible, we can turn our attention to setting up the OBA API server. Log in to [Render.com](https://www.render.com), create an account, and add your credit card as needed.

Next, click the _Deploy to Render_ button below. It will start the process of creating a new OBA API server on Render for you by downloading the render.yaml Blueprint from the OBA Docker repository. (Blueprint is Render's term for their IaC configuration files.)

[![Deploy to Render](https://render.com/images/deploy-to-render-button.svg)](https://render.com/deploy?repo=https://github.com/oneBusAway/onebusaway-docker/)

<img src="/images/guides/render/06-create-web-service.png" alt="" class="max-w-[600px]">

### Configure the container from your Blueprint

* Blueprint Name - This can be anything you'd like, and will never be seen publicly.
* Branch - choose `main`.

#### Key/Value pairs:

* Database:
    * `JDBC_URL` - required. The JDBC connection URL we retrieved from PlanetScale.
    * `JDBC_USER` - required. The MySQL database username from PlanetScale.
    * `JDBC_PASSWORD` - required. The MySQL database password from PlanetScale.
* To enable GTFS-RT support:
    * `AGENCY_ID` - required. The ID of the agency in your GTFS-RT feeds. e.g. `unitrans`.
    * `VEHICLE_POSITIONS_URL` - required. The GTFS-RT vehicle positions URL. e.g. `https://example.com/gtfs-rt/vehicle-positions.pb`
    * `TRIP_UPDATES_URL` - required. The GTFS-RT trip updates URL. e.g. `https://example.com/gtfs-rt/trip-updates.pb`
    * `ALERTS_URL` - optional. The GTFS-RT service alerts URL. e.g. `https://example.com/gtfs-rt/service-alerts.pb`
    * `REFRESH_INTERVAL` - optional. The refresh frequency in seconds. Defaults to `30`.
    * Authentication (optional)
        * `FEED_API_KEY` - optional. If your GTFS-RT feeds require some sort of API key to be sent as a header as part of the GET request, specify the key (i.e. the header name) here. e.g. `X-MY-API-KEY`.
        * `FEED_API_VALUE` - optional. If your GTFS-RT feeds require some sort of API key to be sent as a header as part of the GET request, specify the value (i.e the key itself) here. e.g. `1234567890abcdef`.

For the purposes of this tutorial, we will skip setting up GTFS-RT. Fill in the `JDBC_*` fields and click the _Apply_ button. The _Apply_ button will disappear and an indefinite progress indicator will appear next to the _Create web service_ label, but otherwise the page will remain unchanged for potentially several minutes. There's nothing to worry about.

<img src="/images/guides/render/07-create-web-service.png" alt="" class="max-w-[600px]">

## Create the transit data bundle

Open a new tab and navigate to the [Render Dashboard](https://dashboard.render.com). You should see a new, running container for your OBA API server. Click on the API server entry.

<img src="/images/guides/render/08-dashboard.png" alt="" class="max-w-[600px]">

### Prepare the transit data bundle locally

_(In the opinion of the author, this part of the process is unnecessarily complex and can stand to be improved. This is currently the hardest part of the deployment, but you can get through it by following the instructions precisely!)_

1. [Install Docker Desktop](https://www.docker.com/get-started/)
2. Launch Docker Desktop and log in to Docker through the app.
3. Search for `onebusaway-bundle-builder` (See screenshot below.)
4. Select the most recent versioned tag (at the time of the writing of this document, the version was `2.4.18-cs-v1.1.0`)
5. Click the _Pull_ button in the search UI.
6. Switch to the _Images_ tab on the left side navigation pane.
7. Under the _Actions_ column next to your bundle-builder image, click the ▶ button (i.e. the _Play_ button)
8. On the _Run a new container_ dialog, expand _Optional Settings_.
    * _Container name_: `oba-bundle-builder` - this is optional, but recommended.
    * Under _Volumes_, set _Host path_ to a location of your choosing by clicking the '...' button and choosing a location. **Important**: this will be the location of the transit data bundle output. It is strongly recommended that you create a new, empty folder and choose that. For example, create a new folder on your Desktop named `oba_bundle`
    * Under _Volumes_, set _Container path_ to `/bundle`
    * Under _Environment variables_, set _Variable_ to `GTFS_URL` and `Value` to the URL for your static GTFS feed as a Zip file. e.g. `https://unitrans.ucdavis.edu/media/gtfs/Unitrans_GTFS.zip`.
9. Click the _Run_ button.

#### Step 3: Docker Desktop Search UI

This is the screenshot that corresponds to step 3 above.

<img src="/images/guides/render/10-docker-desktop-search.png" alt="" class="max-w-[600px]">

#### Step 8: Docker Desktop _Run a new container_ dialog

This is the screenshot that corresponds to step 8 above.

<img src="/images/guides/render/11-docker-run-container.png" alt="" class="max-w-[600px]">

### Inspect Docker Logs

If everything works, you will see log output from the Docker container that looks similar to the screenshot below. The logs will indicate that the Docker container has read the static GTFS data and created an optimized static transit data bundle for OneBusAway.

<img src="/images/guides/render/12-docker-logs.png" alt="" class="max-w-[600px]">

### Inspect the file output

More important than the Docker log output is what the container has written to your filesystem. Go to the `oba_bundle` folder on your Desktop, or wherever you chose as the file destination on your computer, and make sure that it looks similar to the screenshot below. The full list of files should be something similar to:

* `BlockLayoverIndices.obj`
* `BlockTripIndices.obj`
* `CalendarServiceData.obj`
* `CanonicalRoute.obj`
* `FrequencyBlockTripIndices.obj`
* `NarrativeProvider.obj`
* `RouteSearchIndex`
* `ShapeGeospatialIndexData.obj.gz`
* `StopSearchIndex`
* `TransitGraph.obj`
* `WrongWayConcurrencies.obj`
* `gtfs.zip`
* `org_onebusaway_transit_data.log`
* `org_onebusaway_transit_data.properties`
* `org_onebusaway_transit_data.script`
* `org_onebusaway_transit_data.tmp`

<img src="/images/guides/render/13-finder.png" alt="" class="max-w-[600px]">

## Upload the transit data bundle

_(Alternatively, you can gzip the files, store the .tar.gz file on a publicly accessible server (AWS S3, etc.), and then download the file from within the server using `wget`. If this all makes sense to you, it might be faster and easier than using Magic Wormhole.)_

It is recommended that you use the [Magic Wormhole](https://magic-wormhole.readthedocs.io/en/latest/) utility to transfer the transit data bundle to the server. Learn how here: [Install Magic Wormhole on your local computer](https://magic-wormhole.readthedocs.io/en/latest/welcome.html#installation). Magic Wormhole is already installed in your Docker container.

From your local computer:

1. Open a terminal and navigate to your `oba_bundle` folder (i.e. `cd` _into_ the folder).
2. Create a zip file containing the loose files: `zip bundle.zip *`
3. Send the file with Magic Wormhole: `wormhole send bundle.zip`
4. Magic Wormhole will print out a command to run from the receiving computer, like `wormhole receive 8-challenge-pineapple` (not a real example.)
5. Copy the _full_ receive command.

From your Docker container:

1. Go back to your web browser where you had set up your OBA server container on Render.
2. Click on the Shell tab on the left-hand side. You'll see that you now have a terminal into your live, running Docker container. (See screenshot below.)
3. Run the command `cd /bundle` to navigate to the location where we will upload your transit data bundle.
4. Run the `wormhole receive` command you copied in the earlier step, and confirm that you want to receive the `bundle.zip` file.
5. Run `unzip bundle.zip` and verify that you received all of the files with the `ls` command.
6. Click on the _Manual Deploy_ dropdown near the top right corner of the web page and then click on _Restart service_. (See screenshot below.)

#### Step 2: Docker container terminal

<img src="/images/guides/render/09-shell.png" alt="" class="max-w-[600px]">

#### Step 6: Restart Docker container

<img src="/images/guides/render/14-restart-container.png" alt="" class="max-w-[600px]">

## Validate the Server

Once the OBA server has rebooted (which will take a few minutes), verify that your service works as expected by creating a URL from the server's base URL (shown in the screenshot below) and the following paths/query params:

* `/onebusaway-api-webapp/api/where/current-time.json?key=org.onebusaway.iphone`
* `/onebusaway-api-webapp/api/where/agencies-with-coverage.json?key=org.onebusaway.iphone`
* `/onebusaway-api-webapp/api/where/routes-for-agency/{AGENCY ID FROM PREVIOUS STEP GOES HERE}.json?key=org.onebusaway.iphone`
* `/onebusaway-api-webapp/api/where/stops-for-route/{ROUTE ID FROM PREVIOUS STEP GOES HERE}.json?key=org.onebusaway.iphone`
* `/onebusaway-api-webapp/api/where/stop/{STOP ID FROM PREVIOUS STEP GOES HERE}.json?key=org.onebusaway.iphone`

<img src="/images/guides/render/15-url.png" alt="" class="max-w-[600px]">

## Conclusion

Congratulations, you've deployed a OneBusAway API server! 🎉

Now you're ready to set up GTFS-RT feeds, add a Google Maps API key to the web UI, and start testing with the iOS and Android mobile apps. More guides are coming soon to help you with these steps. Please don't hesitate to reach out on our [developer docs GitHub repo](https://github.com/OneBusAway/onebusaway-docs) with questions, corrections, offers to help, or anything else that comes to mind.