import organizeAttributesPlugin from 'prettier-plugin-organize-attributes';
import organizeImportsPlugin from 'prettier-plugin-organize-imports';

export default {
    plugins: [organizeImportsPlugin, organizeAttributesPlugin],
    tabWidth: 4,
    useTabs: false,
    printWidth: 1000,
    proseWrap: 'never',
    singleQuote: true,
    semi: true,
    trailingComma: 'none',

    overrides: [
        {
            files: '*.js',
            options: {
                parser: 'babel'
            }
        },
        {
            files: '*.json',
            options: {
                parser: 'json'
            }
        },
        {
            files: '*.md',
            options: {
                parser: 'markdown'
            }
        }
    ]
};
