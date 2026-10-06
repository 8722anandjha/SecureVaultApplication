import api from "./api";


export const generatePassword = async (passwordData) => {
    const response = await api.post(
        `/v1/passwords/generate`,
        passwordData
    );

    return response.data;
};

export const checkPasswordStrength = async (password) => {
    const response = await api.post(
        `/v1/passwords/strength`,
        {
            password,
        }
    );

    return response.data;
};