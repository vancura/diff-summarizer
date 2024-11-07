# diff-summarizer

`diff-summarizer` is a command-line tool that leverages advanced AI models like OpenAI's GPT-4 and Anthropic's Claude to automatically generate clear and concise Git commit messages based on your staged changes. By analyzing the differences in your code, it creates commit messages that adhere to best practices and formatting guidelines, saving you time and ensuring consistency across your project's commit history.

## Key Benefits

-   **Time-Saving:** Automates the tedious task of writing commit messages, allowing you to focus on coding.
-   **Consistency:** Generates commit messages that follow established conventions and best practices.
-   **Clarity:** Produces descriptive messages that make it easier for team members and future maintainers to understand the changes.
-   **Customization:** Supports both GPT-4 and Claude models, giving you flexibility in choosing the AI engine.
-   **Integration:** Easily integrates into your existing workflow without the need for significant adjustments.
-   **Ignore Irrelevant Files:** Automatically excludes Unity .meta files and other non-essential changes from the commit message.

## How It Works

`diff-summarizer` fetches the diff of your staged changes using `git diff --cached` and sends this information to the AI model. The AI then generates a commit message following Git best practices, which is printed to the console and copied to your clipboard for easy pasting.

## Features

-   Generates commit messages from staged changes using AI
-   Supports both Claude 3.5 and GPT-4o
-   Automatically copies the result to clipboard
-   Follows Git commit message best practices
-   Supports Markdown formatting in commit messages
-   Handles Unity-specific files (.meta)
-   Properly formats class and method references

## Installation

```bash
# Clone the repository
git clone https://github.com/vancura/diff-summarizer.
```

## Usage

```bash
# Stage your changes
git add .

# Generate commit message with Claude 3.5
npm start

# Generate commit message with GPT-4
node diff-summarizer-gpt4o.mjs
```

## Configuration

```bash
# Using environment variables
export OPENAI_API_KEY_DIFF_SUMMARIZER="your-openai-api-key"
export CLAUDE_API_KEY_DIFF_SUMMARIZER="your-claude-api-key"
```

## License

Licensed under the MIT License. See the [LICENSE](LICENSE) file for details.
