import React, { useState } from 'react';

interface ProgressBarProps {
    progress: number;
}

export const ProgressBar: React.FC<ProgressBarProps> = ({ progress }) => {

    const clampedProgress = Math.min(Math.max(progress, 0), 100);

    const getProgressColor = (value: number): string => {
        if (value < 25) return 'bg-red-500';
        if (value < 50) return 'bg-orange-500';
        if (value < 75) return 'bg-yellow-500';
        return 'bg-green-500';
      };

    return (
        <>
            <div className="flex items-center space-x-2">

                <div className="relative h-4 w-full rounded-full bg-gray-300">
                    <div
                        style={{ width: `${clampedProgress}%` }}
                        className={`absolute left-0 top-0 h-full rounded-full ${getProgressColor(clampedProgress)}`}
                    />
                </div>
                <span className="text-sm font-medium text-black">{clampedProgress}%</span>
            </div>
        </>
    );
};

export const ProgressBarShow: React.FC = () => {
    const [progress, setProgress] = useState<number>(32);
    return (
        <div className="p-4 space-y-4">
            <div className="w-48"> 
                <ProgressBar progress={progress} />
            </div>
            <div className="flex space-x-4">

                <button
                    className="rounded bg-red-500 px-4 py-2 text-white hover:bg-red-600"
                    onClick={() => setProgress((prev) => Math.max(prev - 5, 0))}
                >
                    Reduire
                </button>

                <button
                    className="rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600"
                    onClick={() => setProgress((prev) => Math.min(prev + 5, 100))}
                >
                    Augmenter
                </button>
            </div>
        </div>
    );
};
