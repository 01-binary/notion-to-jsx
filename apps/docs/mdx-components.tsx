import { useMDXComponents as getDocsMDXComponents } from 'nextra-theme-docs'
import type { MDXComponents } from 'nextra/mdx-components'

export const useMDXComponents = (components?: MDXComponents) => ({
  ...getDocsMDXComponents(),
  ...components,
})
