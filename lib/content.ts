import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'

const contentDirectory = path.join(process.cwd(), 'content', 'chapters')

export interface ChapterFrontmatter {
    chapter: number
    title: string
    titleCN: string
    description?: string
    level?: string
    duration?: string
    lessons?: number
    color?: string
    icon?: string
}

export interface Chapter {
    slug: string
    frontmatter: ChapterFrontmatter
}

export interface ChapterWithContent extends Chapter {
    content: string
}

/**
 * Get all chapters from the content/chapters directory
 * Returns chapters sorted by chapter number in ascending order
 */
export function getAllChapters(): Chapter[] {
    // Check if directory exists, if not return empty array
    if (!fs.existsSync(contentDirectory)) {
        console.warn(`Content directory not found: ${contentDirectory}`)
        return []
    }

    // Get all .md files from the chapters directory
    const fileNames = fs.readdirSync(contentDirectory)
    const mdFiles = fileNames.filter(fileName => fileName.endsWith('.md'))

    // Parse frontmatter from each file
    const chapters: Chapter[] = mdFiles.map(fileName => {
        const slug = fileName.replace(/\.md$/, '')
        const fullPath = path.join(contentDirectory, fileName)
        const fileContents = fs.readFileSync(fullPath, 'utf8')

        // Parse frontmatter
        const { data } = matter(fileContents)

        return {
            slug,
            frontmatter: data as ChapterFrontmatter
        }
    })

    // Sort by chapter number (ascending)
    return chapters.sort((a, b) => {
        const chapterA = a.frontmatter.chapter || 0
        const chapterB = b.frontmatter.chapter || 0
        return chapterA - chapterB
    })
}

/**
 * Get a specific chapter by its slug
 * Returns the chapter with full markdown content
 * @param slug - The slug of the chapter (filename without .md extension)
 */
export function getChapterBySlug(slug: string): ChapterWithContent | null {
    try {
        const fullPath = path.join(contentDirectory, `${slug}.md`)

        // Check if file exists
        if (!fs.existsSync(fullPath)) {
            console.warn(`Chapter file not found: ${fullPath}`)
            return null
        }

        const fileContents = fs.readFileSync(fullPath, 'utf8')

        // Parse frontmatter and content
        const { data, content } = matter(fileContents)

        return {
            slug,
            frontmatter: data as ChapterFrontmatter,
            content
        }
    } catch (error) {
        console.error(`Error reading chapter ${slug}:`, error)
        return null
    }
}

/**
 * Get all chapter slugs
 * Useful for generating static paths
 */
export function getAllChapterSlugs(): string[] {
    if (!fs.existsSync(contentDirectory)) {
        return []
    }

    const fileNames = fs.readdirSync(contentDirectory)
    return fileNames
        .filter(fileName => fileName.endsWith('.md'))
        .map(fileName => fileName.replace(/\.md$/, ''))
}

/**
 * Get the next and previous chapters for navigation
 * @param currentChapter - The current chapter number
 */
export function getAdjacentChapters(currentChapter: number): {
    prev: Chapter | null
    next: Chapter | null
} {
    const allChapters = getAllChapters()

    const currentIndex = allChapters.findIndex(
        ch => ch.frontmatter.chapter === currentChapter
    )

    if (currentIndex === -1) {
        return { prev: null, next: null }
    }

    return {
        prev: currentIndex > 0 ? allChapters[currentIndex - 1] : null,
        next: currentIndex < allChapters.length - 1 ? allChapters[currentIndex + 1] : null
    }
}

/**
 * Get chapters by level (初级, 中级, 高级)
 * @param level - The difficulty level
 */
export function getChaptersByLevel(level: string): Chapter[] {
    const allChapters = getAllChapters()
    return allChapters.filter(chapter => chapter.frontmatter.level === level)
}

/**
 * Search chapters by title or description
 * @param query - Search query string
 */
export function searchChapters(query: string): Chapter[] {
    const allChapters = getAllChapters()
    const lowerQuery = query.toLowerCase()

    return allChapters.filter(chapter => {
        const titleMatch = chapter.frontmatter.title?.toLowerCase().includes(lowerQuery)
        const titleCNMatch = chapter.frontmatter.titleCN?.toLowerCase().includes(lowerQuery)
        const descMatch = chapter.frontmatter.description?.toLowerCase().includes(lowerQuery)

        return titleMatch || titleCNMatch || descMatch
    })
}
