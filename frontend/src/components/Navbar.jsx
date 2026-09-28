import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../store/authSlice";

const Navbar = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);
  const navigate = useNavigate();


  const handleLogout = async () => {
        const result = await dispatch(logout());

        if (logout.fulfilled.match(result)) {
            navigate("/");
        }
    };

  return (
    <nav className="border-b border-gray-200 bg-white">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        {/* Logo */}
        <Link to="/" className="text-2xl font-bold text-gray-900">
          Secure<span className="text-blue-600">Vault</span>
        </Link>

        {/* Navigation */}
        <div className="hidden items-center gap-8 md:flex text-xl font-medium text-gray-700">
          <Link to="/" className="text-gray-600 transition hover:text-blue-600">
            Home
          </Link>

          <a
            href="#features"
            className="text-gray-600 transition hover:text-blue-600"
          >
            Features
          </a>

          <a
            href="#security"
            className="text-gray-600 transition hover:text-blue-600"
          >
            Security
          </a>
        </div>

        {/* Auth buttons */}
        <div className="flex items-center gap-3">
          {user ? (
            <>
              <Link
                to="/dashboard"
                className="rounded-lg bg-blue-600 px-5 py-2.5 font-medium text-white transition hover:bg-blue-700"
              >
                Dashboard
              </Link>

              <button
                onClick={handleLogout}
                className="rounded-lg px-4 py-2 font-medium text-gray-700 transition cursor-pointer hover:bg-gray-100"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link
                to="/login"
                className="rounded-lg px-4 py-2 font-medium text-gray-700 transition hover:bg-gray-100"
              >
                Login
              </Link>

              <Link
                to="/register"
                className="rounded-lg bg-blue-600 px-5 py-2.5 font-medium text-white transition hover:bg-blue-700"
              >
                Get Started
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
