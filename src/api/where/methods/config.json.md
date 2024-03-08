---
layout: page
title: config.json Method
---

Access to configuration information.

## Sample Request

`https://api.pugetsound.onebusaway.org/api/where/config.json?&key=TEST`


## Sample Response

  ```
  {
  "code": 200,
  "currentTime": 1709665910298,
  "data": {
    "entry": {
      "gitProperties": {
        "git.branch": "d600e47ead0928a9e1bd76af9f16c12294d3782c",
        "git.build.host": "swdev31",
        "git.build.time": "23.01.2024 @ 16:01:10 EST",
        "git.build.user.email": "sheldonb@gmail.com",
        "git.build.user.name": "sheldonabrown",
        "git.build.version": "2.5.2-cs",
        "git.closest.tag.commit.count": "0",
        "git.closest.tag.name": "onebusaway-application-modules-2.5.2-cs",
        "git.commit.id": "d600e47ead0928a9e1bd76af9f16c12294d3782c",
        "git.commit.id.abbrev": "d600e47",
        "git.commit.id.describe": "onebusaway-application-modules-2.5.2-cs",
        "git.commit.id.describe-short": "onebusaway-application-modules-2.5.2-cs",
        "git.commit.message.full": "[maven-release-plugin] prepare release onebusaway-application-modules-2.5.2-cs",
        "git.commit.message.short": "[maven-release-plugin] prepare release onebusaway-application-modules-2.5.2-cs",
        "git.commit.time": "23.01.2024 @ 15:48:19 EST",
        "git.commit.user.email": "sheldonb@gmail.com",
        "git.commit.user.name": "sheldonabrown",
        "git.dirty": "false",
        "git.remote.origin.url": "git@github.com:camsys/onebusaway-application-modules.git",
        "git.tags": "onebusaway-application-modules-2.5.2-cs"
      },
      "id": "b6bff432-3b99-4f75-8834-4b0c6969fb3f",
      "name": "FEB24_2_4",
      "serviceDateFrom": "1709280000000",
      "serviceDateTo": "1722409200000"
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

* key - API key for authentication.
    * `https://api.pugetsound.onebusaway.org/api/where/config.json?&key=[API KEY GOES HERE]`


Replace `API KEY GOES HERE` with your actual API key obtained from OneBusAway.
Upon successful retrieval, the API responds with a JSON object containing the following fields:
