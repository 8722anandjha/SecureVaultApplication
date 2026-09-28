import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { login, clearError } from "../store/authSlice";

const Login = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const { loading, error } = useSelector((state) => state.auth);

    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });

    const handleChange = (e) => {
        const { name, value } = e.target;

        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));

        if (error) {
            dispatch(clearError());
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!formData.email || !formData.password) {
            return;
        }

        const result = await dispatch(login(formData));

        if (login.fulfilled.match(result)) {
            navigate("/dashboard");
        }
    };

    return (
        <main className="min-h-[calc(100vh-73px)] bg-gray-50 px-6 py-12">
            <div className="mx-auto grid max-w-6xl items-center gap-12 md:grid-cols-2">

                {/* Left Section */}
                <div className="hidden md:block">
                    <span className="inline-block rounded-full bg-blue-100 px-4 py-2 text-sm font-medium text-blue-700">
                        Welcome Back
                    </span>

                    <h1 className="mt-6 text-4xl font-bold leading-tight text-gray-900">
                        Your credentials.
                        <span className="text-blue-600">
                            {" "}One secure vault.
                        </span>
                    </h1>

                    <p className="mt-5 max-w-lg text-lg leading-8 text-gray-600">
                        Sign in to securely access your passwords, credentials,
                        secure notes and other protected information.
                    </p>

                    <div className="mt-8 space-y-4">
                        <Benefit
                            title="Secure Access"
                            description="Your account is protected by authenticated access."
                        />

                        <Benefit
                            title="Private Vault"
                            description="Your credentials stay inside your protected vault."
                        />

                        <Benefit
                            title="Centralized Management"
                            description="Manage your important credentials from one place."
                        />
                    </div>
                </div>

                {/* Login Card */}
                <div className="mx-auto w-full max-w-md">
                    <div className="rounded-2xl border border-gray-200 bg-white p-8 shadow-sm">

                        <div className="text-center">
                            <h2 className="text-2xl font-bold text-gray-900">
                                Welcome Back
                            </h2>

                            <p className="mt-2 text-sm text-gray-500">
                                Login to your SecureVault account
                            </p>
                        </div>

                        {/* Error */}
                        {error && (
                            <div className="mt-6 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
                                {error}
                            </div>
                        )}

                        <form
                            onSubmit={handleSubmit}
                            className="mt-6 space-y-5"
                        >
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
                                    placeholder="you@example.com"
                                    autoComplete="email"
                                    className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                                />
                            </div>

                            {/* Password */}
                            <div>
                                <div className="mb-2 flex items-center justify-between">
                                    <label
                                        htmlFor="password"
                                        className="block text-sm font-medium text-gray-700"
                                    >
                                        Password
                                    </label>

                                    <button
                                        type="button"
                                        className="text-sm font-medium text-blue-600 hover:text-blue-700"
                                    >
                                        Forgot password?
                                    </button>
                                </div>

                                <input
                                    id="password"
                                    name="password"
                                    type="password"
                                    value={formData.password}
                                    onChange={handleChange}
                                    placeholder="Enter your password"
                                    autoComplete="current-password"
                                    className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                                />
                            </div>

                            {/* Login Button */}
                            <button
                                type="submit"
                                disabled={loading}
                                className="w-full rounded-lg bg-blue-600 px-5 py-3 font-semibold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60"
                            >
                                {loading ? "Signing In..." : "Sign In"}
                            </button>
                        </form>

                        {/* Register */}
                        <p className="mt-6 text-center text-sm text-gray-600">
                            Don't have an account?{" "}

                            <Link
                                to="/register"
                                className="font-semibold text-blue-600 hover:text-blue-700"
                            >
                                Create Account
                            </Link>
                        </p>
                    </div>
                </div>
            </div>
        </main>
    );
};

const Benefit = ({ title, description }) => (
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

export default Login;