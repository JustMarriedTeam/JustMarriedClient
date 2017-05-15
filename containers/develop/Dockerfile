# This container binds itself to the local code but uses internal execution environment.
FROM node:6.10.3
MAINTAINER gurgul.grzegorz@gmail.com

ENV ENVIRONMENT=development

COPY containers/develop/develop.entrypoint.sh /develop.entrypoint.sh
VOLUME /app

ENTRYPOINT ["/develop.entrypoint.sh"]
ONBUILD RUN /develop.entrypoint.sh

CMD ["run", "serve", "--no-hmr"]
