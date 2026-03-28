import { useParams, useNavigate } from 'react-router-dom'
import { MapPin, Calendar, MessageSquare, Send, Loader2 } from 'lucide-react'
import { useState, useEffect, useRef } from 'react'
import { useTranslation } from 'react-i18next'
import api from '../../utils/api'
import { useQuery, useQueryClient, useMutation } from '@tanstack/react-query'
import StarRating from '../../components/StarRating'

const MentorDetails = () => {
    const { t } = useTranslation();
    const { id } = useParams();
    const navigate = useNavigate();
    const [review, setReview] = useState("");
    const [rating, setRating] = useState(0);

    const [isSubmittingReview, setIsSubmittingReview] = useState(false);
    const queryClient = useQueryClient();

    // 🚀 React Query automatically caches this data!
    const { data, isLoading } = useQuery({
        queryKey: ['mentorDetails', id],
        queryFn: async () => {
            const [mentorRes, reviewsRes, myMentorsRes] = await Promise.all([
                api.get(`/getMentor/${id}`),
                api.get(`/getMentorReview/${id}`),
                api.get('/mymentors') // 👈 Fetch this so we know follow status even on refresh
            ]);

            const rawReviews = reviewsRes.data?.data || reviewsRes.data?.reviews || reviewsRes.data;
            const mentorData = mentorRes.data?.data || mentorRes.data?.mentor || mentorRes.data;
            const myMentors: any[] = myMentorsRes.data?.mentors || myMentorsRes.data?.data || [];

            // Compute follow status server-side so a page refresh keeps the right state
            const isFollowedByMe = myMentors.some((m: any) =>
                m.userId === mentorData?.userId || m.id === mentorData?.id
            );

            return {
                mentor: mentorData,
                reviews: Array.isArray(rawReviews) ? rawReviews : [],
                isFollowedByMe
            };
        },
        enabled: !!id,
        staleTime: 5 * 60 * 1000,
    });

    const mentor = data?.mentor;
    const reviews = data?.reviews || [];

    const [isFollowing, setIsFollowing] = useState<boolean>(false);
    const hasInitialized = useRef(false);

    // Once data loads (including on refresh), set the real follow state from backend
    useEffect(() => {
        if (data && !hasInitialized.current) {
            setIsFollowing(data.isFollowedByMe ?? false);
            hasInitialized.current = true;
        }
    }, [data]);

    // 🚀 TanStack mutation with "Optimistic Updates" - correct timing
    const toggleFollowMutation = useMutation({
        mutationFn: async (currentlyFollowing: boolean) => {
            // Receives the captured snapshot of state BEFORE toggle - always correct!
            const targetId = mentor?.userId || mentor?.id;
            const endpoint = currentlyFollowing ? `/unfollow/${targetId}` : `/follow/${targetId}`;
            return api.post(endpoint);
        },
        onMutate: () => {
            // Capture the value BEFORE toggling, pass it to mutationFn
            const wasFollowing = isFollowing;
            setIsFollowing(!isFollowing); // Instantly snap the UI
            return wasFollowing;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['menteeDashboardStats'] });
            queryClient.invalidateQueries({ queryKey: ['mentorDetails', id] });
        },
        onError: (_error, _vars, wasFollowing) => {
            // Revert back to what it was before
            if (wasFollowing !== undefined) setIsFollowing(wasFollowing as boolean);
            alert("Could not update follow status. Please try again.");
        }
    });

    if (isLoading) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[60vh]">
                <Loader2 className="animate-spin text-accent mb-4" size={40} />
                <h2 className="text-xl font-bold text-secondary">Loading Profile...</h2>
            </div>
        );
    }

    if (!mentor) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[60vh]">
                <h2 className="text-2xl font-bold text-secondary mb-4">{t('mentorDetails.notFound')}</h2>
                <button
                    onClick={() => navigate('/mentee/mentors')}
                    className="text-accent underline"
                >
                    {t('mentorDetails.back')}
                </button>
            </div>
        );
    }

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

    const getAvatarColor = (identifier: string | number | undefined) => {
        if (!identifier) return avatarColors[0];

        if (typeof identifier === 'number') {
            return avatarColors[identifier % avatarColors.length];
        }

        let hash = 0;
        const str = String(identifier);
        for (let i = 0; i < str.length; i++) {
            hash = str.charCodeAt(i) + ((hash << 5) - hash);
        }
        return avatarColors[Math.abs(hash) % avatarColors.length];
    };

    const handleSendReview = async () => {
        if (!review.trim() || rating === 0) {
            alert("Please provide both a rating and a comment before posting.");
            return;
        }

        setIsSubmittingReview(true);
        try {
            const response = await api.post('/createReview', {
                mentorUserId: mentor.userId || mentor.id,
                rating: rating,
                comment: review
            });

            if (response.data && response.data.status === "success") {
                // Instantly update the React Query cache so the UI updates without refetching!
                queryClient.setQueryData(['mentorDetails', id], (oldData: any) => {
                    if (!oldData) return oldData;
                    return {
                        ...oldData,
                        reviews: [
                            {
                                ...response.data.data,
                                // Add fake author object for instant UI response before next reload
                                author: { user: { Fname: 'You', Lname: '' } },
                                date: 'Just now'
                            },
                            ...oldData.reviews
                        ]
                    };
                });

                // Clear the form
                setReview("");
                setRating(0);
            }
        } catch (error) {
            console.error("Failed to submit review", error);
            alert("Failed to submit review. Please try again later.");
        } finally {
            setIsSubmittingReview(false);
        }
    }

    // Process Dynamic Variables from Backend
    const mentorName = mentor.user ? `${mentor.user.Fname} ${mentor.user.Lname}` : mentor.name || "Unknown Mentor";
    const mentorRole = mentor.currentStatus || mentor.role || "Mentor";
    const mentorAbout = mentor.bio || mentor.about || "No description provided.";
    const mentorLocation = mentor.location || "Unknown Location";
    const mentorStudents = mentor._count?.mentees || mentor.students || 0;
    const mentorRating = mentor.avRating ?? mentor.rating ?? 0;
    const mentorJoinedDate = mentor.createdAt ? new Date(mentor.createdAt).toLocaleDateString() : mentor.joinedDate || "Unknown";

    const mentorEducation = [];
    if (mentor.hasOlevel) mentorEducation.push({ level: t('wizard.oLevel.title'), series: mentor.oLevelSeries });
    if (mentor.hasAlevel) mentorEducation.push({ level: t('wizard.aLevel.title'), series: mentor.aLevelSeries });
    if (mentorEducation.length === 0 && mentor.education) mentorEducation.push(...mentor.education);

    // get mentor contact
    const handleClick = () => {
        console.log("Mentor Data from Backend:", mentor); // 👈 Look in F12 Console!

        const phoneNumber = mentor.user?.phone || mentor.phone;

        if (phoneNumber) {
            window.location.href = `tel:${phoneNumber}`;
        } else {
            alert("No phone number provided for this mentor. (Or not sent by backend)");
        }
    }

    return (
        <div className='sm:mx-20 sm:my-10 mx-4 my-5 overflow-x-hidden'>
            {/* Header Content (LinkedIn Style) */}
            <div className="rounded-3xl border border-gray-300 overflow-hidden mb-8">
                {/* Banner */}
                <div className={`h-48 w-full ${getAvatarColor(mentor.id)} opacity-80 relative`}>
                    <img
                        src="/hero-blob.svg"
                        className="absolute inset-0 w-full h-full object-cover opacity-20 pointer-events-none"
                        alt=""
                    />
                </div>

                <div className="px-5 sm:px-8 pb-8">
                    {/* Profile Image Overlap */}
                    <div className="relative flex flex-wrap justify-between items-end -mt-16 mb-6 gap-4">
                        <div className={`w-28 h-28 sm:w-32 sm:h-32 rounded-full z-10 ${getAvatarColor(mentor.id)} flex items-center justify-center text-white text-3xl sm:text-4xl font-bold font-heading shadow-xl ring-4 ring-white`}>
                            {getInitials(mentorName)}
                        </div>
                        <div className="flex gap-2 sm:gap-3 mb-2">
                            <button
                                onClick={() => toggleFollowMutation.mutate(isFollowing)}
                                disabled={toggleFollowMutation.isPending}
                                className={`px-5 sm:px-8 py-2.5 rounded-full font-bold transition-all flex items-center gap-2 whitespace-nowrap text-sm sm:text-base disabled:opacity-50 ${isFollowing
                                    ? 'border-2 border-secondary text-secondary hover:bg-secondary/5'
                                    : 'bg-secondary text-white hover:bg-secondary/90'
                                    }`}
                            >
                                {toggleFollowMutation.isPending ? <Loader2 size={16} className="animate-spin" /> : null}
                                {isFollowing ? 'Unfollow' : t('mentorDetails.join')}
                            </button>
                            <button className="px-5 sm:px-8 py-2.5 rounded-full border-2 border-secondary text-secondary font-bold hover:bg-secondary/5 transition-all flex items-center gap-2 whitespace-nowrap text-sm sm:text-base" onClick={handleClick}>
                                <MessageSquare size={18} />
                                {t('mentorDetails.contact')}
                            </button>
                        </div>
                    </div>

                    {/* Basic Info */}
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                        <div className="lg:col-span-8">
                            <h1 className="text-3xl font-bold text-secondary font-heading mb-1">{mentorName}</h1>
                            <p className="text-xl text-gray-600 mb-2 font-medium">{mentorRole}</p>

                            <div className="flex flex-wrap items-center gap-4 text-gray-500 font-sans text-sm mb-4">
                                <div className="flex items-center gap-1.5 font-medium">
                                    <MapPin size={16} />
                                    <span>{mentorLocation}</span>
                                </div>
                                <div className="flex items-center gap-1.5 border-l pl-4 border-gray-300">
                                    <span className="font-bold text-accent">{mentorStudents} {t('mentorDetails.students')}</span>
                                </div>
                            </div>
                        </div>

                        <div className="lg:col-span-4 lg:text-right flex flex-col items-start lg:items-end justify-center font-sans">
                            <div className="flex items-center gap-2">
                                <Calendar className="text-gray-400" size={20} />
                                <span className="text-gray-500 text-sm">{t('mentorDetails.joined')} {mentorJoinedDate}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Main Content Grid (8/4) */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 pb-10">
                {/* Left Column (Main Info) */}
                <div className="lg:col-span-6 space-y-8">
                    {/* About Section */}
                    <div className=" rounded-3xl border border-gray-200 p-8">
                        <h2 className="text-2xl font-bold text-secondary font-heading mb-6">{t('mentorDetails.about')}</h2>
                        <p className="text-gray-600 leading-relaxed whitespace-pre-line">
                            {mentorAbout}
                        </p>

                        <div className="mt-8">
                            <h3 className="text-lg font-bold text-secondary mb-4">{t('mentorDetails.education')}</h3>
                            <div className="flex flex-wrap gap-3">
                                {mentorEducation.length > 0 ? mentorEducation.map((edu, i) => (
                                    <div key={i} className="flex flex-col p-4 rounded-2xl border border-gray-300 min-w-[200px]">
                                        <span className="text-xs font-bold text-accent uppercase tracking-wider mb-1">{edu.level}</span>
                                        <span className="text-gray-900 font-semibold">{edu.series}</span>
                                    </div>
                                )) : (
                                    <p className="text-gray-500 text-sm italic">No education details provided.</p>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Stats Highlights */}
                    <div className="grid grid-cols-1 gap-4">
                        <div className="rounded-3xl p-6 border border-gray-300 w-full min-w-fit">
                            <h4 className="text-accent font-bold mb-2 uppercase tracking-wider text-[10px] sm:text-xs">{t('mentorDetails.totalRating')}</h4>
                            <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
                                <span className="text-3xl sm:text-4xl font-bold text-secondary font-heading">{mentorRating.toFixed(1)}</span>
                                <StarRating rating={mentorRating} size={20} />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Right Column (Reviews) */}
                <div className="lg:col-span-6 space-y-8">
                    {/* Writing Review */}
                    <div className=" rounded-3xl border border-gray-200 p-6">
                        <h2 className="text-xl font-bold text-secondary font-heading mb-4">{t('mentorDetails.writeReview.title')}</h2>
                        <div className="flex gap-1 mb-4">
                            <StarRating rating={rating} size={28} onRate={(newRating) => setRating(newRating)} />
                        </div>
                        <textarea
                            className="w-full rounded-2xl border-gray-200 border p-4 text-sm focus:border-accent focus:ring-1 focus:ring-accent outline-none min-h-[120px] mb-4 font-sans font-medium"
                            placeholder={t('mentorDetails.writeReview.placeholder')}
                            value={review}
                            onChange={(e) => setReview(e.target.value)}
                        />
                        <button onClick={handleSendReview} disabled={isSubmittingReview} className="w-full py-3.5 rounded-2xl bg-accent text-white font-bold text-sm hover:opacity-90 transition-all shadow-sm shadow-accent/20 flex items-center justify-center gap-2 disabled:opacity-50">
                            {isSubmittingReview ? (
                                <Loader2 size={16} className="animate-spin" />
                            ) : (
                                <Send size={16} />
                            )}
                            {isSubmittingReview ? "Posting..." : t('mentorDetails.writeReview.post')}
                        </button>
                    </div>

                    {/* Community Reviews List */}
                    <div className=" rounded-3xl border border-gray-200 p-6 shadow-sm">
                        <h2 className="text-xl text-secondary font-heading mb-6">{t('mentorDetails.recentReviews')}</h2>
                        <div className="space-y-6">
                            {reviews.length > 0 ? reviews.map((r, index) => {
                                // Dynamic fallbacks for different backend structures
                                const reviewerName = r.author?.user ? `${r.author.user.Fname} ${r.author.user.Lname}` : (r.user?.Fname || 'Student');
                                const reviewDate = r.createdAt ? new Date(r.createdAt).toLocaleDateString() : r.date || 'Recently';
                                const reviewText = r.comment || r.message || r.text || r.review || "No comment provided.";
                                const reviewRating = r.rating || 5;

                                return (
                                    <div key={r.id || index} className="border-b last:border-0 pb-6 last:pb-0 font-sans">
                                        <div className="flex justify-between items-start mb-2">
                                            <p className="font-bold text-secondary text-sm">{reviewerName}</p>
                                            <p className="text-gray-400 text-xs">{reviewDate}</p>
                                        </div>
                                        <div className="mb-2">
                                            <StarRating rating={reviewRating} size={12} />
                                        </div>
                                        <p className="text-gray-600 text-sm line-clamp-3">{reviewText}</p>
                                    </div>
                                );
                            }) : (
                                <p className="text-gray-500 italic text-sm text-center py-6">No reviews have been left for this mentor yet.</p>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default MentorDetails