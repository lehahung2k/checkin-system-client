FROM node:20 AS build

ARG REACT_APP_BASE_URL=/api

WORKDIR /lehahung2k/checkin-client

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

FROM nginx:1.23.3-alpine

COPY ./nginx/default.conf /etc/nginx/conf.d/default.conf

COPY --from=build /lehahung2k/checkin-client/build /usr/share/nginx/html