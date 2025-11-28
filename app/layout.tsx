import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import './highlight.css'
import Header from '@/components/Header'
import Footer from '@/components/Footer'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
    title: 'AI时代汝瓷英语 - 智能英语学习平台',
    description: '结合AI技术与传统文化的创新英语学习平台，提供系统化课程、词汇库和互动练习',
    keywords: 'AI英语学习, 汝瓷英语, 在线英语课程, 英语词汇, 互动练习',
}

export default function RootLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <html lang="zh-CN">
            <body className={inter.className}>
                <Header />
                <main className="min-h-screen">
                    {children}
                </main>
                <Footer />
            </body>
        </html>
    )
}
