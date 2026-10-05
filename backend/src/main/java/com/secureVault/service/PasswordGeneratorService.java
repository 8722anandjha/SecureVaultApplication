package com.secureVault.service;

import org.springframework.stereotype.Service;

import java.security.SecureRandom;

@Service
public class PasswordGeneratorService {

    private static final String LOWERCASE =
            "abcdefghijklmnopqrstuvwxyz";

    private static final String UPPERCASE =
            "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

    private static final String NUMBERS =
            "0123456789";

    private static final String SYMBOLS =
            "!@#$%^&*()-_=+[]{};:,.?/";

    private final SecureRandom secureRandom =
            new SecureRandom();


    public String generatePassword(
            int length,
            boolean includeUppercase,
            boolean includeLowercase,
            boolean includeNumbers,
            boolean includeSymbols
    ) {

        StringBuilder characterPool =
                new StringBuilder();

        if (includeLowercase) {
            characterPool.append(LOWERCASE);
        }

        if (includeUppercase) {
            characterPool.append(UPPERCASE);
        }

        if (includeNumbers) {
            characterPool.append(NUMBERS);
        }

        if (includeSymbols) {
            characterPool.append(SYMBOLS);
        }

        if (characterPool.isEmpty()) {
            throw new IllegalArgumentException(
                    "At least one character type must be selected"
            );
        }

        if (length < 8 || length > 128) {
            throw new IllegalArgumentException(
                    "Password length must be between 8 and 128"
            );
        }

        StringBuilder password =
                new StringBuilder(length);

        for (int i = 0; i < length; i++) {

            int randomIndex =
                    secureRandom.nextInt(
                            characterPool.length()
                    );

            password.append(
                    characterPool.charAt(randomIndex)
            );
        }

        return password.toString();
    }
}