import nextra from 'nextra'

const withNextra = nextra({
  contentDirBasePath: '/',
})

export default withNextra({
  i18n: {
    locales: ['ko', 'en'],
    defaultLocale: 'ko',
  },
})
