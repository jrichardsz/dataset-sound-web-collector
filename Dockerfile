FROM node:16

COPY . /usr/src/app
WORKDIR /usr/src/app
RUN npm install
EXPOSE 2708

COPY docker-entrypoint.sh /usr/local/bin/docker-entrypoint.sh
RUN chmod 744 /usr/local/bin/docker-entrypoint.sh
ENTRYPOINT ["docker-entrypoint.sh"]