import VersionComparator from '@components/ui/VersionComparator';
import { useEffect, useState } from 'react';
import { FormOptions, FormProps, Question } from './types';
import { ChevronLeftIcon } from '@heroicons/react/16/solid';

export const DocGeneratorForm = <T extends FormOptions>({
    onSubmit,
    questions,
    initialOptions
}: FormProps<T>) => {
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [options, setOptions] = useState<T>(initialOptions);
    const [selectedQuestionId, setSelectedQuestionId] = useState<string | null>(null);
    const [versionContent, setVersionContent] = useState<{ versionA: string; versionB: string } | null>(null);
    const [selectedVersion, setSelectedVersion] = useState<'A' | 'B' | undefined>(undefined);
    const [_answeredQuestions, setAnsweredQuestions] = useState<Map<string, boolean>>(new Map());

    const getActiveQuestions = () => {
        return questions.filter(q => {
            if (!q.condition) return true;
            try {
                return q.condition(options);
            } catch {
                return false;
            }
        });
    };

    const currentQuestion = questions[currentQuestionIndex];
    const activeQuestions = getActiveQuestions();

    const getParentQuestionId = (questionId: string): string | null => {
        const question = questions.find(q => q.id === questionId);
        if (!question) return null;

        // Check for explicitly defined parent ID first
        if (question.parentId) {
            return question.parentId;
        }

        // Fall back to extracting parent from condition
        if (question.condition) {
            const conditionStr = question.condition.toString();
            const match = conditionStr.match(/options\.(\w+)/);
            return match ? match[1] : null;
        }

        return null;
    };

    const replaceValuePlaceholder = (content: string, value: string): string => {
        return content.replace(/\{value\}/g, value || '...');
    };

    useEffect(() => {
        if (!currentQuestion) {
            setVersionContent(null);
            return;
        }

        let content = (currentQuestion as Question & { versionContent?: { versionA: string; versionB: string } }).versionContent;

        // For input questions, ensure we have the correct version content
        if (currentQuestion.component.toString().includes('input')) {
            // If this question has its own version content, use it
            if (content) {
                // Keep using its own content
            }
            // If no content and it's a dependent question, try to get parent's content
            else if (!content) {
                const parentId = getParentQuestionId(currentQuestion.id);
                if (parentId) {
                    const parentQuestion = questions.find(q => q.id === parentId);
                    content = (parentQuestion as Question & { versionContent?: { versionA: string; versionB: string } })?.versionContent;
                }
            }
        }

        if (content) {
            const value = options[currentQuestion.id];
            let versionA = content.versionA;
            let versionB = content.versionB;

            // Handle previousValue placeholder first if present
            const parentId = getParentQuestionId(currentQuestion.id);
            if (parentId) {
                const previousValue = options[parentId];
                versionA = versionA.replace(/\{previousValue\}/g, previousValue || '...');
                versionB = versionB.replace(/\{previousValue\}/g, previousValue || '...');
            }

            // Then handle current value placeholder
            if (typeof value === 'string') {
                versionA = replaceValuePlaceholder(versionA, value);
                versionB = replaceValuePlaceholder(versionB, value);
            }

            content = { versionA, versionB };
            setVersionContent(content);
        } else {
            setVersionContent(null);
        }
    }, [currentQuestionIndex, questions, currentQuestion, options]);

    useEffect(() => {
        if (currentQuestion && 'versionContent' in currentQuestion) {
            const value = options[currentQuestion.id];

            // For text inputs (non-boolean values), always show version A
            if (typeof value === 'string') {
                setSelectedVersion('A');
                return;
            }

            // For switch components (boolean values)
            if (typeof value === 'boolean') {
                if (value === true) {
                    setSelectedVersion('A');
                } else if (value === false) {
                    setSelectedVersion('B');
                }
            } else {
                // If no value is set (null), don't select any version
                setSelectedVersion(undefined);
            }
        } else {
            setSelectedVersion(undefined);
        }
    }, [options, currentQuestion]);

    const updateField = (field: string, value: any) => {
        setOptions(prev => ({ ...prev, [field]: value }));
        setAnsweredQuestions(prev => {
            const newMap = new Map(prev);
            newMap.set(field, true);
            return newMap;
        });
        setSelectedQuestionId(field);
    };

    const formatAnswerValue = (value: any): string => {
        if (value === null) return '';
        if (typeof value === 'boolean') return value ? 'Oui' : 'Non';
        if (typeof value === 'object') return value.name;
        return value.toString();
    };


    const getAnsweredQuestions = () => {
        const activeQuestions = getActiveQuestions();
        return activeQuestions.filter(question => {
            const value = options[question.id];
            if (typeof value === 'boolean') {
                return value !== null;
            }
            if (typeof value === 'string') {
                return value.trim() !== '';
            }
            return value !== undefined && value !== null;
        });
    };

    const getCurrentQuestionNumber = () => {
        const activeQuestions = getActiveQuestions();
        return activeQuestions.findIndex(q => q.id === questions[currentQuestionIndex].id) + 1;
    };

    const isCurrentQuestionAnswered = () => {
        const question = questions[currentQuestionIndex];
        const value = options[question.id];

        if (typeof value === 'boolean' || value === null) {
            return value !== null;
        }
        if (typeof value === 'string') {
            return value.trim() !== '';
        }
        if (value === undefined) {
            return false;
        }
        return value !== null;
    };

    const getNextQuestionIndex = (currentIndex: number): number => {
        const activeQuestions = getActiveQuestions();
        const currentActiveIndex = activeQuestions.findIndex(q => q.id === questions[currentIndex].id);
        if (currentActiveIndex < activeQuestions.length - 1) {
            return questions.findIndex(q => q.id === activeQuestions[currentActiveIndex + 1].id);
        }
        return -1;
    };

    const getPreviousQuestionIndex = (currentIndex: number): number => {
        const activeQuestions = getActiveQuestions();
        const currentActiveIndex = activeQuestions.findIndex(q => q.id === questions[currentIndex].id);
        if (currentActiveIndex > 0) {
            return questions.findIndex(q => q.id === activeQuestions[currentActiveIndex - 1].id);
        }
        return -1;
    };

    const handleNext = () => {
        if (!isCurrentQuestionAnswered()) {
            return;
        }

        const nextIndex = getNextQuestionIndex(currentQuestionIndex);
        if (nextIndex >= 0) {
            setCurrentQuestionIndex(nextIndex);
        } else {
            onSubmit(options);
        }
    };

    const handlePrevious = () => {
        const prevIndex = getPreviousQuestionIndex(currentQuestionIndex);
        if (prevIndex >= 0) {
            setCurrentQuestionIndex(prevIndex);
        }
    };


    return (
        <div className="flex h-screen bg-white ">
            {/* Left Column: Form and Summary */}
            <div className={`${getAnsweredQuestions().length > 0 ? 'w-3/4' : 'w-full'}  overflow-auto transition-all duration-300 mt-3` }>
                {/* Form */}
                <div className={`p-3 ${getAnsweredQuestions().length === activeQuestions.length && !selectedQuestionId ? 'hidden' : ''}`}>
                    <div className=" mx-auto bg-white rounded shadow">
                        <div className="p-2 border-b">
                            <div className="flex justify-between items-center mb-1">
                                <div className="flex items-center gap-2">
                                    {currentQuestionIndex > 0 && (
                                        <button
                                            onClick={handlePrevious}
                                            className="text-blue-500 hover:text-blue-600"
                                        >
                                            <ChevronLeftIcon className="h-4 w-4" />
                                        </button>
                                    )}
                                    <span className="text-sm text-gray-600">
                                        Question {getCurrentQuestionNumber()} sur {activeQuestions.length}
                                    </span>
                                </div>
                                <span className="text-sm text-gray-600">
                                    {Math.round((getAnsweredQuestions().length / activeQuestions.length) * 100)}%
                                </span>
                            </div>
                            <div className="w-full bg-gray-200 rounded-full h-1.5">
                                <div
                                    className="bg-blue-500 h-1.5 rounded-full transition-all duration-300"
                                    style={{
                                        width: `${(getAnsweredQuestions().length / activeQuestions.length) * 100}%`
                                    }}
                                />
                            </div>
                        </div>
                        <div className="p-4">
                            <h2 className="text-base font-medium mb-2">{currentQuestion.label}</h2>
                            {currentQuestion.help && (
                                <div className="mb-3 p-2 bg-blue-50 border border-blue-100 rounded text-xs text-gray-600 italic">
                                    {currentQuestion.help}
                                </div>
                            )}
                            <div className="mt-3 flex items-center gap-2">
                                <div className="flex-grow [&_input]:h-6 [&_input]:text-xs [&_input]:rounded [&_input]:border-gray-200 [&_button]:h-6 [&_button]:text-xs [&_button]:rounded [&_button]:px-3 [&_button]:py-0 [&_button]:border [&_button]:border-gray-200">
                                    {currentQuestion.component(options, updateField)}
                                </div>
                                <button
                                    onClick={handleNext}
                                    disabled={!isCurrentQuestionAnswered()}
                                    className={`px-3 py-1 text-xs font-medium rounded transition-all ${!isCurrentQuestionAnswered()
                                        ? 'bg-gray-100 text-gray-400 cursor-not-allowed border border-gray-200'
                                        : 'bg-blue-500 text-white hover:bg-blue-600 hover:shadow-sm border border-blue-500'
                                        }`}
                                >
                                    {getNextQuestionIndex(currentQuestionIndex) === -1 ? 'Générer' : 'Valider'}
                                </button>
                            </div>
                        </div>

                        
                    </div>
                    {versionContent && (
                        <div className=" mx-auto bg-white rounded shadow mt-5">
                            <VersionComparator
                                versionA={versionContent.versionA}
                                versionB={versionContent.versionB}
                                selectedVersion={selectedVersion}
                            />
                        </div>
                    )}
                </div>




            </div>
            {getAnsweredQuestions().length > 0 && (<div className="w-1/4 overflow-auto p-3">
                {/* Summary */}
                <div className="p-3 ">
                    <div className="max-w-xl mx-auto">

                        <div className="relative">
                            {/* Timeline line */}
                            <div className="absolute left-2 top-4 bottom-4 w-0.5 bg-gradient-to-b from-blue-500/20 via-blue-500/10 to-transparent"></div>

                            <div className="space-y-4">
                                {getAnsweredQuestions().map((question) => (
                                    <div
                                        key={question.id}
                                        onClick={() => {
                                            const index = questions.findIndex(q => q.id === question.id);
                                            if (index !== -1) {
                                                setSelectedQuestionId(question.id);
                                                setCurrentQuestionIndex(index);
                                            }
                                        }}
                                        className="relative pl-8 cursor-pointer group"
                                    >
                                        {/* Timeline dot with animation */}
                                        <div className={`absolute left-0 w-4 h-4 rounded-full border-2 transition-all duration-200 ${selectedQuestionId === question.id
                                            ? 'bg-blue-500 border-blue-500 scale-110'
                                            : 'bg-white border-gray-300 group-hover:border-blue-500 group-hover:scale-110'
                                            }`}></div>

                                        <div className={`py-1.5 px-2 bg-white rounded shadow-sm transition-all duration-200 ${selectedQuestionId === question.id
                                            ? 'ring-1 ring-blue-500 bg-blue-50 -translate-y-0.5'
                                            : 'hover:shadow hover:bg-blue-50/50 hover:-translate-y-0.5'
                                            } ${question.condition ? 'border-l-2 border-l-blue-100 ml-4' : ''
                                            }`}>
                                            <h3 className="text-xs font-medium text-gray-500">{question.label}</h3>
                                            <p className="text-xs mt-2  text-gray-900">
                                                {formatAnswerValue(options[question.id])}
                                            </p>
                                        </div>
                                    </div>
                                ))}


                            </div>
                        </div>
                    </div>
                </div>
            </div>)}

      
        </div>
    );
};
