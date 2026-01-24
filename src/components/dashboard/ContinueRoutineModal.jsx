import { useState } from "react";

const amRoutine = [
  {
    name: "Gentle Cleanser",
    completed: true,
    instructions:
      "Wet your face with lukewarm water and massage cleanser in circular motions for 60 seconds.",
    time: "2 min",
  },
  {
    name: "Vitamin C Serum",
    completed: true,
    instructions:
      "Apply 3-4 drops to clean skin. Pat gently until absorbed. Wait 1 minute before next step.",
    time: "2 min",
  },
  {
    name: "Moisturizer",
    completed: true,
    instructions:
      "Apply a nickel-sized amount to face and neck. Massage in upward motions.",
    time: "2 min",
  },
  {
    name: "Sunscreen SPF 50",
    completed: false,
    instructions:
      "Apply liberally to all exposed skin. Don't forget your neck and ears! Reapply every 2 hours.",
    time: "3 min",
  },
];

const pmRoutine = [
  {
    name: "Double Cleanse",
    completed: true,
    instructions:
      "First use oil cleanser to remove makeup/sunscreen. Follow with water-based cleanser.",
    time: "4 min",
  },
  {
    name: "Toner",
    completed: true,
    instructions:
      "Apply with cotton pad or pat directly onto skin. Helps balance pH and prep for serums.",
    time: "1 min",
  },
  {
    name: "Niacinamide Serum",
    completed: false,
    instructions:
      "Apply 3-4 drops to skin. This helps with oil control and brightening. Wait 1 minute.",
    time: "2 min",
  },
  {
    name: "Night Cream",
    completed: false,
    instructions:
      "Apply generously. Night creams are richer to deeply hydrate while you sleep.",
    time: "2 min",
  },
];

export function ContinueRoutineModal({ isOpen, onClose, routineType }) {
  const routine = routineType === "AM" ? amRoutine : pmRoutine;
  const [completedSteps, setCompletedSteps] = useState(
    routine.map((step) => step.completed),
  );
  const [currentStep, setCurrentStep] = useState(
    routine.findIndex((step) => !step.completed),
  );

  const handleStepComplete = (index) => {
    const newCompleted = [...completedSteps];
    newCompleted[index] = true;
    setCompletedSteps(newCompleted);

    // Move to next incomplete step
    const nextIncomplete = newCompleted.findIndex(
      (completed, i) => !completed && i > index,
    );
    if (nextIncomplete !== -1) {
      setCurrentStep(nextIncomplete);
    } else {
      // All done!
      setTimeout(() => {
        alert("🎉 Routine complete! Great job staying consistent!");
        onClose();
      }, 500);
    }
  };

  if (!isOpen) return null;

  const totalSteps = routine.length;
  const completedCount = completedSteps.filter(Boolean).length;
  const progressPercentage = (completedCount / totalSteps) * 100;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      ></div>

      <div className="relative bg-white rounded-3xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-[#8b7355] to-[#6d5a43] px-6 py-6 text-white">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-2xl mb-1">{routineType} Routine</h2>
              <p className="text-sm opacity-90">Follow along step by step</p>
            </div>
            <button
              onClick={onClose}
              className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-white/20 transition-colors"
            >
              <svg
                width="20"
                height="20"
                fill="none"
                stroke="white"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            </button>
          </div>

          {/* Progress */}
          <div className="space-y-2">
            <div className="flex items-center justify-between text-sm">
              <span>
                {completedCount} of {totalSteps} completed
              </span>
              <span>{Math.round(progressPercentage)}%</span>
            </div>
            <div className="w-full bg-white/30 rounded-full h-2 overflow-hidden">
              <div
                className="h-full bg-white transition-all duration-500"
                style={{ width: `${progressPercentage}%` }}
              ></div>
            </div>
          </div>
        </div>

        {/* Steps */}
        <div className="overflow-y-auto max-h-[calc(90vh-200px)] p-6">
          <div className="space-y-4">
            {routine.map((step, index) => {
              const isCompleted = completedSteps[index];
              const isCurrent = index === currentStep;

              return (
                <div
                  key={index}
                  className={`border-2 rounded-2xl p-5 transition-all ${
                    isCompleted
                      ? "border-green-200 bg-green-50"
                      : isCurrent
                        ? "border-[#8b7355] bg-[#f8f6f3]"
                        : "border-[#e8e6e3] bg-white opacity-60"
                  }`}
                >
                  <div className="flex items-start gap-4">
                    {/* Step Number/Check */}
                    <div
                      className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 ${
                        isCompleted
                          ? "bg-green-500"
                          : isCurrent
                            ? "bg-[#8b7355]"
                            : "bg-[#e8e6e3]"
                      }`}
                    >
                      {isCompleted ? (
                        <svg
                          width="20"
                          height="20"
                          fill="none"
                          stroke="white"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <polyline points="20 6 9 17 4 12"></polyline>
                        </svg>
                      ) : (
                        <span
                          className={
                            isCompleted || isCurrent
                              ? "text-white"
                              : "text-[#8b7355]"
                          }
                        >
                          {index + 1}
                        </span>
                      )}
                    </div>

                    {/* Step Content */}
                    <div className="flex-1">
                      <div className="flex items-start justify-between mb-2">
                        <h3
                          className={`text-lg ${isCompleted ? "text-green-800" : "text-[#2a2420]"}`}
                        >
                          {step.name}
                        </h3>
                        <span className="text-sm text-[#8b7355] flex items-center gap-1">
                          <svg
                            width="14"
                            height="14"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          >
                            <circle cx="12" cy="12" r="10"></circle>
                            <polyline points="12 6 12 12 16 14"></polyline>
                          </svg>
                          {step.time}
                        </span>
                      </div>

                      <p className="text-sm text-[#5a5450] mb-3">
                        {step.instructions}
                      </p>

                      {!isCompleted && isCurrent && (
                        <button
                          onClick={() => handleStepComplete(index)}
                          className="px-4 py-2 bg-[#8b7355] text-white rounded-lg hover:bg-[#6d5a43] transition-all text-sm"
                        >
                          Mark as Complete ✓
                        </button>
                      )}

                      {isCompleted && (
                        <div className="flex items-center gap-2 text-sm text-green-600">
                          <svg
                            width="16"
                            height="16"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          >
                            <polyline points="20 6 9 17 4 12"></polyline>
                          </svg>
                          Completed
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Footer */}
        <div className="border-t border-[#e8e6e3] px-6 py-4 bg-[#f8f6f3]">
          <button
            onClick={onClose}
            className="w-full px-6 py-3 border-2 border-[#8b7355] text-[#8b7355] rounded-xl hover:bg-[#8b7355] hover:text-white transition-all"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
