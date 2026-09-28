import { Link } from "react-router-dom";

const Home = () => {
    return (
        <main>

            {/* Hero */}
            <section className="bg-gradient-to-b from-blue-50 to-white">
                <div className="mx-auto grid max-w-7xl items-center gap-12 px-6 py-24 md:grid-cols-2">

                    <div>
                        <span className="inline-block rounded-full bg-blue-100 px-4 py-2 text-sm font-medium text-blue-700">
                            Secure. Simple. Private.
                        </span>

                        <h1 className="mt-6 text-5xl font-bold leading-tight text-gray-900">
                            Your passwords.
                            <br />
                            <span className="text-blue-600">
                                Secured in one vault.
                            </span>
                        </h1>

                        <p className="mt-6 max-w-xl text-lg leading-8 text-gray-600">
                            SecureVault helps you securely store, organize,
                            generate and manage your credentials from one
                            protected place.
                        </p>

                        <div className="mt-8 flex gap-4">
                            <Link
                                to="/register"
                                className="rounded-lg bg-blue-600 px-6 py-3 font-semibold text-white transition hover:bg-blue-700"
                            >
                                Create Your Vault
                            </Link>

                            <a
                                href="#features"
                                className="rounded-lg border border-gray-300 px-6 py-3 font-semibold text-gray-700 transition hover:bg-gray-50"
                            >
                                Explore Features
                            </a>
                        </div>
                    </div>

                    {/* Security illustration */}
                    <div className="flex justify-center">
                        <div className="flex h-80 w-80 items-center justify-center rounded-3xl bg-blue-100">
                            <div className="flex h-52 w-52 items-center justify-center rounded-full bg-white shadow-xl">
                                <span className="text-7xl">🔐</span>
                            </div>
                        </div>
                    </div>

                </div>
            </section>

            {/* Features */}
            <section
                id="features"
                className="bg-white px-6 py-24"
            >
                <div className="mx-auto max-w-7xl">

                    <div className="mx-auto max-w-2xl text-center">
                        <h2 className="text-3xl font-bold text-gray-900">
                            Everything you need to protect your credentials
                        </h2>

                        <p className="mt-4 text-gray-600">
                            SecureVault brings credential management and
                            security tools together in one place.
                        </p>
                    </div>

                    <div className="mt-12 grid gap-6 md:grid-cols-3">

                        <FeatureCard
                            icon="🔐"
                            title="Secure Vault"
                            description="Store and organize your credentials in a protected vault."
                        />

                        <FeatureCard
                            icon="⚡"
                            title="Password Generator"
                            description="Generate strong passwords based on your requirements."
                        />

                        <FeatureCard
                            icon="🛡️"
                            title="Security Monitoring"
                            description="Monitor account activity and identify suspicious events."
                        />

                        <FeatureCard
                            icon="🔗"
                            title="Secure Sharing"
                            description="Share credentials with controlled access and permissions."
                        />

                        <FeatureCard
                            icon="📊"
                            title="Security Dashboard"
                            description="Understand your credential and security activity."
                        />

                        <FeatureCard
                            icon="📝"
                            title="Audit Logs"
                            description="Keep track of important security and account activity."
                        />

                    </div>
                </div>
            </section>

            {/* Security */}
            <section
                id="security"
                className="bg-gray-50 px-6 py-24"
            >
                <div className="mx-auto max-w-4xl text-center">

                    <h2 className="text-3xl font-bold text-gray-900">
                        Security is at the core of SecureVault
                    </h2>

                    <p className="mt-5 text-lg leading-8 text-gray-600">
                        SecureVault is designed around authentication,
                        encrypted credential storage and controlled access.
                    </p>

                    <div className="mt-10 grid gap-6 text-left md:grid-cols-3">

                        <SecurityItem
                            title="Authentication"
                            description="JWT-based authentication with Spring Security."
                        />

                        <SecurityItem
                            title="Password Protection"
                            description="User passwords are securely hashed before storage."
                        />

                        <SecurityItem
                            title="Controlled Access"
                            description="Protected APIs require authenticated access."
                        />

                    </div>
                </div>
            </section>

            {/* CTA */}
            <section className="bg-blue-600 px-6 py-20 text-center">

                <h2 className="text-3xl font-bold text-white">
                    Take control of your credentials
                </h2>

                <p className="mx-auto mt-4 max-w-xl text-blue-100">
                    Create your SecureVault and keep your credentials
                    organized and protected.
                </p>

                <Link
                    to="/register"
                    className="mt-8 inline-block rounded-lg bg-white px-7 py-3 font-semibold text-blue-600 transition hover:bg-gray-100"
                >
                    Get Started
                </Link>

            </section>

        </main>
    );
};

const FeatureCard = ({ icon, title, description }) => {
    return (
        <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-md">

            <div className="text-3xl">
                {icon}
            </div>

            <h3 className="mt-5 text-xl font-semibold text-gray-900">
                {title}
            </h3>

            <p className="mt-3 leading-6 text-gray-600">
                {description}
            </p>

        </div>
    );
};

const SecurityItem = ({ title, description }) => {
    return (
        <div className="rounded-xl bg-white p-6 shadow-sm">
            <h3 className="font-semibold text-gray-900">
                {title}
            </h3>

            <p className="mt-2 text-sm leading-6 text-gray-600">
                {description}
            </p>
        </div>
    );
};

export default Home;