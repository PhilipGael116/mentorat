import { useParams, useNavigate } from 'react-router-dom'
import { Star, MapPin, Calendar, MessageSquare, Send, StarHalf } from 'lucide-react'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'

const MentorDetails = () => {
    const { t } = useTranslation();
    const { id } = useParams();
    const navigate = useNavigate();
    const [review, setReview] = useState("");
    const [rating, setRating] = useState(0);

    // Hardcoded data (should be moved to a shared file later)
    const mentors = [
        {
            id: 1,
            name: "Philippe Gael",
            about: "Senior Fullstack Developer with 8+ years of experience in React and Node.js. Passionate about building scalable apps and mentoring the next generation of engineers. I specialize in system architecture and performance optimization.",
            students: 1,
            rating: 4.9,
            role: "Software Engineer",
            location: "Douala, Cameroon",
            joinedDate: "March 2024",
            education: [
                { level: "GCE O-Level", series: "Science" },
                { level: "GCE A-Level", series: "Science" }
            ]
        },
        {
            id: 2,
            name: "Sarah Johnson",
            about: "UI/UX Designer helping students master Figma and design thinking principles. Expert in mobile-first design and accessibility. I've led design teams at Fortune 500 companies.",
            students: 8,
            rating: 4.8,
            role: "Product Designer",
            location: "Lagos, Nigeria",
            joinedDate: "January 2024",
            education: [
                { level: "GCE O-Level", series: "Arts" },
                { level: "GCE A-Level", series: "Arts" }
            ]
        },
        {
            id: 3,
            name: "Dr. Robert Smith",
            about: "Data Scientist specialized in Machine Learning and AI. I help developers transition into AI roles. My work focuses on neural networks and natural language processing.",
            students: 21,
            rating: 5.0,
            role: "AI Researcher",
            location: "Nairobi, Kenya",
            joinedDate: "February 2024",
            education: [
                { level: "GCE O-Level", series: "Science" },
                { level: "GCE A-Level", series: "Technical" }
            ]
        }
    ];

    const mentor = mentors.find(m => m.id === Number(id));

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
        return name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);
    };

    const getAvatarColor = (id: number) => {
        return avatarColors[id % avatarColors.length];
    };

    const mockReviews = [
        { id: 1, user: "Alice M.", text: "Incredible mentor! Helped me land my first job.", rating: 5, date: "2 days ago" },
        { id: 2, user: "John D.", text: "Very patient and explains complex topics simply.", rating: 4, date: "1 week ago" }
    ];

    const handleSendReview = () => {
        console.log(review);
        console.log(rating);
        setReview("");
        setRating(0);
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
                            {getInitials(mentor.name)}
                        </div>
                        <div className="flex gap-2 sm:gap-3 mb-2">
                            <button className="px-5 sm:px-8 py-2.5 rounded-full bg-secondary text-white font-bold hover:bg-secondary/90 transition-all flex items-center gap-2 whitespace-nowrap text-sm sm:text-base">
                                {t('mentorDetails.join')}
                            </button>
                            <button className="px-5 sm:px-8 py-2.5 rounded-full border-2 border-secondary text-secondary font-bold hover:bg-secondary/5 transition-all flex items-center gap-2 whitespace-nowrap text-sm sm:text-base">
                                <MessageSquare size={18} />
                                {t('mentorDetails.contact')}
                            </button>
                        </div>
                    </div>

                    {/* Basic Info */}
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                        <div className="lg:col-span-8">
                            <h1 className="text-3xl font-bold text-secondary font-heading mb-1">{mentor.name}</h1>
                            <p className="text-xl text-gray-600 mb-2 font-medium">{mentor.role}</p>

                            <div className="flex flex-wrap items-center gap-4 text-gray-500 font-sans text-sm mb-4">
                                <div className="flex items-center gap-1.5 font-medium">
                                    <MapPin size={16} />
                                    <span>{mentor.location}</span>
                                </div>
                                <div className="flex items-center gap-1.5 border-l pl-4 border-gray-300">
                                    <span className="font-bold text-accent">{mentor.students} {t('mentorDetails.students')}</span>
                                </div>
                            </div>
                        </div>

                        <div className="lg:col-span-4 lg:text-right flex flex-col items-start lg:items-end justify-center font-sans">
                            <div className="flex items-center gap-2">
                                <Calendar className="text-gray-400" size={20} />
                                <span className="text-gray-500 text-sm">{t('mentorDetails.joined')}{mentor.joinedDate}</span>
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
                            {mentor.about}
                        </p>

                        <div className="mt-8">
                            <h3 className="text-lg font-bold text-secondary mb-4">{t('mentorDetails.education')}</h3>
                            <div className="flex flex-wrap gap-3">
                                {mentor.education.map((edu, i) => (
                                    <div key={i} className="flex flex-col p-4 rounded-2xl border border-gray-300 min-w-[200px]">
                                        <span className="text-xs font-bold text-accent uppercase tracking-wider mb-1">{edu.level}</span>
                                        <span className="text-gray-900 font-semibold">{edu.series}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Stats Highlights */}
                    <div className="grid grid-cols-1 gap-4">
                        <div className="rounded-3xl p-6 border border-gray-300 w-full min-w-fit">
                            <h4 className="text-accent font-bold mb-2 uppercase tracking-wider text-[10px] sm:text-xs">{t('mentorDetails.totalRating')}</h4>
                            <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
                                <span className="text-3xl sm:text-4xl font-bold text-secondary font-heading">{mentor.rating}</span>
                                <div className="flex items-center gap-1 text-accent">
                                    <Star fill="currentColor" size={18} className="sm:w-5 sm:h-5" />
                                    <Star fill="currentColor" size={18} className="sm:w-5 sm:h-5" />
                                    <Star fill="currentColor" size={18} className="sm:w-5 sm:h-5" />
                                    <Star fill="currentColor" size={18} className="sm:w-5 sm:h-5" />
                                    <StarHalf fill="currentColor" size={18} className="sm:w-5 sm:h-5" />
                                </div>
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
                            {[1, 2, 3, 4, 5].map((star) => (
                                <button
                                    key={star}
                                    onClick={() => setRating(star)}
                                    className={`${rating >= star ? 'text-accent' : 'text-gray-300'} hover:scale-110 transition-transform`}
                                >
                                    <Star fill={rating >= star ? "currentColor" : "none"} size={24} />
                                </button>
                            ))}
                        </div>
                        <textarea
                            className="w-full rounded-2xl border-gray-200 border p-4 text-sm focus:border-accent focus:ring-1 focus:ring-accent outline-none min-h-[120px] mb-4 font-sans font-medium"
                            placeholder={t('mentorDetails.writeReview.placeholder')}
                            value={review}
                            onChange={(e) => setReview(e.target.value)}
                        />
                        <button onClick={handleSendReview} className="w-full py-3.5 rounded-2xl bg-accent text-white font-bold text-sm hover:opacity-90 transition-all shadow-sm shadow-accent/20 flex items-center justify-center gap-2">
                            <Send size={16} />
                            {t('mentorDetails.writeReview.post')}
                        </button>
                    </div>

                    {/* Community Reviews List */}
                    <div className=" rounded-3xl border border-gray-200 p-6 shadow-sm">
                        <h2 className="text-xl text-secondary font-heading mb-6">{t('mentorDetails.recentReviews')}</h2>
                        <div className="space-y-6">
                            {mockReviews.map((r) => (
                                <div key={r.id} className="border-b last:border-0 pb-6 last:pb-0 font-sans">
                                    <div className="flex justify-between items-start mb-2">
                                        <p className="font-bold text-secondary text-sm">{r.user}</p>
                                        <p className="text-gray-400 text-xs">{r.date}</p>
                                    </div>
                                    <div className="flex text-accent mb-2">
                                        {[...Array(r.rating)].map((_, i) => <Star key={i} fill="currentColor" size={12} />)}
                                    </div>
                                    <p className="text-gray-600 text-sm line-clamp-3">"{r.text}"</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default MentorDetails