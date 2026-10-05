package com.secureVault.entities;

import com.secureVault.entities.User;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;

@Entity
@Table(
        name = "credential_shares",
        uniqueConstraints = {
                @UniqueConstraint(
                        name = "uk_credential_shared_user",
                        columnNames = {
                                "credential_id",
                                "shared_with_id"
                        }
                )
        }
)
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class CredentialShare {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(
            name = "credential_id",
            nullable = false
    )
    private Credential credential;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(
            name = "shared_with_id",
            nullable = false
    )
    private User sharedWith;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false, length = 30)
    private SharePermission permission;

    @Column
    private LocalDateTime expiresAt;

    @Column(nullable = false, updatable = false)
    private LocalDateTime createdAt;

    @PrePersist
    protected void onCreate() {

        createdAt = LocalDateTime.now();
    }
}