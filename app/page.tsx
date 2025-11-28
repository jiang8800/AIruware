'use client'

import Link from 'next/link'
import { useState } from 'react'

export default function HomePage() {
    const [expandedUnit, setExpandedUnit] = useState<number | null>(null)

    const units = [
        {
            number: 1,
            title: 'Introduction to Ru Ware',
            description: '探索汝瓷的起源与基础知识',
            icon: '🏺',
            parts: [
                'Warm-up',
                'Ru Ware Background',
                'Language Focus',
                'Skills Practice',
                'AI-Powered Practice',
                'Cultural Insight',
                'Project Task',
                'Extended Resources',
                'Self-Assessment',
            ],
        },
        {
            number: 2,
            title: 'The Art of Ru Ware Glaze',
            description: '深入了解汝瓷釉色的艺术',
            icon: '🎨',
            parts: [
                'Warm-up',
                'Ru Ware Background',
                'Language Focus',
                'Skills Practice',
                'AI-Powered Practice',
                'Cultural Insight',
                'Grammar Workshop',
                'Project Task',
                'Extended Resources',
                'Self-Assessment',
            ],
        },
        {
            number: 3,
            title: 'Ru Ware Craftsmanship',
            description: '学习汝瓷的精湛工艺',
            icon: '⚒️',
            parts: [
                'Warm-up',
                'Ru Ware Background',
                'Language Focus',
                'Skills Practice',
                'AI-Powered Practice',
                'Cultural Insight',
                'Grammar Workshop',
                'Project Task',
                'Extended Resources',
                'Self-Assessment',
            ],
        },
        {
            number: 4,
            title: 'Ru Ware Forms and Decoration',
            description: '探索汝瓷的造型与装饰',
            icon: '✨',
            parts: [
                'Warm-up',
                'Ru Ware Background',
                'Language Focus',
                'Skills Practice',
                'AI-Powered Practice',
                'Cultural Insight',
                'Grammar Workshop',
                'Project Task',
                'Extended Resources',
                'Self-Assessment',
            ],
        },
        {
            number: 5,
            title: 'Ru Ware Design and Innovation',
            description: '汝瓷设计与创新发展',
            icon: '💡',
            parts: [
                'Warm-up',
                'Ru Ware Background',
                'Language Focus',
                'Skills Practice',
                'AI-Powered Practice',
                'Cultural Insight',
                'Grammar Workshop',
                'Project Task',
                'Extended Resources',
                'Self-Assessment',
            ],
        },
        {
            number: 6,
            title: 'Ru Ware Manufacturing and Smart Production',
            description: '现代汝瓷制造与智能生产',
            icon: '🏭',
            parts: [
                'Warm-up',
                'Ru Ware Background',
                'Language Focus',
                'Skills Practice',
                'AI-Powered Practice',
                'Cultural Insight',
                'Grammar Workshop',
                'Project Task',
                'Extended Resources',
                'Self-Assessment',
            ],
        },
        {
            number: 7,
            title: 'Marketing and International Trade of Ru Ware',
            description: '汝瓷的市场营销与国际贸易',
            icon: '🌍',
            parts: [
                'Warm-up',
                'Ru Ware Background',
                'Language Focus',
                'Skills Practice',
                'AI-Powered Practice',
                'Cultural Insight',
                'Grammar Workshop',
                'Project Task',
                'Extended Resources',
                'Self-Assessment',
            ],
        },
        {
            number: 8,
            title: 'Appreciation and Collection of Ru Ware',
            description: '汝瓷鉴赏与收藏',
            icon: '🔍',
            parts: [
                'Warm-up',
                'Ru Ware Background',
                'Language Focus',
                'Skills Practice',
                'AI-Powered Practice',
                'Cultural Insight',
                'Grammar Workshop',
                'Project Task',
                'Extended Resources',
                'Self-Assessment',
            ],
        },
        {
            number: 9,
            title: 'Ru Ware Culture and Cross-Cultural Communication',
            description: '汝瓷文化与跨文化交流',
            icon: '🤝',
            parts: [
                'Warm-up',
                'Ru Ware Background',
                'Language Focus',
                'Skills Practice',
                'AI-Powered Practice',
                'Cultural Insight',
                'Grammar Workshop',
                'Project Task',
                'Extended Resources',
                'Self-Assessment',
            ],
        },
        {
            number: 10,
            title: 'Ru Ware Restoration and Conservation',
            description: '汝瓷修复与保护',
            icon: '🛡️',
            parts: [
                'Warm-up',
                'Ru Ware Background',
                'Language Focus',
                'Skills Practice',
                'AI-Powered Practice',
                'Cultural Insight',
                'Grammar Workshop',
                'Project Task',
                'Extended Resources',
                'Self-Assessment',
            ],
        },
    ]

    return (
        <div className="overflow-hidden">
            {/* Hero Banner with Ru Ware Background */}
            <section className="relative h-[600px] flex items-center justify-center overflow-hidden">
                {/* Background Image Overlay */}
                <div className="absolute inset-0 bg-gradient-to-br from-cyan-900/90 via-blue-900/85 to-slate-900/90 z-10"></div>
                <div
                    className="absolute inset-0 bg-cover bg-center opacity-40"
                    style={{
                        backgroundImage: 'url(data:image/svg+xml,%3Csvg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="none" fill-rule="evenodd"%3E%3Cg fill="%239C92AC" fill-opacity="0.1"%3E%3Cpath d="M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z"/%3E%3Cg%3E%3C/g%3E%3C/svg%3E)',
                    }}
                ></div>

                {/* Content */}
                <div className="container-custom relative z-20 text-center text-white">
                    <div className="inline-block mb-6">
                        <span className="bg-cyan-400/20 backdrop-blur-sm border border-cyan-300/30 px-6 py-2 rounded-full text-sm font-semibold">
                            🏺 传承千年文化 · 创新英语学习
                        </span>
                    </div>

                    <h1 className="text-5xl lg:text-7xl font-bold mb-6 leading-tight">
                        <span className="block mb-2">AI时代汝瓷英语</span>
                        <span className="text-3xl lg:text-4xl font-normal text-cyan-200">
                            Ru Ware English in the AI Era
                        </span>
                    </h1>

                    <p className="text-xl lg:text-2xl mb-10 max-w-3xl mx-auto leading-relaxed text-gray-100">
                        融合中国传统汝瓷文化与现代英语教学，通过AI技术打造沉浸式学习体验
                    </p>

                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <button className="bg-gradient-to-r from-cyan-500 to-blue-500 text-white px-10 py-4 rounded-xl font-semibold text-lg shadow-2xl hover:shadow-cyan-500/50 transform hover:-translate-y-1 transition-all duration-200">
                            开始学习
                        </button>
                        <button className="bg-white/10 backdrop-blur-sm border-2 border-white/30 text-white px-10 py-4 rounded-xl font-semibold text-lg hover:bg-white/20 transition-all duration-200">
                            了解更多
                        </button>
                    </div>
                </div>

                {/* Decorative Elements */}
                <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-white to-transparent z-20"></div>
            </section>

            {/* Course Introduction */}
            <section className="py-20 bg-white">
                <div className="container-custom">
                    <div className="max-w-4xl mx-auto text-center mb-16">
                        <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
                            教材介绍
                        </h2>
                        <p className="text-xl text-gray-600 leading-relaxed">
                            本教材以中国传统汝瓷文化为主线，系统性地将英语语言学习与文化传承相结合。
                            通过10个精心设计的单元，从汝瓷的历史起源到现代创新，全方位提升您的英语能力和文化素养。
                        </p>
                    </div>

                    {/* Key Features */}
                    <div className="grid md:grid-cols-3 gap-8 mb-16">
                        <div className="text-center p-8 rounded-2xl bg-gradient-to-br from-cyan-50 to-blue-50 border border-cyan-100">
                            <div className="w-16 h-16 bg-gradient-to-br from-cyan-500 to-blue-500 rounded-2xl flex items-center justify-center text-3xl mx-auto mb-4">
                                🤖
                            </div>
                            <h3 className="text-xl font-bold text-gray-900 mb-3">AI智能辅导</h3>
                            <p className="text-gray-600">
                                每个单元配备AI驱动的练习系统，提供个性化学习反馈
                            </p>
                        </div>

                        <div className="text-center p-8 rounded-2xl bg-gradient-to-br from-purple-50 to-pink-50 border border-purple-100">
                            <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center text-3xl mx-auto mb-4">
                                🎯
                            </div>
                            <h3 className="text-xl font-bold text-gray-900 mb-3">系统化学习</h3>
                            <p className="text-gray-600">
                                10大单元，每单元9-10个部分，循序渐进掌握知识
                            </p>
                        </div>

                        <div className="text-center p-8 rounded-2xl bg-gradient-to-br from-green-50 to-emerald-50 border border-green-100">
                            <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-emerald-500 rounded-2xl flex items-center justify-center text-3xl mx-auto mb-4">
                                🌏
                            </div>
                            <h3 className="text-xl font-bold text-gray-900 mb-3">文化融合</h3>
                            <p className="text-gray-600">
                                深度融合汝瓷文化，培养跨文化交流能力
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Units Preview */}
            <section className="py-20 bg-gradient-to-br from-gray-50 to-blue-50">
                <div className="container-custom">
                    <div className="text-center mb-12">
                        <h2 className="text-4xl font-bold text-gray-900 mb-4">
                            课程章节
                        </h2>
                        <p className="text-xl text-gray-600">
                            10个单元，全面覆盖汝瓷文化与英语学习
                        </p>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-6 max-w-6xl mx-auto">
                        {units.map((unit) => (
                            <div
                                key={unit.number}
                                className="card overflow-hidden group cursor-pointer"
                                onClick={() => setExpandedUnit(expandedUnit === unit.number ? null : unit.number)}
                            >
                                <div className="bg-gradient-to-r from-cyan-500 to-blue-500 p-6 text-white">
                                    <div className="flex items-center justify-between mb-3">
                                        <div className="flex items-center space-x-4">
                                            <div className="text-5xl">{unit.icon}</div>
                                            <div>
                                                <div className="text-sm font-semibold opacity-90">Unit {unit.number}</div>
                                                <h3 className="text-xl font-bold">{unit.title}</h3>
                                            </div>
                                        </div>
                                        <svg
                                            className={`w-6 h-6 transition-transform duration-300 ${expandedUnit === unit.number ? 'rotate-180' : ''
                                                }`}
                                            fill="none"
                                            stroke="currentColor"
                                            viewBox="0 0 24 24"
                                        >
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                        </svg>
                                    </div>
                                    <p className="text-sm opacity-90">{unit.description}</p>
                                </div>

                                {/* Expandable Parts */}
                                <div
                                    className={`transition-all duration-300 overflow-hidden ${expandedUnit === unit.number ? 'max-h-[600px]' : 'max-h-0'
                                        }`}
                                >
                                    <div className="p-6 bg-white">
                                        <div className="space-y-2">
                                            {unit.parts.map((part, index) => (
                                                <div
                                                    key={index}
                                                    className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-50 transition-colors"
                                                >
                                                    <div className="w-8 h-8 bg-gradient-to-br from-cyan-100 to-blue-100 rounded-full flex items-center justify-center text-cyan-700 font-semibold text-sm flex-shrink-0">
                                                        {index + 1}
                                                    </div>
                                                    <span className="text-gray-700 font-medium">Part {index + 1}: {part}</span>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>

                                {/* Footer */}
                                <div className="px-6 py-4 bg-gray-50 border-t border-gray-100">
                                    <div className="flex items-center justify-between text-sm">
                                        <span className="text-gray-600">
                                            {unit.parts.length} 个部分
                                        </span>
                                        <span className="text-cyan-600 font-semibold group-hover:translate-x-1 transition-transform inline-flex items-center">
                                            查看详情
                                            <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                            </svg>
                                        </span>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-20 bg-white">
                <div className="container-custom">
                    <div className="bg-gradient-to-br from-cyan-600 via-blue-600 to-indigo-700 rounded-3xl p-12 lg:p-16 text-center text-white shadow-2xl relative overflow-hidden">
                        {/* Decorative Pattern */}
                        <div
                            className="absolute inset-0 opacity-10"
                            style={{
                                backgroundImage: 'url(data:image/svg+xml,%3Csvg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="none" fill-rule="evenodd"%3E%3Cg fill="%23ffffff" fill-opacity="1"%3E%3Cpath d="M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z"/%3E%3Cg%3E%3C/g%3E%3C/svg%3E)',
                            }}
                        ></div>

                        <div className="relative z-10">
                            <h2 className="text-4xl lg:text-5xl font-bold mb-6">
                                开启您的汝瓷英语学习之旅
                            </h2>
                            <p className="text-xl lg:text-2xl mb-10 opacity-95 max-w-2xl mx-auto">
                                传承千年文化，掌握国际语言，成就更好的自己
                            </p>
                            <div className="flex flex-col sm:flex-row gap-4 justify-center">
                                <Link
                                    href="/courses"
                                    className="bg-white text-cyan-600 px-10 py-4 rounded-xl font-bold text-lg shadow-xl hover:shadow-2xl transform hover:-translate-y-1 transition-all duration-200"
                                >
                                    立即开始学习
                                </Link>
                                <Link
                                    href="/vocabulary"
                                    className="bg-transparent border-2 border-white text-white px-10 py-4 rounded-xl font-bold text-lg hover:bg-white/10 transition-all duration-200"
                                >
                                    浏览词汇库
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}
