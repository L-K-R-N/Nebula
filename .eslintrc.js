module.exports = {
   env: {
      browser: true,
      es6: true,
      node: true,
   },
   extends: [
      'airbnb',
      'airbnb-typescript',
      'plugin:jest/recommended',
      'jest-enzyme',
      'eslint:recommended',
      'plugin:@typescript-eslint/recommended',
      'plugin:react/recommended',
      'plugin:prettier/recommended',
      'plugin:import/typescript',
   ],

   overrides: [
      {
         env: {
            node: true,
         },
         files: ['.eslintrc.{js,cjs}'],
         parserOptions: {
            sourceType: 'script',
         },
      },
   ],
   parser: '@typescript-eslint/parser',
   parserOptions: {
      ecmaVersion: 6,
      sourceType: 'module',
      ecmaFeatures: {
         jsx: true,
      },
      project: './tsconfig.json',
      tsconfigRootDir: __dirname,
   },
   plugins: [
      'babel',
      'import',
      'jsx-a11y',
      'prettier',
      '@typescript-eslint',
      'react',
   ],
   ignorePatterns: ['.eslintrc.js'],
   settings: {
      'import/resolver': {
         node: {
            extensions: ['.js', '.jsx', '.ts', '.tsx'],
            paths: ['./src'],
         },
      },
   },
   rules: {
      'linebreak-style': 'off', // Неправильно работает в Windows.

      'arrow-parens': 'off', // Несовместимо с prettier
      'object-curly-newline': 'off', // Несовместимо с prettier
      'no-mixed-operators': 'off', // Несовместимо с prettier
      'arrow-body-style': 'off', // Это - не наш стиль?
      'function-paren-newline': 'off', // Несовместимо с prettier
      'no-plusplus': 'off',
      'space-before-function-paren': 0, // Несовместимо с prettier

      'max-len': ['error', 100, 2, { ignoreUrls: true }], // airbnb позволяет некоторые пограничные случаи
      'no-console': 'error', // airbnb использует предупреждение
      'no-alert': 'error', // airbnb использует предупреждение

      'no-param-reassign': 'off', // Это - не наш стиль?
      radix: 'off', // parseInt, parseFloat и radix выключены. Мне это не нравится.

      'react/require-default-props': 'off', // airbnb использует уведомление об ошибке
      'react/forbid-prop-types': 'off', // airbnb использует уведомление об ошибке
      'react/jsx-filename-extension': [
         2,
         { extensions: ['.js', '.jsx', '.ts', '.tsx'] },
      ], // airbnb использует .jsx

      'prefer-destructuring': 'off',
      'no-shadow': 'off',
      '@typescript-eslint/no-shadow': 'warn',
      '@typescript-eslint/no-use-before-define': 'warn',
      'react/no-find-dom-node': 'off', // Я этого не знаю
      'react/no-did-mount-set-state': 'off',
      'react/no-unused-prop-types': 'off', // Это всё ещё работает нестабильно
      'react/jsx-one-expression-per-line': 'off',
      // 'react/jsx-filename-extension': [
      //    2,
      //    { extensions: ['.js', '.jsx', '.ts', '.tsx'] },
      // ],
      'jsx-a11y/anchor-is-valid': [
         'error',
         { components: ['Link'], specialLink: ['to'] },
      ],
      'jsx-a11y/label-has-for': [
         2,
         {
            required: {
               every: ['id'],
            },
         },
      ], // для ошибки вложенных свойств htmlFor элементов label
      'import/extensions': [
         'error',
         'ignorePackages',
         {
            '': 'never',
            js: 'never',
            jsx: 'never',
            ts: 'never',
            tsx: 'never',
         },
      ],
      'import/prefer-default-export': 'off',
      'react/react-in-jsx-scope': 'off',
      'prettier/prettier': ['error'],
      'react/function-component-definition': [
         2,
         {
            namedComponents: 'arrow-function',
            unnamedComponents: 'arrow-function',
         },
      ],
      parserOptions: {
         parser: '@typescript-eslint/parser',
         project: './tsconfig.json',
         tsconfigRootDir: __dirname,
      },
      '@typescript-eslint/no-unused-vars': 'warn',
      'react/prop-types': 'off',
      'no-nested-ternary': 'off',
   },
};
