'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'

interface Chapter {
    id: number
    title: string
    titleCN: string
    description: string
    level: string
    duration: string
    lessons: number
    color: string
    icon: string
    parts: string[]
}

export default function CoursesPage() {
    const [chapters, setChapters] = useState<Chapter[]>([])
    const [selectedLevel, setSelectedLevel] = useState('全部')
    const [expandedChapter, setExpandedChapter] = useState<number | null>(null)
    const [loading, setLoading] = useState(true)

    const levels = ['全部', '初级', '中级', '高级']

    useEffect(() => {
        // Load chapters from JSON file
        fetch('/data/chapters.json')
            .then(response => response.json())
            .then(data => {
                setChapters(data.chapters)
                setLoading(false)
            })
            .catch(error => {
                console.error('Error loading chapters:', error)
                setLoading(false)
            })
    }, [])

    const filteredChapters = chapters.filter(chapter => {
        const levelMatch = selectedLevel === '全部' || chapter.level === selectedLevel
        return levelMatch
    })

    const levelColors = {
        '初级': 'bg-green-100 text-green-700 border-green-200',
        '中级': 'bg-blue-100 text-blue-700 border-blue-200',
        '高级': 'bg-purple-100 text-purple-700 border-purple-200',
    }

    if (loading) {
        return (
            <div className="py-20">
                <div className="container-custom">
                    <div className="flex items-center justify-center min-h-[400px]">
                        <div className="text-center">
                            <div className="w-16 h-16 border-4 border-primary-200 border-t-primary-600 rounded-full animate-spin mx-auto mb-4"></div>
                            <p className="text-gray-600">加载课程中...</p>
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
                    <div className="inline-block mb-4">
                        <span className="bg-gradient-to-r from-cyan-500 to-blue-500 text-white px-4 py-2 rounded-full text-sm font-semibold shadow-lg">
                            🏺 汝瓷文化英语课程
                        </span>
                    </div>
                    <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
                        课程目录
                    </h1>
                    <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                        系统学习汝瓷文化与英语，共 {chapters.length} 个单元，涵盖从基础到高级的完整课程体系
                    </p>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
                    <div className="bg-gradient-to-br from-cyan-500 to-blue-500 rounded-xl p-6 text-white text-center">
                        <div className="text-3xl font-bold mb-1">{chapters.length}</div>
                        <div className="text-sm opacity-90">课程单元</div>
                    </div>
                    <div className="bg-gradient-to-br from-green-500 to-emerald-500 rounded-xl p-6 text-white text-center">
                        <div className="text-3xl font-bold mb-1">
                            {chapters.reduce((sum, ch) => sum + ch.lessons, 0)}
                        </div>
                        <div className="text-sm opacity-90">课程部分</div>
                    </div>
                    <div className="bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl p-6 text-white text-center">
                        <div className="text-3xl font-bold mb-1">
                            {chapters.filter(ch => ch.level === '初级').length}
                        </div>
                        <div className="text-sm opacity-90">初级课程</div>
                    </div>
                    <div className="bg-gradient-to-br from-orange-500 to-red-500 rounded-xl p-6 text-white text-center">
                        <div className="text-3xl font-bold mb-1">
                            {chapters.filter(ch => ch.level === '高级').length}
                        </div>
                        <div className="text-sm opacity-90">高级课程</div>
                    </div>
                </div>

                {/* Filters */}
                <div className="bg-white rounded-2xl shadow-md p-6 mb-8">
                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-3">
                            难度等级
                        </label>
                        <div className="flex flex-wrap gap-3">
                            {levels.map((level) => (
                                <button
                                    key={level}
                                    onClick={() => setSelectedLevel(level)}
                                    className={`px-6 py-3 rounded-lg font-medium transition-all duration-200 ${selectedLevel === level
                                            ? 'bg-gradient-to-r from-cyan-600 to-blue-600 text-white shadow-lg transform scale-105'
                                            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                        }`}
                                >
                                    {level}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Results Count */}
                <div className="mb-6">
                    <p className="text-gray-600">
                        找到 <span className="font-semibold text-cyan-600">{filteredChapters.length}</span> 个单元
                    </p>
                </div>

                {/* Chapters Grid */}
                {filteredChapters.length > 0 ? (
                    <div className="grid md:grid-cols-2 gap-6">
                        {filteredChapters.map((chapter) => (
                            <div
                                key={chapter.id}
                                className="card overflow-hidden group"
                            >
                                {/* Header */}
                                <div className={`bg-gradient-to-r ${chapter.color} p-6 text-white relative overflow-hidden`}>
                                    <div className="absolute top-0 right-0 text-9xl opacity-10 -mr-4 -mt-4">
                                        {chapter.icon}
                                    </div>
                                    <div className="relative z-10">
                                        <div className="flex items-start justify-between mb-3">
                                            <div className="flex items-center space-x-3">
                                                <div className="text-4xl">{chapter.icon}</div>
                                                <div>
                                                    <div className="text-sm font-semibold opacity-90">Unit {chapter.id}</div>
                                                    <h3 className="text-xl font-bold">{chapter.title}</h3>
                                                    <p className="text-sm opacity-90 mt-1">{chapter.titleCN}</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Content */}
                                <div className="p-6 bg-white">
                                    <div className="flex items-center gap-2 mb-4">
                                        <span className={`px-3 py-1 rounded-full text-xs font-semibold border ${levelColors[chapter.level as keyof typeof levelColors]}`}>
                                            {chapter.level}
                                        </span>
                                        <span className="text-sm text-gray-500">•</span>
                                        <span className="text-sm text-gray-600">{chapter.duration}</span>
                                        <span className="text-sm text-gray-500">•</span>
                                        <span className="text-sm text-gray-600">{chapter.lessons} 部分</span>
                                    </div>

                                    <p className="text-gray-600 leading-relaxed mb-4">
                                        {chapter.description}
                                    </p>

                                    {/* Expandable Parts */}
                                    <button
                                        onClick={() => setExpandedChapter(expandedChapter === chapter.id ? null : chapter.id)}
                                        className="w-full text-left p-3 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors flex items-center justify-between mb-4"
                                    >
                                        <span className="text-sm font-semibold text-gray-700">
                                            查看课程部分 ({chapter.parts.length})
                                        </span>
                                        <svg
                                            className={`w-5 h-5 text-gray-500 transition-transform duration-200 ${expandedChapter === chapter.id ? 'rotate-180' : ''
                                                }`}
                                            fill="none"
                                            stroke="currentColor"
                                            viewBox="0 0 24 24"
                                        >
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                        </svg>
                                    </button>

                                    <div
                                        className={`transition-all duration-300 overflow-hidden ${expandedChapter === chapter.id ? 'max-h-[500px] mb-4' : 'max-h-0'
                                            }`}
                                    >
                                        <div className="space-y-2 bg-gray-50 rounded-lg p-4">
                                            {chapter.parts.map((part, index) => (
                                                <div
                                                    key={index}
                                                    className="flex items-center space-x-3 p-2 rounded hover:bg-white transition-colors"
                                                >
                                                    <div className={`w-7 h-7 bg-gradient-to-br ${chapter.color} rounded-full flex items-center justify-center text-white font-semibold text-xs flex-shrink-0`}>
                                                        {index + 1}
                                                    </div>
                                                    <span className="text-sm text-gray-700">{part}</span>
                                                </div>
                                            ))}
                                        </div>
                                    </div>

                                    {/* Action Button */}
                                    <Link
                                        href={`/courses/${chapter.id}`}
                                        className={`block w-full text-center bg-gradient-to-r ${chapter.color} text-white px-6 py-3 rounded-lg font-semibold hover:shadow-lg transform hover:-translate-y-0.5 transition-all duration-200`}
                                    >
                                        开始学习
                                    </Link>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-20">
                        <div className="text-6xl mb-4">🔍</div>
                        <h3 className="text-2xl font-semibold text-gray-900 mb-2">
                            未找到匹配的课程
                        </h3>
                        <p className="text-gray-600">
                            请尝试调整筛选条件
                        </p>
                    </div>
                )}

                {/* Learning Path */}
                <div className="mt-16 bg-gradient-to-br from-cyan-50 to-blue-50 rounded-3xl p-8 lg:p-12 border border-cyan-100">
                    <div className="text-center mb-8">
                        <h2 className="text-3xl font-bold text-gray-900 mb-4">
                            学习路径建议
                        </h2>
                        <p className="text-lg text-gray-600">
                            按照单元顺序循序渐进，从汝瓷基础知识到高级应用
                        </p>
                    </div>
                    <div className="grid md:grid-cols-3 gap-6">
                        <div className="bg-white rounded-xl p-6 text-center">
                            <div className="w-12 h-12 bg-green-100 text-green-600 rounded-full flex items-center justify-center text-2xl mx-auto mb-3">
                                1️⃣
                            </div>
                            <h3 className="font-bold text-gray-900 mb-2">初级阶段</h3>
                            <p className="text-sm text-gray-600">Unit 1-2：了解汝瓷基础与釉色艺术</p>
                        </div>
                        <div className="bg-white rounded-xl p-6 text-center">
                            <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-2xl mx-auto mb-3">
                                2️⃣
                            </div>
                            <h3 className="font-bold text-gray-900 mb-2">中级阶段</h3>
                            <p className="text-sm text-gray-600">Unit 3-5：深入学习工艺、造型与设计</p>
                        </div>
                        <div className="bg-white rounded-xl p-6 text-center">
                            <div className="w-12 h-12 bg-purple-100 text-purple-600 rounded-full flex items-center justify-center text-2xl mx-auto mb-3">
                                3️⃣
                            </div>
                            <h3 className="font-bold text-gray-900 mb-2">高级阶段</h3>
                            <p className="text-sm text-gray-600">Unit 6-10：掌握生产、贸易与文化传播</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
