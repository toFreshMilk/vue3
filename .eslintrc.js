// https://eslint.org/docs/user-guide/configuring

// 참고 https://github.com/vuejs/eslint-plugin-vue/issues/329

module.exports = {
  root: true,
  env: {
    browser: true,
    node: true,
  },
  extends: [
    'plugin:nuxt/recommended',
  ],
  // add your custom rules here
  rules: {
    'nuxt/no-cjs-in-config': 'off',
    'vue/attribute-hyphenation': 'off',
    'vue/require-default-prop': 'off',
    'vue/require-prop-types': 'off',
    'vue/no-v-html': 'off',
    'comma-dangle': ['error', 'always-multiline'],
    eqeqeq: 'off',
    'no-console': 'off',
    camelcase: 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
  },
}
