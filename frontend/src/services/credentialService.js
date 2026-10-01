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
    await api.delete(`/credentials/${id}`);
};