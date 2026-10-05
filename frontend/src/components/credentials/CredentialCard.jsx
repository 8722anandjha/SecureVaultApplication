import { useState } from "react";

import { useDispatch, useSelector } from "react-redux";

import {
    revealPassword,
    removeCredential,
} from "../../store/credentialSlice.js";


const typeLabels = {

    WEBSITE_LOGIN: "Website Login",

    EMAIL_ACCOUNT: "Email Account",

    BANKING: "Banking",

    SOCIAL_MEDIA: "Social Media",

    APPLICATION: "Application",

    API_KEY: "API Key",

    SECURE_NOTE: "Secure Note",
};


const CredentialCard = ({
    credential,
    onEdit,
}) => {

    const dispatch = useDispatch();

    const [showPassword, setShowPassword] =
        useState(false);

    const password =
        useSelector(
            state =>
                state.credentials.revealedPasswords[
                    credential.id
                ]
        );


    const handleRevealPassword = async () => {

        if (!password) {

            await dispatch(
                revealPassword(credential.id)
            );
        }

        setShowPassword(
            current => !current
        );
    };


    const handleDelete = async () => {

        const confirmed =
            window.confirm(
                `Delete "${credential.title}"?`
            );

        if (!confirmed) {
            return;
        }

        await dispatch(
            removeCredential(
                credential.id
            )
        );
    };


    return (

        <div className="
            rounded-2xl
            border border-slate-200
            bg-white
            p-5
            shadow-sm
            transition
            hover:-translate-y-0.5
            hover:shadow-md
        ">

            <div className="
                flex
                items-start
                justify-between
                gap-4
            ">

                <div className="flex items-center gap-3">

                    <div className="
                        flex
                        h-11
                        w-11
                        items-center
                        justify-center
                        rounded-xl
                        bg-indigo-100
                        text-lg
                        font-bold
                        text-indigo-600
                    ">
                        {credential.title
                            ?.charAt(0)
                            ?.toUpperCase()}
                    </div>


                    <div>

                        <h3 className="
                            font-semibold
                            text-slate-900
                        ">
                            {credential.title}
                        </h3>

                        <p className="
                            text-sm
                            text-slate-500
                        ">
                            {typeLabels[
                                credential.type
                            ] || credential.type}
                        </p>

                    </div>

                </div>


                {credential.favorite && (

                    <span className="
                        text-amber-500
                    ">
                        ★
                    </span>

                )}

            </div>


            <div className="
                mt-5
                space-y-3
            ">

                <div>

                    <p className="
                        text-xs
                        font-medium
                        uppercase
                        tracking-wide
                        text-slate-400
                    ">
                        Username
                    </p>

                    <p className="
                        mt-1
                        truncate
                        text-sm
                        text-slate-700
                    ">
                        {credential.username ||
                            "Not provided"}
                    </p>

                </div>


                <div>

                    <p className="
                        text-xs
                        font-medium
                        uppercase
                        tracking-wide
                        text-slate-400
                    ">
                        Password
                    </p>


                    <div className="
                        mt-1
                        flex
                        items-center
                        justify-between
                        gap-2
                    ">

                        <p className="
                            truncate
                            font-mono
                            text-sm
                            text-slate-700
                        ">
                            {showPassword && password
                                ? password
                                : "••••••••••••"}
                        </p>


                        <button
                            type="button"
                            onClick={
                                handleRevealPassword
                            }
                            className="
                                shrink-0
                                text-xs
                                font-medium
                                text-indigo-600
                                hover:text-indigo-800
                            "
                        >
                            {showPassword
                                ? "Hide"
                                : "Reveal"}
                        </button>

                    </div>

                </div>


                {credential.websiteUrl && (

                    <div>

                        <p className="
                            text-xs
                            font-medium
                            uppercase
                            tracking-wide
                            text-slate-400
                        ">
                            Website
                        </p>

                        <a
                            href={
                                credential.websiteUrl
                            }
                            target="_blank"
                            rel="noreferrer"
                            className="
                                mt-1
                                block
                                truncate
                                text-sm
                                text-indigo-600
                                hover:underline
                            "
                        >
                            {credential.websiteUrl}
                        </a>

                    </div>

                )}

            </div>


            <div className="
                mt-5
                flex
                gap-2
                border-t
                border-slate-100
                pt-4
            ">

                <button
                    type="button"
                    onClick={() =>
                        onEdit(credential)
                    }
                    className="
                        flex-1
                        rounded-lg
                        border
                        border-slate-200
                        px-3
                        py-2
                        text-sm
                        font-medium
                        text-slate-700
                        hover:bg-slate-50
                    "
                >
                    Edit
                </button>


                <button
                    type="button"
                    onClick={
                        handleDelete
                    }
                    className="
                        flex-1
                        rounded-lg
                        bg-red-50
                        px-3
                        py-2
                        text-sm
                        font-medium
                        text-red-600
                        hover:bg-red-100
                    "
                >
                    Delete
                </button>

            </div>

        </div>
    );
};


export default CredentialCard;