import OpenAI from 'openai';
import { copyToClipboard, getGitDiff } from './utils.mjs';
import { aiPrompt } from './ai-prompt.mjs';

async function generateCommitMessage() {
    const openai = new OpenAI({
        apiKey: 'lm-studio',
        baseURL: 'http://localhost:1234/v1',
    });

    // Truncate the Git diff to avoid exceeding context length
    const diffContent = getGitDiff().slice(0, 20000); // Adjust as needed

    try {
        const response = await openai.chat.completions.create({
            model: 'deepseek-r1-distill-qwen-32b',
            messages: [
                {
                    role: 'system',
                    content: aiPrompt + '\n\nDo not explain your reasoning or show chain of thought. Provide only the final output.'
                },
                {
                    role: 'user',
                    content: diffContent
                }
            ],
            temperature: 0.1, // Lower temperature for less creativity
            max_tokens: 512, // Reduce max_tokens to leave room for input
            top_p: 1,
            frequency_penalty: 0.5,
            presence_penalty: 0,
            stream: false
        });

        // Extract the model's response
        let commitMessage = response.choices[0].message.content.trim();

        // Remove the <think> section and its contents
        commitMessage = removeThinkSection(commitMessage);

        // Copy the cleaned commit message to the clipboard
        copyToClipboard(commitMessage);
    } catch (error) {
        console.error('Error generating commit message:', error);
    }
}

/**
 * Removes the <think> section and its contents from the model's output.
 * @param {string} text - The model's output.
 * @returns {string} - The cleaned output.
 */
function removeThinkSection(text) {
    // Use a regex to remove the <think> section and its contents
    return text.replace(/<think>[\s\S]*?<\/think>/g, '').trim();
}

generateCommitMessage();
