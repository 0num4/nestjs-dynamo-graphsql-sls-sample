module.exports = {
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: 'tsconfig.json',
    sourceType: 'module',
  },
  plugins: ['@typescript-eslint/eslint-plugin', 'nestjs'],
  extends: [
    'plugin:@typescript-eslint/recommended',
    'plugin:prettier/recommended',
    'plugin:nestjs/recommended'
  ],
  root: true,
  env: {
    node: true,
    jest: true,
  },
  ignorePatterns: ['.eslintrc.js','*.spec.ts','/create-react-sample/'],
  rules: {
    '@typescript-eslint/interface-name-prefix': 'off',
    '@typescript-eslint/explicit-function-return-type': 'error',
    '@typescript-eslint/explicit-module-boundary-types': 'error',
    '@typescript-eslint/no-explicit-any': 'error',
    '@typescript-eslint/naming-convention': [
      "error",
      {
        "selector": "class",
        "format": ["PascalCase"],
      },
      {
        "selector": "function",
        "format": ["camelCase","PascalCase"],
      },
      {
        "selector": "method",
        "format": ["camelCase"],
      },
    ]
  },
};
