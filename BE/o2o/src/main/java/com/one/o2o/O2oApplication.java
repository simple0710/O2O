package com.one.o2o;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.jdbc.DataSourceAutoConfiguration;

@SpringBootApplication(exclude={DataSourceAutoConfiguration.class})
public class O2oApplication {

	public static void main(String[] args) {
		SpringApplication.run(O2oApplication.class, args);
		System.out.println("Hello");
	}

}
