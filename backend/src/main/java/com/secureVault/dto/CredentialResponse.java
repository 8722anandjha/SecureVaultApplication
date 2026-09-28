package com.secureVault.dto;


import com.secureVault.entities.CredentialType;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class CredentialResponse {

    private Long id;

    private String title;

    private String username;

    private String password;

    private String url;

    private CredentialType type;

    private String notes;

    private boolean favorite;

    private LocalDateTime createdAt;

    private LocalDateTime updatedAt;
}