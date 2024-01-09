# Use an official Node runtime as a parent image
FROM node:latest

# Set the working directory in the container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json
# COPY package.json /usr/src/app
# Bundle app source
COPY ./backend .

# Install any needed packages
RUN npm install



# Build your TypeScript files
RUN npm run build

# Your app binds to port 3000 - use the EXPOSE instruction to have it mapped
EXPOSE 3000

# Define the command to run your app
CMD [ "node", "/src/app.ts" ]
 # replace 'src/app.js' with the path to your compiled app.js file