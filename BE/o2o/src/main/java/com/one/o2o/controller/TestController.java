package com.one.o2o.controller;

import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/test")
public class TestController {

    @GetMapping()
    public String testPage(){
        return "Hello world";
    }
}
