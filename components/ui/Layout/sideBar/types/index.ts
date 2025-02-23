import { ComponentType, SVGProps } from 'react';

export interface NavigationItem {
    name: string;
    href: string;
    icon: ComponentType<SVGProps<SVGSVGElement>>;
}

export interface TooltipPosition {
    top: number;
    left: number;
}