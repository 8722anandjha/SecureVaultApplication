package com.secureVault.controller;

import com.secureVault.dto.PasswordGenerateRequest;
import com.secureVault.dto.PasswordGenerateResponse;
import com.secureVault.dto.PasswordStrengthResponse;
import com.secureVault.service.PasswordGeneratorService;
import com.secureVault.service.PasswordStrengthService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/passwords")
@RequiredArgsConstructor
public class PasswordGeneratorController {

    private final PasswordGeneratorService passwordGeneratorService;
    private final PasswordStrengthService passwordStrengthService;

    @PostMapping("/generate")
    public ResponseEntity<PasswordGenerateResponse> generatePassword(
            @Valid @RequestBody PasswordGenerateRequest request
    ) {

        String password =
                passwordGeneratorService.generatePassword(
                        request.getLength(),
                        request.isIncludeUppercase(),
                        request.isIncludeLowercase(),
                        request.isIncludeNumbers(),
                        request.isIncludeSymbols()
                );

        PasswordStrengthResponse strength =
                passwordStrengthService.analyze(
                        password
                );
        PasswordGenerateResponse response =
                new PasswordGenerateResponse(
                        password,
                        password.length(),
                        strength.getScore(),
                        strength.getStrength()
                );

        return ResponseEntity.ok(response);
    }
}