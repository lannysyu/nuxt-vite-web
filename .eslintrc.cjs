module.exports = {
    env: {
        browser: true,
        es2023: true,
        nuxt: true,
    },
    extends: ['plugin:nuxt/recommended'],
    // extends: ['@nuxtjs', 'prettier'],
    parserOptions: {
        ecmaVersion: 2023,
        sourceType: 'module'
    },
    plugins: ['nuxt'],
    // rules: {
    //     'no-undef': 'off',
    //     'prettier/prettier': ['error', { endOfLine: 'auto' }],
    //     indent: ['error', 4]
    // }
}
