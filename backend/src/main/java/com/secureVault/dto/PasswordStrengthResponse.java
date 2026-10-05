package com.secureVault.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class PasswordStrengthResponse {

    private int score;

    private String strength;

    private List<String> feedback;
}