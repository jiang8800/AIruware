'use client'

import { useState } from 'react'

interface Message {
    role: 'user' | 'assistant'
    content: string
}

interface AssistantResponse {
    improvedSentence: string
    explanation: string
    grammarPoints?: string[]
    vocabularyTips?: string[]
}

export default function AIAssistantPage() {
    const [input, setInput] = useState('')
    const [messages, setMessages] = useState<Message[]>([])
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('')

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        if (!input.trim()) return

        const userMessage = input.trim()
        setInput('')
        setLoading(true)
        setError('')

        // Add user message to chat
        setMessages(prev => [...prev, { role: 'user', content: userMessage }])

        try {
            const response = await fetch('/api/assistant', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ sentence: userMessage }),
            })

            if (!response.ok) {
                const errorData = await response.json()
                throw new Error(errorData.error || 'Failed to get response')
            }

            const data: AssistantResponse = await response.json()

            // Format assistant response
            let assistantMessage = `**更地道的表达：**\n${data.improvedSentence}\n\n**解释：**\n${data.explanation}`

            if (data.grammarPoints && data.grammarPoints.length > 0) {
                assistantMessage += `\n\n**语法要点：**\n${data.grammarPoints.map(point => `• ${point}`).join('\n')}`
            }

            if (data.vocabularyTips && data.vocabularyTips.length > 0) {
                assistantMessage += `\n\n**词汇建议：**\n${data.vocabularyTips.map(tip => `• ${tip}`).join('\n')}`
            }

            setMessages(prev => [...prev, { role: 'assistant', content: assistantMessage }])
        } catch (err) {
            setError(err instanceof Error ? err.message : 'An error occurred')
            console.error('Error:', err)
        } finally {
            setLoading(false)
        }
    }

    const clearChat = () => {
        setMessages([])
        setError('')
    }

    return (
        <div className="py-12">
            <div className="container-custom max-w-5xl">
                {/* Header */}
                <div className="text-center mb-12">
                    <div className="inline-block mb-4">
                        <span className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-4 py-2 rounded-full text-sm font-semibold shadow-lg">
                            🤖 AI 智能助教
                        </span>
                    </div>
                    <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
                        英语表达优化助手
                    </h1>
                    <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                        输入您的英文句子，AI助教会帮您优化表达，让您的英语更加地道自然
                    </p>
                </div>

                {/* Features */}
                <div className="grid md:grid-cols-3 gap-6 mb-12">
                    <div className="card p-6 text-center">
                        <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-full flex items-center justify-center text-2xl mx-auto mb-3">
                            ✨
                        </div>
                        <h3 className="font-bold text-gray-900 mb-2">表达优化</h3>
                        <p className="text-sm text-gray-600">提供更地道、更自然的英文表达</p>
                    </div>
                    <div className="card p-6 text-center">
                        <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-2xl mx-auto mb-3">
                            📚
                        </div>
                        <h3 className="font-bold text-gray-900 mb-2">详细解释</h3>
                        <p className="text-sm text-gray-600">解释为什么这样表达更好</p>
                    </div>
                    <div className="card p-6 text-center">
                        <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-500 rounded-full flex items-center justify-center text-2xl mx-auto mb-3">
                            🎯
                        </div>
                        <h3 className="font-bold text-gray-900 mb-2">实时反馈</h3>
                        <p className="text-sm text-gray-600">即时获得语法和词汇建议</p>
                    </div>
                </div>

                {/* Chat Container */}
                <div className="card p-6 mb-6">
                    {/* Messages */}
                    <div className="mb-6 space-y-4 min-h-[400px] max-h-[600px] overflow-y-auto">
                        {messages.length === 0 ? (
                            <div className="flex items-center justify-center h-[400px]">
                                <div className="text-center">
                                    <div className="text-6xl mb-4">💬</div>
                                    <h3 className="text-xl font-semibold text-gray-900 mb-2">
                                        开始对话
                                    </h3>
                                    <p className="text-gray-600">
                                        输入您想要优化的英文句子，AI助教会帮您改进
                                    </p>
                                </div>
                            </div>
                        ) : (
                            messages.map((message, index) => (
                                <div
                                    key={index}
                                    className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
                                >
                                    <div
                                        className={`max-w-[80%] rounded-2xl px-6 py-4 ${message.role === 'user'
                                                ? 'bg-gradient-to-r from-cyan-500 to-blue-500 text-white'
                                                : 'bg-gray-100 text-gray-900'
                                            }`}
                                    >
                                        {message.role === 'assistant' ? (
                                            <div className="prose prose-sm max-w-none">
                                                {message.content.split('\n').map((line, i) => {
                                                    if (line.startsWith('**') && line.endsWith('**')) {
                                                        return (
                                                            <h4 key={i} className="font-bold text-gray-900 mt-3 mb-2">
                                                                {line.replace(/\*\*/g, '')}
                                                            </h4>
                                                        )
                                                    }
                                                    if (line.startsWith('• ')) {
                                                        return (
                                                            <li key={i} className="text-gray-700 ml-4">
                                                                {line.substring(2)}
                                                            </li>
                                                        )
                                                    }
                                                    if (line.trim()) {
                                                        return (
                                                            <p key={i} className="text-gray-700 mb-2">
                                                                {line}
                                                            </p>
                                                        )
                                                    }
                                                    return <br key={i} />
                                                })}
                                            </div>
                                        ) : (
                                            <p className="whitespace-pre-wrap">{message.content}</p>
                                        )}
                                    </div>
                                </div>
                            ))
                        )}
                        {loading && (
                            <div className="flex justify-start">
                                <div className="bg-gray-100 rounded-2xl px-6 py-4">
                                    <div className="flex items-center space-x-2">
                                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></div>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Error Message */}
                    {error && (
                        <div className="mb-4 p-4 bg-red-50 border-l-4 border-red-500 rounded">
                            <div className="flex items-start">
                                <svg className="w-5 h-5 text-red-500 mr-2 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                                <div>
                                    <p className="text-sm font-semibold text-red-800">错误</p>
                                    <p className="text-sm text-red-700">{error}</p>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Input Form */}
                    <form onSubmit={handleSubmit} className="flex gap-3">
                        <input
                            type="text"
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            placeholder="输入您的英文句子..."
                            className="flex-1 px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-cyan-500 focus:outline-none transition-colors"
                            disabled={loading}
                        />
                        <button
                            type="submit"
                            disabled={loading || !input.trim()}
                            className="bg-gradient-to-r from-cyan-600 to-blue-600 text-white px-8 py-3 rounded-xl font-semibold hover:shadow-lg transform hover:-translate-y-0.5 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                        >
                            {loading ? '处理中...' : '发送'}
                        </button>
                        {messages.length > 0 && (
                            <button
                                type="button"
                                onClick={clearChat}
                                className="px-6 py-3 border-2 border-gray-300 text-gray-700 rounded-xl font-semibold hover:bg-gray-50 transition-colors"
                            >
                                清空
                            </button>
                        )}
                    </form>
                </div>

                {/* Examples */}
                <div className="card p-8 bg-gradient-to-br from-purple-50 to-pink-50 border border-purple-100">
                    <h3 className="text-xl font-bold text-gray-900 mb-4">💡 示例句子</h3>
                    <div className="grid md:grid-cols-2 gap-4">
                        <button
                            onClick={() => setInput('I want to buy some Ru ware porcelain.')}
                            className="text-left p-4 bg-white rounded-lg hover:shadow-md transition-shadow border-2 border-transparent hover:border-purple-300"
                        >
                            <p className="text-sm text-gray-600 mb-1">点击使用：</p>
                            <p className="text-gray-900">I want to buy some Ru ware porcelain.</p>
                        </button>
                        <button
                            onClick={() => setInput('The color of Ru ware is very beautiful.')}
                            className="text-left p-4 bg-white rounded-lg hover:shadow-md transition-shadow border-2 border-transparent hover:border-purple-300"
                        >
                            <p className="text-sm text-gray-600 mb-1">点击使用：</p>
                            <p className="text-gray-900">The color of Ru ware is very beautiful.</p>
                        </button>
                        <button
                            onClick={() => setInput('Can you tell me about the history of Ru ware?')}
                            className="text-left p-4 bg-white rounded-lg hover:shadow-md transition-shadow border-2 border-transparent hover:border-purple-300"
                        >
                            <p className="text-sm text-gray-600 mb-1">点击使用：</p>
                            <p className="text-gray-900">Can you tell me about the history of Ru ware?</p>
                        </button>
                        <button
                            onClick={() => setInput('I am interested in learning more about Chinese ceramics.')}
                            className="text-left p-4 bg-white rounded-lg hover:shadow-md transition-shadow border-2 border-transparent hover:border-purple-300"
                        >
                            <p className="text-sm text-gray-600 mb-1">点击使用：</p>
                            <p className="text-gray-900">I am interested in learning more about Chinese ceramics.</p>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}
