FROM node:16

COPY . /opt/
WORKDIR /opt/
RUN npm install
ENV PORT 80
EXPOSE 80

ENTRYPOINT ["npm","run","start"]