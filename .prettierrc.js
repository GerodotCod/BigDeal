module.exports = {
  proseWrap: 'always',
  singleQuote: true,
  trailingComma: 'all',
  semi: false,
  overrides: [
    {
      files: 'packages/@BigDeal/angular/**',
      options: {
        semi: true,
      },
    },
  ],
}
