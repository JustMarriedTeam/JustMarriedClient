FROM nginx:latest
MAINTAINER gurgul.grzegorz@gmail.com

ARG ARTIFACT
ENV ARTIFACT=${ARTIFACT:-/artifacts/jmclient-production-latest.tar}
ENV SERVER_API_URL=${SERVER_API_URL:-http://localhost:2701/api}

ADD ${ARTIFACT} /usr/share/nginx/html
EXPOSE 80
ENTRYPOINT ["nginx", "-g daemon off;"]
