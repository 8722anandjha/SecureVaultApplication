package com.secureVault.dto;

import com.secureVault.entities.SharePermission;
import jakarta.validation.constraints.Future;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class CredentialShareUpdateRequest {

    @NotNull(message = "Permission is required")
    private SharePermission permission;

    @Future(message = "Expiration time must be in the future")
    private LocalDateTime expiresAt;
}