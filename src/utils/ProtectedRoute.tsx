import { Outlet, Navigate } from "react-router-dom";
import { useAuthStore } from "../store";

const ProtectedRoute = () => {
    const user = useAuthStore((state) => state.user);
    const token = localStorage.getItem("token");

    return (user || token) ? <Outlet /> : <Navigate to="/sign-in" />
}


export default ProtectedRoute