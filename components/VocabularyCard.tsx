interface VocabularyCardProps {
    word: string
    phonetic: string
    partOfSpeech: string
    definition: string
    example: string
    level: string
}

export default function VocabularyCard({
    word,
    phonetic,
    partOfSpeech,
    definition,
    example,
    level,
}: VocabularyCardProps) {
    const levelColors = {
        '基础': 'bg-green-100 text-green-700 border-green-200',
        '进阶': 'bg-blue-100 text-blue-700 border-blue-200',
        '高级': 'bg-purple-100 text-purple-700 border-purple-200',
    }

    const partOfSpeechColors = {
        'n.': 'bg-pink-50 text-pink-700',
        'v.': 'bg-blue-50 text-blue-700',
        'adj.': 'bg-green-50 text-green-700',
        'adv.': 'bg-yellow-50 text-yellow-700',
        'prep.': 'bg-purple-50 text-purple-700',
    }

    return (
        <div className="card p-6 group hover:shadow-2xl transition-all duration-300">
            <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-2">
                        <h3 className="text-2xl font-bold text-gray-900 group-hover:text-primary-600 transition-colors">
                            {word}
                        </h3>
                        <span className={`px-2 py-1 rounded text-xs font-semibold ${partOfSpeechColors[partOfSpeech as keyof typeof partOfSpeechColors]}`}>
                            {partOfSpeech}
                        </span>
                    </div>
                    <p className="text-gray-500 text-sm">{phonetic}</p>
                </div>
                <div className="flex flex-col items-end space-y-2">
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold border ${levelColors[level as keyof typeof levelColors]}`}>
                        {level}
                    </span>
                    <button
                        className="p-2 hover:bg-primary-50 rounded-lg transition-colors group/btn"
                        aria-label="发音"
                    >
                        <svg className="w-5 h-5 text-gray-400 group-hover/btn:text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" />
                        </svg>
                    </button>
                </div>
            </div>

            <div className="space-y-3">
                <div>
                    <span className="text-sm font-semibold text-gray-700">释义：</span>
                    <p className="text-gray-600 mt-1">{definition}</p>
                </div>

                <div className="pt-3 border-t border-gray-100">
                    <span className="text-sm font-semibold text-gray-700">例句：</span>
                    <p className="text-gray-600 italic mt-1">{example}</p>
                </div>
            </div>

            <div className="mt-4 pt-4 border-t border-gray-100 flex items-center justify-between">
                <button className="text-sm text-primary-600 hover:text-primary-700 font-medium flex items-center">
                    <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
                    </svg>
                    收藏
                </button>
                <button className="text-sm text-gray-500 hover:text-gray-700 font-medium flex items-center">
                    <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
                    </svg>
                    分享
                </button>
            </div>
        </div>
    )
}
