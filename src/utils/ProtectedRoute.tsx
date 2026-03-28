import { Outlet, Navigate } from "react-router-dom";
import { useAuthStore } from "../store";

const ProtectedRoute = () => {
    const user = useAuthStore((state) => state.user);
    const token = localStorage.getItem("token");

    // Safeguard: ensures token is a real string and not just "null" or "undefined"
    const hasValidToken = token && token !== "null" && token !== "undefined";

    return (user || hasValidToken) ? <Outlet /> : <Navigate to="/sign-in" />
}


export default ProtectedRoute