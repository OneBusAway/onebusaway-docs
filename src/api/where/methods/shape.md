---
layout: page
title: shape Method
---

Retrieve a shape (the path traveled by a transit vehicle) by id

## Sample Request

[http://api.pugetsound.onebusaway.org/api/where/shape/1_10002005.json?key=TEST](http://api.pugetsound.onebusaway.org/api/where/shape/1_10002005.json?key=TEST)

## Sample Response

```
{
"code": 200,
"currentTime": 1710685300528,
"data": {
"entry": {
"length": 347,
"levels": "",
"points": "yfraH`djiVAB?F?DFLCJGFGBcDbAg@PIBE@GDG@GDWPOH[VsAz@c@\\y@h@aAn@g@\\KJq@`@c@Zw@h@GDKHEBE?GBC?E?E?m@?m@?iA?aB?E?G?I?I@GBGBGBGDGBIHGDEFGHGHEJGHELCHENAJCDANC^CZ?vC?|EA~A?V@R@L@L@JBL@F@DBJBHDHDJFHDHDHFBFHFBHDFDF@HBF?H@F?r@?pDBf@?zEHj@?xDB`ABnCDT?ApE?vA?lBAJ?JCR?fEAbA?rC?h@ClE?v@?V?L?j@BxB?dG?~@@jD?V?dGAdA?|D?bG?x@@~BBdG@pF?P?lD?jA?dC?hC?~A?`@?bC?`C?bCAbC?~B?hB?\\@jC?jA?@?r@ArA?b@IDEFEDG?y@@x@jCX`AJj@Gl@C~EAdG?rA?pA?VCd@?DAb@A\\?vB?X@L@HBFBHBHBDDFHHLHTPHHD@DFDJRj@j@lBn@lBl@nBV|@Tr@n@jBh@fBN^JX@DTr@zA|EXz@bA`Dl@rBn@lBZ`ANj@Vz@bA|Cl@rBl@jBn@nBl@pBl@jB\\bANh@d@zAFPmCbCeEvDiDxC]XwChCm@j@kCbCIFGFGHIPMTOVKRO`@aB`DkBvDk@jAyCdGyCbGiAtBoAjCmBzDoBxD_AlBm@jAmBzDmBxDMb@k@hAIPAD?dF?@?p@@xA?d@@bCAdC?pBCDGBIDO?aAAE?E?MCG?cB?iF?iFCiE?_@?cGC_@?mC?CbGq@?yB?}C?O?mDAq@?_@?Q?OAMCOAS?[?kBCk@?U?kBAkDAe@?K?w@?Y?M?I@G@EBGDEBEHKVAh@?tB@j@AxA?x@?jA?d@?`B?bC?`@?fB?p@?rA?P?pB?dC?P?rB?`A?hAA`CoFEa@?oE?oFCk@?}HEk@?Q?m@CcG?q@?i@?kCCcCAk@?qA?S?O?o@Cq@?y@?U?AnA?xDlA@N?"
},
"references": {
"agencies": [],
"routes": [],
"situations": [],
"stopTimes": [],
"stops": [],
"trips": []
}
},
"text": "OK",
"version": 2
}
 ```

## Request Parameters

* `id` - the shape id, encoded directly in the URL:
    * `http://api.pugetsound.onebusaway.org/api/where/shape/[ID GOES HERE].xml`

## Response

The path is returned as a `<shape/>` element with a points in the [encoded polyline format](http://code.google.com/apis/maps/documentation/polylinealgorithm.html) defined for Google Maps.