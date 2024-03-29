---
title: Webapp Configuration Guide
layout: page
---

This guide will instruct you on how to configure an instance of `onebusaway-webapp`.  These are specific configuration
instructions, part of your larger OneBusAway installation.  The `onebusaway-webapp` powers
the various OneBusAway web interfaces:

* standard web interface
* mobile-web interface
* text-only web interface
* sign-mode interface

## Wiki Integration

To make it easier to customize the content and look-and-feel of your `onebusaway-webapp` installation, we provide a
content configuration option that we call *wiki integration*.  The idea is that you can point your `onebusaway-webapp`
installation at a wiki or some other content management system, allowing you to control the various content pages that
are included in the webapp.

As a quick example, if you have an [XWiki installation](http://www.xwiki.org) available at the url
http://wiki.mydomain.org, you can configure your `onebusaway-webapp` to use the wiki by adding the following elements
to your `data-sources.xml` config file:

~~~
<bean id="wikiDocumentService" class="org.onebusaway.wiki.xwiki.impl.XWikiDocumentServiceImpl">
    <property name="xwikiUrl" value="http://wiki.mydomain.org" />
</bean>

<bean id="wikiRenderingService" class="org.onebusaway.wiki.xwiki.impl.XWikiRenderingServiceImpl">
    <property name="wikiDocumentViewUrl" value="/p/%{documentName}.action" />
    <property name="wikiAttachmentUrl" value="http://wiki.mydomain.org/bin/download/Main/%{documentName}/%{attachmentName}" />
    <property name="wikiDocumentEditUrl" value="http://wiki.mydomain.org/bin/edit/Main/%{documentName}" />
</bean>
~~~

The two components are a wiki document service and a wiki rendering service that control the source of pages and how
they are rendered.

There is a fair amount of flexibility in how you configure wiki integration.  For more information see the complete
[wiki integration guide]().