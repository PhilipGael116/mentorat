import { User, LogOut, Star } from 'lucide-react'
import { useState } from 'react'
import { useAuthStore } from '../../store'
import { Link } from 'react-router-dom'

const MenteeDashBoard = () => {
    const [isProfileOpen, setIsProfileOpen] = useState(false);
    const setUser = useAuthStore((state) => state.setUser);
    const logout = () => {
        setUser(false);
    }

    const avatarColors = [
        'bg-[#FF6B6B]', // Soft Red
        'bg-[#4ECDC4]', // Medium Turquoise
        'bg-[#45B7D1]', // Sky Blue
        'bg-[#96CEB4]', // Sage Green
        'bg-[#FFEEAD]', // Cream Yellow
        'bg-[#D4A5A5]', // Dusty Rose
        'bg-[#9B59B6]', // Amethyst Purple
        'bg-accent',    // Theme Accent
    ];

    const getInitials = (name: string) => {
        return name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);
    };

    const getAvatarColor = (name: string) => {
        let hash = 0;
        for (let i = 0; i < name.length; i++) {
            hash = name.charCodeAt(i) + ((hash << 5) - hash);
        }
        const index = Math.abs(hash) % avatarColors.length;
        return avatarColors[index];
    };

    const mentors = [
        {
            id: 1,
            name: "Philippe Gael",
            about: "Senior Fullstack Developer with 8+ years of experience in React and Node.js. Passionate about building scalable apps.",
            students: 1,
            rating: 4.9,
            role: "Software Engineer"
        },
        {
            id: 2,
            name: "Sarah Johnson",
            about: "UI/UX Designer helping students master Figma and design thinking principles. Expert in mobile-first design.",
            students: 8,
            rating: 4.8,
            role: "Product Designer"
        },
        {
            id: 3,
            name: "Dr. Robert Smith",
            about: "Data Scientist specialized in Machine Learning and AI. I help developers transition into AI roles.",
            students: 21,
            rating: 5.0,
            role: "AI Researcher"
        },
    ];

    return (
        <div className="sm:mx-20 sm:my-10 mx-6 my-5">
            <div className="flex justify-between items-center relative gap-4">
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
                        <h2 className="lg:text-2xl text-xl font-heading text-secondary/80">Active Mentors</h2>
                        <p className="lg:text-4xl text-3xl font-heading mt-2 text-secondary">{mentors.length}</p>
                    </div>
                    <User size={30} className="w-8 h-8 text-accent" />
                </div>
                <div className="p-10 rounded-2xl shadow-sm w-full flex items-center justify-between bg-green-500/7">
                    <div>
                        <h2 className="lg:text-2xl text-xl font-heading text-secondary/80">My Reviews</h2>
                        <p className="lg:text-4xl text-3xl font-heading mt-2 text-secondary">3</p>
                    </div>
                    <Star size={30} className="w-8 h-8 text-green-600" />
                </div>
            </div>

            {/* Mentors on the app */}
            <div className="mt-10 px-4 sm:px-10 pb-10 pt-4 border rounded-2xl border-gray-300">
                <div className="flex justify-between items-center mb-10">
                    <h2 className="text-2xl font-heading">Popular Mentors</h2>
                    <Link to="/mentee/mentors" className="rounded-xl bg-secondary text-white p-2 px-6 text-sm font-semibold hover:opacity-90 transition-all">View all</Link>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {mentors.map((mentor) => (
                        <div key={mentor.id} className="relative rounded-3xl border border-gray-300 overflow-hidden min-w-[250px]">
                            {/* Banner Background */}
                            <div className={`h-32 w-full ${getAvatarColor(mentor.name)} opacity-80`}></div>

                            {/* Content Wrapper */}
                            <div className="p-6 pt-0">
                                {/* Profile Part */}
                                <div className="flex flex-col items-center text-center -mt-10">
                                    <div className={`w-20 h-20 rounded-full z-10 ${getAvatarColor(mentor.name)} flex items-center justify-center text-white text-2xl font-bold font-heading mb-4 shadow-xl ring-4 ring-white`}>
                                        {getInitials(mentor.name)}
                                    </div>
                                    <h3 className="text-xl font-bold text-secondary font-heading">{mentor.name}</h3>
                                    <p className="text-accent text-sm font-medium mb-4 uppercase tracking-wider">{mentor.role}</p>

                                    <p className="text-gray-500 text-sm leading-relaxed line-clamp-2 mb-6">
                                        {mentor.about}
                                    </p>
                                </div>

                                {/* Stats */}
                                <div className="flex justify-center gap-6 mb-8 py-4 border-y border-gray-100">
                                    <div className="flex items-center gap-2 text-gray-500">
                                        <User size={16} className="text-secondary/40" />
                                        <span className="text-sm font-semibold">{mentor.students} <span className="font-normal text-xs uppercase">Students</span></span>
                                    </div>
                                    <div className="flex items-center gap-2 text-gray-500">
                                        <Star size={16} className="text-yellow-500 fill-yellow-500" />
                                        <span className="text-sm font-semibold">{mentor.rating} <span className="font-normal text-xs uppercase">Rating</span></span>
                                    </div>
                                </div>

                                {/* Actions */}
                                <div className="grid grid-cols-2 gap-3">
                                    <button className="py-2.5 rounded-xl border-2 border-secondary/10 text-secondary font-bold text-sm hover:bg-secondary/5 transition-colors">
                                        View Profile
                                    </button>
                                    <button className="py-2.5 rounded-xl bg-secondary text-white font-bold text-sm hover:opacity-90 transition-all shadow-sm shadow-accent/20">
                                        Join
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default MenteeDashBoard