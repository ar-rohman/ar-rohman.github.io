const path = require('path');

module.exports = {
    env: {
        browser: true,
        es2021: true,
        node: true,
    },
    extends: [
        'airbnb-base',
    ],
    parserOptions: {
        ecmaVersion: 13,
        sourceType: 'module',
    },
    rules: {
        indent: ['error', 4],
        'import/no-extraneous-dependencies': ['error', { devDependencies: true }],
        'no-plusplus': 0,
    },
    settings: {
        'import/resolver': {
            alias: {
                map: [['@', path.resolve(__dirname, 'src')]],
            },
        },
    },
};
