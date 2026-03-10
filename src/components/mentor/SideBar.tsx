import { useLocation, Link } from "react-router-dom"
import { LayoutDashboard, LogOut, MessageSquare, User } from "lucide-react"

const SideBar = () => {
    const location = useLocation();
    const items = [
        {
            title: "Dashboard",
            icon: <LayoutDashboard size={20} />,
            path: "/mentor"
        },
        {
            title: "Students",
            icon: <User size={20} />,
            path: "/students"
        },
        {
            title: "Reviews",
            icon: <MessageSquare size={20} />,
            path: "/reviews"
        },
        {
            title: "Logout",
            icon: <LogOut size={20} />,
            path: "/logout"
        },
    ]

    return (
        <div className="flex flex-col justify-between w-64 h-[calc(100vh-5rem)] py-12 px-8 font-heading mx-20 mt-10 rounded-2xl border-2 shadow-sm sticky top-10">
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

            <div key={items[3].title} className="flex gap-4 items-center cursor-pointer hover:text-red-500 transition-colors pt-10 border-t border-gray-300">
                {items[3].icon}
                <span className="font-semibold">{items[3].title}</span>
            </div>
        </div>
    )
}

export default SideBar  