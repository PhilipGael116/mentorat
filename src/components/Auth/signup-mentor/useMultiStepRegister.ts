import { type ReactElement, useState } from "react";

export function useMultiStepRegister(steps: ReactElement[]) {
    const [currentStepIndex, setCurrentStepIndex] = useState(0);

    function next() {
        if (currentStepIndex >= steps.length - 1) return;
        setCurrentStepIndex(prev => prev + 1);
    }

    function prev() {
        if (currentStepIndex <= 0) return;
        setCurrentStepIndex(prev => prev - 1);
    }

    function goTo(index: number) {
        if (index < 0 || index >= steps.length) return;
        setCurrentStepIndex(index);
    }

    return {
        currentStepIndex,
        step: steps[currentStepIndex],
        steps,
        isFirstStep: currentStepIndex === 0,
        isLastStep: currentStepIndex === steps.length - 1,
        goTo,
        next,
        prev
    }
}