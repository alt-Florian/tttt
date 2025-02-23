import useStepperStore from "@stores/stepper.store";
import React, { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

export const StepsProgress: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { getSteps, setNavigate, initializeFromUrl } = useStepperStore();
  const steps = getSteps();

  useEffect(() => {
    // Initialiser le navigate
    setNavigate(navigate);

    // Initialiser l'étape courante basée sur l'URL
    initializeFromUrl(location.pathname);
  }, [navigate, location.pathname, setNavigate, initializeFromUrl]);

  return (
    <nav aria-label="Progress">
      <ol role="list" className="flex items-center">
        {steps.map((step, stepIdx) => (
          <li
            key={step.name}
            className={classNames(
              stepIdx !== steps.length - 1 ? "pr-8 sm:pr-20" : "",
              "relative"
            )}
          >
            {step.status === "complete" ? (
              <>
                <div
                  aria-hidden="true"
                  className="absolute inset-0 flex items-center"
                >
                  <div className="h-0.5 w-full bg-indigo-600" />
                </div>
                <div className="relative flex h-8 w-8 items-center justify-center rounded-full bg-indigo-600 text-white font-bold">
                  {stepIdx + 1}
                  <span className="sr-only">{step.name}</span>
                </div>
              </>
            ) : step.status === "current" ? (
              <>
                <div
                  aria-hidden="true"
                  className="absolute inset-0 flex items-center"
                >
                  <div className="h-0.5 w-full bg-gray-200" />
                </div>
                <div
                  aria-current="step"
                  className="relative flex h-8 w-8 items-center justify-center rounded-full border-2 border-indigo-600 bg-white font-bold text-indigo-600"
                >
                  {stepIdx + 1}
                  <span className="sr-only">{step.name}</span>
                </div>
              </>
            ) : (
              <>
                <div
                  aria-hidden="true"
                  className="absolute inset-0 flex items-center"
                >
                  <div className="h-0.5 w-full bg-gray-200" />
                </div>
                <div className="group relative flex h-8 w-8 items-center justify-center rounded-full border-2 border-gray-300 bg-white font-bold text-gray-400">
                  {stepIdx + 1}
                  <span className="sr-only">{step.name}</span>
                </div>
              </>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
};
