import nextra from 'nextra'

// test: bash diff v5
const withNextra = nextra({
  contentDirBasePath: '/',
})

export default withNextra({
  i18n: {
    locales: ['ko', 'en'],
    defaultLocale: 'ko',
  },
  images: {
    unoptimized: true,
  },
})
