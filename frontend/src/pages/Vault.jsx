import { useEffect, useMemo, useState } from "react";

import { useDispatch, useSelector } from "react-redux";

import {
    fetchCredentials,
} from "../store/credentialSlice.js";

import CredentialCard
    from "../components/credentials/CredentialCard.jsx";

import CredentialForm
    from "../components/credentials/CredentialForm.jsx";


const Vault = () => {

    const dispatch = useDispatch();


    const {
        credentials,
        loading,
        error,
    } = useSelector(
        state => state.credentials
    );


    const [search, setSearch] =
        useState("");


    const [typeFilter, setTypeFilter] =
        useState("ALL");


    const [favoriteOnly, setFavoriteOnly] =
        useState(false);


    const [showForm, setShowForm] =
        useState(false);


    const [editingCredential, setEditingCredential] =
        useState(null);


    useEffect(() => {

        dispatch(
            fetchCredentials()
        );

    }, [dispatch]);


    const filteredCredentials =
        useMemo(() => {

            return credentials.filter(
                credential => {

                    const matchesSearch =
                        credential.title
                            ?.toLowerCase()
                            .includes(
                                search.toLowerCase()
                            ) ||
                        credential.username
                            ?.toLowerCase()
                            .includes(
                                search.toLowerCase()
                            );


                    const matchesType =
                        typeFilter === "ALL" ||
                        credential.type ===
                            typeFilter;


                    const matchesFavorite =
                        !favoriteOnly ||
                        credential.favorite;


                    return (
                        matchesSearch &&
                        matchesType &&
                        matchesFavorite
                    );
                }
            );

        }, [
            credentials,
            search,
            typeFilter,
            favoriteOnly,
        ]);


    const handleEdit = (
        credential
    ) => {

        setEditingCredential(
            credential
        );

        setShowForm(true);
    };


    const handleCloseForm = () => {

        setShowForm(false);

        setEditingCredential(
            null
        );
    };


    const totalCredentials =
        credentials.length;


    const favoriteCount =
        credentials.filter(
            credential =>
                credential.favorite
        ).length;


    const categoryCount =
        new Set(
            credentials.map(
                credential =>
                    credential.type
            )
        ).size;


    return (

        <div className="
            min-h-screen
            bg-slate-50
        ">

            <div className="
                mx-auto
                max-w-7xl
                px-4
                py-8
                sm:px-6
                lg:px-8
            ">


                {/* Header */}

                <div className="
                    flex
                    flex-col
                    gap-4
                    sm:flex-row
                    sm:items-center
                    sm:justify-between
                ">

                    <div>

                        <p className="
                            text-sm
                            font-medium
                            text-indigo-600
                        ">
                            SecureVault
                        </p>

                        <h1 className="
                            mt-1
                            text-3xl
                            font-bold
                            tracking-tight
                            text-slate-900
                        ">
                            My Vault
                        </h1>

                        <p className="
                            mt-2
                            text-sm
                            text-slate-500
                        ">
                            Securely manage all your
                            credentials in one place.
                        </p>

                    </div>


                    <button
                        type="button"
                        onClick={() => {

                            setEditingCredential(
                                null
                            );

                            setShowForm(true);
                        }}
                        className="
                            rounded-xl
                            bg-indigo-600
                            px-5
                            py-3
                            text-sm
                            font-semibold
                            text-white
                            shadow-sm
                            hover:bg-indigo-700
                        "
                    >
                        + Add Credential
                    </button>

                </div>


                {/* Stats */}

                <div className="
                    mt-8
                    grid
                    gap-4
                    sm:grid-cols-3
                ">

                    <div className="
                        rounded-2xl
                        border
                        border-slate-200
                        bg-white
                        p-5
                    ">

                        <p className="
                            text-sm
                            text-slate-500
                        ">
                            Total Credentials
                        </p>

                        <p className="
                            mt-2
                            text-3xl
                            font-bold
                            text-slate-900
                        ">
                            {totalCredentials}
                        </p>

                    </div>


                    <div className="
                        rounded-2xl
                        border
                        border-slate-200
                        bg-white
                        p-5
                    ">

                        <p className="
                            text-sm
                            text-slate-500
                        ">
                            Favorites
                        </p>

                        <p className="
                            mt-2
                            text-3xl
                            font-bold
                            text-slate-900
                        ">
                            {favoriteCount}
                        </p>

                    </div>


                    <div className="
                        rounded-2xl
                        border
                        border-slate-200
                        bg-white
                        p-5
                    ">

                        <p className="
                            text-sm
                            text-slate-500
                        ">
                            Categories
                        </p>

                        <p className="
                            mt-2
                            text-3xl
                            font-bold
                            text-slate-900
                        ">
                            {categoryCount}
                        </p>

                    </div>

                </div>


                {/* Search / Filter */}

                <div className="
                    mt-8
                    rounded-2xl
                    border
                    border-slate-200
                    bg-white
                    p-4
                ">

                    <div className="
                        flex
                        flex-col
                        gap-3
                        lg:flex-row
                    ">

                        <input
                            type="search"
                            value={search}
                            onChange={event =>
                                setSearch(
                                    event.target.value
                                )
                            }
                            placeholder="Search credentials..."
                            className="
                                flex-1
                                rounded-xl
                                border
                                border-slate-200
                                px-4
                                py-3
                                text-sm
                                outline-none
                                focus:border-indigo-500
                            "
                        />


                        <select
                            value={typeFilter}
                            onChange={event =>
                                setTypeFilter(
                                    event.target.value
                                )
                            }
                            className="
                                rounded-xl
                                border
                                border-slate-200
                                bg-white
                                px-4
                                py-3
                                text-sm
                                outline-none
                            "
                        >

                            <option value="ALL">
                                All Types
                            </option>

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


                        <button
                            type="button"
                            onClick={() =>
                                setFavoriteOnly(
                                    current =>
                                        !current
                                )
                            }
                            className={`
                                rounded-xl
                                px-4
                                py-3
                                text-sm
                                font-medium
                                ${
                                    favoriteOnly
                                        ? "bg-amber-100 text-amber-700"
                                        : "border border-slate-200 text-slate-700"
                                }
                            `}
                        >
                            ★ Favorites
                        </button>

                    </div>

                </div>


                {/* Error */}

                {error && (

                    <div className="
                        mt-6
                        rounded-xl
                        border
                        border-red-200
                        bg-red-50
                        px-4
                        py-3
                        text-sm
                        text-red-700
                    ">
                        {error}
                    </div>

                )}


                {/* Loading */}

                {loading && (

                    <div className="
                        py-16
                        text-center
                        text-sm
                        text-slate-500
                    ">
                        Loading your vault...
                    </div>

                )}


                {/* Empty */}

                {!loading &&
                    filteredCredentials.length === 0 && (

                        <div className="
                            mt-8
                            rounded-2xl
                            border
                            border-dashed
                            border-slate-300
                            bg-white
                            px-6
                            py-16
                            text-center
                        ">

                            <div className="
                                mx-auto
                                flex
                                h-14
                                w-14
                                items-center
                                justify-center
                                rounded-2xl
                                bg-indigo-100
                                text-2xl
                            ">
                                🔐
                            </div>

                            <h2 className="
                                mt-4
                                text-lg
                                font-semibold
                                text-slate-900
                            ">
                                No credentials found
                            </h2>

                            <p className="
                                mx-auto
                                mt-2
                                max-w-md
                                text-sm
                                text-slate-500
                            ">
                                Add your first credential
                                or change your search
                                and filter options.
                            </p>

                            <button
                                type="button"
                                onClick={() => {

                                    setEditingCredential(
                                        null
                                    );

                                    setShowForm(true);
                                }}
                                className="
                                    mt-5
                                    rounded-xl
                                    bg-indigo-600
                                    px-5
                                    py-2.5
                                    text-sm
                                    font-semibold
                                    text-white
                                    hover:bg-indigo-700
                                "
                            >
                                Add Credential
                            </button>

                        </div>
                    )}


                {/* Credentials */}

                {!loading &&
                    filteredCredentials.length > 0 && (

                        <div className="
                            mt-8
                            grid
                            gap-5
                            md:grid-cols-2
                            xl:grid-cols-3
                        ">

                            {filteredCredentials.map(
                                credential => (

                                    <CredentialCard
                                        key={
                                            credential.id
                                        }
                                        credential={
                                            credential
                                        }
                                        onEdit={
                                            handleEdit
                                        }
                                    />

                                )
                            )}

                        </div>

                    )}

            </div>


            {showForm && (

                <CredentialForm
                    credential={
                        editingCredential
                    }
                    onClose={
                        handleCloseForm
                    }
                />

            )}

        </div>
    );
};


export default Vault;