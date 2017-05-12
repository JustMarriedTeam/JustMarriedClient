#!/usr/bin/env bash

function exit_with_error {
	echo "$1" 1>&2
	exit 1
}

docker build -f containers/build/Dockerfile -t client-builder . || exit_with_error "Could not build build container"
docker run -v $(pwd)/output:/output ${@} client-builder || exit_with_error "Could not run build container"
