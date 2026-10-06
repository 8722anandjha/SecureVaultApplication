import api from "./api";

export const getCredentials = async () => {
    const response = await api.get("/credentials");
    return response.data;
};

export const getCredential = async (id) => {
    const response = await api.get(`/credentials/${id}`);
    return response.data;
};

export const createCredential = async (credentialData) => {
    const response = await api.post(
        "/credentials",
        credentialData
    );

    return response.data;
};

export const updateCredential = async (
    id,
    credentialData
) => {
    const response = await api.put(
        `/credentials/${id}`,
        credentialData
    );

    return response.data;
};

export const deleteCredential = async (id) => {
    const response = await api.delete(`/credentials/${id}`);
    
};

export const revealCredentialPassword = async (id) => {
    const response = await api.get(
        `/credentials/${id}`
    );
    return response.data.password;
};

export const shareCredential = async (
    credentialId,
    shareData
) => {

    const response = await api.post(
        `/v1/credentials/${credentialId}/shares`,
        shareData
    );

    return response.data;
};

export const getCredentialShares = async (
    credentialId
) => {

    const response = await api.get(
        `/v1/credentials/${credentialId}/shares`
    );

    return response.data;
};

export const updateCredentialShare = async (
    credentialId,
    shareId,
    shareData
) => {

    const response = await api.put(
        `/v1/credentials/${credentialId}/shares/${shareId}`,
        shareData
    );

    return response.data;
};

export const revokeCredentialShare = async (
    credentialId,
    shareId
) => {

    await api.delete(
        `/v1/credentials/${credentialId}/shares/${shareId}`
    );

    return shareId;
};