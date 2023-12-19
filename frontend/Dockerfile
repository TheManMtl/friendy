# FROM nginx:alpine

# COPY ./frontend/build /usr/share/nginx/html

# RUN rm /etc/nginx/conf.d/default.conf  # <= This line solved my issue
# COPY ./frontend/nginx.conf /etc/nginx/conf.d
# EXPOSE 80
# CMD ["nginx", "-g", "daemon off;"]

#################################################################

# Use the official Nginx image based on Alpine
FROM nginx:alpine
# Set the working directory to /usr/share/nginx/html
WORKDIR /usr/share/nginx/html
# Copy the package.json and package-lock.json files to the working directory
COPY ./frontend/package*.json ./
# Install Node.js and npm
RUN apk add --update nodejs npm
# Install project dependencies
#RUN npm install
# Copy the rest of the application code
COPY ./frontend .
# Run npm run build to build the React app
RUN npm run build
# Remove the default Nginx configuration
RUN rm /etc/nginx/conf.d/default.conf
# Copy the Nginx configuration file for your app
COPY ./frontend/nginx.conf /etc/nginx/conf.d
# Expose port 80
EXPOSE 80
# Start Nginx and keep it running in the foreground
CMD ["nginx", "-g", "daemon off;"]