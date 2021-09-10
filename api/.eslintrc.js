module.exports = {
  env: {
    es2021: true,
    node: true
  },
  extends: [
    'standard',
    'plugin:@typescript-eslint/recommended'
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 12,
    sourceType: 'module'
  },
  plugins: [
    '@typescript-eslint'
  ],
  rules: {
    'no-useless-constructor': 'off',
    'no-return-await': 'warn',
    '@typescript-eslint/member-delimiter-style': ['error', {
      overrides: {
        interface: {
          multiline: {
            delimiter: 'semi',
            requireLast: true
          }
        }
      }
    }],
    '@typescript-eslint/type-annotation-spacing': ['error'],
    'import/order': ['error', {
      'newlines-between': 'always',
      pathGroups: [
        {
          pattern: '@/**',
          group: 'parent'
        }
      ],
      pathGroupsExcludedImportTypes: ['builtin']
    }],
    'prefer-template': 'error'
  }
}
