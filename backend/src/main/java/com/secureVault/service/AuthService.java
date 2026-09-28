package com.secureVault.service;

import com.secureVault.common.exception.InvalidCredentialsException;
import com.secureVault.common.exception.ResourceAlreadyExistsException;
import com.secureVault.dto.AuthResponse;
import com.secureVault.dto.LoginDto;
import com.secureVault.dto.RequestDto;
import com.secureVault.entities.User;
import com.secureVault.repository.UserRepository;
import com.secureVault.security.JwtService;
import org.springframework.http.ResponseCookie;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class AuthService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;

    public AuthService(UserRepository userRepository, PasswordEncoder passwordEncoder, JwtService jwtService) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
        this.jwtService = jwtService;
    }

    public User register(RequestDto request) {

        if (userRepository.findByEmail(request.getEmail()).isPresent()) {
            throw new ResourceAlreadyExistsException(
                    "Full Name or Email already registered"
            );
        }
        User user = new User();
        user.setName(request.getName());
        user.setEmail(request.getEmail());

        String hashedPassword = passwordEncoder.encode(request.getPassword());
        user.setPassword(hashedPassword);
        return userRepository.save(user);
    }

    public AuthResponse login(LoginDto request) {

        User user = userRepository
                .findByEmail(request.getEmail())
                .orElseThrow(() ->
                        new InvalidCredentialsException(
                                "Invalid email or password"
                        ));

        boolean passwordMatches =
                passwordEncoder.matches(
                        request.getPassword(),
                        user.getPassword()
                );

        if (!passwordMatches) {
            throw new InvalidCredentialsException(
                    "Invalid email or password"
            );
        }
        String token = jwtService.generateToken(user.getEmail());



        return new AuthResponse(token);
    }



}
