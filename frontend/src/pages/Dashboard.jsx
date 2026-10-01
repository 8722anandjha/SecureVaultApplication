import { useEffect, useState } from "react";

import {
    createCredential,
    deleteCredential,
    getCredentials,
    updateCredential,
} from "../services/credentialService";

const initialForm = {
    title: "",
    username: "",
    password: "",
    url: "",
    type: "WEBSITE_LOGIN",
    notes: "",
    favorite: false,
};

const Dashboard = () => {
    const [credentials, setCredentials] = useState([]);
    const [formData, setFormData] = useState(initialForm);

    const [editingId, setEditingId] = useState(null);
    const [showForm, setShowForm] = useState(false);
    const [showPasswords, setShowPasswords] = useState({});
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [error, setError] = useState("");

    useEffect(() => {
        loadCredentials();
    }, []);

    const loadCredentials = async () => {
        try {
            setLoading(true);

            const data = await getCredentials();

            setCredentials(data);
        } catch (error) {
            setError(
                error.response?.data?.message ||
                "Unable to load credentials."
            );
        } finally {
            setLoading(false);
        }
    };

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;

        setFormData((prev) => ({
            ...prev,
            [name]: type === "checkbox" ? checked : value,
        }));
    };

    const resetForm = () => {
        setFormData(initialForm);
        setEditingId(null);
        setShowForm(false);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            setSaving(true);
            setError("");

            if (editingId) {
                const updated = await updateCredential(
                    editingId,
                    formData
                );

                setCredentials((prev) =>
                    prev.map((credential) =>
                        credential.id === editingId
                            ? updated
                            : credential
                    )
                );
            } else {
                const created =
                    await createCredential(formData);

                setCredentials((prev) => [
                    created,
                    ...prev,
                ]);
            }

            resetForm();
        } catch (error) {
            setError(
                error.response?.data?.message ||
                "Unable to save credential."
            );
        } finally {
            setSaving(false);
        }
    };

    const handleEdit = (credential) => {
        setFormData({
            title: credential.title || "",
            username: credential.username || "",
            password: credential.password || "",
            url: credential.url || "",
            type: credential.type || "WEBSITE_LOGIN",
            notes: credential.notes || "",
            favorite: credential.favorite || false,
        });

        setEditingId(credential.id);
        setShowForm(true);
    };

    const handleDelete = async (id) => {
        const confirmed = window.confirm(
            "Are you sure you want to delete this credential?"
        );

        if (!confirmed) {
            return;
        }

        try {
            await deleteCredential(id);

            setCredentials((prev) =>
                prev.filter(
                    (credential) =>
                        credential.id !== id
                )
            );
        } catch (error) {
            setError(
                error.response?.data?.message ||
                "Unable to delete credential."
            );
        }
    };

    const togglePassword = (id) => {
        setShowPasswords((prev) => ({
            ...prev,
            [id]: !prev[id],
        }));
    };

    return (
        <main className="min-h-[calc(100vh-73px)] bg-gray-50 px-6 py-8">
            <div className="mx-auto max-w-7xl">

                {/* Header */}
                <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900">
                            My Vault
                        </h1>

                        <p className="mt-1 text-gray-600">
                            Manage your passwords and credentials securely.
                        </p>
                    </div>

                    <button
                        onClick={() => {
                            setFormData(initialForm);
                            setEditingId(null);
                            setShowForm(true);
                        }}
                        className="rounded-lg bg-blue-600 px-5 py-3 font-semibold text-white transition hover:bg-blue-700"
                    >
                        + Add Credential
                    </button>
                </div>

                {/* Error */}
                {error && (
                    <div className="mt-6 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
                        {error}
                    </div>
                )}

                {/* Form */}
                {showForm && (
                    <div className="mt-8 rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
                        <div className="mb-6 flex items-center justify-between">
                            <div>
                                <h2 className="text-xl font-bold text-gray-900">
                                    {editingId
                                        ? "Edit Credential"
                                        : "Add Credential"}
                                </h2>

                                <p className="mt-1 text-sm text-gray-500">
                                    Store your credential details in SecureVault.
                                </p>
                            </div>

                            <button
                                onClick={resetForm}
                                className="text-gray-500 hover:text-gray-900"
                            >
                                ✕
                            </button>
                        </div>

                        <form
                            onSubmit={handleSubmit}
                            className="grid gap-5 md:grid-cols-2"
                        >
                            <Input
                                label="Title"
                                name="title"
                                value={formData.title}
                                onChange={handleChange}
                                placeholder="e.g. GitHub"
                                required
                            />

                            <div>
                                <label className="mb-2 block text-sm font-medium text-gray-700">
                                    Type
                                </label>

                                <select
                                    name="type"
                                    value={formData.type}
                                    onChange={handleChange}
                                    className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                                >
                                    <option value="WEBSITE_LOGIN">
                                        Website Login
                                    </option>

                                    <option value="EMAIL">
                                        Email
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

                            <Input
                                label="Username / Email"
                                name="username"
                                value={formData.username}
                                onChange={handleChange}
                                placeholder="username@example.com"
                            />

                            <Input
                                label="Password"
                                name="password"
                                type="password"
                                value={formData.password}
                                onChange={handleChange}
                                placeholder="Enter password"
                            />

                            <Input
                                label="Website / URL"
                                name="url"
                                value={formData.url}
                                onChange={handleChange}
                                placeholder="https://example.com"
                            />

                            <div>
                                <label className="mb-2 block text-sm font-medium text-gray-700">
                                    Favorite
                                </label>

                                <label className="flex cursor-pointer items-center gap-3">
                                    <input
                                        type="checkbox"
                                        name="favorite"
                                        checked={formData.favorite}
                                        onChange={handleChange}
                                        className="h-4 w-4 rounded border-gray-300 text-blue-600"
                                    />

                                    <span className="text-sm text-gray-600">
                                        Add to favorites
                                    </span>
                                </label>
                            </div>

                            <div className="md:col-span-2">
                                <label className="mb-2 block text-sm font-medium text-gray-700">
                                    Notes
                                </label>

                                <textarea
                                    name="notes"
                                    value={formData.notes}
                                    onChange={handleChange}
                                    rows="4"
                                    placeholder="Add additional notes..."
                                    className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                                />
                            </div>

                            <div className="flex gap-3 md:col-span-2">
                                <button
                                    type="submit"
                                    disabled={saving}
                                    className="rounded-lg bg-blue-600 px-6 py-3 font-semibold text-white hover:bg-blue-700 disabled:opacity-60"
                                >
                                    {saving
                                        ? "Saving..."
                                        : editingId
                                            ? "Update Credential"
                                            : "Save Credential"}
                                </button>

                                <button
                                    type="button"
                                    onClick={resetForm}
                                    className="rounded-lg border border-gray-300 px-6 py-3 font-semibold text-gray-700 hover:bg-gray-50"
                                >
                                    Cancel
                                </button>
                            </div>
                        </form>
                    </div>
                )}

                {/* Credentials */}
                <div className="mt-8">
                    {loading ? (
                        <div className="rounded-2xl border border-gray-200 bg-white p-10 text-center">
                            <p className="text-gray-500">
                                Loading your vault...
                            </p>
                        </div>
                    ) : credentials.length === 0 ? (
                        <div className="rounded-2xl border border-dashed border-gray-300 bg-white p-12 text-center">
                            <div className="text-4xl">🔐</div>

                            <h2 className="mt-4 text-xl font-bold text-gray-900">
                                Your vault is empty
                            </h2>

                            <p className="mt-2 text-gray-500">
                                Add your first credential to get started.
                            </p>
                        </div>
                    ) : (
                        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
                            {credentials.map((credential) => (
                                <CredentialCard
                                    key={credential.id}
                                    credential={credential}
                                    showPassword={
                                        showPasswords[credential.id]
                                    }
                                    onTogglePassword={() =>
                                        togglePassword(credential.id)
                                    }
                                    onEdit={() =>
                                        handleEdit(credential)
                                    }
                                    onDelete={() =>
                                        handleDelete(credential.id)
                                    }
                                />
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </main>
    );
};

const Input = ({
    label,
    name,
    value,
    onChange,
    placeholder,
    type = "text",
    required = false,
}) => (
    <div>
        <label className="mb-2 block text-sm font-medium text-gray-700">
            {label}
        </label>

        <input
            name={name}
            type={type}
            value={value}
            onChange={onChange}
            placeholder={placeholder}
            required={required}
            className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
        />
    </div>
);

const CredentialCard = ({
    credential,
    showPassword,
    onTogglePassword,
    onEdit,
    onDelete,
}) => (
    <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
        <div className="flex items-start justify-between gap-4">
            <div>
                <h3 className="font-bold text-gray-900">
                    {credential.title}
                </h3>

                <p className="mt-1 text-xs font-medium uppercase tracking-wide text-blue-600">
                    {credential.type.replaceAll("_", " ")}
                </p>
            </div>

            {credential.favorite && (
                <span className="text-yellow-500">
                    ★
                </span>
            )}
        </div>

        <div className="mt-5 space-y-3">
            <div>
                <p className="text-xs text-gray-500">
                    Username
                </p>

                <p className="mt-1 truncate text-sm text-gray-900">
                    {credential.username || "—"}
                </p>
            </div>

            <div>
                <p className="text-xs text-gray-500">
                    Password
                </p>

                <div className="mt-1 flex items-center gap-2">
                    <p className="flex-1 truncate text-sm text-gray-900">
                        {showPassword
                            ? credential.password
                            : "••••••••••"}
                    </p>

                    <button
                        onClick={onTogglePassword}
                        className="text-xs font-medium text-blue-600 hover:text-blue-700"
                    >
                        {showPassword ? "Hide" : "Show"}
                    </button>
                </div>
            </div>

            {credential.url && (
                <div>
                    <p className="text-xs text-gray-500">
                        URL
                    </p>

                    <a
                        href={credential.url}
                        target="_blank"
                        rel="noreferrer"
                        className="mt-1 block truncate text-sm text-blue-600 hover:underline"
                    >
                        {credential.url}
                    </a>
                </div>
            )}

            {credential.notes && (
                <div>
                    <p className="text-xs text-gray-500">
                        Notes
                    </p>

                    <p className="mt-1 line-clamp-2 text-sm text-gray-700">
                        {credential.notes}
                    </p>
                </div>
            )}
        </div>

        <div className="mt-6 flex gap-3 border-t border-gray-100 pt-4">
            <button
                onClick={onEdit}
                className="flex-1 rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
            >
                Edit
            </button>

            <button
                onClick={onDelete}
                className="flex-1 rounded-lg border border-red-200 px-4 py-2 text-sm font-medium text-red-600 hover:bg-red-50"
            >
                Delete
            </button>
        </div>
    </div>
);

export default Dashboard;