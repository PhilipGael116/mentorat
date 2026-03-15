import { User, Star, Search, LogOut } from "lucide-react"
import { useState } from "react"
import { useAuthStore } from "../../store"
import { Link } from "react-router-dom"
import { useTranslation } from "react-i18next"

const Mentors = () => {
    const { t } = useTranslation();
    const [searchTerm, setSearchTerm] = useState("");
    const [isProfileOpen, setIsProfileOpen] = useState(false);
    const [joinedMentorIds, setJoinedMentorIds] = useState<number[]>([]);

    const handleJoin = (mentorId: number) => {
        setJoinedMentorIds((prev) =>
            prev.includes(mentorId)
                ? prev.filter((id) => id !== mentorId)
                : [...prev, mentorId]
        );
    }

    const setUser = useAuthStore((state) => state.setUser);

    const logout = () => {
        setUser(false);
    }

    const avatarColors = [
        'bg-[#FF6B6B]', // Soft Red
        'bg-[#4ECDC4]', // Medium Turquoise
        'bg-[#45B7D1]', // Sky Blue
        'bg-[#96CEB4]', // Sage Green
        'bg-[#845EC2]', // Deep Purple
        'bg-[#D65DB1]', // Pinkish Purple
        'bg-[#FF9671]', // Coral
        'bg-[#FFC75F]', // Mustard Yellow
        'bg-[#00897B]', // Teal
        'bg-[#0081CF]', // Bright Blue
        'bg-[#2C73D2]', // Royal Blue
        'bg-[#008F7A]', // Sea Green
    ];

    const getInitials = (name: string) => {
        return name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);
    };

    const getAvatarColor = (id: number) => {
        return avatarColors[id % avatarColors.length];
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
        {
            id: 4,
            name: "Dr. Robert Smith",
            about: "Data Scientist specialized in Machine Learning and AI. I help developers transition into AI roles.",
            students: 21,
            rating: 5.0,
            role: "AI Researcher"
        },
        {
            id: 5,
            name: "Ribert Kandi",
            about: "Data Scientist specialized in Machine Learning and AI. I help developers transition into AI roles.",
            students: 21,
            rating: 5.0,
            role: "AI Researcher"
        },
        {
            id: 6,
            name: "Peter Smith",
            about: "Data Scientist specialized in Machine Learning and AI. I help developers transition into AI roles.",
            students: 21,
            rating: 5.0,
            role: "AI Researcher"
        },
    ];

    const filteredMentors = mentors.filter(mentor =>
        mentor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        mentor.role.toLowerCase().includes(searchTerm.toLowerCase()) ||
        mentor.about.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="sm:mx-20 sm:my-10 mx-6 my-5">
            <div className="flex flex-col gap-8 mb-10">
                <div className="flex justify-between items-center relative gap-4">
                    <h1 className="text-2xl sm:text-3xl lg:text-4xl font-heading">{t('mentorsPage.title')}</h1>

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
                                    {t('menteeDashboard.logout')}
                                </button>
                            </div>
                        )}
                    </div>
                </div>

                <div className="relative w-full">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                    <input
                        type="text"
                        placeholder={t('mentorsPage.searchPlaceholder')}
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full pl-12 pr-4 py-3.5 rounded-2xl border border-gray-200 focus:outline-none focus:border-accent shadow-sm transition-all font-sans"
                    />
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {filteredMentors.map((mentor) => (
                    <div key={mentor.id} className="relative rounded-3xl border border-gray-300 overflow-hidden min-w-[250px]">
                        {/* Banner Background */}
                        <div className={`h-32 w-full ${getAvatarColor(mentor.id)} opacity-80`}></div>

                        {/* Content Wrapper */}
                        <div className="p-6 pt-0">
                            {/* Profile Part */}
                            <div className="flex flex-col items-center text-center -mt-10">
                                <div className={`w-20 h-20 rounded-full z-10 ${getAvatarColor(mentor.id)} flex items-center justify-center text-white text-2xl font-bold font-heading mb-4 shadow-xl ring-4 ring-white`}>
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
                                    <span className="text-sm font-semibold">{mentor.students} <span className="font-normal text-xs uppercase">{t('mentorsPage.card.students')}</span></span>
                                </div>
                                <div className="flex items-center gap-2 text-gray-500">
                                    <Star size={16} className="text-accent fill-accent" />
                                    <span className="text-sm font-semibold">{mentor.rating} <span className="font-normal text-xs uppercase">{t('mentorsPage.card.rating')}</span></span>
                                </div>
                            </div>

                            {/* Actions */}
                            <div className="grid grid-cols-2 gap-3">
                                <Link to={`/mentee/mentors/${mentor.id}`} className="py-2.5 rounded-xl border-2 border-secondary/10 text-secondary font-bold text-sm hover:bg-secondary/5 transition-colors flex items-center justify-center">
                                    {t('mentorsPage.card.viewProfile')}
                                </Link>
                                <button 
                                    onClick={() => handleJoin(mentor.id)} 
                                    className={`py-2.5 rounded-xl font-bold text-sm transition-all shadow-sm ${
                                        joinedMentorIds.includes(mentor.id) 
                                        ? "bg-gray-100 text-secondary border border-gray-200" 
                                        : "bg-secondary text-white hover:opacity-90 shadow-accent/20"
                                    }`}
                                >
                                    {joinedMentorIds.includes(mentor.id) ? t('mentorsPage.card.joined') : t('mentorsPage.card.join')}
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {filteredMentors.length === 0 && (
                <div className="text-center py-20">
                    <p className="text-gray-500 text-lg">{t('mentorsPage.noMentorsFound')}</p>
                </div>
            )}
        </div>
    )
}

export default Mentors
