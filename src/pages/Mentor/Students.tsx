import { useTranslation } from "react-i18next";
import { useQuery } from "@tanstack/react-query";
import api from "../../utils/api";

const Students = () => {
    const { t } = useTranslation();
    const { data: mentees = [], isLoading } = useQuery({
        queryKey: ['allMentees'],
        queryFn: async () => {
            const response = await api.get("/getAllMentees");
            return response.data?.data || response.data?.mentees || [];
        },
        staleTime: 5 * 60 * 1000,
    });

    return (
        <div className="sm:mx-20 sm:my-10 mx-6 my-5">
            {/* Recent Students */}
            <div className="mt-10 px-4 sm:px-10 pb-10 pt-4 border rounded-2xl border-gray-300">

                {/* Header */}
                <div className="mb-8">
                    <h2 className="text-2xl font-heading">{t('mentorDashboard.recentStudents.title') || "All Students"}</h2>
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
                    ) : mentees.length === 0 ? (
                        <p className="text-gray-500 font-medium py-10 text-center">{t('mentorDashboard.recentStudents.noStudents') || "No students yet."}</p>
                    ) : (
                        mentees.map((student: any, index: number) => {
                            const studentName = student.name || (student.user ? `${student.user.Fname} ${student.user.Lname}` : "Unknown Student");
                            const studentEmail = student.email || student.user?.email || "No email provided";

                            const rawDate = student.createdAt || student.joinedAt || student.user?.createdAt || student.dateJoined;
                            const dateJoined = rawDate ? new Date(rawDate).toLocaleDateString() : "N/A";

                            return (
                                <div
                                    key={student.id}
                                    className="flex flex-col gap-2 sm:grid sm:grid-cols-[80px_1fr_1fr] sm:items-center sm:border-b border-gray-100 sm:pb-4 last:border-0"
                                >
                                    <div className="font-heading text-lg">
                                        <span className="sm:hidden text-gray-400 text-sm">{t('mentorDashboard.recentStudents.mobileLabels.no')}</span>
                                        {index + 1}
                                    </div>

                                    <div className="flex items-center gap-4">
                                        <div>
                                            <h3 className="text-lg font-heading">{studentName}</h3>
                                            <p className="text-sm text-gray-500">{studentEmail}</p>
                                        </div>
                                    </div>

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
    );
};

export default Students;