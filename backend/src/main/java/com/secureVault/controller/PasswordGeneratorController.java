package com.secureVault.controller;

import com.secureVault.dto.PasswordGenerateRequest;
import com.secureVault.dto.PasswordGenerateResponse;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/passwords")
@RequiredArgsConstructor
public class PasswordGeneratorController {

    private final com.secureVault.password.PasswordGeneratorService passwordGeneratorService;


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

        PasswordGenerateResponse response =
                new PasswordGenerateResponse(
                        password,
                        password.length()
                );

        return ResponseEntity.ok(response);
    }
}