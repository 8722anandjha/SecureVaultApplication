package com.secureVault.dto;


import com.secureVault.entities.SharePermission;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class CredentialShareResponse {

    private Long id;

    private Long credentialId;

    private String sharedWithEmail;

    private SharePermission permission;

    private LocalDateTime expiresAt;

    private LocalDateTime createdAt;
}