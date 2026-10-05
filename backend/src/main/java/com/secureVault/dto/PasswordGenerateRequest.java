package com.secureVault.dto;

import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class PasswordGenerateRequest {

    @Min(value = 8, message = "Password length must be at least 8")
    @Max(value = 128, message = "Password length cannot exceed 128")
    private int length = 20;

    private boolean includeUppercase = true;

    private boolean includeLowercase = true;

    private boolean includeNumbers = true;

    private boolean includeSymbols = true;
}