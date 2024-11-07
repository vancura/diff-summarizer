import { execSync } from 'child_process';
import clipboardy from 'clipboardy';

/** Get the staged changes as a patch. */
export function getGitDiff() {
    const gitDiffCommand = 'git diff --cached';
    return execSync(gitDiffCommand, { encoding: 'utf-8' });
}

/** Copy the text to the clipboard. */
export function copyToClipboard(text) {
    clipboardy.writeSync(text);
}
