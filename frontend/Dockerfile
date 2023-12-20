 FROM nginx:alpine

#E
#  RUN rm -rf /etc/nginx/conf.d/default.conf
#  COPY ./frontend/conf /etc/nginx
  COPY ./frontend/build /usr/share/nginx/html
#  EXPOSE 80
#  CMD ["nginx", "-g", "daemon off;"]

#D
RUN rm /etc/nginx/conf.d/default.conf  
COPY ./frontend/nginx.conf /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]

#################################################################

