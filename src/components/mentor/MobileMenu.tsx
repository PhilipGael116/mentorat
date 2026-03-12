import { useLocation, Link } from "react-router-dom"
import { LayoutDashboard, MessageSquare, User } from "lucide-react"

const MobileMenu = () => {
    const location = useLocation();

    const items = [
        {
            title: "Dashboard",
            icon: <LayoutDashboard size={24} />,
            path: "/mentor"
        },
        {
            title: "Students",
            icon: <User size={24} />,
            path: "/students"
        },
        {
            title: "Reviews",
            icon: <MessageSquare size={24} />,
            path: "/reviews"
        },
    ]

    return (
        <div className="lg:hidden fixed bottom-6 left-6 right-6 z-50">
            <div className="bg-primary backdrop-blur-lg border border-gray-200 rounded-2xl shadow-xl px-8 py-4">
                <div className="flex justify-between items-center">
                    {items.map((item) => {
                        const isActive = location.pathname === item.path;

                        return (
                            <Link
                                to={item.path}
                                key={item.title}
                                className={`flex flex-col items-center gap-1 transition-all duration-200 ${isActive ? 'text-accent scale-110' : 'text-gray-400 hover:text-accent'
                                    }`}
                            >
                                {item.icon}
                                <span className="text-[10px] font-bold uppercase tracking-wider">{item.title}</span>
                            </Link>
                        );
                    })}
                </div>
            </div>
        </div>
    )
}

export default MobileMenu