FROM node:20 AS build

WORKDIR /app/client

COPY package*.json ./

RUN npm install

COPY . .

COPY .env ./

RUN npm run build

FROM nginx:1.23.3-alpine

COPY ./nginx/default.conf /etc/nginx/conf.d/default.conf

COPY --from=build /app/client/build /usr/share/nginx/html

EXPOSE 2000
