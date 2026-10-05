package com.secureVault.service;


import com.secureVault.dto.PasswordStrengthResponse;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class PasswordStrengthService {


    public PasswordStrengthResponse analyze(
            String password
    ) {

        List<String> feedback =
                new ArrayList<>();

        if (password == null || password.isEmpty()) {

            feedback.add(
                    "Password cannot be empty"
            );

            return new PasswordStrengthResponse(
                    0,
                    "VERY_WEAK",
                    feedback
            );
        }


        int score = 0;


        /*
         * Length
         */
        if (password.length() >= 8) {
            score++;
        } else {
            feedback.add(
                    "Use at least 8 characters"
            );
        }


        if (password.length() >= 12) {
            score++;
        }


        if (password.length() >= 16) {
            score++;
        }


        /*
         * Lowercase
         */
        if (password.matches(".*[a-z].*")) {
            score++;
        } else {
            feedback.add(
                    "Add lowercase letters"
            );
        }


        /*
         * Uppercase
         */
        if (password.matches(".*[A-Z].*")) {
            score++;
        } else {
            feedback.add(
                    "Add uppercase letters"
            );
        }


        /*
         * Numbers
         */
        if (password.matches(".*\\d.*")) {
            score++;
        } else {
            feedback.add(
                    "Add numbers"
            );
        }


        /*
         * Symbols
         */
        if (password.matches(
                ".*[^a-zA-Z0-9].*"
        )) {

            score++;

        } else {

            feedback.add(
                    "Add special characters"
            );
        }


        /*
         * Repeated characters
         */
        if (hasRepeatedCharacters(password)) {

            score--;

            feedback.add(
                    "Avoid repeated characters"
            );
        }


        /*
         * Common weak passwords
         */
        if (isCommonPassword(password)) {

            score = 0;

            feedback.clear();

            feedback.add(
                    "This is a commonly used password"
            );
        }


        /*
         * Keep score between 0 and 4
         */
        score = Math.max(
                0,
                Math.min(score, 4)
        );


        String strength =
                getStrengthLabel(score);


        return new PasswordStrengthResponse(
                score,
                strength,
                feedback
        );
    }


    private String getStrengthLabel(
            int score
    ) {

        return switch (score) {

            case 0 -> "VERY_WEAK";

            case 1 -> "WEAK";

            case 2 -> "FAIR";

            case 3 -> "GOOD";

            case 4 -> "STRONG";

            default -> "VERY_WEAK";
        };
    }


    private boolean hasRepeatedCharacters(
            String password
    ) {

        for (int i = 1; i < password.length(); i++) {

            if (password.charAt(i)
                    == password.charAt(i - 1)) {

                return true;
            }
        }

        return false;
    }


    private boolean isCommonPassword(
            String password
    ) {

        String normalized =
                password.toLowerCase();

        return normalized.equals("password")
                || normalized.equals("password123")
                || normalized.equals("12345678")
                || normalized.equals("123456789")
                || normalized.equals("qwerty")
                || normalized.equals("qwerty123")
                || normalized.equals("admin")
                || normalized.equals("admin123");
    }
}