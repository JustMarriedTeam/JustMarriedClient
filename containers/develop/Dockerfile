# This container binds itself to the local code but uses internal execution environment.
FROM node:6.10.3
MAINTAINER gurgul.grzegorz@gmail.com

# This tells webpack to build development version
ENV ENVIRONMENT=development

COPY containers/develop/develop.entrypoint.sh /develop.entrypoint.sh
VOLUME /app

WORKDIR /app

ENTRYPOINT ["/develop.entrypoint.sh"]
CMD ["run", "serve", "--no-hmr"]
