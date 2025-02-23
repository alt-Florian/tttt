import { Paragraph, TextRun } from "docx";

export const getVersionText = (condition: boolean, v1Text: string, v2Text: string): Paragraph[] => {
    return [
        new Paragraph({
            children: [
                new TextRun(condition ? v1Text : v2Text),
            ],
        }),
    ];
};

export const createHeading = (text: string): Paragraph => {
    return new Paragraph({
        children: [
            new TextRun({
                text,
                bold: true,
                size: 28,
            }),
        ],
    });
};

export const createNormalText = (text: string): Paragraph => {
    return new Paragraph({
        children: [
            new TextRun(text),
        ],
    });
};
