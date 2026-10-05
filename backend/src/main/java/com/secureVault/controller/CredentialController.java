package com.secureVault.controller;

import com.secureVault.dto.CredentialRequest;
import com.secureVault.dto.CredentialResponse;
import com.secureVault.entities.User;
import com.secureVault.repository.UserRepository;
import com.secureVault.service.CredentialService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/credentials")
@RequiredArgsConstructor
public class CredentialController {

    private final CredentialService credentialService;
    private final UserRepository userRepository;
    @PostMapping
    public ResponseEntity<CredentialResponse> createCredential(
            @Valid @RequestBody CredentialRequest request,
            Authentication authentication
    ) {
        CredentialResponse response =
                credentialService.createCredential(
                        request,
                        authentication.getName()
                );

        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body(response);
    }

    @GetMapping
    public ResponseEntity<List<CredentialResponse>> getAllCredentials(
            Authentication authentication
    ) {
        return ResponseEntity.ok(
                credentialService.getAllCredentials(
                        authentication.getName()
                )
        );
    }

    @GetMapping("/{id}")
    public ResponseEntity<CredentialResponse> getCredential(
            @PathVariable Long id,
            Authentication authentication
    ) {
        return ResponseEntity.ok(
                credentialService.getCredential(
                        id,
                        authentication.getName()
                )
        );
    }

    @PutMapping("/{id}")
    public ResponseEntity<CredentialResponse> updateCredential(
            @PathVariable Long id,
            @Valid @RequestBody CredentialRequest request,
            Authentication authentication
    ) {
        return ResponseEntity.ok(
                credentialService.updateCredential(
                        id,
                        request,
                        authentication.getName()
                )
        );
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteCredential(
            @PathVariable Long id,
            Authentication authentication
    ) {
        credentialService.deleteCredential(
                id,
                authentication.getName()
        );

        return ResponseEntity.noContent().build();
    }

    @GetMapping("/{id}/password")
    public ResponseEntity<String> getCredentialPassword(
            @PathVariable Long id,
            Authentication authentication
    ) {

        String email = authentication.getName();

        User currentUser = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));

        String password =
                credentialService.getCredentialPassword(
                        id,
                        currentUser
                );

        return ResponseEntity.ok(password);
    }
}

