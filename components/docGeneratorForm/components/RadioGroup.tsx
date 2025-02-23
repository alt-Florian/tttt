import React from 'react';
import { RadioGroupProps } from '../types';

export const RadioGroup: React.FC<RadioGroupProps> = ({ value, onChange, options, disabled = false }) => {
    return (
        <div className="flex items-center space-x-4">
            {options.map(option => (
                <button
                    key={option.value}
                    onClick={() => !disabled && onChange(option.value)}
                    disabled={disabled}
                    className={`px-4 py-2 rounded-lg transition-colors ${
                        value === option.value
                            ? 'bg-blue-500 text-white'
                            : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                    } ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`}
                >
                    {option.label}
                </button>
            ))}
        </div>
    );
};
