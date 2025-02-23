import React, { useState } from 'react';
import { AccordionProps, AccordionItemProps } from '../types';

export const Accordion: React.FC<AccordionProps> = ({ children }) => (
    <div className="mt-4">
        {children}
    </div>
);

export const AccordionItem: React.FC<AccordionItemProps> = ({ title, children }) => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className="border rounded">
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="w-full p-4 text-left flex justify-between items-center"
            >
                <span>{title}</span>
                <span>{isOpen ? '−' : '+'}</span>
            </button>
            {isOpen && <div className="p-4 border-t">{children}</div>}
        </div>
    );
};
