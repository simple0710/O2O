
FROM nginx

COPY ./build /usr/share/nginx/html  # 빌드된 파일을 Nginx의 HTML 디렉토리에 복사

COPY ./default.conf /etc/nginx/conf.d/default.conf

# 컨테이너의 80번 포트를 열어준다.

CMD ["nginx", "-g", "daemon off;"]
