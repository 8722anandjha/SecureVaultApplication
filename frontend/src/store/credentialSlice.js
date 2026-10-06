import {
    createAsyncThunk,
    createSlice,
} from "@reduxjs/toolkit";

import {
    getCredentials,
    createCredential,
    updateCredential,
    deleteCredential,
    revealCredentialPassword,
} from "../services/credentialService.js";


export const fetchCredentials = createAsyncThunk(
    "credentials/fetchCredentials",
    async (_, { rejectWithValue }) => {

        try {

            return await getCredentials();

        } catch (error) {

            return rejectWithValue(
                error.response?.data?.message ||
                "Failed to load credentials"
            );
        }
    }
);


export const addCredential = createAsyncThunk(
    "credentials/addCredential",
    async (credentialData, { rejectWithValue }) => {

        try {

            return await createCredential(
                credentialData
            );

        } catch (error) {

            return rejectWithValue(
                error.response?.data?.message ||
                "Failed to create credential"
            );
        }
    }
);


export const editCredential = createAsyncThunk(
    "credentials/editCredential",
    async (
        { id, credentialData },
        { rejectWithValue }
    ) => {

        try {

            return await updateCredential(
                id,
                credentialData
            );

        } catch (error) {

            return rejectWithValue(
                error.response?.data?.message ||
                "Failed to update credential"
            );
        }
    }
);


export const removeCredential = createAsyncThunk(
    "credentials/removeCredential",
    async (id, { rejectWithValue }) => {

        try {

            await deleteCredential(id);
            return id;
        } catch (error) {

            return rejectWithValue(
                error.response?.data?.message ||
                "Failed to delete credential"
            );
        }
    }
);


export const revealPassword = createAsyncThunk(
    "credentials/revealPassword",
    async (id, { rejectWithValue }) => {

        try {

            const password =
                await revealCredentialPassword(id);

            return {
                id,
                password,
            };

        } catch (error) {

            return rejectWithValue(
                error.response?.data?.message ||
                "Failed to reveal password"
            );
        }
    }
);


export const shareCredentialThunk =
    createAsyncThunk(
        "credentials/shareCredential",
        async (
            { credentialId, shareData },
            { rejectWithValue }
        ) => {

            try {

                return await shareCredential(
                    credentialId,
                    shareData
                );

            } catch (error) {

                return rejectWithValue(
                    error.response?.data?.message ||
                    "Failed to share credential"
                );
            }
        }
    );

export const fetchCredentialShares =
    createAsyncThunk(
        "credentials/fetchCredentialShares",
        async (
            credentialId,
            { rejectWithValue }
        ) => {

            try {

                return await getCredentialShares(
                    credentialId
                );

            } catch (error) {

                return rejectWithValue(
                    error.response?.data?.message ||
                    "Failed to load shares"
                );
            }
        }
    );

const initialState = {

    credentials: [],

    loading: false,

    error: null,

    revealedPasswords: {},
};


const credentialSlice = createSlice({

    name: "credentials",

    initialState,

    reducers: {

        clearCredentialError: (state) => {

            state.error = null;
        },

        clearRevealedPasswords: (state) => {

            state.revealedPasswords = {};
        },
    },


    extraReducers: (builder) => {

        builder

            // FETCH
            .addCase(
                fetchCredentials.pending,
                (state) => {

                    state.loading = true;
                    state.error = null;
                }
            )

            .addCase(
                fetchCredentials.fulfilled,
                (state, action) => {

                    state.loading = false;
                    state.credentials = action.payload;
                }
            )

            .addCase(
                fetchCredentials.rejected,
                (state, action) => {

                    state.loading = false;
                    state.error = action.payload;
                }
            )


            // CREATE
            .addCase(
                addCredential.pending,
                (state) => {

                    state.loading = true;
                    state.error = null;
                }
            )

            .addCase(
                addCredential.fulfilled,
                (state, action) => {

                    state.loading = false;

                    state.credentials.unshift(
                        action.payload
                    );
                }
            )

            .addCase(
                addCredential.rejected,
                (state, action) => {

                    state.loading = false;
                    state.error = action.payload;
                }
            )


            // UPDATE
            .addCase(
                editCredential.fulfilled,
                (state, action) => {

                    const index =
                        state.credentials.findIndex(
                            credential =>
                                credential.id ===
                                action.payload.id
                        );

                    if (index !== -1) {

                        state.credentials[index] =
                            action.payload;
                    }
                }
            )


            // DELETE
            .addCase(
                removeCredential.fulfilled,
                (state, action) => {

                    state.credentials =
                        state.credentials.filter(
                            credential =>
                                credential.id !==
                                action.payload
                        );
                }
            )


            // REVEAL PASSWORD
            .addCase(
                revealPassword.fulfilled,
                (state, action) => {

                    state.revealedPasswords[
                        action.payload.id
                    ] = action.payload.password;
                }
            );
    },
});


export const {
    clearCredentialError,
    clearRevealedPasswords,
} = credentialSlice.actions;


export default credentialSlice.reducer;