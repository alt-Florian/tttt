import React, { useState } from 'react';
import { PlayIcon, PauseIcon, StopIcon, BuildingOfficeIcon, MinusIcon, ArrowsPointingOutIcon } from '@heroicons/react/20/solid';
import { Link, NavLink} from 'react-router-dom';

interface CardTimerProps {
    title: string;
    companyName: string;
    missionId: string | null;
    time: string;
    icon: React.ReactNode;
    isPaused: boolean;
    onStart: () => void;
    onPause: () => void;
    onStop: () => void;
}

export const CardTimer: React.FC<CardTimerProps> = ({
    title,
    companyName,
    missionId,
    time,
    icon,
    isPaused,
    onStart,
    onPause,
    onStop,
}) => {
    const [isMinimized, setIsMinimized] = useState(false);

    const iconSize = isMinimized ? "h-4 w-4" : "h-5 w-5";
    const buttonPadding = isMinimized ? "p-1.5" : "p-2";

    const truncateText = (text: string, maxLength: number): string => {
        if (text.length <= maxLength) return text;

        const truncated = text.substring(0, maxLength);
        const lastSpace = truncated.lastIndexOf(' ');

        if (lastSpace === -1) return truncated + '...';

        return text.substring(0, lastSpace) + '...';
    }

    return (
        <div className={`w-80 rounded-xl bg-black text-white ${isMinimized ? 'p-2 h-12' : 'p-4 h-40'} shadow-lg relative`}>
            {!isMinimized && (
                <>
                    <button
                        onClick={() => setIsMinimized(true)}
                        className="absolute top-2 right-2 rounded-full bg-gray-600 p-1.5 flex items-center justify-center"
                        aria-label="Réduire"
                    >
                        <MinusIcon className="h-4 w-4 text-white" />
                    </button>

                    <div>
                        <h4 className="text-xs font-bold uppercase tracking-wider">Tâche en cours</h4>
                        <NavLink
                            to={`/mission/${missionId}`}
                            className="underline underline-offset-2"
                        >
                            <p className="mt-2 text-sm text-gray-300 line-clamp-2">{title}</p>
                        </NavLink>
                        <div className="flex items-center space-x-2 mt-1">
                            <div className="h-6 w-6 rounded-full bg-gray-600 flex items-center justify-center text-white font-bold">
                                <span className="text-xs">{icon}</span>
                            </div>
                            <span className="text-xs">{truncateText(companyName, 40)}</span>
                        </div>
                    </div>
                </>
            )}

            <div className={`flex items-center ${isMinimized ? 'justify-center' : 'justify-end mt-2'} space-x-4`}>
                {isMinimized && (
                    <button
                        onClick={() => setIsMinimized(false)}
                        className={`rounded-full bg-gray-600 ${buttonPadding} flex items-center justify-center`}
                        aria-label="Agrandir"
                    >
                        <ArrowsPointingOutIcon className={`${iconSize} text-white`} />
                    </button>
                )}
                <span className={`${isMinimized ? 'text-xl' : 'text-2xl'} font-semibold`}>{time}</span>

                {isPaused ? (
                    <button
                        onClick={onStart}
                        className={`rounded-full bg-white ${buttonPadding} flex items-center justify-center`}
                        aria-label="Démarrer"
                    >
                        <PlayIcon className={`${iconSize} text-black`} />
                    </button>
                ) : (
                    <button
                        onClick={onPause}
                        className={`rounded-full bg-red-600 ${buttonPadding} flex items-center justify-center`}
                        aria-label="Pause"
                    >
                        <PauseIcon className={`${iconSize} text-white`} />
                    </button>
                )}

                <button
                    onClick={onStop}
                    className={`rounded-full bg-gray-300 ${buttonPadding} flex items-center justify-center border border-white`}
                    aria-label="Arrêter"
                >
                    <StopIcon className={`${iconSize} text-black`} />
                </button>
            </div>
        </div>
    );
};

interface CardResumeTaskProps {
    onResume: () => void;
    onClose: () => void;
    missionName: string | null;
    missionId: string | null;
    taskName: string | undefined;
}

export const CardResumeTask: React.FC<CardResumeTaskProps> = ({
    onResume,
    onClose,
    missionName,
    missionId,
    taskName
}) => {
    return (
        <div className="w-80 h-40 rounded-xl bg-black text-white p-4 flex flex-col justify-center items-center shadow-lg">
            <p className="text-center text-sm font-semibold mb-2">
                Voulez-vous reprendre la tâche{" "}
                <span className="text-indigo-200">
                    <Link
                        to={`/mission/${missionId}`}
                        className="text-indigo-300 underline hover:text-indigo-100"
                    >
                        {taskName}
                    </Link >
                </span>
                {" "} de la mission {" "}
                <Link
                    to={`/mission/${missionId}`}
                    className="text-indigo-300 underline hover:text-indigo-100"
                >
                    {missionName}
                </Link >
                {" "}?
            </p>
            <div className="flex space-x-4 mt-4">
                <button
                    onClick={onResume}
                    className="text-white underline font-medium hover:text-gray-300"
                >
                    Oui, reprendre
                </button>
                <button
                    onClick={onClose}
                    className="text-white underline font-medium hover:text-gray-300"
                >
                    Non, fermer
                </button>
            </div>
        </div>
    );
};


export const CardTimerShow: React.FC = () => {

    return (
        <div className="fixed bottom-4 right-4">
            <CardTimer
                title="Tâche en cours"
                companyName="LITHEK CONSEIL"
                time="05:31"
                missionId={null} 
                icon={<BuildingOfficeIcon className="h-4 w-4 text-white" />}
                onStop={() => console.log("Mise en stop")}
                onPause={() => console.log("Mise en pause")}
                onStart={() => console.log("Reprise du timer")}
                isPaused={false}            />
        </div>
    );
}