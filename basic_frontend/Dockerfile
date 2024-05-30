#stage 1
FROM node:latest as node
WORKDIR /app
COPY . .
RUN npm install
RUN npm run build --prod

#stage 2
FROM nginx:alpine
COPY ./proxy/nginx.tmpl /app/
COPY --from=node /app/dist/basic_frontend /usr/share/nginx/html
CMD ["/bin/sh", "-c", "/usr/local/bin/envsubst < /app/nginx.tmpl > /etc/nginx/nginx.conf & nginx -g 'daemon off;'"]

