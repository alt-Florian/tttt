import { ReactNode } from 'react';

export interface FormProps<T extends FormOptions = FormOptions> {
    onSubmit: (options: T) => void;
    questions: Question[];
    initialOptions: T;
}

export interface FormOptions {
    [key: string]: any;
}

export interface Question {
    id: string;
    label: string;
    help?: string;
    component: (options: FormOptions, updateField: (field: string, value: any) => void) => ReactNode;
    condition?: (options: FormOptions) => boolean;
    parentId?: string;
    versionContent?: {
        versionA: string;
        versionB: string;
    };
}

export interface SwitchProps {
    value: boolean | null;
    onChange: (value: boolean) => void;
    disabled?: boolean;
}

export interface RadioGroupProps {
    value: string;
    onChange: (value: string) => void;
    options: { value: string; label: string }[];
    disabled?: boolean;
}

export interface AccordionProps {
    children: ReactNode;
}

export interface AccordionItemProps {
    title: string;
    children: ReactNode;
}
