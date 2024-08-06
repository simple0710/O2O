
FROM nginx

COPY /usr/src/app/build /usr/share/nginx/html

COPY ./default.conf /etc/nginx/conf.d/default.conf

# 컨테이너의 80번 포트를 열어준다.

CMD ["nginx", "-g", "daemon off;"]
