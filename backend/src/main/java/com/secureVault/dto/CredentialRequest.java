package com.secureVault.dto;


import com.secureVault.entities.CredentialType;
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
public class CredentialRequest {

    @NotBlank(message = "Title is required")
    private String title;

    private String username;

    private String password;

    private String url;

    @NotNull(message = "Credential type is required")
    private CredentialType type;

    private String notes;

    private boolean favorite;
}