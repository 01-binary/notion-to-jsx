import { Footer, Layout, LocaleSwitch, Navbar } from 'nextra-theme-docs'
import { Head } from 'nextra/components'
import { getPageMap } from 'nextra/page-map'
import './styles.css'
import type { Metadata } from 'next'
import type { FC, ReactNode } from 'react'
import { getDictionary, getDirection } from '../../_dictionaries/get-dictionary'

export const metadata: Metadata = {
  title: {
    default: 'notion-to-jsx',
    template: '%s - notion-to-jsx',
  },
  description: 'Render Notion blocks as React components',
}

type LayoutProps = Readonly<{
  children: ReactNode
  params: Promise<{ lang: string }>
}>

const RootLayout: FC<LayoutProps> = async ({ children, params }) => {
  const { lang } = await params
  const dictionary = await getDictionary(lang)
  const pageMap = await getPageMap(`/${lang}`)

  const navbar = (
    <Navbar
      logo={
        <div>
          <b>notion-to-jsx</b>{' '}
          <span style={{ opacity: '60%' }}>{dictionary.logo.title}</span>
        </div>
      }
      projectLink="https://github.com/01-binary/notion-to-jsx"
    >
      <LocaleSwitch lite />
    </Navbar>
  )

  const footer = (
    <Footer>MIT {new Date().getFullYear()} © notion-to-jsx</Footer>
  )

  return (
    <html lang={lang} dir={getDirection(lang)} suppressHydrationWarning>
      <Head />
      <body>
        <Layout
          navbar={navbar}
          footer={footer}
          docsRepositoryBase="https://github.com/01-binary/notion-to-jsx/tree/main/apps/docs"
          editLink={dictionary.editPage}
          i18n={[
            { locale: 'en', name: 'English' },
            { locale: 'ko', name: '한국어' },
          ]}
          sidebar={{ defaultMenuCollapseLevel: 1 }}
          toc={{
            backToTop: dictionary.backToTop,
          }}
          pageMap={pageMap}
          themeSwitch={{
            dark: dictionary.dark,
            light: dictionary.light,
            system: dictionary.system,
          }}
        >
          {children}
        </Layout>
      </body>
    </html>
  )
}

export default RootLayout
