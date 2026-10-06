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

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@AllArgsConstructor
public class CredentialService {

    private final CredentialRepository credentialRepository;
    private final UserRepository userRepository;
    private final EncryptionService encryptionService;
    private final CredentialPermissionService credentialPermissionService;
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

    public CredentialResponse updateCredential(
            Long credentialId,
            CredentialRequest request,
            User currentUser
    ) {

        Credential credential =
                credentialRepository
                        .findById(credentialId)
                        .orElseThrow(() ->
                                new RuntimeException(
                                        "Credential not found"
                                )
                        );

        credentialPermissionService.canEdit(
                credential,
                currentUser
        );

        credential.setTitle(
                request.getTitle()
        );

        credential.setUsername(
                request.getUsername()
        );

        credential.setUrl(
                request.getUrl()
        );

        credential.setType(
                request.getType()
        );

        credential.setNotes(
                request.getNotes()
        );

        credential.setFavorite(
                request.isFavorite()
        );

        if (request.getPassword() != null
                && !request.getPassword().isBlank()) {

            credential.setPassword(
                    encryptionService.encrypt(
                            request.getPassword()
                    )
            );
        }

        Credential updated =
                credentialRepository.save(credential);

        return mapToResponse(updated);
    }

    public void deleteCredential(
            Long credentialId,
            User currentUser
    ) {

        Credential credential =
                credentialRepository
                        .findById(credentialId)
                        .orElseThrow(() ->
                                new RuntimeException(
                                        "Credential not found"
                                )
                        );

        credentialPermissionService.canManage(
                credential,
                currentUser
        );

        credentialRepository.delete(
                credential
        );
    }

    public String getCredentialPassword(
            Long credentialId,
            User currentUser
    ) {

        Credential credential =
                credentialRepository
                        .findById(credentialId)
                        .orElseThrow(() ->
                                new RuntimeException(
                                        "Credential not found"
                                )
                        );

        credentialPermissionService.canView(
                credential,
                currentUser
        );

        return encryptionService.decrypt(
                credential.getPassword()
        );
    }

    public CredentialResponse getAccessibleCredential(
            Long credentialId,
            User currentUser
    ) {

        Credential credential =
                credentialRepository
                        .findById(credentialId)
                        .orElseThrow(() ->
                                new RuntimeException(
                                        "Credential not found"
                                )
                        );

        credentialPermissionService.canView(
                credential,
                currentUser
        );

        return mapToResponse(credential);
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