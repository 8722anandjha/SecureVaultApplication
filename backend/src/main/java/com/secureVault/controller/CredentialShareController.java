package com.secureVault.controller;

import com.secureVault.dto.CredentialShareRequest;
import com.secureVault.dto.CredentialShareResponse;
import com.secureVault.entities.User;
import com.secureVault.repository.UserRepository;
import com.secureVault.service.CredentialShareService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/credentials")
@RequiredArgsConstructor
public class CredentialShareController {

    private final CredentialShareService credentialShareService;
    private final UserRepository userRepository;
    @PostMapping("/{credentialId}/shares")
    public ResponseEntity<CredentialShareResponse> shareCredential(
            @PathVariable Long credentialId,
            @Valid @RequestBody CredentialShareRequest request,
            Authentication authentication
    ) {

        String email = authentication.getName();

        User currentUser = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));

        CredentialShareResponse response =
                credentialShareService.shareCredential(
                        credentialId,
                        request,
                        currentUser
                );

        return ResponseEntity.ok(response);
    }

    @GetMapping("/{credentialId}/shares")
    public ResponseEntity<List<CredentialShareResponse>> getShares(
            @PathVariable Long credentialId,
            Authentication authentication
    ) {

        String email = authentication.getName();

        User currentUser = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));

        return ResponseEntity.ok(
                credentialShareService.getShares(
                        credentialId,
                        currentUser
                )
        );
    }

    @DeleteMapping("/{credentialId}/shares/{shareId}")
    public ResponseEntity<Void> revokeShare(
            @PathVariable Long credentialId,
            @PathVariable Long shareId,
            Authentication authentication
    ) {

        String email = authentication.getName();

        User currentUser = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));

        credentialShareService.revokeShare(
                credentialId,
                shareId,
                currentUser
        );

        return ResponseEntity.noContent()
                .build();
    }
}