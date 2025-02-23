import { Transition } from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/20/solid";
import { DialogBoxInterface } from "@interfaces/boxes/DialogBox.interface";

import { dialogService } from "@services/Dialog.service";
import { useDialogBoxStore } from "@stores/DialogBox.store";
import { useEffect, useRef, useState } from "react";

export const DialogBox: React.FC<DialogBoxInterface> = ({
  title,
  content,
  icon,
  onClick,
  show,
  type,
}) => {
  const [progress, setProgress] = useState(100);
  const [isHovered, setIsHovered] = useState(false);
  const progressInterval = useRef<number | null>(null);
  const TOTAL_TIME = 3000; // 3 seconds
  const UPDATE_INTERVAL = 10; // Update every 10ms for smooth animation
  useEffect(() => {
    if (show && !isHovered) {
      startTimer();
    }
    return () => {
      if (progressInterval.current) {
        clearInterval(progressInterval.current);
      }
    };
  }, [show, isHovered]);

  const startTimer = () => {
    setProgress(100);
    if (progressInterval.current) {
      clearInterval(progressInterval.current);
    }

    const intervalId = window.setInterval(() => {
      setProgress((prev) => {
        const newProgress = prev - (UPDATE_INTERVAL / TOTAL_TIME) * 100;
        if (newProgress <= 0) {
          clearInterval(intervalId);
          onClick?.();
          return 0;
        }
        return newProgress;
      });
    }, UPDATE_INTERVAL);

    progressInterval.current = intervalId;
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
    if (progressInterval.current) {
      clearInterval(progressInterval.current);
    }
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    startTimer();
  };

  return (
    <div
      aria-live="assertive"
      className="pointer-events-none fixed inset-0 flex items-end px-4 py-6 sm:items-start sm:p-6"
    >
      <div className="flex w-full flex-col items-center space-y-4 sm:items-end">
        <Transition
          show={show}
          enter="transition ease-out duration-300"
          enterFrom="transform opacity-0 scale-95"
          enterTo="transform opacity-100 scale-100"
          leave="transition ease-in duration-100"
          leaveFrom="transform opacity-100 scale-100"
          leaveTo="transform opacity-0 scale-95"
        >
          <div
            className="pointer-events-auto w-full max-w-sm overflow-hidden rounded-lg bg-white shadow-lg ring-1 ring-black/5 relative"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            onClick={onClick}
          >
            <div className="p-4">
              <div className="flex items-start">
                <div aria-hidden="true" className="shrink-0">
                  {icon}
                </div>
                <div className="ml-3 w-0 flex-1 pt-0.5">
                  <p className="text-sm font-medium text-gray-900">{title} !</p>
                  <p className="mt-1 text-sm text-gray-500">{content}</p>
                </div>
                <div className="ml-4 flex shrink-0">
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      onClick?.();
                    }}
                    className="inline-flex rounded-md bg-white text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                  >
                    <XMarkIcon className="size-5" />
                  </button>
                </div>
              </div>
            </div>
            {/* Progress bar */}
            <div className="absolute bottom-0 left-0 h-1 bg-gray-200 w-full">
              <div
                className="h-full transition-all duration-75 ease-linear"
                style={{
                  width: `${progress}%`,
                  backgroundColor: `${type == "error" ? "#f87171" : "#4ade80"}`,
                }}
              />
            </div>
          </div>
        </Transition>
      </div>
    </div>
  );
};

export const DialogBoxLayout: React.FC = () => {
  //const { dialogBox, hideDialogBox } = useContext(DialogBoxContext);
  const { dialogBox, hideDialogBox } = useDialogBoxStore();

  return (
    <>
      {dialogBox && (
        <DialogBox
          {...dialogBox}
          onClick={() => {
            hideDialogBox();
          }}
        />
      )}
    </>
  );
};

export const DialogBoxShow: React.FC = () => {
  const { showDialogBox, hideDialogBox } = useDialogBoxStore();

  const openDialogBox = (): void => {
    showDialogBox({
      ...dialogService.errorMessage(),
      onClick: hideDialogBox,
    });
  };

  return (
    <>
      <button
        onClick={openDialogBox}
        className="inline-flex items-center gap-x-1.5 rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white"
      >
        Mon bouton pour la boite de dialogue
      </button>
    </>
  );
};
