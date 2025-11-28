'use client'

import { useState } from 'react'
import Link from 'next/link'

interface QuizQuestion {
    id: number
    question: string
    options: string[]
    correctAnswer: number
    explanation: string
}

export default function PracticePage() {
    const [selectedExercise, setSelectedExercise] = useState<string | null>(null)
    const [currentQuestion, setCurrentQuestion] = useState(0)
    const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null)
    const [showResult, setShowResult] = useState(false)
    const [score, setScore] = useState(0)
    const [quizCompleted, setQuizCompleted] = useState(false)

    const exercises = [
        {
            id: 'ruware',
            title: '汝瓷英语练习',
            description: '专业汝瓷词汇与文化练习',
            icon: '🏺',
            color: 'from-cyan-500 to-blue-500',
            link: '/practice/exercises',
        },
        {
            id: 'vocabulary',
            title: '词汇选择',
            description: '测试您的词汇掌握程度',
            icon: '📚',
            color: 'from-blue-500 to-cyan-500',
            questions: 10,
        },
        {
            id: 'grammar',
            title: '语法练习',
            description: '强化语法知识点',
            icon: '✍️',
            color: 'from-purple-500 to-pink-500',
        },
        {
            id: 'listening',
            title: '听力理解',
            description: '提升听力技能',
            icon: '👂',
            color: 'from-green-500 to-emerald-500',
        },
        {
            id: 'reading',
            title: '阅读理解',
            description: '增强阅读能力',
            icon: '📖',
            color: 'from-orange-500 to-red-500',
        },
    ]


    const quizQuestions: QuizQuestion[] = [
        {
            id: 1,
            question: 'The company decided to _____ a new marketing strategy.',
            options: ['implement', 'imply', 'implicate', 'implicit'],
            correctAnswer: 0,
            explanation: '"implement" 意为"实施、执行"，符合句意。',
        },
        {
            id: 2,
            question: 'She spoke _____ about her achievements.',
            options: ['modest', 'modestly', 'modesty', 'modernly'],
            correctAnswer: 1,
            explanation: '需要副词修饰动词 "spoke"，所以选择 "modestly"。',
        },
        {
            id: 3,
            question: 'The research provides _____ evidence for the theory.',
            options: ['compelling', 'compelled', 'compel', 'compulsion'],
            correctAnswer: 0,
            explanation: '"compelling" 作形容词，意为"令人信服的"，修饰名词 "evidence"。',
        },
    ]

    const handleAnswerSelect = (answerIndex: number) => {
        if (!showResult) {
            setSelectedAnswer(answerIndex)
        }
    }

    const handleSubmitAnswer = () => {
        if (selectedAnswer !== null) {
            setShowResult(true)
            if (selectedAnswer === quizQuestions[currentQuestion].correctAnswer) {
                setScore(score + 1)
            }
        }
    }

    const handleNextQuestion = () => {
        if (currentQuestion < quizQuestions.length - 1) {
            setCurrentQuestion(currentQuestion + 1)
            setSelectedAnswer(null)
            setShowResult(false)
        } else {
            setQuizCompleted(true)
        }
    }

    const handleRestartQuiz = () => {
        setCurrentQuestion(0)
        setSelectedAnswer(null)
        setShowResult(false)
        setScore(0)
        setQuizCompleted(false)
        setSelectedExercise(null)
    }

    if (quizCompleted) {
        const percentage = Math.round((score / quizQuestions.length) * 100)
        return (
            <div className="py-12">
                <div className="container-custom">
                    <div className="max-w-2xl mx-auto">
                        <div className="card p-12 text-center">
                            <div className="text-6xl mb-6">
                                {percentage >= 80 ? '🎉' : percentage >= 60 ? '👍' : '💪'}
                            </div>
                            <h2 className="text-3xl font-bold text-gray-900 mb-4">
                                练习完成！
                            </h2>
                            <div className="text-6xl font-bold bg-gradient-to-r from-primary-600 to-secondary-600 bg-clip-text text-transparent mb-6">
                                {percentage}%
                            </div>
                            <p className="text-xl text-gray-600 mb-8">
                                您答对了 {score} / {quizQuestions.length} 题
                            </p>
                            <div className="space-y-3">
                                <button
                                    onClick={handleRestartQuiz}
                                    className="w-full btn-primary"
                                >
                                    返回练习列表
                                </button>
                                <button
                                    onClick={() => {
                                        setQuizCompleted(false)
                                        setCurrentQuestion(0)
                                        setSelectedAnswer(null)
                                        setShowResult(false)
                                        setScore(0)
                                    }}
                                    className="w-full btn-secondary"
                                >
                                    再做一次
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

    if (selectedExercise) {
        const question = quizQuestions[currentQuestion]

        return (
            <div className="py-12">
                <div className="container-custom">
                    <div className="max-w-3xl mx-auto">
                        {/* Progress Bar */}
                        <div className="mb-8">
                            <div className="flex justify-between items-center mb-2">
                                <span className="text-sm font-semibold text-gray-700">
                                    问题 {currentQuestion + 1} / {quizQuestions.length}
                                </span>
                                <span className="text-sm font-semibold text-primary-600">
                                    得分: {score}
                                </span>
                            </div>
                            <div className="w-full bg-gray-200 rounded-full h-2">
                                <div
                                    className="bg-gradient-to-r from-primary-500 to-secondary-500 h-2 rounded-full transition-all duration-300"
                                    style={{ width: `${((currentQuestion + 1) / quizQuestions.length) * 100}%` }}
                                ></div>
                            </div>
                        </div>

                        {/* Question Card */}
                        <div className="card p-8 mb-6">
                            <h2 className="text-2xl font-bold text-gray-900 mb-8">
                                {question.question}
                            </h2>

                            <div className="space-y-4">
                                {question.options.map((option, index) => {
                                    const isSelected = selectedAnswer === index
                                    const isCorrect = index === question.correctAnswer
                                    const showCorrect = showResult && isCorrect
                                    const showIncorrect = showResult && isSelected && !isCorrect

                                    return (
                                        <button
                                            key={index}
                                            onClick={() => handleAnswerSelect(index)}
                                            disabled={showResult}
                                            className={`w-full p-4 rounded-xl border-2 text-left transition-all duration-200 ${showCorrect
                                                ? 'border-green-500 bg-green-50'
                                                : showIncorrect
                                                    ? 'border-red-500 bg-red-50'
                                                    : isSelected
                                                        ? 'border-primary-500 bg-primary-50'
                                                        : 'border-gray-200 hover:border-primary-300 hover:bg-gray-50'
                                                } ${showResult ? 'cursor-not-allowed' : 'cursor-pointer'}`}
                                        >
                                            <div className="flex items-center justify-between">
                                                <span className="font-medium text-gray-900">{option}</span>
                                                {showCorrect && (
                                                    <svg className="w-6 h-6 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                                    </svg>
                                                )}
                                                {showIncorrect && (
                                                    <svg className="w-6 h-6 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                                    </svg>
                                                )}
                                            </div>
                                        </button>
                                    )
                                })}
                            </div>

                            {showResult && (
                                <div className={`mt-6 p-4 rounded-lg ${selectedAnswer === question.correctAnswer
                                    ? 'bg-green-50 border-2 border-green-200'
                                    : 'bg-red-50 border-2 border-red-200'
                                    }`}>
                                    <p className={`font-semibold mb-2 ${selectedAnswer === question.correctAnswer
                                        ? 'text-green-700'
                                        : 'text-red-700'
                                        }`}>
                                        {selectedAnswer === question.correctAnswer ? '✓ 回答正确！' : '✗ 回答错误'}
                                    </p>
                                    <p className="text-gray-700">{question.explanation}</p>
                                </div>
                            )}
                        </div>

                        {/* Action Buttons */}
                        <div className="flex gap-4">
                            <button
                                onClick={handleRestartQuiz}
                                className="btn-secondary"
                            >
                                退出练习
                            </button>
                            {!showResult ? (
                                <button
                                    onClick={handleSubmitAnswer}
                                    disabled={selectedAnswer === null}
                                    className={`flex-1 ${selectedAnswer === null
                                        ? 'bg-gray-300 text-gray-500 cursor-not-allowed px-6 py-3 rounded-lg font-semibold'
                                        : 'btn-primary'
                                        }`}
                                >
                                    提交答案
                                </button>
                            ) : (
                                <button
                                    onClick={handleNextQuestion}
                                    className="flex-1 btn-primary"
                                >
                                    {currentQuestion < quizQuestions.length - 1 ? '下一题' : '查看结果'}
                                </button>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        )
    }

    return (
        <div className="py-12">
            <div className="container-custom">
                {/* Header */}
                <div className="text-center mb-12">
                    <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
                        互动练习
                    </h1>
                    <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                        通过多样化的练习形式，巩固所学知识，提升英语能力
                    </p>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
                    <div className="card p-6 text-center">
                        <div className="text-3xl font-bold text-primary-600 mb-1">156</div>
                        <div className="text-sm text-gray-600">已完成练习</div>
                    </div>
                    <div className="card p-6 text-center">
                        <div className="text-3xl font-bold text-green-600 mb-1">89%</div>
                        <div className="text-sm text-gray-600">平均正确率</div>
                    </div>
                    <div className="card p-6 text-center">
                        <div className="text-3xl font-bold text-purple-600 mb-1">12</div>
                        <div className="text-sm text-gray-600">连续学习天数</div>
                    </div>
                    <div className="card p-6 text-center">
                        <div className="text-3xl font-bold text-orange-600 mb-1">45</div>
                        <div className="text-sm text-gray-600">本周练习题</div>
                    </div>
                </div>

                {/* Exercise Types */}
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {exercises.map((exercise) => {
                        const CardContent = (
                            <>
                                <div className={`w-20 h-20 bg-gradient-to-br ${exercise.color} rounded-2xl flex items-center justify-center text-4xl mx-auto mb-4 transform group-hover:scale-110 group-hover:rotate-6 transition-all duration-300`}>
                                    {exercise.icon}
                                </div>
                                <h3 className="text-xl font-bold text-gray-900 mb-2">
                                    {exercise.title}
                                </h3>
                                <p className="text-gray-600 text-sm mb-4">
                                    {exercise.description}
                                </p>
                                <div className="inline-flex items-center text-primary-600 font-semibold text-sm group-hover:translate-x-1 transition-transform duration-200">
                                    开始练习
                                    <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                    </svg>
                                </div>
                            </>
                        )

                        if (exercise.link) {
                            return (
                                <Link
                                    key={exercise.id}
                                    href={exercise.link}
                                    className="card card-hover p-8 text-center group cursor-pointer block"
                                >
                                    {CardContent}
                                </Link>
                            )
                        }

                        return (
                            <button
                                key={exercise.id}
                                onClick={() => setSelectedExercise(exercise.id)}
                                className="card card-hover p-8 text-center group cursor-pointer"
                            >
                                {CardContent}
                            </button>
                        )
                    })}
                </div>

                {/* Daily Challenge */}
                <div className="mt-12 bg-gradient-to-br from-primary-600 via-purple-600 to-secondary-600 rounded-3xl p-8 text-white">
                    <div className="flex flex-col md:flex-row items-center justify-between">
                        <div className="mb-6 md:mb-0">
                            <div className="inline-block bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full text-sm font-semibold mb-3">
                                🏆 每日挑战
                            </div>
                            <h2 className="text-3xl font-bold mb-2">
                                完成今日挑战，赢取奖励积分
                            </h2>
                            <p className="text-lg opacity-90">
                                每天完成挑战可获得额外积分和成就徽章
                            </p>
                        </div>
                        <button className="bg-white text-primary-600 px-8 py-4 rounded-lg font-semibold hover:bg-gray-100 transition-colors duration-200 shadow-lg whitespace-nowrap">
                            接受挑战
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}
