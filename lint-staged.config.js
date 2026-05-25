export default {
  '**/*.{ts,tsx}': () => 'npm run type-check',
  '**/*.{js,jsx,ts,tsx}': [
    'prettier --write',
    'eslint --fix --no-warn-ignored --cache --max-warnings 0',
  ],
  '*.{json,md,mdx,yml,css}': 'prettier --write',
};
