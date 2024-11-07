# diff-summarizer

A Git commit message generator powered by OpenAI GPT-4o and Anthropic Claude 3.5. This tool automatically generates well-formatted, descriptive commit messages from your staged changes.

## Features

- Generates commit messages from staged changes using AI
- Supports both Claude 3.5 and GPT-4o
- Automatically copies the result to clipboard
- Follows Git commit message best practices
- Supports Markdown formatting in commit messages
- Handles Unity-specific files (.meta)
- Properly formats class and method references

## Installation

```bash
# Clone the repository
git clone https://github.com/vancura/diff-summarizer.

# Enter the directory
cd diff-summarizer

# Install dependencies
npm install

# Set up environment variables
export OPENAI_API_KEY_DIFF_SUMMARIZER="your-openai-api-key"
export CLAUDE_API_KEY_DIFF_SUMMARIZER="your-claude-api-key"
```

# Add files to commit

```bash
git add .
```

# For Claude 3.5

```bash
npm start
```

# For GPT-4o

```bash
node diff-summarizer-gpt4o.mjs
```
