import { User, Search, LogOut } from "lucide-react"
import { useState } from "react"
import { useAuthStore } from "../../store"
import { Link } from "react-router-dom"
import { useTranslation } from "react-i18next"
import api from "../../utils/api"
import { useQuery, useQueryClient } from "@tanstack/react-query"

const Mentors = () => {
    const { t } = useTranslation();
    const [searchTerm, setSearchTerm] = useState("");
    const [isProfileOpen, setIsProfileOpen] = useState(false);

    const queryClient = useQueryClient();

    // Fetch both all mentors and the ones the user has joined
    const { data: fetchResult, isLoading } = useQuery({
        queryKey: ['mentorsList'],
        queryFn: async () => {
            const [allMentorsRes, myMentorsRes] = await Promise.all([
                api.get("/getAllMentors"),
                api.get("/mymentors")
            ]);
            return {
                all: allMentorsRes.data?.data || allMentorsRes.data?.mentors || [],
                joined: myMentorsRes.data?.data || myMentorsRes.data?.mentors || []
            };
        },
        staleTime: 5 * 60 * 1000,
    });

    const mentors = fetchResult?.all || [];
    const joinedMentors = fetchResult?.joined || [];

    const handleJoin = async (mentor: any) => {
        // More robust check: compare both id and userId
        const isJoined = joinedMentors.some((m: any) =>
            (m.id === mentor.id) || (mentor.userId && m.userId === mentor.userId)
        );

        try {
            if (isJoined) {
                await api.post(`/unfollow/${mentor.userId || mentor.id}`);
            } else {
                await api.post(`/follow/${mentor.userId || mentor.id}`);
            }
            // 🚀 Refresh both the list and the dashboard stats
            queryClient.invalidateQueries({ queryKey: ['mentorsList'] });
            queryClient.invalidateQueries({ queryKey: ['menteeDashboardStats'] });
        } catch (error) {
            console.error("Error toggling join status:", error);
        }
    }
    const logout = useAuthStore((state) => state.logout);

    const logoutHandler = () => {
        logout();
    }

    const getInitials = (name: string) => {
        if (!name) return "U";
        return name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);
    };

    const getAvatarColor = (id: string | number | undefined) => {
        const colors = [
            'bg-[#FF6B6B]', 'bg-[#4ECDC4]', 'bg-[#45B7D1]', 'bg-[#96CEB4]',
            'bg-[#845EC2]', 'bg-[#D65DB1]', 'bg-[#FF9671]', 'bg-[#FFC75F]',
            'bg-[#00897B]', 'bg-[#0081CF]', 'bg-[#2C73D2]', 'bg-[#008F7A]',
        ];

        if (!id) return colors[0];
        if (typeof id === 'number') return colors[id % colors.length];

        let hash = 0;
        for (let i = 0; i < id.toString().length; i++) {
            hash = id.toString().charCodeAt(i) + ((hash << 5) - hash);
        }
        return colors[Math.abs(hash) % colors.length];
    };


    const filteredMentors = mentors.filter((mentor: any) => {
        const name = mentor.name || (mentor.user ? `${mentor.user.Fname} ${mentor.user.Lname}` : "Unknown");
        const role = mentor.role || mentor.currentStatus || "Mentor";
        const about = mentor.about || mentor.bio || "";

        return name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            role.toLowerCase().includes(searchTerm.toLowerCase()) ||
            about.toLowerCase().includes(searchTerm.toLowerCase());
    });

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
                                    onClick={logoutHandler}
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
                {isLoading ? (
                    <div className="col-span-2 text-center py-20">
                        <p className="text-gray-500 animate-pulse">{t('Loading Mentors...') || "Loading Mentors..."}</p>
                    </div>
                ) : filteredMentors.map((mentor: any) => {
                    const mentorName = mentor.name || (mentor.user ? `${mentor.user.Fname} ${mentor.user.Lname}` : "Unknown Mentor");
                    const mentorRole = mentor.role || mentor.currentStatus || "Mentor";
                    const mentorAbout = mentor.about || mentor.bio || "No description provided.";
                    const mentorStudents = mentor._count?.mentees || 0;
                    const mentorRating = Number(mentor.avRating || 0);
                    const isJoined = joinedMentors.some((m: any) =>
                        (m.id === mentor.id) || (mentor.userId && m.userId === mentor.userId)
                    );

                    return (
                        <div key={mentor.id} className="relative rounded-3xl border border-gray-300 overflow-hidden min-w-[250px]">
                            {/* Banner Background */}
                            <div className={`h-32 w-full ${getAvatarColor(mentor.id)} opacity-80`}></div>

                            {/* Content Wrapper */}
                            <div className="p-6 pt-0">
                                {/* Profile Part */}
                                <div className="flex flex-col items-center text-center -mt-10">
                                    <div className={`w-20 h-20 rounded-full z-10 ${getAvatarColor(mentor.id)} flex items-center justify-center text-white text-2xl font-bold font-heading mb-4 shadow-xl ring-4 ring-white`}>
                                        {getInitials(mentorName)}
                                    </div>
                                    <h3 className="text-xl font-bold text-secondary font-heading">{mentorName}</h3>
                                    <p className="text-accent text-sm font-medium mb-4 uppercase tracking-wider">{mentorRole}</p>

                                    <p className="text-gray-500 text-sm leading-relaxed line-clamp-2 mb-6">
                                        {mentorAbout}
                                    </p>
                                </div>

                                {/* Stats */}
                                <div className="flex justify-center gap-6 mb-8 py-4 border-y border-gray-100">
                                    <div className="flex items-center gap-2 text-gray-500">
                                        <User size={16} className="text-secondary/40" />
                                        <span className="text-sm font-semibold">{mentorStudents} <span className="font-normal text-xs uppercase">{t('mentorsPage.card.students')}</span></span>
                                    </div>
                                    <div className="flex items-center gap-2 text-gray-500">
                                        <span className="text-sm font-semibold">{mentorRating.toFixed(1)} <span className="font-normal text-xs uppercase">{t('mentorsPage.card.rating')}</span></span>
                                    </div>
                                </div>

                                {/* Actions */}
                                <div className="grid grid-cols-2 gap-3">
                                    <Link to={`/mentee/mentors/${mentor.userId || mentor.id}`} className="py-2.5 rounded-xl border-2 border-secondary/10 text-secondary font-bold text-sm hover:bg-secondary/5 transition-colors flex items-center justify-center">
                                        {t('mentorsPage.card.viewProfile')}
                                    </Link>
                                    <button
                                        onClick={() => handleJoin(mentor)}
                                        className={`py-2.5 rounded-xl font-bold text-sm transition-all shadow-sm ${isJoined
                                            ? "bg-gray-100 text-secondary border border-gray-200"
                                            : "bg-secondary text-white hover:opacity-90 shadow-accent/20"
                                            }`}
                                    >
                                        {isJoined ? t('mentorsPage.card.joined') : t('mentorsPage.card.join')}
                                    </button>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>

            {!isLoading && filteredMentors.length === 0 && (
                <div className="text-center py-20">
                    <p className="text-gray-500 text-lg">{t('mentorsPage.noMentorsFound')}</p>
                </div>
            )}
        </div>
    )
}

export default Mentors
