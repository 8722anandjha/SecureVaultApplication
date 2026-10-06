package com.secureVault.service;


import com.secureVault.dto.CredentialShareRequest;
import com.secureVault.dto.CredentialShareResponse;
import com.secureVault.dto.CredentialShareUpdateRequest;
import com.secureVault.entities.Credential;
import com.secureVault.entities.CredentialShare;
import com.secureVault.entities.User;
import com.secureVault.repository.CredentialRepository;
import com.secureVault.repository.CredentialShareRepository;
import com.secureVault.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class CredentialShareService {

    private final CredentialRepository credentialRepository;

    private final CredentialShareRepository credentialShareRepository;

    private final UserRepository userRepository;

    public CredentialShareResponse shareCredential(
            Long credentialId,
            CredentialShareRequest request,
            User currentUser
    ) {

        Credential credential =
                credentialRepository
                        .findByIdAndUser(
                                credentialId,
                                currentUser
                        )
                        .orElseThrow(() ->
                                new RuntimeException(
                                        "Credential not found"
                                )
                        );

        User sharedWith =
                userRepository
                        .findByEmail(request.getEmail())
                        .orElseThrow(() ->
                                new RuntimeException(
                                        "User not found"
                                )
                        );

        if (sharedWith.getId()
                .equals(currentUser.getId())) {

            throw new RuntimeException(
                    "You cannot share a credential with yourself"
            );
        }

        if (credentialShareRepository
                .existsByCredentialAndSharedWith(
                        credential,
                        sharedWith
                )) {

            throw new RuntimeException(
                    "Credential is already shared with this user"
            );
        }

        CredentialShare share =
                new CredentialShare();

        share.setCredential(credential);
        share.setSharedWith(sharedWith);
        share.setPermission(
                request.getPermission()
        );
        share.setExpiresAt(
                request.getExpiresAt()
        );

        CredentialShare savedShare =
                credentialShareRepository.save(share);

        return mapToResponse(savedShare);
    }

    public List<CredentialShareResponse> getShares(
            Long credentialId,
            User currentUser
    ) {

        Credential credential =
                credentialRepository
                        .findByIdAndUser(
                                credentialId,
                                currentUser
                        )
                        .orElseThrow(() ->
                                new RuntimeException(
                                        "Credential not found"
                                )
                        );

        return credentialShareRepository
                .findAllByCredential(credential)
                .stream()
                .map(this::mapToResponse)
                .toList();
    }

    public void revokeShare(
            Long credentialId,
            Long shareId,
            User currentUser
    ) {

        Credential credential =
                credentialRepository
                        .findByIdAndUser(
                                credentialId,
                                currentUser
                        )
                        .orElseThrow(() ->
                                new RuntimeException(
                                        "Credential not found"
                                )
                        );

        CredentialShare share =
                credentialShareRepository
                        .findById(shareId)
                        .orElseThrow(() ->
                                new RuntimeException(
                                        "Share not found"
                                )
                        );

        if (!share.getCredential()
                .getId()
                .equals(credential.getId())) {

            throw new RuntimeException(
                    "Invalid share"
            );
        }

        credentialShareRepository.delete(share);
    }

    public CredentialShareResponse updateShare(
            Long credentialId,
            Long shareId,
            CredentialShareUpdateRequest request,
            User currentUser
    ) {

        Credential credential =
                credentialRepository
                        .findByIdAndUser(
                                credentialId,
                                currentUser
                        )
                        .orElseThrow(() ->
                                new RuntimeException(
                                        "Credential not found"
                                )
                        );

        CredentialShare share =
                credentialShareRepository
                        .findById(shareId)
                        .orElseThrow(() ->
                                new RuntimeException(
                                        "Share not found"
                                )
                        );

        if (!share.getCredential()
                .getId()
                .equals(credential.getId())) {

            throw new RuntimeException(
                    "Invalid share"
            );
        }

        share.setPermission(
                request.getPermission()
        );

        share.setExpiresAt(
                request.getExpiresAt()
        );

        CredentialShare updated =
                credentialShareRepository.save(share);

        return mapToResponse(updated);
    }

    private CredentialShareResponse mapToResponse(
            CredentialShare share
    ) {

        return new CredentialShareResponse(
                share.getId(),
                share.getCredential().getId(),
                share.getSharedWith().getEmail(),
                share.getPermission(),
                share.getExpiresAt(),
                share.getCreatedAt()
        );
    }
}