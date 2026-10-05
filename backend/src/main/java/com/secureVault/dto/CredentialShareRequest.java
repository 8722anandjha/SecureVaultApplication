package com.secureVault.dto;

import com.secureVault.entities.SharePermission;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class CredentialShareRequest {

    @NotBlank(message = "User email is required")
    @Email(message = "Invalid email address")
    private String email;

    @NotNull(message = "Permission is required")
    private SharePermission permission;
}