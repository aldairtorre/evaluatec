import { useContext } from "react";
import { UserContext } from "../context/UserContext";
import { Navigate } from "react-router-dom";

export const ProtectedRoute = ({ allow = [], children }) => {
    const { userAuthenticate, loading } = useContext(UserContext);

    if (loading) return null; // o spinner
    if (!userAuthenticate) return <Navigate to="auth/login" replace />;

    const role = userAuthenticate?.profile?.name;
    if (allow.length && !allow.includes(role)) return <Navigate to="/admin/users" replace />;

    return children;
};