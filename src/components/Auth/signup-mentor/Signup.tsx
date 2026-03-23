import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { z } from 'zod'
import { useAuthStore } from "../../../store";
import api from "../../../utils/api"
import { Loader2 } from "lucide-react"

const registrationSchema = z.object({
    Fname: z.string().min(2, "First name must be at least 2 characters"),
    Lname: z.string().min(2, "Last name must be at least 2 characters"),
    email: z.string().email("Please enter a valid email address"),
    phone: z.string().min(9, "Phone number must be at least 9 characters long"),
    password: z.string().min(8, "Password must be at least 8 characters long"),
})

const SignUp = () => {
    const navigate = useNavigate();
    const { t } = useTranslation();
    const setUser = useAuthStore((state) => state.setUser);

    const [formData, setFormData] = useState({
        Fname: '',
        Lname: '',
        email: '',
        phone: '',
        password: ''
    });

    const [errors, setErrors] = useState<{ [key: string]: string }>({});
    const [isLoading, setIsLoading] = useState(false);

    const handleChange = (e: any) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    }

    const handleSubmit = async (e: any) => {
        e.preventDefault();

        // 1. Run the validation
        const result = registrationSchema.safeParse(formData);

        if (!result.success) {
            // 2. If it fails, format the errors and set the state
            const formattedErrors: { [key: string]: string } = {};
            result.error.issues.forEach((issue) => {
                const fieldName = String(issue.path[0]);
                formattedErrors[fieldName] = issue.message;
            });
            setErrors(formattedErrors);
            return;
        }

        // 3. If it succeeds, clear errors and proceed
        setErrors({});
        setIsLoading(true);
        console.log(formData);

        try {
            const response = await api.post("/auth/register", {
                ...formData,
                role: "Mentor"
            });

            if (response.data.token) {
                // 1. Save critical data
                localStorage.setItem("token", response.data.token);
                // 2. Update store
                setUser(response.data.user);

                // 3. Navigate to wizard
                navigate("/mentor-wizard");
            }
        } catch (error: any) {
            console.error("Mentor Registration Error:", error);
            setErrors({ server: error.response?.data?.message || "Registration failed. Please try again." });
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <div className="flex items-center justify-center min-h-screen px-6 py-12">
            <div className="w-full max-w-md">
                {/* Header */}
                <div className="mb-8">
                    <h1 className="text-4xl font-bold text-gray-900 mb-2 font-heading">{t('auth.createAccount')}</h1>
                    <p className="text-gray-600">{t('auth.joinToday')}</p>
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit} className="space-y-5">
                    {/* Global Server Error Message */}
                    {errors.server && (
                        <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg text-sm font-medium animate-in fade-in slide-in-from-top-2 duration-200">
                            {errors.server}
                        </div>
                    )}

                    {/* Name Fields Row */}
                    <div className="grid grid-cols-2 gap-4">
                        <div className="flex flex-col">
                            <label htmlFor="Fname" className="text-sm font-medium text-gray-700 mb-1.5">
                                {t('auth.firstName')}
                            </label>
                            <input
                                type="text"
                                id="Fname"
                                name="Fname"
                                value={formData.Fname}
                                onChange={handleChange}
                                className={`px-4 py-2.5 border rounded-lg focus:outline-none focus:ring-2 transition-all ${errors.Fname
                                    ? "border-red-500 focus:ring-red-500"
                                    : "border-gray-300 focus:ring-accent"
                                    }`}
                                placeholder="Philippe"
                            />
                            {errors.Fname && (
                                <p className="text-red-500 text-xs mt-1 font-medium">{errors.Fname}</p>
                            )}
                        </div>
                        <div className="flex flex-col">
                            <label htmlFor="Lname" className="text-sm font-medium text-gray-700 mb-1.5">
                                {t('auth.lastName')}
                            </label>
                            <input
                                type="text"
                                id="Lname"
                                name="Lname"
                                value={formData.Lname}
                                onChange={handleChange}
                                className={`px-4 py-2.5 border rounded-lg focus:outline-none focus:ring-2 transition-all ${errors.Lname
                                    ? "border-red-500 focus:ring-red-500"
                                    : "border-gray-300 focus:ring-accent"
                                    }`}
                                placeholder="Gael"
                            />
                            {errors.Lname && (
                                <p className="text-red-500 text-xs mt-1 font-medium">{errors.Lname}</p>
                            )}
                        </div>
                    </div>

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
                            placeholder="philippegael@example.com"
                        />
                        {errors.email && (
                            <p className="text-red-500 text-xs mt-1 font-medium">{errors.email}</p>
                        )}
                    </div>

                    {/* Phone Field */}
                    <div className="flex flex-col">
                        <label htmlFor="phone" className="text-sm font-medium text-gray-700 mb-1.5">
                            {t('auth.phoneNumber')}
                        </label>
                        <div className={`flex items-center border rounded-lg overflow-hidden transition-all focus-within:ring-2 ${errors.phone
                            ? "border-red-500 focus-within:ring-red-500"
                            : "border-gray-300 focus-within:ring-accent"
                            }`}>
                            <span className="text-gray-500 px-3 py-2.5 border-r border-gray-300 text-sm font-medium">
                                +237
                            </span>
                            <input
                                type="tel"
                                id="phone"
                                name="phone"
                                value={formData.phone}
                                onChange={handleChange}
                                className="flex-1 px-4 py-2.5 outline-none bg-transparent"
                                placeholder="671234567"
                            />
                        </div>
                        {errors.phone && (
                            <p className="text-red-500 text-xs mt-1 font-medium">{errors.phone}</p>
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
                        disabled={isLoading}
                        className="w-full bg-accent text-white font-semibold py-3 rounded-lg hover:bg-accent/70 transition-colors duration-200 shadow-sm disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                    >
                        {isLoading ? (
                            <Loader2 className="animate-spin" size={20} />
                        ) : (
                            t('auth.createAccount')
                        )}
                    </button>

                    {/* Login Link */}
                    <div className="text-center pt-2">
                        <p className="text-gray-600">
                            {t('auth.alreadyHaveAccount')}
                            <Link to="/sign-in" className="text-accent font-semibold hover:underline">
                                {t('auth.login')}
                            </Link>
                        </p>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default SignUp