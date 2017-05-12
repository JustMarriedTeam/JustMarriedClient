#!/usr/bin/env bash

function exit_with_error {
	echo "$1" 1>&2
	exit 1
}

VERSION=latest

mkdir -p artifacts
docker build -f containers/build/Dockerfile -t jwclient-builder . || exit_with_error "Could not build build container"
docker run -v $(pwd)/artifacts:/artifacts ${@} jwclient-builder || exit_with_error "Could not run build container"
docker build -f containers/deploy/Dockerfile -t jwclient:${VERSION} . || exit_with_error "Could not dockerize application"
