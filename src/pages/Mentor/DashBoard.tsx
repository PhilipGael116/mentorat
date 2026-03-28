import { useState } from "react"
import { Star, User, LogOut } from "lucide-react"
import { useTranslation } from "react-i18next"
import { Link } from "react-router-dom"
import { useAuthStore } from "../../store"
import { useQuery } from "@tanstack/react-query"
import api from "../../utils/api"

const DashBoard = () => {
    const { t } = useTranslation()
    const [isProfileOpen, setIsProfileOpen] = useState(false);

    const logout = useAuthStore((state) => state.logout);

    const user = useAuthStore((state) => state.user);

    const { data: dashboardData, isLoading } = useQuery({
        queryKey: ['mentorDashboardStats'],
        queryFn: async () => {
            const [menteesRes, reviewsRes] = await Promise.all([
                api.get("/getAllMentees"),
                api.get(`/getMentorReview/${user?.id}`)
            ]);

            const mentees = menteesRes.data?.data || menteesRes.data?.mentees || [];
            const reviews = reviewsRes.data?.data || reviewsRes.data?.reviews || [];

            // Calculate average rating
            const totalRating = reviews.reduce((sum: number, r: any) => sum + (r.rating || 0), 0);
            const avgRating = reviews.length > 0 ? (totalRating / reviews.length).toFixed(1) : "0.0";

            return { mentees, avgRating };
        },
        enabled: !!user?.id,
        staleTime: 5 * 60 * 1000,
    });

    const mentees = dashboardData?.mentees || [];
    const avgRating = dashboardData?.avgRating || "0.0";
    const recentStudents = mentees.slice(0, 4);

    return (
        <div className="sm:mx-20 sm:my-10 mx-6 my-5">
            <div className="flex justify-between items-center relative">
                <h1 className="text-2xl sm:text-3xl lg:text-4xl font-heading">{t('mentorDashboard.welcome', { name: user?.Fname || 'User' })}</h1>

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
                                {t('mentorDashboard.logout')}
                            </button>
                        </div>
                    )}
                </div>
            </div>

            {/* Stats */}
            <div className="flex flex-col sm:flex-row gap-10 mt-10">
                <div className="p-10 rounded-2xl shadow-sm w-full flex items-center justify-between bg-accent/7">
                    <div>
                        <h2 className="lg:text-2xl text-xl font-heading">{t('mentorDashboard.stats.students')}</h2>
                        <p className="lg:text-4xl text-3xl font-heading mt-2">
                            {isLoading ? "..." : mentees.length}
                        </p>
                    </div>
                    <User size={30} className="w-7 h-7 flex items-center justify-center" />
                </div>
                <div className="p-10 rounded-2xl shadow-sm w-full flex items-center justify-between bg-green-500/7">
                    <div>
                        <h2 className="lg:text-2xl  text-xl font-heading">{t('mentorDashboard.stats.rating')}</h2>
                        <p className="lg:text-4xl text-3xl font-heading mt-2">
                            {isLoading ? "..." : avgRating}
                        </p>
                    </div>
                    <Star size={30} className="w-7 h-7 flex items-center justify-center" />
                </div>
            </div>

            {/* Recent Students */}
            <div className="mt-10 px-4 sm:px-10 pb-10 pt-4 border rounded-2xl border-gray-300">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-10">
                    <h2 className="text-2xl font-heading">{t('mentorDashboard.recentStudents.title')}</h2>
                    <Link to="/mentor/students" className="rounded-xl bg-secondary text-white p-2 px-6 text-sm font-semibold hover:opacity-90 transition-all w-fit">{t('mentorDashboard.recentStudents.viewAll')}</Link>
                </div>

                {/* Table Header (hidden on mobile) */}
                <div className="hidden sm:grid sm:grid-cols-[80px_1fr_1fr] border-b border-gray-200 pb-4 mb-6 text-gray-400 font-semibold uppercase text-xs tracking-wider">
                    <div>{t('mentorDashboard.recentStudents.tableHeaders.no')}</div>
                    <div>{t('mentorDashboard.recentStudents.tableHeaders.name')}</div>
                    <div className="text-right">{t('mentorDashboard.recentStudents.tableHeaders.dateJoined')}</div>
                </div>

                {/* Student Rows */}
                <div className="space-y-6">
                    {isLoading ? (
                        <p className="text-gray-500 font-medium py-10 text-center">{t('common.loading') || "Loading students..."}</p>
                    ) : recentStudents.length === 0 ? (
                        <p className="text-gray-500 font-medium py-10 text-center">{t('mentorDashboard.recentStudents.noStudents') || "No students yet."}</p>
                    ) : (
                        recentStudents.slice(0, 4).map((student: any, index: number) => {
                            const studentName = student.name || (student.user ? `${student.user.Fname} ${student.user.Lname}` : "Unknown Student");
                            const studentEmail = student.email || student.user?.email || "No email provided";

                            // Try multiple possible date fields from the backend
                            const rawDate = student.createdAt || student.joinedAt || student.user?.createdAt || student.dateJoined;
                            const dateJoined = rawDate ? new Date(rawDate).toLocaleDateString() : "N/A";

                            return (
                                <div
                                    key={student.id}
                                    className="flex flex-col gap-2 sm:grid sm:grid-cols-[80px_1fr_1fr] sm:items-center sm:border-b border-gray-100 sm:pb-4 last:border-0"
                                >
                                    {/* Number */}
                                    <div className="font-heading text-lg">
                                        <span className="sm:hidden text-gray-400 text-sm">{t('mentorDashboard.recentStudents.mobileLabels.no')}</span>
                                        {index + 1}
                                    </div>

                                    {/* Name + Email */}
                                    <div className="flex items-center gap-4">
                                        <div>
                                            <h3 className="text-lg font-heading">{studentName}</h3>
                                            <p className="text-sm text-gray-500">{studentEmail}</p>
                                        </div>
                                    </div>

                                    {/* Date Joined */}
                                    <div className="sm:text-right font-medium text-gray-600">
                                        <span className="sm:hidden text-gray-400 text-sm">{t('mentorDashboard.recentStudents.mobileLabels.joined')}</span>
                                        {dateJoined}
                                    </div>
                                </div>
                            );
                        })
                    )}
                </div>
            </div>
        </div>
    )
}

export default DashBoard