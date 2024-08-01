# Base image
FROM certbot/certbot

COPY ./data/certbot/conf /etc/letsencrypt
COPY  ./data/certbot/www /var/www/certbot

# Entrypoint to renew certificates
ENTRYPOINT ["/bin/sh", "-c", "trap exit TERM; while :; do certbot renew; sleep 12h & wait $${!}; done;"]

FROM nginx
COPY ./default.conf /etc/nginx/conf.d/default.conf

COPY . .

EXPOSE 80
EXPOSE 443
# Nginx를 실행합니다.
CMD ["nginx", "-g", "daemon off;"]
