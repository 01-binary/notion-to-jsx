import nextra from 'nextra'

// test: turbo-ignore v4
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
