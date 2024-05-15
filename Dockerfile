FROM node:20 AS build

WORKDIR /app/client

COPY package*.json ./

RUN npm install

COPY . .

# Build arguments
ARG ENV=local

COPY .env.${ENV} .env

RUN npm run build

FROM nginx:1.23.3-alpine

COPY ./nginx/default.conf /etc/nginx/conf.d/default.conf

COPY --from=build /app/client/build /usr/share/nginx/html

# Expose the port Nginx will run on
EXPOSE 2000

# Start Nginx
CMD ["nginx", "-g", "daemon off;"]
