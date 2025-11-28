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

export default function CourseDetailPage({ params }: { params: { id: string } }) {
    const [chapter, setChapter] = useState<Chapter | null>(null)
    const [loading, setLoading] = useState(true)
    const [activeTab, setActiveTab] = useState('overview')

    useEffect(() => {
        // Load chapter data from JSON file
        fetch('/data/chapters.json')
            .then(response => response.json())
            .then(data => {
                const foundChapter = data.chapters.find((ch: Chapter) => ch.id === parseInt(params.id))
                setChapter(foundChapter || null)
                setLoading(false)
            })
            .catch(error => {
                console.error('Error loading chapter:', error)
                setLoading(false)
            })
    }, [params.id])

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

    if (!chapter) {
        return (
            <div className="py-20">
                <div className="container-custom">
                    <div className="text-center">
                        <div className="text-6xl mb-4">😕</div>
                        <h2 className="text-2xl font-bold text-gray-900 mb-2">课程未找到</h2>
                        <p className="text-gray-600 mb-6">抱歉，该课程不存在</p>
                        <Link href="/courses" className="btn-primary inline-block">
                            返回课程目录
                        </Link>
                    </div>
                </div>
            </div>
        )
    }

    const levelColors = {
        '初级': 'bg-green-100 text-green-700 border-green-200',
        '中级': 'bg-blue-100 text-blue-700 border-blue-200',
        '高级': 'bg-purple-100 text-purple-700 border-purple-200',
    }

    return (
        <div className="py-12">
            <div className="container-custom">
                {/* Breadcrumb */}
                <nav className="mb-8 flex items-center space-x-2 text-sm">
                    <Link href="/" className="text-gray-500 hover:text-cyan-600 transition-colors">
                        首页
                    </Link>
                    <span className="text-gray-400">/</span>
                    <Link href="/courses" className="text-gray-500 hover:text-cyan-600 transition-colors">
                        课程目录
                    </Link>
                    <span className="text-gray-400">/</span>
                    <span className="text-gray-900 font-medium">{chapter.titleCN}</span>
                </nav>

                {/* Hero Section */}
                <div className={`bg-gradient-to-r ${chapter.color} rounded-3xl p-8 lg:p-12 text-white mb-12 relative overflow-hidden`}>
                    <div className="absolute top-0 right-0 text-9xl opacity-10 -mr-8 -mt-8">
                        {chapter.icon}
                    </div>
                    <div className="relative z-10">
                        <div className="flex items-center gap-3 mb-4">
                            <span className={`bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full text-sm font-semibold border border-white/30`}>
                                Unit {chapter.id}
                            </span>
                            <span className="bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full text-sm font-semibold border border-white/30">
                                {chapter.level}
                            </span>
                        </div>
                        <h1 className="text-4xl lg:text-5xl font-bold mb-4">{chapter.title}</h1>
                        <h2 className="text-2xl lg:text-3xl font-medium opacity-90 mb-6">{chapter.titleCN}</h2>
                        <p className="text-lg opacity-90 max-w-3xl">{chapter.description}</p>
                        <div className="flex flex-wrap gap-6 mt-8 text-sm">
                            <div className="flex items-center">
                                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                                {chapter.duration}
                            </div>
                            <div className="flex items-center">
                                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                                </svg>
                                {chapter.lessons} 个部分
                            </div>
                        </div>
                    </div>
                </div>

                {/* Tab Navigation */}
                <div className="bg-white rounded-2xl shadow-md mb-8 overflow-hidden">
                    <div className="flex border-b border-gray-200">
                        <button
                            onClick={() => setActiveTab('overview')}
                            className={`flex-1 px-6 py-4 font-semibold transition-colors ${activeTab === 'overview'
                                    ? 'bg-cyan-50 text-cyan-700 border-b-2 border-cyan-600'
                                    : 'text-gray-600 hover:bg-gray-50'
                                }`}
                        >
                            课程概览
                        </button>
                        <button
                            onClick={() => setActiveTab('content')}
                            className={`flex-1 px-6 py-4 font-semibold transition-colors ${activeTab === 'content'
                                    ? 'bg-cyan-50 text-cyan-700 border-b-2 border-cyan-600'
                                    : 'text-gray-600 hover:bg-gray-50'
                                }`}
                        >
                            课程内容
                        </button>
                        <button
                            onClick={() => setActiveTab('culture')}
                            className={`flex-1 px-6 py-4 font-semibold transition-colors ${activeTab === 'culture'
                                    ? 'bg-cyan-50 text-cyan-700 border-b-2 border-cyan-600'
                                    : 'text-gray-600 hover:bg-gray-50'
                                }`}
                        >
                            文化背景
                        </button>
                    </div>
                </div>

                {/* Content Area */}
                <div className="grid lg:grid-cols-3 gap-8">
                    {/* Main Content */}
                    <div className="lg:col-span-2 space-y-8">
                        {/* Overview Tab */}
                        {activeTab === 'overview' && (
                            <>
                                {/* Introduction */}
                                <div className="card p-8">
                                    <h3 className="text-2xl font-bold text-gray-900 mb-6">课程简介</h3>
                                    <div className="prose prose-lg max-w-none">
                                        <p className="text-gray-700 leading-relaxed mb-4">
                                            本单元将深入探讨汝瓷的历史、工艺和文化价值。通过系统的学习，您将掌握相关的英语专业词汇，
                                            提升在文化交流场景中的语言表达能力。
                                        </p>
                                        <p className="text-gray-700 leading-relaxed">
                                            课程采用中英双语教学，结合丰富的图文资料和实践练习，帮助您在学习英语的同时，
                                            深入了解中国传统陶瓷文化的精髓。
                                        </p>
                                    </div>
                                </div>

                                {/* Bilingual Content Block */}
                                <div className="card overflow-hidden">
                                    <div className="bg-gradient-to-r from-cyan-500 to-blue-500 px-8 py-4 text-white">
                                        <h3 className="text-xl font-bold flex items-center">
                                            <svg className="w-6 h-6 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129" />
                                            </svg>
                                            中英对照学习
                                        </h3>
                                    </div>
                                    <div className="p-8 space-y-6">
                                        <div className="bg-gradient-to-r from-blue-50 to-cyan-50 rounded-xl p-6 border-l-4 border-cyan-500">
                                            <h4 className="font-bold text-gray-900 mb-3 text-lg">English</h4>
                                            <p className="text-gray-800 leading-relaxed mb-4">
                                                Ru ware is one of the five famous kilns of the Song Dynasty, renowned for its exquisite sky-blue glaze
                                                and delicate crackle patterns. The glaze color resembles the clear sky after rain, creating a serene
                                                and elegant aesthetic that has captivated collectors for centuries.
                                            </p>
                                            <h4 className="font-bold text-gray-900 mb-3 text-lg">中文</h4>
                                            <p className="text-gray-700 leading-relaxed">
                                                汝窑是宋代五大名窑之一，以其精美的天青釉色和细腻的开片纹理而闻名。釉色如雨过天青，
                                                营造出宁静优雅的美学意境，数百年来深受收藏家的喜爱。
                                            </p>
                                        </div>

                                        <div className="grid md:grid-cols-2 gap-4">
                                            <div className="bg-white border-2 border-gray-200 rounded-lg p-4">
                                                <div className="text-sm font-semibold text-cyan-600 mb-2">Key Vocabulary</div>
                                                <ul className="space-y-2 text-sm">
                                                    <li className="flex items-start">
                                                        <span className="text-cyan-500 mr-2">•</span>
                                                        <span><strong>kiln</strong> /kɪln/ n. 窑</span>
                                                    </li>
                                                    <li className="flex items-start">
                                                        <span className="text-cyan-500 mr-2">•</span>
                                                        <span><strong>glaze</strong> /ɡleɪz/ n. 釉</span>
                                                    </li>
                                                    <li className="flex items-start">
                                                        <span className="text-cyan-500 mr-2">•</span>
                                                        <span><strong>crackle</strong> /ˈkrækl/ n. 开片</span>
                                                    </li>
                                                </ul>
                                            </div>
                                            <div className="bg-white border-2 border-gray-200 rounded-lg p-4">
                                                <div className="text-sm font-semibold text-cyan-600 mb-2">Cultural Notes</div>
                                                <p className="text-sm text-gray-700 leading-relaxed">
                                                    汝窑瓷器在宋代仅烧制了约20年，传世品极为稀少，因此具有极高的收藏价值。
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Ru Porcelain Image Gallery */}
                                <div className="card overflow-hidden">
                                    <div className="bg-gradient-to-r from-purple-500 to-pink-500 px-8 py-4 text-white">
                                        <h3 className="text-xl font-bold flex items-center">
                                            <svg className="w-6 h-6 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                            </svg>
                                            汝瓷图文赏析
                                        </h3>
                                    </div>
                                    <div className="p-8 space-y-6">
                                        <div className="grid md:grid-cols-2 gap-6">
                                            <div className="space-y-3">
                                                <div className="aspect-video bg-gradient-to-br from-cyan-100 to-blue-100 rounded-xl overflow-hidden">
                                                    <div className="w-full h-full flex items-center justify-center text-cyan-600">
                                                        <div className="text-center">
                                                            <div className="text-6xl mb-2">🏺</div>
                                                            <p className="text-sm">汝瓷釉色</p>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="bg-gray-50 rounded-lg p-4">
                                                    <h4 className="font-bold text-gray-900 mb-2">Sky-Blue Glaze</h4>
                                                    <p className="text-sm text-gray-600">
                                                        The characteristic sky-blue celadon glaze that defines Ru ware&apos;s unique aesthetic.
                                                    </p>
                                                </div>
                                            </div>
                                            <div className="space-y-3">
                                                <div className="aspect-video bg-gradient-to-br from-green-100 to-emerald-100 rounded-xl overflow-hidden">
                                                    <div className="w-full h-full flex items-center justify-center text-green-600">
                                                        <div className="text-center">
                                                            <div className="text-6xl mb-2">⚒️</div>
                                                            <p className="text-sm">制作工艺</p>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="bg-gray-50 rounded-lg p-4">
                                                    <h4 className="font-bold text-gray-900 mb-2">Craftsmanship</h4>
                                                    <p className="text-sm text-gray-600">
                                                        Traditional techniques passed down through generations of master artisans.
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </>
                        )}

                        {/* Content Tab */}
                        {activeTab === 'content' && (
                            <div className="card p-8">
                                <h3 className="text-2xl font-bold text-gray-900 mb-6">课程大纲</h3>
                                <div className="space-y-4">
                                    {chapter.parts.map((part, index) => (
                                        <div
                                            key={index}
                                            className="flex items-start p-4 rounded-lg border-2 border-gray-200 hover:border-cyan-400 hover:bg-cyan-50 transition-all cursor-pointer group"
                                        >
                                            <div className={`w-10 h-10 bg-gradient-to-br ${chapter.color} rounded-full flex items-center justify-center text-white font-bold flex-shrink-0 mr-4 group-hover:scale-110 transition-transform`}>
                                                {index + 1}
                                            </div>
                                            <div className="flex-1">
                                                <h4 className="font-semibold text-gray-900 mb-1">{part}</h4>
                                                <p className="text-sm text-gray-600">
                                                    {index === 0 && '热身活动，激发学习兴趣'}
                                                    {index === 1 && '了解汝瓷的历史文化背景'}
                                                    {index === 2 && '学习核心词汇和语法结构'}
                                                    {index === 3 && '通过练习巩固所学知识'}
                                                    {index === 4 && 'AI辅助的个性化练习'}
                                                    {index === 5 && '深入探讨文化内涵'}
                                                    {index === 6 && '语法专项训练'}
                                                    {index === 7 && '综合项目实践'}
                                                    {index === 8 && '拓展学习资源'}
                                                    {index === 9 && '自我评估与反思'}
                                                </p>
                                            </div>
                                            <svg className="w-5 h-5 text-gray-400 group-hover:text-cyan-600 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                            </svg>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Culture Tab */}
                        {activeTab === 'culture' && (
                            <div className="space-y-6">
                                <div className="card p-8">
                                    <h3 className="text-2xl font-bold text-gray-900 mb-6">文化背景</h3>
                                    <div className="prose prose-lg max-w-none">
                                        <p className="text-gray-700 leading-relaxed mb-4">
                                            汝窑位于今河南省宝丰县，是北宋时期专为宫廷烧制瓷器的官窑。汝窑瓷器以其独特的天青釉色、
                                            精湛的制作工艺和稀少的传世量而闻名于世，被誉为"青瓷之冠"。
                                        </p>
                                        <p className="text-gray-700 leading-relaxed mb-4">
                                            汝窑的釉色如雨过天青，温润如玉，开片纹理自然优美。这种独特的美学特征体现了宋代文人追求
                                            "清雅"、"含蓄"的审美理想，对后世陶瓷艺术产生了深远影响。
                                        </p>
                                    </div>
                                </div>

                                <div className="card p-8 bg-gradient-to-br from-cyan-50 to-blue-50 border border-cyan-100">
                                    <h4 className="text-xl font-bold text-gray-900 mb-4">Historical Significance</h4>
                                    <p className="text-gray-700 leading-relaxed">
                                        Ru ware represents the pinnacle of Song Dynasty ceramic artistry. Its production lasted only about 20 years
                                        during the Northern Song period, making surviving pieces extremely rare and valuable. Today, Ru ware is
                                        considered one of China&apos;s greatest cultural treasures.
                                    </p>
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Sidebar */}
                    <div className="lg:col-span-1">
                        <div className="sticky top-24 space-y-6">
                            {/* Progress Card */}
                            <div className="card p-6">
                                <h3 className="font-semibold text-gray-900 mb-4">学习进度</h3>
                                <div className="space-y-4">
                                    <div>
                                        <div className="flex justify-between text-sm mb-2">
                                            <span className="text-gray-600">完成度</span>
                                            <span className="font-semibold text-cyan-600">0%</span>
                                        </div>
                                        <div className="w-full bg-gray-200 rounded-full h-2">
                                            <div
                                                className={`bg-gradient-to-r ${chapter.color} h-2 rounded-full transition-all duration-300`}
                                                style={{ width: '0%' }}
                                            ></div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Action Buttons */}
                            <div className="space-y-3">
                                <button className={`w-full bg-gradient-to-r ${chapter.color} text-white px-6 py-4 rounded-xl font-semibold shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-200`}>
                                    开始学习
                                </button>
                                <Link href="/courses" className="block w-full btn-secondary text-center">
                                    返回课程目录
                                </Link>
                            </div>

                            {/* Course Info */}
                            <div className="card p-6">
                                <h3 className="font-semibold text-gray-900 mb-4">课程信息</h3>
                                <ul className="space-y-3 text-sm">
                                    <li className="flex items-start">
                                        <svg className="w-5 h-5 text-cyan-500 mr-2 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                        </svg>
                                        <span className="text-gray-700">中英双语教学</span>
                                    </li>
                                    <li className="flex items-start">
                                        <svg className="w-5 h-5 text-cyan-500 mr-2 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                        </svg>
                                        <span className="text-gray-700">AI智能辅导</span>
                                    </li>
                                    <li className="flex items-start">
                                        <svg className="w-5 h-5 text-cyan-500 mr-2 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                        </svg>
                                        <span className="text-gray-700">随时随地学习</span>
                                    </li>
                                    <li className="flex items-start">
                                        <svg className="w-5 h-5 text-cyan-500 mr-2 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                        </svg>
                                        <span className="text-gray-700">互动练习题</span>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
