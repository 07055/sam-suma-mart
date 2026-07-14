export const DEFAULT_COUNTRY = 'KE'

export const COUNTRIES = [
  { code: 'KE', label: 'Kenya', flag: '🇰🇪' },
  { code: 'NG', label: 'Nigeria', flag: '🇳🇬' },
  { code: 'ZA', label: 'South Africa', flag: '🇿🇦' },
  { code: 'TZ', label: 'Tanzania', flag: '🇹🇿' },
  { code: 'UG', label: 'Uganda', flag: '🇺🇬' },
  { code: 'RW', label: 'Rwanda', flag: '🇷🇼' },
  { code: 'GB', label: 'United Kingdom', flag: '🇬🇧' },
  { code: 'US', label: 'United States', flag: '🇺🇸' },
  { code: 'DE', label: 'Germany', flag: '🇩🇪' },
  { code: 'AE', label: 'United Arab Emirates', flag: '🇦🇪' },
  { code: 'IN', label: 'India', flag: '🇮🇳' },
  { code: 'CN', label: 'China', flag: '🇨🇳' },
] as const

export type CountryCode = (typeof COUNTRIES)[number]['code']

export function isKenya(country: string | undefined | null): boolean {
  return !country || country === DEFAULT_COUNTRY
}

export function getCountryInfo(code: string | undefined | null) {
  return COUNTRIES.find((c) => c.code === code) || COUNTRIES[0]
}

export function formatPrice(amount: number, country?: string | null): string {
  const formatted = amount.toLocaleString()
  if (isKenya(country)) {
    return `KSh ${formatted}`
  }
  return `KSh ${formatted}`
}

export function formatPriceWithNote(amount: number, country?: string | null): {
  display: string
  note: string | null
} {
  const formatted = amount.toLocaleString()
  if (isKenya(country)) {
    return { display: `KSh ${formatted}`, note: null }
  }
  return {
    display: `KSh ${formatted}`,
    note: 'Kenyan Shillings — your card will be charged in KSh at checkout',
  }
}
