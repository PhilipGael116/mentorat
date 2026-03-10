import { Star, User } from "lucide-react"
import { Link } from "react-router-dom"

const DashBoard = () => {
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
        <div className="mx-20 my-10">
            <div className="flex justify-between">
                <h1 className="text-4xl font-heading">Welcome, Philippe</h1>
                <User size={30} className="bg-accent/7 p-2 rounded-full w-10 h-10 flex items-center justify-center" />
            </div>

            {/* Stats */}
            <div className="flex gap-10 mt-10">
                <div className="p-10 rounded-2xl shadow-sm w-1/2 flex items-center justify-between bg-accent/7">
                    <div>
                        <h2 className="text-2xl font-heading">No. of Students</h2>
                        <p className="text-4xl font-heading mt-2">100</p>
                    </div>
                    <User size={30} className="w-7 h-7 flex items-center justify-center" />
                </div>
                <div className="p-10 rounded-2xl shadow-sm w-1/2 flex items-center justify-between bg-green-500/7">
                    <div>
                        <h2 className="text-2xl font-heading">Av. Rating</h2>
                        <p className="text-4xl font-heading mt-2">4.8</p>
                    </div>
                    <Star size={30} className="w-7 h-7 flex items-center justify-center" />
                </div>
            </div>

            {/* Recent Students */}
            <div className="mt-10 px-10 pb-10 pt-4 border rounded-2xl border-gray-300">
                <div className="flex justify-between items-center mb-8">
                    <h2 className="text-2xl font-heading">Recent Students</h2>
                    <Link to="/students" className="rounded-xl bg-secondary text-white p-2 px-4 text-sm font-semibold flex items-center justify-center">View all</Link>
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

export default DashBoard