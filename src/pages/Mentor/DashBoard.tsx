import { useState } from "react"
import { Star, User, LogOut } from "lucide-react"
import { Link } from "react-router-dom"
import { useAuthStore } from "../../store"

const DashBoard = () => {
    const setUser = useAuthStore((state) => state.setUser);
    const [isProfileOpen, setIsProfileOpen] = useState(false);

    const logout = () => {
        setUser(false);
    }

    const recentStudents = [
        {
            id: 1,
            name: "Philippe",
            email: "philippe@example.com",
            dateJoined: "26th February, 2026",
        },
        {
            id: 2,
            name: "Gauthier",
            email: "gauthier@example.com",
            dateJoined: "25th February, 2026",
        },
        {
            id: 3,
            name: "Samuel Eto'o",
            email: "sam.etoo@outlook.com",
            dateJoined: "24th February, 2026",
        },
    ];

    return (
        <div className="sm:mx-20 sm:my-10 mx-6 my-5">
            <div className="flex justify-between items-center relative">
                <h1 className="text-2xl sm:text-3xl lg:text-4xl font-heading">Welcome, Philippe</h1>

                <div className="relative">
                    <button
                        onClick={() => setIsProfileOpen(!isProfileOpen)}
                        className="bg-accent/7 p-2 rounded-full w-10 h-10 flex items-center justify-center hover:bg-accent/20 transition-colors"
                    >
                        <User size={24} />
                    </button>

                    {isProfileOpen && (
                        <div className="absolute right-0 mt-2 w-48 bg-primary border border-gray-200 rounded-2xl shadow-xl overflow-hidden py-2 z-50 animate-in fade-in zoom-in-95 duration-200">
                            <button
                                onClick={logout}
                                className="flex items-center gap-3 w-full text-left px-4 py-3 text-gray-700 font-medium hover:bg-red-50 hover:text-red-500 transition-colors"
                            >
                                <LogOut size={18} />
                                Logout
                            </button>
                        </div>
                    )}
                </div>
            </div>

            {/* Stats */}
            <div className="flex flex-col sm:flex-row gap-10 mt-10">
                <div className="p-10 rounded-2xl shadow-sm w-full flex items-center justify-between bg-accent/7">
                    <div>
                        <h2 className="lg:text-2xl text-xl font-heading">No. of Students</h2>
                        <p className="lg:text-4xl text-3xl font-heading mt-2">100</p>
                    </div>
                    <User size={30} className="w-7 h-7 flex items-center justify-center" />
                </div>
                <div className="p-10 rounded-2xl shadow-sm w-full flex items-center justify-between bg-green-500/7">
                    <div>
                        <h2 className="lg:text-2xl  text-xl font-heading">Av. Rating</h2>
                        <p className="lg:text-4xl text-3xl font-heading mt-2">4.8</p>
                    </div>
                    <Star size={30} className="w-7 h-7 flex items-center justify-center" />
                </div>
            </div>

            {/* Recent Students */}
            <div className="mt-10 px-4 sm:px-10 pb-10 pt-4 border rounded-2xl border-gray-300">
                <div className="flex justify-between items-center mb-8">
                    <h2 className="text-2xl font-heading">Recent Students</h2>
                    <Link to="/mentor/students" className="rounded-xl bg-secondary text-white p-2 px-4 text-sm font-semibold flex items-center justify-center">View all</Link>
                </div>

                {/* Table Header (hidden on mobile) */}
                <div className="hidden sm:grid sm:grid-cols-[80px_1fr_1fr] border-b border-gray-200 pb-4 mb-6 text-gray-400 font-semibold uppercase text-xs tracking-wider">
                    <div>No.</div>
                    <div>Name</div>
                    <div className="text-right">Date Joined</div>
                </div>

                {/* Student Rows */}
                <div className="space-y-6">
                    {recentStudents.map((student, index) => (
                        <div
                            key={student.id}
                            className="flex flex-col gap-2 sm:grid sm:grid-cols-[80px_1fr_1fr] sm:items-center sm:border-0 border-b border-gray-200 sm:pb-4 sm:mb-0 pb-4 mb-6 last:border-0 last:mb-0"
                        >
                            {/* Number */}
                            <div className="font-heading text-lg">
                                <span className="sm:hidden text-gray-400 text-sm">No: </span>
                                {index + 1}
                            </div>

                            {/* Name + Email */}
                            <div className="flex items-center gap-4">
                                <div>
                                    <h3 className="text-lg font-heading">{student.name}</h3>
                                    <p className="text-sm text-gray-500">{student.email}</p>
                                </div>
                            </div>

                            {/* Date Joined */}
                            <div className="sm:text-right font-medium text-gray-600">
                                <span className="sm:hidden text-gray-400 text-sm">Joined: </span>
                                {student.dateJoined}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default DashBoard