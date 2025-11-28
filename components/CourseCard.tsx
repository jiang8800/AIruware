import Link from 'next/link'

interface CourseCardProps {
    id: string
    title: string
    description: string
    level: string
    lessons: number
    duration: string
    category: string
    color: string
}

export default function CourseCard({
    id,
    title,
    description,
    level,
    lessons,
    duration,
    category,
    color,
}: CourseCardProps) {
    const levelColors = {
        '初级': 'bg-green-100 text-green-700',
        '中级': 'bg-blue-100 text-blue-700',
        '高级': 'bg-purple-100 text-purple-700',
    }

    return (
        <Link href={`/courses/${id}`}>
            <div className="card card-hover h-full group cursor-pointer">
                {/* Header with gradient */}
                <div className={`h-32 bg-gradient-to-br ${color} flex items-center justify-center relative overflow-hidden`}>
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-all duration-300"></div>
                    <div className="text-white text-4xl z-10 transform group-hover:scale-110 transition-transform duration-300">
                        {category === '口语' && '🗣️'}
                        {category === '听力' && '👂'}
                        {category === '阅读' && '📖'}
                        {category === '写作' && '✍️'}
                        {category === '语法' && '📝'}
                        {category === '词汇' && '💡'}
                    </div>
                </div>

                {/* Content */}
                <div className="p-6 space-y-4">
                    <div className="flex items-center justify-between">
                        <span className={`px-3 py-1 rounded-full text-xs font-semibold ${levelColors[level as keyof typeof levelColors]}`}>
                            {level}
                        </span>
                        <span className="text-sm text-gray-500">{category}</span>
                    </div>

                    <h3 className="text-xl font-bold text-gray-900 group-hover:text-primary-600 transition-colors duration-200">
                        {title}
                    </h3>

                    <p className="text-gray-600 text-sm leading-relaxed line-clamp-2">
                        {description}
                    </p>

                    <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                        <div className="flex items-center space-x-4 text-sm text-gray-500">
                            <span className="flex items-center">
                                <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                                </svg>
                                {lessons} 课
                            </span>
                            <span className="flex items-center">
                                <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                                {duration}
                            </span>
                        </div>

                        <div className="text-primary-600 font-semibold text-sm group-hover:translate-x-1 transition-transform duration-200">
                            开始学习 →
                        </div>
                    </div>
                </div>
            </div>
        </Link>
    )
}
