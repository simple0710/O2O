
# Base image
FROM certbot/certbot

VOLUME ["/etc/letsencrypt"]
VOLUME ["/var/www/certbot"]


# Entrypoint to renew certificates
ENTRYPOINT ["/bin/sh", "-c", "trap exit TERM; while :; do certbot renew; sleep 12h & wait $${!}; done;"]
