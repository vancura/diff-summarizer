import { execSync } from "child_process";
import clipboardy from "clipboardy";
import OpenAI from "openai";

async function generateCommitMessage() {
    // Initialize OpenAI client
    const openai = new OpenAI({
        apiKey: process.env.CLAUDE_API_KEY_DIFF_SUMMARIZER,
    });

    // Get the staged changes as a patch
    const gitDiffCommand = "git diff --cached";
    const result = execSync(gitDiffCommand, { encoding: "utf-8" });

    // Generate a summary
    const promptMessages = [
        {
            role: "system",
            content: `
          As a skilled git mergemaster, you possess the expertise to craft clear and comprehensible git commit messages. Kindly generate a git commit message based
          on the provided git patch. Use verbosity judiciously. Please generate two text snippets, separated with a blank line, following these rules:
          - Capitalized, short (50 chars or less) summary
          - More detailed explanatory text, if necessary.
          - In some contexts, the first line is treated as the subject of an email and the rest of the text as the body. The blank line separating the summary from
            the body is critical (unless you omit the body entirely); tools like rebase can get confused if you run the two together.
          - Always leave the second line blank.
          - Write your commit message in the imperative: "Fix bug" and not "Fixed bug" or "Fixes bug." This convention matches up with commit messages generated by
            commands like git merge and git revert.
          - Further paragraphs come after blank lines.
              - Bullet points are okay, too, but make sure every line ends with a period.
              - Typically a hyphen or asterisk is used for the bullet, preceded by a single space, with blank lines in between, but conventions vary here.
              - Use a hanging indent.
          - When referencing a class, always avoid using the file extension suffix (e.g., '.cs') since it is evident that it is a class. The filenames themselves
            are not significant. Instead, enclose the mentioned class within backticks (\`) to create a Markdown code snippet.
          - When using a method, or field name, always remember to enclose it in \` / \` (backticks) to create a Markdown code snippet.
          - If there's a mention of a method, remember to suffix its name with the \`()\`, as how it's done in C#.
          - Please exclude files with the .meta extension, as they are Unity helper files and can be disregarded in the commit message.
        `,
        },
        {
            role: "user",
            content: result,
        },
    ];

    try {
        const response = await openai.chat.completions.create({
            model: "gpt-4o",
            messages: promptMessages,
            temperature: 0.5,
            max_tokens: 256,
            top_p: 1,
            frequency_penalty: 0.5,
            presence_penalty: 0,
        });

        const commitMessage = response.choices[0].message.content.trim();
        console.log(commitMessage);

        // Copy the commit message to clipboard
        clipboardy.writeSync(commitMessage);
    } catch (error) {
        console.error("Error generating commit message:", error);
    }
}

generateCommitMessage();