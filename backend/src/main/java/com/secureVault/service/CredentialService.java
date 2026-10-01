package com.secureVault.service;

import com.secureVault.common.exception.CredentialNotFoundException;
import com.secureVault.dto.CredentialRequest;
import com.secureVault.dto.CredentialResponse;
import com.secureVault.entities.Credential;
import com.secureVault.entities.User;
import com.secureVault.repository.CredentialRepository;
import com.secureVault.repository.UserRepository;

import com.secureVault.security.EncryptionService;
import lombok.AllArgsConstructor;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@AllArgsConstructor
public class CredentialService {

    private final CredentialRepository credentialRepository;
    private final UserRepository userRepository;
    private final EncryptionService encryptionService;

    @Transactional
    public CredentialResponse createCredential(
            CredentialRequest request,
            String email
    ) {
        User user = getUserByEmail(email);

        Credential credential = new Credential();

        credential.setTitle(request.getTitle());
        credential.setUsername(request.getUsername());
        credential.setPassword(encryptionService.encrypt(
                request.getPassword()
        ));
        credential.setUrl(request.getUrl());
        credential.setType(request.getType());
        credential.setNotes(request.getNotes());
        credential.setFavorite(request.isFavorite());
        credential.setUser(user);

        Credential savedCredential =
                credentialRepository.save(credential);

        return mapToResponse(savedCredential);
    }

    @Transactional(readOnly = true)
    public List<CredentialResponse> getAllCredentials(
            String email
    ) {
        User user = getUserByEmail(email);

        return credentialRepository.findByUser(user)
                .stream()
                .map(this::mapToResponse)
                .toList();
    }

    @Transactional(readOnly = true)
    public CredentialResponse getCredential(
            Long id,
            String email
    ) {
        User user = getUserByEmail(email);

        Credential credential =
                credentialRepository
                        .findByIdAndUser(id, user)
                        .orElseThrow(() ->
                                new CredentialNotFoundException(
                                        "Credential not found"
                                )
                        );

        return mapToResponse(credential);
    }

    @Transactional
    public CredentialResponse updateCredential(
            Long id,
            CredentialRequest request,
            String email
    ) {
        User user = getUserByEmail(email);

        Credential credential =
                credentialRepository
                        .findByIdAndUser(id, user)
                        .orElseThrow(() ->
                                new CredentialNotFoundException(
                                        "Credential not found"
                                )
                        );

        credential.setTitle(request.getTitle());
        credential.setUsername(request.getUsername());
        credential.setPassword(
                encryptionService.encrypt(
                        request.getPassword()
                )
        );
        credential.setUrl(request.getUrl());
        credential.setType(request.getType());
        credential.setNotes(request.getNotes());
        credential.setFavorite(request.isFavorite());

        Credential updatedCredential =
                credentialRepository.save(credential);

        return mapToResponse(updatedCredential);
    }

    @Transactional
    public void deleteCredential(
            Long id,
            String email
    ) {
        User user = getUserByEmail(email);

        Credential credential =
                credentialRepository
                        .findByIdAndUser(id, user)
                        .orElseThrow(() ->
                                new CredentialNotFoundException(
                                        "Credential not found"
                                )
                        );

        credentialRepository.delete(credential);
    }

    private User getUserByEmail(String email) {
        return userRepository.findByEmail(email)
                .orElseThrow(() ->
                        new RuntimeException("User not found")
                );
    }

    private CredentialResponse mapToResponse(
            Credential credential
    ) {
        return new CredentialResponse(
                credential.getId(),
                credential.getTitle(),
                credential.getUsername(),
                encryptionService.decrypt(
                        credential.getPassword()
                ),
                credential.getUrl(),
                credential.getType(),
                credential.getNotes(),
                credential.isFavorite(),
                credential.getCreatedAt(),
                credential.getUpdatedAt()
        );
    }
}