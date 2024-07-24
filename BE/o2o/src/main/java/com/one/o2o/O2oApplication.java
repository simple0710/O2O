package com.one.o2o;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.one.o2o.dto.PageInfoDto;
import com.one.o2o.dto.ProductsRequestDto;
import com.one.o2o.dto.ResponseDto;
import com.one.o2o.entity.ProductsRequest;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import java.util.Arrays;

@SpringBootApplication
public class O2oApplication {

	public static void main(String[] args) {
		SpringApplication.run(O2oApplication.class, args);
		System.out.println("Hello World - 0724");
		// RequestDto 객체 생성 및 값 설정
		ProductsRequestDto request1 = new ProductsRequestDto(new ProductsRequest());
		ProductsRequestDto request2 = new ProductsRequestDto(new ProductsRequest());

		// PageInfoDto 객체 생성 및 값 설정
		PageInfoDto pageInfo = new PageInfoDto();
		pageInfo.setReqs(Arrays.asList(request1, request2));
		pageInfo.setCurPg(1);
		pageInfo.setTotalPg(10);
		pageInfo.setTotalReqs(100);

		// ResponseDto 객체 생성 및 값 설정
		ResponseDto response = new ResponseDto();
		response.setStatus(200);
		response.setMessage("요청 비품 목록 관리 페이지 이동 성공");
		response.setData(pageInfo);

		// ObjectMapper를 사용하여 JSON 문자열로 변환
		ObjectMapper objectMapper = new ObjectMapper();
		try {
			String jsonResponse = objectMapper.writeValueAsString(response);
			System.out.println(jsonResponse);
		} catch (JsonProcessingException e) {
			e.printStackTrace();
		}
	}

}
