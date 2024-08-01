
# Base image
FROM certbot/certbot

COPY ./data/certbot/conf /etc/letsencrypt
COPY  ./data/certbot/www /var/www/certbot

# Entrypoint to renew certificates
ENTRYPOINT ["/bin/sh", "-c", "trap exit TERM; while :; do certbot renew; sleep 12h & wait $${!}; done;"]
