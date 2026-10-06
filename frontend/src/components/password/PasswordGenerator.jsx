import { useState } from "react";
import {
    generatePassword,
    checkPasswordStrength,
} from "../../services/passwordService";

const PasswordGenerator = ({ onUsePassword }) => {

    const [length, setLength] = useState(20);

    const [options, setOptions] = useState({
        includeUppercase: true,
        includeLowercase: true,
        includeNumbers: true,
        includeSymbols: true,
    });

    const [password, setPassword] = useState("");
    const [strength, setStrength] = useState(null);
    const [loading, setLoading] = useState(false);
    const [copied, setCopied] = useState(false);
    const [error, setError] = useState("");

    const handleOptionChange = (option) => {
        setOptions((previous) => ({
            ...previous,
            [option]: !previous[option],
        }));
    };

    const handleGenerate = async () => {

        setError("");
        setLoading(true);

        try {

            const result = await generatePassword({
                length,
                ...options,
            });

            setPassword(result.password);

            setStrength({
                score: result.score,
                strength: result.strength,
            });

        } catch (error) {

            setError(
                error.response?.data?.message ||
                "Failed to generate password"
            );

        } finally {
            setLoading(false);
        }
    };

    const handleStrengthCheck = async (value) => {

        setPassword(value);

        if (!value) {
            setStrength(null);
            return;
        }

        try {

            const result =
                await checkPasswordStrength(value);

            setStrength(result);

        } catch (error) {

            console.error(
                "Password strength check failed:",
                error
            );
        }
    };

    const handleCopy = async () => {

        if (!password) return;

        await navigator.clipboard.writeText(password);

        setCopied(true);

        setTimeout(() => {
            setCopied(false);
        }, 1500);
    };

    const handleUsePassword = () => {

        if (!password) return;

        if (onUsePassword) {
            onUsePassword(password);
        }
    };

    const getStrengthWidth = () => {

        if (!strength) return "0%";

        return `${(strength.score / 4) * 100}%`;
    };

    return (
        <div className="w-full max-w-xl rounded-2xl bg-white p-6 shadow-xl">

            <div className="mb-6">

                <h2 className="text-2xl font-bold text-gray-900">
                    Password Generator
                </h2>

                <p className="mt-1 text-sm text-gray-500">
                    Generate a strong and secure password.
                </p>

            </div>

            {error && (
                <div className="mb-4 rounded-lg bg-red-50 p-3 text-sm text-red-600">
                    {error}
                </div>
            )}

            {/* Password */}

            <div className="mb-5">

                <label className="mb-2 block text-sm font-medium text-gray-700">
                    Generated Password
                </label>

                <div className="flex gap-2">

                    <input
                        type="text"
                        value={password}
                        onChange={(e) =>
                            handleStrengthCheck(e.target.value)
                        }
                        placeholder="Generate a password"
                        className="flex-1 rounded-lg border border-gray-300 px-4 py-3 font-mono text-sm outline-none focus:border-indigo-500"
                    />

                    <button
                        onClick={handleCopy}
                        disabled={!password}
                        className="rounded-lg bg-gray-100 px-4 py-2 text-sm font-medium hover:bg-gray-200 disabled:cursor-not-allowed disabled:opacity-50"
                    >
                        {copied ? "Copied" : "Copy"}
                    </button>

                </div>

            </div>

            {/* Strength */}

            {strength && (
                <div className="mb-5">

                    <div className="mb-2 flex justify-between text-sm">

                        <span className="font-medium text-gray-700">
                            Strength
                        </span>

                        <span className="font-semibold">
                            {strength.strength}
                        </span>

                    </div>

                    <div className="h-2 w-full overflow-hidden rounded-full bg-gray-200">

                        <div
                            className="h-full rounded-full bg-indigo-500 transition-all"
                            style={{
                                width: getStrengthWidth(),
                            }}
                        />

                    </div>

                </div>
            )}

            {/* Length */}

            <div className="mb-5">

                <div className="mb-2 flex justify-between">

                    <label className="text-sm font-medium text-gray-700">
                        Password Length
                    </label>

                    <span className="font-semibold text-indigo-600">
                        {length}
                    </span>

                </div>

                <input
                    type="range"
                    min="8"
                    max="128"
                    value={length}
                    onChange={(e) =>
                        setLength(Number(e.target.value))
                    }
                    className="w-full"
                />

            </div>

            {/* Options */}

            <div className="mb-6 grid grid-cols-2 gap-3">

                {[
                    ["includeUppercase", "Uppercase"],
                    ["includeLowercase", "Lowercase"],
                    ["includeNumbers", "Numbers"],
                    ["includeSymbols", "Symbols"],
                ].map(([key, label]) => (

                    <label
                        key={key}
                        className="flex cursor-pointer items-center gap-2 rounded-lg border border-gray-200 p-3 hover:bg-gray-50"
                    >

                        <input
                            type="checkbox"
                            checked={options[key]}
                            onChange={() =>
                                handleOptionChange(key)
                            }
                            className="h-4 w-4"
                        />

                        <span className="text-sm text-gray-700">
                            {label}
                        </span>

                    </label>

                ))}

            </div>

            {/* Buttons */}

            <div className="flex gap-3">

                <button
                    onClick={handleGenerate}
                    disabled={loading}
                    className="flex-1 rounded-lg bg-indigo-600 px-4 py-3 font-semibold text-white hover:bg-indigo-700 disabled:opacity-50"
                >
                    {loading
                        ? "Generating..."
                        : "Generate Password"}
                </button>

                <button
                    onClick={handleUsePassword}
                    disabled={!password}
                    className="rounded-lg border border-indigo-600 px-4 py-3 font-semibold text-indigo-600 hover:bg-indigo-50 disabled:opacity-50"
                >
                    Use Password
                </button>

            </div>

        </div>
    );
};

export default PasswordGenerator;