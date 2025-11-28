# Quick Start Guide

This is a comprehensive guide to get the AI时代汝瓷英语 website up and running.

## 🚀 Quick Start

### 1. Install Dependencies

```bash
npm install
```

### 2. Set Up Environment Variables

Copy the example environment file:

```bash
cp .env.example .env.local
```

Edit `.env.local` and add your OpenAI API key:

```env
OPENAI_API_KEY=sk-your-actual-api-key-here
```

> **Note**: The AI assistant feature requires an OpenAI API key. Get one from [OpenAI Platform](https://platform.openai.com/api-keys).

### 3. Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### 4. Build for Production

```bash
npm run build
npm start
```

## 📁 Project Structure

```
AI_RuWare_English_Site/
├── app/                      # Next.js App Router
│   ├── api/                  # API routes
│   │   └── assistant/        # AI assistant endpoint
│   ├── assistant/            # AI assistant page
│   ├── course/               # Course pages
│   │   ├── [slug]/          # Dynamic course detail
│   │   └── page.tsx         # Course listing
│   ├── courses/             # Legacy courses (from chapters.json)
│   ├── practice/            # Practice exercises
│   ├── vocabulary/          # Vocabulary library
│   ├── globals.css          # Global styles
│   ├── highlight.css        # Code syntax highlighting
│   └── layout.tsx           # Root layout
├── components/              # React components
│   ├── Header.tsx
│   ├── Footer.tsx
│   ├── CourseCard.tsx
│   └── VocabularyCard.tsx
├── content/                 # Content files
│   └── chapters/           # Markdown chapter files
├── lib/                    # Utility functions
│   └── content.ts         # Content management
├── public/                # Static assets
│   └── data/             # JSON data files
├── .env.example          # Environment variables template
├── vercel.json           # Vercel deployment config
└── package.json          # Dependencies

```

## 🎯 Key Features

### 1. Course System
- **Course Listing**: `/course` - Browse all chapters
- **Course Detail**: `/course/[slug]` - Read chapter content with MDX
- **Content Management**: Markdown files with frontmatter in `content/chapters/`

### 2. AI Assistant
- **Page**: `/assistant`
- **API**: `/api/assistant`
- **Features**: English sentence improvement with explanations

### 3. Practice System
- **Exercises**: `/practice/exercises`
- **Types**: Multiple choice and matching questions
- **Data**: `public/data/questions.json`

### 4. Vocabulary Library
- **Page**: `/vocabulary`
- **Features**: Search, filter by level and part of speech

## 🛠️ Development

### Adding New Chapters

1. Create a new markdown file in `content/chapters/`:

```markdown
---
chapter: 1
title: Your Chapter Title
titleCN: 章节中文标题
description: Brief description
level: 初级
duration: 6-8 hours
lessons: 10
color: from-cyan-500 to-blue-500
icon: 🏺
---

# Your Chapter Content

Write your content here using Markdown...
```

2. The chapter will automatically appear in `/course`

### Customizing Styles

- **Global styles**: `app/globals.css`
- **Tailwind config**: `tailwind.config.js`
- **Color scheme**: Modify the `primary` and `secondary` colors in Tailwind config

### Adding Practice Questions

Edit `public/data/questions.json`:

```json
{
  "exercises": [
    {
      "id": 1,
      "chapterId": 1,
      "type": "multiple-choice",
      "question": "Your question?",
      "questionCN": "你的问题？",
      "options": [...],
      "explanation": "Explanation",
      "explanationCN": "解释"
    }
  ]
}
```

## 🌐 Deployment

### Deploy to Vercel (Recommended)

See [VERCEL_DEPLOYMENT.md](./VERCEL_DEPLOYMENT.md) for detailed instructions.

**Quick Deploy:**

1. Push to GitHub
2. Import to Vercel
3. Add `OPENAI_API_KEY` environment variable
4. Deploy!

### Other Platforms

The project is a standard Next.js app and can be deployed to:
- **Netlify**: Use `npm run build` and deploy `.next` folder
- **AWS Amplify**: Connect your Git repository
- **Self-hosted**: Use `npm run build && npm start`

## 📚 Documentation

- **Content Library**: [CONTENT_LIBRARY_GUIDE.md](./CONTENT_LIBRARY_GUIDE.md)
- **AI Assistant Setup**: [AI_ASSISTANT_SETUP.md](./AI_ASSISTANT_SETUP.md)
- **Vercel Deployment**: [VERCEL_DEPLOYMENT.md](./VERCEL_DEPLOYMENT.md)

## 🔧 Troubleshooting

### Module Not Found Errors

```bash
rm -rf node_modules package-lock.json
npm install
```

### Environment Variables Not Working

- Ensure `.env.local` exists and has correct values
- Restart the development server after changing env vars
- For Vercel, add variables in the dashboard

### Build Errors

```bash
npm run build
```

Check the error messages and ensure all dependencies are installed.

### API Key Issues

- Verify your OpenAI API key is valid
- Check you have sufficient credits in your OpenAI account
- Ensure the key is properly set in environment variables

## 📝 Scripts

```bash
npm run dev      # Start development server
npm run build    # Build for production
npm start        # Start production server
npm run lint     # Run ESLint
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

This project is for educational purposes.

## 🆘 Support

For issues and questions:
- Check the documentation files
- Review the code comments
- Open an issue on GitHub

---

**Happy Learning! 🎓**
