FROM nginx:alpine

COPY ./frontend/build /usr/share/nginx/html

RUN rm /etc/nginx/conf.d/default.conf  
COPY ./frontend/nginx.conf /etc/nginx


