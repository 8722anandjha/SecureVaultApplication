import { useEffect, useState } from "react";

import { useDispatch } from "react-redux";

import {
    addCredential,
    editCredential,
} from "../../store/credentialSlice.js";


const initialForm = {

    title: "",

    username: "",

    password: "",

    websiteUrl: "",

    type: "WEBSITE_LOGIN",

    notes: "",

    favorite: false,
};


const CredentialForm = ({
    credential,
    onClose,
}) => {

    const dispatch = useDispatch();


    const [formData, setFormData] =
        useState(initialForm);


    const [submitting, setSubmitting] =
        useState(false);


    useEffect(() => {

        if (credential) {

            setFormData({

                title:
                    credential.title || "",

                username:
                    credential.username || "",

                password: "",

                websiteUrl:
                    credential.websiteUrl || "",

                type:
                    credential.type ||
                    "WEBSITE_LOGIN",

                notes:
                    credential.notes || "",

                favorite:
                    credential.favorite || false,
            });

        } else {

            setFormData(initialForm);
        }

    }, [credential]);


    const handleChange = (event) => {

        const {
            name,
            value,
            type,
            checked,
        } = event.target;


        setFormData(
            current => ({

                ...current,

                [name]:
                    type === "checkbox"
                        ? checked
                        : value,
            })
        );
    };


    const handleSubmit = async (event) => {

        event.preventDefault();

        setSubmitting(true);


        try {

            if (credential) {

                await dispatch(
                    editCredential({

                        id: credential.id,

                        credentialData:
                            formData,

                    })
                ).unwrap();

            } else {

                await dispatch(
                    addCredential(
                        formData
                    )
                ).unwrap();
            }


            onClose();

        } catch (error) {

            console.error(error);

        } finally {

            setSubmitting(false);
        }
    };


    return (

        <div className="
            fixed
            inset-0
            z-50
            flex
            items-center
            justify-center
            bg-slate-950/50
            p-4
        ">

            <div className="
                max-h-[90vh]
                w-full
                max-w-2xl
                overflow-y-auto
                rounded-2xl
                bg-white
                p-6
                shadow-2xl
            ">

                <div className="
                    mb-6
                    flex
                    items-center
                    justify-between
                ">

                    <div>

                        <h2 className="
                            text-xl
                            font-bold
                            text-slate-900
                        ">
                            {credential
                                ? "Edit Credential"
                                : "Add Credential"}
                        </h2>

                        <p className="
                            mt-1
                            text-sm
                            text-slate-500
                        ">
                            {credential
                                ? "Update your saved credential."
                                : "Securely save a new credential."}
                        </p>

                    </div>


                    <button
                        type="button"
                        onClick={onClose}
                        className="
                            text-2xl
                            text-slate-400
                            hover:text-slate-700
                        "
                    >
                        ×
                    </button>

                </div>


                <form
                    onSubmit={handleSubmit}
                    className="space-y-5"
                >

                    <div className="
                        grid
                        gap-5
                        md:grid-cols-2
                    ">

                        <div>

                            <label className="
                                text-sm
                                font-medium
                                text-slate-700
                            ">
                                Title
                            </label>

                            <input
                                name="title"
                                value={
                                    formData.title
                                }
                                onChange={
                                    handleChange
                                }
                                required
                                maxLength={100}
                                placeholder="e.g. GitHub"
                                className="
                                    mt-2
                                    w-full
                                    rounded-lg
                                    border
                                    border-slate-200
                                    px-4
                                    py-3
                                    outline-none
                                    focus:border-indigo-500
                                    focus:ring-2
                                    focus:ring-indigo-100
                                "
                            />

                        </div>


                        <div>

                            <label className="
                                text-sm
                                font-medium
                                text-slate-700
                            ">
                                Credential Type
                            </label>

                            <select
                                name="type"
                                value={
                                    formData.type
                                }
                                onChange={
                                    handleChange
                                }
                                className="
                                    mt-2
                                    w-full
                                    rounded-lg
                                    border
                                    border-slate-200
                                    bg-white
                                    px-4
                                    py-3
                                    outline-none
                                    focus:border-indigo-500
                                "
                            >

                                <option value="WEBSITE_LOGIN">
                                    Website Login
                                </option>

                                <option value="EMAIL_ACCOUNT">
                                    Email Account
                                </option>

                                <option value="BANKING">
                                    Banking
                                </option>

                                <option value="SOCIAL_MEDIA">
                                    Social Media
                                </option>

                                <option value="APPLICATION">
                                    Application
                                </option>

                                <option value="API_KEY">
                                    API Key
                                </option>

                                <option value="SECURE_NOTE">
                                    Secure Note
                                </option>

                            </select>

                        </div>

                    </div>


                    <div>

                        <label className="
                            text-sm
                            font-medium
                            text-slate-700
                        ">
                            Username / Email
                        </label>

                        <input
                            name="username"
                            value={
                                formData.username
                            }
                            onChange={
                                handleChange
                            }
                            maxLength={255}
                            placeholder="username or email"
                            className="
                                mt-2
                                w-full
                                rounded-lg
                                border
                                border-slate-200
                                px-4
                                py-3
                                outline-none
                                focus:border-indigo-500
                            "
                        />

                    </div>


                    <div>

                        <label className="
                            text-sm
                            font-medium
                            text-slate-700
                        ">
                            Password
                        </label>

                        <input
                            type="password"
                            name="password"
                            value={
                                formData.password
                            }
                            onChange={
                                handleChange
                            }
                            required={!credential}
                            placeholder={
                                credential
                                    ? "Enter new password to replace current one"
                                    : "Enter password"
                            }
                            className="
                                mt-2
                                w-full
                                rounded-lg
                                border
                                border-slate-200
                                px-4
                                py-3
                                outline-none
                                focus:border-indigo-500
                            "
                        />

                    </div>


                    <div>

                        <label className="
                            text-sm
                            font-medium
                            text-slate-700
                        ">
                            Website URL
                        </label>

                        <input
                            type="url"
                            name="websiteUrl"
                            value={
                                formData.websiteUrl
                            }
                            onChange={
                                handleChange
                            }
                            maxLength={500}
                            placeholder="https://example.com"
                            className="
                                mt-2
                                w-full
                                rounded-lg
                                border
                                border-slate-200
                                px-4
                                py-3
                                outline-none
                                focus:border-indigo-500
                            "
                        />

                    </div>


                    <div>

                        <label className="
                            text-sm
                            font-medium
                            text-slate-700
                        ">
                            Notes
                        </label>

                        <textarea
                            name="notes"
                            value={
                                formData.notes
                            }
                            onChange={
                                handleChange
                            }
                            rows={4}
                            placeholder="Additional secure notes..."
                            className="
                                mt-2
                                w-full
                                resize-none
                                rounded-lg
                                border
                                border-slate-200
                                px-4
                                py-3
                                outline-none
                                focus:border-indigo-500
                            "
                        />

                    </div>


                    <label className="
                        flex
                        cursor-pointer
                        items-center
                        gap-3
                    ">

                        <input
                            type="checkbox"
                            name="favorite"
                            checked={
                                formData.favorite
                            }
                            onChange={
                                handleChange
                            }
                            className="
                                h-4
                                w-4
                                rounded
                                border-slate-300
                                text-indigo-600
                            "
                        />

                        <span className="
                            text-sm
                            text-slate-700
                        ">
                            Add to favorites
                        </span>

                    </label>


                    <div className="
                        flex
                        justify-end
                        gap-3
                        border-t
                        border-slate-100
                        pt-5
                    ">

                        <button
                            type="button"
                            onClick={onClose}
                            className="
                                rounded-lg
                                border
                                border-slate-200
                                px-5
                                py-2.5
                                text-sm
                                font-medium
                                text-slate-700
                                hover:bg-slate-50
                            "
                        >
                            Cancel
                        </button>


                        <button
                            type="submit"
                            disabled={submitting}
                            className="
                                rounded-lg
                                bg-indigo-600
                                px-5
                                py-2.5
                                text-sm
                                font-semibold
                                text-white
                                hover:bg-indigo-700
                                disabled:cursor-not-allowed
                                disabled:opacity-60
                            "
                        >
                            {submitting
                                ? "Saving..."
                                : credential
                                    ? "Update Credential"
                                    : "Save Credential"}
                        </button>

                    </div>

                </form>

            </div>

        </div>
    );
};


export default CredentialForm;