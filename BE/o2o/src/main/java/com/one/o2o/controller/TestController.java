package com.one.o2o.controller;

import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping()
public class TestController {

    @GetMapping("favicon.ico")
    @ResponseBody
    public void returnNoFavicon() {
    }

    @GetMapping("/test")
    public String testPage(){
        return "Hello world 123";
    }

    @GetMapping("/test/2")
    public String testPage2(){
        return "Hello world 2";
    }
}
