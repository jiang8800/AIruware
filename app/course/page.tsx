import { getAllChapters } from '@/lib/content'
import Link from 'next/link'

export default function CoursePage() {
    const chapters = getAllChapters()

    return (
        <div className="py-12">
            <div className="container-custom max-w-6xl">
                {/* Header */}
                <div className="text-center mb-12">
                    <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
                        汝瓷英语课程
                    </h1>
                    <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                        系统学习汝瓷文化与英语表达，共 {chapters.length} 个单元
                    </p>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
                    <div className="card p-6 text-center">
                        <div className="text-3xl font-bold text-cyan-600 mb-1">{chapters.length}</div>
                        <div className="text-sm text-gray-600">课程单元</div>
                    </div>
                    <div className="card p-6 text-center">
                        <div className="text-3xl font-bold text-blue-600 mb-1">
                            {chapters.reduce((sum, ch) => sum + (ch.frontmatter.lessons || 0), 0)}
                        </div>
                        <div className="text-sm text-gray-600">总课时</div>
                    </div>
                    <div className="card p-6 text-center">
                        <div className="text-3xl font-bold text-purple-600 mb-1">
                            {chapters.filter(ch => ch.frontmatter.level === '初级').length}
                        </div>
                        <div className="text-sm text-gray-600">初级课程</div>
                    </div>
                    <div className="card p-6 text-center">
                        <div className="text-3xl font-bold text-pink-600 mb-1">
                            {chapters.filter(ch => ch.frontmatter.level === '高级').length}
                        </div>
                        <div className="text-sm text-gray-600">高级课程</div>
                    </div>
                </div>

                {/* Chapter List */}
                <div className="space-y-6">
                    {chapters.length === 0 ? (
                        <div className="card p-12 text-center">
                            <div className="text-6xl mb-4">📚</div>
                            <h3 className="text-2xl font-bold text-gray-900 mb-2">暂无课程内容</h3>
                            <p className="text-gray-600 mb-6">
                                请在 <code className="bg-gray-100 px-2 py-1 rounded">content/chapters/</code> 目录下添加课程 Markdown 文件
                            </p>
                            <Link href="/" className="btn-primary inline-block">
                                返回首页
                            </Link>
                        </div>
                    ) : (
                        chapters.map((chapter, index) => {
                            const levelColors = {
                                '初级': 'bg-green-100 text-green-700 border-green-200',
                                '中级': 'bg-blue-100 text-blue-700 border-blue-200',
                                '高级': 'bg-purple-100 text-purple-700 border-purple-200',
                            }

                            const levelColor = levelColors[chapter.frontmatter.level as keyof typeof levelColors] || 'bg-gray-100 text-gray-700 border-gray-200'

                            return (
                                <Link
                                    key={chapter.slug}
                                    href={`/course/${chapter.slug}`}
                                    className="card card-hover p-6 md:p-8 block group"
                                >
                                    <div className="flex flex-col md:flex-row md:items-center gap-6">
                                        {/* Chapter Number Icon */}
                                        <div className={`w-20 h-20 flex-shrink-0 bg-gradient-to-br ${chapter.frontmatter.color || 'from-gray-400 to-gray-600'} rounded-2xl flex items-center justify-center text-white shadow-lg group-hover:scale-110 transition-transform duration-200`}>
                                            <div className="text-center">
                                                <div className="text-3xl font-bold">{chapter.frontmatter.icon || '📖'}</div>
                                                <div className="text-xs mt-1">Unit {chapter.frontmatter.chapter}</div>
                                            </div>
                                        </div>

                                        {/* Chapter Info */}
                                        <div className="flex-1">
                                            <div className="flex items-start justify-between mb-3">
                                                <div>
                                                    <div className="flex items-center gap-3 mb-2">
                                                        <span className="text-sm font-semibold text-gray-500">
                                                            第 {chapter.frontmatter.chapter} 单元
                                                        </span>
                                                        {chapter.frontmatter.level && (
                                                            <span className={`px-3 py-1 rounded-full text-xs font-semibold border ${levelColor}`}>
                                                                {chapter.frontmatter.level}
                                                            </span>
                                                        )}
                                                    </div>
                                                    <h2 className="text-2xl font-bold text-gray-900 mb-2 group-hover:text-cyan-600 transition-colors">
                                                        {chapter.frontmatter.title}
                                                    </h2>
                                                    <h3 className="text-xl text-gray-700 mb-3">
                                                        {chapter.frontmatter.titleCN}
                                                    </h3>
                                                </div>
                                            </div>

                                            {/* Description */}
                                            {chapter.frontmatter.description && (
                                                <p className="text-gray-600 mb-4 line-clamp-2">
                                                    {chapter.frontmatter.description}
                                                </p>
                                            )}

                                            {/* Meta Info */}
                                            <div className="flex flex-wrap gap-4 text-sm text-gray-500">
                                                {chapter.frontmatter.duration && (
                                                    <div className="flex items-center">
                                                        <svg className="w-4 h-4 mr-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                                        </svg>
                                                        {chapter.frontmatter.duration}
                                                    </div>
                                                )}
                                                {chapter.frontmatter.lessons && (
                                                    <div className="flex items-center">
                                                        <svg className="w-4 h-4 mr-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                                                        </svg>
                                                        {chapter.frontmatter.lessons} 个部分
                                                    </div>
                                                )}
                                                <div className="flex items-center ml-auto">
                                                    <span className="text-cyan-600 font-semibold group-hover:translate-x-1 transition-transform inline-flex items-center">
                                                        开始学习
                                                        <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                                        </svg>
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </Link>
                            )
                        })
                    )}
                </div>

                {/* Learning Path Suggestion */}
                {chapters.length > 0 && (
                    <div className="mt-12 card p-8 bg-gradient-to-br from-cyan-50 to-blue-50 border border-cyan-100">
                        <h3 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
                            <svg className="w-6 h-6 mr-2 text-cyan-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
                            </svg>
                            学习建议
                        </h3>
                        <div className="grid md:grid-cols-3 gap-6">
                            <div className="bg-white rounded-lg p-6">
                                <div className="text-3xl mb-3">🌱</div>
                                <h4 className="font-bold text-gray-900 mb-2">初学者</h4>
                                <p className="text-sm text-gray-600">
                                    建议从 Unit 1-3 开始，循序渐进掌握基础词汇和表达
                                </p>
                            </div>
                            <div className="bg-white rounded-lg p-6">
                                <div className="text-3xl mb-3">🚀</div>
                                <h4 className="font-bold text-gray-900 mb-2">进阶学习</h4>
                                <p className="text-sm text-gray-600">
                                    Unit 4-7 深入学习工艺、设计和商业英语表达
                                </p>
                            </div>
                            <div className="bg-white rounded-lg p-6">
                                <div className="text-3xl mb-3">⭐</div>
                                <h4 className="font-bold text-gray-900 mb-2">高级应用</h4>
                                <p className="text-sm text-gray-600">
                                    Unit 8-10 掌握鉴赏、文化交流和专业修复术语
                                </p>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}
