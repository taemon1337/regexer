FROM node:alpine

RUN npm install --production loopback loopback-connector-mongodb

WORKDIR /api

COPY ./ /api

CMD npm start

