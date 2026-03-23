import { useLocation, Link } from "react-router-dom"
import { LayoutDashboard, LogOut, MessageSquare, User } from "lucide-react"
import { useAuthStore } from "../../store";
import { useTranslation } from "react-i18next";

const SideBar = () => {
    const location = useLocation();
    const { t } = useTranslation();
    const logout = useAuthStore((state) => state.logout);

    const items = [
        {
            titleKey: "mentorSidebar.dashboard",
            icon: <LayoutDashboard size={20} />,
            path: "/mentor"
        },
        {
            titleKey: "mentorSidebar.students",
            icon: <User size={20} />,
            path: "/mentor/students"
        },
        {
            titleKey: "mentorSidebar.reviews",
            icon: <MessageSquare size={20} />,
            path: "/mentor/reviews"
        },
        {
            titleKey: "mentorSidebar.logout",
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
                            key={item.titleKey}
                            className={`flex gap-4 items-center p-3 rounded-xl transition-all duration-200 ${isActive ? 'text-accent font-bold' : 'text-gray-500 hover:text-accent font-semibold'}`}
                        >
                            {item.icon}
                            <span>{t(item.titleKey)}</span>
                        </Link>
                    );
                })}
            </div>

            <div onClick={logout} key={items[3].titleKey} className="flex gap-4 items-center cursor-pointer hover:text-red-500 transition-colors pt-10 border-t border-gray-300">
                {items[3].icon}
                <span className="font-semibold">{t(items[3].titleKey)}</span>
            </div>
        </div>
    )
}

export default SideBar  