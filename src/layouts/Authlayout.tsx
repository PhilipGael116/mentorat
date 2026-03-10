import { Outlet } from "react-router-dom"

const AuthLayout = () => {
    return (
        <div className="flex w-full fixed h-screen">
            <img
                src="/hero-blob.svg"
                className="absolute -top-40 -left-70 w-[500px] opacity-15 pointer-events-none select-none"
                alt=""
            />
            <img
                src="/hero-blob.svg"
                className="absolute -bottom-40 -right-70 w-[450px] opacity-15 pointer-events-none select-none"
                alt=""
            />
            <img src="/welcome.svg" alt="Auth side image" className="object-contain flex-1 w-1/2 hidden lg:block" />
            <div className="flex-1 w-1/2 border-l border-secondary/10">
                <Outlet />
            </div>
        </div>
    )
}

export default AuthLayout