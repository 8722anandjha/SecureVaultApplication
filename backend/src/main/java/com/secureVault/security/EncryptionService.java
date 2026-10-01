package com.secureVault.security;

import jakarta.annotation.PostConstruct;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import javax.crypto.Cipher;
import javax.crypto.spec.GCMParameterSpec;
import javax.crypto.spec.SecretKeySpec;
import java.nio.charset.StandardCharsets;
import java.security.SecureRandom;
import java.util.Base64;

@Service
public class EncryptionService {

    private static final String ALGORITHM =
            "AES/GCM/NoPadding";

    private static final int GCM_TAG_LENGTH = 128;

    private static final int IV_LENGTH = 12;

    @Value("${vault.encryption.key}")
    private String encodedKey;

    private SecretKeySpec secretKey;

    private final SecureRandom secureRandom =
            new SecureRandom();

    @PostConstruct
    public void initialize() {


        byte[] keyBytes =
                Base64.getDecoder().decode(encodedKey);

        if (keyBytes.length != 32) {
            throw new IllegalStateException(
                    "Encryption key must be 32 bytes for AES-256"
            );
        }

        secretKey =
                new SecretKeySpec(keyBytes, "AES");
    }

    public String encrypt(String plainText) {

        if (plainText == null || plainText.isBlank()) {
            return plainText;
        }

        try {
            byte[] iv = new byte[IV_LENGTH];
            secureRandom.nextBytes(iv);

            Cipher cipher =
                    Cipher.getInstance(ALGORITHM);

            GCMParameterSpec gcmParameterSpec =
                    new GCMParameterSpec(
                            GCM_TAG_LENGTH,
                            iv
                    );

            cipher.init(
                    Cipher.ENCRYPT_MODE,
                    secretKey,
                    gcmParameterSpec
            );

            byte[] encryptedBytes =
                    cipher.doFinal(
                            plainText.getBytes(
                                    StandardCharsets.UTF_8
                            )
                    );

            byte[] combined =
                    new byte[iv.length + encryptedBytes.length];

            System.arraycopy(
                    iv,
                    0,
                    combined,
                    0,
                    iv.length
            );

            System.arraycopy(
                    encryptedBytes,
                    0,
                    combined,
                    iv.length,
                    encryptedBytes.length
            );

            return Base64.getEncoder()
                    .encodeToString(combined);

        } catch (Exception e) {
            throw new IllegalStateException(
                    "Failed to encrypt data",
                    e
            );
        }
    }

    public String decrypt(String encryptedText) {

        if (encryptedText == null ||
                encryptedText.isBlank()) {
            return encryptedText;
        }

        try {
            byte[] combined =
                    Base64.getDecoder()
                            .decode(encryptedText);

            if (combined.length <= IV_LENGTH) {
                throw new IllegalArgumentException(
                        "Invalid encrypted data"
                );
            }

            byte[] iv =
                    new byte[IV_LENGTH];

            byte[] encryptedBytes =
                    new byte[
                            combined.length - IV_LENGTH
                            ];

            System.arraycopy(
                    combined,
                    0,
                    iv,
                    0,
                    IV_LENGTH
            );

            System.arraycopy(
                    combined,
                    IV_LENGTH,
                    encryptedBytes,
                    0,
                    encryptedBytes.length
            );

            Cipher cipher =
                    Cipher.getInstance(ALGORITHM);

            GCMParameterSpec gcmParameterSpec =
                    new GCMParameterSpec(
                            GCM_TAG_LENGTH,
                            iv
                    );

            cipher.init(
                    Cipher.DECRYPT_MODE,
                    secretKey,
                    gcmParameterSpec
            );

            byte[] decryptedBytes =
                    cipher.doFinal(encryptedBytes);

            return new String(
                    decryptedBytes,
                    StandardCharsets.UTF_8
            );

        } catch (Exception e) {
            throw new IllegalStateException(
                    "Failed to decrypt data",
                    e
            );
        }
    }
}