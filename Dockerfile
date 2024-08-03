
FROM nginx
RUN cp ./default.conf /etc/nginx/conf.d/default.conf
# 컨테이너의 80번 포트를 열어준다.

