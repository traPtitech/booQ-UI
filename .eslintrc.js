// eslint-disable-next-line no-undef
module.exports = {
  root: true,
  parserOptions: {
    parser: '@typescript-eslint/parser'
  },
  env: {
    browser: true,
    es2017: true
  },
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:vue/vue3-recommended',
    'plugin:prettier/recommended'
  ],
  rules: {
    'no-console': 'warn',
    'no-debugger': 'warn',
    'no-empty': ['error', { allowEmptyCatch: true }],
    eqeqeq: 'error',
    'vue/eqeqeq': 'error',
    'no-restricted-imports': [
      'error',
      {
        name: '/@/lib/apis/generated',
        message: 'Please use /@/lib/apis instead.'
      }
    ],
    '@typescript-eslint/member-delimiter-style': [
      'error',
      {
        multiline: {
          delimiter: 'none'
        },
        singleline: {
          delimiter: 'semi'
        }
      }
    ],
    'vue/block-lang': [
      'error',
      {
        script: { lang: 'ts' },
        style: { lang: 'scss' }
      }
    ],
    'vue/component-api-style': ['error', ['composition']],
    'vue/component-name-in-template-casing': ['error', 'kebab-case'],
    'vue/custom-event-name-casing': ['error', 'camelCase'],
    'vue/v-on-event-hyphenation': ['error', 'always', { autofix: true }],
    'vue/match-component-file-name': ['error', { extensions: ['vue'] }],
    'vue/v-on-function-call': 'error',
    'vue/require-emit-validator': 'error',
    'vue/no-template-target-blank': 'error',
    'vue/valid-next-tick': 'error'
  }
}
