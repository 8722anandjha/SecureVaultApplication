import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

const ProtectedRoute = ({ children }) => {
    const { user, initialized } = useSelector((state) => state.auth);

    // Wait until authentication check is complete
    if (!initialized) {
        return (
            <div className="flex min-h-screen items-center justify-center bg-gray-50">
                <p className="text-gray-500">
                    Checking authentication...
                </p>
            </div>
        );
    }

    // User is not authenticated
    if (!user) {
        return <Navigate to="/login" replace />;
    }

    // User is authenticated
    return children;
};

export default ProtectedRoute;