FROM almalinux:9
RUN dnf install nginx -y
RUN rm -rf /usr/share/nginx/html/index.html
COPY 2048/ /usr/share/nginx/html/
CMD ["nginx", "-g", "daemon off;"]