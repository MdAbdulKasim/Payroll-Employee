"use client";

import { useState, useEffect } from "react";
import { CheckCircle2, Circle, ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import dynamic from "next/dynamic";

// Import step components
const OrganizationDetails = dynamic(() => import("@/components/Admin/setup/OrganisationDetails"), {
    ssr: false,
});
const TaxDetails = dynamic(() => import("@/components/Admin/setup/Taxdetails"), { ssr: false });
const SetupConfiguration = dynamic(() => import("@/components/Admin/setup/Setupconfiguration"), {
    ssr: false,
});
const StatutoryComponents = dynamic(() => import("@/components/Admin/setup/statuarycomponents/Satuarycomponents"), {
    ssr: false,
});
const SalaryComponents = dynamic(() => import("@/components/Admin/setup/salarycomponents/Salarycomponents"), {
    ssr: false,
});
const AddEmployees = dynamic(() => import("@/components/Admin/setup/employee/AddEmployee"), { ssr: false });


// Define step type
type StepId =
    | "organization-details"
    | "tax-details"
    | "setup-configuration"
    | "statutory-components"
    | "salary-components"
    | "add-employees"
    // | "prior-payroll";

interface Step {
    id: StepId;
    title: string;
    component: React.ComponentType<{ onComplete?: () => void }>;
}

const steps: Step[] = [
    {
        id: "organization-details",
        title: "Add Organization Details",
        component: OrganizationDetails,
    },
    {
        id: "tax-details",
        title: "Provide Your Tax Details",
        component: TaxDetails,
    },
    {
        id: "setup-configuration",
        title: "Setup & Configuration",
        component: SetupConfiguration,
    },
    {
        id: "statutory-components",
        title: "Setup Statutory Components",
        component: StatutoryComponents,
    },
    {
        id: "salary-components",
        title: "Set Up Salary Components",
        component: SalaryComponents,
    },
    {
        id: "add-employees",
        title: "Add Employees",
        component: AddEmployees,
    },
    // {
    //     id: "prior-payroll",
    //     title: "Configure Prior Payroll",
    //     component: PriorPayroll,
    // },
];

export default function SetupWizard() {
    const router = useRouter();
    const [completedSteps, setCompletedSteps] = useState<StepId[]>([]);
    const [activeStep, setActiveStep] = useState<StepId | null>(null);

    // Load completed steps from localStorage on mount
    useEffect(() => {
        const saved = localStorage.getItem("completedSteps");
        if (saved) {
            try {
                setCompletedSteps(JSON.parse(saved));
            } catch (error) {
                console.error("Error loading completed steps:", error);
            }
        }
    }, []);

    // Listen for changes to completed steps in localStorage
    useEffect(() => {
        const handleStorageChange = () => {
            const saved = localStorage.getItem("completedSteps");
            if (saved) {
                try {
                    const steps = JSON.parse(saved);
                    setCompletedSteps(steps);
                } catch (error) {
                    console.error("Error parsing completed steps:", error);
                }
            }
        };

        // Poll for changes every 500ms
        const interval = setInterval(handleStorageChange, 500);

        return () => clearInterval(interval);
    }, []);

    // Redirect to dashboard when all steps are completed
    useEffect(() => {
        if (completedSteps.length === steps.length) {
            setTimeout(() => {
                router.push("/admin/dashboard");
            }, 1500);
        }
    }, [completedSteps, router]);

    const handleStepClick = (stepId: StepId) => {
        setActiveStep(stepId);
    };

    const handleStepComplete = (stepId: StepId) => {
        if (!completedSteps.includes(stepId)) {
            const updatedSteps = [...completedSteps, stepId];
            setCompletedSteps(updatedSteps);
            localStorage.setItem("completedSteps", JSON.stringify(updatedSteps));
        }

        // Return to wizard overview
        setActiveStep(null);

        // Auto-open next incomplete step
        const currentIndex = steps.findIndex((s) => s.id === stepId);
        if (currentIndex !== -1 && currentIndex < steps.length - 1) {
            // Find next incomplete step
            for (let i = currentIndex + 1; i < steps.length; i++) {
                if (!completedSteps.includes(steps[i].id)) {
                    setTimeout(() => {
                        setActiveStep(steps[i].id);
                    }, 300);
                    break;
                }
            }
        }
    };

    const handleBackToWizard = () => {
        setActiveStep(null);
    };

    // Helper function to combine class names
    const cn = (...classes: (string | boolean | undefined)[]) => {
        return classes.filter(Boolean).join(" ");
    };

    // If a step is active, show full-page view
    if (activeStep) {
        const step = steps.find((s) => s.id === activeStep);
        if (!step) return null;

        const StepComponent = step.component;
        const stepIndex = steps.findIndex((s) => s.id === activeStep);

        return (
            <div className="min-h-screen bg-gray-50">
                {/* Header */}
                <div className="bg-white border-b border-gray-200 sticky top-0 z-10">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-4">
                                <button
                                    onClick={handleBackToWizard}
                                    className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors"
                                >
                                    <ArrowLeft className="h-5 w-5" />
                                    <span className="text-sm font-medium">Back to Setup</span>
                                </button>
                                <div className="h-6 w-px bg-gray-300"></div>
                                <div>
                                    <p className="text-sm text-gray-500">
                                        Step {stepIndex + 1} of {steps.length}
                                    </p>
                                    <h1 className="text-lg font-semibold text-gray-900">
                                        {step.title}
                                    </h1>
                                </div>
                            </div>
                            <div className="flex items-center gap-2">
                                <span className="text-sm text-gray-600">
                                    {completedSteps.length} / {steps.length} completed
                                </span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Content */}
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 sm:p-8">
                        <StepComponent onComplete={() => handleStepComplete(activeStep)} />
                    </div>
                </div>
            </div>
        );
    }

    // Show wizard overview
    return (
        <div className="max-w-5xl mx-auto p-4 sm:p-6 lg:p-8">
            <div className="mb-8">
                <h1 className="text-2xl sm:text-3xl font-bold mb-2 text-gray-900">
                    Set up your payroll before your first payroll
                </h1>
                <p className="text-gray-600">
                    Complete these following steps to set up and run your first payroll
                    successfully.
                </p>
            </div>

            <div className="space-y-4">
                {steps.map((step, index) => {
                    const isCompleted = completedSteps.includes(step.id);

                    return (
                        <div
                            key={step.id}
                            className={cn(
                                "bg-white rounded-lg shadow border-l-4 transition-all hover:shadow-md cursor-pointer",
                                isCompleted ? "border-l-green-500" : "border-l-blue-500"
                            )}
                            onClick={() => handleStepClick(step.id)}
                        >
                            {/* Card Header */}
                            <div className="p-4 sm:p-6">
                                <div className="flex items-center gap-4">
                                    <div className="flex-shrink-0">
                                        {isCompleted ? (
                                            <CheckCircle2 className="h-6 w-6 text-green-500" />
                                        ) : (
                                            <Circle className="h-6 w-6 text-blue-500" />
                                        )}
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <h3 className="text-base sm:text-lg font-semibold text-gray-900">
                                            {index + 1}. {step.title}
                                        </h3>
                                        {isCompleted && (
                                            <p className="text-sm text-green-600 mt-1">
                                                ✓ Completed
                                            </p>
                                        )}
                                    </div>
                                    <div className="text-sm text-blue-600 hover:underline flex-shrink-0">
                                        {isCompleted ? "View / Edit" : "Complete Now"}
                                    </div>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>

            {/* Note Section */}
            <div className="mt-8 p-4 sm:p-6 bg-blue-50 rounded-lg border border-blue-200">
                <p className="text-sm text-blue-800">
                    <strong>Note:</strong> You need to complete all 6 steps to access
                    your dashboard and start managing payroll.
                </p>
            </div>

            {/* Progress Indicator */}
            <div className="mt-6 p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-gray-700">
                        Progress: {completedSteps.length} of {steps.length} steps completed
                    </span>
                    <span className="text-sm font-medium text-gray-700">
                        {Math.round((completedSteps.length / steps.length) * 100)}%
                    </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2.5">
                    <div
                        className="bg-blue-600 h-2.5 rounded-full transition-all duration-300"
                        style={{
                            width: `${(completedSteps.length / steps.length) * 100}%`,
                        }}
                    ></div>
                </div>
                {completedSteps.length === steps.length && (
                    <p className="text-sm text-green-600 font-medium mt-2 text-center">
                         All steps completed! Redirecting to dashboard...
                    </p>
                )}
            </div>
        </div>
    );
}