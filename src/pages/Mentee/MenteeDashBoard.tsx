import { User, LogOut, Star } from 'lucide-react'
import { useState } from 'react'
import { useAuthStore } from '../../store'
import api from "../../utils/api"
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import StarRating from '../../components/StarRating'

const MenteeDashBoard = () => {
    const { t } = useTranslation()
    const [isProfileOpen, setIsProfileOpen] = useState(false);
    const queryClient = useQueryClient();
    const user = useAuthStore((state) => state.user);

    // 🚀 React Query automatically caches this data!
    const { data, isLoading: isLoadingStats } = useQuery({
        queryKey: ['menteeDashboardStats'],
        queryFn: async () => {
            const [mentorsResponse, reviewsResponse, allMentorsResponse] = await Promise.all([
                api.get("/mymentors"),
                api.get("/myReviews"),
                api.get("/getAllMentors")
            ]);

            return {
                myMentors: mentorsResponse.data?.data || mentorsResponse.data?.mentors || [],
                myReviews: reviewsResponse.data?.data || reviewsResponse.data?.reviews || [],
                allMentors: allMentorsResponse.data?.data || allMentorsResponse.data?.mentors || []
            };
        },
        staleTime: 5 * 60 * 1000, // Data stays fresh for 5 minutes without needing a refetch
    });

    // Safely extract from query cache
    const myMentors = data?.myMentors || [];
    const myReviews = data?.myReviews || [];
    const allMentors = data?.allMentors || [];

    const handleJoin = async (mentor: any) => {
        const isJoined = myMentors.some((m: any) => m.id === mentor.id);

        try {
            if (isJoined) {
                await api.post(`/unfollow/${mentor.userId || mentor.id}`);
            } else {
                await api.post(`/follow/${mentor.userId || mentor.id}`);
            }
            // 🚀 Refresh data immediately after joining/unjoining
            queryClient.invalidateQueries({ queryKey: ['menteeDashboardStats'] });
        } catch (error) {
            console.error("Error toggling join status:", error);
        }
    }

    const logout = useAuthStore((state) => state.logout);


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
        if (!name) return "U";
        return name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);
    };

    const getAvatarColor = (id: string | number | undefined) => {
        if (!id) return avatarColors[0];

        // If it's a number, do simple modulo
        if (typeof id === 'number') {
            return avatarColors[id % avatarColors.length];
        }

        // If it's a string (like a UUID), create a number hash first!
        let hash = 0;
        for (let i = 0; i < id.length; i++) {
            hash = id.charCodeAt(i) + ((hash << 5) - hash);
        }

        return avatarColors[Math.abs(hash) % avatarColors.length];
    };



    return (
        <div className="sm:mx-20 sm:my-10 mx-6 my-5">
            <div className="flex justify-between items-center relative gap-4">
                <h1 className="text-2xl sm:text-3xl lg:text-4xl font-heading">{t('menteeDashboard.welcome', { name: user?.Fname || 'User' })}</h1>

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

            {/* Stats */}
            <div className="flex flex-col sm:flex-row gap-10 mt-10">
                <div className="p-10 rounded-2xl shadow-sm w-full flex items-center justify-between bg-accent/7">
                    <div>
                        <h2 className="lg:text-2xl text-xl font-heading text-secondary/80">{t('menteeDashboard.stats.mentors')}</h2>
                        <p className="lg:text-4xl text-3xl font-heading mt-2 text-secondary">
                            {isLoadingStats ? "..." : myMentors.length}
                        </p>
                    </div>
                    <User size={30} className="w-8 h-8t" />
                </div>
                <div className="p-10 rounded-2xl shadow-sm w-full flex items-center justify-between bg-green-500/7">
                    <div>
                        <h2 className="lg:text-2xl text-xl font-heading text-secondary/80">{t('menteeDashboard.stats.reviews')}</h2>
                        <p className="lg:text-4xl text-3xl font-heading mt-2 text-secondary">
                            {isLoadingStats ? "..." : myReviews.length}
                        </p>
                    </div>
                    <Star size={30} className="w-8 h-8" />
                </div>
            </div>

            {/* Mentors on the app */}
            <div className="mt-10 px-4 sm:px-10 pb-10 pt-4 border rounded-2xl border-gray-300">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-10">
                    <h2 className="text-2xl font-heading">{t('menteeDashboard.popularMentors')}</h2>
                    <Link to="/mentee/mentors" className="rounded-xl bg-secondary text-white p-2 px-6 text-sm font-semibold hover:opacity-90 transition-all w-fit">{t('mentorDashboard.recentStudents.viewAll')}</Link>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {isLoadingStats ? (
                        <p className="text-gray-500 font-medium py-10 text-center col-span-2">Loading mentors...</p>
                    ) : allMentors.length === 0 ? (
                        <p className="text-gray-500 font-medium py-10 text-center col-span-2">No mentors available at the moment.</p>
                    ) : (
                        allMentors.slice(0, 4).map((mentor: any) => {
                            // Backend dynamic fields
                            const mentorName = mentor.name || (mentor.user ? `${mentor.user.Fname} ${mentor.user.Lname}` : "Unknown Mentor");
                            const mentorRole = mentor.role || mentor.currentStatus || "Mentor";
                            const mentorAbout = mentor.about || mentor.bio || "No description provided.";
                            // Use _count.mentees for number of students
                            const mentorStudents = mentor._count?.mentees || 0;
                            // Use avRating for rating
                            const mentorRating = mentor.avRating || 0;

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
                                                <StarRating rating={mentorRating} size={14} />
                                                <span className="text-sm font-semibold">{mentorRating.toFixed(1)} <span className="font-normal text-xs uppercase">{t('mentorsPage.card.rating')}</span></span>
                                            </div>
                                        </div>

                                        {/* Actions */}
                                        <div className="grid grid-cols-2 gap-3">
                                            <Link to={`/mentee/mentors/${mentor.userId || mentor.id}`} className="py-2.5 rounded-xl border-2 border-secondary/10 text-secondary font-bold text-sm hover:bg-secondary/5 transition-colors flex justify-center items-center">
                                                {t('mentorsPage.card.viewProfile')}
                                            </Link>
                                            <button
                                                onClick={() => handleJoin(mentor)}
                                                className={`py-2.5 rounded-xl font-bold text-sm transition-all shadow-sm flex justify-center items-center ${myMentors.some((m: any) => m.id === mentor.id)
                                                    ? "bg-gray-100 text-secondary border border-gray-200"
                                                    : "bg-secondary text-white hover:opacity-90 shadow-accent/20"
                                                    }`}
                                            >
                                                {myMentors.some((m: any) => m.id === mentor.id) ? t('mentorsPage.card.joined') : t('mentorsPage.card.join')}
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            );
                        })
                    )}
                </div>
            </div>
        </div>
    );
};

export default MenteeDashBoard