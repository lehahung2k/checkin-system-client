# Dockerfile.prod
FROM nginx:alpine

# Copy build files from the 'build' directory
COPY ./build /usr/share/nginx/html
COPY ./nginx/default.conf /etc/nginx/conf.d/default.conf

# Expose the port Nginx will run on
EXPOSE 2000

# Start Nginx
CMD ["nginx", "-g", "daemon off;"]
