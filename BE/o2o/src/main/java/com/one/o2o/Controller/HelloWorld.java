package com.one.o2o.Controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class HelloWorld {
    @GetMapping("/helloworld")
    public ResponseEntity<?> helloWorld(){
        return new ResponseEntity<>("Hello World!!", HttpStatus.OK);
    }
}
