const config = {
  '*.{js,mjs,cjs,jsx,ts,tsx}': ['eslint --fix --no-warn-ignored', 'prettier --write'],
  '*.{json,css,md,yml,yaml}': 'prettier --write',
};

export default config;
