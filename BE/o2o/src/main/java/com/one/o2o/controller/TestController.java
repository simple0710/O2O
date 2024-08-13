package com.one.o2o.controller;

import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping()
public class TestController {

    @GetMapping("favicon.ico")
    @ResponseBody
    public void returnNoFavicon() {
    }
출처: https://lloydkwon.tistory.com/entry/spring-mvc-favicon-에러 [새벽을 기다리는 파수꾼처럼:티스토리]

    @GetMapping("/test")
    public String testPage(){
        return "Hello world 123";
    }

    @GetMapping("/test/2")
    public String testPage2(){
        return "Hello world 2";
    }
}
