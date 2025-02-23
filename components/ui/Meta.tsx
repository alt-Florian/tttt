import React from 'react';
import { BriefcaseIcon, MapPinIcon } from '@heroicons/react/20/solid';
import { Badge } from '@components/ui/Badge';

interface MetaItem {
    icon?: React.ReactNode;
    text?: string;
    badge?: Badge;
}

interface MetaProps {
    items: MetaItem[];
}

export const Meta: React.FC<MetaProps> = ({ items }) => {
    return (
        <div className="mt-1 flex flex-col sm:mt-0 sm:flex-row sm:flex-wrap sm:space-x-6">
            {items.map((item: MetaItem, index: number) => (
                <div key={index} className="mt-2 flex items-center text-sm text-gray-500">
                    {item.icon && <span className="mr-1.5 size-5 shrink-0 text-gray-400">{item.icon}</span>}
                    {item.text && <span>{item.text}</span>}
                    {item.badge && (
                        <span className="ml-2">
                            <Badge
                                text={item.badge.text}
                                bgColor={item.badge.bgColor}
                                textColor={item.badge.textColor}
                                ringColor={item.badge.ringColor}
                            />
                        </span>
                    )}
                </div>
            ))}
        </div>
    );
};

export const MetaListShow: React.FC = () => {
    const MetaItems: MetaItem[] = [
        {
            icon: <BriefcaseIcon aria-hidden="true" />,
            text: 'Full-time',
            badge: undefined
        },
        {
            icon: <MapPinIcon aria-hidden="true" />,
            text: 'Remote',
            badge: undefined
        },
        {
            icon: undefined,
            text: undefined,
            badge: { text: 'Client' },
        },
        {
            icon: undefined,
            text: undefined,
            badge: { text: 'Closing soon', bgColor: 'bg-red-100', textColor: 'text-red-800', ringColor: 'ring-red-500/10' },
        },
    ];

    return (
        <div className="p-4">
            <Meta items={MetaItems} />
        </div>
    );
};
