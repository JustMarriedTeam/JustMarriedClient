#!/usr/bin/env bash

function exit_with_error {
	echo "$1" 1>&2
	exit 1
}

function print_header {
  printf "\n\n
    ===========================================================
    $1
    ===========================================================
    \n\n";
}

ENVIRONMENT=${ENVIRONMENT:-production}
VERSION=${VERSION:-latest}

BUILD_NAME=${ENVIRONMENT}-${VERSION}
BUILDER_IMAGE_NAME=jwclient-builder:${BUILD_NAME}
APP_IMAGE_NAME=jwclient:${BUILD_NAME}

mkdir -p artifacts

print_header "Building container for building ${BUILD_NAME}"

docker build \
  -f containers/build/Dockerfile \
  -t ${BUILDER_IMAGE_NAME} . \
  --build-arg ENVIRONMENT=${ENVIRONMENT} \
  --build-arg VERSION=${VERSION} \
  || exit_with_error "Could not build container for building ${BUILD_NAME}"



print_header "Running build container ${BUILDER_IMAGE_NAME}"

docker run \
  -v $(pwd)/artifacts:/artifacts \
  ${BUILDER_IMAGE_NAME} \
  || exit_with_error "Could not run build container ${BUILDER_IMAGE_NAME}"



print_header "Dockerizing application built by ${BUILDER_IMAGE_NAME} into application image ${APP_IMAGE_NAME}"

docker build \
  -f containers/deploy/Dockerfile \
  -t ${APP_IMAGE_NAME} . \
  || exit_with_error "Could not dockerize application built by ${BUILDER_IMAGE_NAME} into ${APP_IMAGE_NAME}"
