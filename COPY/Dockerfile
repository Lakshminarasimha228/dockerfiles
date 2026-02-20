# FROM almalinux:9
# RUN dnf install nginx -y
# RUN rm -rf /usr/share/nginx/html/index.html
# COPY 2048/ /usr/share/nginx/html/
# RUN chmod +r /usr/share/nginx/html/index.html
# CMD ["nginx", "-g", "daemon off;"]




# FROM almalinux:9

# RUN dnf install nginx -y && \
#     rm -rf /usr/share/nginx/html/* && \
#     dnf clean all

# COPY 2048/templates/index.html /usr/share/nginx/html/
# COPY 2048/static/ /usr/share/nginx/html/static/

# CMD ["nginx", "-g", "daemon off;"]



FROM almalinux:9

RUN dnf install nginx -y && \
    rm -rf /usr/share/nginx/html/* && \
    dnf clean all

COPY Hireme/templates/index.html /usr/share/nginx/html/
COPY Hireme/static/ /usr/share/nginx/html/static/
COPY Hireme/gameover/ /usr/share/nginx/html/gameover/
COPY Hireme/over.js /usr/share/nginx/html/over.js
COPY Hireme/over.css /usr/share/nginx/html/over.css
COPY Hireme/restart.js /usr/share/nginx/html/restart.js
COPY Hireme/restart.css /usr/share/nginx/html/restart.css
COPY Hireme/README.md /usr/share/nginx/html/README.md
RUN chmod +r /usr/share/nginx/html/index.html
RUN chmod +r /usr/share/nginx/html/over.js
RUN chmod +r /usr/share/nginx/html/over.css
RUN chmod +r /usr/share/nginx/html/restart.js
RUN chmod +r /usr/share/nginx/html/restart.css
RUN chmod +r /usr/share/nginx/html/README.md


CMD ["nginx", "-g", "daemon off;"]