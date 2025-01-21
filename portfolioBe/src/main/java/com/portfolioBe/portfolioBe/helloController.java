package com.portfolioBe.portfolioBe;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@CrossOrigin(origins = "http://localhost:5173")

public class helloController {

    @GetMapping("/api/hello")
    public String sayHello() {
        return "Hello from the Backend Vinicius!";
    }
}
