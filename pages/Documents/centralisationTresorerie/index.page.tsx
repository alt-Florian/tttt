import { createHeading, createNormalText, getVersionText } from '@components/docGeneratorForm/components/docx';
import SelectCorporateCustomers from '@components/SelectCorporateCustomers';
import { AlignmentType, Document, HeadingLevel, Packer, Paragraph, TextRun } from 'docx';
import { saveAs } from 'file-saver';
import React, { useState } from 'react';
import { DocGeneratorForm, FormOptions, Question, Switch } from '../../../components/docGeneratorForm';

interface ConventionOptions extends FormOptions {
    isControlledCompanies: boolean | null;
    hasPrealableResolution: boolean | null;
    isSpecificRate: boolean | null;
    isFixedTerm: boolean | null;
    specificRate?: string;
    cddDuration?: string;
    hasSpecificAccount: boolean | null;
    specificAccountInfo?: string;
    specificAccountInfoBankName: string;
    hasDelegation: boolean | null;
    hasSubrogation: boolean | null;
}

interface Party {
    id: string;
    address: string;
    kbis: string;
    representative: string;
}

interface ConventionData {
    centralisatrice: Party;
    filiales: Party[];
    lieuSignature: string;
    dateSignature: string;
    nbExemplaires: number;
    options: ConventionOptions;
}

const initialOptions: ConventionOptions = {
    isControlledCompanies: null,
    hasPrealableResolution: null,
    isSpecificRate: null,
    isFixedTerm: null,
    specificRate: '',
    cddDuration: '',
    hasSpecificAccount: null,
    specificAccountInfo: '',
    specificAccountInfoBankName: '',
    hasDelegation: null,
    hasSubrogation: null,
};



const Questions: Question[] = [
    {
        id: 'centralisatrice',
        label: 'Quelle est l\'entreprise centralisatice ',
        component: (_options, updateField) => (
            <SelectCorporateCustomers
                onChange={(value) => updateField('centralisatrice', value)}
                fullCustomerReturn
            />
        )
    },
    {
        id: 'isControlledCompanies',
        label: 'Les filiales sont-elles contrôlées au sens du Code de Commerce ?',
        help: 'Cette information détermine si les sociétés du groupe sont soumises au contrôle défini par l\'article L.233-3 du Code de commerce.',
        component: (options, updateField) => (
            <Switch
                value={options.isControlledCompanies}
                onChange={(value) => updateField('isControlledCompanies', value)}
            />
        ),
        versionContent: {
            versionA: "<p>au sens de l'article L.233-3 du Code de commerce</p>",
            versionB: "<p>sous le contrôle direct ou indirect, de fait ou de droit, de la Société Centralisatrice</p>"
        }
    },
    {
        id: 'hasPrealableResolution',
        label: 'La convention a-t-elle été préalablement approuvée ?',
        help: 'Indique si une résolution préalable a été adoptée concernant cette convention.',
        component: (options, updateField) => (
            <Switch
                value={options.hasPrealableResolution}
                onChange={(value) => updateField('hasPrealableResolution', value)}
            />
        ),
        versionContent: {
            versionA: "<p>chacune d'elles déclare que la présente convention a été préalablement approuvée par ses organes sociaux compétents,</p>",
            versionB: "<p>chacune d'elles déclare, par son représentant, prendre acte que la présente convention est susceptible de constituer une convention réglementée pouvant être contrôlée et approuvée par ses associés,</p>"
        }
    },
    {
        id: 'hasSpecificAccount',
        label: 'Souhaitez-vous utiliser un compte dédié ?',
        help: 'Un compte dédié permet de gérer séparément les transactions liées à cette convention.',
        component: (options, updateField) => (
            <Switch
                value={options.hasSpecificAccount}
                onChange={(value) => updateField('hasSpecificAccount', value)}
            />
        ),
        versionContent: {
            versionA: "<p>Les sommes ainsi mises à disposition sont versées par les Filiales sur le compte n° … ouvert auprès de ….</p>",
            versionB: ""
        }
    },
    {
        id: 'specificAccountInfo',
        label: 'Informations du compte dédié',
        help: 'Veuillez fournir les informations détaillées du compte qui sera utilisé.',
        component: (options, updateField) => (
            <input
                type="text"
                value={options.specificAccountInfo || ''}
                onChange={(e) => updateField('specificAccountInfo', e.target.value)}
                className="w-full p-2 border rounded"
                placeholder="Informations du compte"
            />
        ),
        condition: (options) => options.hasSpecificAccount === true,
        versionContent: {
            versionA: "<p>Les sommes ainsi mises à disposition sont versées par les Filiales sur le compte n° {value} ouvert auprès de ...</p>",
            versionB: ""
        }
    },
    {
        id: 'specificAccountInfoBankName',
        label: 'Informations du nom de la banque',
        help: 'Veuillez fournir le nom de la banque du compte qui sera utilisé.',
        component: (options, updateField) => (
            <input
                type="text"
                value={options.specificAccountInfoBankName || ''}
                onChange={(e) => updateField('specificAccountInfoBankName', e.target.value)}
                className="w-full p-2 border rounded"
                placeholder="Informations du nom de la banque"
            />
        ),
        condition: (options) => options.hasSpecificAccount === true,
        parentId: 'specificAccountInfo',
        versionContent: {
            versionA: "<p>Les sommes ainsi mises à disposition sont versées par les Filiales sur le compte n° {previousValue} ouvert auprès de {value}</p>",
            versionB: ""
        }
    },
    {
        id: 'isSpecificRate',
        label: 'Souhaitez-vous appliquer un taux spécifique ?',
        help: 'Choisissez entre le taux fiscal (basé sur les taux légaux) ou un taux spécifique que vous définirez.',
        component: (options, updateField) => (
            <Switch
                value={options.isSpecificRate}
                onChange={(value) => updateField('isSpecificRate', value)}
            />
        ),
        versionContent: {
            versionA: "<p>au taux annuel de ….</p>",
            versionB: "<p>au taux annuel maximum fiscalement déductible.</p>"
        }
    },
    {
        id: 'specificRate',
        label: 'Quel est le taux spécifique à appliquer ?',
        help: 'Indiquez le taux d\'intérêt personnalisé que vous souhaitez appliquer à cette convention.',
        component: (options, updateField) => (
            <input
                type="text"
                value={options.specificRate || ''}
                onChange={(e) => updateField('specificRate', e.target.value)}
                className="w-full p-2 border rounded"
                placeholder="Ex: 2.5%"
            />
        ),
        condition: (options) => options.isSpecificRate === true,
        versionContent: {
            versionA: "<p>au taux annuel de {value}</p>",
            versionB: "<p>au taux annuel maximum fiscalement déductible.</p>"
        }
    },
    {
        id: 'isFixedTerm',
        label: 'La convention est-elle à durée déterminée ?',
        help: 'Choisissez entre une durée indéterminée (Non) ou déterminée (Oui).',
        component: (options, updateField) => (
            <Switch
                value={options.isFixedTerm}
                onChange={(value) => updateField('isFixedTerm', value)}
            />
        ),
        versionContent: {
            versionA: `<div>
                <p>La présente convention est conclue pour une durée de … à compter des présentes, soit jusqu'au ….</p>
                <p>Ainsi, sous réserve des stipulations de l'Article 6, le remboursement des sommes mises à disposition par une Filiale ou prêtées par la Centralisatrice et/ou le paiement des intérêts et accessoires dus à ce titre ne seront échus qu'à ce terme.</p>
                <p>Réciproquement, chacune des Parties s'engage à payer à cette date l'ensemble des sommes qu'elle pourrait devoir.</p>
            </div>`,
            versionB: `<p>La présente convention est conclue pour une durée indéterminée à compter des présentes.</p><p>Ainsi, sous réserve des stipulations de l'Article 6, le remboursement des sommes mises à disposition par une Filiale ou prêtées par la Centralisatrice et/ ou le paiement des intérêts et accessoires dus à ce titre ne seront échus qu'en cas de résiliation conventionnelle ou unilatérale.</p> <h4><b>[...]</b></h4> <p>Les présentes étant conclues à durée indéterminée, chacune des Parties est libre d'en demander la résiliation sans à devoir justifier sa décision.Toutefois, chacune des Parties s'oblige à notifier aux autres sont intention de résilier avec un préavis de trois (3) mois, à défaut duquel elle ne saurait prétendre au paiement immédiat de l'intégralité des sommes qui lui seraient dues.</p>`
        }
    },
    {
        id: 'cddDuration',
        label: 'Quelle est la durée de la convention ?',
        help: 'Spécifiez la durée exacte de la convention (en années, mois ou jours).',
        component: (options, updateField) => (
            <input
                type="text"
                value={options.cddDuration || ''}
                onChange={(e) => updateField('cddDuration', e.target.value)}
                className="w-full p-2 border rounded"
                placeholder="Ex: 2 ans"
            />
        ),
        condition: (options) => options.isFixedTerm === true,
        versionContent: {
            versionA: `<div>
                <p>La présente convention est conclue pour une durée de {value} à compter des présentes.</p>
                <p>Ainsi, sous réserve des stipulations de l'Article 6, le remboursement des sommes mises à disposition par une Filiale ou prêtées par la Centralisatrice et/ou le paiement des intérêts et accessoires dus à ce titre ne seront échus qu'à ce terme.</p>
                <p>Réciproquement, chacune des Parties s'engage à payer à cette date l'ensemble des sommes qu'elle pourrait devoir.</p>
            </div>`,
            versionB: `<p>La présente convention est conclue pour une durée indéterminée à compter des présentes. Ainsi, sous réserve des stipulations de l'Article 6, le remboursement des sommes mises à disposition par une Filiale ou prêtées par la Centralisatrice et/ ou le paiement des intérêts et accessoires dus à ce titre ne seront échus qu'en cas de résiliation conventionnelle ou unilatérale.</p><h4>[...]</h4><p>Les présentes étant conclues à durée indéterminée, chacune des Parties est libre d'en demander la résiliation sans à devoir justifier sa décision.Toutefois, chacune des Parties s'oblige à notifier aux autres sont intention de résilier avec un préavis de trois (3) mois, à défaut duquel elle ne saurait prétendre au paiement immédiat de l'intégralité des sommes qui lui seraient dues.</p>`
        }
    },
    {
        id: 'hasDelegation',
        label: 'Souhaitez-vous inclure une délégation ?',
        help: 'La délégation permet de transférer certains pouvoirs ou responsabilités à d\'autres parties.',
        component: (options, updateField) => (
            <Switch
                value={options.hasDelegation}
                onChange={(value) => updateField('hasDelegation', value)}
            />
        ),
        versionContent: {
            versionA: `<h3>ARTICLE 7. DELEGATION</h3><p>Conformément aux articles 1336 et suivants du Code civil, si la Centralisatrice est, en application des présentes ou en conséquence de toute autre opération, débitrice envers une des Filiales, elle consent, comme déléguée, à ce que la Filiale, comme délégante, l'oblige envers un tiers délégataire.</p><p>Cette délégation doit être matérialisée par l'acceptation formelle du délégataire</p>`,
            versionB: ""
        }
    },
    {
        id: 'hasSubrogation',
        label: 'Souhaitez-vous inclure une subrogation ?',
        help: 'La subrogation permet le transfert de droits ou de créances à un tiers.',
        component: (options, updateField) => (
            <Switch
                value={options.hasSubrogation}
                onChange={(value) => updateField('hasSubrogation', value)}
            />
        ),
        versionContent: {
            versionA: `
                <h3>ARTICLE 8. SUBROGATION</h3>
                Conformément aux articles 1346 et suivants du Code civil, la Centralisatrice, ayant pour intérêt légitime le règlement des dettes constituées par les Filiales, consent, à la demande d'une d'elles, à la subroger comme débitrice pour le paiement d'un de ses créanciers.
               La créance ainsi payée par la Centralisatrice en lieu et place de la Filiale constitue une somme mise à disposition par cette dernière au sens de l'Article 1.
            `,
            versionB: ""
        }
    }
];

const generateDocx = (data: ConventionData) => {
    const paragraphs: Paragraph[] = [
        createHeading("CONVENTION DE CENTRALISATION DE TRESORERIE ET D'AVANCES RECIPROQUES"),

        // En-tête
        createNormalText("Entre les soussignées :"),

        // Centralisatrice
        ...createPartySection(data.centralisatrice, "Centralisatrice"),
        createNormalText("de première part,"),

        // Filiales
        ...data.filiales.flatMap(filiale => createPartySection(filiale)),
        createNormalText("ci-après dénommée(s) la ou les « Filiale(s) »,"),
        createNormalText("de seconde part,"),

        // Préambule
        createNormalText("ci après individuellement « Partie » et conjointement « Parties »."),
        createHeading("Après avoir exposé CE QUI SUIT :"),

        // Section contrôle des filiales
        ...getVersionText(
            data.options.isControlledCompanies as boolean,
            "au sens du 3. de l'article L511-7 du Code monétaire et financier.",
            "sous le contrôle direct ou indirect, de fait ou de droit, de la Société Centralisatrice et ses dirigeants."
        ),

        // Section résolution préalable
        ...getVersionText(
            data.options.hasPrealableResolution as boolean,
            "chacune d'elles déclare que la présente convention a été préalablement approuvée par ses organes sociaux compétents,",
            "chacune d'elles déclare, par son représentant, prendre acte que la présente convention est susceptible de constituer une convention réglementée pouvant être contrôlée et approuvée par ses associés,"
        ),

        createHeading("Il a été convenu et arrêté ce qui suit :"),

        // Section compte dédié
        ...(data.options.hasSpecificAccount ? [
            createNormalText(`Les sommes ainsi mises à disposition sont versées par les Filiales sur le compte ${data.options.specificAccountInfo}`),
        ] : []),

        // Section taux d'intérêt
        ...getVersionText(
            data.options.interestRateType === 'fiscal',
            "au taux annuel maximum fiscalement déductible.",
            `au taux annuel de ${data.options.specificRate}`
        ),

        // Section durée
        ...getVersionText(
            data.options.durationType === 'CDI',
            "La présente convention est conclue pour une durée indéterminée à compter des présentes.",
            `La présente convention est conclue pour une durée de ${data.options.cddDuration} à compter des présentes.`
        ),

        // Section délégation
        ...(data.options.hasDelegation ? [
            createHeading("DELEGATION"),
            createNormalText("Conformément aux articles 1336 et suivants du Code civil, si la Centralisatrice est, en application des présentes ou en conséquence de toute autre opération, débitrice envers une des Filiales, elle consent, comme déléguée, à ce que la Filiale, comme délégante, l'oblige envers un tiers délégataire."),
            createNormalText("Cette délégation doit être matérialisée par l'acceptation formelle du délégataire."),
        ] : []),

        // Section subrogation
        ...(data.options.hasSubrogation ? [
            createHeading("SUBROGATION"),
            createNormalText("Conformément aux articles 1346 et suivants du Code civil, la Centralisatrice, ayant pour intérêt légitime le règlement des dettes constituées par les Filiales, consent, à la demande d'une d'elles, à la subroger comme débitrice pour le paiement d'un de ses créanciers."),
            createNormalText("La créance ainsi payée par la Centralisatrice en lieu et place de la Filiale constitue une somme mise à disposition par cette dernière au sens de l'Article 1."),
        ] : []),

        // Signatures
        createNormalText(`Fait à ${data.lieuSignature},`),
        createNormalText(`Le ${data.dateSignature},`),
        createNormalText(`En ${data.nbExemplaires} exemplaires originaux.`),

        // Signatures des parties
        ...createSignatureSection(data.centralisatrice, data.filiales),
    ];

    const doc = new Document({
        sections: [{
            properties: {
                // En-tête avec logo
                // headers: {
                //     default: new Header({
                //         children: [
                //             new Paragraph({
                //                 children: [
                //                     new ImageRun({
                //                         data: logo,
                //                         transformation: {
                //                             width: 100,
                //                             height: 50,
                //                         },
                //                     }),
                //                 ],
                //                 alignment: AlignmentType.LEFT,
                //             }),
                //         ],
                //     }),
                // },
                // Pied de page avec logo et pagination
                // footers: {
                //     default: new Footer({
                //         children: [
                //             new Paragraph({
                //                 children: [
                //                     new ImageRun({
                //                         data: logo,
                //                         transformation: {
                //                             width: 100,
                //                             height: 50,
                //                         },
                //                     }),
                //                     new TextRun({
                //                         children: [PageNumber.CURRENT],
                //                         alignment: AlignmentType.RIGHT,
                //                     }),
                //                 ],
                //             }),
                //         ],
                //     }),
                // },
            },
            children: [
                // Titre principal encadré
                new Paragraph({
                    children: [
                        new TextRun({
                            text: "CONVENTION DE CENTRALISATION DE TRESORERIE",
                            bold: true,
                            size: 28,
                        }),
                    ],
                    alignment: AlignmentType.CENTER,
                    border: {
                        top: { style: 'single', size: 15 },
                        bottom: { style: 'single', size: 15 },
                        left: { style: 'single', size: 15 },
                        right: { style: 'single', size: 15 },
                    },
                    spacing: { before: 200, after: 200 },
                }),

                // Exemple de titre avec style
                new Paragraph({
                    text: "CENTRALISATION DE TRESORERIE EXCEDENTAIRE",
                    heading: HeadingLevel.HEADING_1,
                    alignment: AlignmentType.CENTER,
                }),

                // Exemple de paragraphe justifié
                new Paragraph({
                    children: [
                        new TextRun({
                            text: "Au titre de la présente convention...",
                        }),
                    ],
                    alignment: AlignmentType.JUSTIFIED,
                }),

                // Exemple de liste à puces
                new Paragraph({
                    children: [
                        new TextRun({
                            text: "• Premier point",
                        }),
                    ],
                    alignment: AlignmentType.LEFT,
                    bullet: {
                        level: 0,
                    },
                }),

                // Exemple de texte aligné à droite
                new Paragraph({
                    children: [
                        new TextRun({
                            text: "Fait à Paris",
                        }),
                    ],
                    alignment: AlignmentType.RIGHT,
                }),
                ...paragraphs
            ],
        }],
    });

    Packer.toBlob(doc).then((blob) => {
        saveAs(blob, "Convention.docx");
    });
};

const createPartySection = (party: Party, type?: string): Paragraph[] => {
    return [
        createNormalText(party.id),
        createNormalText(party.address),
        createNormalText(party.kbis),
        createNormalText(party.representative),
        ...(type ? [createNormalText(`ci-après dénommée la « ${type} »,`)] : []),
    ];
};

const createSignatureSection = (centralisatrice: Party, filiales: Party[]): Paragraph[] => {
    return [
        createNormalText(centralisatrice.id),
        ...filiales.map(filiale => createNormalText(filiale.id)),
    ];
};


const CentralisationTresoreriePage: React.FC = () => {

    const [conventionData, setConventionData] = useState<ConventionData>({
        centralisatrice: {
            id: "idprestataire",
            address: "adresseprestataire",
            kbis: "Kbisbeneficiaire2",
            representative: "representantprestataire"
        },
        filiales: [
            {
                id: "idbeneficiaire2",
                address: "adressebeneficiaire2",
                kbis: "Kbisbeneficiaire2",
                representative: "representantbeneficiaire2"
            },
            // ... autres filiales
        ],
        lieuSignature: "Paris",
        dateSignature: "01/01/2024",
        nbExemplaires: 3,
        options: initialOptions
    });

    const handleSubmit = (options: ConventionOptions) => {
        setConventionData({ ...conventionData, options: options })
        console.log('Form submitted with options:', options);
        generateDocx(conventionData)
        // Handle form submission
    };

    return (
        <>

            <DocGeneratorForm<ConventionOptions>
                onSubmit={handleSubmit}
                questions={Questions}
                initialOptions={initialOptions}
            />
        </>
    );
};

export default CentralisationTresoreriePage;
