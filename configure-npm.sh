#!/bin/sh
  
npm config set _auth $ARTIFACTORY_CREDENTIALS
npm config set always-auth true
npm config set email build-team@spiceworks.com
npm config set registry https://spiceworks.jfrog.io/spiceworks/api/npm/npm-integrated