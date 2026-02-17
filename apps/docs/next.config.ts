import nextra from 'nextra'

// test: vercel ignored build step v2
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
