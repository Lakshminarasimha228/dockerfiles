# FROM almalinux:9
# RUN dnf install nginx -y
# RUN rm -rf /usr/share/nginx/html/index.html
# COPY 2048/ /usr/share/nginx/html/
# RUN chmod +r /usr/share/nginx/html/index.html
# CMD ["nginx", "-g", "daemon off;"]


FROM almalinux:9
RUN dnf install nginx -y
RUN rm -rf /usr/share/nginx/html/*
COPY 2048/templates/index.html /usr/share/nginx/html/
COPY 2048/static/ /usr/share/nginx/html/static/
RUN chmod +r /usr/share/nginx/html/index.html
CMD ["nginx", "-g", "daemon off;"]
