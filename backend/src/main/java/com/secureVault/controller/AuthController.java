package com.secureVault.controller;

import com.secureVault.dto.AuthResponse;
import com.secureVault.dto.LoginDto;
import com.secureVault.dto.RequestDto;
import com.secureVault.entities.User;
import com.secureVault.service.AuthService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.security.core.Authentication;


@RestController
@RequestMapping("/api/auth")
public class AuthController {

    private final AuthService authService;

    public AuthController(AuthService authService){
        this.authService= authService;
    }

    @PostMapping("/register")
    public ResponseEntity<User> register(@Valid @RequestBody RequestDto request){

        User user = authService.register(request);
        return ResponseEntity.status(HttpStatus.OK).body(user);
    }

    @PostMapping("/login")
    public ResponseEntity<AuthResponse> login(
            @Valid @RequestBody LoginDto request
    ) {

        AuthResponse response = authService.login(request);

        return ResponseEntity.ok(response);
    }

    @GetMapping("/me")
    public ResponseEntity<?> getCurrentUser(Authentication authentication) {
        return ResponseEntity.ok(authentication.getName());
    }
}
