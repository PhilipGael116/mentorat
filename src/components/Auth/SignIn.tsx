import { useState } from "react"
import { Link } from "react-router-dom"
import { useTranslation } from "react-i18next"
import { z } from 'zod'
import { useAuthStore } from "../../store"

import { ChevronRight } from "lucide-react"

const userSchema = z.object({
    email: z.string().email("Please enter a valid email address"),
    password: z.string().min(8, "Password must be at least 8 characters long"),
})

const SignIn = () => {
    const { t } = useTranslation();
    const setUser = useAuthStore((state) => state.setUser);

    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });

    const [errors, setErrors] = useState<{ [key: string]: string }>({});
    const [isHovered, setIsHovered] = useState(false);

    const handleChange = (e: any) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    }

    const handleSubmit = (e: any) => {
        e.preventDefault();

        // 1. Run the validation
        const result = userSchema.safeParse(formData);

        if (!result.success) {
            // 2. If it fails, format the errors and set the state
            const formattedErrors: { [key: string]: string } = {};
            result.error.issues.forEach((issue) => {
                const fieldName = String(issue.path[0]);
                formattedErrors[fieldName] = issue.message;
            });
            setErrors(formattedErrors);
            return; // Stop the submission here
        }

        // 3. If it succeeds, clear errors and proceed
        setErrors({});
        console.log("Form submitted successfully: ", result.data);
        setUser(true);

        // Reset form or redirect
        setFormData({
            email: "",
            password: "",
        })
    }

    return (
        <div className="flex items-center justify-center min-h-screen px-6 py-12">
            <div className="w-full max-w-md">
                {/* Header */}
                <div className="mb-8">
                    <h1 className="text-5xl font-bold mb-2 font-heading">{t('auth.welcomeBack')}</h1>
                    <p>{t('auth.signInToContinue')}</p>
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit} className="space-y-5">
                    {/* Email Field */}
                    <div className="flex flex-col">
                        <label htmlFor="email" className="text-sm font-medium text-gray-700 mb-1.5">
                            {t('auth.emailAddress')}
                        </label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            className={`px-4 py-2.5 border rounded-lg focus:outline-none focus:ring-2 transition-all ${errors.email
                                ? "border-red-500 focus:ring-red-500"
                                : "border-gray-300 focus:ring-accent"
                                }`}
                            placeholder="philippe@example.com"
                        />
                        {errors.email && (
                            <p className="text-red-500 text-xs mt-1 font-medium">{errors.email}</p>
                        )}
                    </div>

                    {/* Password Field */}
                    <div className="flex flex-col">
                        <label htmlFor="password" className="text-sm font-medium text-gray-700 mb-1.5">
                            {t('auth.password')}
                        </label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            className={`px-4 py-2.5 border rounded-lg focus:outline-none focus:ring-2 transition-all ${errors.password
                                ? "border-red-500 focus:ring-red-500"
                                : "border-gray-300 focus:ring-accent"
                                }`}
                            placeholder="••••••••"
                        />
                        {errors.password && (
                            <p className="text-red-500 text-xs mt-1 font-medium">{errors.password}</p>
                        )}
                    </div>

                    {/* Submit Button */}
                    <button
                        type="submit"
                        className="w-full bg-accent text-white font-semibold py-3 rounded-lg hover:bg-accent/70 transition-colors duration-200 shadow-sm"
                    >
                        {t('auth.signIn')}
                    </button>

                    <div className="flex items-center justify-between">
                        <Link to="/" className="text-secondary hover:text-accent font-medium transition-colors" >{t('auth.goToHome')} </Link>

                        {/* Register Link with Dropdown */}
                        <div
                            className="relative group flex items-center"
                            onMouseEnter={() => setIsHovered(true)}
                            onMouseLeave={() => setIsHovered(false)}
                        >
                            <p className="text-gray-600">
                                {t('auth.dontHaveAccount')}
                                <span className="text-accent font-semibold hover:underline cursor-pointer inline-flex items-center gap-1 align-baseline">
                                    {t('auth.register')}
                                    <ChevronRight size={16} className={`transition-transform duration-200 ${isHovered ? 'rotate-90' : ''}`} />
                                </span>
                            </p>

                            {/* Dropdown Menu - Added a wrapper with padding to bridge the gap for the mouse */}
                            {isHovered && (
                                <div className="absolute bottom-full right-0 pb-3 z-10">
                                    <div className="w-48 bg-white border border-gray-100 rounded-2xl shadow-xl overflow-hidden py-2 animate-in fade-in slide-in-from-bottom-2 duration-200">
                                        <Link to="/register-mentor" className="block w-full text-left px-4 py-3 text-gray-700 font-medium hover:bg-accent/5 hover:text-accent transition-colors">
                                            {t('header.asMentor')}
                                        </Link>
                                        <Link to="/register-mentee" className="block w-full text-left px-4 py-3 text-gray-700 font-medium hover:bg-accent/5 hover:text-accent transition-colors border-t border-gray-50">
                                            {t('header.asMentee')}
                                        </Link>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default SignIn