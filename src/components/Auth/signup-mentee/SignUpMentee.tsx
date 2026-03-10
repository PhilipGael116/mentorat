import { useState } from "react";
import { Link } from "react-router-dom";
import { z } from 'zod'

const registrationSchema = z.object({
    fname: z.string().min(2, "First name must be at least 2 characters"),
    lname: z.string().min(2, "Last name must be at least 2 characters"),
    email: z.string().email("Please enter a valid email address"),
    phone: z.string().min(9, "Phone number must be at least 9 characters long"),
    password: z.string().min(8, "Password must be at least 8 characters long"),
})

const SignUp = () => {
    const [formData, setFormData] = useState({
        fname: '',
        lname: '',
        email: '',
        phone: '',
        password: ''
    });

    const [errors, setErrors] = useState<{ [key: string]: string }>({});

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
        console.log("Form Submitted Successfully: ", result.data);

        setFormData({
            fname: "",
            lname: "",
            email: "",
            phone: "",
            password: "",
        })
    }

    return (
        <div className="flex items-center justify-center min-h-screen px-6 py-12">
            <div className="w-full max-w-md">
                {/* Header */}
                <div className="mb-8">
                    <h1 className="text-4xl font-bold text-gray-900 mb-2 font-heading">Create Account</h1>
                    <p className="text-gray-600">Join us today and get started</p>
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit} className="space-y-5">
                    {/* Name Fields Row */}
                    <div className="grid grid-cols-2 gap-4">
                        <div className="flex flex-col">
                            <label htmlFor="fname" className="text-sm font-medium text-gray-700 mb-1.5">
                                First Name
                            </label>
                            <input
                                type="text"
                                id="fname"
                                name="fname"
                                value={formData.fname}
                                onChange={handleChange}
                                className={`px-4 py-2.5 border rounded-lg focus:outline-none focus:ring-2 transition-all ${errors.fname
                                    ? "border-red-500 focus:ring-red-500"
                                    : "border-gray-300 focus:ring-accent"
                                    }`}
                                placeholder="Philippe"
                            />
                            {errors.fname && (
                                <p className="text-red-500 text-xs mt-1 font-medium">{errors.fname}</p>
                            )}
                        </div>
                        <div className="flex flex-col">
                            <label htmlFor="lname" className="text-sm font-medium text-gray-700 mb-1.5">
                                Last Name
                            </label>
                            <input
                                type="text"
                                id="lname"
                                name="lname"
                                value={formData.lname}
                                onChange={handleChange}
                                className={`px-4 py-2.5 border rounded-lg focus:outline-none focus:ring-2 transition-all ${errors.lname
                                    ? "border-red-500 focus:ring-red-500"
                                    : "border-gray-300 focus:ring-accent"
                                    }`}
                                placeholder="Gael"
                            />
                            {errors.lname && (
                                <p className="text-red-500 text-xs mt-1 font-medium">{errors.lname}</p>
                            )}
                        </div>
                    </div>

                    {/* Email Field */}
                    <div className="flex flex-col">
                        <label htmlFor="email" className="text-sm font-medium text-gray-700 mb-1.5">
                            Email Address
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
                            Phone Number
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
                            Password
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
                        Create Account
                    </button>

                    {/* Login Link */}
                    <div className="text-center pt-2">
                        <p className="text-gray-600">
                            Already have an account?{' '}
                            <Link to="/sign-in" className="text-accent font-semibold hover:underline">
                                Login
                            </Link>
                        </p>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default SignUp