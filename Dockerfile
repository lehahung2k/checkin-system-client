# Dockerfile.prod
FROM nginx:alpine

# Copy build files from the 'build' directory
COPY ./build /usr/share/nginx/html

# Expose the port Nginx will run on
EXPOSE 80

# Start Nginx
CMD ["nginx", "-g", "daemon off;"]
