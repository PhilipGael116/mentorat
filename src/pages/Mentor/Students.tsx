import { Filter } from "lucide-react";
import { FaSort, FaFilter } from "react-icons/fa";


const Students = () => {
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
        <div className="sm:mx-20 sm:my-10 mx-10 my-5">
            {/* Recent Students */}
            <div className="mt-10 px-10 pb-10 pt-4 border rounded-2xl border-gray-300">
                <div className="flex justify-between items-center mb-8">
                    <h2 className="text-2xl font-heading">Recent Students</h2>
                    <div className="flex gap-4 items-center">
                        <div className="flex gap-2 items-center">
                            Sort <FaSort />
                        </div>
                        <div className="flex gap-2 items-center">
                            Filter <Filter />
                        </div>
                    </div>
                </div>

                {/* Table Header */}
                <div className="grid grid-cols-[80px_1fr_1fr] border-b border-gray-200 pb-4 mb-6 text-gray-400 font-semibold uppercase text-xs tracking-wider">
                    <div>No.</div>
                    <div>Name</div>
                    <div className="text-right">Date Joined</div>
                </div>

                {/* Student Rows */}
                <div className="space-y-6">
                    {recentStudents.map((student, index) => (
                        <div key={student.id} className="grid grid-cols-[80px_1fr_1fr] items-center">
                            <div className="font-heading text-lg">{index + 1}</div>
                            <div className="flex items-center gap-4">
                                <div>
                                    <h3 className="text-lg font-heading">{student.name}</h3>
                                    <p className="text-sm text-gray-500">{student.email}</p>
                                </div>
                            </div>
                            <div className="text-right font-medium text-gray-600">
                                {student.dateJoined}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default Students