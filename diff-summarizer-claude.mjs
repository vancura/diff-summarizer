import Anthropic from '@anthropic-ai/sdk';
import { execSync } from 'child_process';
import clipboardy from 'clipboardy';
import { aiPrompt } from './ai-prompt.mjs';

async function generateCommitMessage() {
    const anthropic = new Anthropic({
        apiKey: process.env.CLAUDE_API_KEY_DIFF_SUMMARIZER
    });

    const gitDiffCommand = 'git diff --cached';
    const result = execSync(gitDiffCommand, { encoding: 'utf-8' });

    try {
        const response = await anthropic.messages.create({
            model: 'claude-3-5-sonnet-20241022',
            max_tokens: 1024,
            temperature: 0.3,
            system: aiPrompt,
            messages: [
                {
                    role: 'user',
                    content: `\n\nHuman: ${result}`
                }
            ]
        });

        const commitMessage = response.content[0].text.trim();
        console.log(commitMessage);

        clipboardy.writeSync(commitMessage);
    } catch (error) {
        console.error('Error generating commit message:', error);
    }
}

generateCommitMessage();
