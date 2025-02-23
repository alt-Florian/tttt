import React from 'react';

interface VersionProps {
    versionA: string;
    versionB: string;
    selectedVersion?: 'A' | 'B'; // Nouvelle prop pour la sélection
}

const VersionComparator: React.FC<VersionProps> = ({ versionA, versionB, selectedVersion }) => {
    return (
        <div className="flex flex-col border border-gray-200 rounded overflow-hidden bg-white shadow-sm">
            <div className="w-full">
                <div className="bg-emerald-50 text-emerald-700 px-3 py-1.5 border-b border-emerald-100 text-[10px] font-medium">
                    &lt;&lt;&lt;&lt;&lt;&lt; Version: Oui
                </div>
                <div 
                    className={`bg-gray-50 px-3 py-2 text-xs leading-relaxed text-gray-600 whitespace-pre-wrap overflow-auto border-b border-gray-100
                        [&_p]:mb-2 [&_p:last-child]:mb-0 [&_h3]:text-sm [&_h3]:font-medium [&_h3]:mb-2
                        ${selectedVersion === 'B' ? 'line-through opacity-50' : ''}
                        ${selectedVersion === 'A' ? 'bg-green-50' : ''}`}
                    dangerouslySetInnerHTML={{ __html: versionA }}
                />
                <div className="bg-gray-50 text-gray-400 text-center py-0.5 text-[10px] border-y border-gray-100">
                    •••
                </div>
                <div 
                    className={`bg-gray-50 px-3 py-2 text-xs leading-relaxed text-gray-600 whitespace-pre-wrap overflow-auto border-b border-gray-100
                        [&_p]:mb-2 [&_p:last-child]:mb-0 [&_h3]:text-sm [&_h3]:font-medium [&_h3]:mb-2
                        ${selectedVersion === 'A' ? 'line-through opacity-50' : ''}
                        ${selectedVersion === 'B' ? 'bg-green-50' : ''}`}
                    dangerouslySetInnerHTML={{ __html: versionB }}
                />
                <div className="bg-blue-50 text-blue-700 px-3 py-1.5 border-b border-blue-100 text-[10px] font-medium">
                    &gt;&gt;&gt;&gt;&gt;&gt; Version: Non
                </div>
            </div>
        </div>
    );
};

export default VersionComparator;
