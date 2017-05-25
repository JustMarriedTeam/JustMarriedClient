# This file is using a simple trick http://bitjudo.com/blog/2014/03/13/building-efficient-dockerfiles-node-dot-js/ to speed up build times
# This dockerfile creates a container the application is built in
FROM node:6.10.3

ARG OUTPUT_DIR
ARG ARTIFACT_NAME

ENV OUTPUT_DIR=${OUTPUT_DIR:-/artifacts}
ENV ARTIFACT_NAME=${ARTIFACT_NAME:-jmclient}

# Client environment variables need to be preset during build
ENV SERVER_API_URL=${SERVER_API_URL:-http://localhost:2701/api}

COPY containers/build/build.entrypoint.sh /build.entrypoint.sh
COPY / /app
VOLUME ${OUTPUT_DIR}

ENTRYPOINT ["/build.entrypoint.sh"]
ONBUILD /build.entrypoint.sh
