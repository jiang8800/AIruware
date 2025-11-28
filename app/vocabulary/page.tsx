'use client'

import { useState } from 'react'
import VocabularyCard from '@/components/VocabularyCard'

export default function VocabularyPage() {
    const [searchQuery, setSearchQuery] = useState('')
    const [selectedLevel, setSelectedLevel] = useState('全部')
    const [selectedPartOfSpeech, setSelectedPartOfSpeech] = useState('全部')

    const levels = ['全部', '基础', '进阶', '高级']
    const partsOfSpeech = ['全部', 'n.', 'v.', 'adj.', 'adv.', 'prep.']

    const vocabularyData = [
        {
            word: 'accomplish',
            phonetic: '/əˈkʌmplɪʃ/',
            partOfSpeech: 'v.',
            definition: '完成；实现；达到',
            example: 'She accomplished her goal of running a marathon.',
            level: '进阶',
        },
        {
            word: 'benefit',
            phonetic: '/ˈbenɪfɪt/',
            partOfSpeech: 'n.',
            definition: '利益；好处；优势',
            example: 'Regular exercise has many health benefits.',
            level: '基础',
        },
        {
            word: 'challenge',
            phonetic: '/ˈtʃælɪndʒ/',
            partOfSpeech: 'n.',
            definition: '挑战；难题',
            example: 'Learning a new language is always a challenge.',
            level: '基础',
        },
        {
            word: 'determine',
            phonetic: '/dɪˈtɜːmɪn/',
            partOfSpeech: 'v.',
            definition: '决定；确定；测定',
            example: 'We need to determine the best course of action.',
            level: '进阶',
        },
        {
            word: 'efficient',
            phonetic: '/ɪˈfɪʃnt/',
            partOfSpeech: 'adj.',
            definition: '效率高的；有能力的',
            example: 'This is a very efficient way to solve the problem.',
            level: '进阶',
        },
        {
            word: 'fundamental',
            phonetic: '/ˌfʌndəˈmentl/',
            partOfSpeech: 'adj.',
            definition: '基本的；根本的；重要的',
            example: 'These are the fundamental principles of physics.',
            level: '高级',
        },
        {
            word: 'gradually',
            phonetic: '/ˈɡrædʒuəli/',
            partOfSpeech: 'adv.',
            definition: '逐渐地；渐渐地',
            example: 'The weather gradually improved throughout the day.',
            level: '进阶',
        },
        {
            word: 'hypothesis',
            phonetic: '/haɪˈpɒθəsɪs/',
            partOfSpeech: 'n.',
            definition: '假说；假设',
            example: 'Scientists tested their hypothesis through experiments.',
            level: '高级',
        },
        {
            word: 'implement',
            phonetic: '/ˈɪmplɪment/',
            partOfSpeech: 'v.',
            definition: '实施；执行；贯彻',
            example: 'The company will implement the new policy next month.',
            level: '高级',
        },
    ]

    const filteredVocabulary = vocabularyData.filter(item => {
        const matchesSearch = item.word.toLowerCase().includes(searchQuery.toLowerCase()) ||
            item.definition.includes(searchQuery)
        const matchesLevel = selectedLevel === '全部' || item.level === selectedLevel
        const matchesPartOfSpeech = selectedPartOfSpeech === '全部' || item.partOfSpeech === selectedPartOfSpeech
        return matchesSearch && matchesLevel && matchesPartOfSpeech
    })

    return (
        <div className="py-12">
            <div className="container-custom">
                {/* Header */}
                <div className="text-center mb-12">
                    <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
                        词汇库
                    </h1>
                    <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                        精选高频词汇，配合音标、例句和发音，助您高效记忆
                    </p>
                </div>

                {/* Search and Filters */}
                <div className="bg-white rounded-2xl shadow-md p-6 mb-8">
                    {/* Search Bar */}
                    <div className="mb-6">
                        <div className="relative">
                            <input
                                type="text"
                                placeholder="搜索单词或释义..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="w-full px-12 py-4 rounded-xl border-2 border-gray-200 focus:border-primary-500 focus:outline-none transition-colors text-lg"
                            />
                            <svg
                                className="absolute left-4 top-1/2 transform -translate-y-1/2 w-6 h-6 text-gray-400"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                            </svg>
                            {searchQuery && (
                                <button
                                    onClick={() => setSearchQuery('')}
                                    className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                                >
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                    </svg>
                                </button>
                            )}
                        </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-6">
                        {/* Level Filter */}
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-3">
                                难度等级
                            </label>
                            <div className="flex flex-wrap gap-2">
                                {levels.map((level) => (
                                    <button
                                        key={level}
                                        onClick={() => setSelectedLevel(level)}
                                        className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 ${selectedLevel === level
                                                ? 'bg-gradient-to-r from-primary-600 to-secondary-600 text-white shadow-lg'
                                                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                            }`}
                                    >
                                        {level}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Part of Speech Filter */}
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-3">
                                词性
                            </label>
                            <div className="flex flex-wrap gap-2">
                                {partsOfSpeech.map((pos) => (
                                    <button
                                        key={pos}
                                        onClick={() => setSelectedPartOfSpeech(pos)}
                                        className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 ${selectedPartOfSpeech === pos
                                                ? 'bg-gradient-to-r from-primary-600 to-secondary-600 text-white shadow-lg'
                                                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                            }`}
                                    >
                                        {pos === '全部' ? '全部' : pos}
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                    <div className="bg-gradient-to-br from-blue-500 to-cyan-500 rounded-xl p-6 text-white">
                        <div className="text-3xl font-bold mb-1">{vocabularyData.length}</div>
                        <div className="text-sm opacity-90">总词汇量</div>
                    </div>
                    <div className="bg-gradient-to-br from-green-500 to-emerald-500 rounded-xl p-6 text-white">
                        <div className="text-3xl font-bold mb-1">156</div>
                        <div className="text-sm opacity-90">已掌握</div>
                    </div>
                    <div className="bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl p-6 text-white">
                        <div className="text-3xl font-bold mb-1">28</div>
                        <div className="text-sm opacity-90">本周新学</div>
                    </div>
                    <div className="bg-gradient-to-br from-orange-500 to-red-500 rounded-xl p-6 text-white">
                        <div className="text-3xl font-bold mb-1">45</div>
                        <div className="text-sm opacity-90">待复习</div>
                    </div>
                </div>

                {/* Results Count */}
                <div className="mb-6">
                    <p className="text-gray-600">
                        找到 <span className="font-semibold text-primary-600">{filteredVocabulary.length}</span> 个单词
                    </p>
                </div>

                {/* Vocabulary Grid */}
                {filteredVocabulary.length > 0 ? (
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {filteredVocabulary.map((item, index) => (
                            <VocabularyCard key={index} {...item} />
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-20">
                        <div className="text-6xl mb-4">🔍</div>
                        <h3 className="text-2xl font-semibold text-gray-900 mb-2">
                            未找到匹配的单词
                        </h3>
                        <p className="text-gray-600">
                            请尝试调整搜索条件或筛选选项
                        </p>
                    </div>
                )}
            </div>
        </div>
    )
}
