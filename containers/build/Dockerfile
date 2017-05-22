# This dockerfile creates a container the application is built in
FROM node:6.10.3

ARG ENVIRONMENT
ARG VERSION

ENV ENVIRONMENT=${ENVIRONMENT:-production}
ENV VERSION=${VERSION:-latest}
ENV OUTPUT_DIR=${OUTPUT_DIR:-/artifacts}

ENV ARTIFACT_NAME="jmclient-${ENVIRONMENT}-${VERSION}"

ENV SERVER_API_URL=${SERVER_API_URL:-http://localhost:2701/api}

COPY containers/build/build.entrypoint.sh /build.entrypoint.sh
COPY / /app
VOLUME ${OUTPUT_DIR}

ENTRYPOINT ["/build.entrypoint.sh"]
ONBUILD /build.entrypoint.sh
