FROM nginx
COPY ./default.conf /etc/nginx/conf.d/default.conf

COPY . .

EXPOSE 80
EXPOSE 443
# Nginx를 실행합니다.
CMD ["nginx", "-g", "daemon off;"]
