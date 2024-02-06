---
title: Build and Compile Guide for v1.x
layout: page
---

<div class='bg-blue-50 border-blue-500 dark:bg-slate-800 p-4 rounded-md'>
    <div><strong>Original location</strong>: <a href='https://github.com/OneBusAway/onebusaway-application-modules/wiki/Build-and-Compile-Guide-for-v1.x'>https://github.com/OneBusAway/onebusaway-application-modules/wiki/Build-and-Compile-Guide-for-v1.x</a></div>
    <div><strong>Last updated</strong>: July 2018</div>
</div>

This guide is designed to provide a comprehensive path for users who wish to build a OneBusAway binary from the version 1.x source files. This guide is primarily intended for developers who wish to make changes to the source code of their OBA installation. **If all you want to do is run OBA without any changes to the source code, please see the [Configuration and Deployment Guide for v1.x](https://github.com/OneBusAway/onebusaway/wiki/Configuration-and-Deployment-Guide-for-v1.x) instead.**

***Build and Compile Guide Available for v2.x***

The OBA master branch is now at v2.0.0-SNAPSHOT (pre-release of v2). Should you wish to build binaries from the master branch, please see the [early version of an updated Developer Guide for v2.0](https://github.com/OneBusAway/onebusaway-application-modules/wiki/Enterprise-Webapp-Configuration) instead of this guide.

## Note on Software Versions
When using this guide, be certain to use the exact same versions of all software mentioned here. Any discrepancies between this guide and your actual installation will more than likely result in complicated errors and, ultimately failure. Follow the instructions exactly and there should be no issues.

## System Minimum Requirements
This guide uses a Debian 9 installation with a 2.0 GHz processor and 2048 GB of memory.

## Server Operating System
This guide assumes the end user already knows how to set up a system running the Debian 9 operating system. We need to start with a clean installation of Debian 9 with no extra anything, not even the Debian desktop environment.

When setting up Debian 9 using the installer, be certain not to install any additional components except for the SSH server and standard system utilities. You can probably get away with including more but this guide is written with a clean, lightweight environment in mind and making your system is the same will help insure success. Also, the less that is running on the server, the more resources available for OneBusAway.

You will need access to the root user to follow this guide. All commands are executed as the root user.

## Installing Required Software
Using Debian 9, the following software must be installed:

### OpenJDK Runtime Environment 8
This is the open source version of the Java 8 JDK Runtime Environment. To install it run the following command:
`apt-get install openjdk-8-jdk`

### Tomcat 8
This software is used to serve the OneBusAway web application. To install it run the following command:
`apt-get install tomcat8`

### Git
This software is required for downloading the source code from the OneBusAway repository on GitHub. To install it run the following command:
`apt-get install git`

### Maven 3
Maven is used to build the OneBusAway application from the source code. To install it run the following command:
`apt-get install maven`

## Acquiring the Source Code
Now that all of the required supporting software is installed, we must now download the source code from the OneBusAway repository on GitHub. To do this, run the following commands in sequence:

`mkdir /oba`

`cd /oba`

`git clone https://github.com/OneBusAway/onebusaway-application-modules.git`

## Checking Out the Right Version
Since we just cloned a git repository we need to direct git to check out the code for the version of OneBusAway that we want. In this guide we will be using version 1.1.18. To do this, run the following commands in sequence:

`cd /oba/obaonebusaway-application-modules`

`git checkout onebusaway-application-modules-1.1.18`

## Build It
Now we can build the OneBusAway software from the source code with Maven. To do this run the following command:

`mvn clean install -DskipTests`

This will take a while, so don’t worry if it doesn’t build immediately. Give the build at least 15 minutes to run. When this is complete the console should show a summary of the build. Every item in the list should indicate the build for that item was successful. If it wasn’t successful, start over and try again. The **-DskipTests** attribute prevents Maven from running various Unit Tests which sometimes causes Maven to timeout and fail the build.

## Deploy It
For instructions on configuring and deploying, please see [Configuration and Deployment Guide for v1.x](https://github.com/OneBusAway/onebusaway/wiki/Configuration-and-Deployment-Guide-for-v1.x).
