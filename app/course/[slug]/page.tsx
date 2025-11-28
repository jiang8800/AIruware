import { getChapterBySlug, getAllChapterSlugs, getAdjacentChapters } from '@/lib/content'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { MDXRemote } from 'next-mdx-remote/rsc'
import remarkGfm from 'remark-gfm'
import rehypeHighlight from 'rehype-highlight'

// Generate static paths for all chapters
export async function generateStaticParams() {
    const slugs = getAllChapterSlugs()
    return slugs.map(slug => ({ slug }))
}

// Generate metadata for SEO
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params
    const chapter = getChapterBySlug(slug)

    if (!chapter) {
        return {
            title: 'Chapter Not Found'
        }
    }

    return {
        title: `${chapter.frontmatter.title} - ${chapter.frontmatter.titleCN}`,
        description: chapter.frontmatter.description || chapter.frontmatter.title,
    }
}

export default async function ChapterPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params
    const chapter = getChapterBySlug(slug)

    if (!chapter) {
        notFound()
    }

    const { frontmatter, content } = chapter
    const { prev, next } = getAdjacentChapters(frontmatter.chapter)

    const levelColors = {
        '初级': 'bg-green-100 text-green-700 border-green-200',
        '中级': 'bg-blue-100 text-blue-700 border-blue-200',
        '高级': 'bg-purple-100 text-purple-700 border-purple-200',
    }

    const levelColor = levelColors[frontmatter.level as keyof typeof levelColors] || 'bg-gray-100 text-gray-700 border-gray-200'

    return (
        <div className="py-12">
            <div className="container-custom max-w-5xl">
                {/* Breadcrumb */}
                <nav className="mb-8 flex items-center space-x-2 text-sm">
                    <Link href="/" className="text-gray-500 hover:text-cyan-600 transition-colors">
                        首页
                    </Link>
                    <span className="text-gray-400">/</span>
                    <Link href="/course" className="text-gray-500 hover:text-cyan-600 transition-colors">
                        课程目录
                    </Link>
                    <span className="text-gray-400">/</span>
                    <span className="text-gray-900 font-medium">{frontmatter.titleCN}</span>
                </nav>

                {/* Chapter Header */}
                <div className={`bg-gradient-to-r ${frontmatter.color || 'from-gray-400 to-gray-600'} rounded-3xl p-8 lg:p-12 text-white mb-12 relative overflow-hidden`}>
                    <div className="absolute top-0 right-0 text-9xl opacity-10 -mr-8 -mt-8">
                        {frontmatter.icon || '📖'}
                    </div>
                    <div className="relative z-10">
                        <div className="flex items-center gap-3 mb-4 flex-wrap">
                            <span className="bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full text-sm font-semibold border border-white/30">
                                Unit {frontmatter.chapter}
                            </span>
                            {frontmatter.level && (
                                <span className="bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full text-sm font-semibold border border-white/30">
                                    {frontmatter.level}
                                </span>
                            )}
                        </div>
                        <h1 className="text-4xl lg:text-5xl font-bold mb-4">{frontmatter.title}</h1>
                        <h2 className="text-2xl lg:text-3xl font-medium opacity-90 mb-6">{frontmatter.titleCN}</h2>
                        {frontmatter.description && (
                            <p className="text-lg opacity-90 max-w-3xl">{frontmatter.description}</p>
                        )}
                        <div className="flex flex-wrap gap-6 mt-8 text-sm">
                            {frontmatter.duration && (
                                <div className="flex items-center">
                                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                    {frontmatter.duration}
                                </div>
                            )}
                            {frontmatter.lessons && (
                                <div className="flex items-center">
                                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                                    </svg>
                                    {frontmatter.lessons} 个部分
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                {/* Main Content */}
                <div className="grid lg:grid-cols-4 gap-8">
                    {/* Article Content */}
                    <article className="lg:col-span-3">
                        <div className="card p-8 lg:p-12">
                            <div className="prose prose-lg max-w-none prose-headings:text-gray-900 prose-p:text-gray-700 prose-a:text-cyan-600 prose-strong:text-gray-900 prose-code:text-cyan-600 prose-code:bg-gray-100 prose-code:px-1 prose-code:py-0.5 prose-code:rounded prose-pre:bg-gray-900 prose-pre:text-gray-100 prose-table:text-sm prose-th:bg-gray-100 prose-img:rounded-xl prose-img:shadow-lg">
                                <MDXRemote
                                    source={content}
                                    options={{
                                        mdxOptions: {
                                            remarkPlugins: [remarkGfm],
                                            rehypePlugins: [rehypeHighlight],
                                        },
                                    }}
                                />
                            </div>
                        </div>

                        {/* Suggested Images Section */}
                        <div className="card p-8 mt-8 bg-gradient-to-br from-purple-50 to-pink-50 border border-purple-100">
                            <h3 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
                                <svg className="w-6 h-6 mr-2 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                </svg>
                                建议配图区域
                            </h3>
                            <p className="text-gray-700 mb-6">
                                本章节建议添加以下类型的图片来增强学习效果：
                            </p>
                            <div className="grid md:grid-cols-2 gap-4">
                                <div className="bg-white rounded-lg p-6 border-2 border-dashed border-purple-200">
                                    <div className="text-4xl mb-3">🏺</div>
                                    <h4 className="font-bold text-gray-900 mb-2">汝瓷实物图</h4>
                                    <p className="text-sm text-gray-600">
                                        展示本章节涉及的汝瓷器型、釉色或工艺细节
                                    </p>
                                </div>
                                <div className="bg-white rounded-lg p-6 border-2 border-dashed border-purple-200">
                                    <div className="text-4xl mb-3">📊</div>
                                    <h4 className="font-bold text-gray-900 mb-2">图表示意图</h4>
                                    <p className="text-sm text-gray-600">
                                        工艺流程图、对比图表或知识结构图
                                    </p>
                                </div>
                                <div className="bg-white rounded-lg p-6 border-2 border-dashed border-purple-200">
                                    <div className="text-4xl mb-3">🎨</div>
                                    <h4 className="font-bold text-gray-900 mb-2">文化背景图</h4>
                                    <p className="text-sm text-gray-600">
                                        宋代文化、历史场景或相关文物图片
                                    </p>
                                </div>
                                <div className="bg-white rounded-lg p-6 border-2 border-dashed border-purple-200">
                                    <div className="text-4xl mb-3">💡</div>
                                    <h4 className="font-bold text-gray-900 mb-2">学习辅助图</h4>
                                    <p className="text-sm text-gray-600">
                                        词汇卡片、语法示例或练习题配图
                                    </p>
                                </div>
                            </div>
                            <div className="mt-6 p-4 bg-white rounded-lg border border-purple-200">
                                <p className="text-sm text-gray-600">
                                    💡 <strong>提示：</strong>您可以使用 AI 图像生成工具（如 Midjourney、DALL-E）根据章节内容生成相关配图，
                                    或从汝瓷博物馆、文化机构获取授权图片。
                                </p>
                            </div>
                        </div>
                    </article>

                    {/* Sidebar */}
                    <aside className="lg:col-span-1">
                        <div className="sticky top-24 space-y-6">
                            {/* Chapter Info Card */}
                            <div className="card p-6">
                                <h3 className="font-semibold text-gray-900 mb-4">章节信息</h3>
                                <div className="space-y-3 text-sm">
                                    <div className="flex items-start">
                                        <svg className="w-5 h-5 text-cyan-500 mr-2 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 20l4-16m2 16l4-16M6 9h14M4 15h14" />
                                        </svg>
                                        <div>
                                            <div className="font-medium text-gray-700">章节编号</div>
                                            <div className="text-gray-600">Unit {frontmatter.chapter}</div>
                                        </div>
                                    </div>
                                    {frontmatter.level && (
                                        <div className="flex items-start">
                                            <svg className="w-5 h-5 text-cyan-500 mr-2 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                                            </svg>
                                            <div>
                                                <div className="font-medium text-gray-700">难度等级</div>
                                                <div className={`inline-block px-2 py-1 rounded text-xs font-semibold border ${levelColor} mt-1`}>
                                                    {frontmatter.level}
                                                </div>
                                            </div>
                                        </div>
                                    )}
                                    {frontmatter.duration && (
                                        <div className="flex items-start">
                                            <svg className="w-5 h-5 text-cyan-500 mr-2 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                            </svg>
                                            <div>
                                                <div className="font-medium text-gray-700">学习时长</div>
                                                <div className="text-gray-600">{frontmatter.duration}</div>
                                            </div>
                                        </div>
                                    )}
                                    {frontmatter.lessons && (
                                        <div className="flex items-start">
                                            <svg className="w-5 h-5 text-cyan-500 mr-2 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                            </svg>
                                            <div>
                                                <div className="font-medium text-gray-700">课程部分</div>
                                                <div className="text-gray-600">{frontmatter.lessons} 个部分</div>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>

                            {/* Navigation Card */}
                            <div className="card p-6">
                                <h3 className="font-semibold text-gray-900 mb-4">章节导航</h3>
                                <div className="space-y-3">
                                    {prev && (
                                        <Link
                                            href={`/course/${prev.slug}`}
                                            className="block p-3 rounded-lg border-2 border-gray-200 hover:border-cyan-400 hover:bg-cyan-50 transition-all group"
                                        >
                                            <div className="text-xs text-gray-500 mb-1">← 上一章</div>
                                            <div className="font-medium text-gray-900 group-hover:text-cyan-600 text-sm">
                                                {prev.frontmatter.titleCN}
                                            </div>
                                        </Link>
                                    )}
                                    {next && (
                                        <Link
                                            href={`/course/${next.slug}`}
                                            className="block p-3 rounded-lg border-2 border-gray-200 hover:border-cyan-400 hover:bg-cyan-50 transition-all group"
                                        >
                                            <div className="text-xs text-gray-500 mb-1">下一章 →</div>
                                            <div className="font-medium text-gray-900 group-hover:text-cyan-600 text-sm">
                                                {next.frontmatter.titleCN}
                                            </div>
                                        </Link>
                                    )}
                                    <Link
                                        href="/course"
                                        className="block p-3 rounded-lg border-2 border-gray-200 hover:border-cyan-400 hover:bg-cyan-50 transition-all text-center group"
                                    >
                                        <div className="font-medium text-gray-900 group-hover:text-cyan-600 text-sm">
                                            📚 返回课程目录
                                        </div>
                                    </Link>
                                </div>
                            </div>

                            {/* Quick Actions */}
                            <div className="card p-6 bg-gradient-to-br from-cyan-50 to-blue-50 border border-cyan-100">
                                <h3 className="font-semibold text-gray-900 mb-4">学习工具</h3>
                                <div className="space-y-2">
                                    <Link href="/vocabulary" className="block p-3 bg-white rounded-lg hover:shadow-md transition-shadow text-sm">
                                        📖 词汇库
                                    </Link>
                                    <Link href="/practice/exercises" className="block p-3 bg-white rounded-lg hover:shadow-md transition-shadow text-sm">
                                        ✏️ 互动练习
                                    </Link>
                                    <Link href="/assistant" className="block p-3 bg-white rounded-lg hover:shadow-md transition-shadow text-sm">
                                        🤖 AI 助教
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </aside>
                </div>
            </div>
        </div>
    )
}
