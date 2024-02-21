module.exports = {
    root: true,
    extends: [
        '@nuxtjs/eslint-config-typescript',
        // @see https://github.com/prettier/eslint-plugin-prettier#recommended-configuration
        'plugin:prettier/recommended',
    ],
    rules: {
        'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
        'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
        'import/namespace': 'off', // issue with Nuxt #components import
        '@typescript-eslint/ban-ts-ignore': 'off',
        '@typescript-eslint/ban-ts-comment': 'off',
        'vue/require-default-prop': 'off', // props could be undefined
        'vue/padding-line-between-blocks': 'warn',
        'vue/no-v-text-v-html-on-component': 'off',
    },
    overrides: [
        {
            // stories files can have any name
            files: ['**/*.stories.vue'],
            rules: { 'vue/multi-word-component-names': 'off' },
        },
    ],
}
