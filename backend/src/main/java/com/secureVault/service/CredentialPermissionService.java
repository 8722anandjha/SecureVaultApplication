package com.secureVault.service;

import com.secureVault.entities.Credential;
import com.secureVault.entities.CredentialShare;
import com.secureVault.entities.SharePermission;
import com.secureVault.entities.User;
import com.secureVault.repository.CredentialShareRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;

@Service
@RequiredArgsConstructor
public class CredentialPermissionService {

    private final CredentialShareRepository
            credentialShareRepository;

    public CredentialShare getActiveShare(
            Credential credential,
            User user
    ) {

        CredentialShare share =
                credentialShareRepository
                        .findByCredentialAndSharedWith(
                                credential,
                                user
                        )
                        .orElseThrow(() ->
                                new RuntimeException(
                                        "Access denied"
                                )
                        );

        if (share.getExpiresAt() != null
                && !share.getExpiresAt()
                .isAfter(LocalDateTime.now())) {

            throw new RuntimeException(
                    "Credential access has expired"
            );
        }

        return share;
    }

    public boolean canView(
            Credential credential,
            User user
    ) {

        if (isOwner(credential, user)) {
            return true;
        }

        getActiveShare(
                credential,
                user
        );

        return true;
    }

    public boolean canEdit(
            Credential credential,
            User user
    ) {

        if (isOwner(credential, user)) {
            return true;
        }

        CredentialShare share =
                getActiveShare(
                        credential,
                        user
                );

        return share.getPermission()
                == SharePermission.EDIT_ACCESS
                || share.getPermission()
                == SharePermission.FULL_MANAGEMENT;
    }

    public boolean canManage(
            Credential credential,
            User user
    ) {

        if (isOwner(credential, user)) {
            return true;
        }

        CredentialShare share =
                getActiveShare(
                        credential,
                        user
                );

        return share.getPermission()
                == SharePermission.FULL_MANAGEMENT;
    }

    private boolean isOwner(
            Credential credential,
            User user
    ) {

        return credential.getUser()
                .getId()
                .equals(user.getId());
    }
}