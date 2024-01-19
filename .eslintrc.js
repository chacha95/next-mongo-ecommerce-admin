module.exports = {
  extends: ['next', 'prettier'],
  plugins: ['unicorn'],
  parserOptions: {
    ecmaFeatures: {
      jsx: true
    },
    ecmaVersion: 12,
    sourceType: 'module'
  },
  rules: {
    // 사용되지 않은 변수에 대한 경고를 무시
    'no-unused-vars': 'off',

    // Next.js 페이지에서 document import에 대한 경고를 무시
    '@next/next/no-document-import-in-page': 'off',

    // 변수를 const로 선언하지 않았을 때 에러 표시
    'prefer-const': 'error',

    // React Hook의 exhaustive-deps 규칙을 적용
    'react-hooks/exhaustive-deps': 'error',

    // 사용되지 않은 변수와 함수에 대한 경고를 활성화
    'no-undef': 'error',

    // import 구문의 순서를 규정
    'import/order': [
      'error',
      {
        groups: [
          ['builtin', 'external'],
          ['internal', 'parent', 'sibling', 'index']
        ],
        'newlines-between': 'always'
      }
    ]
  }
};
