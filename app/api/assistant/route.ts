import { NextRequest, NextResponse } from 'next/server'
import OpenAI from 'openai'

// Initialize OpenAI client
// Note: API key should be set in environment variable OPENAI_API_KEY
const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY || '',
})

export async function POST(request: NextRequest) {
    try {
        const { sentence } = await request.json()

        if (!sentence || typeof sentence !== 'string') {
            return NextResponse.json(
                { error: 'Invalid input: sentence is required' },
                { status: 400 }
            )
        }

        // Check if API key is configured
        if (!process.env.OPENAI_API_KEY) {
            return NextResponse.json(
                {
                    error: 'API key not configured. Please set OPENAI_API_KEY in your environment variables.',
                    improvedSentence: sentence,
                    explanation: '请在 .env.local 文件中配置 OPENAI_API_KEY 环境变量。'
                },
                { status: 503 }
            )
        }

        // Call OpenAI API
        const completion = await openai.chat.completions.create({
            model: 'gpt-4',
            messages: [
                {
                    role: 'system',
                    content: `You are an expert English language tutor specializing in helping Chinese students improve their English expressions, particularly in the context of Chinese ceramics and Ru ware (汝瓷). 

Your task is to:
1. Analyze the student's English sentence
2. Provide a more natural, idiomatic version if needed
3. Explain why your version is better (in Chinese)
4. Highlight any grammar points that need attention
5. Suggest vocabulary improvements

Format your response as JSON with the following structure:
{
  "improvedSentence": "The improved English sentence",
  "explanation": "Detailed explanation in Chinese of why this is better",
  "grammarPoints": ["Grammar point 1", "Grammar point 2"],
  "vocabularyTips": ["Vocabulary tip 1", "Vocabulary tip 2"]
}

If the original sentence is already perfect, use it as the improvedSentence and explain that it's already well-written.`
                },
                {
                    role: 'user',
                    content: sentence
                }
            ],
            temperature: 0.7,
            max_tokens: 1000,
            response_format: { type: 'json_object' }
        })

        const responseContent = completion.choices[0]?.message?.content

        if (!responseContent) {
            throw new Error('No response from OpenAI')
        }

        const parsedResponse = JSON.parse(responseContent)

        return NextResponse.json({
            improvedSentence: parsedResponse.improvedSentence || sentence,
            explanation: parsedResponse.explanation || '无法生成解释',
            grammarPoints: parsedResponse.grammarPoints || [],
            vocabularyTips: parsedResponse.vocabularyTips || []
        })

    } catch (error) {
        console.error('Error in assistant API:', error)

        if (error instanceof Error) {
            return NextResponse.json(
                { error: error.message },
                { status: 500 }
            )
        }

        return NextResponse.json(
            { error: 'An unexpected error occurred' },
            { status: 500 }
        )
    }
}
