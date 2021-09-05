module.exports = {
  env: {
    browser: true,
    es2021: true
  },
  extends: [
    'plugin:vue/vue3-recommended',
    'standard'
  ],
  parserOptions: {
    ecmaVersion: 12,
    parser: '@typescript-eslint/parser',
    sourceType: 'module'
  },
  plugins: [
    'vue',
    '@typescript-eslint'
  ],
  rules: {
    'vue/block-lang': ['error', {
      script: {
        lang: 'ts'
      }
    }]
  },
  globals: {
    defineProps: true,
    defineEmits: true,
    defineExpose: true,
    withDefaults: true
  }
}
