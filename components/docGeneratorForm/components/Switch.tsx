import React from 'react';
import { SwitchProps } from '../types';

export const Switch: React.FC<SwitchProps> = ({ value, onChange, disabled = false }) => {
    return (
        <div className="flex items-center space-x-4">
            <button
                onClick={() => !disabled && onChange(true)}
                disabled={disabled}
                className={`px-4 py-2 rounded-lg transition-colors ${
                    value === true
                        ? 'bg-blue-500 text-white'
                        : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                } ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`}
            >
                Oui
            </button>
            <button
                onClick={() => !disabled && onChange(false)}
                disabled={disabled}
                className={`px-4 py-2 rounded-lg transition-colors ${
                    value === false
                        ? 'bg-yellow-500 text-white'
                        : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                } ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`}
            >
                Non
            </button>
        </div>
    );
};
