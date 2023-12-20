 FROM nginx:alpine

#E
 RUN rm -rf /etc/nginx/conf.d/default.conf
 COPY ./frontend/conf /etc/nginx
 COPY ./frontend/build /usr/share/nginx/html


#D
# RUN rm /etc/nginx/conf.d/default.conf  # <= This line solved my issue
# COPY ./frontend/nginx.conf /etc/nginx/conf.d
# EXPOSE 80
# CMD ["nginx", "-g", "daemon off;"]

#################################################################

