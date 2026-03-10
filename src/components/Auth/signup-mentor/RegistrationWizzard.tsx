import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { z } from "zod";
import { useMultiStepRegister } from "./useMultiStepRegister";
import { ChevronRight, ChevronLeft } from "lucide-react";

// Validation schemas for each step
const step1Schema = z.object({}); // Welcome step, no validation needed
const step2Schema = z.object({
    hasOLevel: z.boolean(),
    oLevelSeries: z.string().min(1, "Please select your O-Level series"),
});
const step3Schema = z.object({
    hasALevel: z.boolean(),
    aLevelSeries: z.string().min(1, "Please select your A-Level series"),
});
const step4Schema = z.object({
    currentStatus: z.string().min(5, "Please tell us your current status"),
    experience: z.string().min(10, "Briefly describe your experience"),
});

const RegistrationWizzard = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        hasOLevel: true,
        oLevelSeries: "",
        hasALevel: true,
        aLevelSeries: "",
        currentStatus: "",
        experience: "",
    });

    const [errors, setErrors] = useState<{ [key: string]: string }>({});

    const updateFields = (fields: Partial<typeof formData>) => {
        setFormData(prev => ({ ...prev, ...fields }));
    };

    const validateStep = (index: number) => {
        let schema;
        if (index === 0) schema = step1Schema;
        else if (index === 1) schema = step2Schema;
        else if (index === 2) schema = step3Schema;
        else schema = step4Schema;

        const result = schema.safeParse(formData);
        if (!result.success) {
            const formattedErrors: { [key: string]: string } = {};
            result.error.issues.forEach((issue) => {
                const fieldName = String(issue.path[0]);
                formattedErrors[fieldName] = issue.message;
            });
            setErrors(formattedErrors);
            return false;
        }
        setErrors({});
        return true;
    };

    const steps = [
        // Step 0: Welcome
        <div key="step0" className="text-center space-y-4 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="flex justify-center mb-6">
                <div className="bg-accent/10 p-2 rounded-full animate-success-circle">
                    <svg
                        className="w-16 h-16 text-accent"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth="3"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="animate-success-check"
                            d="M5 13l4 4L19 7"
                        />
                    </svg>
                </div>
            </div>
            <h2 className="text-3xl font-bold text-gray-900">Account Created!</h2>
            <p className="text-gray-600 text-lg">
                Welcome to the WiMentor family. To provide you with the best experience,
                <span className="block font-semibold mt-2 text-gray-800">we just want to know more about you.</span>
            </p>
        </div>,

        // Step 1: Ordinary Level
        <div key="step1" className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-300">
            <div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">GCE Ordinary Level</h3>
                <div className="space-y-4">
                    <div className="flex flex-col gap-2">
                        <label className="text-sm font-medium text-gray-700">Do you have your O-Level?</label>
                        <div className="flex gap-4">
                            {['Yes', 'No'].map(val => (
                                <button
                                    key={val}
                                    type="button"
                                    onClick={() => updateFields({ hasOLevel: val === 'Yes' })}
                                    className={`flex-1 py-3 px-4 rounded-xl border-2 transition-all ${formData.hasOLevel === (val === 'Yes') ? 'border-accent bg-accent/5 text-accent font-bold' : 'border-gray-200 text-gray-500 hover:border-gray-400'}`}
                                >
                                    {val}
                                </button>
                            ))}
                        </div>
                    </div>

                    {formData.hasOLevel && (
                        <div className="flex flex-col gap-2">
                            <label className="text-sm font-medium text-gray-700">Which series did you take?</label>
                            <select
                                value={formData.oLevelSeries}
                                onChange={e => updateFields({ oLevelSeries: e.target.value })}
                                className={`w-full px-4 py-3 rounded-xl border-2 outline-none focus:ring-2 transition-all ${errors.oLevelSeries ? 'border-red-500 focus:ring-red-500' : 'border-gray-200 focus:ring-accent'}`}
                            >
                                <option value="">Select Series</option>
                                <option value="Science">Science</option>
                                <option value="Arts">Arts</option>
                                <option value="Technical">Technical</option>
                                <option value="Commercial">Commercial</option>
                            </select>
                            {errors.oLevelSeries && <p className="text-red-500 text-xs mt-1 font-medium">{errors.oLevelSeries}</p>}
                        </div>
                    )}
                </div>
            </div>
        </div>,

        // Step 2: Advanced Level
        <div key="step2" className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-300">
            <div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">GCE Advanced Level</h3>
                <div className="space-y-4">
                    <div className="flex flex-col gap-2">
                        <label className="text-sm font-medium text-gray-700">Do you have your A-Level?</label>
                        <div className="flex gap-4">
                            {['Yes', 'No'].map(val => (
                                <button
                                    key={val}
                                    type="button"
                                    onClick={() => updateFields({ hasALevel: val === 'Yes' })}
                                    className={`flex-1 py-3 px-4 rounded-xl border-2 transition-all ${formData.hasALevel === (val === 'Yes') ? 'border-accent bg-accent/5 text-accent font-bold' : 'border-gray-200 text-gray-500 hover:border-gray-400'}`}
                                >
                                    {val}
                                </button>
                            ))}
                        </div>
                    </div>

                    {formData.hasALevel && (
                        <div className="flex flex-col gap-2">
                            <label className="text-sm font-medium text-gray-700">Which series did you take?</label>
                            <div className="grid grid-cols-2 gap-3">
                                {['Science', 'Arts', 'Technical', 'Commercial'].map(series => (
                                    <button
                                        key={series}
                                        type="button"
                                        onClick={() => updateFields({ aLevelSeries: series })}
                                        className={`py-3 px-4 rounded-xl border-2 transition-all text-sm font-medium ${formData.aLevelSeries === series ? 'border-accent bg-accent/5 text-accent font-bold' : 'border-gray-200 text-gray-500 hover:border-gray-400'}`}
                                    >
                                        {series}
                                    </button>
                                ))}
                            </div>
                            {errors.aLevelSeries && <p className="text-red-500 text-xs mt-1 font-medium">{errors.aLevelSeries}</p>}
                        </div>
                    )}
                </div>
            </div>
        </div>,

        // Step 3: Professional info
        <div key="step3" className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-300">
            <div className="space-y-4">
                <div className="flex flex-col">
                    <label className="text-sm font-medium text-gray-700 mb-1.5">What is your current status?</label>
                    <input
                        type="text"
                        value={formData.currentStatus}
                        onChange={e => updateFields({ currentStatus: e.target.value })}
                        placeholder="e.g. Software Engineer at Google"
                        className={`px-4 py-3 border-2 rounded-xl focus:outline-none transition-all ${errors.currentStatus ? "border-red-500 focus:ring-red-500" : "border-gray-200 focus:ring-accent"}`}
                    />
                    {errors.currentStatus && <p className="text-red-500 text-xs mt-1 font-medium">{errors.currentStatus}</p>}
                </div>
                <div className="flex flex-col">
                    <label className="text-sm font-medium text-gray-700 mb-1.5">Briefly describe your experience</label>
                    <textarea
                        value={formData.experience}
                        onChange={e => updateFields({ experience: e.target.value })}
                        placeholder="I have been working in the tech industry for..."
                        className={`px-4 py-3 border-2 rounded-xl focus:outline-none transition-all h-32 ${errors.experience ? "border-red-500 focus:ring-red-500" : "border-gray-200 focus:ring-accent"}`}
                    />
                    {errors.experience && <p className="text-red-500 text-xs mt-1 font-medium">{errors.experience}</p>}
                </div>
            </div>
        </div>
    ];

    const { currentStepIndex, step, isFirstStep, isLastStep, next, prev } = useMultiStepRegister(steps);

    const handleNext = () => {
        if (validateStep(currentStepIndex)) {
            if (isLastStep) {
                console.log("Wizard Complete:", formData);
                navigate("/home"); // Final destination
            } else {
                next();
            }
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen px-6 py-12">
            <div className="w-full max-w-lg">
                {/* Progress bar */}
                <div className="mb-10">
                    <div className="flex justify-between items-center mb-4">
                        <span className="text-xs font-bold text-gray-400 tracking-wider uppercase">Step</span>
                        <span className="text-xs font-bold text-accent uppercase tracking-wider">{currentStepIndex + 1} / {steps.length}</span>
                    </div>
                    <div className="h-2 w-full bg-gray-100 rounded-full overflow-hidden">
                        <div
                            className="h-full bg-accent transition-all duration-500 ease-out"
                            style={{ width: `${((currentStepIndex + 1) / steps.length) * 100}%` }}
                        />
                    </div>
                </div>

                <div className="min-h-[300px]">
                    {step}
                </div>

                <div className="mt-12 flex items-center justify-between">
                    {!isFirstStep ? (
                        <button
                            onClick={prev}
                            className="flex items-center gap-2 text-gray-500 font-bold hover:text-gray-800 transition-colors"
                        >
                            <ChevronLeft size={20} />
                            Back
                        </button>
                    ) : (
                        <div />
                    )}

                    <button
                        onClick={handleNext}
                        className="bg-accent text-white font-bold py-4 px-10 rounded-2xl hover:bg-accent/70 transition-all duration-300 flex items-center gap-3"
                    >
                        {isLastStep ? "Let's Go!" : "Next Step"}
                        {!isLastStep && <ChevronRight size={20} />}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default RegistrationWizzard;