package com.one.o2o;

import lombok.extern.slf4j.Slf4j;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.scheduling.annotation.EnableScheduling;

@EnableScheduling
@SpringBootApplication
@Slf4j
public class O2oApplication {
	public static void main(String[] args) {
		SpringApplication.run(O2oApplication.class, args);
		System.out.println("Hello World - 0724");
		log.info("테스트");
	}
}
