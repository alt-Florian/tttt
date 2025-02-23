interface Step {
  name: string;
  status: "complete" | "current" | "upcoming";
}

interface StepperState {
  steps: Step[];
  currentStep: number;
  baseUrl: string;
  navigate: NavigateFunction | null;

  // Actions
  setCurrentStep: (step: number) => void;
  getCurrentStep: () => Step;
  getCurrentStepUrl: () => string;
  getStepUrl: (stepIndex: number) => string;
  getSteps: () => Step[];
  updateStepStatus: (stepIndex: number, status: Step["status"]) => void;
  nextStep: () => void;
  previousStep: () => void;
  isFirstStep: () => boolean;
  isLastStep: () => boolean;
  reset: () => void;
  // Nouvelle fonction pour initialiser depuis l'URL
  initializeFromUrl: (pathname: string) => void;
  setNavigate: (navigate: NavigateFunction) => void;
}

import { create } from "zustand";
import { NavigateFunction } from "react-router-dom";

const initialSteps: Step[] = [
  { name: "Step 1", status: "current" },
  { name: "Step 2", status: "upcoming" },
  { name: "Step 3", status: "upcoming" },
];

const useStepperStore = create<StepperState>((set, get) => ({
  steps: initialSteps,
  currentStep: 0,
  baseUrl: "/letter-mission/create",
  navigate: null, // Initialize navigate as null

  // Add setNavigate function
  setNavigate: (navigate: NavigateFunction) => {
    set({ navigate });
  },

  // Nouvelle fonction pour initialiser depuis l'URL
  initializeFromUrl: (pathname: string) => {
    const match = pathname.match(/step(\d+)/);
    if (match) {
      const stepNumber = parseInt(match[1], 10) - 1; // Convertit en index basé sur 0
      if (stepNumber >= 0 && stepNumber < initialSteps.length) {
        get().setCurrentStep(stepNumber);
      }
    }
  },

  setCurrentStep: (step: number) => {
    const { steps } = get();
    const newSteps = steps.map((s, index) => ({
      ...s,
      status:
        index === step ? "current" : index < step ? "complete" : "upcoming",
    }));

    set({
      currentStep: step,
      steps: newSteps as Step[],
    });
  },

  getCurrentStep: () => {
    const { steps, currentStep } = get();
    return steps[currentStep];
  },

  getCurrentStepUrl: () => {
    const { currentStep, baseUrl } = get();
    return `${baseUrl}/step${currentStep + 1}`;
  },

  getStepUrl: (stepIndex: number) => {
    const { baseUrl } = get();
    return `${baseUrl}/step${stepIndex + 1}`;
  },

  getSteps: () => get().steps,

  updateStepStatus: (stepIndex: number, status: Step["status"]) => {
    const { steps } = get();
    const newSteps = [...steps];
    newSteps[stepIndex] = { ...newSteps[stepIndex], status };
    set({ steps: newSteps });
  },

  nextStep: () => {
    const { currentStep, steps, navigate } = get();
    if (currentStep < steps.length - 1) {
      const nextStepNumber = currentStep + 1;
      get().setCurrentStep(nextStepNumber);
      if (navigate) {
        navigate(`/letter-mission/create/step${nextStepNumber + 1}`);
      }
    }
  },

  previousStep: () => {
    const { currentStep, navigate } = get();
    if (currentStep > 0) {
      const prevStepNumber = currentStep - 1;
      get().setCurrentStep(prevStepNumber);
      if (navigate) {
        navigate(`/letter-mission/create/step${prevStepNumber + 1}`);
      }
    }
  },

  isFirstStep: () => get().currentStep === 0,

  isLastStep: () => {
    const { currentStep, steps } = get();
    return currentStep === steps.length - 1;
  },

  reset: () => {
    set({
      steps: initialSteps,
      currentStep: 0,
    });
  },
}));

export default useStepperStore;
