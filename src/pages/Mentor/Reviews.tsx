import { useState, useMemo } from "react";
import { Filter, Star, ChevronDown } from "lucide-react";
import { FaSortAmountDown, FaSortAmountUp } from "react-icons/fa";

const Reviews = () => {
    // 1. Storage of original data
    const reviewsData = [
        {
            id: 1,
            name: "Philippe",
            email: "philippe@example.com",
            comment: "This mentor is amazing! Explains complex concepts very clearly.",
            rating: 5,
        },
        {
            id: 2,
            name: "Gauthier",
            email: "gauthier@example.com",
            comment: "Great session on A-Level Physics. Highly recommended.",
            rating: 4,
        },
        {
            id: 3,
            name: "Samuel Eto'o",
            email: "sam.etoo@outlook.com",
            comment: "Very patient and helpful with my university application.",
            rating: 5,
        },
        {
            id: 4,
            name: "John Doe",
            email: "john.doe@example.com",
            comment: "Really helped me with my coding project. Thank you!",
            rating: 4,
        },
        {
            id: 5,
            name: "Jane Smith",
            email: "jane.smith@example.com",
            comment: "Fantastic teaching style, very engaging.",
            rating: 5,
        },
    ];

    // 2. State for Sorting and Filtering
    const [sortOrder, setSortOrder] = useState<"desc" | "asc">("desc"); // desc = highest first, asc = lowest
    const [filterLevel, setFilterLevel] = useState<number>(0); // 0 = All, 5 = Only 5 stars, 4 = 4+ stars

    // 3. The logic behind the scenes (useMemo makes it fast)
    const processedReviews = useMemo(() => {
        let filtered = [...reviewsData];

        // Apply Filter (Visibility)
        if (filterLevel > 0) {
            filtered = filtered.filter(r => r.rating >= filterLevel);
        }

        // Apply Sort (Order)
        filtered.sort((a, b) => {
            return sortOrder === "desc" ? b.rating - a.rating : a.rating - b.rating;
        });

        return filtered;
    }, [sortOrder, filterLevel]);

    // 4. Interaction Handlers
    const toggleSort = () => setSortOrder(prev => prev === "desc" ? "asc" : "desc");
    const cycleFilter = () => {
        if (filterLevel === 0) setFilterLevel(5);
        else if (filterLevel === 5) setFilterLevel(4);
        else setFilterLevel(0);
    };

    return (
        <div className="sm:mx-20 sm:my-10 mx-10 my-5">
            {/* Recent Reviews Table */}
            <div className="mt-10 px-10 pb-10 pt-4 border rounded-2xl border-gray-300 shadow-sm">
                <div className="flex justify-between items-center mb-8">
                    <div>
                        <h2 className="text-2xl font-heading">Recent Reviews</h2>
                    </div>

                    <div className="flex gap-4 items-center">
                        {/* Sort Button */}
                        <button
                            onClick={toggleSort}
                            className={`flex gap-2 items-center px-4 py-2 rounded-xl transition-all border ${sortOrder === 'asc' ? 'bg-accent/10 border-accent/20 text-accent' : 'border-gray-100 text-gray-600'}`}
                        >
                            {sortOrder === "desc" ? <FaSortAmountDown /> : <FaSortAmountUp />}
                            <span className="text-sm font-semibold">Rating: {sortOrder === "desc" ? "High to Low" : "Low to High"}</span>
                        </button>

                        {/* Filter Button */}
                        <button
                            onClick={cycleFilter}
                            className={`flex gap-2 items-center px-4 py-2 rounded-xl transition-all border ${filterLevel > 0 ? 'bg-accent/10 border-accent/20 text-accent' : 'border-gray-100 text-gray-600'}`}
                        >
                            <Filter size={16} />
                            <span className="text-sm font-semibold">
                                {filterLevel === 0 ? "Filter: All" : filterLevel === 5 ? "Filter: 5 Stars" : "Filter: 4+ Stars"}
                            </span>
                        </button>
                    </div>
                </div>

                {/* Table Header */}
                <div className="grid grid-cols-[80px_250px_1fr_100px] border-b border-gray-200 pb-4 mb-6 text-gray-400 font-semibold uppercase text-xs tracking-wider">
                    <div>No.</div>
                    <div>Name</div>
                    <div>Review</div>
                    <div className="text-right">Rating</div>
                </div>

                {/* Review Rows */}
                <div className="space-y-8 min-h-[400px]">
                    {processedReviews.length > 0 ? (
                        processedReviews.map((review, index) => (
                            <div key={review.id} className="grid grid-cols-[80px_250px_1fr_100px] items-start hover:bg-gray-50/50 p-2 -mx-2 rounded-xl transition-all animate-in fade-in slide-in-from-bottom-2">
                                <div className="font-heading text-lg pt-1 text-gray-400">{index + 1}</div>
                                <div className="flex flex-col pr-4">
                                    <h3 className="text-lg font-heading leading-tight">{review.name}</h3>
                                    <p className="text-sm text-gray-500">{review.email}</p>
                                </div>
                                <div className="text-gray-600 italic line-clamp-2 pr-6 pt-1">
                                    "{review.comment}"
                                </div>
                                <div className="flex items-center justify-end gap-1 pt-1">
                                    <span className="font-heading font-bold text-gray-900">{review.rating}</span>
                                    <Star size={16} className="text-yellow-400 fill-yellow-400" />
                                </div>
                            </div>
                        ))
                    ) : (
                        <div className="flex flex-col items-center justify-center py-20 text-gray-400">
                            <Star size={40} className="mb-4 opacity-20" />
                            <p className="font-heading text-lg">No reviews match your filter</p>
                            <button onClick={() => setFilterLevel(0)} className="text-accent underline mt-2 text-sm">Clear all filters</button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Reviews;
