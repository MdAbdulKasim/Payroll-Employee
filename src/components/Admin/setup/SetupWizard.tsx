"use client";

import { useState, useEffect } from "react";
import { CheckCircle2, Circle } from "lucide-react";
import { useRouter } from "next/navigation";
import dynamic from "next/dynamic";

// Import step components
// Note: Adjust these import paths based on your project structure
const OrganizationDetails = dynamic(() => import("@/components/Admin/setup/OrganisationDetails"), {
    ssr: false,
});
const TaxDetails = dynamic(() => import("@/components/Admin/setup/Taxdetails"), { ssr: false });
const SetupConfiguration = dynamic(() => import("@/components/Admin/setup/Setupconfiguration"), {
    ssr: false,
});
const StatutoryComponents = dynamic(() => import("@/components/Admin/setup/Satuarycomponents"), {
    ssr: false,
});
const SalaryComponents = dynamic(() => import("@/components/Admin/setup/Salarycomponents"), {
    ssr: false,
}); 
const AddEmployees = dynamic(() => import("@/components/Admin/setup/AddEmployee"), { ssr: false });
const PriorPayroll = dynamic(() => import("@/components/Admin/setup/PriorPayroll"), { ssr: false });

// Define step type
type StepId =
    | "organization-details"
    | "tax-details"
    | "setup-configuration"
    | "statutory-components"
    | "salary-components"
    | "add-employees"
    | "prior-payroll";

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
    {
        id: "prior-payroll",
        title: "Configure Prior Payroll",
        component: PriorPayroll,
    },
];

export default function SetupWizard() {
    const router = useRouter();
    const [completedSteps, setCompletedSteps] = useState<StepId[]>([]);
    const [expandedStep, setExpandedStep] = useState<StepId | null>(
        "organization-details"
    );

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
                    setCompletedSteps(JSON.parse(saved));
                } catch (error) {
                    console.error("Error parsing completed steps:", error);
                }
            }
        };

        // Poll for changes every 500ms (since localStorage events don't fire in same tab)
        const interval = setInterval(handleStorageChange, 500);

        return () => clearInterval(interval);
    }, []);

    // Redirect to dashboard when all steps are completed
    useEffect(() => {
        if (completedSteps.length === steps.length) {
            setTimeout(() => {
                router.push("/dashboard");
            }, 1500);
        }
    }, [completedSteps, router]);

    // Auto-expand next step when a step is completed
    useEffect(() => {
        const currentIndex = steps.findIndex((s) => s.id === expandedStep);
        if (currentIndex !== -1 && currentIndex < steps.length - 1) {
            const currentStepCompleted = completedSteps.includes(
                steps[currentIndex].id
            );
            if (currentStepCompleted) {
                const nextStep = steps[currentIndex + 1];
                const nextStepCompleted = completedSteps.includes(nextStep.id);
                if (!nextStepCompleted) {
                    setExpandedStep(nextStep.id);
                }
            }
        }
    }, [completedSteps, expandedStep]);

    const handleToggleStep = (stepId: StepId) => {
        setExpandedStep(expandedStep === stepId ? null : stepId);
    };

    const handleStepComplete = (stepId: StepId) => {
        if (!completedSteps.includes(stepId)) {
            setCompletedSteps([...completedSteps, stepId]);
        }
    };

    // Helper function to combine class names
    const cn = (...classes: (string | boolean | undefined)[]) => {
        return classes.filter(Boolean).join(" ");
    };

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
                    const StepComponent = step.component;
                    const isCompleted = completedSteps.includes(step.id);
                    const isExpanded = expandedStep === step.id;

                    return (
                        <div
                            key={step.id}
                            className={cn(
                                "bg-white rounded-lg shadow border-l-4 transition-all",
                                isCompleted ? "border-l-green-500" : "border-l-blue-500"
                            )}
                        >
                            {/* Card Header */}
                            <div
                                className="p-4 sm:p-6 cursor-pointer hover:bg-gray-50 transition-colors"
                                onClick={() => handleToggleStep(step.id)}
                            >
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
                                        {isExpanded
                                            ? "Collapse"
                                            : isCompleted
                                                ? "View"
                                                : "Complete Now"}
                                    </div>
                                </div>
                            </div>

                            {/* Card Content */}
                            {isExpanded && (
                                <div className="px-4 sm:px-6 pb-6 pt-0">
                                    <div className="border-t pt-6">
                                        <StepComponent
                                            onComplete={() => handleStepComplete(step.id)}
                                        />
                                    </div>
                                </div>
                            )}
                        </div>
                    );
                })}
            </div>

            {/* Note Section */}
            <div className="mt-8 p-4 sm:p-6 bg-blue-50 rounded-lg border border-blue-200">
                <p className="text-sm text-blue-800">
                    <strong>Note:</strong> You need to complete all 7 steps to access
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
                        🎉 All steps completed! Redirecting to dashboard...
                    </p>
                )}
            </div>
        </div>
    );
}