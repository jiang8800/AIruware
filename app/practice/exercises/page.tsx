'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'

interface MultipleChoiceOption {
    id: string
    text: string
    correct: boolean
}

interface MatchingPair {
    id: number
    english: string
    chinese: string
    phonetic: string
}

interface Exercise {
    id: number
    chapterId: number
    type: 'multiple-choice' | 'matching'
    question: string
    questionCN: string
    options?: MultipleChoiceOption[]
    pairs?: MatchingPair[]
    explanation: string
    explanationCN: string
}

export default function ExercisesPage() {
    const [exercises, setExercises] = useState<Exercise[]>([])
    const [currentIndex, setCurrentIndex] = useState(0)
    const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null)
    const [matchingAnswers, setMatchingAnswers] = useState<{ [key: number]: number }>({})
    const [showExplanation, setShowExplanation] = useState(false)
    const [score, setScore] = useState(0)
    const [completed, setCompleted] = useState<number[]>([])
    const [loading, setLoading] = useState(true)
    const [selectedChapter, setSelectedChapter] = useState<number | null>(null)

    useEffect(() => {
        // Load exercises from JSON file
        fetch('/data/questions.json')
            .then(response => response.json())
            .then(data => {
                setExercises(data.exercises)
                setLoading(false)
            })
            .catch(error => {
                console.error('Error loading exercises:', error)
                setLoading(false)
            })
    }, [])

    const currentExercise = exercises[currentIndex]

    const filteredExercises = selectedChapter
        ? exercises.filter(ex => ex.chapterId === selectedChapter)
        : exercises

    const handleMultipleChoiceAnswer = (optionId: string) => {
        if (showExplanation) return
        setSelectedAnswer(optionId)
    }

    const handleMatchingAnswer = (englishId: number, chineseId: number) => {
        if (showExplanation) return
        setMatchingAnswers(prev => ({
            ...prev,
            [englishId]: chineseId
        }))
    }

    const checkAnswer = () => {
        if (currentExercise.type === 'multiple-choice') {
            const correctOption = currentExercise.options?.find(opt => opt.correct)
            if (selectedAnswer === correctOption?.id) {
                setScore(score + 1)
            }
        } else if (currentExercise.type === 'matching') {
            let correct = true
            currentExercise.pairs?.forEach(pair => {
                if (matchingAnswers[pair.id] !== pair.id) {
                    correct = false
                }
            })
            if (correct) {
                setScore(score + 1)
            }
        }
        setShowExplanation(true)
        setCompleted([...completed, currentExercise.id])
    }

    const nextQuestion = () => {
        if (currentIndex < filteredExercises.length - 1) {
            setCurrentIndex(currentIndex + 1)
            setSelectedAnswer(null)
            setMatchingAnswers({})
            setShowExplanation(false)
        }
    }

    const resetExercise = () => {
        setCurrentIndex(0)
        setSelectedAnswer(null)
        setMatchingAnswers({})
        setShowExplanation(false)
        setScore(0)
        setCompleted([])
    }

    if (loading) {
        return (
            <div className="py-20">
                <div className="container-custom">
                    <div className="flex items-center justify-center min-h-[400px]">
                        <div className="text-center">
                            <div className="w-16 h-16 border-4 border-primary-200 border-t-primary-600 rounded-full animate-spin mx-auto mb-4"></div>
                            <p className="text-gray-600">加载练习中...</p>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

    if (!currentExercise) {
        return (
            <div className="py-20">
                <div className="container-custom">
                    <div className="text-center">
                        <div className="text-6xl mb-4">🎉</div>
                        <h2 className="text-3xl font-bold text-gray-900 mb-4">练习完成！</h2>
                        <p className="text-xl text-gray-600 mb-2">
                            您的得分：<span className="font-bold text-cyan-600">{score}</span> / {filteredExercises.length}
                        </p>
                        <p className="text-lg text-gray-600 mb-8">
                            正确率：<span className="font-bold text-cyan-600">
                                {Math.round((score / filteredExercises.length) * 100)}%
                            </span>
                        </p>
                        <div className="flex gap-4 justify-center">
                            <button onClick={resetExercise} className="btn-primary">
                                重新开始
                            </button>
                            <Link href="/practice" className="btn-secondary">
                                返回练习中心
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

    return (
        <div className="py-12">
            <div className="container-custom max-w-4xl">
                {/* Header */}
                <div className="mb-8">
                    <Link href="/practice" className="text-cyan-600 hover:text-cyan-700 flex items-center mb-4">
                        <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                        </svg>
                        返回练习中心
                    </Link>
                    <h1 className="text-4xl font-bold text-gray-900 mb-4">互动练习</h1>
                    <p className="text-lg text-gray-600">通过练习巩固所学知识</p>
                </div>

                {/* Progress Bar */}
                <div className="card p-6 mb-8">
                    <div className="flex justify-between items-center mb-3">
                        <span className="text-sm font-semibold text-gray-700">
                            进度：{currentIndex + 1} / {filteredExercises.length}
                        </span>
                        <span className="text-sm font-semibold text-cyan-600">
                            得分：{score} / {completed.length}
                        </span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-3">
                        <div
                            className="bg-gradient-to-r from-cyan-500 to-blue-500 h-3 rounded-full transition-all duration-300"
                            style={{ width: `${((currentIndex + 1) / filteredExercises.length) * 100}%` }}
                        ></div>
                    </div>
                </div>

                {/* Question Card */}
                <div className="card p-8 mb-6">
                    {/* Question Type Badge */}
                    <div className="flex items-center gap-3 mb-6">
                        <span className={`px-4 py-2 rounded-full text-sm font-semibold ${currentExercise.type === 'multiple-choice'
                            ? 'bg-blue-100 text-blue-700'
                            : 'bg-purple-100 text-purple-700'
                            }`}>
                            {currentExercise.type === 'multiple-choice' ? '📝 多选题' : '🔗 匹配题'}
                        </span>
                        <span className="px-4 py-2 rounded-full text-sm font-semibold bg-gray-100 text-gray-700">
                            Unit {currentExercise.chapterId}
                        </span>
                    </div>

                    {/* Question */}
                    <div className="mb-8">
                        <h2 className="text-2xl font-bold text-gray-900 mb-3">
                            {currentExercise.question}
                        </h2>
                        <p className="text-lg text-gray-600">
                            {currentExercise.questionCN}
                        </p>
                    </div>

                    {/* Multiple Choice Options */}
                    {currentExercise.type === 'multiple-choice' && currentExercise.options && (
                        <div className="space-y-3">
                            {currentExercise.options.map((option) => {
                                const isSelected = selectedAnswer === option.id
                                const isCorrect = option.correct
                                const showResult = showExplanation

                                return (
                                    <button
                                        key={option.id}
                                        onClick={() => handleMultipleChoiceAnswer(option.id)}
                                        disabled={showExplanation}
                                        className={`w-full text-left p-5 rounded-xl border-2 transition-all duration-200 ${showResult
                                            ? isCorrect
                                                ? 'border-green-500 bg-green-50'
                                                : isSelected
                                                    ? 'border-red-500 bg-red-50'
                                                    : 'border-gray-200 bg-gray-50'
                                            : isSelected
                                                ? 'border-cyan-500 bg-cyan-50'
                                                : 'border-gray-200 hover:border-cyan-300 hover:bg-gray-50'
                                            }`}
                                    >
                                        <div className="flex items-center">
                                            <div className={`w-8 h-8 rounded-full flex items-center justify-center mr-4 font-bold ${showResult
                                                ? isCorrect
                                                    ? 'bg-green-500 text-white'
                                                    : isSelected
                                                        ? 'bg-red-500 text-white'
                                                        : 'bg-gray-200 text-gray-600'
                                                : isSelected
                                                    ? 'bg-cyan-500 text-white'
                                                    : 'bg-gray-200 text-gray-600'
                                                }`}>
                                                {option.id.toUpperCase()}
                                            </div>
                                            <span className="text-lg text-gray-900">{option.text}</span>
                                            {showResult && isCorrect && (
                                                <svg className="w-6 h-6 text-green-500 ml-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                                </svg>
                                            )}
                                        </div>
                                    </button>
                                )
                            })}
                        </div>
                    )}

                    {/* Matching Exercise */}
                    {currentExercise.type === 'matching' && currentExercise.pairs && (
                        <div className="space-y-6">
                            <p className="text-sm text-gray-600 mb-4">
                                点击左侧英文术语，然后点击对应的中文含义进行匹配
                            </p>
                            {currentExercise.pairs.map((pair) => {
                                const selectedChinese = matchingAnswers[pair.id]
                                const isCorrect = selectedChinese === pair.id
                                const showResult = showExplanation

                                return (
                                    <div key={pair.id} className="grid md:grid-cols-2 gap-4">
                                        {/* English Term */}
                                        <div className={`p-5 rounded-xl border-2 ${showResult
                                            ? isCorrect
                                                ? 'border-green-500 bg-green-50'
                                                : 'border-red-500 bg-red-50'
                                            : selectedChinese
                                                ? 'border-cyan-500 bg-cyan-50'
                                                : 'border-gray-200 bg-white'
                                            }`}>
                                            <div className="font-bold text-lg text-gray-900 mb-1">
                                                {pair.english}
                                            </div>
                                            {pair.phonetic && (
                                                <div className="text-sm text-gray-600">{pair.phonetic}</div>
                                            )}
                                        </div>

                                        {/* Chinese Options */}
                                        <div className="flex flex-wrap gap-2">
                                            {currentExercise.pairs?.map((chinesePair) => (
                                                <button
                                                    key={chinesePair.id}
                                                    onClick={() => handleMatchingAnswer(pair.id, chinesePair.id)}
                                                    disabled={showExplanation}
                                                    className={`px-4 py-2 rounded-lg border-2 transition-all ${selectedChinese === chinesePair.id
                                                        ? showResult
                                                            ? isCorrect
                                                                ? 'border-green-500 bg-green-100 text-green-700'
                                                                : 'border-red-500 bg-red-100 text-red-700'
                                                            : 'border-cyan-500 bg-cyan-100 text-cyan-700'
                                                        : 'border-gray-200 bg-white text-gray-700 hover:border-gray-300'
                                                        }`}
                                                >
                                                    {chinesePair.chinese}
                                                </button>
                                            ))}
                                        </div>
                                    </div>
                                )
                            })}
                        </div>
                    )}

                    {/* Explanation */}
                    {showExplanation && (
                        <div className="mt-8 p-6 bg-gradient-to-r from-blue-50 to-cyan-50 rounded-xl border-l-4 border-cyan-500">
                            <h3 className="font-bold text-gray-900 mb-2 flex items-center">
                                <svg className="w-5 h-5 mr-2 text-cyan-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                                解析
                            </h3>
                            <p className="text-gray-800 mb-2">{currentExercise.explanation}</p>
                            <p className="text-gray-700">{currentExercise.explanationCN}</p>
                        </div>
                    )}
                </div>

                {/* Action Buttons */}
                <div className="flex gap-4">
                    {!showExplanation ? (
                        <button
                            onClick={checkAnswer}
                            disabled={
                                currentExercise.type === 'multiple-choice'
                                    ? !selectedAnswer
                                    : Object.keys(matchingAnswers).length !== currentExercise.pairs?.length
                            }
                            className="flex-1 btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            提交答案
                        </button>
                    ) : (
                        <button
                            onClick={nextQuestion}
                            className="flex-1 bg-gradient-to-r from-cyan-600 to-blue-600 text-white px-8 py-4 rounded-xl font-semibold shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-200"
                        >
                            {currentIndex < filteredExercises.length - 1 ? '下一题' : '查看结果'}
                        </button>
                    )}
                </div>
            </div>
        </div>
    )
}
