package com.secureVault.repository;

import com.secureVault.entities.Credential;
import com.secureVault.entities.CredentialShare;
import com.secureVault.entities.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface CredentialShareRepository
        extends JpaRepository<CredentialShare, Long> {

    List<CredentialShare> findAllByCredential(
            Credential credential
    );

    Optional<CredentialShare> findByCredentialAndSharedWith(
            Credential credential,
            User sharedWith
    );

    boolean existsByCredentialAndSharedWith(
            Credential credential,
            User sharedWith
    );

    void deleteByCredentialAndSharedWith(
            Credential credential,
            User sharedWith
    );
}