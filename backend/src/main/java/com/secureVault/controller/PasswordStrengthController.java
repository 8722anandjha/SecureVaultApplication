package com.secureVault.controller;



import com.secureVault.dto.PasswordStrengthRequest;
import com.secureVault.dto.PasswordStrengthResponse;
import com.secureVault.service.PasswordStrengthService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/passwords")
@RequiredArgsConstructor
public class PasswordStrengthController {

    private final PasswordStrengthService passwordStrengthService;


    @PostMapping("/strength")
    public ResponseEntity<PasswordStrengthResponse> analyzePassword(
            @Valid @RequestBody PasswordStrengthRequest request
    ) {

        PasswordStrengthResponse response =
                passwordStrengthService.analyze(
                        request.getPassword()
                );

        return ResponseEntity.ok(
                response
        );
    }
}