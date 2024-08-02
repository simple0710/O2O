FROM openjdk:17-jdk-alpine

# 작업 디렉토리 설정
WORKDIR /app

COPY . .


RUN ls -al

RUN pwd
# Gradle 빌드 함!
#RUN rm -rf .gradle

RUN chmod +x ./gradlew && ./gradlew clean build
RUN ls -al ./build/libs/
ARG JAR_FILE=./build/libs/*.jar
ENV JAR_FILE=${JAR_FILE}
COPY ${JAR_FILE} ./app.jar

#ENV TZ=Asia/Seoul
ENTRYPOINT ["java", "-jar", "./app.jar"]
