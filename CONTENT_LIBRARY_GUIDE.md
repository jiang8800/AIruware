# Content Library Usage Guide

This guide explains how to use the `lib/content.ts` library to manage chapter content.

## Overview

The content library provides functions to read and parse markdown files from the `content/chapters` directory. Each markdown file should have frontmatter metadata and markdown content.

## File Structure

```
content/
  chapters/
    unit-1-introduction.md
    unit-2-glaze.md
    unit-3-craftsmanship.md
    ...
```

## Frontmatter Format

Each chapter markdown file should start with YAML frontmatter:

```markdown
---
chapter: 1
title: Introduction to Ru Ware
titleCN: 汝瓷简介
description: Learn the basic features and history of Ru Ware
level: 初级
duration: 6-8 hours
lessons: 10
color: from-cyan-500 to-blue-500
icon: 🏺
---

# Your markdown content here...
```

### Required Fields

- `chapter` (number): Chapter number for sorting
- `title` (string): English title
- `titleCN` (string): Chinese title

### Optional Fields

- `description` (string): Brief description
- `level` (string): Difficulty level (初级, 中级, 高级)
- `duration` (string): Estimated time to complete
- `lessons` (number): Number of lessons/parts
- `color` (string): Tailwind gradient class
- `icon` (string): Emoji or icon

## API Reference

### `getAllChapters()`

Get all chapters sorted by chapter number.

```typescript
import { getAllChapters } from '@/lib/content'

const chapters = getAllChapters()
// Returns: Chapter[]
```

**Returns:**
```typescript
[
  {
    slug: 'unit-1-introduction',
    frontmatter: {
      chapter: 1,
      title: 'Introduction to Ru Ware',
      titleCN: '汝瓷简介',
      // ... other fields
    }
  },
  // ... more chapters
]
```

### `getChapterBySlug(slug)`

Get a specific chapter with full content.

```typescript
import { getChapterBySlug } from '@/lib/content'

const chapter = getChapterBySlug('unit-1-introduction')
// Returns: ChapterWithContent | null
```

**Returns:**
```typescript
{
  slug: 'unit-1-introduction',
  frontmatter: {
    chapter: 1,
    title: 'Introduction to Ru Ware',
    // ... other fields
  },
  content: '# Unit 1: Introduction to Ru Ware\n\n...' // Full markdown content
}
```

### `getAllChapterSlugs()`

Get all chapter slugs (useful for static path generation).

```typescript
import { getAllChapterSlugs } from '@/lib/content'

const slugs = getAllChapterSlugs()
// Returns: ['unit-1-introduction', 'unit-2-glaze', ...]
```

### `getAdjacentChapters(currentChapter)`

Get previous and next chapters for navigation.

```typescript
import { getAdjacentChapters } from '@/lib/content'

const { prev, next } = getAdjacentChapters(1)
// Returns: { prev: Chapter | null, next: Chapter | null }
```

### `getChaptersByLevel(level)`

Filter chapters by difficulty level.

```typescript
import { getChaptersByLevel } from '@/lib/content'

const beginnerChapters = getChaptersByLevel('初级')
// Returns: Chapter[]
```

### `searchChapters(query)`

Search chapters by title or description.

```typescript
import { searchChapters } from '@/lib/content'

const results = searchChapters('glaze')
// Returns: Chapter[]
```

## Usage Examples

### Example 1: Display All Chapters

```typescript
// app/courses/page.tsx
import { getAllChapters } from '@/lib/content'

export default function CoursesPage() {
  const chapters = getAllChapters()
  
  return (
    <div>
      {chapters.map(chapter => (
        <div key={chapter.slug}>
          <h2>{chapter.frontmatter.title}</h2>
          <p>{chapter.frontmatter.titleCN}</p>
          <Link href={`/courses/${chapter.slug}`}>
            Learn More
          </Link>
        </div>
      ))}
    </div>
  )
}
```

### Example 2: Display Single Chapter

```typescript
// app/courses/[slug]/page.tsx
import { getChapterBySlug, getAllChapterSlugs } from '@/lib/content'
import { notFound } from 'next/navigation'

export async function generateStaticParams() {
  const slugs = getAllChapterSlugs()
  return slugs.map(slug => ({ slug }))
}

export default function ChapterPage({ params }: { params: { slug: string } }) {
  const chapter = getChapterBySlug(params.slug)
  
  if (!chapter) {
    notFound()
  }
  
  return (
    <div>
      <h1>{chapter.frontmatter.title}</h1>
      <div dangerouslySetInnerHTML={{ __html: chapter.content }} />
    </div>
  )
}
```

### Example 3: Chapter Navigation

```typescript
import { getAdjacentChapters } from '@/lib/content'

export default function ChapterNavigation({ currentChapter }: { currentChapter: number }) {
  const { prev, next } = getAdjacentChapters(currentChapter)
  
  return (
    <div className="flex justify-between">
      {prev && (
        <Link href={`/courses/${prev.slug}`}>
          ← {prev.frontmatter.titleCN}
        </Link>
      )}
      {next && (
        <Link href={`/courses/${next.slug}`}>
          {next.frontmatter.titleCN} →
        </Link>
      )}
    </div>
  )
}
```

## TypeScript Types

```typescript
interface ChapterFrontmatter {
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

interface Chapter {
  slug: string
  frontmatter: ChapterFrontmatter
}

interface ChapterWithContent extends Chapter {
  content: string
}
```

## Notes

- All functions handle missing directories gracefully
- Chapters are automatically sorted by the `chapter` field
- The `content` field contains raw markdown (you may want to use a markdown parser like `next-mdx-remote` or `remark`)
- File system operations are synchronous and suitable for build-time data fetching

## Next Steps

1. Install dependencies: `npm install gray-matter`
2. Create chapter markdown files in `content/chapters/`
3. Use the library functions in your Next.js pages
4. Consider adding MDX support for interactive components in markdown
