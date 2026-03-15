import { useTranslation } from "react-i18next";

const Students = () => {
    const { t } = useTranslation();
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
        {
            id: 4,
            name: "Samuel Eto'o",
            email: "sam.etoo@outlook.com",
            dateJoined: "24th February, 2026",
        },
        {
            id: 5,
            name: "Samuel Eto'o",
            email: "sam.etoo@outlook.com",
            dateJoined: "24th February, 2026",
        },
        {
            id: 6,
            name: "Samuel Eto'o",
            email: "sam.etoo@outlook.com",
            dateJoined: "24th February, 2026",
        },
        {
            id: 7,
            name: "Samuel Eto'o",
            email: "sam.etoo@outlook.com",
            dateJoined: "24th February, 2026",
        },
    ];

    return (
        <div className="sm:mx-20 sm:my-10 mx-6 my-5">
            {/* Recent Students */}
            <div className="mt-10 px-4 sm:px-10 pb-10 pt-4 border rounded-2xl border-gray-300">

                {/* Header */}
                <div className="mb-8">
                    <h2 className="text-2xl font-heading">{t('mentorDashboard.recentStudents.title')}</h2>
                </div>

                {/* Table Header (hidden on mobile) */}
                <div className="hidden sm:grid sm:grid-cols-[80px_1fr_1fr] border-b border-gray-200 pb-4 mb-6 text-gray-400 font-semibold uppercase text-xs tracking-wider">
                    <div>{t('mentorDashboard.recentStudents.tableHeaders.no')}</div>
                    <div>{t('mentorDashboard.recentStudents.tableHeaders.name')}</div>
                    <div className="text-right">{t('mentorDashboard.recentStudents.tableHeaders.dateJoined')}</div>
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
                                <span className="sm:hidden text-gray-400 text-sm">{t('mentorDashboard.recentStudents.mobileLabels.no')}</span>
                                {index + 1}
                            </div>

                            {/* Name + Email */}
                            <div className="flex items-center gap-4">
                                <div>
                                    <h3 className="text-lg font-heading">{student.name}</h3>
                                    <p className="text-sm text-gray-500">{student.email}</p>
                                </div>
                            </div>

                            {/* Date */}
                            <div className="sm:text-right font-medium text-gray-600">
                                <span className="sm:hidden text-gray-400 text-sm">
                                    {t('mentorDashboard.recentStudents.mobileLabels.joined')}
                                </span>
                                {student.dateJoined}
                            </div>

                        </div>
                    ))}
                </div>

            </div>
        </div>
    );
};

export default Students;