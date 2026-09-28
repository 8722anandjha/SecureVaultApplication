package com.secureVault.repository;

import com.secureVault.entities.Credential;
import com.secureVault.entities.User;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;
import java.util.Optional;

public interface CredentialRepository
        extends JpaRepository<Credential, Long> {

    List<Credential> findByUser(User user);

    Optional<Credential> findByIdAndUser(Long id, User user);
}