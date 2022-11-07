/* eslint-env node */
require('@rushstack/eslint-patch/modern-module-resolution');
module.exports = {
    root: true,
    extends: [
        'plugin:vue/vue3-essential',
        'eslint:recommended',
        '@vue/eslint-config-typescript',
        './.eslintrc-auto-import.json',
    ],
    parserOptions: {
        ecmaVersion: 'latest'
    },
    globals: {
    },
    rules: {
        'vue/multi-word-component-names': 'off',
        'vue/no-mutating-props': 'off',
        'eol-last': ['error', 'always'],
        'camelcase': 'error',
        'no-multiple-empty-lines': ['error', { 'max': 2, 'maxEOF': 1 }],
        'semi': ['error', 'always'],
        'new-cap': 'error',
        'no-duplicate-imports': 'error',
        'indent': ['error', 4, { 'SwitchCase': 1 }],
        '@typescript-eslint/space-before-function-paren': ['error', 'never'],
        'semi-spacing': 'error',
        'no-trailing-spaces': 'error',
        'key-spacing': 'error',
        'arrow-spacing': 'error',
        'computed-property-spacing': 'error',
        'no-unreachable': 'error',
        'no-const-assign': 'error',
        'no-redeclare': 'error',
        'no-undef': 'error',
        '@typescript-eslint/no-unused-vars': 'error',
        'switch-colon-spacing': 'error',
        'spaced-comment': ['error', 'always'],
        'space-unary-ops': 'error',
        'space-infix-ops': 'error',
        'keyword-spacing': 'error',
        'quotes': ['error', 'single'],
        'no-multi-spaces': 'error',
        '@typescript-eslint/func-call-spacing': ['error', 'never'],
        'array-bracket-spacing': 'error',
        'comma-style': 'error',
        'no-irregular-whitespace': 'error',
        'no-empty': 'error',
    }
};
