import { Star } from 'lucide-react'
import { useState } from 'react'

const MyReviews = () => {
    const [activeFilter, setActiveFilter] = useState("All");

    const avatarColors = [
        'bg-[#FF6B6B]',
        'bg-[#4ECDC4]',
        'bg-[#45B7D1]',
        'bg-[#96CEB4]',
        'bg-[#845EC2]',
        'bg-[#D65DB1]',
        'bg-[#FF9671]',
        'bg-[#FFC75F]',
        'bg-[#00897B]',
        'bg-[#0081CF]',
        'bg-[#2C73D2]',
        'bg-[#008F7A]',
    ];

    const getAvatarColor = (id: number) => {
        return avatarColors[id % avatarColors.length];
    };

    const mockMyReviews = [
        {
            id: 1,
            mentorName: "Philippe Gael",
            mentorRole: "Software Engineer",
            rating: 5,
            comment: "Excellent guidance on React architecture. Truly helped me understand complex state management patterns.",
            date: "Oct 24, 2024"
        },
        {
            id: 2,
            mentorName: "Sarah Johnson",
            mentorRole: "Product Designer",
            rating: 4,
            comment: "Great feedback on my portfolio. Very patient and detailed oriented.",
            date: "Sep 15, 2024"
        },
        {
            id: 3,
            mentorName: "Dr. Robert Smith",
            mentorRole: "AI Researcher",
            rating: 5,
            comment: "The best mentor for anyone starting with Machine Learning. Explains concepts very clearly.",
            date: "Aug 10, 2024"
        }
    ];

    const stats = [
        { label: "Total reviews", value: "8" },
        { label: "Avg. rating given", value: "4.6", suffix: "/ 5" },
        { label: "Mentors reviewed", value: "5" }
    ];

    const filters = ["All", "5 stars", "4 stars", "3 stars"];

    const filteredReviews = activeFilter === "All"
        ? mockMyReviews
        : mockMyReviews.filter(r => `${r.rating} stars` === activeFilter);

    return (
        <div className='sm:mx-20 sm:my-10 mx-4 my-5'>
            <header className="mb-12">
                <h1 className='text-2xl sm:text-3xl lg:text-4xl font-heading'>My Reviews</h1>
            </header>

            {/* Stats Summary Section */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-8 mb-16">
                {stats.map((stat, i) => (
                    <div key={i} className="flex flex-col">
                        <span className="text-secondary font-medium mb-2">{stat.label}</span>
                        <div className="flex items-baseline gap-2">
                            <span className={`text-3xl font-bold ${stat.label.includes('Avg') ? 'text-accent' : 'text-secondary'} font-heading`}>
                                {stat.value}
                            </span>
                            {stat.suffix && <span className="text-xl font-bold text-secondary">{stat.suffix}</span>}
                        </div>
                    </div>
                ))}
            </div>

            {/* Filter Section */}
            <div className="flex flex-wrap gap-4 mb-10">
                {filters.map((filter) => (
                    <button
                        key={filter}
                        onClick={() => setActiveFilter(filter)}
                        className={`px-8 py-2.5 rounded-full font-bold transition-all flex items-center gap-2 ${activeFilter === filter
                            ? 'bg-accent text-white'
                            : 'bg-transparent text-secondary border border-transparent'
                            }`}
                    >
                        {filter !== "All" && <Star size={16} fill={activeFilter === filter ? "white" : "none"} stroke="currentColor" />}
                        {filter}
                    </button>
                ))}
            </div>

            {/* Reviews List */}
            <div className='grid grid-cols-1 lg:grid-cols-2 gap-6 pb-10'>
                {filteredReviews.length > 0 ? filteredReviews.map((r) => (
                    <div key={r.id} className='border border-gray-300 rounded-3xl p-6 sm:p-8 flex flex-col h-full overflow-hidden'>
                        <div className="flex flex-wrap justify-between items-start gap-4 mb-6">
                            <div className='flex items-center gap-4 min-w-0 flex-1'>
                                <div className={`w-12 h-12 sm:w-14 sm:h-14 rounded-full ${getAvatarColor(r.id)} shrink-0 flex items-center justify-center text-white text-lg sm:text-xl font-bold font-heading`}>
                                    {r.mentorName.charAt(0)}
                                </div>
                                <div className="min-w-0">
                                    <h3 className='text-lg sm:text-xl font-bold text-secondary font-heading truncate'>{r.mentorName}</h3>
                                    <p className='text-accent text-xs sm:text-sm font-bold uppercase tracking-wider truncate'>{r.mentorRole}</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-1 flex-shrink-0">
                                {[...Array(r.rating)].map((_, i) => (
                                    <Star key={i} size={14} className="text-accent fill-accent sm:w-4 sm:h-4" />
                                ))}
                            </div>
                        </div>
                        <p className='text-gray-600 leading-relaxed text-sm sm:text-base break-words flex-1'>"{r.comment}"</p>
                        <div className="mt-6 pt-4 border-t border-gray-100 flex justify-end">
                            <span className="text-gray-400 text-xs sm:text-sm font-medium">{r.date}</span>
                        </div>
                    </div>
                )) : (
                    <div className="text-center py-20 border-2 border-dashed border-gray-200 rounded-3xl">
                        <p className="text-gray-400 font-medium">No reviews found for this rating.</p>
                    </div>
                )}
            </div>
        </div>
    )
}

export default MyReviews