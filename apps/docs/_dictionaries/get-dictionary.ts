import type { Dictionary, Locale } from './i18n-config'

const dictionaries: Record<Locale, () => Promise<{ default: Dictionary }>> = {
  en: () => import('./en'),
  ko: () => import('./ko'),
}

export async function getDictionary(locale: string): Promise<Dictionary> {
  const load = dictionaries[locale as Locale] ?? dictionaries.ko
  const mod = await load()
  return mod.default
}

export function getDirection(locale: string): 'ltr' | 'rtl' {
  return 'ltr'
}
