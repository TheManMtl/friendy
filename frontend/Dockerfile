FROM node:18.16.0-alpine3.17
RUN mkdir -p /opt/app
WORKDIR /opt/app
COPY package.json .
COPY package-lock.json .
RUN npm install
COPY src/ ./src
COPY public/ ./public
EXPOSE 3000
CMD [ "npm", "start"]