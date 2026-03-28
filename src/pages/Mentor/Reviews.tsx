import { useState, useMemo } from "react";
import { Filter, Star, Loader2 } from "lucide-react";
import { FaSortAmountDown, FaSortAmountUp } from "react-icons/fa";
import { useTranslation } from "react-i18next";
import { useQuery } from "@tanstack/react-query";
import api from "../../utils/api";
import { useAuthStore } from "../../store";

const Reviews = () => {
    const { t } = useTranslation();
    const user = useAuthStore((state) => state.user);

    const { data: reviewsData = [], isLoading } = useQuery({
        queryKey: ['mentorReviews', user?.id],
        queryFn: async () => {
            const response = await api.get(`/getMentorReview/${user?.id}`);
            return response.data?.data || response.data?.reviews || response.data || [];
        },
        enabled: !!user?.id,
        staleTime: 5 * 60 * 1000,
    });

    // 2. State for Sorting and Filtering
    const [sortOrder, setSortOrder] = useState<"desc" | "asc">("desc"); // desc = highest first, asc = lowest
    const [filterLevel, setFilterLevel] = useState<number>(0); // 0 = All, 5 = Only 5 stars, 4 = 4+ stars

    // 3. The logic behind the scenes (useMemo makes it fast)
    const processedReviews = useMemo(() => {
        let filtered = [...reviewsData];

        // Apply Filter (Visibility)
        if (filterLevel > 0) {
            filtered = filtered.filter((r: any) => (r.rating || 0) >= filterLevel);
        }

        // Apply Sort (Order)
        filtered.sort((a: any, b: any) => {
            const ratingA = a.rating || 0;
            const ratingB = b.rating || 0;
            return sortOrder === "desc" ? ratingB - ratingA : ratingA - ratingB;
        });

        return filtered;
    }, [reviewsData, sortOrder, filterLevel]);

    // 4. Interaction Handlers
    const toggleSort = () => setSortOrder((prev) => prev === "desc" ? "asc" : "desc");
    const cycleFilter = () => {
        if (filterLevel === 0) setFilterLevel(5);
        else if (filterLevel === 5) setFilterLevel(4);
        else setFilterLevel(0);
    };

    return (
        <div className="sm:mx-20 sm:my-10 mx-6 my-5">
            {/* Recent Reviews Table */}
            <div className="mt-10 px-4 sm:px-10 pb-10 pt-4 border rounded-2xl border-gray-300 shadow-sm">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
                    <div>
                        <h2 className="text-2xl font-heading">{t('mentorReviews.title')}</h2>
                    </div>

                    <div className="flex flex-wrap gap-4 items-center">
                        {/* Sort Button */}
                        <button
                            onClick={toggleSort}
                            className={`flex gap-2 items-center px-4 py-2 rounded-xl transition-all border ${sortOrder === 'asc' ? 'bg-accent/10 border-accent/20 text-accent' : 'border-gray-100 text-gray-600'}`}
                        >
                            {sortOrder === "desc" ? <FaSortAmountDown /> : <FaSortAmountUp />}
                            <span className="text-sm font-semibold">{sortOrder === "desc" ? t('mentorReviews.sort.highToLow') : t('mentorReviews.sort.lowToHigh')}</span>
                        </button>

                        {/* Filter Button */}
                        <button
                            onClick={cycleFilter}
                            className={`flex gap-2 items-center px-4 py-2 rounded-xl transition-all border ${filterLevel > 0 ? 'bg-accent/10 border-accent/20 text-accent' : 'border-gray-100 text-gray-600'}`}
                        >
                            <Filter size={16} />
                            <span className="text-sm font-semibold">
                                {filterLevel === 0 ? t('mentorReviews.filter.all') : filterLevel === 5 ? t('mentorReviews.filter.fiveStars') : t('mentorReviews.filter.fourPlusStars')}
                            </span>
                        </button>
                    </div>
                </div>

                {/* Table Header (hidden on mobile) */}
                <div className="hidden sm:grid sm:grid-cols-[80px_200px_1fr_100px] border-b border-gray-200 pb-4 mb-6 text-gray-400 font-semibold uppercase text-xs tracking-wider">
                    <div>{t('mentorReviews.tableHeaders.no')}</div>
                    <div>{t('mentorReviews.tableHeaders.name')}</div>
                    <div>{t('mentorReviews.tableHeaders.review')}</div>
                    <div className="text-right">{t('mentorReviews.tableHeaders.rating')}</div>
                </div>

                {/* Review Rows */}
                <div className="space-y-8">
                    {isLoading ? (
                        <div className="flex flex-col items-center justify-center py-20 text-gray-400">
                            <Loader2 size={40} className="mb-4 animate-spin text-accent" />
                            <p className="font-heading text-lg">{t('common.loading') || "Loading reviews..."}</p>
                        </div>
                    ) : processedReviews.length > 0 ? (
                        processedReviews.map((review: any, index: number) => {
                            const studentName = review.author?.user 
                                ? `${review.author.user.Fname} ${review.author.user.Lname}` 
                                : (review.name || "Student");
                            const studentEmail = review.author?.user?.email || review.email || "";
                            const reviewComment = review.comment || "";
                            const reviewRating = review.rating || 0;

                            return (
                                <div
                                    key={review.id}
                                    className="flex flex-col gap-2 sm:grid sm:grid-cols-[80px_200px_1fr_100px] sm:items-center sm:border-0 border-b border-gray-200 sm:pb-4 sm:mb-0 pb-4 mb-6 last:border-0 last:mb-0"
                                >
                                    {/* Number */}
                                    <div className="font-heading text-lg text-gray-400">
                                        <span className="sm:hidden text-gray-400 text-sm">{t('mentorReviews.mobileLabels.no')}</span>
                                        {index + 1}
                                    </div>

                                    {/* Name + Email */}
                                    <div className="flex flex-col">
                                        <h3 className="text-lg font-heading leading-tight">{studentName}</h3>
                                        <p className="text-sm text-gray-500">{studentEmail}</p>
                                    </div>

                                    {/* Comment */}
                                    <div className="text-gray-600 sm:line-clamp-2 sm:pr-6">
                                        <span className="sm:hidden text-gray-400 text-sm not-italic block mb-1">{t('mentorReviews.mobileLabels.comment')}</span>
                                        "{reviewComment}"
                                    </div>

                                    {/* Rating */}
                                    <div className="flex items-center sm:justify-end gap-1">
                                        <span className="sm:hidden text-gray-400 text-sm mr-2">{t('mentorReviews.mobileLabels.rating')}</span>
                                        <span className="font-heading font-bold text-gray-900">{reviewRating}</span>
                                        <Star size={16} className="text-accent fill-accent" />
                                    </div>
                                </div>
                            );
                        })
                    ) : (
                        <div className="flex flex-col items-center justify-center py-20 text-gray-400">
                            <Star size={40} className="mb-4 opacity-20" />
                            <p className="font-heading text-lg">{t('mentorReviews.emptyState.message')}</p>
                            <button onClick={() => setFilterLevel(0)} className="text-accent underline mt-2 text-sm">{t('mentorReviews.emptyState.clearFilter')}</button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Reviews;
