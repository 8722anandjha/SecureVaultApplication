import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { registerUser } from "../services/authService.js";

const Register = () => {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
    });

    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;

        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        setError("");
        setSuccess("");

        if (!formData.name || !formData.email || !formData.password) {
            setError("Please fill in all fields.");
            return;
        }

        try {
            setLoading(true);

            await registerUser(formData);

            setSuccess("Account created successfully. Redirecting to login...");
             
            setTimeout(() => {
                navigate("/login");
            }, 1200);
           

        } catch (error) {
            setError(
                error.response?.data?.message ||
                "Registration failed. Please try again."
            );
        } finally {
            setLoading(false);
            setFormData(()=>(
                {
                name: "",
                email: "",
                password: "",
            }
             ));
        }
    };

    return (
        <main className="min-h-[calc(100vh-73px)] bg-gray-50 px-6 py-12">

            <div className="mx-auto grid max-w-6xl items-center gap-12 md:grid-cols-2">

                {/* Left section */}
                <div className="hidden md:block">

                    <span className="inline-block rounded-full bg-blue-100 px-4 py-2 text-sm font-medium text-blue-700">
                        Start Your Secure Journey
                    </span>

                    <h1 className="mt-6 text-4xl font-bold leading-tight text-gray-900">
                        Create your
                        <span className="text-blue-600"> SecureVault</span>
                    </h1>

                    <p className="mt-5 max-w-lg text-lg leading-8 text-gray-600">
                        Create one secure account to manage your passwords,
                        credentials, secure notes and other sensitive
                        information.
                    </p>

                    <div className="mt-8 space-y-4">

                        <Benefit
                            title="Secure Authentication"
                            description="Your account password is securely hashed before storage."
                        />

                        <Benefit
                            title="Centralized Vault"
                            description="Keep your credentials organized in one place."
                        />

                        <Benefit
                            title="Protected Access"
                            description="Your vault will be accessible only after authentication."
                        />

                    </div>
                </div>

                {/* Register card */}
                <div className="mx-auto w-full max-w-md">

                    <div className="rounded-2xl border border-gray-200 bg-white p-8 shadow-sm">

                        <div className="text-center">

                            <h2 className="text-2xl font-bold text-gray-900">
                                Create Account
                            </h2>

                            <p className="mt-2 text-sm text-gray-500">
                                Create your SecureVault account
                            </p>

                        </div>

                        {/* Error */}
                        {error && (
                            <div className="mt-6 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
                                {error}
                            </div>
                        )}

                        {/* Success */}
                        {success && (
                            <div className="mt-6 rounded-lg border border-green-200 bg-green-50 px-4 py-3 text-sm text-green-700">
                                {success}
                            </div>
                        )}

                        <form
                            onSubmit={handleSubmit}
                            className="mt-6 space-y-5"
                        >

                            {/* Name */}
                            <div>
                                <label
                                    htmlFor="name"
                                    className="mb-2 block text-sm font-medium text-gray-700"
                                >
                                    Full Name
                                </label>

                                <input
                                    id="name"
                                    name="name"
                                    type="text"
                                    value={formData.name}
                                    onChange={handleChange}
                                    autoComplete="name"
                                    placeholder="Enter your name"
                                    className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                                />
                            </div>

                            {/* Email */}
                            <div>
                                <label
                                    htmlFor="email"
                                    className="mb-2 block text-sm font-medium text-gray-700"
                                >
                                    Email Address
                                </label>

                                <input
                                    id="email"
                                    name="email"
                                    type="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    autoComplete="email"
                                    placeholder="you@example.com"
                                    className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                                />
                            </div>

                            {/* Password */}
                            <div>
                                <label
                                    htmlFor="password"
                                    className="mb-2 block text-sm font-medium text-gray-700"
                                >
                                    Password
                                </label>

                                <input
                                    id="password"
                                    name="password"
                                    type="password"
                                    value={formData.password}
                                    onChange={handleChange}
                                    autoComplete="new-password"
                                    placeholder="Create a strong password"
                                    className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                                />

                                <p className="mt-2 text-xs text-gray-500">
                                    Use a strong password that you don't use
                                    elsewhere.
                                </p>
                            </div>

                            {/* Submit */}
                            <button
                                type="submit"
                                disabled={loading}
                                className="w-full rounded-lg bg-blue-600 px-5 py-3 font-semibold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60"
                            >
                                {loading
                                    ? "Creating Account..."
                                    : "Create Account"}
                            </button>

                        </form>

                        {/* Login link */}
                        <p className="mt-6 text-center text-sm text-gray-600">
                            Already have an account?{" "}
                            <Link
                                to="/login"
                                className="font-semibold text-blue-600 hover:text-blue-700"
                            >
                                Login
                            </Link>
                        </p>

                    </div>

                </div>

            </div>

        </main>
    );
};

const Benefit = ({ title, description }) => {
    return (
        <div className="flex gap-4">

            <div className="mt-1 flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-blue-100 text-blue-600">
                ✓
            </div>

            <div>
                <h3 className="font-semibold text-gray-900">
                    {title}
                </h3>

                <p className="mt-1 text-sm leading-6 text-gray-600">
                    {description}
                </p>
            </div>

        </div>
    );
};

export default Register;