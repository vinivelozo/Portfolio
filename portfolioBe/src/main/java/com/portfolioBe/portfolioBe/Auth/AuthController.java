package com.portfolioBe.portfolioBe.Auth;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = {"http://localhost:5174", "https://portfolio-b3qf.vercel.app"})

public class AuthController {

    private final AdminConfig adminConfig;

    public AuthController(AdminConfig adminConfig) {
        this.adminConfig = adminConfig;
    }

    @PostMapping("/login")
    public ResponseEntity<?> authenticateUser(@RequestBody LoginRequestDTO loginRequest) {
        System.out.println("🔹 Received username: " + loginRequest.getUsername());
        System.out.println("🔹 Received password: " + loginRequest.getPassword());

        if (adminConfig.getUsername().equals(loginRequest.getUsername()) &&
                adminConfig.getPassword().equals(loginRequest.getPassword())) {
            String token = "mocked-jwt-token"; // Replace with real JWT in production
            return ResponseEntity.ok(Map.of("token", token));
        }
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid credentials");
    }
}

