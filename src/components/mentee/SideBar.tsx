import { useLocation, Link } from "react-router-dom"
import { LayoutDashboard, LogOut, MessageSquare, User } from "lucide-react"
import { useAuthStore } from "../../store";

const SideBar = () => {
    const location = useLocation();
    const setUser = useAuthStore((state) => state.setUser);

    const logout = () => {
        setUser(false);
    }

    const items = [
        {
            title: "Dashboard",
            icon: <LayoutDashboard size={20} />,
            path: "/mentee"
        },
        {
            title: "Mentors",
            icon: <User size={20} />,
            path: "/mentee/mentors"
        },
        {
            title: "My Reviews",
            icon: <MessageSquare size={20} />,
            path: "/mentee/reviews"
        },
        {
            title: "Logout",
            icon: <LogOut size={20} />,
            path: "/sign-in"
        },
    ]

    return (
        <div className="lg:flex flex-col justify-between w-64 h-[calc(100vh-5rem)] py-12 px-8 font-heading mx-20 mt-10 rounded-2xl border-2 shadow-sm sticky top-10 hidden ">
            <div className="flex flex-col gap-8">
                {items.slice(0, 3).map((item) => {
                    const isActive = location.pathname === item.path;
                    return (
                        <Link
                            to={item.path}
                            key={item.title}
                            className={`flex gap-4 items-center p-3 rounded-xl transition-all duration-200 ${isActive ? 'text-accent font-bold' : 'text-gray-500 hover:text-accent font-semibold'}`}
                        >
                            {item.icon}
                            <span>{item.title}</span>
                        </Link>
                    );
                })}
            </div>

            <div onClick={logout} key={items[3].title} className="flex gap-4 items-center cursor-pointer hover:text-red-500 transition-colors pt-10 border-t border-gray-300">
                {items[3].icon}
                <span className="font-semibold">{items[3].title}</span>
            </div>
        </div>
    )
}

export default SideBar  