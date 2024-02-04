---
layout: page
title: OneBusAway RESTful API
---

OneBusAway provides a RESTful (REpresentational State Transfer) API that allows you access to the same information that
powers the OneBusAway website and mobile tools.  You can use the api to write cool new apps of your own.

## Release Notes

Check out the [Release Notes](/release-notes) for details about what's changed with the API.

## API Keys

The following parameter must be included in all API requests:

  * `key` - your assigned application key

Example:

    /some/api/call.xml?key=YOUR_KEY_HERE

The assigned application key is used to track usage statistics across applications.  API keys can be managed in a number
of ways.

## Output Format

Supported output formats include JSON and XML.  The output format is determined by the request extension.  For example:

`/some/api/call.xml`

will return XML results, while

`/some/api/call.json`

will return JSON.  The JSON method all supports a `callback` parameter, which is useful for cross-site scripting access:

`/some/api/call.json?callback=some_function_name`

will return:

`some_function_name({"key":value,...})`

## Response Element

All responses are wrapped in a response element.

    <response>
      <version>2</version>
      <code>200</code>
      <text>OK</text>
      <currentTime>1270614730908</currentTime>
      <data>
        <references/>
        ...
      </data>
    </response>

The response element carries the following fields:

* `version` - response version information
* code - a machine-readable response code with the following semantics:
    * `200` - Success
    * `400` - The request could not be understood due to an invalid request parameter or some other error
    * `401` - The application key is either missing or invalid
    * `404` - The specified resource was not found
    * `500` - A service exception or error occurred while processing the request
* `text` - a human-readable version of the response `code`
* `currentTime` - current system time on the api server as milliseconds since the unix epoch
* `data` - the response payload
    * `references` see the discussion of references below

## References

The `<references/>` element contains a dictionary of objects referenced by the main result payload.  For elements that
are often repeated in the result payload, the elements are instead included in the `<references/>` section and the
payload will refer to elements by and object id that can be used to lookup the object in the `<references/>` dictionary.

Right now, only a few types of objects will ever appear in the references section: agencies, routes, stops, trips, and
situations.

    <references>
      <agencies>
        <agency>...</agency>
      </agencies>
      <routes>
        <route>...</route>
      </routes>
      <stops>
        <stop>...</stop>
      </stops>
      <trips>
        <trip>...</trip>
      </trips>
      <situations>
        <situation>...</situation>
      </situations>
    </references>

They will always appear in that order, since stops and trips reference routes and routes reference agencies.  If you
are processing the result stream in order, you should always be able to assume that an referenced entity would already
have been included in the references section.

Every API method supports an optional `includeReferences=true|false` parameter that determines if the `<references/>`
section is included in a response.  If you don't need the contents of the `<references/>` section, perhaps because
you've pre-cached all the elements, then setting `includeReferences=false` can be a good way to reduce the response
size.

## Methods

The current list of supported API methods.

* [agencies-with-coverage](/api/where/methods/agencies-with-coverage) - list all supported agencies along with the center of their coverage area
* [agency](/api/where/methods/agency) - get details for a specific agency
* [arrival-and-departure-for-stop](/api/where/methods/arrival-and-departure-for-stop) - details about a specific arrival/departure at a stop
* [arrivals-and-departures-for-stop](/api/where/methods/arrivals-and-departures-for-stop) - get current arrivals and departures for a stop
* [block](/api/where/methods/block) - get block configuration for a specific block
* [cancel-alarm](/api/where/methods/cancel-alarm) - cancel a registered alarm
* [current-time](/api/where/methods/current-time) - retrieve the current system time
* [register-alarm-for-arrival-and-departure-at-stop](/api/where/methods/register-alarm-for-arrival-and-departure-at-stop) - register an alarm for an arrival-departure event
* [report-problem-with-stop](/api/where/methods/report-problem-with-stop) - submit a user-generated problem for a stop
* [report-problem-with-trip](/api/where/methods/report-problem-with-trip) - submit a user-generated problem for a trip
* [route-ids-for-agency](/api/where/methods/route-ids-for-agency) - get a list of all route ids for an agency
* [route](/api/where/methods/route) - get details for a specific route
* [routes-for-agency](/api/where/methods/routes-for-agency) - get a list of all routes for an agency
* [routes-for-location](/api/where/methods/routes-for-location) - search for routes near a location, optionally by route name
* [schedule-for-route](/api/where/methods/schedule-for-route) - get the full schedule for a route on a particular day
* [schedule-for-stop](/api/where/methods/schedule-for-stop) - get the full schedule for a stop on a particular day
* [shape](/api/where/methods/shape) - get details for a specific shape (polyline drawn on a map)
* [stop-ids-for-agency](/api/where/methods/stop-ids-for-agency) - get a list of all stops for an agency
* [stop](/api/where/methods/stop) - get details for a specific stop
* [stops-for-location](/api/where/methods/stops-for-location) - search for stops near a location, optionally by stop code
* [stops-for-route](/api/where/methods/stops-for-route) - get the set of stops and paths of travel for a particular route
* [trip-details](/api/where/methods/trip-details) - get extended details for a specific trip
* [trip-for-vehicle](/api/where/methods/trip-for-vehicle) - get extended trip details for current trip of a specific transit vehicle
* [trip](/api/where/methods/trip) - get details for a specific trip
* [trips-for-location](/api/where/methods/trips-for-location) - get active trips near a location
* [trips-for-route](/api/where/methods/trips-for-route) - get active trips for a route
* [vehicles-for-agency](/api/where/methods/vehicles-for-agency) - get active vehicles for an agency

(Trip planning is no longer supported, check out the [OpenTripPlanner](http://www.opentripplanner.org/) project instead)

## Common Elements

See more discussion of Version 2 of the API and how element references have changed:

* [agency](/api/where/elements/agency)
* [arrivalAndDeparture](/api/where/elements/arrival-and-departure)
* [blockConfiguration](/api/where/elements/block-configuration)
* [frequency](/api/where/elements/frequency)
* [list](/api/where/elements/list-result)
* [route](/api/where/elements/route)
* [situation](/api/where/elements/situation)
* [stop](/api/where/elements/stop)
* [tripDetails](/api/where/elements/trip-details)
* [tripStatus](/api/where/elements/trip-status)
* [trip](/api/where/elements/trip)
* [vehicleStatus](/api/where/elements/vehicle-status)

## Timestamps

<a id="api-timestamp"></a>

Many API methods return timestamps.  For the most part, a OneBusAway timestamp is a measure of the number of milliseconds
since midnight, January 1, 1970 UTC.

Many API methods also accept a "time" parameter that can be used to query the API at a specific point in time (eg. list all
active service alerts on a particular date).  The semantics of how the time parameter is used by the method is method-specific
but the parameter is parsed in the same way.  You can specify time in two possible forms:

* Millisecond since the epoch: `time=1365259214945`
* "Human-friendly": `time=yyyy-MM-dd_HH-mm-ss`

In human-friendly mode, the time will be parsed relative to the timezone where the OBA server is operating.
