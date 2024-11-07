import OpenAI from 'openai';
import { aiPrompt } from './ai-prompt.mjs';
import { copyToClipboard, getGitDiff } from './utils.mjs';

async function generateCommitMessage() {
    const openai = new OpenAI({
        apiKey: process.env.OPENAI_API_KEY_DIFF_SUMMARIZER
    });

    if (!openai.apiKey) {
        console.error('OPENAI_API_KEY_DIFF_SUMMARIZER environment variable is not set.');
        process.exit(1);
    }

    const result = getGitDiff();

    const promptMessages = [
        {
            role: 'system',
            content: aiPrompt
        },
        {
            role: 'user',
            content: result
        }
    ];

    try {
        const response = await openai.chat.completions.create({
            model: 'gpt-4o',
            messages: promptMessages,
            temperature: 0.3,
            max_tokens: 2048,
            top_p: 1,
            frequency_penalty: 0.5,
            presence_penalty: 0
        });

        const commitMessage = response.choices[0].message.content.trim();
        console.log(commitMessage);

        copyToClipboard(commitMessage);
    } catch (error) {
        console.error('Error generating commit message:', error);
    }
}

generateCommitMessage();
