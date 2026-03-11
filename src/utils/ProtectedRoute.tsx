import { Outlet, Navigate } from "react-router-dom";
import { useAuthStore } from "../store";

const ProtectedRoute = () => {
    const user = useAuthStore((state) => state.user);

    return user ? <Outlet /> : <Navigate to="/sign-in" />
}

export default ProtectedRoute