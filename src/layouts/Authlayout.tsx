import { Outlet } from "react-router-dom"

const AuthLayout = () => {
    return (
        <div className="flex w-full fixed h-screen">
            <img src="/welcome.svg" alt="Auth side image" className="object-contain flex-1 w-1/2 hidden lg:block" />
            <div className="flex-1 w-1/2 border-l border-secondary/10">
                <Outlet />
            </div>
        </div>
    )
}

export default AuthLayout